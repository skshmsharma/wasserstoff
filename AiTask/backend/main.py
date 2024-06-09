from fastapi import FastAPI, Request
from pydantic import BaseModel
from chatbot import process_query_with_chain_of_thought
from data_retrieval import fetch_data, extract_text

class Message(BaseModel):
    message: str

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    # Fetch data from the WordPress API on startup
    api_url = 'https://www.techcrunch.com/wp-json/wp/v2/posts'
    posts = fetch_data(api_url)
    app.state.text_data = [extract_text(post) for post in posts]

@app.post("/api/chat")
async def chat_endpoint(msg: Message, request: Request):
    previous_context = request.headers.get("previous-context", "")
    response = process_query_with_chain_of_thought(msg.message, previous_context)
    return {"reply": response}
