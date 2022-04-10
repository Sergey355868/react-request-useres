import React from 'react';
import { __getClasses } from "../../helpers/getClasses";
import classes from "./infoBlock.module.css"
import {useSelector} from "react-redux";

export const InfoBlock = React.memo(({  className = "", ...props }) => {
    let { pages:{ current_page, last_page  } }  = useSelector(state => state.users );

    return (
        <div { ...props } className = { __getClasses( className, classes.infoBlock, classes.infoBlock_theme)}>
            <div >Текущая страница:{ current_page }</div>
            <div >Всего страниц:{ last_page } </div>
        </div>
    );
});

