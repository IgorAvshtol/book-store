import { TypesKeys } from './alertTypes';

export const actionsAlert = {
  setSuccess: (success: boolean) => ({ type: TypesKeys.SET_SUCCESS, payload: success } as const),
  setError: (error: boolean) => ({ type: TypesKeys.SET_ERROR, payload: error } as const)
};