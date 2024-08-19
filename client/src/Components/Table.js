import React from 'react'
import { FaCloudDownloadAlt, FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { GoEye } from 'react-icons/go'
import { Link } from 'react-router-dom'

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase"
const Text = "text-sm text-left px-5 py-3 leading-6 whitespace-nowrap"
const Rows = ((movie, index, admin, onDeleteHandler, downloadMovieVideo, progress) => {
    return (
        <tr key={index}>
            <td className={`${Text}`}>
                <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                    <img src={movie?.image ? movie?.image : "/images/404.png"} alt={movie?.name} className='w-full h-full rounded-full object-cover' />

                </div>
            </td>
            <td className={`${Text} truncate`}>{movie.name}</td>
            <td className={`${Text}`}>{movie.category}</td>
            <td className={`${Text}`}>{movie.language}</td>
            <td className={`${Text}`}>{movie.year}</td>
            <td className={`${Text}`}>{movie.time}</td>
            {/* {flex-rows float-right gap-2 */}
            <td className={`${Text}`}>
                <div className=' flex-rows gap-2 float-right'>
                    {
                        admin ? (
                            <>
                                <Link to={`/editMovie/${movie?._id}`} className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
                                    Edit <FaEdit className='text-green-500' />
                                </Link>
                                <button
                                    onClick={() => onDeleteHandler(movie?._id)}
                                    className=" bg-subMain text-white rounded flex-cols w-6 h-6">
                                    <MdDelete />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                disabled={progress > 0 && progress < 100}
                                onClick={()=>downloadMovieVideo(movie?.video, movie?.name)} className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
                                    Download <FaCloudDownloadAlt className='text-blue-500' />
                                </button>
                                <Link to={`/movie/${movie?._id}`} className="bg-dry border border-border text-white rounded flex-cols w-6 h-6">
                                    <GoEye />
                                </Link>
                            </>
                        )
                    }
                </div>
            </td>

        </tr>
    )
}
)
function Table({ data, admin, onDeleteHandler, downloadMovieVideo, progress }) {

    return (
        <div className='overflow-x-scroll overflow-hidden relative w-full'>
            <table className='w-full table-auto border-border border divide-y divide-border'>
                <thead>
                    <tr className='bg-dryGray'>
                        <th scope='col' className={`${Head}`}>
                            Image
                        </th>
                        <th scope='col' className={`${Head}`}>
                            Name
                        </th>
                        <th scope='col' className={`${Head}`}>
                            Category
                        </th>
                        <th scope='col' className={`${Head}`}>
                            Language
                        </th>
                        <th scope='col' className={`${Head}`}>
                            Year
                        </th>
                        <th scope='col' className={`${Head}`}>
                            Hours
                        </th>
                        <th scope='col' className={`${Head} text-end `} >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-main divide-y divide-gray-800'>
                    {data.map((movie, index) => (
                        Rows(movie, index, admin, onDeleteHandler, downloadMovieVideo, progress)
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table