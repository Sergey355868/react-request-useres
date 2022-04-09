import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
    BoxError,
    Button,
    IndicatorScroll,
    InfoBlock,
    BlockInput, ListUsers,
    NotifyButton,
    TopButton, BoxNotification, BoxPagination
} from "./components";
import {_localStorage, _localStorageSet} from "./helpers/localStorage";
import {_clearLinksAndPages, getLinks, writeLinksAndPages} from "./helpers/getLinksPage";
import { PostService } from "./API/PostService";
import {TimerAndRequests} from "./components";
import {reducerApperance} from "./reducers/reducersApperance/reducersApperance";
import {APPERANCE_ACTIONS_TYPES_AP} from "./reducers/reducersApperance/apperanceActionsTypes";

function App() {

    let   [isLoader, setIsLoader]   = useState(false);
    let   [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [state, dispatchApperance] = useReducer(reducerApperance, {
        apperance: false,
    });

    let links = useRef({
        current: "",
        first:   "",
        next:    "",
        prev:    "",
        last:    "",
    });
    let pages = useRef({
        current_page : "0",
        last_page: "0"
    });
    let requests = useRef(0);

    useEffect(() => {
        let _links, _pages, _users;
        (_links =_localStorage("links")) && (links.current = _links);
        (_pages =_localStorage("pages")) && (pages.current = _pages);
        (_users =_localStorage("users")) && setUsers(_users);
     }, []);

    let ButtonClickHandler = useCallback((link) => {
        return  () => {
            link && _fetch("", link);
        };
    },[]);
     let _fetch = useCallback( async (name ="", url ="") => {
         requests.current++;
         if (requests.current > 10) {
             requests.current = 10;
             dispatchApperance({
                 type: APPERANCE_ACTIONS_TYPES_AP,
             });
             return;
         }
        try {
            setIsLoader(true);
            let response, _url;
            if (name) {
                [response, _url]  = await PostService.getByName(name);

            } else if(url) {
                [response, _url] = await  PostService.getByUrl(url);
            }
            if (response.ok) {
                _clearLinksAndPages([links.current, ""], [pages.current, "0"]);
                let { items:users } = await response.json();
                if (Array.isArray(users) && users.length) {
                    let links_array = getLinks(response.headers.get("Link")); // может быть null;
                    writeLinksAndPages(_url, links_array, links.current, pages.current)
                    _localStorageSet({
                        users,
                        links: links.current,
                        pages: pages.current,
                    });
                    setUsers(users);
                } else if (Array.isArray(users) && !users.length) {
                    localStorage.clear();
                    setUsers([]);
                }
            }
            if (response.status === 403) {
               requests.current = 10;
                dispatchApperance({
                    type: APPERANCE_ACTIONS_TYPES_AP,
                });
            }
        } catch (e) {
            requests.current = 0;
            _clearLinksAndPages([links.current, ""], [pages.current, "0"]);
            localStorage.clear();
            setError(e.message);
            console.log(e.message);
        } finally {
            setIsLoader(false);
        }
     },[state.apperance]);
    return (
        <>
            <div className="contaner-buttons-info" style={{ marginTop: "5px" }} >
                <div className="contaner-buttons">
                        <div className="row1">
                        <Button
                                theme="green"
                                arrow = { false }
                                disabled ={ (!links.current.first || state.apperance)  }
                                onClick = { ButtonClickHandler(links.current.first) }
                            >Первая</Button>
                            <NotifyButton
                                theme= "blue"
                                text= "Назад"
                                arrow= { true }
                                direction= "prev"
                                disabled = { (!links.current.prev || state.apperance)  }
                                number = { pages.current.current_page > 0 ? pages.current.current_page - 1 : 0 }
                                onClick={ ButtonClickHandler(links.current.prev) }
                        />
                        </div>
                        <div className="row2">
                            <NotifyButton
                                theme= "blue"
                                text= "Вперед"
                                arrow= { true }
                                direction= "next"
                                disabled = { (!links.current.next || state.apperance) }
                                number={ pages.current.last_page - pages.current.current_page }
                                onClick = { ButtonClickHandler(links.current.next) }
                            />
                            <Button
                                theme="gray"
                                arrow = { false }
                                disabled = {  (!links.current.last || state.apperance)   }
                                onClick = { ButtonClickHandler(links.current.last) }
                            >Последняя</Button>
                        </div>
                </div>

                    <TimerAndRequests
                        apperance={ state.apperance }
                        requests={ requests }
                        dispatchApperance={ dispatchApperance }
                    />

            </div>
            <TopButton around={ true } theme = "blue" arrow = "top" distance= { 100 }  />
            <IndicatorScroll/>
            <BoxNotification className= "root__boxnotification" visible={ state.apperance }/>
            <BlockInput fetch={ _fetch }/>
            <InfoBlock currentPage={ pages.current.current_page } AllPages={ pages.current.last_page }/>
             <div  className = "_contaner-users">
                {
                    error ? <BoxError/> : <ListUsers isLoader = { isLoader } users = { users }/>
                }
            </div>
            {
                !isLoader && <BoxPagination
                    numberOfPages = { pages.current.last_page }
                    activePage = { pages.current.current_page }
                    fetch = { _fetch }
                    currentUrl = { links.current.current }
                    apperance = { state.apperance }
               />
            }
        </>
    );
}
export default App;
