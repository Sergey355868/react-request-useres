import React, { useRef } from 'react';
import classes from "./MessageList.module.css";
import { __getClasses } from "../../helpers/getClasses";
import { messages } from "./data/data";

export const MessageList = ({ messages_text = messages, className, value ="", validate = null }) => {

    let first_call = useRef(0);

    if (value) {
        first_call.current++;
    }
    if (Array.isArray(validate) && validate.length) {
        validate.length = 0;
    }
     return (
        <ul className = {
            __getClasses(
                classes["message-list"],
                classes["message-list_theme"],
                classes["messageList_size"],
                className,
                (value && first_call.current ) &&  classes["message-list_visible"],
                (!value && !first_call.current) && classes["message-list_none"],
                (!value && first_call.current ) && classes["message-list_notvisible"]
            )}
        >
            {
                messages_text.map((text_obj) => {
                    let _class ="", result;
                    value &&(_class = ((result = (text_obj.regexp.test(value) === text_obj.result)) ?
                    classes.valid : classes.invalid));
                    value && validate.push(result);
                   return <li
                       key={ text_obj.text }
                       className = { __getClasses(classes["message-list__message"], _class) }
                   >
                       <b>{ text_obj.text }</b>
                   </li>;
                })
            }
        </ul>
    );
};

