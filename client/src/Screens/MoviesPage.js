import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../Layout/Layout'
import Filters from '../Components/Filters'
import Movie from '../Components/Movie'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllMoviesAction } from '../Redux/Actions/movieActions'
import Loader from '../Components/Notifications/Loader'
import { RiMovie2Line } from 'react-icons/ri'
import { TbPlayerTrackNext, TbPlayerTrackPrev } from 'react-icons/tb'
import { LanguageData, RateData, TimeData, YearData } from '../Data/FiltersData'
import { useParams } from 'react-router-dom'
function MoviesPage() {
  // const maxPage = 5
  // const [page, setPage] = useState(maxPage)
  // const HandleLoadingMoreMovies = () => {
  //   setPage(page + maxPage)
  // }
  const { search } = useParams()
  const dispatch = useDispatch()
  const [category, setCategory] = useState({ title: "All Categories" })
  const [year, setYear] = useState(YearData[0])
  const [time, setTime] = useState(TimeData[0])
  const [rate, setRate] = useState(RateData[0])
  const [language, setLanguage] = useState(LanguageData[0])

  const sameClass = "text-white py-2 px-4 rounded font-semibold border-subMain border-2 hover:bg-subMain"
  //all movies 
  const { isLoading, isError, movies, pages, page } = useSelector((state) => state.movieGetAll)

  //get all categories
  const { categories } = useSelector(state => state.categoryGetAll)

  // query
  const queries = useMemo(() => {
    const query = {
      category: category?.title === "All Categories" ? "" : category?.title,
      year: year?.title === "Sort By Year" ? "" : year?.title.replace(/\D/g, ""), //year?.title.replace(/\D/g, "")
      time: time?.title === "Sort By Time" ? "" : time?.title.replace(/\D/g, ""),
      rate: rate?.title === "Sort By Rate" ? "" : rate?.title.replace(/\D/g, ""),
      language: language?.title === "Sort By Language" ? "" : language?.title,
      search: search ? search : ""
    }
    return query
  },
    // eslint-disable-next-line
    [category, year, time, rate, language, search])

  //useEffect
  useEffect(() => {
    //error
    if (isError) {
      toast.error(isError)
    }
    // // get all movies
    dispatch(getAllMoviesAction(queries))
  }, [isError, queries, dispatch])

  // pagination 
  const nextPage = () => {
    dispatch(getAllMoviesAction({ ...queries, pageNumber: page + 1 }))
  }
  const prevPage = () => {
    dispatch(getAllMoviesAction({ ...queries, pageNumber: page - 1 }))
  }
  const data = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    year: year,
    setYear: setYear,
    time: time,
    setTime: setTime,
    rate: rate,
    setRate: setRate,
    language: language,
    setLanguage: setLanguage
  }

  return (
    <Layout>
      <div className='min-h-screen container mx-auto px-2 my-6'>
        <Filters data={data} />
        <p className='text-lg font-medium my-6 '>
          Total <span className='font-bold text-subMain'>{movies ? movies?.length : 0}</span>
          {' '} items found
          {search && ` for "${search}"`}
        </p>
        {
          isLoading ? (
            <div className="w-full gap-6 flex-cols min-h-screen">
              <Loader />
            </div>
          ) :
            movies?.length > 0 ? (
              <>
                <div className='grid mt-6 sm:mt-10 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
                  {
                    movies.map((item, index) => (
                      <Movie key={index} movie={item} />
                    ))
                  }
                </div>
                {/* Loading more movies */}
                <div className='w-full flex-rows my-10 md:my-20 gap-6'>
                  {/* <button onClick={HandleLoadingMoreMovies} className='flex-rows gap-3 text-whtie py-3 px-8 rounded font-semibold border-subMain border-2'>
            Loading More <CgSpinner className='animate-spin' />
          </button> */}
                  <button onClick={prevPage} disabled={page === 1} className={sameClass}>
                    <TbPlayerTrackPrev className="text-xl" />
                  </button>
                  <button onClick={nextPage} disabled={page === pages} className={sameClass}>
                    <TbPlayerTrackNext className="text-xl" />
                  </button>
                </div>
              </>
            )
              : (
                <div className="w-full gap-6 flex-cols min-h-screen">
                  <div className='w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-cols'>
                    <RiMovie2Line />
                  </div>
                  <p className='text-border text-sms'>
                    We don't have any movie
                  </p>
                </div>
              )
        }

      </div>
    </Layout>
  )
}

export default MoviesPage