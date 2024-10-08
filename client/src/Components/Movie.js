import React from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { IfMovieLiked, LikeMovie } from '../Context/Functionalities'
function Movie({ movie }) {
  const { isLoading } = useSelector(state => state.userLikeMovie)
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  // if liked
  const isLiked = (movie) => { return IfMovieLiked(movie) }

  return (
    <div className='border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden'>
      <Link to={`/movie/${movie?._id}`} className='w-full'>
        <img src={movie?.image ? movie?.image : "/images/404.png"} alt={movie?.name} className='w-full h-64 object-cover' />
      </Link>
      <div className='absolute flex-btn gap-2 right-0 left-0 bottom-0 bg-main bg-opacity-60 text-white px-4 py-3'>
        <h3 className='font-semibold truncate'>
          {movie?.name}
        </h3>
        <button
          onClick={() => LikeMovie(movie, dispatch, userInfo)}
          disabled={isLiked(movie) || isLoading}
          className={`
          ${isLiked(movie) ? 'bg-transparent' : ' bg-subMain'}
          h-9 w-9 text-sm flex-cols transitions hover:bg-transparent border-2 border-subMain rounded-md  text-white`}>
          <FaHeart />
        </button>
      </div>
    </div>
  )
}

export default Movie