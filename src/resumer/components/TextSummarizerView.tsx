'use client';

import { Dispatch, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  CircularProgress,
  Tab,
  Tabs,
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TextSummarizerViewProps {
  short?: string;
  medium?: string;
  long?: string;
  isLoading?: boolean;
  originalTextInput: string;
  setOriginalTextInput: Dispatch<React.SetStateAction<string>>;
  setIsSummarizerActive: Dispatch<React.SetStateAction<boolean>>;
}

export const TextSummarizerView = ({
  short = 'Aquí aparecerá el resumen corto...',
  medium = 'Aquí aparecerá el resumen medio...',
  long = 'Aquí aparecerá el resumen largo...',
  isLoading,
  originalTextInput: inputValue,
  setOriginalTextInput: onInputChange,
  setIsSummarizerActive,
}: TextSummarizerViewProps) => {
  const [currentTab, setCurrentTab] = useState(0);

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Pega tu texto aquí"
            multiline
            rows={10}
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              disabled={!inputValue || isLoading}
              onClick={() => setIsSummarizerActive(true)}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Resumir'}
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={currentTab}
              onChange={handleChange}
              aria-label="Visualizador de resumenes"
            >
              <Tab label="Normal view" {...a11yProps(0)} />
              <Tab label="Markdown view" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={currentTab} index={0}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Resumen corto
                    </Typography>
                    <Typography variant="body2">{short}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Resumen medio
                    </Typography>
                    <Typography variant="body2">{medium}</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Resumen Largo
                    </Typography>
                    <Typography variant="body2">{long}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={currentTab} index={1}>
            Item Two
          </CustomTabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};
