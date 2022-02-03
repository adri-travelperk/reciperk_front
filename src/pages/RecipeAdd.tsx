import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import RecipeEditView from '../components/RecipeEditView';


export default function RecipeAdd() {
    const emptyRecipe = { name: "", description: "", ingredients: [] }
    const [recipe, setRecipe] = React.useState(emptyRecipe)

    const setRecipeName = (newRecipeName) => { setRecipe({ ...recipe, name: newRecipeName }) }
    const setRecipeDescription = (newRecipeDescription) => { setRecipe({ ...recipe, description: newRecipeDescription }) }
    const setRecipeIngredients = (newRecipeIngredients) => { setRecipe({ ...recipe, ingredients: newRecipeIngredients }) }

    const navigate = useNavigate();
    const navigateToNewRecipe = React.useCallback((recipeId) => navigate('/recipes/'.concat(recipeId || ""), { replace: true }), [navigate]);

    const postNewRecipe = (recipe) => {
        const data = {
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients.map(ingredient => { return { name: ingredient.name } })
        }

        fetch('http://127.0.0.1:8000/recipes/', { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then(res => res.json())
            .then(recipe => navigateToNewRecipe(recipe.id))
            .catch(console.log)
    }

    return (<RecipeEditView recipe={recipe} editableName={true} saveButtonCallback={postNewRecipe}
        setRecipeName={setRecipeName} setRecipeDescription={setRecipeDescription} setRecipeIngredients={setRecipeIngredients} />)
}