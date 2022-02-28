import { ActionType, IAlert, TypesKeys } from './alertTypes';

const initialState: IAlert = {
  success: false,
  error: false,
};

export const alertReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case TypesKeys.SET_SUCCESS:
      return {
        ...state,
        success: action.payload
      };
    case TypesKeys.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
