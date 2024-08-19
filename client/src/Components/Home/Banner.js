import React from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import FlexMovieItems from '../FlexMovieItems';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import Loader from "../Notifications/Loader";
import { Ri24HoursLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { IfMovieLiked, LikeMovie } from '../../Context/Functionalities';
const SwiperComp = ({ sameClass, movies }) => {
    const { isLoading } = useSelector(state => state.userLikeMovie)
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userLogin)
    // if liked
    const isLiked = (movie) => {
        return IfMovieLiked(movie)
    }

    return (
        <Swiper
            direction='horizontal'
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={1000}
            modules={[Autoplay]}
            className={sameClass}
        >
            {
                movies?.slice(0, 6).map((movie, index) => (
                    <SwiperSlide key={index} className='overflow-hidden rounded relative'>
                        {/* fix the image src when deploy */}
                        <img src={movie?.image ? movie?.image : "/images/404.png"}
                            alt={movie?.name} className='w-full h-full object-cover' />
                        <div className='absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4'>
                            <h1 className='text-xl lg:text-2xl xl:text-4xl truncate capitalize font-sans font-bold'>
                                {movie?.name}
                            </h1>
                            <div className='flex gap-5 items-center text-dryGray'>
                                <FlexMovieItems movie={movie} />
                            </div>
                            <div className='flex gap-5 items-center'>
                                <Link to={`/movie/${movie?._id}`} className='bg-subMain hover:text-main transitions text-white px-8 py-2.5 rounded font-medium text-sm sm:text-sm '>
                                    Watch
                                </Link>
                                <button
                                    onClick={() => LikeMovie(movie, dispatch, userInfo)}
                                    disabled={isLiked(movie) || isLoading}
                                    className={`bg-white hover:text-subMain transitions px-4 py-3 rounded text-sm bg-opacity-30
                                    ${isLiked(movie) ? 'text-subMain' : 'text-white'}
                                    `}>
                                    <FaHeart />
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}
function Banner({ movies, isLoading }) {
    const sameClass = "w-full flex-cols xl:h-96 bg-dry lg:h-64 h-48"
    return (
        <div className='w-full relative'>
            {isLoading ?
                <div className={sameClass}>
                    <Loader />
                </div>
                :
                movies?.length > 0 ?
                    <SwiperComp sameClass={sameClass} movies={movies} />
                    : (
                        <div className={sameClass}>
                            <div className="flex-cols w-24 h-24 p-5 mb-5 rounded-full bg-dry text-subMain text-4xl">
                                <Ri24HoursLine />
                            </div>
                            <p className='text-border text-sm'>
                                No movies available at the moment
                            </p>
                        </div>
                    )
            }
        </div>
    )
}

export default Banner