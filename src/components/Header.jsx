import React from "react";
import { useNavigate } from "react-router-dom";
import kelimeList from "../autocomplete"

export default function Header({ toggleDarkMode, darkMode }) {
    const navigate = useNavigate()

    function randomWord() {
        //total word: 92408
        const findIndex = Math.floor(Math.random() * 92400) + 49 // ignore ".." words
        return navigate(`/${kelimeList[findIndex].madde}`)
    }

    return (
        <nav>
            <div className={darkMode ? "mainLogo dark" : "mainLogo"}>
                <i className="fa-solid fa-book logo"></i>
                <p>Sözlük</p>
            </div>
            <div className="rightPanel">
                <button onClick={randomWord} className={darkMode ? "navLink dark" : "navLink"}>Rastgele Kelime</button>
                <div className="darkMode-Wrapper">
                    <input type="checkbox" id="darkMode" className="sc-gJwTLC ikxBAC" onChange={toggleDarkMode} checked={darkMode} />
                </div>
                <label htmlFor="darkMode">
                    <i className="fa-regular fa-moon darkModeLogo"></i>
                </label>
            </div>
        </nav>
    )
}