import React from 'react';
import classes from "./BoxEmptyUsers.module.css";
export const BoxEmptyUsers = () => {
    return (
        <div className = { classes["empty-users"] } >
            Нет результата поиска.
        </div>
    );
};

