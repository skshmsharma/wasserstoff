import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [context, setContext] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/query', {
        user_query: query,
        previous_context: context
      });
      setResponse(res.data.response);
      setContext(prev => prev + ' ' + query + ' ' + res.data.response);
      setQuery('');
    } catch (error) {
      console.error('Error querying the API', error);
    }
  };

  return (
    <div>
      <h1>Query Suggestion Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Response</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
