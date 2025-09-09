import { useQuery } from '@tanstack/react-query';
import { getGeminiResume } from '../services/actions';

export const useGetGeminiResumeQuery = (input: string) => {
  const query = useQuery({
    queryKey: [`geminiResume`],
    queryFn: () => getGeminiResume(input),
    enabled: !!input,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return query;
};
