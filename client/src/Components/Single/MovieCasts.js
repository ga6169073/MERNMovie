import React from 'react'
import Title from '../Title'
import { FaUserFriends } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

function MovieCasts({ movie }) {
    // console.log(movie)
    return (
        movie?.casts?.length > 0 && (
            <div className='my-12'>
                <Title title="Casts" Icon={FaUserFriends} />
                <div className='mt-10'>
                    <Swiper autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }} spaceBetween={10}
                        // loop={true} 
                        speed={1000} modules={[Autoplay]}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            400: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {
                            movie?.casts?.map((cast) => (
                                <SwiperSlide key={cast?._id}>
                                    <div className='w-full p-3 italic text-xs text-text rounded flex-cols bg-dry border border-gray-800'>
                                        <img src={cast?.image ? cast?.image : "/images/404.png"} alt={cast?.name} className='w-full h-64 object-cover rounded mb-4' />
                                        <p>{cast?.name}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        )

    )
}

export default MovieCasts