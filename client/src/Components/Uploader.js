import React, { useCallback, useState } from 'react'
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from 'react-icons/fi'
import Loader from './Notifications/Loader'
import { uploadImageService } from '../Redux/APIs/imageUploadService'
function Uploader({ setImageUrl}) {
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0);
    // upload image
    const onDrop = useCallback(
        async (acceptedFiles) => {
            const file = new FormData()
            file.append("file", acceptedFiles[0])
            // setImageUrl(acceptedFiles[0])
            const data = await uploadImageService(file, setLoading, setProgress )
            setImageUrl(data)
            // console.log(data)
        }, [setImageUrl]
    )
    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone(
        {
            multiple: false,
            accept: {
                'image/*': ['.jpeg', '.jpg', '.png'],
                'video/*': ['.mp4', '.mkv', '.avi']
            },
            onDrop
        }
    )
    return (
        <div className='w-full flex-cols gap-6 text-center'>
            {
                loading ? (
                    <div className='px-6 w-full py-8 border-2 border-border border-dashed rounded-md bg-dry'>
                        <Loader />
                        <div>Upload Progress: {progress}%</div>
                    </div>
                ) : (
                    <div {...getRootProps()} className='w-full px-6 py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer'>
                        <input {...getInputProps()} />
                        <span className='flex-cols mx-auto text-subMain text-3xl' >
                            <FiUploadCloud />
                        </span>
                        <p className='text-sm mt-2'>
                            Choose your image or drag it here
                        </p>
                        <em className='text-xs text-border'>
                            {isDragActive ? "Drop the files here ..."
                                : isDragReject ? "Unsupported file type... "
                                    : "Only *.jpeg, *.png, *.jpg files are allowed"}

                        </em>
                    </div>
                )
            }

        </div>
    )
}

export default Uploader