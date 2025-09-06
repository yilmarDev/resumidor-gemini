import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');

  const GEMINI_API =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  const handleSummarize = async () => {
    try {
      const res = await axios.post(`${GEMINI_API}?key=${API_KEY}`, {
        contents: [
          {
            parts: [
              {
                text: `Resume este texto en 3 versiones (corto, medio, largo):\n\n${input}`,
              },
            ],
          },
        ],
      });
      setSummary(JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Resumidor con Gemini</h1>
      <textarea
        className="w-2/3 p-3 rounded-md border border-gray-300"
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Pega aquí el artículo..."
      />
      <button
        onClick={handleSummarize}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Resumir
      </button>

      {summary && (
        <pre className="mt-6 bg-white p-4 rounded-md shadow w-2/3 text-sm overflow-x-auto">
          {summary}
        </pre>
      )}
    </div>
  );
}

export default App;
