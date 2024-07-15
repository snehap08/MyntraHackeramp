from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import nltk
from nltk.stem.snowball import SnowballStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nltk.download('punkt')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


data = pd.read_csv('../backend/data/products.csv')
columns_to_drop = ['Unnamed: 4', 'Unnamed: 6', 'Unnamed: 7']
data_cleaned = data.drop(columns=columns_to_drop).dropna()

stemmer = SnowballStemmer('english')

def tokenize_stem(text):
    tokens = nltk.word_tokenize(text.lower())
    stemmed = [stemmer.stem(w) for w in tokens]
    return " ".join(stemmed)

data_cleaned['stemmed_tokens'] = data_cleaned.apply(
    lambda row: tokenize_stem(row['name'] + " " + row['description']), axis=1
)

tfidf_vectorizer = TfidfVectorizer(tokenizer=lambda x: x.split())

class ProductSearchRequest(BaseModel):
    query: str


@app.post("/search")
async def search_product(request: ProductSearchRequest):
    print("Helloooo")
    stemmed_query = tokenize_stem(request.query)
    query_vec = tfidf_vectorizer.fit_transform([stemmed_query])
    data_cleaned['similarity'] = data_cleaned['stemmed_tokens'].apply(
        lambda x: cosine_similarity(query_vec, tfidf_vectorizer.transform([x]))[0, 1]
    )
    results = data_cleaned.sort_values(by='similarity', ascending=False).head(10)[
        ['name', 'description', 'price', 'category', 'image', 'brand']
    ]
    return results.to_dict(orient='records')



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)