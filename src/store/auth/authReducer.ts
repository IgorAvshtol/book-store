import { ActionType, IAuthState, TypesKeys } from './authTypes';

const initialState: IAuthState = {
  user: null,
  authenticated: false,
  loading: false,
  error: ''
};

export const authReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case TypesKeys.SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true
      };
    case TypesKeys.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case TypesKeys.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case TypesKeys.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: action.payload
      };
    case TypesKeys.SET_LOG_OUT:
      return {
        ...state,
        user: null,
        authenticated: false
      }
    default:
      return state;
  }
};

