import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieWheel from './components/MovieWheel';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MovieWheel />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
