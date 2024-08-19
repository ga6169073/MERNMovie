import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import Banner from '../Components/Home/Banner'
import PopularMovies from '../Components/Home/PopularMovies'
import Promos from '../Components/Home/Promos'
import TopRated from '../Components/Home/TopRated'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMoviesAction, getRandomMoviesAction, getTopRatedMoviesAction } from '../Redux/Actions/movieActions'
import { toast } from 'react-toastify'
function HomeScreen() {
  const dispatch = useDispatch()
  //useSelector 
  const { isLoading: randomLoading, isError: randomError, movies: randomMovies } = useSelector(
    state => state.movieGetRandom
  )
  const { isLoading: topLoading, isError: topError, movies: topMovies } = useSelector(
    state => state.movieGetTopRated
  )
  const { isLoading, isError, movies } = useSelector(
    state => state.movieGetAll
  )

  //useEffect
  useEffect(() => {
    //get random movies
    dispatch(getRandomMoviesAction())
    //get top movies
    dispatch(getTopRatedMoviesAction())
    //get all movies
    dispatch(getAllMoviesAction({}))
    //errors 
    if(isError||randomError||topError){
      toast.error(isError||randomError||topError)
    }
  }, [dispatch, isError, randomError, topError])
  return (
    <Layout>
      <div className='container mx-auto px-2 mb-6 min-h-screen'>
        <Banner movies={movies} isLoading={isLoading}/>
        <PopularMovies movies={randomMovies} isLoading={randomLoading}/>
        <Promos />
        <TopRated movies={topMovies} isLoading={topLoading} />
      </div>
    </Layout>
  )
}

export default HomeScreen