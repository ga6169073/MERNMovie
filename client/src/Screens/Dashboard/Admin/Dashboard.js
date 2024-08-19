import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import { FaRegListAlt, FaUser } from 'react-icons/fa'
import { HiViewGrid } from 'react-icons/hi'
import Table from '../../../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersAction } from '../../../Redux/Actions/userActions'
import { toast } from 'react-toastify'
import Loader from '../../../Components/Notifications/Loader'
import { Empty } from '../../../Components/Notifications/Empty'
import { deleteMovieAction } from '../../../Redux/Actions/movieActions'
import moment from 'moment'
function Dashboard() {
    const dispatch = useDispatch()
    const { isLoading: categoryLoading, isError: categoryError, categories } = useSelector(
        state => state.categoryGetAll
    )
    const { isLoading: userLoading, isError: userError, users } = useSelector(
        state => state.adminGetAllUsers
    )
    const { isLoading, isError, movies, totalMovies } = useSelector(
        state => state.movieGetAll
    )
    // delete
    const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.adminDeleteMovie)

    //delete movie handler 
    const deleteMovieHandler = (id) => {
        window.confirm("Are you sure you want to delete this movie?") &&
            dispatch(deleteMovieAction(id))
    }
    //useEffect
    useEffect(() => {
        //get all users
        dispatch(getAllUsersAction())

    }, [dispatch, movies])
    //useEffect
    useEffect(() => {
        //errors 
        if (isError || categoryError || userError || deleteError) {
            toast.error(isError || categoryError || userError || deleteError)
        }
    }, [isError, categoryError, userError, deleteError])
    //dashboard 
    const DashboardData = [
        {
            bg: "bg-orange-600",
            icon: FaRegListAlt,
            title: "Total Movies",
            total: isLoading ? "Loading..." : totalMovies || 0
        },
        {
            bg: "bg-blue-700",
            icon: HiViewGrid,
            title: "Total Categories",
            total: categoryLoading ? "Loading..." : categories?.length || 0
        },
        {
            bg: "bg-green-600",
            icon: FaUser,
            title: "Total Users",
            total: userLoading ? "Loading..." : users?.length || 0
        }
    ]
    return (
        <SideBar>
            <h2 className='text-xl font-bold'>
                Dashboard
            </h2>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 '>
                {DashboardData.map((data, index) => (
                    <div key={index} className='p-4 rounded bg-main border-border grid grid-cols-4 gap-2'>
                        <div className={`col-span-1 rounded-full h-12 w-12 flex-cols ${data.bg}`}>
                            <data.icon />
                        </div>
                        <div className='col-span-3'>
                            <h2 className='text-xl font-bold'>
                                {data.title}
                            </h2>
                            <p className='mt-2 font-bold'>{data.total}</p>
                        </div>
                    </div>
                ))}
            </div>
            <h3 className='text-md font-medium my-6 text-border '>
                Recent Movies
            </h3>
            {
                isLoading || deleteLoading ? (
                    <Loader />
                ) : movies?.length > 0 ? (
                    <Table data={movies?.toSorted((a, b) => 
                        moment(moment(b?.updatedAt).format()).diff(moment(a?.createdAt).format())).slice(0, 5)} admin={true} onDeleteHandler={deleteMovieHandler} />
                ) : (
                    <Empty message="No movies available" />
                )
            }
        </SideBar>
    )
}

export default Dashboard