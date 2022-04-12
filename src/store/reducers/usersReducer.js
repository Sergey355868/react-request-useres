import {
    APPERANCE_NOTIFY, DISAPPERANCE_NOTIFY,
    FETCH_USERS_CLEAR_LINKS_AND_PAGES,
    FETCH_USERS_ERROR,
    FETCH_USERS_LOADING,
    FETCH_USERS_LOADING_END,
    FETCH_USERS_NOT_FOUND, FETCH_USERS_RECORD_LINKS_AND_PAGES,
    FETCH_USERS_SUCCESS, INCREMENT_REQUESTS, OFF_TIMER
} from "../types/usersTypes";
import { _localStorage } from "../../helpers/localStorage";

export const initial_links = {
    current: "",
    first:   "",
    next:    "",
    prev:    "",
    last:    "",
};
const initial_pages = {
    current_page : "0",
    last_page: "0"
};
const initialState = {
    users:  _localStorage("users") || [],
    loading: false,
    error: null,
    links:  _localStorage("links") || {...initial_links },
    pages:  _localStorage("pages") || {...initial_pages },
    requests:0,
    apperance:false,
    start_timer:false,
};
export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_LOADING: {
          return { ...state, loading: true };
        }
        case INCREMENT_REQUESTS: {
            return {
                ...state,
                 requests: state.requests + 1,
                 start_timer: true,
            };
        }
        case OFF_TIMER: {
            return {
              ...state,
              start_timer: false,
              requests: 0,
            };
        }
        case APPERANCE_NOTIFY: {
            return  {
                ...state,
                apperance: true,
            }
        }
        case DISAPPERANCE_NOTIFY: {
            return  {
                ...state,
                apperance: false,
            }
        }
        case FETCH_USERS_CLEAR_LINKS_AND_PAGES: {
            return {
                ...state,
                links:  {...initial_links },
                pages : {...initial_pages  },
            };
        }
        case FETCH_USERS_RECORD_LINKS_AND_PAGES: {
            return {
                ...state,
                links: {
                    ...initial_links,
                    ...action.payload.links,
                },
                pages: {
                    ...initial_pages,
                    ...action.payload.pages,
                }
            };
        }
        case FETCH_USERS_SUCCESS : {
            return {...state, users: action.payload , error: null };
        }
        case FETCH_USERS_NOT_FOUND: {
            return  {...state, users: [] };
        }
        case FETCH_USERS_ERROR: {
            return { ...state, error: action.payload, users: [] };
        }
        case FETCH_USERS_LOADING_END: {
            return {...state, loading: false };
        }
        default:{
            return state;
        }
    }
};
