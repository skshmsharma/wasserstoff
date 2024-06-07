// src/components/Chatbot.js

import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post('http://localhost:8000/chat', { query: input });
            const botMessage = { sender: 'bot', text: response.data.response };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error('Error communicating with chatbot:', error);
        }

        setInput('');
    };

    return (
        <div style={styles.chatbot}>
            <div style={styles.messages}>
                {messages.map((message, index) => (
                    <div key={index} style={{ ...styles.message, alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={styles.input}
                    placeholder="Type a message..."
                />
                <button onClick={handleSend} style={styles.button}>Send</button>
            </div>
        </div>
    );
};

const styles = {
    chatbot: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
    },
    messages: {
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: '10px',
    },
    message: {
        padding: '10px',
        borderRadius: '5px',
        margin: '5px 0',
        backgroundColor: '#f1f1f1',
    },
    inputContainer: {
        display: 'flex',
        width: '100%',
    },
    input: {
        flex: 1,
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    button: {
        padding: '10px',
        marginLeft: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
};

export default Chatbot;
