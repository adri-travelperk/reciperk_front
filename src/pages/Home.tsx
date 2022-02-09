import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Grid, Divider, Link } from '@mui/material'


export default function Home({ randomRecipe }) {

    const recipePath = '/recipes/' + randomRecipe.id

    return (
        <Grid container>
            <Grid item md={12}>
                <Typography variant="h3" color="primary" align="center">Welcome to Reciperk!</Typography>
            </Grid>

            <Grid item md={12}>
                <Typography variant="h6" align="center" color="GrayText">The #1 recipe repository according to our moms.</Typography>
            </Grid>

            <Divider sx={{ height: 60 }} />

            <Grid item md={12}>
                <Typography align="center">You can&nbsp;
                    <Link component={RouterLink} to='/recipes/add' color="text.secondary">add</Link>
                    &nbsp;a new recipe or&nbsp;
                    <Link component={RouterLink} to='/recipes' color="text.secondary">explore</Link>
                    &nbsp;existing ones.</Typography>
            </Grid>

            <Divider sx={{ height: 60 }} />

            <Grid item md={12}>
                <Typography align="center">Dont know where to start?</Typography>
                <Typography align="center">
                    <Link component={RouterLink} to={recipePath}>
                        Learn how to cook {randomRecipe.name}
                    </Link>
                </Typography>
            </Grid>
        </Grid>
    )
}