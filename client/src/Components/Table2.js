import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { dateFormater, shortUppercaseId } from './Notifications/Empty'

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase"
const Text = "text-sm text-left px-5 py-3 leading-6 whitespace-nowrap"
const Rows = ({ data, users, onEditFunction, onDeleteFunction }) => {
    return (
        <tr>
            {/* users */}
            {
                users ? (
                    <>
                        <td className={`${Text}`}>
                            <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                                <img src={`${data?.image ? data.image : "/images/user.png"}`} alt={data?.fullName} className='w-full h-full rounded-full object-cover' />

                            </div>
                        </td>
                        <td className={`${Text}`}>{data?._id ? shortUppercaseId(data._id) : "2TJHDJ"}</td>
                        <td className={`${Text}`}>{dateFormater(data?.createdAt)}</td>
                        <td className={`${Text}`}>{data?.fullName}</td>
                        <td className={`${Text}`}>{data?.email}</td>
                        <td className={`${Text}`}>{data?.isAdmin ? "Admin" : "User"}</td>

                        <td className={`${Text}`}>
                            <div className=' flex-rows gap-2 float-right'>
                                {
                                    !data?.isAdmin &&
                                    (
                                        <button onClick={() => onDeleteFunction(data?._id)}
                                            className=" bg-subMain text-white rounded flex-cols w-6 h-6">
                                            <MdDelete />
                                        </button>
                                    )
                                }

                            </div>
                        </td>
                    </>
                ) : (
                    // Categories
                    <>
                        <td className={`${Text} font-bold`}>{data?._id ? shortUppercaseId(data._id) : "2TJHDJ"}</td>
                        <td className={`${Text}`}>{dateFormater(data?.createdAt)}</td>
                        <td className={`${Text}`}>{data?.title}</td>
                        <td className={`${Text}`}>
                            <div className=' flex-rows gap-2 float-right'>
                                <button onClick={() => onEditFunction(data)} className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
                                    Edit <FaEdit className='text-green-500' />
                                </button>
                                <button onClick={() => onDeleteFunction(data?._id)} className=" bg-subMain text-white rounded flex-cols w-6 h-6">
                                    <MdDelete />
                                </button>
                            </div>
                        </td>
                    </>
                )

            }
        </tr>
    )
}
function Table2({ data, users, onEditFunction, onDeleteFunction }) {

    return (
        <div className='overflow-x-scroll overflow-hidden relative w-full'>
            <table className='w-full table-auto border-border border divide-y divide-border'>
                <thead>
                    <tr className='bg-dryGray'>
                        {
                            users ? (
                                <>
                                    <th scope='col' className={`${Head}`}>
                                        Image
                                    </th>
                                    <th scope='col' className={`${Head}`}>
                                        Id
                                    </th>
                                    <th scope='col' className={`${Head}`}>
                                        Date
                                    </th>
                                    <th scope='col' className={`${Head}`}>
                                        Full Name
                                    </th>
                                    <th scope='col' className={`${Head}`}>
                                        Email
                                    </th>
                                    <th scope='col' className={`${Head}`}>
                                        Role
                                    </th>
                                </>
                            ) : (
                                <>
                                    <th scope='col' className={`${Head}`}>
                                        Id
                                    </th>
                                    <th scope='col' className={`${Head}`}>
                                        Date
                                    </th>
                                    <th scope='col' className={`${Head}`}>
                                        Name
                                    </th>
                                </>
                            )
                        }
                        <th scope='col' className={`${Head} text-end`}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-main divide-y divide-gray-800'>
                    {data.map((movie, index) => (
                        <Rows key={index} data={movie} index={index} users={users} onEditFunction={onEditFunction} onDeleteFunction={onDeleteFunction} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table2