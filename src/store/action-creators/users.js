import { PostService } from "../../API/PostService";
import {  getLinks, writeLinksAndPages } from "../../helpers/getLinksPage";
import { _localStorageSet } from "../../helpers/localStorage";
import {
    APPERANCE_NOTIFY, DISAPPERANCE_NOTIFY,
    FETCH_USERS_CLEAR_LINKS_AND_PAGES,
    FETCH_USERS_ERROR,
    FETCH_USERS_LOADING,
    FETCH_USERS_LOADING_END,
    FETCH_USERS_NOT_FOUND,
    FETCH_USERS_RECORD_LINKS_AND_PAGES,
    FETCH_USERS_SUCCESS,
    INCREMENT_REQUESTS,
    USERS_GET_DATA_OF_LOCAL_STORAGE
} from "../types/usersTypes";
import { initial_links} from "../reducers/usersReducer";

export const fetchUsers = (name ="", url ="") => {
    return async (dispatch) => {
        dispatch( {
           type:INCREMENT_REQUESTS,
        });
        try {
            dispatch({
                type:FETCH_USERS_LOADING
            });
            let response, _url;
             if (name) {
                [response, _url]  = await PostService.getByName(name);

            } else if(url) {
                [response, _url] = await  PostService.getByUrl(url);
            }
            if (response.ok) {
                let { items:users } = await response.json();
                if (Array.isArray(users) && users.length) {
                    let links_array = getLinks(response.headers.get("Link")); // может быть null;
                    let { links, pages } = writeLinksAndPages(_url, links_array);
                    _localStorageSet({
                        users,
                        pages,
                        links : {...initial_links, ...links },
                    });
                    dispatch({
                       type:FETCH_USERS_RECORD_LINKS_AND_PAGES,
                       payload: {
                           links,
                           pages,
                       }
                    });

                    dispatch ({
                        type: FETCH_USERS_SUCCESS,
                        payload:users
                    })
                } else if (Array.isArray(users) && !users.length) {
                    dispatch({ type: FETCH_USERS_CLEAR_LINKS_AND_PAGES });
                    localStorage.clear();
                    dispatch({
                        type: FETCH_USERS_NOT_FOUND
                    });

                }
            }
            if (response.status === 403) {
                // ????
            }
        } catch (e) {

            dispatch({ type: FETCH_USERS_CLEAR_LINKS_AND_PAGES });
            localStorage.clear();
            dispatch ({
                type: FETCH_USERS_ERROR,
                payload: e.message,
            })
            console.log(e.message);
        } finally {
            dispatch({
                type: FETCH_USERS_LOADING_END
            })
        }
    };
};
export function getDataUsersFromLS( data ) {
  return {
      type: USERS_GET_DATA_OF_LOCAL_STORAGE,
      payload: data,
  }
}
export function apperanceNotify() {
    return {
        type:APPERANCE_NOTIFY,
    }
}
export function disapperanceNotify(requests) {
    return {
        type:DISAPPERANCE_NOTIFY,
        payload:requests,
    }
}
