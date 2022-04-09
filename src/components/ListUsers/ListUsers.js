import React from 'react';
import classes from "./ListUser.module.css";
import { BoxEmptyUsers, CardUser, Loader} from "..";

export const ListUsers = ({ isLoader, users }) => {
    if (isLoader) {
        return   <Loader/>;
    }
    if (!users.length) {
        return  <BoxEmptyUsers/>;
    }
    return (
        <div className={ classes["contaner-users"] }>
            {
                users.map((user) => {
                    return <CardUser
                        key={ user.id }
                        avatar_url={ user.avatar_url }
                        user_login={ user.login }
                        user_html_url={ user.html_url }
                    />
                })
            }
        </div>
    );
};

