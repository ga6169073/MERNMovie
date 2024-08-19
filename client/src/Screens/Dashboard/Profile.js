import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import Uploader from '../../Components/Uploader'
import { Input } from '../../Components/UserInputs'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProfileValidation } from '../../Components/Validation/UserValidation'
import { InlineError } from '../../Components/Notifications/Error'
import { ImagePreview } from '../../Components/ImagePreview'
import { deleteProfileAction, updateProfileAction } from '../../Redux/Actions/userActions'
import { toast } from 'react-toastify'

function Profile() {
    const dispatch = useDispatch()

    const { userInfo } = useSelector(
        (state) => state.userLogin
    )
    const { isLoading, isError, isSuccess } = useSelector(
        state => state.userUpdateProfile
    )
    const { isLoading: deleteLoading, isError: deleteError } = useSelector(
        state => state.userDeleteProfile
    )
    const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "")

    // validate user 
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(ProfileValidation)
    })

    // on submit update profile 
    const onSubmit = (data) => {
        // console.log({...data, image: imageUrl})
        dispatch(updateProfileAction({ ...data, image: imageUrl }))
        // console.log(userInfo) 
    }
    // on delete account
    const deleteAccount = () => {
        // dispatch(deleteProfileAction())
        window.confirm("Are you sure you want to delete your account?") &&
            dispatch(deleteProfileAction())
    }
    //useEffect
    useEffect(() => {
        if (userInfo) {
            setValue("fullName", userInfo?.fullName)
            setValue("email", userInfo?.email)
            //setValue("password", userInfo?.password)
        }
        if (isSuccess) {
            dispatch({ type: "USER_UPDATE_PROFILE_RESET" })
        }
        if (isError || deleteError) {
            toast.error(isError || deleteError)
            dispatch({ type: "USER_UPDATE_PROFILE_RESET" })
            dispatch({ type: "USER_DELETE_PROFILE_RESET" })

        }
    }, [userInfo, setValue, isSuccess, isError, deleteError, dispatch])
    return (
        <SideBar>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                <h2 className='font-bold text-xl'>
                    Profile
                </h2>
                <div className='w-full grid lg:grid-cols-12 gap-6 mb-7'>
                    <div className='lg:col-span-10'>
                        <Uploader setImageUrl={setImageUrl} />
                    </div>
                    {/* image preview */}
                    <div className='lg:col-span-2'>
                        <div className='flex items-center justify-center'>
                            <ImagePreview name={
                                userInfo ? userInfo.fullName : "Filmflix"
                            }
                                image={imageUrl} />
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <Input label="Full Name" placeholder="Filmflix" type="text" background={true} name="fullName" register={register("fullName")} />
                    {
                        errors.fullName && <InlineError text={errors.fullName.message} />
                    }
                </div>
                <div className='w-full'>
                    <Input label="Email" placeholder="User email" type="email" background={true} name="email" register={register("email")} />
                    {
                        errors.email && <InlineError text={errors.email.message} />
                    }
                </div>

                <div className='font-medium flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4'>
                    <button className='bg-subMain transitions hover:bg-main flex-rows gap-4 border border-subMain text-white py-4 px-8 rounded w-full sm:w-auto'
                        disabled={deleteLoading || isLoading} onClick={deleteAccount}
                    >
                        {deleteLoading ? "Deleting..." : "Delete Account"}

                    </button>
                    <button className='bg-main transitions hover:bg-subMain flex-rows gap-4 border border-subMain text-white py-4 px-8 rounded w-full sm:w-auto'
                        disabled={deleteLoading || isLoading}
                    >
                        {isLoading ? "Updating..." : "Update Profile"}
                    </button>
                </div>
            </form>
        </SideBar >
    )
}

export default Profile