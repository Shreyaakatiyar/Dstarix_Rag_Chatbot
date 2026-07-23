from flask import Flask
from services.gemini_service import test_gemini

app = Flask(__name__)

@app.route("/")
def home():
    return "Backend Running"

@app.route("/test-gemini")
def gemini():
    return test_gemini()

if __name__ == "__main__" :
    app.run(debug=True)