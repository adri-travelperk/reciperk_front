import * as React from 'react';
import { Typography, TextField } from '@mui/material'

export default function RecipeNameEdit({ name, editable, setName }) {
    if (editable) {
        return (
            <>
                <Typography component='h6' variant='h5' color='primary' gutterBottom>Name</Typography>
                <TextField value={name} onChange={(e) => setName(e.target.value)} />
            </>
        );

    } else {
        return (
            <>
                <Typography component='h6' variant='h6' color='primary' gutterBottom>Name</Typography>
                <Typography component='h6' variant='h4'>{name}</Typography>
            </>
        );
    }
}