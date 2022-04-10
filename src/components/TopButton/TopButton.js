import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classes from "./TopButton.module.css";
import { __getClasses } from "../../helpers/getClasses";
import { animate, draw, linear } from "../../animation/animationScroll";

export const TopButton = React.memo(({ distance = 50, text="", theme ="green", arrow = "top", around , ...props }) => {

    let [isVisible, setIsVisible] = useState(false);

    let _classes = useMemo(() => ({
        hidden: {
            [classes.button_top_hidden] : !isVisible,
        },
        theme: {
            [classes.button_top_theme_green]: theme ==="green",
            [classes.button_top_theme_gray]: theme ==="gray",
            [classes.button_top_theme_blue]: theme === "blue",
        },
        img :{
            [classes.button_top__img_arrow] : arrow === "top",
        },
        around: {
            [classes.button_top_around]: around,
        },
    }),[isVisible, theme, arrow, around]);

    let _top_button = useMemo (() => {
        return  __getClasses(classes.button_top, classes.body__page, _classes)
    },[_classes]);

    useEffect(() => {
        let buttonScrollHandler = () => {
            if (distance > window.pageYOffset) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        }
        window.addEventListener("scroll", buttonScrollHandler);
        return () => {
            window.removeEventListener("scroll",buttonScrollHandler);
        };
    },[distance]);

    let buttonClickHandler = useCallback( () => {
        //window.scrollTo(0,0);
        animate({
            duration:1000,
            timing:linear,
            draw
        });
    },[]);

    return (
        <button
            { ...props }
            className = { _top_button }
            onClick = { buttonClickHandler }
        >
            { text }
        </button>
    );
});
