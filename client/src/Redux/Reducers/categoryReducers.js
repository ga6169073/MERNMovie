import * as CategoryConstants from '../Constants/categoryConstants';

// get all categories
export const getAllCategoriesReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case CategoryConstants.PUBLIC_GET_ALL_CATEGORIES_REQUEST:
            return { isLoading: true }
        case CategoryConstants.PUBLIC_GET_ALL_CATEGORIES_SUCCESS:
            return { isLoading: false, categories: action.payload }
        case CategoryConstants.PUBLIC_GET_ALL_CATEGORIES_FAIL:
            return { isLoading: false, isError: action.payload }
        default:
            return state
    }
}

//create category
export const adminCreateCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case CategoryConstants.ADMIN_CREATE_CATEGORY_REQUEST:
            return { isLoading: true }
        case CategoryConstants.ADMIN_CREATE_CATEGORY_SUCCESS:
            return { isLoading: false, isSuccess: true }
        case CategoryConstants.ADMIN_CREATE_CATEGORY_FAIL:
            return { isLoading: false, isError: action.payload }
        case CategoryConstants.ADMIN_CREATE_CATEGORY_RESET:
            return {}
        default:
            return state
    }
}

//delete category
export const adminDeleteCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case CategoryConstants.ADMIN_DELETE_CATEGORY_REQUEST:
            return { isLoading: true }
        case CategoryConstants.ADMIN_DELETE_CATEGORY_SUCCESS:
            return { isLoading: false, isSuccess: true }
        case CategoryConstants.ADMIN_DELETE_CATEGORY_FAIL:
            return { isLoading: false, isError: action.payload }
        case CategoryConstants.ADMIN_DELETE_CATEGORY_RESET:
            return {}
        default:
            return state
    }
}

//update category
export const adminUpdateCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case CategoryConstants.ADMIN_UPDATE_CATEGORY_REQUEST:
            return { isLoading: true }
        case CategoryConstants.ADMIN_UPDATE_CATEGORY_SUCCESS:
            return { isLoading: false, isSuccess: true }
        case CategoryConstants.ADMIN_UPDATE_CATEGORY_FAIL:
            return { isLoading: false, isError: action.payload }
        case CategoryConstants.ADMIN_UPDATE_CATEGORY_RESET:
            return {}
        default:
            return state
    }
}