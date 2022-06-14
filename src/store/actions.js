import * as actionType from "./actionType";

export function ToggleLogin(status) {
  return {
    type: actionType.TOGGLE_LOGIN,
    status,
  };
}

export function TriggerToast(open, status, message) {
  return {
    type: actionType.TRIGGER_TOAST,
    open,
    status,
    message,
  }
}

export function FetchCategory(data) {
  return {
    type: actionType.FETCH_CATEGORY,
    data
  }
}
