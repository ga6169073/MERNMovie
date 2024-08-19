import React, {  useState } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom"
import { FaSearch, FaUser, FaHeart } from "react-icons/fa"
import { useSelector } from 'react-redux'
function Navbar() {
    const { userInfo } = useSelector(state => state.userLogin)
    const {
        favoriteMovies
    } = useSelector(state => state.userGetFavoriteMovies)

    const hover = "hover:text-subMain transitions text-white"
    const Hover = ({ isActive }) => (
        isActive ? 'text-subMain' : hover)

    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const handleSearch = (e) => {
        e.preventDefault()
        if(search.trim()){
            navigate(`/movies/${search}`)
            setSearch(search)
        }
        else {
            navigate(`/movies`)
        }
    }
    return (
        <>
            <div className='bg-main shadow-md sticky top-0 z-20'>
                <div className='container mx-auto py-6 px-4 lg:grid gap-10 grid-cols-7 justify-between items-center'>
                    <div className='col-span-1 lg:block hidden'>
                        <Link to="/">
                            <img src='/images/logo.png' alt='logo' className='w-full h-12 object-contain' />
                        </Link>
                    </div>
                    {/* Search bar */}
                    <div className='col-span-3'>
                        <form onSubmit={handleSearch} className='w-full text-sm bg-dryGray rounded flex-btn gap-4'>
                            <button type='submit' className='bg-subMain w-12 flex-cols h-12 rounded text-white'>
                                <FaSearch />
                            </button>
                            <input type="search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search Movies" className='font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black' />
                        </form>
                    </div>
                    {/* menu */}
                    <div className='col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center'>
                        <NavLink to="/movies" className={Hover}>
                            Home
                        </NavLink>
                        <NavLink to="/about" className={Hover}>
                            About
                        </NavLink>
                        <NavLink to="/contact" className={Hover}>
                            Contact
                        </NavLink>
                        <NavLink to={userInfo?.isAdmin ? "/dashboard" : userInfo ? "/profile" : "/login"} className={Hover}>
                            {
                                userInfo ? (
                                    <img src={userInfo?.image ? userInfo?.image : "/images/user.png"} alt={userInfo?.fullName} className='w-8 h-8 rounded-full border object-cover border-subMain' />
                                ) :
                                    <FaUser className='w-8 h-8' />
                            }
                        </NavLink>
                        <NavLink to="/favorites" className={`${Hover} relative`}>
                            <FaHeart className="w-6 h-6" />
                            <div className='w-5 h-5 flex-cols rounded-full text-xs bg-subMain text-white absolute -top-5 -right-2'>
                                {
                                    favoriteMovies?.length > 0 ? favoriteMovies?.length : 0
                                }
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar