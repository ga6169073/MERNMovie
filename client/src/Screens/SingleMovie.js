import React, { useContext, useEffect, useRef, useState } from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom'
import MovieInfo from '../Components/Single/MovieInfo'
import MovieCasts from '../Components/Single/MovieCasts'
import MovieRate from '../Components/Single/MovieRate'
import Title from '../Components/Title'
import { BsCollectionFill } from 'react-icons/bs'
import Movie from '../Components/Movie'
import ShareModal from '../Components/Modals/ShareModal'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieByIdAction } from '../Redux/Actions/movieActions'
import Loader from "../Components/Notifications/Loader"
import { RiMovie2Line } from 'react-icons/ri'
import { SidebarContext } from '../Context/DrawerContext'
import { DownloadVideo } from '../Context/Functionalities'
import FileSaver from 'file-saver'
function SingleMovie() {
    const [modalOpen, setModalOpen] = useState(false)
    const { id } = useParams()
    const { progress, setProgress } = useContext(SidebarContext)
    const dispatch = useDispatch()
    const sameClass = "w-full gap-6 flex-cols min-h-screen"
    // useSelector
    const { isLoading, isError, movie } = useSelector(state => state.movieGetById)
    const { movies } = useSelector(state => state.movieGetAll)

    const toastId = useRef(null)

    const RelatedMovie = movies?.filter((m) =>
        m.category === movie?.category && m._id !== movie?._id)
    // download video movie
    const downloadMovieVideo = async (videoUrl, name) => {
        await DownloadVideo(videoUrl, setProgress, toastId).then((data) => {
            setProgress(0)
            FileSaver.saveAs(data, name)
        })
    }

    //useEffect
    useEffect(() => {
        // get movie by id
        dispatch(getMovieByIdAction(id))
    }, [dispatch, id])
    return (
        <Layout>
            {
                isLoading ?
                    <div className={sameClass}>
                        <Loader />
                    </div> :
                    isError ? <div className={sameClass}>

                        <div className="flex-cols w-24 h-24 p-5 mb-5 rounded-full bg-dry text-subMain text-4xl">
                            <RiMovie2Line />
                        </div>
                        <p className='text-border text-sm'>
                            Movie not found
                        </p>
                    </div>
                        : (
                            <>
                                <ShareModal movie={movie} modalOpen={modalOpen} setModalOpen={setModalOpen} />
                                <MovieInfo movie={movie} setModalOpen={setModalOpen} DownloadMovieVideo={downloadMovieVideo} progress={progress} />
                                <div className='container mx-auto min-h-screen px-2 my-6'>
                                    <MovieCasts movie={movie} />
                                    {/* Rate */}
                                    <MovieRate movie={movie} />
                                    {/* Related */}
                                    {
                                        RelatedMovie?.length > 0 &&
                                        <div className='my-16'>
                                            <Title title="Related Movies" Icon={BsCollectionFill} />
                                            <div className='grid mt-6 sm:mt-10 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
                                                {
                                                    RelatedMovie?.map((item) => (
                                                        <Movie key={item._id} movie={item} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    }

                                </div></>
                        )
            }

        </Layout>
    )
}

export default SingleMovie