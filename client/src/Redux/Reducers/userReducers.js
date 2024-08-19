// // reducer.js
// import { USER_LOGIN, USER_LOGOUT } from './actions';

// const initialState = {
//   userInfo: null,
// };

// export const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case USER_LOGIN:
//       return { ...state, userInfo: action.payload };
//     case USER_LOGOUT:
//       return { ...state, userInfo: null };
//     default:
//       return state;
//   }
// };

import * as userConstants from "../Constants/userConstants.js";

//login
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_LOGIN_REQUEST:
      return { isLoading: true }
    case userConstants.USER_LOGIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true }
    case userConstants.USER_LOGIN_FAIL:
      return { isLoading: false, isError: action.payload }
    case userConstants.USER_LOGIN_RESET:
      return {}
    case userConstants.USER_LOGOUT:
      return {}
    default:
      return state
  }
}

//register
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      return { isLoading: true }
    case userConstants.USER_REGISTER_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true }
    case userConstants.USER_REGISTER_FAIL:
      return { isLoading: false, isError: action.payload }
    case userConstants.USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }

}

// update profile
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_UPDATE_PROFILE_REQUEST:
      return { isLoading: true }
    case userConstants.USER_UPDATE_PROFILE_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true }
    case userConstants.USER_UPDATE_PROFILE_FAIL:
      return { isLoading: false, isError: action.payload }
    case userConstants.USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state;
  }
}

//delete profile
export const userDeleteProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_DELETE_PROFILE_REQUEST:
      return { isLoading: true }
    case userConstants.USER_DELETE_PROFILE_SUCCESS:
      return { isLoading: false, isSuccess: true }
    case userConstants.USER_DELETE_PROFILE_FAIL:
      return { isLoading: false, isError: action.payload }
    case userConstants.USER_DELETE_PROFILE_RESET:
      return {}
    default:
      return state;
  }
}

//change password
export const userChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_CHANGE_PASSWORD_REQUEST:
      return { isLoading: true }
    case userConstants.USER_CHANGE_PASSWORD_SUCCESS:
      return { isLoading: false, isSuccess: true, message: action.payload.message }
    case userConstants.USER_CHANGE_PASSWORD_FAIL:
      return { isLoading: false, isError: action.payload }
    case userConstants.USER_CHANGE_PASSWORD_RESET:
      return {}
    default:
      return state;
  }
}

//get favorite movies
export const userGetFavoriteMoviesReducer = (state = {
  likedMovies: []
}, action) => {
  switch (action.type) {
    case userConstants.USER_GET_FAVORITE_MOVIES_REQUEST:
      return { isLoading: true }
    case userConstants.USER_GET_FAVORITE_MOVIES_SUCCESS:
      return { isLoading: false, favoriteMovies: action.payload }
    case userConstants.USER_GET_FAVORITE_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload }
    case userConstants.USER_GET_FAVORITE_MOVIES_RESET:
      return {}
    default:
      return state;
  }
}

//delete favorite movies
export const userDeleteFavoriteMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_DELETE_FAVORITE_MOVIES_REQUEST:
      return { isLoading: true }
    case userConstants.USER_DELETE_FAVORITE_MOVIES_SUCCESS:
      return { isLoading: false, isSuccess: true }
    case userConstants.USER_DELETE_FAVORITE_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload }
    case userConstants.USER_DELETE_FAVORITE_MOVIES_RESET:
      return {};
    default:
      return state;
  }
}

//admin get all users
export const adminGetAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userConstants.ADMIN_GET_ALL_USERS_REQUEST:
      return { isLoading: true }
    case userConstants.ADMIN_GET_ALL_USERS_SUCCESS:
      return { isLoading: false, users: action.payload }
    case userConstants.ADMIN_GET_ALL_USERS_FAIL:
      return { isLoading: false, isError: action.payload }
    case userConstants.ADMIN_GET_ALL_USERS_RESET:
      return {
        users: []
      }
    default:
      return state;
  }
}

//admin delete user
export const adminDeleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.ADMIN_DELETE_USER_REQUEST:
      return { isLoading: true }
    case userConstants.ADMIN_DELETE_USER_SUCCESS:
      return { isLoading: false, isSuccess: true }
    case userConstants.ADMIN_DELETE_USER_FAIL:
      return { isLoading: false, isError: action.payload }
    case userConstants.ADMIN_DELETE_USER_RESET:
      return {}
    default:
      return state;
  }
}

//user like movie
export const userLikeMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_LIKE_MOVIE_REQUEST:
      return { isLoading: true }
    case userConstants.USER_LIKE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true }
    case userConstants.USER_LIKE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload }
    case userConstants.USER_LIKE_MOVIE_RESET:
      return {}
    default:
      return state;
  }
}