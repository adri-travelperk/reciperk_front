import * as React from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText, Divider, TextField, Button, IconButton } from '@mui/material';

import { Link as RouterLink, useNavigate } from 'react-router-dom';


export function RecipeListItem({ recipe }) {
    const shownIngredients = recipe.ingredients
    const navigate = useNavigate()
    const navigateToRecipe = React.useCallback(() => navigate('/recipes/'.concat(recipe.id), { replace: true }), [navigate]);

    return (
        <>
            <Grid item md={9}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 230 }} onClick={navigateToRecipe}>
                    <Typography variant="h5" color="primary" sx={{ p: 2 }}>{recipe.name}</Typography>
                    <Typography variant="body1" sx={{ p: 1, pl: 2 }}>{recipe.description}</Typography>
                </Paper>
            </Grid>
            <Divider orientation="vertical" sx={{width: 10}} />
            <Grid item md={3}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 230 }} onClick={navigateToRecipe}>
                    <List>
                        {shownIngredients.map((ingredient, idx) =>
                            <ListItem key={idx}>
                                <ListItemText>
                                    {ingredient.name}
                                </ListItemText>
                            </ListItem>
                        )}
                    </List>
                </Paper>
            </Grid>
            <Divider />
        </>
    )
}

function RecipeSearchBar({ setRecipeList }) {
    const [searchText, setSearchText] = React.useState("")

    const searchRecipes = (event) => {
        event.preventDefault();
        fetch('http://127.0.0.1:8000/recipes/?name='.concat(searchText), { method: "GET" })
            .then(res => res.json())
            .then(response => { setRecipeList(response) })
            .catch(console.log)
    }

    return (
        <>
            <Grid item md={10}>
                <form onSubmit={searchRecipes}>
                    <TextField variant="outlined" fullWidth size="small" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                </form>
            </Grid>
            <Grid item md={2}>
                <Button variant="contained" fullWidth onClick={(e) => { searchRecipes }}>Search</Button>
            </Grid>
        </>
    )
}

export default function RecipeList() {

    const [recipeList, setRecipeList] = React.useState([])

    React.useEffect(() => {
        fetch('http://127.0.0.1:8000/recipes/', { method: "GET" })
            .then(res => res.json())
            .then(response => { setRecipeList(response) })
            .catch(console.log)
    }, [])


    const recipesView = recipeList.map((recipe, idx) => <ListItem key={idx}><RecipeListItem recipe={recipe} /></ListItem>)

    return (

        <Grid container spacing={1}>
            <RecipeSearchBar setRecipeList={setRecipeList} />
            <Divider sx={{ height: 70 }} />
            <List>
                {recipesView}
            </List>
        </Grid>
    )
}