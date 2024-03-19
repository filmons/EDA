#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

const rabbitmqConfig = {
  url: 'amqp://user1:password1@localhost:5672', 
  queueName: 'task_queue',
};

function sendTaskToQueue(message) {
  amqp.connect(rabbitmqConfig.url, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      const queueName = rabbitmqConfig.queueName;
      const msg = message || 'Hello World!';

      channel.assertQueue(queueName, { durable: true });
      channel.sendToQueue(queueName, Buffer.from(msg), { persistent: true });

      console.log(" [x] Sent '%s'", msg);
    });

    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  });
}

const message = process.argv.slice(2).join(' ');
sendTaskToQueue(message);
