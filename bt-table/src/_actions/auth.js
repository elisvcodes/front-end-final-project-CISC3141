import * as API from '../_api/auth';

export const login = (creds) => async (dispatch) => {
  dispatch({ type: 'BEGIN_AUTH' });
  const { data, status } = await API.login(creds);
  if (status === 200) {
    dispatch({ type: 'AUTH', payload: data });
  }
};
