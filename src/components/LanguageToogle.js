import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function LanguageToogle(props) {
    const [toggleState, setToggleState] = useState("off");
    const [t, i18n] = useTranslation('common');

    function toggle() {
        // setToggleState(toggleState === "off" ? "on" : "off");
        // localStorage.setItem('lang', 'en')
        if (setToggleState(toggleState === "off" ? "on" : "off") === "on") {
            localStorage.setItem('lang', 'jap')
            i18n.changeLanguage('jap')
            console.log("Selected Language jap")
        } else {
            localStorage.setItem('lang', 'en')
            i18n.changeLanguage('en')
            console.log("Selected Language en")
        }

        

    }

    useEffect(() => {
        var selectedLanguage = localStorage.getItem("lang")
        console.log("Selected Language "+selectedLanguage)


        if (selectedLanguage === "jap") {
            i18n.changeLanguage('jap');
            localStorage.setItem('lang', 'jap')
        } 

    }, []);

    // useEffect(() => {
    //     var selectedLanguage = localStorage.getItem("lang")
    //     console.log("Selected Language "+selectedLanguage)


    //     if (selectedLanguage === "jap") {
    //         toggle()
    //     }

    // }, []);



    return <div className={`switch ${toggleState}`} onClick={toggle} />;
}

export default LanguageToogle;
