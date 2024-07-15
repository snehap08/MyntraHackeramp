

import axios from 'axios';

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      localStorage.setItem('user',JSON.stringify(response.data.user))
      console.log(response)
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', error });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {

      // localStorage.setItem('user',JSON.stringify(response.data.user))
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      // console.log(response)
      dispatch({ type: 'LOGOUT_SUCCESS'});
    } catch (error) {
      dispatch({ type: 'LOGOUT_ERROR', error });
    }
  };
};

export const register = (userData) => {
  return async (dispatch) => {
    try {

      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      localStorage.setItem('user',JSON.stringify(response.data.user))
      console.log(response)
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'REGISTER_ERROR', error });
    }
  };
};
