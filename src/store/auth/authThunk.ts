import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { AppRootStateType } from '../store';
import { ActionType, ISignInData, ISignUpData, IUser } from './authTypes';
import { actionsAuth } from './authActions';
import { authAPI } from '../../api/api';
import { actions } from '../collections/collectionsActions';


export const authMe = (): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await authAPI.me();
      const userData: IUser = {
        email: user.data.email,
        firstName: user.data.firstName,
        id: user.data.id,
      };
      dispatch(actionsAuth.setUserAC(userData));
      dispatch(actionsAuth.setAuthenticatedAC(true));
    } catch (error: any) {
      console.log(error);
      // dispatch(actionsAuth.setErrorAC(error.message));
    }
  };
};

export const signup = (data: ISignUpData): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const { firstName, email, password } = data;
      const user = await authAPI.signUp(firstName, email, password);
      const userData: IUser = {
        email: user.data.email,
        firstName: user.data.firstName,
        id: user.data.id,
      };
      console.log(user);
      dispatch(actionsAuth.setUserAC(userData));
      dispatch(actionsAuth.setAuthenticatedAC(true));
    } catch (error: any) {
      console.log(error.response.data.message[0]);
      dispatch(actionsAuth.setErrorAC(error.response.data.message[0]));
    }
  }
};

export const getUserById = (id: string): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    const db = getFirestore();
    const docRef = doc(db, 'users', `${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData: IUser = {
        email: docSnap.data().userData.email,
        firstName: docSnap.data().userData.firstName,
        id: docSnap.data().userData.id,
      };
      dispatch(actionsAuth.setUserAC(userData));
    } else {
      console.log('No such document!');
    }

  };
};

export const signIn = (data: ISignInData): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await authAPI.signIn(data.email, data.password);
      const userData: IUser = {
        email: user.data.email,
        firstName: user.data.firstName,
        id: user.data.id,
      };
      dispatch(actionsAuth.setUserAC(userData));
      dispatch(actionsAuth.setAuthenticatedAC(true));
    } catch (error: any) {
      dispatch(actionsAuth.setErrorAC(error.response.data.message));
    }
  };
};

export const logOut = (): ThunkAction<void, AppRootStateType, null, ActionType> => {
  return async (dispatch: Dispatch) => {
    try {
      await authAPI.logout();
      dispatch(actionsAuth.setLogOutAC());
    } catch (error) {
      console.log(error);
    }
  };
};








