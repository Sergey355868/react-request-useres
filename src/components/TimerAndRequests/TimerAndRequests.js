import React, {useEffect, useMemo, useState} from 'react';
import classes from "./TimerAndRequests.module.css";
import { __getClasses } from "../../helpers/getClasses";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";

export const TimerAndRequests = () => {

    let { apperanceNotify, disapperanceNotify, offTimer }  = useActions();
    let { requests, apperance, start_timer }  = useSelector(state => state.users);
    let [second, setSecond] = useState(60);

    useEffect(() => {
        if (start_timer) {
            let secondTimer;
            function timeOut() {
                setSecond(prevState => !prevState ? 60 : prevState - 1);
                secondTimer = setTimeout(timeOut, 1000);
            }
            let firstSecondTimer = setTimeout(timeOut, 1000);
            return () => {
                clearTimeout(secondTimer);
                clearTimeout(firstSecondTimer);
            }
        }
    },[start_timer]);

    useEffect(() => {
        if (requests === 10) {
            apperanceNotify();
        }
    },[requests]);

    useEffect(() => {
        if (!second && apperance) {
            disapperanceNotify();
        }
        if (start_timer && !second) {
          setSecond(60);
          offTimer();
        }
    },[apperance, second, start_timer]);

    let _classes = useMemo(() => {
       return __getClasses( classes["timer-second"],classes["timer-second_theme"],classes["timer-second_size"]);
    },[]);

    return (
        <div className={ _classes } >
          <span className={ classes["timer-second__second"] }>{ second } sec</span>
          <span className={ classes["timer-second__requests"] }> requests: { requests }</span>
          <span className={ classes["timer-second__requests"] }> (from 10 in a minute)</span>
        </div>
    );
};


