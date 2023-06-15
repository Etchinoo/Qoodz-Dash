import { homeConstants } from "../../constants/home.constants";

const INITIAL_STATE = {
  parteners: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case homeConstants.GET_PARTENERS:
      return {
        ...state,
        parteners: action.data,
      };

    default:
      return state;
  }
}
