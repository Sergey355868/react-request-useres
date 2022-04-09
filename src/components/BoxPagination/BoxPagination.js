import React, {useCallback, useRef} from 'react';
import  classes from "./BoxPagination.module.css";
import { __getClasses } from "../../helpers/getClasses";
import { getUrlByNumber } from "../../helpers/getLinksPage";

export const BoxPagination = ({ numberOfPages, activePage, className, fetch, currentUrl, apperance  }) => {
    numberOfPages = numberOfPages && +numberOfPages;
    activePage    = activePage && +activePage;

    let { current:buttons } = useRef(new Map());

    let clickHandler = useCallback(({ target }) => {
        if (buttons.has(target) && currentUrl) {
            let number_page = buttons.get(target);
            if (number_page !== activePage && +number_page) {
                let url_number = getUrlByNumber(currentUrl, number_page);
                fetch("", url_number);
            }
        }
    },[currentUrl, activePage,fetch]);

    let getPages = useCallback( (ref, number) => {
          (buttons.size < numberOfPages) && buttons.set(ref, number);
    },[numberOfPages]);

    if (!numberOfPages || numberOfPages === 1) {
       return null;
    }
    return (
        <div
            className= { classes["box-pagination"] }
            onClick={ clickHandler }
        >
            {
                new Array(numberOfPages).fill("").map((_, index) => {
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
};

