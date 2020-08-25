using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace WebDrapo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
         Host.CreateDefaultBuilder(args)
             .ConfigureWebHostDefaults(webBuilder =>
             {
                 webBuilder.UseUrls("http://0.0.0.0:9991");
                 webBuilder.UseContentRoot(Directory.GetCurrentDirectory());
                 webBuilder.ConfigureKestrel((content, options) => { });
                 webBuilder.UseIISIntegration();
                 webBuilder.ConfigureLogging((hostingContext, logging) =>
                 {
                     //logging.AddConsole();
                     //logging.AddDebug();
                 });
                 webBuilder.UseStartup<Startup>();
             });
    }
}
