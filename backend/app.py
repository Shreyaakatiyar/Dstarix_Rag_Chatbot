from flask import Flask
from services.gemini_service import test_gemini
from services.vector_service import (
    load_documents,
    split_documents,
    create_vector_store,
    retrieve_documents,
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

@app.route("/test-retriever")
def test_retriever():
    docs = retrieve_documents("What is the internship duration?")

    result = ""

    for doc in docs:
        result +=doc.page_content + "\n\n"

    return result

if __name__ == "__main__" :
    app.run(debug=True)