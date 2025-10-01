import { useCallback, useEffect, useState } from 'react';
import { useGetGeminiResumeQuery } from '../hooks/useGetGeminiResumeQuery';
import { TextSummarizerView } from './TextSummarizerView';
import { Typography } from '@mui/material';

export const GeminiResumer = () => {
  const [originalTextInput, setOriginalTextInput] = useState<string>('');
  const [isResumerActive, setIsResumerActive] = useState<boolean>(false);

  const [allSummaries, setAllSummaries] = useState<string>('');
  const [shortSummary, setShortSummary] = useState<string>('');
  const [mediumSummary, setMediumSummary] = useState<string>('');
  const [longSummary, setLongSummary] = useState<string>('');

  const geminiResumeGetter = useGetGeminiResumeQuery(
    originalTextInput,
    isResumerActive
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
    if (isResumerActive) setIsResumerActive(false);
  }, [isResumerActive]);

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
        inputValue={originalTextInput}
        onInputChange={setOriginalTextInput}
        setIsResumerActive={setIsResumerActive}
      />

      {allSummaries && (
        <pre className="mt-6 bg-white p-4 rounded-md shadow w-2/3 text-sm overflow-x-auto">
          {allSummaries}
        </pre>
      )}
    </div>
  );
};
