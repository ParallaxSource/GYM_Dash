import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { css } from '@emotion/react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/generate-routine';

const AIroutineMaker = () => {
  const [weight, setWeight] = useState('');
  const [days, setDays] = useState('');
  const [height, setHeight] = useState('');
  const [generatedRoutine, setGeneratedRoutine] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(API_URL, {
        weight,
        days,
        height
      });
      setGeneratedRoutine(response.data.generatedRoutine);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}>
      <form onSubmit={handleSubmit} css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}>
        <TextField
          label="Weight"
          type="number"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          css={css`
            margin-top: 1rem;
          `}
        />
        <TextField
          label="Days of gym"
          type="number"
          value={days}
          onChange={(event) => setDays(event.target.value)}
          css={css`
            margin-top: 1rem;
          `}
        />
        <TextField
          label="Height"
          type="number"
          value={height}
          onChange={(event) => setHeight(event.target.value)}
          css={css`
            margin-top: 1rem;
          `}
        />
        <Button type="submit" variant="contained" color="primary" css={css`
          margin-top: 1rem;
        `}>
          Generate Routine
        </Button>
      </form>
      {generatedRoutine && (
        <div css={css`
            margin-top: 1rem;
          `}>
          Generated Routine {generatedRoutine}
        </div>
      )}
    </div>
  );
};

export default AIroutineMaker;
