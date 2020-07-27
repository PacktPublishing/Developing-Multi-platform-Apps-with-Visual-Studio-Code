//run as dapr run --app-id nodeapp --app-port 3001 node server.js
//Send POST request as http://localhost:3001/jobs
//

var Kafka = require('node-rdkafka');


const express = require('express');
const bodyParser = require('body-parser');

const axios = require('axios')
// create express app
const app = express();

//create MongoClient
const MongoClient = require('mongodb').MongoClient

var db;

//Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
  });

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json

app.use(bodyParser.json())

//const PORT = process.env.DAPR_HTTP_PORT;
//console.log("DAPR HTTP PORT IS " + PORT);

console.log("Published successfully");

// define a simple route 
app.get('/', (req, res) => {
  res.json({ "message": "Welcome to Job API v1" });

});

app.get('/jobs', (req, res) => {
  var cursor = db.collection('jobrequests').find().toArray(function (err, results) {
    console.log(results);
    res.json(results);

  });
});

  app.get('/job', (req, res) => {
    debugger;
    var ObjectId = require('mongodb').ObjectID;
    console.log(req.query.id);
    console.log(ObjectId(req.query.id));
    db.collection('jobrequests').findOne({'_id':ObjectId(req.query.id)}).then(
      response=> { console.log(response); res.json(response); }
    );
  });

  app.post('/jobs', (req, res) => {

 
    var jsonPayload = JSON.stringify(req.body); 
    console.log(jsonPayload); 
    db.collection('jobrequests').insertOne(req.body, (err, result) => {
      if (err) return console.log(err);
      console.log('saved to database');
      // send HTML file populated with quotes here

      //Sending message to JobRequest topic in Event Hubs over Kafka protocol 
      try {
        var producer = new Kafka.Producer({
          //'debug' : 'all',
          'metadata.broker.list': 'vscodebook.servicebus.windows.net:9093',
          'dr_cb': true,  //delivery report callback
          'security.protocol': 'SASL_SSL',
          'sasl.mechanisms': 'PLAIN',
          'sasl.username': '$ConnectionString',
          'sasl.password': 'Endpoint=sb://vscodebook.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=7f2bWIsiOXuvV4ZkWkr/IuBZk4/0C5roqUWeZpTQlwM='
        });

        var topicName = 'jobrequesttopic';

        //logging debug messages, if debug is enabled
        producer.on('event.log', function (log) {
          console.log(log);
        });

        //logging all errors
        producer.on('event.error', function (err) {
          console.error('Error from producer');
          console.error(err);
        });


        //counter to stop this sample after maxMessages are sent
        var counter = 0;
        var maxMessages = 10;

        producer.on('delivery-report', function (err, report) {
          console.log('delivery-report: ' + JSON.stringify(report));
          counter++;
        });

        //Wait for the ready event before producing
        producer.on('ready', function (arg) {
          console.log('producer ready.' + JSON.stringify(arg));
   
          var message = new Buffer(jsonPayload);
         
          // if partition is set to -1, librdkafka will use the default partitioner
          var partition = -1;

          producer.produce(topicName, partition, message)

          //need to keep polling for a while to ensure the delivery reports are received
          var pollLoop = setInterval(function () {
            producer.poll();
            if (counter === maxMessages) {
              clearInterval(pollLoop);
              producer.disconnect();
            }
          }, 1000);

        });

        producer.on('disconnected', function (arg) {
          console.log('producer disconnected. ' + JSON.stringify(arg));
        });

        //starting the producer
        producer.connect();

      }
      catch (e) {
        console.log(e);
      }

      /*
      // Sending through DAPR
      var url = "http://localhost:"+PORT+"/v1.0/bindings/eventhubsoutput"
       console.log("URL is " + url); 
       axios.post(url, { data: req.body })
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
       })
       .catch(error => { 
            console.error(error)
       })

      */
    })
    res.body('{ "message": "" }');
  });


MongoClient.connect('mongodb://jobinfo:hN4mjjpgCx4WYF8QnzI8OxBiNjW8h9TVXli7Vpa4FOtXf9lQbIlak6I3gDyjznIgazG4Y5HzpT5i4szyU7Gz1g==@jobinfo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@jobinfo@', (err, client) => {
  if (err) return console.log(err)

  console.log("connected to Cosmon DB Mongo API");
  db = client.db("jobrequests"); // whatever your database name is
  app.listen(3001, () => {
    console.log('listening on 3001')

  });
})