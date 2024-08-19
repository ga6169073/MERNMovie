// // actions.js
// export const USER_LOGIN = 'USER_LOGIN';
// export const USER_LOGOUT = 'USER_LOGOUT';

// export const userLogin = (userInfo) => ({
//   type: USER_LOGIN,
//   payload: userInfo,
// });

// export const userLogout = () => ({
//   type: USER_LOGOUT,
// });

import * as userConstants from "../Constants/userConstants.js";
import * as userAPI from "../APIs/userServices.js";
import * as movieConstants from "../Constants/movieConstants.js";
import * as categoryConstants from "../Constants/categoryConstants.js";
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorActions, tokenProtection } from "../Protection.js";
import { toast } from "react-toastify";

//login action
const loginAction = (user) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST })
    const response = await userAPI.loginService(user)
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response })
    // toast.success("Login Successful")
  } catch (error) {
    ErrorActions(error, dispatch, userConstants.USER_LOGIN_FAIL)
  }
}

//register action
const registerAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST })
    const response = await userAPI.registerService(data)
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response })
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response })
  } catch (error) {
    ErrorActions(error, dispatch, userConstants.USER_REGISTER_FAIL)
  }
}


// logout action
const logoutAction = () => (dispatch) => {
  userAPI.logoutService()
  dispatch({ type: userConstants.USER_LOGOUT })
  dispatch({ type: userConstants.USER_LOGIN_RESET })
  dispatch({ type: userConstants.USER_REGISTER_RESET })
  dispatch({ type: userConstants.USER_GET_FAVORITE_MOVIES_RESET })
  dispatch({ type: userConstants.USER_DELETE_FAVORITE_MOVIES_RESET })
  dispatch({ type: userConstants.USER_UPDATE_PROFILE_RESET })
  dispatch({ type: userConstants.USER_DELETE_PROFILE_RESET })
  dispatch({ type: userConstants.USER_CHANGE_PASSWORD_RESET })
  dispatch({ type: userConstants.ADMIN_GET_ALL_USERS_RESET })
  dispatch({ type: userConstants.ADMIN_DELETE_USER_RESET })
  dispatch({ type: userConstants.USER_LIKE_MOVIE_RESET })
  dispatch({ type: movieConstants.PUBLIC_GET_MOVIE_BY_ID_RESET })
  dispatch({ type: movieConstants.USER_CREATE_REVIEW_MOVIE_RESET })
  dispatch({ type: movieConstants.ADMIN_CREATE_MOVIE_RESET })
  dispatch({ type: movieConstants.ADMIN_UPDATE_MOVIE_RESET })
  dispatch({ type: movieConstants.ADMIN_RESET_CAST })
  dispatch({type: categoryConstants.ADMIN_CREATE_CATEGORY_RESET})
  dispatch({type: categoryConstants.ADMIN_DELETE_CATEGORY_RESET})
  dispatch({type: categoryConstants.ADMIN_UPDATE_CATEGORY_RESET})

}

//update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST })
    const response = await userAPI.updateProfileService(user, tokenProtection(getState))
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response
    })
    toast.success("Profile updated")
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: response
    })
  } catch (error) {
    ErrorActions(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL)
  }
}

//delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST })
    await userAPI.deleteProfileService(tokenProtection(getState))
    dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS })
    toast.success("Profile deleted")
    dispatch(logoutAction())
  } catch (error) {
    ErrorActions(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL)
  }
}

//change password action
const changePasswordAction = (password) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST })
    const response = await userAPI.changePasswordService(
      password,
      tokenProtection(getState)
    )
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_SUCCESS, payload: response })
    // toast.success("Password changed")
  }
  catch (error) {
    ErrorActions(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL)
  }
}

//get favorite movies action
const getFavoriteMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_GET_FAVORITE_MOVIES_REQUEST })
    const response = await userAPI.getFavoriteMoviesService(tokenProtection(getState))
    dispatch({
      type: userConstants.USER_GET_FAVORITE_MOVIES_SUCCESS,
      payload: response
    })
  }
  catch (error) {
    ErrorActions(error, dispatch, userConstants.USER_GET_FAVORITE_MOVIES_FAIL)
  }
}

//delete favorite movies action
const deleteFavoriteMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_FAVORITE_MOVIES_REQUEST })
    await userAPI.deleteFavoriteMoviesService(tokenProtection(getState))
    dispatch({ type: userConstants.USER_DELETE_FAVORITE_MOVIES_SUCCESS })
    toast.success("Favorite movies Deleted")
  } catch (error) {
    ErrorActions(error, dispatch, userConstants.USER_DELETE_FAVORITE_MOVIES_FAIL)
  }
}

//admin get all users action
const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.ADMIN_GET_ALL_USERS_REQUEST })
    const response = await userAPI.getAllUsersService(tokenProtection(getState))
    dispatch({ type: userConstants.ADMIN_GET_ALL_USERS_SUCCESS, payload: response })
  }
  catch (error) {
    ErrorActions(error, dispatch, userConstants.ADMIN_GET_ALL_USERS_FAIL)
  }
}

//admin delete user action
const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.ADMIN_DELETE_USER_REQUEST })
    await userAPI.deleteUserService(id, tokenProtection(getState))
    dispatch({ type: userConstants.ADMIN_DELETE_USER_SUCCESS })
    toast.success("User Deleted")
  } catch (error) {
    ErrorActions(error, dispatch, userConstants.ADMIN_DELETE_USER_FAIL)
  }
}

//user like movie action
const likeMovieAction = (movieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_LIKE_MOVIE_REQUEST })
    const response = await userAPI.likeMovieService(movieId, tokenProtection(getState))
    dispatch({ type: userConstants.USER_LIKE_MOVIE_SUCCESS, payload: response })
    toast.success("Added to favorites")
    dispatch(getFavoriteMoviesAction())
  } catch (error) {
    ErrorActions(error, dispatch, userConstants.USER_LIKE_MOVIE_FAIL)
  }
}
export {
  loginAction, registerAction, logoutAction, updateProfileAction, deleteProfileAction,
  changePasswordAction, getFavoriteMoviesAction, deleteFavoriteMoviesAction,
  getAllUsersAction, deleteUserAction,
  likeMovieAction
}