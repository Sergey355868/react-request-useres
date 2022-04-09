import React, {useEffect, useMemo, useState} from 'react';
import classes from "./IndicatorScroll.module.css";
import { __getClasses } from "../../helpers/getClasses";

export const IndicatorScroll = () => {

    let [width, setWidth] = useState("0");

    useEffect(() => {
        let scrollHandler = () => {
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (winScroll / height) * 100;
            setWidth(String(scrolled) + "%");
        };
        window.addEventListener("scroll", scrollHandler);
        return () => {
          window.removeEventListener("scroll", scrollHandler);
        };
    },[]);

    let classes_container = useMemo(() => {
        return __getClasses(classes["progress-container"], classes["body__progress-contaner"]);
    },[]);

    return (
        <div className= { classes_container }>
            <div className={classes["progress-container__progress_bar"]} style={{ width }}  >  </div>
        </div>
    );
};

