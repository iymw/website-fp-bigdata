from confluent_kafka import Producer
import pandas as pd
import time
import random

kafka_config = {
    'bootstrap.servers': 'localhost:9092'
}
producer = Producer(kafka_config)

def delivery_report(err, msg):
    if err:
        print(f"Delivery failed: {err}")
    else:
        print(f"Message delivered to {msg.topic()} [{msg.partition()}]")

data = pd.read_csv('amazon.csv')

for index, row in data.iterrows():
    message = row.to_json()
    producer.produce('amazon-data', key=str(index), value=message, callback=delivery_report)
    producer.flush()
    time.sleep(random.uniform(1, 3))
