import React from "react";

export default function Header({toggleDarkMode, darkMode}){
    return (
        <nav>
            <i className="fa-solid fa-book logo"></i>
            <div className="darkMode-Wrapper">
                <input type="checkbox" id="darkMode" className="sc-gJwTLC ikxBAC" onChange={toggleDarkMode} checked={darkMode} />
            </div>
            <label htmlFor="darkMode">
                <i className="fa-regular fa-moon darkModeLogo"></i>
            </label>
        </nav>
    )
}