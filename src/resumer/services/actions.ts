import { geminiApi } from '../../shared/api/geminiApi';

import type { GenerateContentResponse } from '@google/genai';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export const getGeminiResume = async (
  input: string
): Promise<GenerateContentResponse> => {
  const { data } = await geminiApi.post<GenerateContentResponse>(
    `gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: `Resume este texto en 3 versiones (corto, medio, largo):\n\n${input}`,
            },
          ],
        },
      ],
    }
  );

  return data;
};
