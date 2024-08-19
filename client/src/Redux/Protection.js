import { logoutAction } from "./Actions/userActions.js"
import { useNavigate } from "react-router-dom"
export const ErrorActions = (error, dispatch, action) => {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    const navigate = useNavigate()
    if (message === "Not authorized, token failed") {
        // logout here
        dispatch(logoutAction())
        navigate("/login")
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
