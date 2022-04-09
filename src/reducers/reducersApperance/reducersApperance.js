import { APPERANCE_ACTIONS_TYPES_AP, APPERANCE_ACTIONS_TYPES_DISAP } from "./apperanceActionsTypes";

export const reducerApperance = (state, action) => {

    switch (action.type) {

        case APPERANCE_ACTIONS_TYPES_AP: {
            return { apperance: true };
        }
        case APPERANCE_ACTIONS_TYPES_DISAP: {
            return { apperance: false };
        }
        default: {
            return state;
        }
    }
};