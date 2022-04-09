import React from 'react';
import { __getClasses } from "../../helpers/getClasses";
import classes from  "./CardUser.module.css";

export const CardUser = ({ avatar_url, user_login, user_html_url, className ="", ...props }) => {
    return (
        <div {...props } className = { __getClasses(className, classes.card) }>
            <img src = { avatar_url } alt="User"/>
            <h3> { user_login } </h3>
            <button className={ classes["button-press"] }> <a href={ user_html_url }>Перейти</a> </button>
        </div>
    );
};

