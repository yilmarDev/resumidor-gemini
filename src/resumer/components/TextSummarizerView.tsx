'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  CircularProgress,
} from '@mui/material';

interface TextSummarizerViewProps {
  short?: string;
  medium?: string;
  long?: string;
}

export const TextSummarizerView = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState<{
    short?: string;
    medium?: string;
    long?: string;
  }>({});

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            label="Pega tu texto aquí"
            multiline
            rows={10}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              disabled={!inputText || loading}
              onClick={() => console.log('object')}
            >
              {loading ? <CircularProgress size={24} /> : 'Resumir'}
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2}>
            {['short', 'medium', 'long'].map((type) => (
              <Grid size={{ xs: 12 }} key={type}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {type === 'short'
                        ? 'Resumen Corto'
                        : type === 'medium'
                        ? 'Resumen Medio'
                        : 'Resumen Largo'}
                    </Typography>
                    <Typography variant="body2">
                      {summaries[type as keyof typeof summaries] ||
                        'Aquí aparecerá el resumen...'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
