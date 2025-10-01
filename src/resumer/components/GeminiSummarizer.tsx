import { useCallback, useEffect, useState } from 'react';
import { useGetGeminiSummarizerQuery } from '../hooks/useGetGeminiSummarizerQuery';
import { TextSummarizerView } from './TextSummarizerView';
import { Typography } from '@mui/material';

export const GeminiSummarizer = () => {
  const [originalTextInput, setOriginalTextInput] = useState<string>('');
  const [isSummarizerActive, setIsSummarizerActive] = useState<boolean>(false);

  const [allSummaries, setAllSummaries] = useState<string>('');
  const [shortSummary, setShortSummary] = useState<string>('');
  const [mediumSummary, setMediumSummary] = useState<string>('');
  const [longSummary, setLongSummary] = useState<string>('');

  const geminiResumeGetter = useGetGeminiSummarizerQuery(
    originalTextInput,
    isSummarizerActive
  );

  const handleSummarize = useCallback(async () => {
    if (geminiResumeGetter.data) {
      const str = JSON.stringify(geminiResumeGetter.data);
      setAllSummaries(str);

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

  useEffect(() => {
    if (isSummarizerActive) setIsSummarizerActive(false);
  }, [isSummarizerActive]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <Typography component="h1" variant="h3">
        Resumidor con Gemini
      </Typography>

      <TextSummarizerView
        short={shortSummary}
        medium={mediumSummary}
        long={longSummary}
        isLoading={geminiResumeGetter.isLoading}
        originalTextInput={originalTextInput}
        setOriginalTextInput={setOriginalTextInput}
        setIsSummarizerActive={setIsSummarizerActive}
      />

      {allSummaries && (
        <pre className="mt-6 bg-white p-4 rounded-md shadow w-2/3 text-sm overflow-x-auto">
          {allSummaries}
        </pre>
      )}
    </div>
  );
};
