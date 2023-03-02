import React from "react";
import Output from "./Output";

export default function Form({darkMode, urlTakip}){
    const [kelime, setKelime] = React.useState({show:false, kelime:""})
    const [anlam, setAnlam] = React.useState([])
    const [outputs, setOutputs] = React.useState([])
    const [loader, setLoader] = React.useState(urlTakip ? true : false)

    async function fetchTDK(word){
        const res = await fetch("https://sozluk.gov.tr/gts?ara=" + word)
        const data = await res.json();
        if(JSON.stringify(data).includes("error")){
            return false
        }else{
            return data[0].anlamlarListe
        }
    }

    async function gorevAdami(word){
        const anlamListe = await fetchTDK(word)
        if(anlamListe===false){
            setKelime({show:true, kelime:"Bulunamadı."})
            setAnlam([])
            setOutputs([])
            setLoader(false)
        }else{
            setAnlam(anlamListe)
            setKelime({kelime:word, show:true})
            setLoader(false)
        }
    }

    React.useEffect(()=>{
        urlTakip && gorevAdami(urlTakip)
    }, [urlTakip])

     function handleForm(e){
        e.preventDefault()
        setLoader(true)
        gorevAdami(e.target.elements.kelime.value)
    }

    React.useEffect(()=>{
        const outputListe = anlam.map((anlam, i)=>{
            return <Output
                        key={i}
                        anlam={anlam.anlam}
                        tip={anlam.ozelliklerListe ? JSON.stringify(anlam.ozelliklerListe) : "[{\"tam_adi\":\"isim\"}]"}
                        ornek={anlam.orneklerListe ? JSON.stringify(anlam.orneklerListe) : "[{\"ornek\":\"0\"}]"}
                        darkMode={darkMode}    
                   />
        })
        setOutputs(outputListe)
    },[anlam, darkMode])

    return (
        <>
            <form onSubmit={handleForm}>
                <div className={darkMode ? "searchBox dark" : "searchBox"}>
                    <input 
                            type="text"
                            name="kelime"
                            id="kelime" 
                            autoComplete="off"
                    />
                    <i className="fa-solid fa-magnifying-glass" onClick={handleForm}></i>
                </div>
            </form>
            <h1 className="outputWord">{kelime.show && kelime.kelime}</h1>
            {
                loader ? 
                <>
                    <br /><div className="loader"></div><br />
                </>
                : outputs
            }
        </>
    )
}