import React, { useEffect, useState } from 'react';
import { useGetGeminiResumeQuery } from '../hooks/useGetGeminiResumeQuery';
import { TextSummarizerView } from './TextSummarizerView';

type Props = {};

export const GeminiResumer = (props: Props) => {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');

  const [shortSummary, setShortSummary] = useState<string>('');
  const [mediumSummary, setMediumSummary] = useState<string>('');
  const [longSummary, setLongSummary] = useState<string>('');

  const geminiResumeGetter = useGetGeminiResumeQuery(input);

  const handleSummarize = async () => {
    if (geminiResumeGetter.data) {
      const obj = geminiResumeGetter.data;
      const str = JSON.stringify(geminiResumeGetter.data);

      console.log('Resumen: ', obj.candidates);
      setSummary(str);
    }
  };

  useEffect(() => {
    handleSummarize();
  }, [geminiResumeGetter]);

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
        disabled={!input.length || input.length < 20}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Resumir
      </button>

      {summary && (
        <pre className="mt-6 bg-white p-4 rounded-md shadow w-2/3 text-sm overflow-x-auto">
          {summary}
        </pre>
      )}
      <TextSummarizerView />
    </div>
  );
};
