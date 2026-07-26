from config import GEMINI_API_KEY
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from services.vector_service import retrieve_documents

llm = ChatGoogleGenerativeAI(
    model="gemini-3.1-flash-lite",
    google_api_key=GEMINI_API_KEY,
    temperature=0
)

prompt = ChatPromptTemplate.from_template(""" 
You are an AI Internship Guide Assisstant.

Answer ONLY using the provided context.

If the answer is not available in the context, say:
"I couldn't find that information in the internship guide."

Context:
{context}

Question:
{question}
""")


def _extract_text(response):
    """
    Newer langchain/Gemini versions can return response.content as a list
    of content blocks (e.g. [{"type": "text", "text": "...", "extras": {...}}])
    instead of a plain string. This normalizes either shape into plain text.
    """
    content = response.content
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = []
        for block in content:
            if isinstance(block, dict) and block.get("type") == "text":
                parts.append(block.get("text", ""))
            elif isinstance(block, str):
                parts.append(block)
        return "".join(parts)
    return str(content)


def ask_question(question: str):
    documents = retrieve_documents(question)

    context = "\n\n".join(
        doc.page_content for doc in documents
    )

    message = prompt.format_messages(
        context=context,
        question=question
    )

    response = llm.invoke(message)

    sources = [doc.page_content for doc in documents]

    return _extract_text(response), sources