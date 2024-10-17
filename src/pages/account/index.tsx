import React, { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch';
import { image_300, REACT_APP_ACCOUNT_ID, REACT_APP_API_KEY, unavailable } from '../../config';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonProfile from '../../components/buttonProfile';

type Result = {
    name: string,
    username: string,
    avatar: any
}

const Account = () => {
    const navigate = useNavigate()
    const url = `https://api.themoviedb.org/3/account/${REACT_APP_ACCOUNT_ID}`;
    const { data, loading, error } = useFetch<Result>(url, true);


    if (loading) return <div className='items-center flex justify-center'><p className='text-white text-lg'>Loading..</p></div>
    if (error) {
        return <div className='items-center flex justify-center'><p className='text-white text-lg'></p></div>
    }


    const onNavigate = (type: string) => {
        switch (type) {
            case "favorite-movie":
                navigate(`/favorite-movie`);
                break;
            case "favorite-tv":
                navigate(`/favorite-tv`);
                break;
            case "watchlist-movie":
                navigate(`/watchlist-movie`);
                break;
            case "watchlist-movie":
                navigate(`/watchlist-movie`);
                break;

            default:
                break;
        }
    }

    return (
        <div className="container mt-5">
            <div className="row center py-5">
                <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-decoration-underline head d-flex justify-content-center align-items-center">
                    <i className="fas fa-fire mx-4 text-danger"></i>
                    <h4 className="text-white text-xl font-bold">Account</h4>
                    <i className="fas fa-fire mx-4 text-danger"></i>
                </div>
            </div>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 mb-36 mt-3">
                    <div className="card flex pb-16">
                        <div className="flex flex-col items-center justify-center">
                            <img
                                src={data?.avatar?.tmdb?.avatar_path ? `${image_300}/${data?.avatar?.tmdb?.avatar_path}` : unavailable}
                                className="image-profile mb-3 mt-10"
                                alt={data?.name}
                            />
                            <div className="p-2 w-28 mr-2 bg-orange-400 rounded-full">
                                <p className='text-white text-sm text-center'>{data?.name}</p>
                            </div>
                        </div>
                        <div className="card-body px-5">
                            <ButtonProfile onClick={() => onNavigate('favorite-movie')} name='Favorite Movie' icon='heart' />
                            <ButtonProfile onClick={() => onNavigate('favorite-tv')} name='Favorite TV' icon='tv' />
                            <ButtonProfile onClick={() => onNavigate('watchlist-movie')} name='Watchlist Movie' icon='film' />
                            <ButtonProfile onClick={() => onNavigate('watchlist-tv')} name='Watchlist TV' icon='tv' />
                        </div>
                    </div>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}

export default Account