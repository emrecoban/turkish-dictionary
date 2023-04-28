import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import kelimeList from "../autocomplete"

export default function Header({ toggleDarkMode, darkMode }) {
    console.log("toplam: ", kelimeList[49].madde)
    const navigate = useNavigate()

    function randomWord() {
        //total word: 92408
        const findIndex = Math.floor(Math.random() * 92400) + 49 // ignore ".." words
        console.log("BULUNAN => ", kelimeList[findIndex].madde)
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