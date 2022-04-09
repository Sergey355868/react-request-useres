import React, {useEffect, useMemo, useState} from 'react';
import classes from "./TimerAndRequests.module.css";
import { APPERANCE_ACTIONS_TYPES_DISAP } from "../../reducers/reducersApperance/apperanceActionsTypes";
import {__getClasses} from "../../helpers/getClasses";

export const TimerAndRequests = ({ apperance, requests, dispatchApperance }) => {

    let [second, setSecond] = useState(60);

    useEffect(() => {
        let secondTimer;
        function timeOut(requests, apperance, dispatchApperance) {
            setSecond (prevState => {
                return  !prevState
                ? ((requests.current = 0),
                  (apperance && dispatchApperance({ type: APPERANCE_ACTIONS_TYPES_DISAP })),
                  60)
                : prevState - 1;
            });
            secondTimer = setTimeout(timeOut, 1000, requests, apperance, dispatchApperance);
        }
        let firstSecondTimer = setTimeout(timeOut, 1000, requests, apperance, dispatchApperance);
        return () => {
            clearTimeout(secondTimer);
            clearTimeout(firstSecondTimer);
        }
    },[apperance]);

    let _classes = useMemo(() => {
       return __getClasses( classes["timer-second"],classes["timer-second_theme"],classes["timer-second_size"]);
    },[]);

    return (
        <div className={ _classes } >
          <span className={ classes["timer-second__second"] }>{ second } sec</span>
          <span className={ classes["timer-second__requests"] }> requests: { requests.current }</span>
          <span className={ classes["timer-second__requests"] }> (from 10 in a minute)</span>
        </div>
    );
};


