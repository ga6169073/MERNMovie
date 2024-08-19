import * as categoryConstants from "../Constants/categoryConstants";
import * as categoryAPI from "../APIs/categoryServices";
import 'react-toastify/dist/ReactToastify.css';
import { ErrorActions, tokenProtection } from "../Protection";
import { toast } from "react-toastify";

// get all categories action
export const getAllCategoriesAction = () => async (dispatch) => {
    try {
        dispatch({ type: categoryConstants.PUBLIC_GET_ALL_CATEGORIES_REQUEST });
        const data = await categoryAPI.getCategoriesService();
        dispatch({ type: categoryConstants.PUBLIC_GET_ALL_CATEGORIES_SUCCESS, payload: data });
    } catch (error) {
        ErrorActions(error, dispatch, categoryConstants.PUBLIC_GET_ALL_CATEGORIES_FAIL);
    }
}

// create category action
export const createCategoryAction = (title) => async (dispatch, getState) => {
    try {
        dispatch({ type: categoryConstants.ADMIN_CREATE_CATEGORY_REQUEST });
        await categoryAPI.createCategoryService(title, tokenProtection(getState));
        dispatch({ type: categoryConstants.ADMIN_CREATE_CATEGORY_SUCCESS });
        toast.success("Category created successfully");
        dispatch(getAllCategoriesAction());
    } catch (error) {
        ErrorActions(error, dispatch, categoryConstants.ADMIN_CREATE_CATEGORY_FAIL);
    }
}

//delete category action
export const deleteCategoryAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: categoryConstants.ADMIN_DELETE_CATEGORY_REQUEST });
        await categoryAPI.deleteCategoryService(id, tokenProtection(getState));
        dispatch({ type: categoryConstants.ADMIN_DELETE_CATEGORY_SUCCESS });
        toast.success("Category deleted successfully");
        dispatch(getAllCategoriesAction());
    } catch (error) {
        ErrorActions(error, dispatch, categoryConstants.ADMIN_DELETE_CATEGORY_FAIL);
    }
}

//update category action
export const updateCategoryAction = (id, title) => async (dispatch, getState) => {
    try {
        dispatch({ type: categoryConstants.ADMIN_UPDATE_CATEGORY_REQUEST });
        await categoryAPI.updateCategoryService(id, title, tokenProtection(getState));
        dispatch({ type: categoryConstants.ADMIN_UPDATE_CATEGORY_SUCCESS });
        toast.success("Category updated successfully");
        dispatch(getAllCategoriesAction());
    } catch (error) {
        ErrorActions(error, dispatch, categoryConstants.ADMIN_UPDATE_CATEGORY_FAIL);
    }
}


