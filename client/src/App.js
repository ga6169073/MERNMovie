import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import About from './Screens/About'
import NotFound from './Screens/NotFound'
import Contact from './Screens/Contact'
import MoviesPage from './Screens/MoviesPage'
import SingleMovie from './Screens/SingleMovie'
import WatchPage from './Screens/WatchPage'
import Login from './Screens/Login'
import Register from './Screens/Register'
import Profile from './Screens/Dashboard/Profile'
import Aos from 'aos';
import Password from './Screens/Dashboard/Password'
import FavoriteMovies from './Screens/Dashboard/FavoriteMovies'
import MovieList from './Screens/Dashboard/Admin/MovieList'
import Dashboard from './Screens/Dashboard/Admin/Dashboard'
import Categories from './Screens/Dashboard/Admin/Categories'
import Users from './Screens/Dashboard/Admin/Users'
import AddMovie from './Screens/Dashboard/Admin/AddMovie'
import ScrollOnTop from './ScrollOnTop'
import DrawerContext from './Context/DrawerContext'
import ToastNotify from './Components/Notifications/ToastNotify'
import { AdminProtectedRouter, ProtectedRouter } from './ProtectedRouter'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoriesAction } from './Redux/Actions/categoryActions'
import { getAllMoviesAction } from './Redux/Actions/movieActions'
import { getFavoriteMoviesAction } from './Redux/Actions/userActions'
import { toast } from 'react-toastify'
import EditMovie from './Screens/Dashboard/Admin/EditMovie'
function App() {
  Aos.init()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.userLogin)
  const { isError, isSuccess } = useSelector(state => state.userLikeMovie)
  const { isError: categoryError } = useSelector(state => state.categoryGetAll)

  useEffect(() => {
    dispatch(getAllCategoriesAction())
    dispatch(getAllMoviesAction({}))
    if (userInfo) {
      dispatch(getFavoriteMoviesAction())
    }
    if (isError || categoryError) {
      toast.error(isError || categoryError)
      dispatch({ type: "USER_LIKE_MOVIE_RESET" })
    }
    if (isSuccess) {
      dispatch({ type: "USER_LIKE_MOVIE_RESET" })
    }
  }, [dispatch, userInfo, isError, categoryError, isSuccess])
  return (
    <>
      <ToastNotify />
      <DrawerContext>
        <ScrollOnTop >
          <Routes>
            {/* Public routers */}
            <Route path='/' element={<HomeScreen />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/movies' element={<MoviesPage />}></Route>
            <Route path='/movies/:search' element={<MoviesPage />}></Route>

            <Route path='/movie/:id' element={<SingleMovie />}></Route>
            <Route path='/watch/:id' element={<WatchPage />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='*' element={<NotFound />}></Route>

            {/* Private routers */}
            <Route element={<ProtectedRouter />}>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/password' element={<Password />}></Route>
              <Route path='/favorites' element={<FavoriteMovies />}></Route>

              {/* Admin routers */}
              <Route element={<AdminProtectedRouter />}>
                <Route path='/movielist' element={<MovieList />}></Route>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/categories' element={<Categories />}></Route>
                <Route path='/users' element={<Users />}></Route>
                <Route path='/addMovie' element={<AddMovie />}></Route>
                <Route path='/editMovie/:id' element={<EditMovie />}></Route>

              </Route>
            </Route>



          </Routes>
        </ScrollOnTop>
      </DrawerContext>
    </>
  )
}

export default App