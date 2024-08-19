import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import Table2 from '../../../Components/Table2'
import { HiPlus } from 'react-icons/hi'
import CategoryModal from '../../../Components/Modals/CategoryModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategoryAction } from '../../../Redux/Actions/categoryActions'
import Loader from '../../../Components/Notifications/Loader'
import { Empty } from '../../../Components/Notifications/Empty'
import { toast } from 'react-toastify'

function Categories() {
    const [modalOpen, setModalOpen] = useState(false)
    const [category, setCategory] = useState()
    const dispatch = useDispatch()

    // all categories
    const { categories, isLoading } = useSelector(state => state.categoryGetAll)

    //delete category
    const { isSuccess, isError } = useSelector(state => state.adminDeleteCategory)
    const onDeleteFunction = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            dispatch(deleteCategoryAction(id))
        }
    }

    const onEditFunction = (id) => {
        setCategory(id)
        setModalOpen(!modalOpen)
    }
    useEffect(() => {
        if (isSuccess) {
            dispatch({ type: "ADMIN_DELETE_CATEGORY_RESET" })
        }
        if (isError) {
            toast.error(isError)
            dispatch({ type: "ADMIN_DELETE_CATEGORY_RESET" })
        }
        if (modalOpen === false) {
            setCategory()
        }
    }, [modalOpen, dispatch, isError, isSuccess]
    )
    return (
        <SideBar>
            <CategoryModal modalOpen={modalOpen} setModalOpen={setModalOpen} category={category} />
            <div className='flex flex-col gap-6 '>
                <div className='flex-btn gap-2'>
                    <h2 className='font-bold text-xl'>
                        Categories
                    </h2>
                    <button onClick={() => setModalOpen(true)} className='bg-green-500 flex-rows gap-4 font-medium transitions hover:bg-main border border-border text-white py-2 px-4 rounded'>
                        <HiPlus /> Create
                    </button>
                </div>
                {
                    isLoading ? <Loader /> : categories?.length > 0 ?
                        <Table2 data={categories} users={false} onEditFunction={onEditFunction} onDeleteFunction={onDeleteFunction}/>
                        : <Empty message="You have no categories" />
                }

            </div>
        </SideBar>
    )
}


export default Categories