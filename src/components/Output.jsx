import React from "react";


export default function Output({ anlam, tip, ornek, darkMode }) {
    const ozellikler = JSON.parse(tip).map(ozellik => ozellik.tam_adi).join(", ")
    const ornek_cumle = JSON.parse(ornek)[0].ornek;

    return (
        <div className="outputMeaning">
            <div className={darkMode ? "outputType dark" : "outputType"}>
                <p>{ozellikler}</p>
                <hr className={darkMode ? "dark" : ""} />
            </div>
            <p className={darkMode ? "dark" : ""}>Anlamı</p>
            <ul><li>{anlam.replace("343", "bkz.")}</li></ul>
            {
                ornek_cumle != 0 &&
                <>
                    <p className={darkMode ? "dark" : ""}>Örnek cümle</p>
                    <ul><li>{ornek_cumle}</li></ul>
                </>
            }

        </div>
    )
}