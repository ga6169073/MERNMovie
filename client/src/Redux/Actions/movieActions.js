import * as movieConstants from '../Constants/movieConstants';
import * as movieAPI from "../APIs/movieServices.js";
import 'react-toastify/dist/ReactToastify.css';
import { ErrorActions, tokenProtection } from "../Protection.js";
import { toast } from "react-toastify";

// get all movies action
export const getAllMoviesAction = ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
}) => async (dispatch) => {
    try {
        dispatch({ type: movieConstants.PUBLIC_GET_MOVIE_LIST_REQUEST })
        const response = await movieAPI.getAllMoviesService({
            category,
            time,
            language,
            rate,
            year,
            search,
            pageNumber
        });
        dispatch({ type: movieConstants.PUBLIC_GET_MOVIE_LIST_SUCCESS, payload: response })
    }
    catch (error) {
        // console.log(error);
        ErrorActions(error, dispatch, movieConstants.PUBLIC_GET_MOVIE_LIST_FAIL);
    }
}

// get random movies action
export const getRandomMoviesAction = () => async (dispatch) => {
    try {
        dispatch({ type: movieConstants.PUBLIC_GET_RANDOM_MOVIES_REQUEST })
        const response = await movieAPI.getRandomMoviesService();
        dispatch({ type: movieConstants.PUBLIC_GET_RANDOM_MOVIES_SUCCESS, payload: response })
    }
    catch (error) {
        // console.log(error);
        ErrorActions(error, dispatch, movieConstants.PUBLIC_GET_RANDOM_MOVIES_FAIL);
    }
}

//get movie by id action
export const getMovieByIdAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: movieConstants.PUBLIC_GET_MOVIE_BY_ID_REQUEST })
        const response = await movieAPI.getMovieByIdService(id);
        dispatch({ type: movieConstants.PUBLIC_GET_MOVIE_BY_ID_SUCCESS, payload: response })
    }
    catch (error) {
        // console.log(error);
        ErrorActions(error, dispatch, movieConstants.PUBLIC_GET_MOVIE_BY_ID_FAIL);
    }
}

//get top rated movies action
export const getTopRatedMoviesAction = () => async (dispatch) => {
    try {
        dispatch({ type: movieConstants.PUBLIC_GET_TOP_RATED_MOVIES_REQUEST })
        const response = await movieAPI.getTopRatedMoviesService();
        dispatch({ type: movieConstants.PUBLIC_GET_TOP_RATED_MOVIES_SUCCESS, payload: response })
    }
    catch (error) {
        // console.log(error);
        ErrorActions(error, dispatch, movieConstants.PUBLIC_GET_TOP_RATED_MOVIES_FAIL);
    }
}

// review movie action
export const reviewMovieAction = ({ id, review }) => async (dispatch, getState) => {
    try {
        dispatch({ type: movieConstants.USER_CREATE_REVIEW_MOVIE_REQUEST })
        const response = await movieAPI.reviewMovieService(tokenProtection(getState), id, review);
        dispatch({ type: movieConstants.USER_CREATE_REVIEW_MOVIE_SUCCESS, payload: response })
        toast.success("Review added successfully")
        dispatch({ type: movieConstants.USER_CREATE_REVIEW_MOVIE_RESET })
        dispatch(getMovieByIdAction(id))
    } catch (error) {
        // console.log(error);
        ErrorActions(error, dispatch, movieConstants.USER_CREATE_REVIEW_MOVIE_FAIL);
    }
}

// delete movie action
export const deleteMovieAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: movieConstants.ADMIN_DELETE_MOVIE_REQUEST })
        const response = await movieAPI.deleteMovieService(id, tokenProtection(getState))
        dispatch({ type: movieConstants.ADMIN_DELETE_MOVIE_SUCCESS, payload: response })
        toast.success("Movie deleted successfully")
        dispatch(getAllMoviesAction({}))

    } catch (error) {
        // console.log(error);
        ErrorActions(error, dispatch, movieConstants.ADMIN_DELETE_MOVIE_FAIL);
    }
}

// delete all movies action
export const deleteAllMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: movieConstants.ADMIN_DELETE_ALL_MOVIES_REQUEST })
        const response = await movieAPI.deleteAllMoviesService(tokenProtection(getState))
        dispatch({ type: movieConstants.ADMIN_DELETE_ALL_MOVIES_SUCCESS, payload: response })
        toast.success("All movies deleted successfully")
        dispatch(getAllMoviesAction())
    } catch (error) {
        // console.log(error);
        ErrorActions(error, dispatch, movieConstants.ADMIN_DELETE_ALL_MOVIES_FAIL);
    }
}

// create movie action
export const createMovieAction = (movie) => async (dispatch, getState) => {
    try {
        dispatch({ type: movieConstants.ADMIN_CREATE_MOVIE_REQUEST })
        const response = await movieAPI.createMovieService(tokenProtection(getState), movie)
        dispatch({ type: movieConstants.ADMIN_CREATE_MOVIE_SUCCESS, payload: response })
        toast.success("Movie created successfully")
        dispatch(getAllMoviesAction({}))
        dispatch(resetCastAction())
    } catch (error) {
        // console.log(error);
        ErrorActions(error, dispatch, movieConstants.ADMIN_CREATE_MOVIE_FAIL);
    }
}

// update movie action
export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
    try {
        dispatch({ type: movieConstants.ADMIN_UPDATE_MOVIE_REQUEST })
        const response = await movieAPI.updateMovieService(tokenProtection(getState), id, movie)
        dispatch({ type: movieConstants.ADMIN_UPDATE_MOVIE_SUCCESS, payload: response })
        toast.success("Movie updated successfully")
        dispatch(getMovieByIdAction(id))
        dispatch(resetCastAction())
    } catch (error) {
        // console.log(error);
        ErrorActions(error, dispatch, movieConstants.ADMIN_UPDATE_MOVIE_FAIL);
    }
}

//// Movie casts
// add cast
export const createCastAction = (cast) => async (dispatch, getState) => {
    dispatch({ type: movieConstants.ADMIN_CREATE_CAST, payload: cast })
    localStorage.setItem("casts", JSON.stringify(getState().adminMovieCastsCRUD.casts))
}

//remove cast
export const deleteCastAction = (id) => async (dispatch, getState) => {
    dispatch({ type: movieConstants.ADMIN_DELETE_CAST, payload: id })
    localStorage.setItem("casts", JSON.stringify(getState().adminMovieCastsCRUD.casts))
}

//edit cast
export const updateCastAction = (cast) => async (dispatch, getState) => {
    dispatch({ type: movieConstants.ADMIN_UPDATE_CAST, payload: cast })
    localStorage.setItem("casts", JSON.stringify(getState().adminMovieCastsCRUD.casts))
}

//reset casts
export const resetCastAction = () => async (dispatch) => {
    dispatch({ type: movieConstants.ADMIN_RESET_CAST })
    localStorage.removeItem("casts")
}

// load casts
export const loadCastAction = (casts) => async (dispatch, getState) => {
    dispatch({ type: movieConstants.ADMIN_LOAD_CAST, payload: casts })
    localStorage.setItem("casts", JSON.stringify(getState().adminMovieCastsCRUD.casts))
}