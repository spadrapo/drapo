using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Sysphera.Middleware.Drapo.Pipe;
using Sysphera.Middleware.Drapo.Request;
using Sysphera.Middleware.Drapo.User;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public static class DrapoMiddlewareExtension
    {
        public static void AddDrapo(this IServiceCollection services, DrapoMiddlewareOptions options = null)
        {
            if (services == null)
                throw new ArgumentNullException(nameof(services));
            //Prerequisites for Drapo here
            services.Add(new ServiceDescriptor(typeof(DrapoMiddlewareOptions), options ?? new DrapoMiddlewareOptions()));
            services.AddScoped<IDrapoRequestHeaderReader,DrapoRequestHeaderReader>();
            services.Add(new ServiceDescriptor(typeof(IDrapoUserConfig), typeof(DrapoUserConfig), ServiceLifetime.Transient));
            services.Add(new ServiceDescriptor(typeof(IDrapoPlumber), typeof(DrapoPlumber), ServiceLifetime.Transient));
        }

        public static IApplicationBuilder UseDrapo(this IApplicationBuilder builder)
        {
            if (builder == null)
                throw new ArgumentNullException(nameof(builder));
            return (builder.UseDrapo(o => { }));
        }

        public static IApplicationBuilder UseDrapo(this IApplicationBuilder builder, Action<DrapoMiddlewareOptions> configureOptions)
        {
            DrapoMiddlewareOptions options = builder.ApplicationServices.GetService(typeof(DrapoMiddlewareOptions)) as DrapoMiddlewareOptions;
            if (options == null)
                throw new InvalidOperationException("To use Drapo you need to add it first in the Startup");
            configureOptions(options);
            if((options.Config.UsePipes) && (builder.ApplicationServices.GetService(typeof(IHubContext<DrapoPlumberHub>)) == null))
                throw new InvalidOperationException("To use Drapo pipes you need to add the signalr middleware and add the route for DrapoPlumberHub in the Startup");
            return(builder.UseMiddleware<DrapoMiddleware>());
        }
    }
}
