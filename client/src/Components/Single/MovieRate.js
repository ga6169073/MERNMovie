import React, { useEffect } from 'react'
import Title from '../Title'
import { BsBookmarkStarFill } from 'react-icons/bs'
import { Message, Select } from '../UserInputs'
import Rating from '../Rating';
import { Empty } from "../Notifications/Empty"
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReviewValidation } from '../Validation/MovieValidation';
import { toast } from 'react-toastify';
import { InlineError } from '../Notifications/Error';
import { Link } from 'react-router-dom';
import { reviewMovieAction } from '../../Redux/Actions/movieActions';
const Ratings = [
  {
    title: "0 - Poor",
    value: 0,
  },
  {
    title: "1 - Fair",
    value: 1,
  },
  {
    title: "2 - Good",
    value: 2,
  },
  {
    title: "3 - Insane",
    value: 3,
  },
  {
    title: "4 - Excellent",
    value: 4,
  },
  {
    title: "5 - Masterpiece",
    value: 5,
  },
]
function MovieRate({ movie }) {
  const dispatch = useDispatch()
  //useSelector
  const { isLoading, isError } = useSelector((state) => state.userReviewMovie)
  const { userInfo } = useSelector((state) => state.userLogin)

  // validate review
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ReviewValidation)
  })

  // on handleSubmit
  const onSubmit = (data) => {
    dispatch(reviewMovieAction({
      id: movie?._id,
      review: data 
    }))

  }

  useEffect(() => {
    if (isError) {
      toast.error(isError)
      dispatch({ type: "USER_CREATE_REVIEW_MOVIE_RESET" })
    }
  }, [isError, dispatch])
  return (
    <div className='my-12'>
      <Title title="Reviews" Icon={BsBookmarkStarFill} />
      <div className='mt-10 xl:grid flex-cols grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded'>
        {/* Write review */}
        <form onSubmit={handleSubmit(onSubmit)} className='xl:col-span-2 w-full flex flex-col gap-8'>
          <h3 className='text-xl text-text font-semibold'>
            Review "{movie?.name}"
          </h3>
          <p className='text-sm leading-7 font-medium text-border'>
            Write a review for the movies.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, sit amet, accus consectetur adipiscing elit.
          </p>
          <div className='text-sm w-full '>
            <Select label="Select Rating"
              options={Ratings}
              name="rating"
              register={{ ...register("rating") }}
            />
            <div className='flex mt-4 text-lg gap-2 text-star'>
              <Rating value={watch("rating", false)} />
            </div>
            {
              errors.rating && <InlineError text={errors.rating.message} />
            }
          </div>
          {/* message */}
          <div className='w-full'>
            <Message name="comment" register={{ ...register("comment") }}
              label="Message" placeholder={"Write your review here"} />
            {
              errors.comment &&
              <InlineError text={errors.comment.message} />
            }
          </div>
          {/* submit */}
          {
            userInfo ? (
              <button disabled={isLoading}
                type='submit' className='bg-subMain text-white py-4 w-full flex-cols rounded'>
                {
                  isLoading ? "Loading..." : "Submit"
                }
              </button>
            ) : (
              <Link to="/login"
                className='bg-main border border-dashed border-border text-subMain py-4 w-full flex-cols rounded'>
                Login to review this movie
              </Link>
            )
          }

        </form>
        {/* Reviewers */}
        <div className='flex w-full col-span-3 flex-col gap-6'>
          <h3 className='text-xl text-text font-semibold'>
            Reviews ({movie?.numberOfReviews})
          </h3>
          <div className='w-full flex flex-col bg-main rounded-lg gap-6 md:p-12 p-6  h-header overflow-y-scroll'>
            {movie?.reviews?.length > 0 ? movie?.reviews.map((review) => (
              <div className='md:grid flex flex-col w-full grid-cols-12 bg-dry gap-6 p-4 border border-gray-800 rounded-lg'>
                <div key={review?._id} className='col-span-2 bg-main hidden md:block'>
                  <img src={review?.userImage ? review?.userImage : "/images/user.png"} alt={review?.userName} className='w-full h-24 rounded-lg object-cover' />
                </div>
                <div className='col-span-7 flex flex-col gap-2'>
                  <h2>{review?.userName}</h2>
                  <p className='text-xs leading-6 font-medium text-text'>
                    {review?.comment}
                  </p>
                </div>
                {/* rate */}
                <div className='col-span-3 flex-rows border-l border-border text-xs gap-1 text-star'>
                  <Rating value={review?.rating} />
                </div>
              </div>
            ))
              :
              <Empty message={`Be the first to rate "${movie?.name}"`} />
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieRate