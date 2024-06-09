from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def generate_embeddings(texts: List[str]) -> np.ndarray:
    try:
        embeddings = model.encode(texts)
        return embeddings
    except Exception as e:
        print(f"Error generating embeddings: {e}")
        return np.array([])

def create_vector_database(embeddings: np.ndarray) -> faiss.IndexFlatL2:
    try:
        index = faiss.IndexFlatL2(embeddings.shape[1])
        index.add(embeddings)
        return index
    except Exception as e:
        print(f"Error creating vector database: {e}")
        return None
