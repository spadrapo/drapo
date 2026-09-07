using System;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using NUnit.Framework;

namespace WebDrapo.Test
{
    /// <summary>
    /// Verifies that the middleware serves drapo.js compressed according to Accept-Encoding, keeps one ETag per
    /// representation, and still answers 304 Not Modified for revalidation of a compressed copy.
    /// Runs against the same WebDrapo instance as the Selenium tests (WebDrapoURL run setting).
    /// </summary>
    [TestFixture]
    public class CompressionTest
    {
        #region Fields
        private string _url = null;
        private HttpClient _client = null;
        #endregion

        #region Setup
        [OneTimeSetUp]
        public void Setup()
        {
            string virtualDirectory = TestContext.Parameters["WebDrapoURL"] ?? "http://localhost:9991/";
            this._url = virtualDirectory + "drapo.js";
            this._client = new HttpClient(new HttpClientHandler() { AutomaticDecompression = DecompressionMethods.None });
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            this._client.Dispose();
        }
        #endregion

        #region Helpers
        private async Task<HttpResponseMessage> GetAsync(string acceptEncoding, string ifNoneMatch = null)
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, this._url);
            if (acceptEncoding != null)
                request.Headers.TryAddWithoutValidation("Accept-Encoding", acceptEncoding);
            if (ifNoneMatch != null)
                request.Headers.TryAddWithoutValidation("If-None-Match", ifNoneMatch);
            return (await this._client.SendAsync(request));
        }

        // The middleware emits the ETag without quotes (the runtime relies on that format), which the typed
        // HttpResponseHeaders.ETag parser rejects, so read the raw header value.
        private static string ETag(HttpResponseMessage response)
        {
            System.Collections.Generic.IEnumerable<string> values;
            if (!response.Headers.TryGetValues("ETag", out values))
                return (null);
            return (string.Join(",", values));
        }

        private static string ContentEncoding(HttpResponseMessage response)
        {
            return (string.Join(",", response.Content.Headers.ContentEncoding));
        }

        private static async Task<byte[]> Decompress(HttpResponseMessage response)
        {
            byte[] body = await response.Content.ReadAsByteArrayAsync();
            string encoding = ContentEncoding(response);
            if (encoding == string.Empty)
                return (body);
            using (MemoryStream input = new MemoryStream(body))
            using (Stream decompressor = encoding == "br" ? (Stream)new BrotliStream(input, CompressionMode.Decompress) : new GZipStream(input, CompressionMode.Decompress))
            using (MemoryStream output = new MemoryStream())
            {
                await decompressor.CopyToAsync(output);
                return (output.ToArray());
            }
        }
        #endregion

        #region Tests
        [Test]
        public async Task CompressionIdentityTest()
        {
            HttpResponseMessage response = await this.GetAsync(null);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(ContentEncoding(response), Is.EqualTo(string.Empty));
            Assert.That(response.Headers.Vary, Does.Contain("Accept-Encoding"));
            Assert.That(ETag(response), Is.Not.Null.And.Not.Empty);
            Assert.That(ETag(response), Does.Not.Contain("-"));
            byte[] body = await response.Content.ReadAsByteArrayAsync();
            Assert.That(body.Length, Is.EqualTo(response.Content.Headers.ContentLength));
            Assert.That(body.Length, Is.GreaterThan(0));
        }

        [TestCase("gzip", "gzip")]
        [TestCase("br", "br")]
        [TestCase("gzip, deflate, br", "br")]
        [TestCase("br;q=0, gzip", "gzip")]
        [TestCase("gzip;q=0.8, br;q=0.5", "br")]
        public async Task CompressionVariantTest(string acceptEncoding, string expectedEncoding)
        {
            HttpResponseMessage identity = await this.GetAsync(null);
            byte[] identityBody = await identity.Content.ReadAsByteArrayAsync();
            HttpResponseMessage response = await this.GetAsync(acceptEncoding);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(ContentEncoding(response), Is.EqualTo(expectedEncoding));
            Assert.That(response.Headers.Vary, Does.Contain("Accept-Encoding"));
            Assert.That(ETag(response), Is.EqualTo(ETag(identity) + "-" + expectedEncoding));
            byte[] compressed = await response.Content.ReadAsByteArrayAsync();
            Assert.That(compressed.Length, Is.EqualTo(response.Content.Headers.ContentLength));
            Assert.That(compressed.Length, Is.LessThan(identityBody.Length / 4));
            byte[] decompressed = await Decompress(response);
            Assert.That(decompressed, Is.EqualTo(identityBody));
        }

        [TestCase(null)]
        [TestCase("gzip")]
        [TestCase("br")]
        public async Task CompressionNotModifiedTest(string acceptEncoding)
        {
            HttpResponseMessage first = await this.GetAsync(acceptEncoding);
            string eTag = ETag(first);
            HttpResponseMessage second = await this.GetAsync(acceptEncoding, eTag);
            Assert.That(second.StatusCode, Is.EqualTo(HttpStatusCode.NotModified));
            Assert.That(ETag(second), Is.EqualTo(eTag));
            byte[] body = await second.Content.ReadAsByteArrayAsync();
            Assert.That(body.Length, Is.EqualTo(0));
        }

        [Test]
        public async Task CompressionETagIsPerRepresentationTest()
        {
            HttpResponseMessage gzip = await this.GetAsync("gzip");
            HttpResponseMessage brotli = await this.GetAsync("br");
            // A copy cached under the gzip ETag must not be revalidated as the brotli representation.
            HttpResponseMessage response = await this.GetAsync("br", ETag(gzip));
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(ContentEncoding(response), Is.EqualTo("br"));
            Assert.That(ETag(response), Is.EqualTo(ETag(brotli)));
        }
        #endregion
    }
}
