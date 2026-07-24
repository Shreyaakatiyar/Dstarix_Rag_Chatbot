from flask import Flask, request
from services.gemini_service import ask_question

app = Flask(__name__)

@app.route("/")
def home():
    return "Backend Running"

@app.route("/chat", methods=["POST"])
def chat():
    
    data = request.get_json()

    question = data.get("question")

    answer = ask_question(question)


    return{
        "question": question,
        "answer": answer
    }

if __name__ == "__main__" :
    app.run(debug=True)