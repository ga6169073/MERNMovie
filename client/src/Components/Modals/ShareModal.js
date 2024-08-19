import React from 'react'
import MainModal from './MainModal'
import { FaFacebook, FaFacebookMessenger, FaPinterest, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { FacebookShareButton, TwitterShareButton, FacebookMessengerShareButton, TelegramShareButton, WhatsappShareButton, PinterestShareButton, EmailShareButton } from 'react-share'
function ShareModal({ modalOpen, setModalOpen, movie }) {
    const shareData = [
        {
            icon: FaFacebook,
            shareButton: FacebookShareButton,
        },
        {
            icon: FaTwitter,
            shareButton: TwitterShareButton,
        },
        {
            icon: FaFacebookMessenger,
            shareButton: FacebookMessengerShareButton,
        },
        {
            icon: FaTelegram,
            shareButton: TelegramShareButton,
        },
        {
            icon: FaWhatsapp,
            shareButton: WhatsappShareButton,
        },
        {
            icon: FaPinterest,
            shareButton: PinterestShareButton,
        },
        {
            icon: MdEmail,
            shareButton: EmailShareButton,
        }
    ]
    const url = `${window.location.protocol}//${window.location.host}/movie/${movie?._id}`;
    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className='inline-block  w-full align-middle border border-border text-white p-10 h-full bg-main overflow-y-auto rounded-2xl'>
                <h2 className='text-2xl font-bold'>
                    Share <span className='text-xl font-bold'>"{movie?.name}"</span>
                </h2>
                <form className='flex-rows flex-wrap gap-6 mt-6'>
                    {
                        shareData.map((data, index) => (
                            <data.shareButton key={index} url={url} quote="FilmFlix | Free Movies Site" >
                                <div className='w-12 transitions hover:bg-subMain flex-cols text-lg h-12 bg-white bg-opacity-30 rounded'>
                                    <data.icon />
                                </div>
                            </data.shareButton>
                        ))
                    }
                </form>
            </div>
        </MainModal>
    )
}

export default ShareModal