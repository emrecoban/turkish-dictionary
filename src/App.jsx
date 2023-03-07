import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';

import { HelmetProvider } from 'react-helmet-async';

export default function App(){
    
    const helmetContext = {};
    return (
        <HelmetProvider context={helmetContext}>
            <BrowserRouter>
                <Routes>
                    <Route path="/:kelime?" element={<Home/>} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    )
}