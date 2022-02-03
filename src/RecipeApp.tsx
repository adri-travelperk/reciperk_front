import { useState } from 'react'

import Dashboard from "./pages/Dashboard";
import {BrowserRouter} from "react-router-dom";

import useToggle from "./hooks/useToggle";
import useInputState from "./hooks/useInputState";

export default () => {

    return (
        <BrowserRouter>
            <Dashboard />
        </BrowserRouter>
    )
}