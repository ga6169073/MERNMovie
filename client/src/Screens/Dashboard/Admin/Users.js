import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import Table2 from '../../../Components/Table2'

import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAction, getAllUsersAction } from '../../../Redux/Actions/userActions'
import { toast } from 'react-toastify'
import Loader from '../../../Components/Notifications/Loader'
import { Empty } from '../../../Components/Notifications/Empty'

function Users() {
    const dispatch = useDispatch()

    const {
        isLoading, isError, users
    } = useSelector(state => state.adminGetAllUsers)
    //delete 
    const {
        isError: deleteError, isSuccess
    } = useSelector(state => state.adminDeleteUser)
    //delete user handler
    const deleteUserHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUserAction(id))
        }
    }

    // useEffect
    useEffect(() => {
        dispatch(getAllUsersAction())
        if (isError || deleteError) {
            toast.error(isError || deleteError)
            dispatch({ type: isError ? 'ADMIN_GET_ALL_USERS_RESET' : 'ADMIN_DELETE_USER_RESET' })
        }
    }, [dispatch, isError, deleteError, isSuccess])
    return (
        <SideBar>
            <div className='flex flex-col gap-6 '>
                <div className='flex-btn gap-2'>
                    <h2 className='font-bold text-xl'>
                        Users
                    </h2>
                </div>
                {
                    isLoading ? <Loader /> : users?.length > 0 ?
                        <Table2 data={users} users={true}
                            onDeleteFunction={deleteUserHandler}
                        />
                        : <Empty message="No user" />
                }


            </div>
        </SideBar>
    )
}


export default Users