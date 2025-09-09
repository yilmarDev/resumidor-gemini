import { geminiApi } from '../../shared/api/geminiApi';
import { GeminiResumeResponse } from '../interfaces/gemini';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

export const getGeminiResume = async (
  input: string
): Promise<GeminiResumeResponse> => {
  const { data } = await geminiApi.post<GeminiResumeResponse>(
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
