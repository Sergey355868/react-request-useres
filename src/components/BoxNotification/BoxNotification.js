import React, {useMemo} from 'react';
import classes from "./BoxNotification.module.css";
import {__getClasses} from "../../helpers/getClasses";
import {useSelector} from "react-redux";


export const BoxNotification = React.memo( ({ className }) => {

   let { apperance } = useSelector(state => state.users);

   let _classes = useMemo(() => {
      return  apperance ? __getClasses(className, classes.boxnotification, classes.appearance)
      : __getClasses(className, classes.boxnotification, classes.not_appearance);
   },[className, apperance]);

    return (
        <div className={ _classes }>
            <b> Сервер принимает 10 запросов в минуту!Подождите немного и продолжайте дальше)))...</b>
        </div>
    );
});

