import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (query.trim() === '') return;

        const userMessage = { type: 'user', text: query };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await axios.post('/api/chat', { message: query }, {
                headers: { "previous-context": messages.map(msg => msg.text).join(' ') }
            });
            const botMessage = { type: 'bot', text: response.data.reply };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error querying the API', error);
        }
        setQuery('');
    };

    return (
        <div id="chat-container">
            <div id="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.type}-message`}>{msg.text}</div>
                ))}
            </div>
            <form id="chat-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="user-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chatbot;
