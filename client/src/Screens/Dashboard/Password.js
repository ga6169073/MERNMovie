import React, { useEffect } from 'react'
import SideBar from './SideBar'
import { Input } from '../../Components/UserInputs'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PasswordValidation } from '../../Components/Validation/UserValidation'
import { InlineError } from '../../Components/Notifications/Error'
import { changePasswordAction } from '../../Redux/Actions/userActions'
import { toast } from 'react-toastify'

function Password() {
    const dispatch = useDispatch()
    const { isLoading, isError, message, isSuccess } = useSelector(
        state => state.userChangePassword
    )

    // validate user 
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(PasswordValidation)
    })

    // on submit 
    const onSubmit = (data) => {
        dispatch(changePasswordAction(data))
    }

    // useEffect
    useEffect(() => {
        if (isSuccess) {
            dispatch({ type: "USER_CHANGE_PASSWORD_RESET" })
        }
        if (isError) {
            toast.error(isError)
            dispatch({ type: "USER_CHANGE_PASSWORD_RESET" })
        }
        if (message) {
            toast.success(message)
            reset()
        }
    }, [isSuccess, isError, message, reset, dispatch])
    return (
        <SideBar>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
                <h2 className='font-bold text-xl'>
                    Change Password
                </h2>
                <div className='w-full'>
                    <Input label="Previous Password" placeholder="********" type="password" background={true} name="oldPassword" register={register("oldPassword")} />
                    {
                        errors.oldPassword && <InlineError text={errors.oldPassword.message} />
                    }
                </div>
                <div className='w-full'>
                    <Input label="New Password" placeholder="********" type="password" background={true} name="newPassword" register={register("newPassword")} />
                    {
                        errors.newPassword && <InlineError text={errors.newPassword.message} />
                    }
                </div>
                <div className='w-full'>
                    <Input label="Confirm Password" placeholder="********" type="password" background={true} name="confirmPassword" register={register("confirmPassword")} />
                    {
                        errors.confirmPassword && <InlineError text={errors.confirmPassword.message} />
                    }
                </div>

                <div className='flex justify-end items-center my-4'>
                    <button
                        disabled={isLoading}
                        type='submit'
                        className='bg-main transitions hover:bg-subMain flex-rows gap-4 border border-subMain text-white py-4 px-8 rounded w-full sm:w-auto'>
                        {isLoading ? "Changeing..." : "Change Password"}
                    </button>
                </div>
            </form>
        </SideBar>
    )
}

export default Password