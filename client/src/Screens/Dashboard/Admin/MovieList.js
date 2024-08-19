import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import Table from '../../../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllMoviesAction, deleteMovieAction, getAllMoviesAction } from '../../../Redux/Actions/movieActions'
import { toast } from 'react-toastify'
import Loader from '../../../Components/Notifications/Loader'
import { Empty } from '../../../Components/Notifications/Empty'
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'

function MovieList() {
    const dispatch = useDispatch()
    const sameClass = "text-white p-2 rounded font-semibold border-subMain border-2 hover:bg-subMain"
    // all movies
    const { isLoading, isError, movies, pages, page } = useSelector((state) => state.movieGetAll)
    // delete
    const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.adminDeleteMovie)
    //delete all
    const { isLoading: deleteAllLoading, isError: deleteAllError } = useSelector((state) => state.adminDeleteAllMovies)

    // delete movie handler
    const deleteMovieHandler = (id) => {
        window.confirm("Are you sure you want to delete this movie?")
            && dispatch(deleteMovieAction(id))
    }

    // delete all movies handler
    const deleteAllMovieHandler = () => {
        window.confirm("Are you sure you want to delete all movies?")
            && dispatch(deleteAllMoviesAction())
    }

    // useEffect
    useEffect(() => {
        dispatch(getAllMoviesAction({}))
        //error
        if (isError || deleteError || deleteAllError) {
            toast(isError || deleteError || deleteAllError)
        }
    }, [dispatch, isError, deleteError, deleteAllError])
    // pagination 
    const nextPage = () => {
        dispatch(getAllMoviesAction({ pageNumber: page + 1 }))
    }
    const prevPage = () => {
        dispatch(getAllMoviesAction({ pageNumber: page - 1 }))
    }
    return (
        <SideBar>
            <div className='flex flex-col gap-6 '>
                <div className='flex-btn gap-2'>
                    <h2 className='font-bold text-xl'>
                        Movies List
                    </h2>
                    {movies?.length > 0 && <button
                        onClick={deleteAllMovieHandler}
                        disabled={deleteAllLoading}
                        className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>
                        {
                            deleteAllLoading ? "Deleting..." : "Delete All"
                        }
                    </button>
                    }
                </div>
                {
                    isLoading || deleteLoading ? <Loader /> : movies?.length > 0 ?
                        <>
                            <Table
                                data={movies}
                                admin={true}
                                onDeleteHandler={deleteMovieHandler}
                            />
                            {/* Loading more movies */}
                            <div className='w-full flex-rows my-5 gap-6'>
                                <button onClick={prevPage} disabled={page === 1} className={sameClass}>
                                    <TbPlayerTrackPrev className="text-xl" />
                                </button>
                                <button onClick={nextPage} disabled={page === pages} className={sameClass}>
                                    <TbPlayerTrackNext className="text-xl" />
                                </button>
                            </div>

                        </>
                        : <Empty message="You have no movies" />
                }

            </div>
        </SideBar>
    )
}


export default MovieList