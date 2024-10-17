import React, { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch';
import { image_300, REACT_APP_ACCESS_TOKEN, REACT_APP_ACCOUNT_ID, REACT_APP_API_KEY, unavailable } from '../../config';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ButtonProfile from '../../components/buttonProfile';

type Result = {
    genres: [];
    poster_path: any;
    backdrop_path: any;
    status: string;
    title: string;
    overview: string;
    tagline: string;
}

const MovieDetail = () => {
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${REACT_APP_API_KEY}`
    const { data, loading, error } = useFetch<Result>(url, false);
    const [isFavorite, setIsFavorite] = useState(true);

    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorPost, setErrorPost] = useState('');

    if (loading) return <div className='items-center flex justify-center'><p className='text-white text-lg'>Loading..</p></div>
    if (error) {
        return <div className='items-center flex justify-center'><p className='text-white text-lg'></p></div>
    }

    async function fetchPost() {
        setIsFavorite(!isFavorite);

        setIsLoading(true);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/account/${REACT_APP_ACCOUNT_ID}/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${REACT_APP_ACCESS_TOKEN}`
                },
                body: JSON.stringify({
                    "movie_id": id,
                    "media_type": "movie",
                    "favorite": isFavorite
                })
            });
            const post = await response.json();

            if (post.status_code == 1) {
                toast("Succesfully add to favorite!")
            }

            if (post.status_code == 13) {
                toast(post.status_message)
            }

            setPost(post);
            setErrorPost('');
        } catch (error: any) {
            setErrorPost(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row center py-5">
                <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-decoration-underline head d-flex justify-content-center align-items-center">
                    <i className="fas fa-fire mx-4 text-danger"></i>
                    <h4 className="text-white text-xl font-bold">Detail</h4>
                    <i className="fas fa-fire mx-4 text-danger"></i>
                </div>
            </div>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 mb-36">
                    <div className="card">
                        {
                            data?.backdrop_path != null ?
                                <img
                                    src={data?.backdrop_path ? `${image_300}/${data?.backdrop_path}` : unavailable}
                                    className="pt-3 pb-0 px-3 image-detail"
                                    alt={data?.title}
                                /> : <img
                                    src={data?.poster_path ? `${image_300}/${data?.poster_path}` : unavailable}
                                    className="pt-3 pb-0 px-3 image-detail"
                                    alt={data?.title}
                                />
                        }

                        <div className="flex flex-row justify-between mx-4">
                            <ButtonProfile name={isFavorite ? 'Add To Favorite' : 'Remove From Favorite'} icon='heart' onClick={() => fetchPost()} />
                            <div className="mx-1"></div>
                            <ButtonProfile name='Add To Watchlist' icon='tv' onClick={() => { }} />
                        </div>

                        <div className="card-body">
                            <div className="p-2 w-28 items-center justify-center mr-2 bg-orange-400 rounded-full">
                                <p className='text-white text-sm text-center'>{data?.status}</p>
                            </div>
                            <h5 className="text-lg font-bold mb-2 text-center">{data?.title}</h5>
                            <p className="text-sm font-light leading-relaxed">{data?.overview}</p>

                            <div className="flex flex-row mt-4">
                                {
                                    data?.genres && data?.genres?.length > 0 ? data?.genres?.map((item, index) => {
                                        const { name } = item;
                                        return (
                                            <div key={index} className="py-2 px-3 items-center justify-center mr-2 bg-slate-500 rounded-full">
                                                <p className='text-white text-sm text-center'>{name}</p>
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}

export default MovieDetail