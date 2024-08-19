import * as movieConstants from '../Constants/movieConstants';

//get movies list
export const movieListReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case movieConstants.PUBLIC_GET_MOVIE_LIST_REQUEST:
            return { isLoading: true };
        case movieConstants.PUBLIC_GET_MOVIE_LIST_SUCCESS:
            return {
                isLoading: false,
                movies: action.payload.movies,
                pages: action.payload.pages,
                page: action.payload.page,
                totalMovies: action.payload.totalMovies,
            };
        case movieConstants.PUBLIC_GET_MOVIE_LIST_FAIL:
            return { isLoading: false, isError: action.payload };
        default:
            return state;
    }
}

//get random movies
export const randomMoviesReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case movieConstants.PUBLIC_GET_RANDOM_MOVIES_REQUEST:
            return { isLoading: true };
        case movieConstants.PUBLIC_GET_RANDOM_MOVIES_SUCCESS:
            return { isLoading: false, movies: action.payload };
        case movieConstants.PUBLIC_GET_RANDOM_MOVIES_FAIL:
            return { isLoading: false, isError: action.payload };
        default:
            return state;
    }
}

//get movie by id
export const movieByIdReducer = (state = { movie: {} }, action) => {
    switch (action.type) {
        case movieConstants.PUBLIC_GET_MOVIE_BY_ID_REQUEST:
            return { isLoading: true };
        case movieConstants.PUBLIC_GET_MOVIE_BY_ID_SUCCESS:
            return { isLoading: false, movie: action.payload };
        case movieConstants.PUBLIC_GET_MOVIE_BY_ID_FAIL:
            return { isLoading: false, isError: action.payload };
        case movieConstants.PUBLIC_GET_MOVIE_BY_ID_RESET:
            return { movie: {} }
        default:
            return state;
    }
}

//get top rated movies
export const topRatedMoviesReducer = (state = { movies: [] }, action) => {
    switch (action.type) {
        case movieConstants.PUBLIC_GET_TOP_RATED_MOVIES_REQUEST:
            return { isLoading: true };
        case movieConstants.PUBLIC_GET_TOP_RATED_MOVIES_SUCCESS:
            return { isLoading: false, movies: action.payload };
        case movieConstants.PUBLIC_GET_TOP_RATED_MOVIES_FAIL:
            return { isLoading: false, isError: action.payload };
        default:
            return state;
    }
}

//create review movie
export const createReviewMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case movieConstants.USER_CREATE_REVIEW_MOVIE_REQUEST:
            return { isLoading: true };
        case movieConstants.USER_CREATE_REVIEW_MOVIE_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case movieConstants.USER_CREATE_REVIEW_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload };
        case movieConstants.USER_CREATE_REVIEW_MOVIE_RESET:
            return {}
        default:
            return state;
    }
}

//delete movie
export const deleteMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case movieConstants.ADMIN_DELETE_MOVIE_REQUEST:
            return { isLoading: true };
        case movieConstants.ADMIN_DELETE_MOVIE_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case movieConstants.ADMIN_DELETE_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload };
        default:
            return state;
    }
}

//delete all movies
export const deleteAllMoviesReducer = (state = {}, action) => {
    switch (action.type) {
        case movieConstants.ADMIN_DELETE_ALL_MOVIES_REQUEST:
            return { isLoading: true };
        case movieConstants.ADMIN_DELETE_ALL_MOVIES_SUCCESS:
            return { isLoading: false, isSuccess: true }
        case movieConstants.ADMIN_DELETE_ALL_MOVIES_FAIL:
            return { isLoading: false, isError: action.payload };
        default:
            return state;
    }
}

//create movie
export const createMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case movieConstants.ADMIN_CREATE_MOVIE_REQUEST:
            return { isLoading: true };
        case movieConstants.ADMIN_CREATE_MOVIE_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case movieConstants.ADMIN_CREATE_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload };
        case movieConstants.ADMIN_CREATE_MOVIE_RESET:
            return {}
        default:
            return state;
    }
}

//update movie
export const updateMovieReducer = (state = {}, action) => {
    switch (action.type) {
        case movieConstants.ADMIN_UPDATE_MOVIE_REQUEST:
            return { isLoading: true };
        case movieConstants.ADMIN_UPDATE_MOVIE_SUCCESS:
            return { isLoading: false, isSuccess: true };
        case movieConstants.ADMIN_UPDATE_MOVIE_FAIL:
            return { isLoading: false, isError: action.payload };
        case movieConstants.ADMIN_UPDATE_MOVIE_RESET:
            return {}
        default:
            return state;
    }
}

//movie casts
export const movieCastsReducer = (state = { casts: [] }, action) => {

    switch (action.type) {
        case movieConstants.ADMIN_CREATE_CAST:
            return { casts: [...state.casts, action.payload] };
        case movieConstants.ADMIN_UPDATE_CAST:
            const updatedCasts = state.casts.map((cast) =>
                cast.id === action.payload.id ? action.payload : cast)
            return {
                casts: updatedCasts
            }
        case movieConstants.ADMIN_DELETE_CAST:
            return {
                ...state,
                casts: state.casts.filter((cast) => cast.id !== action.payload)
            }
        case movieConstants.ADMIN_RESET_CAST:
            return { casts: [] }
        case movieConstants.ADMIN_LOAD_CAST:
            return { casts: action.payload }
        default:
            return state;
    }
}