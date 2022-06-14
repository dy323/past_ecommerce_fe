import * as actionType from "store/actionType";

const initialState = {
    category: false,
};

export default function DataReducer(state = initialState, action) {

    switch (action.type) {
        case actionType.FETCH_CATEGORY: {
          return {
            ...state,
            category: action.data
          }
        }
        default:
            return state;
    }
    
}