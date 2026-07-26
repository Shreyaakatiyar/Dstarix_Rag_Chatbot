from services.vector_service import load_documents, split_documents, create_vector_store


def build():
    print("Loading Internship_Rule_Book.pdf ...")
    documents = load_documents()
    print(f"Loaded {len(documents)} page(s).")

    print("Splitting into chunks ...")
    chunks = split_documents(documents)
    print(f"Created {len(chunks)} chunks.")

    print("Embedding chunks and building FAISS vector store (this calls the Gemini API) ...")
    create_vector_store(chunks)
    print("Done. Saved to vectorstore/")


if __name__ == "__main__":
    build()