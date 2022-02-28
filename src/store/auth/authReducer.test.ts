import { authReducer } from './authReducer';
import { IAuthState } from './authTypes';
import { actionsAuth } from './authActions';

let state: IAuthState;

beforeEach(() => {
  state = {
    user: null,
    authenticated: false,
    loading: false,
    error: ''
  };
});

test('set new user', () => {
  const newState = authReducer(state, actionsAuth.setUserAC({ firstName: 'igor', email: 'igor@ttu.by', id: '1' }));
  expect(newState).toEqual({
    user: { firstName: 'igor', email: 'igor@ttu.by', id: '1' },
    authenticated: true,
    loading: false,
    error: ''
  });
});

test('set loading', () => {
  const newState = authReducer(state, actionsAuth.setLoadingAC(true));
  expect(newState).toEqual({
    user: null,
    authenticated: false,
    loading: true,
    error: ''
  });
});

test('set error', () => {
  const newState = authReducer(state, actionsAuth.setErrorAC('error!'));
  expect(newState).toEqual({
    user: null,
    authenticated: false,
    loading: false,
    error: 'error!'
  });
});

test('set authenticated', () => {
  const newState = authReducer(state, actionsAuth.setAuthenticatedAC(true));
  expect(newState).toEqual({
    user: null,
    authenticated: true,
    loading: false,
    error: ''
  });
});