from flask import Flask
from services.gemini_service import test_gemini
from services.vector_service import (
    load_documents,
    split_documents,
    create_vector_store,
)

app = Flask(__name__)

@app.route("/")
def home():
    return "Backend Running"

@app.route("/test-gemini")
def gemini():
    return test_gemini()

@app.route("/build-db")
def build_db():
    docs = load_documents()
    chunks = split_documents(docs)
    create_vector_store(chunks)

    return "Vector database created successfully!"

if __name__ == "__main__" :
    app.run(debug=True)