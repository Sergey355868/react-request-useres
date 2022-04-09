import React, { useMemo } from 'react';
import classes from "./ToolTip.module.css";
import { __getClasses } from "../../helpers/getClasses";

 export const ToolTip = ({ className, visible , theme = "dark", size="l" }) => {

    let _classes_tooltip = useMemo(() => ({
        visible: {
            [classes.tooltip_visible]: visible,
            [classes.tooltip_notvisible] : !visible,
        },
    }),[ visible]);

    let _classes_text = useMemo(() => ({
        [classes.tooltip__text__theme] : theme === "dark",
        [classes.tooltip__text_size] :  size === "l",

    }),[size, theme]);

    let _tooltip = useMemo(() => {
        return __getClasses(classes.tooltip, _classes_tooltip, className);
    },[_classes_tooltip, className]);

    let _text = useMemo(() => {
       return __getClasses(classes.tooltip__text, classes.tooltip__text, _classes_text);
    },[_classes_text]);

    return (
        <span className = { _tooltip }>
                <span
                    className = { _text }
                >
                    Введите имя и нажмите Enter
                </span>
        </span>
    );
};

