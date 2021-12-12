const initState = { user: {}, isLoggedIn: false, fetching: false, msg: '' };
export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'BEGIN_AUTH':
      return {
        ...state,
        fetching: true,
      };
    case 'LOGIN':
      localStorage.setItem('auth', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        fetching: false,
      };

    case 'REGISTER':
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
        msg: action.error,
        isLoggedIn: action.error === undefined ? false : true,
        fetching: false,
      };

    case 'isLoggedIn':
      return {
        ...state,
        isLoggedIn: action.payload,
        fetching: false,
      };
    default:
      return state;
  }
};
