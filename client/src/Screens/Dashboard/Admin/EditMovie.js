import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { Input, Message, Select } from '../../../Components/UserInputs'
import Uploader from '../../../Components/Uploader'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { ImUpload } from 'react-icons/im'
import CastModal from '../../../Components/Modals/CastModal'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { movieValidation } from '../../../Components/Validation/MovieValidation'
import { deleteCastAction, getMovieByIdAction, updateMovieAction } from '../../../Redux/Actions/movieActions'
import { toast } from 'react-toastify'
import { InlineError } from '../../../Components/Notifications/Error'
import { ImagePreview } from '../../../Components/ImagePreview'
import Loader from '../../../Components/Notifications/Loader'
import { RiMovie2Line } from 'react-icons/ri'

function EditMovie() {
    const sameClass = "w-full gap-6 flex-cols min-h-screen"
    const [modalOpen, setModalOpen] = useState(false)
    const [cast, setCast] = useState(null)
    const [imageWithoutTitle, setImageWithoutTitle] = useState("")
    const [imageTitle, setImageTitle] = useState("")
    const [videoUrl, setVideoUrl] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    //selectors
    const { categories } = useSelector(state => state.categoryGetAll)
    const { isLoading, isError, movie } = useSelector(state => state.movieGetById)
    const { isLoading: editLoading, isError: editError, isSuccess: editSuccess } = useSelector(state => state.adminUpdateMovie)

    const { casts } = useSelector(state => state.adminMovieCastsCRUD)

    // validate user 
    const {
        register,
        handleSubmit,
        // reset,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(movieValidation)
    })

    // on handleSubmit
    const onSubmit = (data) => {
        dispatch(updateMovieAction(movie?._id, {
            ...data,
            image: imageWithoutTitle,
            titleImage: imageTitle,
            video: videoUrl,
            casts: casts?.length > 0 ? casts : movie?.casts,
        }))
    }

    //delete cast handler
    const deleteCastHandler = (id) => {
        dispatch(deleteCastAction(id))
        toast.success("Cast deleted successfully")

    }
    // useEffect(() => {
    //     dispatch({ type: "ADMIN_RESET_CAST" })
    // },[])

    useEffect(() => {
        if (movie?._id !== id) {
            dispatch(getMovieByIdAction(id))
        } else {
            setValue("name", movie?.name)
            setValue("time", movie?.time)
            setValue("language", movie?.language)
            setValue("year", movie?.year)
            setValue("category", movie?.category)
            setValue("desc", movie?.desc)
            setImageWithoutTitle(movie?.image)
            setImageTitle(movie?.titleImage)
            setVideoUrl(movie?.video)
            // if (casts?.length < movie?.casts?.length)
            //     dispatch(loadCastAction(movie?.casts))
            // // wrong 
        }
        // if modal open is false, reset cast
        if (modalOpen === false) {
            setCast()
        }

        // if movie created successfully, reset form and navigate to add movie
        if (editSuccess) {
            dispatch({ type: "ADMIN_EDIT_MOVIE_RESET" })
            navigate(`/editMovie/${id}`)
        }
        // if error, show error
        if (editError) {
            toast.error("Something went wrong")
            dispatch({ type: "ADMIN_EDIT_MOVIE_RESET" })
        }
    }, [dispatch, id, movie, editSuccess, editError, modalOpen, navigate, setValue, casts])
    return (
        <SideBar>
            <CastModal modalOpen={modalOpen} setModalOpen={setModalOpen} cast={cast} />
            {
                isLoading||editLoading ?
                    <Loader />
                    :
                    isError ? <div className={sameClass}>

                        <div className="flex-cols w-24 h-24 p-5 mb-5 rounded-full bg-dry text-subMain text-4xl">
                            <RiMovie2Line />
                        </div>
                        <p className='text-border text-sm'>
                            Something went wrong
                        </p>
                    </div>
                        : (
                            <div className='flex flex-col gap-6'>
                                <h2 className='font-bold text-xl'>
                                    Update "{movie?.name}"
                                </h2>
                                <div className='w-full grid md:grid-cols-2 gap-6'>
                                    <div className='w-full'>
                                        <Input label="Movie Title" placeholder="Movie Name" type="text" background={true}
                                            name="name" register={register("name")} />
                                        {
                                            errors.name && <InlineError text={errors.name.message} />
                                        }
                                    </div>
                                    <div className='w-full'>
                                        <Input label="Hours" placeholder="2Hr" type="number" background={true}
                                            name="time" register={register("time")} />
                                        {
                                            errors.time && <InlineError text={errors.time.message} />
                                        }
                                    </div>
                                </div>
                                <div className='w-full grid md:grid-cols-2 gap-6'>
                                    <div className="w-full">
                                        <Input label="Language" placeholder="English" type="text" background={true}
                                            name="language" register={register("language")} />
                                        {
                                            errors.language && <InlineError text={errors.language.message} />
                                        }
                                    </div>
                                    <div className="w-full">
                                        <Input label="Released year" placeholder="2024" type="number" background={true}
                                            name="year" register={register("year")} />
                                        {
                                            errors.year && <InlineError text={errors.year.message} />
                                        }
                                    </div>
                                </div>
                                {/* images */}
                                <div className='w-full grid md:grid-cols-2 gap-6'>
                                    {/* images without title */}
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-border font-semibold text-sm'>
                                            Image without Title
                                        </p>
                                        <Uploader setImageUrl={setImageWithoutTitle} />
                                        <ImagePreview image={imageWithoutTitle} name="imageWithoutTitle" />
                                    </div>
                                    {/* image with title */}
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-border font-semibold text-sm'>
                                            Image with Title
                                        </p>
                                        <Uploader setImageUrl={setImageTitle} />
                                        <ImagePreview image={imageTitle} name="imageTitle" />
                                    </div>
                                </div>

                                {/* desc */}
                                <div className="w-full">
                                    <Message label="Description" placeholder="Movie Description"
                                        name="desc" register={{ ...register("desc") }} />
                                    {
                                        errors.desc && <InlineError text={errors.desc.message} />
                                    }
                                </div>
                                {/* category */}
                                <div className='text-sm w-full'>
                                    <div className="w-full">
                                        <Select label="Movie Category" options={categories?.length > 0 ? categories : []}
                                            name="category" register={{ ...register("category") }}
                                        />
                                        {
                                            errors.category && <InlineError text={errors.category.message} />
                                        }
                                    </div>
                                </div>

                                {/* movie video */}
                                <div className='w-full flex flex-col gap-2'>
                                    <label className='text-border font-semibold text-sm'>
                                        Movie Video
                                    </label>
                                    <div className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}>
                                        {
                                            videoUrl && (
                                                <div className="w-full flex-cols bg-main text-sm text-subMain py-4 border border-border rounded">
                                                    Video Uploaded !!!
                                                </div>
                                            )
                                        }
                                        <Uploader setImageUrl={setVideoUrl} />
                                    </div>
                                </div>
                                {/* casts */}
                                <div className='w-full grid lg:grid-cols-2 gap-6 items-start'>
                                    <div className='w-full'>
                                        <button onClick={() => setModalOpen(true)} className='w-full py-4 bg-main border border-subMain border-dashed text-white rounded'>
                                            Add Cast
                                        </button>
                                        <span className='text-border text-xs'>
                                            Should add again casts
                                        </span>
                                    </div>

                                    <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4'>
                                        {casts?.length > 0 && casts.map((user) => (
                                            <div key={user?.id} className='p-2 italic text-xs text-text rounded flex-cols bg-main border border-border'>
                                                <img src={`${user?.image ? user?.image : "/images/user.png"}`}
                                                    alt={user?.name}
                                                    className='w-full h-24 object-cover rounded mb-2' />
                                                <p>{user?.name}</p>
                                                <div className='flex-rows mt-2 w-full gap-2'>
                                                    <button onClick={() => {
                                                        setCast(user)
                                                        setModalOpen(true)
                                                    }} className='flex-cols w-6 h-6 bg-dry border border-border text-green-500 rounded'>
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteCastHandler(user?.id)}
                                                        className='flex-cols w-6 h-6 bg-dry border border-border text-subMain rounded'>
                                                        <MdDelete />
                                                    </button>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* submit */}
                                <button
                                    disabled={isLoading}
                                    onClick={handleSubmit(onSubmit)}
                                    className='bg-subMain w-full flex-rows gap-6 font-medium  text-white py-4 rounded '>
                                    {
                                        isLoading ? "Updating..." :
                                            <><ImUpload /> Publish</>
                                    }

                                </button>
                            </div>
                        )}
        </SideBar >
    )
}

export default EditMovie