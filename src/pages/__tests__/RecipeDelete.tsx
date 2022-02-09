import "@testing-library/jest-dom";

import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'

import { RecipeName, RecipeDescription, Ingredients } from "../RecipeDelete"


// Testing RecipeView implies mocking fecth; which requires jest, I think.

test('RecipeName: renders ok', () => {
    render(
        <MemoryRouter>
            <RecipeName name="Test Recipe Name" />
        </MemoryRouter>
    )

    expect(screen.getByText('Test Recipe Name'))
})

test('RecipeDescription: renders ok', () => {
    render(
        <MemoryRouter>
            <RecipeDescription description="Test Recipe Description" />
        </MemoryRouter>
    )

    expect(screen.getByText("Test Recipe Description"))
})

test('Ingredients: renders ok', () => {
    const testIngredients = [
        {id: 0, name: "Test Ingredient 0"},
        {id: 1, name: "Test Ingredient 1"},
    ]

    render(
        <MemoryRouter>
            <Ingredients ingredients={testIngredients} />
        </MemoryRouter>
    )

    expect(screen.getByText("Test Ingredient 0"))
    expect(screen.getByText("Test Ingredient 1"))
})
