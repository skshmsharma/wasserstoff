from sentence_transformers import SentenceTransformer
import faiss

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def generate_embeddings(texts):
    embeddings = model.encode(texts)
    return embeddings

def create_vector_database(embeddings):
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)
    return index

# Example usage
# texts = ["Hello world", "How are you?"]
# embeddings = generate_embeddings(texts)
# index = create_vector_database(embeddings)
