import React, { useState, FormEvent } from 'react';
import axios from 'axios';

interface CompletionResponse {
  content: string;
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<CompletionResponse>('http://localhost:8080/completion', {
        prompt,
        n_predict: 128,
      });
      setResponse(res.data.content);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Llama.cpp Client</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
