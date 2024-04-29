import * as authApi from '../api/authRequest';

export const login = (formData) => async(dispatch) => {
    dispatch({type: "AUTH_START"})
    try {
        const {data} = await authApi.login(formData);
        dispatch({type: "AUTH_SUCCESS", data: data})
    } catch (error) {
        console.log(error);
        dispatch({type: "AUTH_FAIL"})
    }
};

export const signup = (formData) => async(dispatch) => {
    dispatch({type: "AUTH_START"})
    try {
        const {data} = await authApi.signup(formData);
        dispatch({type: "AUTH_SUCCESS", data: data})
    } catch (error) {
        console.log(error);
        dispatch({type: "AUTH_FAIL"})
    }
};

export const logout = () => async(dispatch)=> {
    dispatch({type: "LOG_OUT"})
};