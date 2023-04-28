import React from "react";
import Form from "./Form";
import Header from "./Header";

import { useParams, Link } from "react-router-dom";

export default function Home() {
  const [darkMode, setDarkMode] = React.useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [history, setHistory] = React.useState(
    JSON.parse(localStorage.getItem("history")) || new Array(7)
  );

  function handleDarkMode() {
    setDarkMode((prevMode) => {
      localStorage.setItem("darkMode", !prevMode);
      return !prevMode;
    });
  }

  function handleHistory(kelime) {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      if (!prevHistory.includes(kelime)) {
        newHistory.pop();
        newHistory.unshift(kelime);
      }
      return newHistory;
    });
  }

  React.useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  darkMode
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark");


  function deleteHistory() {
    setHistory(new Array(7))
  }

  return (
    <main>
      <Header toggleDarkMode={handleDarkMode} darkMode={darkMode} deleteHistory={deleteHistory} />
      <div id="searchHistory" className={darkMode ? "darkHistory" : ""}>
        {history.map(
          (item, index) =>
            item && (
              <Link to={`/${item}`} key={index}>
                {item}
              </Link>
            )
        )}
      </div>
      <Form
        darkMode={darkMode}
        handleHistory={handleHistory}
        urlTakip={useParams().kelime}
      />
      <p style={{ textAlign: "center" }}>
        &copy; 2023 Türkçe Sözlük built with ❤️ by{" "}
        <a
          href="https://github.com/emrecoban/turkish-dictionary"
          target="_blank"
        >
          Emre Coban
        </a>
      </p>
    </main>
  );
}
