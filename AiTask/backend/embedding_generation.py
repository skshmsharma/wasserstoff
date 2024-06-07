
from sentence_transformers import SentenceTransformer

def generate_embeddings(texts):
    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    embeddings = model.encode(texts)
    return embeddings

def create_vector_database(embeddings):
    import faiss
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)
    return index

# Example usage
# texts = ["Hello world", "How are you?"]
# embeddings = generate_embeddings(texts)
# index = create_vector_database(embeddings)
