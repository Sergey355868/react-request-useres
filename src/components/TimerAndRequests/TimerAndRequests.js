import React, {useEffect, useMemo, useState} from 'react';
import classes from "./TimerAndRequests.module.css";
import { __getClasses } from "../../helpers/getClasses";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";

export const TimerAndRequests = () => {
    let { apperanceNotify, disapperanceNotify }  = useActions();
    let { requests, apperance }  = useSelector(state => state.users);
    let [second, setSecond] = useState(60);

    useEffect(() => {
        let secondTimer;
        function timeOut(requests, apperance, disapperanceNotify) {
            setSecond (prevState => {

              return  !prevState ? ((apperance && disapperanceNotify(0)),60): prevState - 1;
            });
            secondTimer = setTimeout(timeOut, 1000, requests, apperance, disapperanceNotify);
        }
        let firstSecondTimer = setTimeout(timeOut, 1000, requests, apperance, disapperanceNotify);
        return () => {
            clearTimeout(secondTimer);
            clearTimeout(firstSecondTimer);
        }
    },[apperance,disapperanceNotify,requests]);
    useEffect(() => {
        if (requests === 10) {
            apperanceNotify();
        }
    },[requests]);

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


