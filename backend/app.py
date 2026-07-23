from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "DStarix RAG Chatbot Backend is Running!"

if __name__ == "__main__" :
    app.run(debug=True)