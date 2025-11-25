import React from 'react'
import LoaderIcon from './LoaderIcon'

function OverlayLoader({outerClass='fixed inset-0 flex-center z-50 bg-white'}) {
    return (
        <div className={outerClass}>
            <LoaderIcon className='text-2xl' />
        </div>
    )
}

export default OverlayLoader