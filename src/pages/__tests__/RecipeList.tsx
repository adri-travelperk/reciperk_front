import "@testing-library/jest-dom";

import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { RecipeListItem } from '../RecipeList'
import { MemoryRouter, Routes } from 'react-router-dom'


// Testing RecipeList implies mocking fecth; which requires jest, I think.

test('RecipeListItem: Link to recipe works', () => {
    const testingRecipe = {
        name: "Test Recipe 1",
        description: "Test Recipe 1 Description",
        ingredients: [
            { id: 0, name: "Test Ingredient 1" },
            { id: 1, name: "Test Ingredient 2" }
        ]
    }

    render(
        <MemoryRouter>
            <RecipeListItem recipe={testingRecipe} />
        </MemoryRouter>
    )

    expect(screen.getByText(testingRecipe.name))
    expect(screen.getByText(testingRecipe.description))
    testingRecipe.ingredients.map((ingredient) => expect(screen.getByText(ingredient.name)))
})
