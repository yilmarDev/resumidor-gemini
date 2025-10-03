import { useCallback, useEffect, useState } from 'react';
import { useGetGeminiSummarizerQuery } from '../hooks/useGetGeminiSummarizerQuery';
import { TextSummarizerView } from './TextSummarizerView';
import { Box, Tab, Tabs, Typography } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const GeminiSummarizer = () => {
  const [originalTextInput, setOriginalTextInput] = useState<string>('');
  const [isSummarizerActive, setIsSummarizerActive] = useState<boolean>(false);

  const [allSummaries, setAllSummaries] = useState<string>('');
  const [shortSummary, setShortSummary] = useState<string>('');
  const [mediumSummary, setMediumSummary] = useState<string>('');
  const [longSummary, setLongSummary] = useState<string>('');

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>

      {allSummaries && (
        <pre className="mt-6 bg-white p-4 rounded-md shadow w-2/3 text-sm overflow-x-auto">
          {allSummaries}
        </pre>
      )}
    </div>
  );
};
