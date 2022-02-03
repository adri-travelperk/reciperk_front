import * as React from 'react';
import { Grid, Paper, Button } from '@mui/material'

import RecipeNameEdit from './RecipeNameEdit';
import RecipeDescriptionEdit from './RecipeDescriptionEdit';
import RecipeIngredientsEdit from './RecipeIngredientsEdit';

export default function RecipeEditView({ recipe, editableName, setRecipeName, setRecipeDescription, setRecipeIngredients, saveButtonCallback }) {
    return (
        <>
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
                        <RecipeNameEdit name={recipe.name} editable={editableName} setName={setRecipeName} />
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
                        <RecipeDescriptionEdit description={recipe.description} setDescription={setRecipeDescription} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <RecipeIngredientsEdit ingredients={recipe.ingredients} setIngredients={setRecipeIngredients} />
                    </Paper>
                </Grid>
            </Grid>
            <Grid>
                <Grid item md={3}>
                    <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={(e) => { saveButtonCallback(recipe) }}>Save Recipe</Button>
                </Grid>
            </Grid>
        </>
    )
}