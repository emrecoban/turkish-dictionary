import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';

export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:kelime?" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    )
}