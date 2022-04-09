import React, { useMemo } from 'react';
import classes from"./Button.module.css";
import arrowButton from "./arrow.svg";
import { __getClasses } from "../../helpers/getClasses";

export const Button = React.forwardRef( ({
         children,
         size ="l",
         theme ="green",
         press = true,
         arrow = true,
         direction = "next",
         ...props
     }, ref) => {
     let _classes = useMemo(() => ({
        size: {
            [classes.button_size_l]: size ==="l",
            [classes.button_size_m]: size ==="m",
        },
        theme: {
            [classes.button_theme_blue]: theme ==="blue",
            [classes.button_theme_green]: theme ==="green",
            [classes.button_theme_orange]: theme ==="orange",
            [classes.button_theme_red]: theme ==="red",
            [classes.button_theme_gray]: theme ==="gray",
        },
        shadow: {
            [classes.button_shadow]:press,
        },
     }),[size, theme, press]);

     let _classes_button = useMemo(() => {
         return __getClasses(classes.button, _classes);
     },[_classes]);

     let _classes_img_prev = useMemo(() => {
        return __getClasses(classes.button__img, classes.button__img_prev);
     },[]);

     let _classes_img_next = useMemo(() => {
        return  __getClasses(classes.button__img, classes.button__img_next);
     },[]);

    return (
        <button { ...props } ref = { ref } className = { _classes_button } >
            {
               (arrow && direction ==="prev") &&
              <img
                src = { arrowButton }
                alt = "стрелка"
                className = { _classes_img_prev }
              />
            }
            { children }
            {
                (arrow && direction ==="next") &&
                <img
                    src ={ arrowButton }
                    alt ="стрелка"
                    className = { _classes_img_next }
                />
            }
        </button>
    );
});

