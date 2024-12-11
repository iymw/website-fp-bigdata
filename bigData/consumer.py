from confluent_kafka import Consumer
import boto3
import json
import os

consumer_config = {
    'bootstrap.servers': 'localhost:9092',
    'group.id': 'amazon-consumer',
    'auto.offset.reset': 'earliest'
}
consumer = Consumer(consumer_config)

consumer.subscribe(['amazon-data'])

minio_client = boto3.client(
    's3',
    endpoint_url='http://localhost:9000', 
    aws_access_key_id='minioadmin',  
    aws_secret_access_key='minioadmin' 
)
bucket_name = 'amazon'

temp_dir = 'temp_messages'
os.makedirs(temp_dir, exist_ok=True)

try:
    while True:
        msg = consumer.poll(1.0)
        if msg is None:
            continue
        if msg.error():
            print(f"Consumer error: {msg.error()}")
            continue
        
        message = msg.value().decode('utf-8')
        print(f"Received message: {message}")
        
        file_name = f"{msg.topic()}_{msg.offset()}.json"
        file_path = os.path.join(temp_dir, file_name)
        with open(file_path, 'w') as f:
            json.dump(json.loads(message), f)
        
        minio_client.upload_file(
            file_path,
            bucket_name,
            f"products/{file_name}"
        )
        print(f"Uploaded {file_name} to MinIO bucket '{bucket_name}'")
        
        os.remove(file_path)

finally:
    consumer.close()
