import React from 'react'

interface Props {
    name: string;
    icon: string;
    onClick: () => void;
}

const ButtonProfile: React.FC<Props> = ({ name, icon, onClick }) => {
    return (
        <button onClick={onClick} className="flex button w-full focus:outline-none transition duration-300 hover:bg-yellow-400 flex-row py-2 rounded-full px-3 items-center justify-between mt-4 bg-blue-500">
            <p className='text-white text-sm mr-2 font-bold'>{name}</p>
            <i className={`fas fa-${icon} text-white`}></i>
        </button>
    )
}

export default ButtonProfile;