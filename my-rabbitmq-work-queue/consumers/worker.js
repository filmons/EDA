const amqp = require('amqplib/callback_api');

amqp.connect('amqp://user1:password1@localhost:5672', function (error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    const queue = 'task_queue';
    channel.assertQueue(queue, {
      durable: true,
    });

    channel.prefetch(1); // Process only one message at a time

    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);
    
    channel.consume(queue, function (msg) {
      const message = msg.content.toString();

      console.log(" [x] Received '%s'", message);
      
     

      setTimeout(function () {
        console.log(" [x] Done");
        channel.ack(msg); // Acknowledge the message to RabbitMQ once processing is done
      }, 1000); // Simulate some processing time (1 second in this case)
    }, {
      noAck: false, // Set to false to enable manual acknowledgment of messages
    });
  });
});
