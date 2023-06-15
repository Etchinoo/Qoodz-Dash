import { authConstants } from "../../constants/authConstants";

const INITIAL_STATE = {
  token: JSON.parse(localStorage.getItem("token")),
  user: JSON.parse(localStorage.getItem("user")),
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case authConstants.SET_TOKEN:
      return {
        ...state,
        token: action.data,
      };
    case authConstants.SET_USER:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
}
