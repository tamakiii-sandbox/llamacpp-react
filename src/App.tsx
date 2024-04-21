import React, { useState, FormEvent } from 'react';

interface CompletionResponse {
  content: string;
  stop: boolean;
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setResponse('');

    try {
      const res = await fetch('http://localhost:8080/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          n_predict: 128,
          stream: true,
        }),
      });

      if (!res.body) {
        throw new Error('Failed to get response body');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');

      const processStream = async () => {
        const { value, done } = await reader.read();
        if (done) return;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          const match = line.match(/data: (.+)/);
          if (match) {
            const data: CompletionResponse = JSON.parse(match[1]);
            setResponse((prevResponse) => prevResponse + data.content);
            if (data.stop) return;
          }
        }

        await processStream();
      };

      await processStream();
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
