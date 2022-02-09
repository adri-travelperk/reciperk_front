import "@testing-library/jest-dom";

import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Home from '../Home'
import { MemoryRouter, Routes } from 'react-router-dom'

test('Loads Homepage', () => {
    const subtitle = "The #1 recipe repository according to our moms."
    const randomRecipePrompt = "Learn how to cook Test Recipe"
    render(
        <MemoryRouter>
            <Home randomRecipe={{ id: 1, name: "Test Recipe" }} />
        </MemoryRouter>
    )

    expect(screen.queryByText(subtitle)).toBeTruthy()
    expect(screen.queryByText(randomRecipePrompt)).toBeTruthy()
})

test('Homepage: add and explore links work.', () => {
    render(
        <MemoryRouter>
            <Home randomRecipe={{ id: 1, name: "Test Recipe" }} />
        </MemoryRouter>
    )

    expect(screen.getByText('add').closest('a')).toHaveAttribute('href', '/recipes/add')
    expect(screen.getByText('explore').closest('a')).toHaveAttribute('href', '/recipes')
})

test('Homepage: Random recipe redirects to recipe view', () => {
    const randomRecipePrompt = "Learn how to cook Test Recipe"

    render(
        <MemoryRouter>
            <Home randomRecipe={{ id: 1, name: "Test Recipe" }} />
        </MemoryRouter>
    )

    expect(screen.getByText(randomRecipePrompt).closest('a')).toHaveAttribute('href', '/recipes/1')
})
