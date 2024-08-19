import React from 'react'
import Layout from '../Layout/Layout'
import Head from '../Components/Head'
import { FiMail, FiMapPin, FiPhoneCall } from 'react-icons/fi'

function Contact() {
    const ContactData = [
        {
            id: 1,
            title: 'Email Us',
            data: 'Interactively grow backend ideas with cross-platform models.',
            icon: FiMail,
            contact: "ga6169076@gmail.com"
        },
        {
            id: 2,
            title: 'Call Us',
            data: 'Quickly coordinate e-business applications through revolutionary catalysts for change.',
            icon: FiPhoneCall,
            contact: "+84967195856"
        },
        {
            id: 3,
            title: 'Location',
            data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc eu ultricies.',
            icon: FiMapPin,
            contact: ""
        }
    ]
    return (
        <Layout>
            <div className='min-h-screen container mx-auto px-2 my-6'>
                <Head title="Contact" />
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 my-10 lg:my-20 '>
                    {
                        ContactData.map((item) => (
                            <div key={item.id} className='border border-border flex-cols p-10 bg-dry rounded-lg text-center'>
                                <span className='flex-cols w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl'>
                                    <item.icon />
                                </span>
                                <h5 className='text-xl font-semibold mb-2'>{item.title}</h5>
                                <p className='mb-0 text-sm text-text leading-7'>
                                    <a href={`mailtp: ${item.contact}`} className='text-blue-600'>
                                        {item.contact}
                                    </a>
                                    <br/>
                                    {item.data}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Contact