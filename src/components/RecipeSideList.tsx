import * as React from 'react';
import { List, ListItem, ListItemText, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'

export default function RecipeSideList({ recipes }) {
    var sideBarRecipes = recipes.slice(0, 3).map((recipe, idx) =>
        <ListItem sx={{ pl: 3 }} key={idx}>
            <ListItemText>
                <Link component={RouterLink} color='text.secondary' to={'/recipes/'.concat(recipe.id)}>{recipe.name}</Link>
            </ListItemText>
        </ListItem>)

    if (recipes.length > 3) {
        sideBarRecipes = sideBarRecipes.concat(
            <ListItem key={99}>
                <ListItemText color="primary" sx={{ pl: 1 }}>
                    <Link component={RouterLink} color='text.secondary' to='/recipes'>See more ...</Link>
                </ListItemText>
            </ListItem>
        )
    }

    return (
        <List>
            {sideBarRecipes}
        </List>)
}