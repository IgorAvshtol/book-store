import { IUser, TypesKeys } from './authTypes';

export const actionsAuth = {
  setUserAC: (user: IUser) => ({ type: TypesKeys.SET_USER, payload: user } as const),
  setLoadingAC: (loading: boolean) => ({ type: TypesKeys.SET_LOADING, payload: loading } as const),
  setErrorAC: (error: string) => ({ type: TypesKeys.SET_ERROR, payload: error } as const),
  setAuthenticatedAC: (auth: boolean) => ({ type: TypesKeys.SET_AUTHENTICATED, payload: auth } as const),
  setLogOutAC: () => ({ type: TypesKeys.SET_LOG_OUT } as const)
};