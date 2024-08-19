import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { likeMovieAction } from "../Redux/Actions/userActions";
import Axios from "../Redux/APIs/Axios";
import { IoMdCloudDownload } from 'react-icons/io'
// check if movie is added to favorites
const IfMovieLiked = (movie) => {
    const { favoriteMovies } = useSelector(state => state.userGetFavoriteMovies)
    return favoriteMovies?.find((likedMovie) => likedMovie?._id === movie?._id)
}

//like movie functionality
const LikeMovie = (movie, dispatch, userInfo) => {
    return !userInfo
        ?
        toast.error("Please login to add to favorites")
        : dispatch(likeMovieAction(
            { movieId: movie._id }))
}

// download video url functionality
const DownloadVideo = async (videoUrl, setProgress, toastId) => {
    try {
        const { data } = await Axios({
            url: videoUrl,
            method: 'GET',
            responseType: "blob",
            onDownloadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent
                let percent = Math.floor((loaded * 100) / total)
                setProgress(percent)
                if (percent > 0 && percent < 100) {
                    // check if we already displayed a toast
                    if (toastId.current === null) {
                        toastId.current = toast.loading(`Downloading...`, {
                            toastId: "download",
                            autoClose: false,
                            style: {
                                backgroundColor: "#0B0F25",
                                color: "#fff",
                                borderRadius: "10px",
                                border: "2px solid #F20000"
                            },
                            icon: <IoMdCloudDownload className="text-2xl mr-2 text-subMain" />
                        })
                    }
                    else {
                        toast.update(toastId.current, { render: `Downloading... ${percent}%` });
                    }

                }

            }
        })
        toast.done(toastId.current)
        console.log("done")
        return data
    } catch (error) {
        toast.error(error)
    }
}
// toast.loading(`Downloading... ${percent}%`, {
//     toastId: "download",
//     duration: 100000000,
//     style: {
//         backgroundColor: "#0B0F25",
//         color: "#fff",
//         borderRadius: "10px",
//         border: "5px solid #F20000"
//     },
//     icon: <IoMdCloudDownload className="text-2xl mr-2 text-subMain" />
// })
export { IfMovieLiked, LikeMovie, DownloadVideo }