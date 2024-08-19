import { Dialog, DialogBackdrop, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import React, { Fragment, useRef } from 'react'
import { IoClose } from 'react-icons/io5'
function MainModal({ modalOpen, setModalOpen, children }) {
    const cancelButtonRef = useRef()

    return (
        <>
            <Transition show={modalOpen} as={Fragment} appear >
                <Dialog as='div' className="fixed inset-0 z-30 text-center"
                    initialFocus={cancelButtonRef} onClose={() => setModalOpen(false)}
                >
                    <div className='min-h-screen px-4'>
                        <TransitionChild as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100'
                            leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0'
                        >
                            <DialogBackdrop className="fixed inset-0 bg-black opacity-60 " />
                        </TransitionChild>
                        {/* <span className="inline-block relative h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span> */}
                        <TransitionChild as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'
                        >
                            <div className="fixed inset-0 z-30 w-screen overflow-hidden">
                                <div className="flex-rows min-h-full p-4 sm:p-0">
                                    <DialogPanel className="w-full relative flex-rows transitions  sm:w-4/5 md:w-3/5 lg:w-2/5" >

                                        {children}

                                    </DialogPanel>
                                </div>
                            </div>
                        </TransitionChild>
                        <div className='absolute z-30 right-5 top-5'>
                            <button onClick={() => setModalOpen(false)} type='button'
                                className='transitions flex-cols w-10 h-10 text-base  text-subMain bg-white rounded-full hover:bg-subMain hover:text-white '>
                                <IoClose />
                            </button>
                        </div>


                    </div>
                </Dialog>
            </Transition >
        </>
    )
}

export default MainModal