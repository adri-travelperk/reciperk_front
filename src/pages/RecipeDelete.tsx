import * as React from 'react';
import { List, Typography, Grid, Paper, ListItem, ListItemText, Button } from '@mui/material'

import { useParams, useNavigate } from 'react-router-dom'


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

export default function RecipeDelete() {

  const recipeId = useParams().id

  const emtpyRecipe = { name: "", description: "", ingredients: [] }
  const [recipe, setRecipe] = React.useState(emtpyRecipe)

  React.useEffect(() => {
    const url = 'http://127.0.0.1:8000/recipes/'.concat(recipeId || "")
    fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(response => { setRecipe(response) })
      .catch(console.log)
  }, [recipeId])

  const navigate = useNavigate();
  const navigateToRecipeList = React.useCallback(() => navigate('/recipes/', { replace: true }), [navigate]);

  const DeleteRecipe = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/recipes/'.concat(recipeId || ""), { method: "DELETE" })
      .catch(console.log)
      .then(navigateToRecipeList)
  }


  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <Paper>
            <Typography variant="h5" align="center" sx={{ color: "error.main", p: 1 }}>Review recipe before deletion</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 120,
              bgcolor: "LightGrey"
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
              flexDirection: 'column',
              bgcolor: "LightGrey"
            }}
          >
            <RecipeDescription description={recipe.description} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: "LightGrey" }}>
            <Ingredients ingredients={recipe.ingredients} />
          </Paper>
        </Grid>
        <Grid item md={8}>
          <Typography variant="body1" sx={{ color: "error.main", p: 1, pl: 1.5 }}>Are you sure you want to delete this recipe?</Typography>
          <Grid>
            <Grid item md={4}>
              <Button variant="contained" fullWidth sx={{ mt: 2, m: 1 }} color="error" onClick={DeleteRecipe}>Yes, Delete!</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </>
  )
}