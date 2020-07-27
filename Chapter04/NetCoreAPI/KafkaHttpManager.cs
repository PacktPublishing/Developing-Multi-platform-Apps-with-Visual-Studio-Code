using System.Net.Http;
using System.Text;

using Microsoft.Extensions.Configuration; 


namespace NetCoreAPI
{
    public class KafkaHttpManager 
    {
           
        private readonly IConfiguration _configuration;
        IHttpClientFactory _clientFactory;
        HttpClient _client;
        public KafkaHttpManager(IHttpClientFactory clientFactory, IConfiguration configuration) 
        {
            _clientFactory = clientFactory; 
            _configuration = configuration; 
            _client= _clientFactory.CreateClient();
        }   

        public async void CallSchedulerService(string jsonObject)
        {
            string url= _configuration.GetValue<string>("SchedulerServiceURL"); 

            jsonObject= jsonObject.Substring(0, jsonObject.LastIndexOf("}"));
            jsonObject += ",\"agentUser\":\"agent1\"}"; 
 
            var content = new StringContent(jsonObject, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _client.PostAsync(url, content);
            response.EnsureSuccessStatusCode();
        }
        public async void CallNotificationService(string jsonObject)
        {
            string url= _configuration.GetValue<string>("NotificationsServiceURL");
            var content = new StringContent(jsonObject, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await _client.PostAsync(url, content);
            response.EnsureSuccessStatusCode();
        }

 
    }
}