from config import GEMINI_API_KEY
from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(
    model="gemini-3.1-flash-lite",
    google_api_key=GEMINI_API_KEY,
    temperature=0
)

def test_gemini():
    response = llm.invoke("Say Only: Gemini Connected")
    return response.content