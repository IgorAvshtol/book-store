import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { authReducer } from './auth/authReducer';
import { collectionReducer } from './collections/collectionsReducer';
import { alertReducer } from './alert/alertReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  collection: collectionReducer,
  alert: alertReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>