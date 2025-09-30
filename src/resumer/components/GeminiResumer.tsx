import React, { useCallback, useEffect, useState } from 'react';
import { useGetGeminiResumeQuery } from '../hooks/useGetGeminiResumeQuery';
import { TextSummarizerView } from './TextSummarizerView';

export const GeminiResumer = () => {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');

  const [shortSummary, setShortSummary] = useState<string>('');
  const [mediumSummary, setMediumSummary] = useState<string>('');
  const [longSummary, setLongSummary] = useState<string>('');

  const geminiResumeGetter = useGetGeminiResumeQuery(input);

  const handleSummarize = useCallback(async () => {
    if (geminiResumeGetter.data) {
      const str = JSON.stringify(geminiResumeGetter.data);
      setSummary(str);

      const obj =
        geminiResumeGetter.data.candidates?.[0].content?.parts?.[0].text;
      if (obj) {
        const parts = obj.split(/\*\*.*?\*\*/g);
        setShortSummary(parts[1] || '');
        setMediumSummary(parts[2] || '');
        setLongSummary(parts[3] || '');
        console.log('Parts: ', parts);
      }
    }
  }, [geminiResumeGetter.data]);

  useEffect(() => {
    handleSummarize();
  }, [geminiResumeGetter, handleSummarize]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Resumidor con Gemini</h1>

      {summary && (
        <pre className="mt-6 bg-white p-4 rounded-md shadow w-2/3 text-sm overflow-x-auto">
          {summary}
        </pre>
      )}
      <TextSummarizerView
        short={shortSummary}
        medium={mediumSummary}
        long={longSummary}
        isLoading={geminiResumeGetter.isLoading}
        inputValue={input}
        onInputChange={setInput}
      />
    </div>
  );
};
