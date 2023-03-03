import React from "react";
import Form from "./Form";
import Header from "./Header";

import { useParams } from "react-router-dom";

export default function Home(){
    const [darkMode, setDarkMode] = React.useState(JSON.parse(localStorage.getItem("darkMode")) || false)

    function handleDarkMode(){  
        setDarkMode(prevMode=>{
            localStorage.setItem("darkMode", !prevMode)
            return !prevMode
        })
    }

    darkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark')
    return (
        <main>
            <Header toggleDarkMode={handleDarkMode} darkMode={darkMode} />
            <Form darkMode={darkMode} urlTakip={useParams().kelime} />
            <p style={{textAlign: "center"}}>&copy; 2023 Türkçe Sözlük made with ❤️ by <a href="https://github.com/emrecoban" target="_blank">Emre Coban</a><br/>Powered by <i className="fa-brands fa-react"></i> ReactJS.</p>
        </main>
    )
}