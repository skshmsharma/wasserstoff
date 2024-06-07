# main.py
from fastapi import FastAPI
from data_retrieval import fetch_data
from embedding_generation import generate_embeddings, create_vector_database
from chatbot import process_query_with_chain_of_thought

app = FastAPI()

data = fetch_data()
embeddings = generate_embeddings(data)
index = create_vector_database(embeddings)

@app.post("/query")
async def query(user_query: str, previous_context: str = None):
    response = process_query_with_chain_of_thought(user_query, previous_context)
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
