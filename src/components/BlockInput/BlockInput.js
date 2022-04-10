import React, { useCallback, useMemo, useRef, useState } from 'react';
import classes from "./BlockInput.module.css";
import { __getClasses } from "../../helpers/getClasses";
import {MessageList, ToolTip} from "..";
import { useActions } from "../../hooks/useActions";
import {useSelector} from "react-redux";

 export const BlockInput = React.memo (({ placeholder ="enter users", className = "",...props }) => {
    let { fetchUsers } = useActions();
    let { apperance }  = useSelector(state => state.users);
    let [visibleToolTip, setVisibleTooltip] = useState(false);
    let [valueInput, setValueInput] = useState("");
    let validate = useRef([]);

    let _classes = useMemo(() => {
        return  __getClasses( className, classes.input, classes.input_size);
    },[className]);

    let handlerKeyUp = useCallback( ({ key, target }) => {
         if (key ==="Enter" && valueInput && validate.current.length && !apperance ) {
             if(!(validate.current.filter( bool => !bool)).length) {
                 fetchUsers && fetchUsers(valueInput);
                target.value = "";
                setValueInput("");
            }
         }
    },[valueInput, fetchUsers, apperance]);
    let handlerFocus = useCallback( () => {
        setVisibleTooltip(true);
    },[]);
    let handlerBlur = useCallback( ({ target }) => {
        target.value = "";
        setValueInput(() => "");
        setVisibleTooltip(() => false);
    },[]);
    let handlerInput = useCallback(({ target }) => {
        setValueInput(target.value);
    },[]);
    return (
        <div className={ classes["block-input-contaner"] }>

            <div className={ classes["block-input"]}>
                <input
                    { ...props }
                    onFocus = { handlerFocus }
                    onBlur  = { handlerBlur }
                    onChange = { handlerInput }
                    placeholder = { placeholder }
                    onKeyUp = { handlerKeyUp }
                    type = "text"
                    className = { _classes }
                />
                <ToolTip
                    className={ classes["block-input__tooltip"] }
                    visible= { visibleToolTip }
                />
                <MessageList
                    value= { valueInput }
                    className = { classes["block-input__message-list"] }
                    validate = { validate.current }
                />
            </div>
        </div>
    );
});

