using Microsoft.Extensions.Hosting;
using System.Threading;
using System.Threading.Tasks;
 
namespace NetCoreAPI
{
    public class JobRequestHostedService : IHostedService
    {

        Thread jobRequestServiceThread; 
        private Consumer _consumer;
        public JobRequestHostedService(Consumer consumer)  
        {
            _consumer = consumer; 
        }
        public Task StartAsync(CancellationToken cancellationToken)
        {
            jobRequestServiceThread = new Thread(StartJobRequestServiceStart);
            jobRequestServiceThread.Start(cancellationToken); 
            return Task.CompletedTask;  
        }

        public void StartJobRequestServiceStart(object cancellationToken)
        {
           _consumer.ConsumeJobRequestMessages((CancellationToken)cancellationToken);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            jobRequestServiceThread.Abort(); 
            return Task.CompletedTask;
        }
     }
}
