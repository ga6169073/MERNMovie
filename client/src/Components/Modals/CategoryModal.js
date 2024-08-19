import React, { useEffect, useState } from 'react'
import MainModal from './MainModal'
import { Input } from '../UserInputs'
import { useDispatch, useSelector } from 'react-redux'
import { createCategoryAction, updateCategoryAction } from '../../Redux/Actions/categoryActions'
import { toast } from 'react-toastify'

function CategoryModal({ modalOpen, setModalOpen, category }) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("") //category?.title 
    const { isLoading, isError, isSuccess } = useSelector(state => state.adminCreateCategory)
    const { isLoading: updateLoading, isError: updateError, isSuccess: updateSuccess } = useSelector(state => state.adminUpdateCategory)
    // create category handler
    const submitHandler = (e) => {
        e.preventDefault()
        if (title) {
            //if category is not empty, update category else create category
            if (category) {
                dispatch(updateCategoryAction(category?._id, { title: title }))
                setModalOpen(!modalOpen)
            }
            else {
                dispatch(createCategoryAction({ title: title }))
                setTitle("")
                setModalOpen(!modalOpen)
            }
        } else {
            toast.error("Category title is required")
        }
    }
    //useEffect
    useEffect(() => {
        //error
        if (updateError || isError) {
            toast.error(updateError || isError)
            dispatch({
                type: isError ? "ADMIN_CREATE_CATEGORY_RESET" : "ADMIN_UPDATE_CATEGORY_RESET",
            })
        }
        //success
        if (updateSuccess || isSuccess) {
            toast.error(updateSuccess || isSuccess)
            dispatch({
                type: isError ? "ADMIN_CREATE_CATEGORY_RESET" : "ADMIN_UPDATE_CATEGORY_RESET",
            })
        }

        //if category is not null, set title to category title
        if (category) {
            setTitle(category?.title)
        }
        // if modal is closed, set title to empty
        if (modalOpen === false) {
            setTitle("")
        }
    }, [dispatch, isError, isSuccess, updateError, updateSuccess, category, modalOpen])


    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className='inline-block  w-full align-middle border border-border text-white p-10 h-full bg-main overflow-y-auto rounded-2xl'>
                <h2 className='text-3xl font-bold'>
                    {category ? 'Update' : 'Create'}
                </h2>
                <form className='flex flex-col gap-6 text-left mt-6'
                    onSubmit={submitHandler}
                >
                    <Input label="Category Name" placeholder={"Title"} type="type" background={false} value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <button
                        disabled={isLoading || updateLoading}
                        type='submit'
                        className='w-full flex-rows gap-4 transitions py-3 text-lg hover:bg-dry border-2 border-subMain rounded bg-subMain text-white'>
                        {
                            isLoading || updateLoading ? "Loading..." : category ? "Update" : "Create"
                        }
                    </button>
                </form>
            </div>
        </MainModal>
    )
}

export default CategoryModal