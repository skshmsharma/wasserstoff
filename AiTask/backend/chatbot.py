from transformers import RagTokenizer, RagRetriever, RagSequenceForGeneration

tokenizer = RagTokenizer.from_pretrained("facebook/rag-token-nq")
retriever = RagRetriever.from_pretrained("facebook/rag-token-nq", index_name="exact")
model = RagSequenceForGeneration.from_pretrained("facebook/rag-token-nq", retriever=retriever)

def process_query_with_chain_of_thought(user_query: str, previous_context: str) -> str:
    context = f"{previous_context} {user_query}" if previous_context else user_query
    inputs = tokenizer(context, return_tensors="pt")
    generated = model.generate(**inputs)
    initial_response = tokenizer.batch_decode(generated, skip_special_tokens=True)[0]
    thought_steps = develop_reasoning_steps(initial_response, previous_context)
    final_response = refine_response_based_on_thought_steps(thought_steps)
    return final_response

def develop_reasoning_steps(response: str, context: str) -> List[str]:
    # Improved reasoning steps logic
    steps = [
        f"Analyzing context: {context}",
        f"Initial response: {response}",
        "Refining the response based on context and logic."
    ]
    return steps

def refine_response_based_on_thought_steps(thought_steps: List[str]) -> str:
    refined_response = " ".join(thought_steps)
    return refined_response
