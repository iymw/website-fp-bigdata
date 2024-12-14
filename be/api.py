import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from minio import Minio
from io import BytesIO
import os

app = Flask(__name__)
cors = CORS(app, resources={r"/products/*": {"origins": "http://localhost:3000"}})

MINIO_ENDPOINT = "localhost:9000"
MINIO_ACCESS_KEY = "minioadmin"
MINIO_SECRET_KEY = "minioadmin"
MINIO_BUCKET = "amazon"
MINIO_PRODUCTS_FOLDER = "products/"
MERGED_FILE_NAME = "merged_products.json"

minio_client = Minio(
    MINIO_ENDPOINT,
    access_key=MINIO_ACCESS_KEY,
    secret_key=MINIO_SECRET_KEY,
    secure=False,
)

cache = {"data": [], "processed_files": set()}


def fetch_new_files_from_minio(bucket_name, folder_name):
    """
    Fetches only new JSON files from the specified folder in MinIO and updates the cache.
    """
    try:
        objects = minio_client.list_objects(
            bucket_name, prefix=folder_name, recursive=True
        )
        new_data = []

        for obj in objects:
            if (
                obj.object_name.endswith(".json")
                and obj.object_name not in cache["processed_files"]
            ):
                try:
                    response = minio_client.get_object(bucket_name, obj.object_name)
                    file_data = json.load(response)

                    if isinstance(file_data, list):
                        new_data.extend(file_data)
                    elif isinstance(file_data, dict):
                        new_data.append(file_data)

                    response.close()
                    response.release_conn()

                    cache["processed_files"].add(obj.object_name)
                except Exception as e:
                    print(f"Error reading file {obj.object_name}: {e}")

        cache["data"].extend(new_data)
        return new_data
    except Exception as e:
        print(f"Error fetching new files: {e}")
        return []


def save_product_to_minio(bucket_name, folder_name, product):
    """
    Saves a new product as a separate JSON file in the specified folder in MinIO.
    """
    try:
        file_name = f"{folder_name}product_{len(cache['processed_files']) + 1}.json"
        data_bytes = BytesIO(json.dumps(product, indent=4).encode("utf-8"))
        file_size = len(data_bytes.getvalue())

        minio_client.put_object(bucket_name, file_name, data_bytes, file_size)
        print(f"Successfully saved product to {file_name} in bucket {bucket_name}.")

        cache["data"].append(product)
        cache["processed_files"].add(file_name)
    except Exception as e:
        print(f"Error saving product to MinIO: {e}")


@app.route("/products/merged", methods=["GET"])
def get_merged_products():
    if request.method == "GET":
        fetch_new_files_from_minio(MINIO_BUCKET, MINIO_PRODUCTS_FOLDER)
        return jsonify(cache["data"]), 200


@app.route("/products", methods=["GET"])
def return_json():
    if request.method == "GET":
        fetch_new_files_from_minio(MINIO_BUCKET, MINIO_PRODUCTS_FOLDER)

        reversed_data = list(reversed(cache["data"]))

        page = request.args.get("_page", None)
        if page is None:
            return jsonify(reversed_data)

        page = int(page)
        size = 80
        s = page * size
        e = s + size
        paged_data = reversed_data[s:e]

        return jsonify(paged_data)


@app.route("/products", methods=["POST"])
def add_product():
    if request.method == "POST":
        new_product = request.get_json()

        default_product = {
            "product_id": " ",
            "product_name": new_product["product_name"],
            "category": new_product["category"],
            "discounted_price": " ",
            "about_product": " ",
            "actual_price": new_product["actual_price"],
            "discount_percentage": " ",
            "rating": "0",
            "rating_count": " ",
            "user_id": " ",
            "user_name": " ",
            "review_id": " ",
            "review_title": " ",
            "review_content": " ",
            "img_link": new_product["img_link"],
            "product_link": " ",
        }

        save_product_to_minio(MINIO_BUCKET, MINIO_PRODUCTS_FOLDER, default_product)

        return jsonify(default_product), 201


if __name__ == "__main__":
    if not minio_client.bucket_exists(MINIO_BUCKET):
        minio_client.make_bucket(MINIO_BUCKET)

    app.run(debug=True)
