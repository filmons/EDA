# # kconsumer.py
# from kafka import KafkaConsumer
# consumer = KafkaConsumer('KafkaExplored', bootstrap_servers='localhost:9093')

# for msg in consumer:
#     topic = msg[0]
#     value = msg[6]
#     print(msg)
#     print(f"{topic}:{value.decode()}")
# consumer.py

from kafka import KafkaConsumer

consumer = KafkaConsumer('KafkaExplored', group_id='your_group_id', bootstrap_servers='localhost:9093')
consumer2 = KafkaConsumer('Explored', group_id='your_group_id', bootstrap_servers='localhost:9093')

try:
    for msg in consumer or consumer2:
        topic = msg.topic
        value = msg.value
        print(f"{topic}:{value.decode()}")
except Exception as ex:
    print(f"Error: {ex}")
finally:
    consumer.close()
