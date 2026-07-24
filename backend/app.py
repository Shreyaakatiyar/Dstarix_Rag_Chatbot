from flask import Flask, request, jsonify
from flask_cors import CORS
from services.gemini_service import ask_question

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend Running"

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()

        if not data or "question" not in data:
            return jsonify({
                "success": False,
                "message": "Question is required."
            }), 400

        question = data["question"]

        answer = ask_question(question)

        return jsonify({
            "success": True,
            "question": question,
            "answer": answer
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

if __name__ == "__main__" :
    app.run(debug=True)