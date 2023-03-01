import React from "react";
import Form from "./components/Form";
import Header from "./components/Header";

export default function App(){
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
            <Form darkMode={darkMode} />
            <p>&copy; 2023 Türkçe Sözlük made with ❤️ by Emre Coban - Powered by <i className="fa-brands fa-react"></i> ReactJS.</p>
        </main>
    )
}