import * as React from 'react'

import { Typography, List, ListItem, Button, TextField, ListItemText, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import useToggle from '../hooks/useToggle';


function IngredientEdit({ ingredient, editIngredient, deleteIngredient }) {
    const [isEditing, editToggle] = useToggle(false)
    return (
      <ListItem>
        {isEditing ?
          <form onSubmit={(e) => { e.preventDefault(); editToggle() }}>
            <TextField margin="normal" value={ingredient.name} onChange={(e) => editIngredient(ingredient.id, e.target.value)} />
          </form> :
          <>
            <ListItemText>{ingredient.name}</ListItemText>
            <IconButton aria-label='Edit' onClick={editToggle}><EditIcon /></IconButton>
            <IconButton aria-label='Delete' onClick={(e) => { deleteIngredient(ingredient.id) }}><DeleteIcon /></IconButton>
          </>
        }
      </ListItem >
    )
  }

export default function RecipeIngredientsEdit({ ingredients, setIngredients }) {

    function addIngredient(newIngredientName) {
        ingredients.push({ id: ingredients.length, name: newIngredientName });
        setIngredients(ingredients);
    }

    function editIngredient(ingredientId, newName) {
        const updatedIngredients = ingredients.map(ingredient => ingredient.id === ingredientId ? { ...ingredient, name: newName } : ingredient);
        setIngredients(updatedIngredients);
    }

    function deleteIngredient(ingredientId) {setIngredients(ingredients.filter(ing => ing.id !== ingredientId));}

    let ingredientArray = ingredients.map((ingredient, idx) => 
    <IngredientEdit ingredient={ingredient} editIngredient={editIngredient} deleteIngredient={deleteIngredient} key={idx} />);

    return (
        <>
            <Typography component='h6' variant='h5' color='primary' gutterBottom>Ingredients</Typography>
            <List>
                {ingredientArray}
                <ListItem key={999}><Button onClick={(e) => { addIngredient("") }}><Typography variant='body1'>Add Ingredient</Typography></Button></ListItem>
            </List>
        </>
    )
}