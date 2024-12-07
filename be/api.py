import json
from flask import Flask,jsonify,request 
from flask_cors import CORS

with open('amazon.json', 'r') as file:
    amazon_json = json.load(file)

app = Flask(__name__) 

cors = CORS(app, resources={r"/products/*": {"origins": "http://localhost:3000"}})

@app.route('/products', methods = ['GET']) 
def ReturnJSON(): 
	if(request.method == 'GET'):
		page = int(request.args.get('_page', 0))
		size = 80

		s = page * size
		e = s + size 

		data = amazon_json[s:e]

		return jsonify(data) 

if __name__=='__main__': 
	app.run(debug=True)
