import {
    combineReducers,
    configureStore
} from '@reduxjs/toolkit'
import { adminDeleteUserReducer, adminGetAllUsersReducer, userChangePasswordReducer, userDeleteFavoriteMoviesReducer, userDeleteProfileReducer, userGetFavoriteMoviesReducer, userLikeMovieReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './Reducers/userReducers.js'
import { getAllCategoriesReducer, adminCreateCategoryReducer, adminDeleteCategoryReducer, adminUpdateCategoryReducer } from './Reducers/categoryReducers.js'
import { createMovieReducer, createReviewMovieReducer, deleteAllMoviesReducer, deleteMovieReducer, movieByIdReducer, movieCastsReducer, movieListReducer, randomMoviesReducer, topRatedMoviesReducer, updateMovieReducer } from './Reducers/movieReducers.js'

const rootReducer = combineReducers({
    // user reducers
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDeleteProfile: userDeleteProfileReducer,
    userChangePassword: userChangePasswordReducer,
    userGetFavoriteMovies: userGetFavoriteMoviesReducer,
    userDeleteFavoriteMovies: userDeleteFavoriteMoviesReducer,
    adminGetAllUsers: adminGetAllUsersReducer,
    adminDeleteUser: adminDeleteUserReducer,
    userLikeMovie: userLikeMovieReducer,
    // category reducers
    categoryGetAll: getAllCategoriesReducer,
    adminCreateCategory: adminCreateCategoryReducer,
    adminDeleteCategory: adminDeleteCategoryReducer,
    adminUpdateCategory: adminUpdateCategoryReducer,

    // movie reducers
    movieGetAll: movieListReducer,
    movieGetRandom: randomMoviesReducer,
    movieGetById: movieByIdReducer,
    movieGetTopRated: topRatedMoviesReducer,
    userReviewMovie: createReviewMovieReducer,
    adminDeleteMovie: deleteMovieReducer,
    adminDeleteAllMovies: deleteAllMoviesReducer,
    adminCreateMovie: createMovieReducer,
    adminUpdateMovie: updateMovieReducer,
    adminMovieCastsCRUD: movieCastsReducer,

})

//get userInfo from local storage
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
// initialState
const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    userRegister: {},
}

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
},
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
