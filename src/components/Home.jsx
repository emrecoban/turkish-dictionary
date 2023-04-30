import React from "react";
import Form from "./Form";
import Header from "./Header";
import autoAnimate from '@formkit/auto-animate';

import { useParams, Link } from "react-router-dom";

export default function Home() {
  const [darkMode, setDarkMode] = React.useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const [history, setHistory] = React.useState(
    JSON.parse(localStorage.getItem("history")) || new Array(7)
  );
  const [trash, setTrash] = React.useState(false);
  const historyAnimate = React.useRef(null)

  function handleDarkMode() {
    setDarkMode((prevMode) => {
      localStorage.setItem("darkMode", !prevMode);
      return !prevMode;
    });
  }

  function handleHistory(kelime) {
    setTrash(true)
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
    history.every(word => word == null) && setTrash(false)
    historyAnimate.current && autoAnimate(historyAnimate.current)
  }, [history]);

  darkMode
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark");


  function deleteHistory() {
    setHistory(new Array(7))
    setTrash(false)
  }

  return (
    <main>
      <Header toggleDarkMode={handleDarkMode} darkMode={darkMode} deleteHistory={deleteHistory} trashStatus={trash} />
      <div id="searchHistory" ref={historyAnimate} className={darkMode ? "darkHistory" : ""}>
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
