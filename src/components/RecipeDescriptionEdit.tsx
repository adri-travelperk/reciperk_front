import * as React from 'react';
import { Typography, TextField } from '@mui/material'

export default function RecipeDescriptionEdit({ description, setDescription }) {
    return (
      <>
        <Typography component='h6' variant='h5' color='primary' gutterBottom>Description</Typography>
        <TextField value={description} onChange={(e) => setDescription(e.target.value)} />
      </>
    );
  }