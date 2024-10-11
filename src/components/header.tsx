import React from 'react'

const Header = () => {
    return (
        <div className='container-fluid pr-0 pl-0 header'>
            <div className='col-12 text-center bg-dark'>
            <div className="row">
                <div className="flex items-center w-100 p-3">
                    <i className="fas fa-video text-white mr-3"></i> 
                    <h3 className='text-white text-2xl font-bold'>Movie Example</h3>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Header;