import React from 'react';
import { __getClasses } from "../../helpers/getClasses";
import classes from "./infoBlock.module.css"

export const InfoBlock = ({ currentPage = "0", className = "", AllPages = "0", ...props }) => {
    return (
        <div { ...props } className = { __getClasses( className, classes.infoBlock, classes.infoBlock_theme)}>
            <div >Текущая страница:{ currentPage }</div>
            <div >Всего страниц:{ AllPages } </div>
        </div>
    );
};

