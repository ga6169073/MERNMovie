import React, { useContext, useEffect, useRef, useState } from 'react'
import Layout from "../Layout/Layout"
import { Link, useParams } from 'react-router-dom'

import { BiArrowBack } from 'react-icons/bi'
import { FaCloudDownloadAlt, FaHeart, FaPlay } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieByIdAction } from '../Redux/Actions/movieActions'
import Loader from '../Components/Notifications/Loader'
import { RiMovie2Line } from 'react-icons/ri'
import { DownloadVideo, IfMovieLiked, LikeMovie } from '../Context/Functionalities'
import FileSaver from 'file-saver'
import { SidebarContext } from '../Context/DrawerContext'
function WatchPage() {
    let { id } = useParams()
    const dispatch = useDispatch()
    const [play, setPlay] = useState(false)
    const sameClass = "w-full gap-6 flex-cols min-h-screen"
    // useSelector
    const { isLoading, isError, movie } = useSelector(state => state.movieGetById)
    //useEffect
    useEffect(() => {
        // get movie by id
        dispatch(getMovieByIdAction(id))
    }, [dispatch, id])

    const { isLoading: likeLoading } = useSelector(state => state.userLikeMovie)
    const { userInfo } = useSelector(state => state.userLogin)
    // if liked
    const isLiked = (movie) => IfMovieLiked(movie)

    const toastId = useRef(null)
    const { progress, setProgress } = useContext(SidebarContext)
    // download video movie
    const downloadMovieVideo = async (videoUrl, name) => {
        await DownloadVideo(videoUrl, setProgress, toastId).then((data) => {
            setProgress(0)
            FileSaver.saveAs(data, name)
        })
    }
    return (
        <Layout>
            <div className='container mx-auto bg-dry p-6 mb-12'>
                {
                    !isError && (
                        <div className='flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6'>
                            <Link to={`/movie/${movie?._id}`} className='md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray'>
                                <BiArrowBack />
                                {movie?.name}
                            </Link>
                            <div className='flex-btn sm:w-auto w-full gap-5'>
                                <button
                                    onClick={() => LikeMovie(movie, dispatch, userInfo)}
                                    disabled={isLiked(movie) || likeLoading}
                                    className={`bg-white hover:text-subMain
                                    ${isLiked(movie) ? 'text-subMain' : 'text-white'}
                                    transitions bg-opacity-30 rounded px-4 py-3 text-sm`}>
                                    <FaHeart />
                                </button>
                                <button
                                    disabled={progress>0 && progress<100} 
                                    onClick={() => downloadMovieVideo(movie?.video, movie?.name)}
                                    className='flex-rows gap-2 bg-subMain hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm'>
                                    <FaCloudDownloadAlt /> Download
                                </button>
                            </div>
                        </div>
                    )
                }


                {/* watch */}
                {
                    play ? (
                        <video controls autoPlay={play} className='w-full h-full rounded'>
                            <source src={movie?.video} type='video/mp4' title={movie?.name} />
                        </video>
                    ) : (
                        <div className='w-full h-full rounded-lg overflow-hidden relative'>
                            {
                                isLoading ? (
                                    <div className={sameClass}>
                                        <Loader />
                                    </div>
                                ) :
                                    isError ? (
                                        <div className={sameClass}>
                                            <div className="flex-cols w-24 h-24 p-5 mb-5 rounded-full bg-dry text-subMain text-4xl">
                                                <RiMovie2Line />
                                            </div>
                                            <p className='text-border text-sm'>
                                                Movie not found
                                            </p>
                                        </div>

                                    )
                                        :
                                        (
                                            <>
                                                <div className='absolute top-0 right-0 bottom-0 left-0 bg-opacity-30 bg-main flex-cols'>
                                                    <button
                                                        onClick={() => setPlay(true)} className='bg-white text-subMain hover:opacity-70 flex-cols border border-subMain rounded-full w-20 h-20 font-medium text-xl'>
                                                        <FaPlay />
                                                    </button>
                                                </div>
                                                <img src={movie?.image ? movie?.image : '/images/user.png'} alt={movie?.name} className='w-full h-full rounded-lg object-cover' />
                                            </>
                                        )
                            }

                        </div>
                    )
                }
            </div>
        </Layout>
    )
}

export default WatchPage