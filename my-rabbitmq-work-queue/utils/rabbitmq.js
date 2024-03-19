const amqp = require('amqplib/callback_api');

const rabbitmqConfig = {
  url: 'amqp://user1:password1@localhost:5672', // Change this if your RabbitMQ server is running elsewhere
};

let connection;
let channel;

function connect() {
  amqp.connect(rabbitmqConfig.url, function (error0, conn) {
    if (error0) {
      throw error0;
    }
    connection = conn;
    connection.createChannel(function (error1, ch) {
      if (error1) {
        throw error1;
      }
      channel = ch;
    });
  });
}

function sendToQueue(queueName, message) {
  channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });
}

function consumeFromQueue(queueName, callback) {
  channel.assertQueue(queueName, { durable: true });
  channel.prefetch(1); // Process one message at a time
  channel.consume(queueName, (msg) => {
    callback(msg);
  }, { noAck: false });
}

function ack(message) {
  channel.ack(message);
}

function close() {
  connection.close();
}

module.exports = {
  connect,
  sendToQueue,
  consumeFromQueue,
  ack,
  close,
};

connect(); // Initialize the RabbitMQ connection
