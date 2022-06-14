import * as actionType from "store/actionType";

const initialState = {
    open: false,
    status: null,
    message: null,
};

export default function ToastReducer(state = initialState, action) {

    switch (action.type) {
        case actionType.TRIGGER_TOAST: {
            return {
                open: action.open,
                status: action.status,
                message: action.message,
            }
        }

        default:
            return state;
    }
    
}