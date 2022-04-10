import React, { useCallback, useMemo } from 'react';
import classes from "./NotifyButton.module.css";
import arrowButton from "./arrow.svg";
import { __getClasses } from "../../helpers/getClasses";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";

export const NotifyButton = React.memo( ({
    theme = "blue",
    text = "Кнопка",
    arrow = true,
    size = "l",
    direction ="",
    press = true,
    budge_theme = "blue",
    ...props
}) => {
    let { fetchUsers } = useActions();
    let { links, pages, apperance } = useSelector(state => state.users);

    let onClickHandler = useCallback(() => {
        links[direction] && fetchUsers("", links[direction]);
    },[links,fetchUsers, direction]);

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
        <button
            className ={ _button }
            { ...props }
            onClick={ onClickHandler }
            disabled ={ !links[direction] || apperance }
        >
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
                <span className ={ _badge }>
                    {

                    direction === "prev" ?
                        ((pages.current_page > 0) ? pages.current_page - 1 : 0)
                        : (pages.last_page - pages.current_page)
                    }
                </span>
       </button>
    );
});

