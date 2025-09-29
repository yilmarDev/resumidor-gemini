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
  isLoading?: boolean;
}

export const TextSummarizerView = ({
  short = 'Aquí aparecerá el resumen corto...',
  medium = 'Aquí aparecerá el resumen medio...',
  long = 'Aquí aparecerá el resumen largo...',
  isLoading,
}: TextSummarizerViewProps) => {
  const [inputText, setInputText] = useState('');

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
              disabled={!inputText || isLoading}
              onClick={() => console.log('object')}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Resumir'}
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
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
        </Grid>
      </Grid>
    </Box>
  );
};
