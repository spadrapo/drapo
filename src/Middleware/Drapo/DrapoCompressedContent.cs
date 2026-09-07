using System;
using System.IO;
using System.IO.Compression;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Sysphera.Middleware.Drapo
{
    /// <summary>
    /// An immutable text resource (drapo.js, drapo.js.map) kept in memory as its identity bytes plus
    /// gzip and brotli variants. The compressed variants are produced once, on first use (or by
    /// <see cref="WarmUp"/>), and selected per request from the Accept-Encoding header.
    /// </summary>
    internal sealed class DrapoCompressedContent
    {
        #region Fields
        private const string ENCODING_GZIP = "gzip";
        private const string ENCODING_BROTLI = "br";
        private readonly DrapoCompressedContentVariant _identity;
        private readonly Lazy<DrapoCompressedContentVariant> _gzip;
        private readonly Lazy<DrapoCompressedContentVariant> _brotli;
        #endregion
        #region Properties
        public DrapoCompressedContentVariant Identity
        {
            get
            {
                return (this._identity);
            }
        }
        #endregion
        #region Constructors
        public DrapoCompressedContent(string content, Func<byte[], string> generateETag)
        {
            byte[] identity = Encoding.UTF8.GetBytes(content ?? string.Empty);
            string eTag = generateETag(identity);
            this._identity = new DrapoCompressedContentVariant(identity, null, eTag);
            this._gzip = new Lazy<DrapoCompressedContentVariant>(() => new DrapoCompressedContentVariant(Compress(identity, ENCODING_GZIP), ENCODING_GZIP, eTag + "-" + ENCODING_GZIP), LazyThreadSafetyMode.ExecutionAndPublication);
            this._brotli = new Lazy<DrapoCompressedContentVariant>(() => new DrapoCompressedContentVariant(Compress(identity, ENCODING_BROTLI), ENCODING_BROTLI, eTag + "-" + ENCODING_BROTLI), LazyThreadSafetyMode.ExecutionAndPublication);
        }
        #endregion
        #region Select
        /// <summary>
        /// Picks the best variant the client accepts: brotli, then gzip, otherwise the identity bytes.
        /// </summary>
        /// <param name="acceptEncoding">The raw Accept-Encoding request header (null or empty means identity).</param>
        public DrapoCompressedContentVariant Select(string acceptEncoding)
        {
            if (string.IsNullOrWhiteSpace(acceptEncoding))
                return (this._identity);
            if (Accepts(acceptEncoding, ENCODING_BROTLI))
                return (this._brotli.Value);
            if (Accepts(acceptEncoding, ENCODING_GZIP))
                return (this._gzip.Value);
            return (this._identity);
        }

        /// <summary>
        /// Produces the compressed variants ahead of the first request. Safe to call from a background task.
        /// </summary>
        public void WarmUp()
        {
            DrapoCompressedContentVariant gzip = this._gzip.Value;
            DrapoCompressedContentVariant brotli = this._brotli.Value;
        }

        public Task WarmUpAsync()
        {
            return (Task.Run(() =>
            {
                try
                {
                    this.WarmUp();
                }
                catch
                {
                    // A failed warm-up is not fatal: the variant is retried lazily on the first request that needs it.
                }
            }));
        }

        private static bool Accepts(string acceptEncoding, string encoding)
        {
            // Accept-Encoding: gzip, deflate, br;q=1.0, identity;q=0.5, *;q=0
            string[] entries = acceptEncoding.Split(',');
            for (int i = 0; i < entries.Length; i++)
            {
                string[] parts = entries[i].Split(';');
                string name = parts[0].Trim();
                if (!string.Equals(name, encoding, StringComparison.OrdinalIgnoreCase))
                    continue;
                for (int j = 1; j < parts.Length; j++)
                {
                    string parameter = parts[j].Trim();
                    if (!parameter.StartsWith("q=", StringComparison.OrdinalIgnoreCase))
                        continue;
                    double quality;
                    if ((double.TryParse(parameter.Substring(2), System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out quality)) && (quality <= 0))
                        return (false);
                }
                return (true);
            }
            return (false);
        }
        #endregion
        #region Compress
        private static byte[] Compress(byte[] data, string encoding)
        {
            using (MemoryStream output = new MemoryStream())
            {
                using (Stream compressor = CreateCompressor(output, encoding))
                    compressor.Write(data, 0, data.Length);
                return (output.ToArray());
            }
        }

        private static Stream CreateCompressor(Stream output, string encoding)
        {
            // The content is compressed once and served for the lifetime of the process, so the slowest
            // (smallest) level pays off. SmallestSize exists from .NET 6; on netcoreapp3.1 Optimal is the same level.
#if NET6_0_OR_GREATER
            CompressionLevel level = CompressionLevel.SmallestSize;
#else
            CompressionLevel level = CompressionLevel.Optimal;
#endif
            if (encoding == ENCODING_BROTLI)
                return (new BrotliStream(output, level, true));
            return (new GZipStream(output, level, true));
        }
        #endregion
    }

    internal sealed class DrapoCompressedContentVariant
    {
        #region Fields
        private readonly byte[] _bytes;
        private readonly string _contentEncoding;
        private readonly string _eTag;
        #endregion
        #region Properties
        public byte[] Bytes
        {
            get
            {
                return (this._bytes);
            }
        }

        /// <summary>The Content-Encoding to send, or null for the identity (uncompressed) bytes.</summary>
        public string ContentEncoding
        {
            get
            {
                return (this._contentEncoding);
            }
        }

        public string ETag
        {
            get
            {
                return (this._eTag);
            }
        }
        #endregion
        #region Constructors
        public DrapoCompressedContentVariant(byte[] bytes, string contentEncoding, string eTag)
        {
            this._bytes = bytes;
            this._contentEncoding = contentEncoding;
            this._eTag = eTag;
        }
        #endregion
    }
}
