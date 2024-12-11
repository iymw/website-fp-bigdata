import json
from flask import Flask, jsonify, request
from flask_cors import CORS

with open('products.json', 'r') as file:
    amazon_json = json.load(file)

app = Flask(__name__)

cors = CORS(app, resources={r"/products/*": {"origins": "http://localhost:3000"}})

# Route for getting products
@app.route('/products', methods=['GET'])
def ReturnJSON():
    if request.method == 'GET':
        page = request.args.get('_page', None)

        if page is None:
            return jsonify(amazon_json)

        page = int(page)
        size = 80

        s = page * size
        e = s + size

        data = amazon_json[s:e]

        return jsonify(data)

@app.route('/products', methods=['POST'])
def AddProduct():
    if request.method == 'POST':
        new_product = request.get_json()

        default_product = {
			"product_id": " ",
			"product_name": new_product['product_name'],
			"category": new_product['category'],
			"discounted_price": " ",
			"about_product": " ",
			"actual_price": new_product['actual_price'],
			"discount_percentage": " ",
			"rating": "0",
			"rating_count": " ",
			"user_id": " ",
			"user_name": " ",
			"review_id": " ",
			"review_title": " ",
			"review_content": " ",
			"img_link": new_product['img_link'],
			"product_link": " "
        }

        amazon_json.append(default_product)

        with open('products.json', 'w') as file:
            json.dump(amazon_json, file, indent=4)

        return jsonify(default_product), 201

if __name__ == '__main__':
    app.run(debug=True)
