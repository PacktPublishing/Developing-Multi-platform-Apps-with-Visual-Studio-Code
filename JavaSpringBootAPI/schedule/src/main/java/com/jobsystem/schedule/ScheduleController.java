package com.jobsystem.schedule;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import java.net.URL;
import java.net.HttpURLConnection;
import java.io.OutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import org.apache.kafka.clients.producer.Callback;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.serialization.LongSerializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.bson.types.ObjectId;

import com.google.gson.Gson;
import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ScheduleController {

	@Autowired
	private ScheduleRepository _repository;

	public ScheduleController() {
	}

	@RequestMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";

	}

	@RequestMapping("/jobs")
	public List<ScheduleJob> getJobs() {
		return _repository.findAll();


	}

	@RequestMapping("/jobById")
	public ScheduleJob getJobById(String id) {
		ScheduleJob job= _repository.findByid(id);
		return job;

	}


	@RequestMapping("/jobByJobType")
	public List<ScheduleJob>  getJobByJobType(String jobType) {
		List<ScheduleJob>  job= _repository.findByjobType(jobType);
		return job;

	}

	@RequestMapping("/jobByAgentUser")
	public List<ScheduleJob> getJobByAgentUser(String agentUser) {
		List<ScheduleJob>  job= _repository.findByagentUser(agentUser);
		return job;

	}

	
	@PostMapping("/jobs")
	public Boolean saveJob(@RequestBody ScheduleJob job) throws Exception {
		_repository.save(job);

		// To send messages to Notifications topic in Event Hubs with Kafka protocol
		// with DAPR
		sendNotificiation(job);
		return true;
	}

	@PostMapping("/test")
	public Boolean test(@RequestBody String str) throws Exception {

		System.out.println("Called test");
		return true;
	}

	private void sendNotificiation(ScheduleJob job) throws Exception {

		try {
			Properties properties = new Properties();
			// properties.load(new FileReader("src/main/resources/producer.config"));
			properties.put("bootstrap.servers", "vscodebook.servicebus.windows.net:9093");
			properties.put("security.protocol", "SASL_SSL");
			properties.put("sasl.mechanism", "PLAIN");
			properties.put("sasl.jaas.config",
					"org.apache.kafka.common.security.plain.PlainLoginModule required username=\"$ConnectionString\" password=\"Endpoint=sb://vscodebook.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=7f2bWIsiOXuvV4ZkWkr/IuBZk4/0C5roqUWeZpTQlwM=\";");
			properties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, LongSerializer.class.getName());
			properties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

			KafkaProducer<Long, String> producer = new KafkaProducer<>(properties);
			long time = System.currentTimeMillis();
			Gson gson = new Gson();
			String bidObjectJson = gson.toJson(job);
			final ProducerRecord<Long, String> record = new ProducerRecord<Long, String>("notificationstopic", time,
					bidObjectJson);
			producer.send(record, new Callback() {
				public void onCompletion(RecordMetadata metadata, Exception exception) {
					if (exception != null) {
						System.out.println(exception);
						System.exit(1);
					}
				}
			});
			producer.close();
		} catch (Exception ex) {

		}

	}

	private void sendNotificationWithDapr() throws Exception {
		try {

			URL url = new URL("http://localhost:9005/v1.0/bindings/eventhubsscheduleroutput");
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("POST");
			con.setRequestProperty("Content-Type", "application/json");
			con.setDoOutput(true);
			String jsonInputString = "{'data': {'test':'hello'}}";

			try (OutputStream os = con.getOutputStream()) {
				os.write(jsonInputString.getBytes());
				os.flush();
				os.close();
			} catch (Exception ex) {
				System.out.println(ex.getStackTrace());
				throw ex;
			}

			int responseCode = con.getResponseCode();
			System.out.println("POST Response Code :: " + responseCode);

			if (responseCode == HttpURLConnection.HTTP_OK) {
				// success
				BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
				String inputLine;
				StringBuffer response = new StringBuffer();
				while ((inputLine = in.readLine()) != null) {
					response.append(inputLine);
				}
				in.close();
				// print result
				System.out.println(response.toString());
			} else {
				System.out.println("POST request not worked");
			}

		} catch (Exception ex) {
			System.out.println(ex.getStackTrace());
		}

	}

}