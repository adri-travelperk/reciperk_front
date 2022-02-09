import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export function RecipeName({ name }) {
  return (
    <>
      <Typography component='h6' variant='h6' color='primary' gutterBottom>Name</Typography>
      <Typography component='h6' variant='h4'>{name}</Typography>
    </>
  );

}


export function RecipeDescription({ description }) {
  return (
    <>
      <Typography component='h6' variant='h6' color='primary' gutterBottom>Description</Typography>
      <p>{description}</p>
    </>
  );
}


export function Ingredients({ ingredients }) {
  const ingredientList = ingredients.map((ingredient, idx) => <ListItem key={idx}><ListItemText>{ingredient.name}</ListItemText></ListItem>)

  return (
    <>
      <Typography component='h6' variant='h6' color='primary' gutterBottom>Ingredients</Typography>
      <List>
        {ingredientList}
      </List>
    </>
  )
}

export function RecipeView({ }) {
  const params = useParams();
  let recipeId = params.id;

  const emtpyRecipe = { name: "", description: "", ingredients: [] }
  const [recipe, setRecipe] = React.useState(emtpyRecipe)

  React.useEffect(() => {
    const url = 'http://127.0.0.1:8000/recipes/'.concat(recipeId || "")
    fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(response => { setRecipe(response) })
      .catch(console.log)
  }, [recipeId])

  const navigate = useNavigate()
  const navigateToRecipeList = React.useCallback(() => navigate('/recipes/', { replace: true }), [navigate]);
  const navigateToRecipeEdit = React.useCallback(() => navigate('/recipes/'.concat(recipeId || "").concat('/edit'), { replace: true }), [navigate]);
  const navigateToRecipeDelete = React.useCallback(() => navigate('/recipes/'.concat(recipeId || "").concat('/delete'), { replace: true }), [navigate]);

  return (
    <>
      <Grid>
        <Grid item md={3}>
          <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={navigateToRecipeList}>Back to recipes</Button>
        </Grid>
      </Grid>
      <Divider sx={{pb: 1, mb: 2}}/>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 120,
            }}
          >
            <RecipeName name={recipe.name} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <RecipeDescription description={recipe.description} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Ingredients ingredients={recipe.ingredients} />
          </Paper>
        </Grid>
      </Grid>
      <Grid>
        <Grid item md={3}>
          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={navigateToRecipeEdit}>Edit Recipe</Button>
        </Grid>
        <Grid item md={3}>
          <Button variant="contained" fullWidth sx={{ mt: 2 }} color="error" onClick={navigateToRecipeDelete}>Delete Recipe</Button>
        </Grid>
      </Grid>
    </>

  )
}