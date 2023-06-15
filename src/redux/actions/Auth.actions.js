import { authConstants } from "../../constants/authConstants";

export const authActions = {
  setToken,
  setUser
};

let dispatchActionHandler = (type, data, dispatch) => {
  dispatch({ type, data });
};

function setToken(data) {
  return async (dispatch) => {
    dispatchActionHandler(authConstants.SET_TOKEN, data, dispatch);
  };
}

function setUser(data) {
    return async (dispatch) => {
      dispatchActionHandler(authConstants.SET_USER, data, dispatch);
    };
  }