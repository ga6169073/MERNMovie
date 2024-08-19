import React from 'react'
import MainDrawer from './MainDrawer'
import { Link, NavLink } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'
import { BsCollectionPlay } from 'react-icons/bs'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { BiLogoGmail, BiPhoneCall } from 'react-icons/bi'
import { FaFacebook, FaGithub, FaMedium } from 'react-icons/fa'

function MenuDrawer({ drawerOpen, toggleDrawer }) {
    const Links = [
        {
            name: "Movies",
            link: "/movies",
            icon: BsCollectionPlay
        },
        {
            name: "About",
            link: "/about",
            icon: HiOutlineUserGroup
        },
        {
            name: "Contact",
            link: "/contact",
            icon: BiPhoneCall
        }
    ]
    const active = 'bg-dry text-subMain'
    const hover = " hover:bg-dry"
    const inActive = 'rounded sm:gap-10  font-medium text-sm transitions flex gap-3 items-center sm:px-8 px-4 py-4 items-center'
    const Hover = ({ isActive }) => (
        isActive ? `${active} ${inActive}` : `${inActive} ${hover}`
    )

    const LinkData = [
        {
            icon: FaFacebook,
            link: "https://www.facebook.com/",
        },
        {
            icon: FaMedium,
            link: "https://medium.com/",
        },
        {
            icon: FaGithub,
            link: "https://github.com/",
        },
        {
            icon: BiLogoGmail,
            link: "https://mail.google.com/",
        }
    ]
    return (
        <MainDrawer drawerOpen={drawerOpen} closeDrawer={toggleDrawer}>
            <div className='flex flex-col w-full h-full justify-between items-center bg-main text-white rounded'>
                <div className='w-full flex-btn h-16 px-6 py-4  bg-dry'>
                    <Link to="/" onClick={toggleDrawer}  >
                        <img src='/images/logo.png' alt='logo' className='w-28 h-28 object-contain' />
                    </Link>
                    <button onClick={toggleDrawer} type='button'
                        className='transitions flex-cols w-10 h-10 text-base  text-subMain bg-white rounded-full hover:bg-subMain hover:text-white '>
                        <IoClose />
                    </button>
                </div>
                {/* links */}
                <div className='w-full overflow-y-scroll flex-grow max-h-full'>
                    <div className='pb-12 pt-4'>
                        {
                            Links.map((link, index) => (
                                <NavLink to={link.link} key={index} onClick={toggleDrawer} className={Hover}>
                                    <link.icon className='text-lg' /> {link.name}
                                </NavLink>
                            ))
                        }
                    </div>

                    <div className='flex-rows gap-6 w-full'>
                        {LinkData.map((link, index) => (
                            <a href={link.link} key={index} target='_blank' rel='noreferrer'
                                className='flex-cols w-12 h-12 transitions hover:bg-subMain text-lg bg-white rounded bg-opacity-30'>
                                <link.icon />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </MainDrawer>
    )
}

export default MenuDrawer