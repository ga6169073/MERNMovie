import React, { useContext } from 'react'
import { BsCollectionPlay } from 'react-icons/bs'
import { CgMenuBoxed } from 'react-icons/cg'
import { FiHeart, FiUserCheck } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import MenuDrawer from '../../Components/Drawer/MenuDrawer'
import { SidebarContext } from '../../Context/DrawerContext'
import { useSelector } from 'react-redux'

function MobileFooter() {
    const { mobileDrawer, toggleDrawer } = useContext(SidebarContext)
    const { favoriteMovies } = useSelector(state => state.userGetFavoriteMovies)
    const { userInfo } = useSelector(state => state.userLogin)
    const active = "transitions text-2xl flex-cols hover:bg-white hover:text-main rounded-md px-4 py-3 bg-white text-main"
    const inActive = "transitions text-2xl  flex-cols hover:bg-white hover:text-main text-white rounded-md px-4 py-3 "
    const Hover = ({ isActive }) => (
        isActive ? active : inActive

    )
    return (
        <>
            <div className='flex flex-col h-full justify-between align-middle bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full '>
                {/* Drawer */}
                <MenuDrawer drawerOpen={mobileDrawer} toggleDrawer={toggleDrawer} />
            </div>
            <footer className='lg:hidden fixed z-50 bottom-0 w-full px-1'>
                <div className='bg-dry rounded-md flex-btn w-full p-1'>
                    <NavLink to="/movies" className={Hover} >
                        <BsCollectionPlay />
                    </NavLink>
                    <NavLink to="/favorites" className={Hover}>
                        <div className='relative'>
                            <div className='w-5 h-5 flex-cols rounded-full text-xs bg-subMain text-white absolute -top-5 -right-2'>
                                {favoriteMovies?.length > 0 ? favoriteMovies?.length : 0}
                            </div>
                            <FiHeart className="w-6 h-6" />
                        </div>
                    </NavLink>
                    <NavLink to={userInfo ? userInfo?.isAdmin ? "/dashboard" : "/profile" : "/login"}
                        className={Hover}
                    >
                        <FiUserCheck className='w-6 h-6' />
                    </NavLink>
                    <button onClick={toggleDrawer} className={inActive}>
                        <CgMenuBoxed className='w-6 h-6' />
                    </button>
                </div>
            </footer>
        </>
    )
}

export default MobileFooter
