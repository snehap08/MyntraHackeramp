

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token:localStorage.getItem('token')? localStorage.getItem('token') : null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          user: action.payload.user,
          token : action.payload.token,
          error: null,
        };
      case 'LOGIN_ERROR':
      case 'REGISTER_ERROR':
        return {
          ...state,
          user: null,
          error: action.error.message,
        };
      case 'LOGOUT_SUCCESS':
        return {
          ...state,
          user: null,
          token: null,
        };
        case 'LOGOUT_ERROR':
        return {
          ...state,
          user: null,
          error: action.error.message,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  