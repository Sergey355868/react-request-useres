import React, { useMemo } from 'react';
import classes from "./NotifyButton.module.css";
import arrowButton from "./arrow.svg";
import { __getClasses } from "../../helpers/getClasses";

export const NotifyButton = ({
    theme = "blue",
    text = "Кнопка",
    number = 0 ,
    arrow = true,
    size = "l",
    direction ="next",
    press = true,
    budge_theme = "blue",
    ...props
}) => {
    let _button = useMemo(() => __getClasses({
        default: {
            [classes.notify]: true,
            [classes.notify__position]: true,
        },
        theme : {
            [classes.notify_theme_blue]: theme === "blue",
        },
        shadow:{
            [classes.notify_box_shadow] : press,
        },
        size: {
            [classes.notify__position_size_l] : size === "l",
        }
    }),[theme, press, size]);


    let _badge = useMemo(() =>__getClasses({
        default: {
            [classes.notify__badge]: true,
        },
        budge_theme: {
             [classes.notify__badge_theme]: budge_theme === "blue",
        }
    }),[budge_theme]);

    return (
        <button  className ={ _button }  { ...props }>

                 {
                     (arrow && direction === "prev") &&
                     <img
                         src = { arrowButton }
                         alt="стрелка"
                         className={classes.notify__img_prev}
                     />
                 }
                  { text }

                 {
                     (arrow && direction === "next") &&
                     <img
                         src={arrowButton}
                         alt="стрелка"
                         className ={classes.notify__img_next}
                     />
                 }
                <span className ={ _badge }>{ number }</span>
       </button>
    );
};

