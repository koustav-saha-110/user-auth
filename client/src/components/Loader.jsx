import React from 'react'

const Loader = () => {
    return (
        <React.Fragment>
            <div className='h-screen flex justify-center items-center'>
                <div className='rounded-full border-4 w-10 h-10 border-blue-400 animate-pulse bg-white'></div>
            </div>
        </React.Fragment>
    )
}

export default Loader