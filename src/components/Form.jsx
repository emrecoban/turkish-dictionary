import React from "react";
import Output from "./Output";
import Autowords from "../autocomplete";
import copy from "copy-text-to-clipboard";
import autoAnimate from '@formkit/auto-animate'

export default function Form({ darkMode, urlTakip, handleHistory }) {
  const [kelime, setKelime] = React.useState({ show: false, kelime: "" });
  const [anlam, setAnlam] = React.useState([]);
  const [outputs, setOutputs] = React.useState([]);
  const [loader, setLoader] = React.useState(urlTakip ? true : false);
  const [kelimeOner, setKelimeOner] = React.useState("");
  const [oneriKutusu, setOneriKutusu] = React.useState(true);
  const animateOutput = React.useRef(null)

  async function fetchTDK(word) {
    const res = await fetch("https://sozluk.gov.tr/gts?ara=" + word);
    const data = await res.json();
    if (JSON.stringify(data).includes("error")) {
      return false;
    } else {
      return data[0].anlamlarListe;
    }
  }

  async function gorevAdami(word) {
    const anlamListe = await fetchTDK(word);
    if (anlamListe === false) {
      setKelime({ show: true, kelime: "Bulunamadı." });
      setAnlam([]);
      setOutputs([]);
    } else {
      setAnlam(anlamListe);
      setKelime({ kelime: word, show: true });
      handleHistory(word);
      animateOutput.current && autoAnimate(animateOutput.current)
    }
    setLoader(false);
  }

  React.useEffect(() => {
    urlTakip && gorevAdami(urlTakip.toLocaleLowerCase("tr-TR"));
  }, [urlTakip]);

  function handleForm(e) {
    e.preventDefault();
    setOneriKutusu(false);
    setLoader(true);
    gorevAdami(e.target.elements.kelime.value.toLocaleLowerCase("tr-TR"));
  }

  React.useEffect(() => {
    const outputListe = anlam.map((anlam, i) => {
      return (
        <Output
          key={i}
          anlam={anlam.anlam}
          tip={
            anlam.ozelliklerListe
              ? JSON.stringify(anlam.ozelliklerListe)
              : '[{"tam_adi":"isim"}]'
          }
          ornek={
            anlam.orneklerListe
              ? JSON.stringify(anlam.orneklerListe)
              : '[{"ornek":"0"}]'
          }
          darkMode={darkMode}
        />
      );
    });
    setOutputs(outputListe);
  }, [anlam, darkMode]);

  React.useEffect(() => {
    setOneriKutusu(true);
  }, [kelimeOner]);

  function kelimeCopy() {
    const anlamlar = anlam.map((anlam, i) => {
      const tip = anlam.ozelliklerListe
        ? JSON.stringify(anlam.ozelliklerListe)
        : '[{"tam_adi":"isim"}]'
      return `${i + 1}. ${JSON.parse(tip).map(ozellik => ozellik.tam_adi).join(', ')}: ${anlam.anlam}`
    }).join('\n')
    copy(`=> ${kelime.kelime}\n${anlamlar}\nturkcesozluk.vercel.app`);
  }

  return (
    <>
      <form onSubmit={handleForm}>
        <div className={darkMode ? "searchBox dark" : "searchBox"}>
          <input
            type="text"
            name="kelime"
            id="kelime"
            autoComplete="off"
            onChange={(e) =>
              setKelimeOner(e.target.value.toLocaleLowerCase("tr-TR"))
            }
          />
          <i className="fa-solid fa-magnifying-glass" onClick={handleForm}></i>
        </div>
      </form>
      {kelimeOner.length > 2 &&
        Autowords.filter((oneri) => oneri.madde.startsWith(kelimeOner))
          .slice(0, 7)
          .map((oneriP, i) => (
            <p
              className={
                oneriKutusu
                  ? darkMode
                    ? "onerilenler dark"
                    : "onerilenler"
                  : "onerilenler hide"
              }
              key={i}
            >
              <b>{kelimeOner}</b>
              {oneriP.madde.split(kelimeOner)[1]}
            </p>
          ))}
      {kelime.show && (
        <div className="outputHeadline">
          <h1 className="outputWord">{kelime.kelime}</h1>
          <i onClick={kelimeCopy} className={darkMode ? "fa-regular fa-copy navLink dark" : "fa-regular fa-copy navLink"}></i>
        </div>
      )}

      {loader ? (
        <>
          <br />
          <div className="loader"></div>
          <br />
        </>
      ) : (
        <div ref={animateOutput}>
          {outputs}
        </div>
      )}
    </>
  );
}
