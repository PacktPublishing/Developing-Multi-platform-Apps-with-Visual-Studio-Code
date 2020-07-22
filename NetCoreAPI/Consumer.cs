using Confluent.Kafka;
using Newtonsoft.Json.Linq;
using System;
using System.Threading;

namespace NetCoreAPI
{
    public class Consumer
    { 
        private KafkaHttpManager _manager;
 
        public Consumer(KafkaHttpManager manager)   
        {
            _manager = manager; 
        } 

            public ConsumerConfig GetConsumerConfig(){ 
                var config = new ConsumerConfig
                {
                    GroupId = "vscodekafkagroup",
                    BootstrapServers = "vscodebook.servicebus.windows.net:9093",
                    SaslUsername = "$ConnectionString",
                    SaslPassword = "Endpoint=sb://vscodebook.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=7f2bWIsiOXuvV4ZkWkr/IuBZk4/0C5roqUWeZpTQlwM=",
                    SecurityProtocol = SecurityProtocol.SaslSsl,
                    SaslMechanism = SaslMechanism.Plain,
                    Debug = "security,broker,protocol"
                };
                return config;
            }


        public void ConsumeJobRequestMessages(CancellationToken cancellationToken)
        { 
          Console.WriteLine("Consuming JobRequest messages");
            var config = GetConsumerConfig();
            using (var consumer = new ConsumerBuilder<Ignore, string>(config).Build())
            {
                consumer.Subscribe("jobrequesttopic");
                  var totalCount = 0;
                CancellationTokenSource cts = new CancellationTokenSource();
                Console.CancelKeyPress += (_, e) => {
                    e.Cancel = true; // prevent the process from terminating.
                    cts.Cancel();
                };
                try
                {

                    while (!cancellationToken.IsCancellationRequested)
                    {
                        try
                        {
                            var cr = consumer.Consume(cts.Token);
                            dynamic data = JObject.Parse(cr.Message.Value);
                            Console.WriteLine("Consumed Job Request message");
                            _manager.CallSchedulerService(cr.Value);
                            
                        }
                        catch (ConsumeException e)
                        {
                           Console.WriteLine($"Error occured: {e.Error.Reason}");
                        }
                    }
                }
                catch (OperationCanceledException)
                {
                    // Ensure the consumer leaves the group cleanly and final offsets are committed.
                    consumer.Close();
                }
            }

        }
        public void ConsumeNotificationsMessages(CancellationToken cancellationToken)
        { 

            Console.WriteLine("Consuming Notification messages");
            var config = GetConsumerConfig();
            using (var consumer = new ConsumerBuilder<Ignore, string>(config).Build())
            {
                consumer.Subscribe("notificationstopic");
                CancellationTokenSource cts = new CancellationTokenSource();
                Console.CancelKeyPress += (_, e) => {
                    e.Cancel = true; // prevent the process from terminating.
                    cts.Cancel();
                };
                try
                {
 
                    while (!cancellationToken.IsCancellationRequested)
                    {
                        try
                        {
                            var cr = consumer.Consume(cts.Token);
                            Console.WriteLine("Consumed Notification message");
                            dynamic data = JObject.Parse(cr.Message.Value);
                            _manager.CallNotificationService(cr.Value);
                        }
                        catch (ConsumeException e)
                        {
                           Console.WriteLine($"Error occured: {e.Error.Reason}");
                        }
                    }
                }
                catch (OperationCanceledException)
                {
                    // Ensure the consumer leaves the group cleanly and final offsets are committed.
                    consumer.Close();
                }
            }

        }
    }
 
}

