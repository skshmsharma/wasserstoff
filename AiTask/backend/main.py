from fastapi import FastAPI
from pydantic import BaseModel
from chatbot import generate_response  # Assuming chatbot.py contains the logic for generating responses

class Message(BaseModel):
    message: str

app = FastAPI()

@app.post("/api/chat")
async def chat_endpoint(msg: Message):
    response = generate_response(msg.message)
    return {"reply": response}
