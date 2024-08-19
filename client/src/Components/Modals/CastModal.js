import React, { useEffect, useState } from 'react'
import MainModal from './MainModal'
import { Input } from '../UserInputs'
import Uploader from '../Uploader'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { castValidation } from '../Validation/MovieValidation'
import { createCastAction, updateCastAction } from '../../Redux/Actions/movieActions'
import { toast } from 'react-toastify'
import { InlineError } from '../Notifications/Error'
import { ImagePreview } from '../ImagePreview'

function CastModal({ modalOpen, setModalOpen, cast }) {
    const dispatch = useDispatch()
    const [castImage, setCastImage] = useState("")
    const generateId = Math.floor(Math.random() * 1000000000)
    const image = castImage ? castImage : cast?.image
    
    // validate cast
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(castValidation)
    })

    // on handleSubmit
    const onSubmit = (data) => {
        if (cast) {
            // if cast is available, update the cast
            dispatch(
                updateCastAction({
                    ...data,
                    image: image,
                    id: cast.id
                })
            )
            toast.success('Cast updated successfully')
        } else {
            // if cast is not available, create the cast
            dispatch(
                createCastAction({
                    ...data,
                    image: image,
                    id: generateId
                })
            )
            toast.success('Cast created successfully')
        }
        reset()
        setCastImage("")
        setModalOpen(false)
    }
    // useEffect
    useEffect(() => {
        if (cast) {
            setValue("name", cast?.name)
        }
    }, [cast, setValue])
    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className='inline-block  w-full align-middle border border-border text-white p-10 h-full bg-main overflow-y-auto rounded-2xl'>
                <h2 className='text-3xl font-bold'>
                    {cast ? 'Update Cast' : 'Create Cast'}
                </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col gap-6 text-left mt-6'>
                    <div className="w-full">
                        <Input label="Cast Name"
                            placeholder="John Doe"
                            type="text"
                            background={true}
                            register={register("name")}
                        />
                        {errors.name && <InlineError text={errors.name.message} />}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-border font-semibold text-sm'>
                            Cast Image
                        </p>
                        <Uploader setImageUrl={setCastImage} />
                        <ImagePreview image={
                            image ? image : "/images/user.png"
                        } name="castImage" />
                    </div>
                    <button 
                    type='submit'
                        className='w-full flex-rows gap-4 transitions py-3 text-lg hover:bg-dry border-2 border-subMain rounded bg-subMain text-white'>
                        {
                            cast ? 'Update' : (
                                'Add'
                            )
                        }
                    </button>
                </form>
            </div>
        </MainModal>
    )
}

export default CastModal