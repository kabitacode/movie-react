import React, { useState } from 'react'
import Genre from '../../components/genre';
import useGenre from '../../hooks/useGenre';
import { image_300, REACT_APP_API_KEY, unavailable } from '../../config';
import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

type Result = {
    page: number;
    results: [];
    total_pages: number;
}

const TV = () => {
    const navigate = useNavigate();
    const [state, setState] = useState([]);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState([]);
    const [value, setValue] = useState([]);
    const genreURL = useGenre(value);

    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`
    const { data, loading, error } = useFetch<Result>(url, false);


    if (loading) return <div className='items-center flex justify-center'><p className='text-white text-lg'>Loading..</p></div>
    if (error) {
        return <div className='items-center flex justify-center'><p className='text-white text-lg'></p></div>
    }

    const Previous = () => {
        if (page) {
            setPage(page - 1)
        }
    };

    const Next = () => {
        if (data && page < data.total_pages) {
            setPage(page + 1);
        }
    };

    const onNavigate = (id: string) => {
        navigate(`/detail-tv/${id}`);
    }


    return (
        <div className="container pt-20">
            <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-decoration-underline head d-flex justify-content-center align-items-center">
                <i className="fas fa-fire mx-4 text-danger"></i>
                <h4 className="text-white text-xl font-bold">TV Series</h4>
                <i className="fas fa-fire mx-4 text-danger"></i>
            </div>
            <Genre
                genre={genre}
                setGenre={setGenre}
                setPage={setPage}
                type="movie"
                value={value}
                setValue={setValue}
            />

            <div className="row">
                {
                    data?.results && data?.results.length > 0 ? data?.results?.map((item: any, index: number) => {
                        const { name, title, poster_path, first_air_date, release_date, media_type, id } = item;
                        return (
                            <>
                                <button
                                    onClick={() => onNavigate(id)}
                                    key={index}
                                    className="col-md-3 h-25 col-sm-4 py-3 d-flex  justify-content-center rounded-xl"
                                    id="card"
                                >
                                    <div className="bg-dark w-full rounded-lg" key={id}>
                                        <img
                                            src={poster_path ? `${image_300}/${poster_path}` : unavailable}
                                            className="card-img-top pt-3 pb-0 px-3 card-image"
                                            alt={title}
                                        />
                                        <div className="card-content items-center p-3 w-full justify-center justify-items-center">
                                            <h5 className="text-center mb-2 text-white text-md font-bold">{title ? title : name}</h5>
                                            <div className="d-flex fs-6 align-items-center justify-content-center movie">
                                                <h5 className='text-white font-weight-light mr-2 text-sm'>{media_type === "tv" ? "TV" : "Movie"} </h5>
                                                <h5 className='text-white font-weight-light mr-2 text-sm'>|</h5>
                                                <h5 className='text-white text-sm'>{first_air_date || release_date}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </>
                        )
                    }) : <p className='items-center text-lg text-white'>Data Not Found!</p>
                }
            </div>
            <div className="flex items-center justify-center pb-10 mb-5 ml-2">
                <button className="text-sm px-3 py-1 m-1 text-center btn-primary rounded-full" onClick={Previous}>
                    Previous
                </button>
                <button className="px-3 text-sm py-1 m-1 text-center btn-primary rounded-full" onClick={Next}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default TV