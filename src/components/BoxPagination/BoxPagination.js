import React, {useCallback, useRef} from 'react';
import  classes from "./BoxPagination.module.css";
import { __getClasses } from "../../helpers/getClasses";
import { getUrlByNumber } from "../../helpers/getLinksPage";
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";

export const BoxPagination = React.memo( ({  className  }) => {
    let { current:buttons } = useRef(new Map());
    let { fetchUsers } = useActions();
    let { links:{ current }, pages:{ last_page, current_page:activePage },apperance } = useSelector(state => state.users);

    last_page = last_page && +last_page;
    activePage = activePage && +activePage;

    let clickHandler = useCallback(({ target }) => {
        if (buttons.has(target) && current) {
            let number_page = buttons.get(target);
            if (number_page !== activePage && +number_page) {
                let url_number = getUrlByNumber(current, number_page);
                fetchUsers("", url_number);
            }
        }
    },[current, activePage,fetchUsers]);

    let getPages = useCallback( (ref, number) => {
          (buttons.size < +last_page) && buttons.set(ref, number);
    },[last_page]);

    if (!last_page || last_page === 1) {
       return null;
    }
    return (
        <div
            className= { classes["box-pagination"] }
            onClick={ clickHandler }
        >
            {
                new Array(last_page).fill("").map((_, index) => {
                     if (activePage === index + 1) {
                         return <button
                             key = { index + "--pgP++" }
                             className = {
                                 __getClasses(classes["box-pagination__number-page"],
                                 classes["box-pagination__number-page_active"])
                             }
                             ref = { ref => getPages(ref,index + 1)   }
                             disabled = { (activePage === index +1) || apperance  }
                         >
                               { index + 1 }
                         </button>
                     } else  {
                         return <button
                             key ={ index + "--pgP++" }
                             className ={classes["box-pagination__number-page"] }
                             ref ={ ref => getPages(ref, index + 1) }
                             disabled = { (activePage === index +1) || apperance }
                         >
                             { index + 1 }
                         </button>
                     }
                })
            }
        </div>
    );
});

