using Microsoft.AspNetCore.Http;
using NUnit.Framework;
using Sysphera.Middleware.Drapo;
using Sysphera.Middleware.Drapo.Request;

namespace WebDrapo.Test
{
    /// <summary>
    /// Verifies that the request reader answers without an HTTP request (a background scope, where
    /// IHttpContextAccessor.HttpContext is null) and keeps reading the header and the host inside one.
    /// Runs in process; it does not need a WebDrapo instance.
    /// </summary>
    [TestFixture]
    public class DrapoRequestReaderTest
    {
        #region Helpers
        private static DrapoRequestReader CreateReader(HttpContext httpContext, string domainRegex = null)
        {
            DrapoMiddlewareOptions options = new DrapoMiddlewareOptions();
            options.Config.DomainRegex = domainRegex;
            return (new DrapoRequestReader(options, new HttpContextAccessor() { HttpContext = httpContext }));
        }

        private static HttpContext CreateRequest(string connectionId, string host)
        {
            DefaultHttpContext httpContext = new DefaultHttpContext();
            if (connectionId != null)
                httpContext.Request.Headers["DrapoPipeConnnectionId"] = connectionId;
            httpContext.Request.Host = new HostString(host);
            return (httpContext);
        }
        #endregion

        #region Tests
        [TestCase]
        public void GetWithoutRequestTest()
        {
            DrapoRequestReader reader = CreateReader(null);
            Assert.That(reader.Get("DrapoPipeConnnectionId"), Is.Null);
        }

        [TestCase]
        public void GetPipeHeaderConnectionIdWithoutRequestTest()
        {
            DrapoRequestReader reader = CreateReader(null);
            Assert.That(reader.GetPipeHeaderConnectionId(), Is.Null);
            reader.SetPipeHeaderConnectionId(null);
            Assert.That(reader.GetPipeHeaderConnectionId(), Is.Null);
            reader.SetPipeHeaderConnectionId("connection1");
            Assert.That(reader.GetPipeHeaderConnectionId(), Is.EqualTo("connection1"));
        }

        [TestCase]
        public void GetDomainWithoutRequestTest()
        {
            DrapoRequestReader reader = CreateReader(null, @"(?<domain>\w+)\.localhost");
            Assert.That(reader.GetDomain(), Is.EqualTo(string.Empty));
            reader.SetDomain("tenant1");
            Assert.That(reader.GetDomain(), Is.EqualTo("tenant1"));
        }

        [TestCase]
        public void GetWithRequestTest()
        {
            DrapoRequestReader reader = CreateReader(CreateRequest("connection2", "tenant2.localhost"), @"(?<domain>\w+)\.localhost");
            Assert.That(reader.GetPipeHeaderConnectionId(), Is.EqualTo("connection2"));
            Assert.That(reader.GetDomain(), Is.EqualTo("tenant2"));
            Assert.That(CreateReader(CreateRequest(null, "localhost")).GetPipeHeaderConnectionId(), Is.Null);
        }
        #endregion
    }
}
