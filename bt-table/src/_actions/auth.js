import * as API from '../_api/auth';
import { Navigate } from 'react-router';

export const login = (creds) => async (dispatch) => {
  dispatch({ type: 'BEGIN_AUTH' });
  const { data, status } = await API.login(creds);
  console.log(data);
  if (status === 200) {
    dispatch({ type: 'LOGIN', payload: data });
  }
};

export const register = (creds) => async (dispatch) => {
  dispatch({ type: 'BEGIN_AUTH' });
  await API.register(creds)
    .then((res) => <Navigate to='/' />)
    .catch((err) => {
      dispatch({ type: 'REGISTER', error: `Somethhing went wrong: ${err}` });
    });
};

export const isLoggedIn = () => async (dispatch) => {
  console.log(localStorage.getItem('auth'));
  if (localStorage.getItem('auth')) {
    dispatch({ type: 'isLoggedIn', payload: true });
  } else {
    dispatch({ type: 'isLoggedIn', payload: false });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.clear();
  <Navigate to='/' />;
};
