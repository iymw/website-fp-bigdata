import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, classification_report
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import re
import nltk
import pickle

nltk.download('stopwords')
nltk.download('punkt_tab')
nltk.download('wordnet')

data = pd.read_csv("amazon.csv")

data['text_features'] = data['about_product'] + " " + data['product_name'] + " " + data['review_content']

def preprocess_text(text):
    lemmatizer = WordNetLemmatizer()
    stop_words = set(stopwords.words('english'))
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    tokens = word_tokenize(text)
    tokens = [lemmatizer.lemmatize(word) for word in tokens if word not in stop_words]
    return ' '.join(tokens)

data['text_features'] = data['text_features'].apply(preprocess_text)

X = data['text_features']
y = data['category']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

tfidf = TfidfVectorizer(max_features=20000, ngram_range=(1, 3), min_df=3, max_df=0.8)
X_train_tfidf = tfidf.fit_transform(X_train)
X_test_tfidf = tfidf.transform(X_test)

param_grid = {
    'C': [0.1, 1, 10],
    'kernel': ['linear', 'rbf'],
    'gamma': ['scale', 'auto']
}
svc = SVC(random_state=42)
grid_search = GridSearchCV(estimator=svc, param_grid=param_grid, cv=5, n_jobs=-1, verbose=2)
grid_search.fit(X_train_tfidf, y_train)

best_svc = grid_search.best_estimator_

y_pred = best_svc.predict(X_test_tfidf)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))

with open('model.pkl', 'wb') as model_file:
    pickle.dump(best_svc, model_file)

with open('tfidf_vectorizer.pkl', 'wb') as vectorizer_file:
    pickle.dump(tfidf, vectorizer_file)

app = Flask(__name__)
cors = CORS(app, resources={r"/predict/*": {"origins": "http://localhost:3000"}})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    text_features = data['about_product'] + " " + data['product_name'] + " " + data['review_content']
    text_features = preprocess_text(text_features)
    text_tfidf = tfidf.transform([text_features])
    category = best_svc.predict(text_tfidf)
    return jsonify({'predicted_category': category[0]})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
