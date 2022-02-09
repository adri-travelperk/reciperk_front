import "@testing-library/jest-dom";

import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'

import RecipeEditView from '../RecipeEditView'


// Testing RecipeView implies mocking fecth; which requires jest, I think.
// Can I test that a callback was been called without using jest?

test("RecipeEditView: renders ok", () => {
    const recipe = {
        id: "1", name: "Test Recipe", description: "Test Description",
        ingredients: [
            {id: 0, name: "Test Ingredient 0"},
            {id: 1, name: "Test Ingredient 1"},
        ]
    }

    render(
    <MemoryRouter>
        <RecipeEditView recipe={recipe} editableName={false} 
        setRecipeName={() => {}}
        setRecipeDescription={() => {}}
        setRecipeIngredients={() => {}}
        saveButtonCallback={() => {}}
        />
    </MemoryRouter>
    )

    expect(screen.getByText("Test Recipe"))
    expect(screen.getByDisplayValue('Test Description'))
    recipe.ingredients.map((ingredient) => expect(screen.getByText(ingredient.name)))

    expect(screen.getByText("Save Recipe"))

})

test("RecipeEditView: renders ok with editable name", () => {
    const recipe = {
        id: "", name: "Testing Editable Name", description: "",
        ingredients: []
    }

    render(
    <MemoryRouter>
        <RecipeEditView recipe={recipe} editableName={true} 
        setRecipeName={() => {}}
        setRecipeDescription={() => {}}
        setRecipeIngredients={() => {}}
        saveButtonCallback={() => {}}
        />
    </MemoryRouter>
    )

    expect(screen.queryByText("Testing Editable Name")).toBeFalsy()
    expect(screen.queryByDisplayValue("Testing Editable Name")).toBeTruthy()

    expect(screen.getByText("Save Recipe"))

})