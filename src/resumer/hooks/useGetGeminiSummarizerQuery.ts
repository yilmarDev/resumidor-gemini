import { useQuery } from '@tanstack/react-query';
import { getGeminiSummary } from '../services/actions';

export const useGetGeminiSummarizerQuery = (
  input: string,
  isSummarizerActive: boolean
) => {
  const query = useQuery({
    queryKey: [`geminiSummary`],
    queryFn: () => getGeminiSummary(input),
    enabled: !!input && !!isSummarizerActive,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return query;
};
