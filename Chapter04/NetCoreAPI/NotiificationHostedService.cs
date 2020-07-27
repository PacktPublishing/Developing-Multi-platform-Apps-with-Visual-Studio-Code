using Microsoft.Extensions.Hosting;
using System.Threading;
using System.Threading.Tasks;
 
namespace NetCoreAPI
{
    public class NotificationHostedService : IHostedService
    {
        Thread notificationServiceThread; 
        private Consumer _consumer;
        public NotificationHostedService(Consumer consumer)  
        {
            _consumer = consumer; 
            
        }
        public Task StartAsync(CancellationToken cancellationToken)
        {
            notificationServiceThread = new Thread(NotificationServiceStart);
            notificationServiceThread.Start(cancellationToken);        
            
         
            return Task.CompletedTask; 
        }

        public void NotificationServiceStart(object cancellationToken){
              _consumer.ConsumeNotificationsMessages((CancellationToken)cancellationToken);
        
        } 

        public Task StopAsync(CancellationToken cancellationToken)
        {
            notificationServiceThread.Abort();
            return Task.CompletedTask;
        }
    }
}
