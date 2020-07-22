using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http; 


namespace NetCoreAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        { 
            services.AddHttpClient();
            services.AddSingleton<KafkaHttpManager>();
            services.AddSingleton<Consumer>();  
            services.AddHostedService<JobRequestHostedService>();
            services.AddHostedService<NotificationHostedService>();
        
        }
 
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.Run(async (context) => 
            {
                await context.Response.WriteAsync($"Hosted Service is running!");
            });

        }
    } 
}
