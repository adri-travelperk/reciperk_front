import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import RecipeEditView from '../components/RecipeEditView';

export function RecipeEdit({ editableName = false }) {

  const recipeId = useParams().id

  const emptyRecipe = { name: "", description: "", ingredients: [] }
  const [recipe, setRecipe] = React.useState(emptyRecipe)

  const setRecipeName = (newRecipeName) => { setRecipe({ ...recipe, name: newRecipeName }) }
  const setRecipeDescription = (newRecipeDescription) => { setRecipe({ ...recipe, description: newRecipeDescription }) }
  const setRecipeIngredients = (newRecipeIngredients) => { setRecipe({ ...recipe, ingredients: newRecipeIngredients }) }

  const navigate = useNavigate();
  const navigateToRecipeView = React.useCallback(() => navigate('/recipes/'.concat(recipeId || ""), { replace: true }), [navigate, recipeId]);

  const putRecipeData = (recipe) => {
    const data = {
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients.map(ingredient => { return { name: ingredient.name } })
    }
    if (recipeId !== undefined) {
      fetch('http://127.0.0.1:8000/recipes/'.concat(recipeId).concat('/'), {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .catch(console.log)
      navigateToRecipeView()
    }
  }

  React.useEffect(() => {
    if (recipeId !== undefined) {
      fetch('http://127.0.0.1:8000/recipes/'.concat(recipeId), { method: "GET" })
        .then(res => res.json())
        .then(recipe => {
          let newIngredients: object[] = []
          for (let i = 0; i < recipe.ingredients.length; i++) {
            newIngredients.push({ id: i, name: recipe.ingredients[i].name })
          }
          recipe.ingredients = newIngredients;
          return recipe
        }).then(response => {
          setRecipe(response);
        })
        .catch(console.log)
    }
  }, [recipeId])

  return (<RecipeEditView recipe={recipe} editableName={editableName} saveButtonCallback={putRecipeData}
    setRecipeName={setRecipeName} setRecipeDescription={setRecipeDescription} setRecipeIngredients={setRecipeIngredients} />)
}