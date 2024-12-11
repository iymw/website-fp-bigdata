import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

data = pd.read_csv("amazon.csv")

data['text_features'] = data['about_product'] + " " + data['product_name'] + " " + data['review_content']

X = data['text_features']
y = data['category']

tfidf = TfidfVectorizer(max_features=5000)
X_tfidf = tfidf.fit_transform(X)

model = RandomForestClassifier()
model.fit(X_tfidf, y)

with open('model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

with open('tfidf_vectorizer.pkl', 'wb') as vectorizer_file:
    pickle.dump(tfidf, vectorizer_file)

app = Flask(__name__)

with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('tfidf_vectorizer.pkl', 'rb') as vectorizer_file:
    tfidf = pickle.load(vectorizer_file)

cors = CORS(app, resources={r"/predict/*": {"origins": "http://localhost:3000"}})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    product_name = data['product_name']

    product_tfidf = tfidf.transform([product_name])

    category = model.predict(product_tfidf)

    return jsonify({'predicted_category': category[0]})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
