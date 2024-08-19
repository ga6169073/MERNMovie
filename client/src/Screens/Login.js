import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { Input } from '../Components/UserInputs'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { LoginValidation } from '../Components/Validation/UserValidation'
import { yupResolver } from "@hookform/resolvers/yup"
import { InlineError } from '../Components/Notifications/Error'
import { loginAction } from '../Redux/Actions/userActions'
import { toast } from 'react-toastify'
function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isError, userInfo, isSuccess } = useSelector(
        state => state.userLogin
    )

    // validate user 
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(LoginValidation)
    })

    // on handleSubmit
    const onSubmit = (data) => {
        dispatch(loginAction(data))
    }

    //useEffect
    useEffect(() => {
        if(userInfo?.isAdmin){
            navigate("/dashboard")
        } else if(userInfo){
            navigate("/profile")
        }

        if(isSuccess){
            toast.success(`Welcome back ${userInfo?.fullName}`)
        }
        if(isError){
            toast.error(isError)
            dispatch({type: "USER_LOGIN_RESET"})
        }
    },[userInfo, isSuccess, isError, navigate, dispatch] )
    return (
        <Layout>
            <div className='container mx-auto px-2 my-24 flex-cols'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full 2xl:w-2/5 flex-cols p-8 sm:p-14 gap-8 md:w-3/5 bg-dry rounded-lg border border-border'>
                    <img src="/images/logo.png" alt='logo' className='w-full h-12 object-contain' />
                    <div className='w-full'>
                        <Input label="Email" placeholder="User" type="email" background={true} name="email" register={register("email")} />
                        {
                            errors.email && <InlineError text={errors.email.message} />
                        }
                    </div>
                    <div className='w-full'>
                        <Input label="Password" placeholder="********" type="password" background={true} name="password" register={register("password")} />
                        {
                            errors.password && <InlineError text={errors.password.message} />
                        }
                    </div>
                    <button type='submit'
                        disabled={isLoading}
                        className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'>
                        {
                            // if loading show loading
                            isLoading ? (
                                "Loading..."
                            ) : (
                                <>
                                    <FiLogIn /> Sign In
                                </>
                            )
                        }
                    </button>
                    <p className='text-center text-border'>
                        Don't have an account ? {" "}
                        <Link to="/register" className='text-dryGray font-semibold ml-2'>
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </Layout>
    )
}

export default Login