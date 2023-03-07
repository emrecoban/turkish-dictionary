import React from "react";
import Output from "./Output";
import Autowords from '../autocomplete';

import * as htmlToImage from 'html-to-image';
import { Helmet } from 'react-helmet-async';



export default function Form({darkMode, urlTakip}){
    const [kelime, setKelime] = React.useState({show:false, kelime:""})
    const [anlam, setAnlam] = React.useState([])
    const [outputs, setOutputs] = React.useState([])
    const [loader, setLoader] = React.useState(urlTakip ? true : false)
    const [kelimeOner, setKelimeOner] = React.useState("")
    const [oneriKutusu, setOneriKutusu] = React.useState(true)
    const [metaImg, setMetaImg] = React.useState(null)

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
        }else{
            setAnlam(anlamListe)
            setKelime({kelime:word, show:true})
        }
        setLoader(false)
    }

    React.useEffect(()=>{
        urlTakip && gorevAdami(urlTakip.toLocaleLowerCase('tr-TR'))
    }, [urlTakip])

     function handleForm(e){
        e.preventDefault()
        setOneriKutusu(false)
        setLoader(true)
        gorevAdami(e.target.elements.kelime.value.toLocaleLowerCase('tr-TR'))
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

    React.useEffect(()=>{
        setOneriKutusu(true)
    }, [kelimeOner])

    function createImg(){
        htmlToImage.toPng(document.getElementById('pageToImg'))
                    .then(function (dataUrl) {
                        const img = new Image();
                        img.src = dataUrl;
                        //document.body.appendChild(img);
                        setMetaImg(dataUrl)
                        console.log("resim geldi: ", metaImg)
                    })
                    .catch(function (error) {
                        console.error('oops, something went wrong! htmlToImage: ', error);
                    });
    }

    React.useEffect(()=>{
        createImg()
    }, [outputs])

    

    return (
        <>
            <form onSubmit={handleForm}>
                <div className={darkMode ? "searchBox dark" : "searchBox"}>
                    <input 
                            type="text"
                            name="kelime"
                            id="kelime" 
                            autoComplete="off"
                            onChange={(e)=>setKelimeOner(e.target.value.toLocaleLowerCase('tr-TR'))}
                    />
                    <i className="fa-solid fa-magnifying-glass" onClick={handleForm}></i>
                </div>
            </form>
            {
                kelimeOner.length > 2 && Autowords.filter(oneri=>oneri.madde.startsWith(kelimeOner)).slice(0,7).map((oneriP, i)=><p className={oneriKutusu ? darkMode ? "onerilenler dark" : "onerilenler" : "onerilenler hide"} key={i}><b>{kelimeOner}</b>{oneriP.madde.split(kelimeOner)[1]}</p>)
            }
            <div id="pageToImg">
                <h1 className="outputWord">{kelime.show && kelime.kelime}</h1>
                {
                    loader ? 
                    <>
                        <br /><div className="loader"></div><br />
                    </>
                    : 
                    <>
                        {outputs}
                        <Helmet>
                            <title>{kelime.kelime} Anlamı - Türkçe Sözlük</title>
                            <meta name="description" content={`${kelime.kelime} Anlamı - Türkçe Sözlük`} />
                            <meta property="og:title" content={`${kelime.kelime} - Türkçe Sözlük`} />
                            <meta property="og:description" content={`${kelime.kelime} Anlamı - Türkçe Sözlük`} />
                            <meta property="twitter:title" content={`${kelime.kelime} - Türkçe Sözlük`} />
                            <meta property="twitter:description" content={`${kelime.kelime} Anlamı - Türkçe Sözlük`} />
                            <meta name="twitter:creator" content="@emreshepherd" />
                            <meta name="twitter:card" content="summary_large_image" />
                            <meta name="twitter:image" content="https://i.imgur.com/H3vOUS6.png" />
                            <meta name="og:image" content="https://i.imgur.com/H3vOUS6.png" />
                        </Helmet>
                    </>
                    
                }
            </div>
        </>
    )
}