from fastapi import FastAPI, Request
from pydantic import BaseModel
from chatbot import process_query_with_chain_of_thought

class Message(BaseModel):
    message: str

app = FastAPI()

@app.post("/api/chat")
async def chat_endpoint(msg: Message, request: Request):
    previous_context = request.headers.get("previous-context", "")
    response = process_query_with_chain_of_thought(msg.message, previous_context)
    return {"reply": response}
