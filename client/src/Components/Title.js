import React from 'react'

function Title({title, Icon}) {
    return (
        <div className='w-full flex gap-4 sm:gap-8 items-center'>
            <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-subMain"/>
            <h2 className='sm:text-xl font-bold text-lg'>{title}</h2>
        </div>
    )
}

export default Title