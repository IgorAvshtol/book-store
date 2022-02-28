import { IAlert } from './alertTypes';
import { alertReducer } from './alertReducer';
import { actionsAlert } from './alertActions';

let state: IAlert;

beforeEach(() => {
  state = {
    success: false,
    error: false
  };
});

test('set success alert', () => {
  const newState = alertReducer(state, actionsAlert.setSuccess(true));
  expect(newState).toEqual({
    success: true,
    error: false
  });
});

test('set error alert', () => {
  const newState = alertReducer(state, actionsAlert.setError(true));
  expect(newState).toEqual({
    success: false,
    error: true
  });
});