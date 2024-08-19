import React from 'react'
import Layout from "../Layout/Layout"
import Head from '../Components/Head'
function About() {
  return (
    <Layout>
      <div className='min-h-screen container mx-auto px-2 my-6'>
        <Head title="About" />
        <div className='py-10 px-4 xl:py-20'>
          <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
            <div>
              <h3 className='text-xl lg:text-3xl mb-4 font-semibold'>
                Welcome to our Movie Website
              </h3>
              <div className='mt-3 text-sm leading-8 text-text'>
                <p>
                  Id eiusmod eu ad ea consectetur irure. In nisi quis laborum reprehenderit adipisicing.
                  Nulla officia occaecat magna consectetur sit laboris sunt aliquip tempor id adipisicing.
                  Aute qui nostrud aute ullamco amet mollit cupidatat laborum aute consectetur ullamco.
                  Ex non consequat laboris excepteur laboris commodo est cillum ullamco amet eiusmod.
                  Id qui commodo magna proident excepteur eu pariatur nostrud.
                </p>
                <p>
                  Id eiusmod eu ad ea consectetur irure. In nisi quis laborum reprehenderit adipisicing.
                  Nulla officia occaecat magna consectetur sit laboris sunt aliquip tempor id adipisicing.
                  Aute qui nostrud aute ullamco amet mollit cupidatat laborum aute consectetur ullamco.
                  Ex non consequat laboris excepteur laboris commodo est cillum ullamco amet eiusmod.
                  Id qui commodo magna proident excepteur eu pariatur nostrud.
                </p>
                {/* <p>
                  Id eiusmod eu ad ea consectetur irure. In nisi quis laborum reprehenderit adipisicing.
                  Nulla officia occaecat magna consectetur sit laboris sunt aliquip tempor id adipisicing.
                  Aute qui nostrud aute ullamco amet mollit cupidatat laborum aute consectetur ullamco.
                  Ex non consequat laboris excepteur laboris commodo est cillum ullamco amet eiusmod.
                  Id qui commodo magna proident excepteur eu pariatur nostrud.
                </p> */}
              </div>
              <div className='grid md:grid-cols-2 gap-6 mt-8'>
                <div className='p-8 bg-dry rounded-lg'>
                  <span className='block text-3xl font-extrabold mt-0'>
                    2K
                  </span>
                  <h4 className='text-lg font-semibold my-2'>
                    Listed Movies
                  </h4>
                  <p className='mb-0 text-text leading-7 text-sm'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.
                  </p>
                </div>
                <div className='p-8 bg-dry rounded-lg'>
                  <span className='block text-3xl font-extrabold mt-0'>
                    1K
                  </span>
                  <h4 className='text-lg font-semibold my-2'>
                    Users
                  </h4>
                  <p className='mb-0 text-text leading-7 text-sm'>
                    Free for everyone. No payment required.
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-10 lg:mt-0'>
              <img src='/images/about.jpg' alt='About' className='w-full hidden xl:block h-header rounded-lg object-cover'/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About