import React, {useMemo} from 'react';
import classes from "./BoxNotification.module.css";
import {__getClasses} from "../../helpers/getClasses";


export const BoxNotification = ({ className, visible = false }) => {

   let _classes = useMemo(() => {
      return  visible ? __getClasses(className, classes.boxnotification, classes.appearance)
      : __getClasses(className, classes.boxnotification, classes.not_appearance);
   },[className, visible]);

    return (
        <div className={ _classes }>
            <b> Сервер принимает 10 запросов в минуту!Подождите немного и продолжайте дальше)))...</b>
        </div>
    );
};

