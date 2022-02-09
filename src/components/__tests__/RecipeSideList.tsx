import "@testing-library/jest-dom";

import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Home from '../RecipeSideList'
import { MemoryRouter, Routes } from 'react-router-dom'
import RecipeSideList from "../RecipeSideList";


test('RecipeSideList: Link to recipe works', () => {
    const testingRecipes = [
        { id: 1, name: "Test Recipe 1" },
        { id: 2, name: "Test Recipe 2" }
    ]

    render(
        <MemoryRouter>
            <RecipeSideList recipes={testingRecipes} />
        </MemoryRouter>
    )
    expect(screen.getByText('Test Recipe 1').closest('a')).toHaveAttribute('href', '/recipes/1')
})


test('RecipeSideList: No more than three recipes are rendered, and see more link works', () => {
    const testingRecipes = [
        { id: 1, name: "Test Recipe 1" },
        { id: 2, name: "Test Recipe 2" },
        { id: 3, name: "Test Recipe 3" },
        { id: 4, name: "Test Recipe 4" }
    ]

    render(
        <MemoryRouter>
            <RecipeSideList recipes={testingRecipes} />
        </MemoryRouter>
    )
    expect(screen.queryByText('Test Recipe 1')).toBeTruthy()
    expect(screen.queryByText('Test Recipe 4')).toBeFalsy()

    expect(screen.getByText('See more ...').closest('a')).toHaveAttribute('href', '/recipes')
})