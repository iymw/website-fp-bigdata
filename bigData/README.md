1. `docker-compose up -d`

2. `docker exec -it kafka kafka-topics --create --topic amazon-data --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1`

3. `docker pull minio/minio`

4. `docker run -d --name minio -p 9000:9000 -p 9090:9090 -e "MINIO_ROOT_USER=minioadmin" -e "MINIO_ROOT_PASSWORD=minioadmin" minio/minio server /data --console-address ":9090"`

5. `python3 producer.py`

6. `python3 consumer.py`
