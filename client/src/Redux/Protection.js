import { logoutAction } from "./Actions/userActions.js"

export const ErrorActions = (error, dispatch, action) => {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === "Not authorized, token failed") {
        // logout here
        dispatch(logoutAction())

    }
    return dispatch({ type: action, payload: message })
}

// api token Protection
export const tokenProtection = (getState) => {
    const {
        userLogin: { userInfo }
    } = getState()
    if (!userInfo?.token) {
        return null;
    } else {
        return userInfo?.token
    }
}
