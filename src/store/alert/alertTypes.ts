export enum TypesKeys {
  SET_SUCCESS = 'SET_SUCCESS',
  SET_ERROR = 'SET_ERROR'
}

export interface IAlert {
  success: boolean;
  error: boolean;
}

export interface ISetSuccess {
  type: TypesKeys.SET_SUCCESS,
  payload: boolean
}

export interface ISetError {
  type: TypesKeys.SET_ERROR,
  payload: boolean
}

export type ActionType = ISetSuccess | ISetError