import React from 'react';
import classes from "./BoxError.module.css";

export const BoxError = () => {
    return (
        <div className={classes["box-error"]}>
            Что-то пошло не так...
        </div>
    );
};

