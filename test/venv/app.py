
import pandas as pd
import nltk
import re
from nltk.stem.snowball import SnowballStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify
from flask_cors import CORS

nltk.download('punkt')

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Read the data
data = pd.read_csv('products.csv')

# Drop unnecessary columns
columns_to_drop = ['Unnamed: 4', 'Unnamed: 6', 'Unnamed: 7']
data_cleaned = data.drop(columns=columns_to_drop)

# Drop rows with any NA values
data_cleaned = data_cleaned.dropna()

# Initialize the stemmer
stemmer = SnowballStemmer('english')

# Tokenization and stemming function
def tokenize_stem(text):
    tokens = nltk.word_tokenize(text.lower())
    stemmed = [stemmer.stem(w) for w in tokens]
    return " ".join(stemmed)

# Apply the tokenization and stemming function
data_cleaned['stemmed_tokens'] = data_cleaned.apply(lambda row: tokenize_stem(row['name'] + " " + row['description']), axis=1)

# Initialize the TF-IDF Vectorizer
tfidf_vectorizer = TfidfVectorizer(tokenizer=tokenize_stem)

# Define the cosine similarity function
def cosine_sim(txt1, txt2):
    tfidf_matrix = tfidf_vectorizer.fit_transform([txt1, txt2])
    return cosine_similarity(tfidf_matrix)[0, 1]

# Define the product search function
def search_product(query):
    stemmed_query = tokenize_stem(query)
    data_cleaned['similarity'] = data_cleaned['stemmed_tokens'].apply(lambda x: cosine_sim(stemmed_query, x))
    res = data_cleaned.sort_values(by='similarity', ascending=False).head(10)[['name', 'description', 'price', 'category', 'image', 'brand']]
    return res.to_dict(orient='records')

# Define the API endpoint
@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400
    results = search_product(query)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
