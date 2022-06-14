import * as actionType from "store/actionType";

const initialState = {
    isLoggedIn: false,
};

export default function AuthReducer(state = initialState, action) {

    switch (action.type) {
        case actionType.TOGGLE_LOGIN: {
          return {
            ...state,
            isLoggedIn: action.status
          }
        }
        default:
            return state;
    }
    
}