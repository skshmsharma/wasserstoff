document.getElementById("chat-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    const messagesDiv = document.getElementById("messages");
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.textContent = userInput;
    messagesDiv.appendChild(userMessage);

    const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "previous-context": getPreviousContext()
        },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    const botMessage = document.createElement("div");
    botMessage.className = "message bot-message";
    botMessage.textContent = data.reply;
    messagesDiv.appendChild(botMessage);

    document.getElementById("user-input").value = "";
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

function getPreviousContext() {
    const messagesDiv = document.getElementById("messages");
    const messages = messagesDiv.querySelectorAll(".message");
    let context = "";
    messages.forEach(message => {
        context += message.textContent + " ";
    });
    return context.trim();
}
