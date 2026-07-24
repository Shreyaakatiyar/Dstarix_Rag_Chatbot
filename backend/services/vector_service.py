from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
from config import GEMINI_API_KEY

def load_documents():
    loader = PyPDFLoader("knowledge/documents/Internship_Rule_Book.pdf")
    return loader.load()

def split_documents(documents):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    return splitter.split_documents(documents)

embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001",
    google_api_key=GEMINI_API_KEY
)

def create_vector_store(chunks):
    vector_store = FAISS.from_documents(
        documents=chunks,
        embedding=embeddings
    )

    vector_store.save_local("vectorstore")

    return vector_store

def load_vector_store():
    return FAISS.load_local(
        "vectorstore",
        embeddings,
        allow_dangerous_deserialization=True
    )

def get_retriever():
    vector_store = load_vector_store()
    return vector_store.as_retriever(
        search_kwargs={"k":3}
    )

def retrieve_documents(query):
    retriever = get_retriever()
    return retriever.invoke(query)