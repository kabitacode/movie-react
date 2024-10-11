import React, { HTMLInputTypeAttribute, useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch';
import { image_300, REACT_APP_API_KEY, unavailable } from '../../config';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading';

type Result = {
    page: number;
    results: [];
    total_pages: number;
}

const Search = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const baseUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${REACT_APP_API_KEY}&page=${page}`;
    const urlSearch = `https://api.themoviedb.org/3/search/multi?api_key=${REACT_APP_API_KEY}&language=en-US&query=${search}&page=${page}&include_adult=false`
    const [url, setUrl] = useState(baseUrl)
    const { data, loading, error } = useFetch<Result>(url);
    const [debounce, setDebounce] = useState('')

    // if (loading) return (
    //   <div className='h-full layout'>
    //     <div className="items-center justify-center flex mt-40">
    //       <Loading isLoading={true} />
    //     </div>
    //   </div>
    // )

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebounce(search)
        setPage(1)
      }, 500);
    
      return () =>clearTimeout(timer)
    }, [search])
    

    useEffect(() => {
        if (debounce) {
            setUrl(urlSearch)
        } else {
            setUrl(baseUrl)
        }
    }, [page, debounce])
    

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
        navigate(`/detail/${id}`);
    }

    const onSearch = () => {
        setPage(1)
        setSearch(search)
    }

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (search.trim.length > 0) {
            setSearch(e.currentTarget.value)
        } else {
            setUrl(baseUrl)
            setSearch(e.currentTarget.value)
        }
    }

    return (
        <div className="container mt-5">
            <div className="row py-5">
                <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-decoration-underline head d-flex justify-content-center align-items-center">
                    <i className="fas fa-fire mx-4 text-danger"></i>
                    <h4 className="text-white text-xl font-bold">Search</h4>
                    <i className="fas fa-fire mx-4 text-danger"></i>
                </div>
                <div className="col-12 mb-3">
                    <div className="flex justify-center">
                        <input type="text" className='rounded-full mr-3 w-1/3 p-2 text-sm' value={search} onChange={handleInput} />
                        {/* <button onClick={onSearch} className='bg-orange-400 p-2 px-3 rounded-full'>
                            <p className='text-white text-sm'>Search</p>
                        </button> */}
                    </div>
                </div>

                {
                    data?.results && data?.results.length > 0 ? data?.results?.map((item: any, index: number) => {
                        const { name, title, poster_path, first_air_date, release_date, media_type, id } = item;
                        return (
                            
                                <button
                                    onClick={() => onNavigate(id)}
                                    key={index}
                                    className="col-md-3 h-25 col-sm-4 py-3 d-flex  justify-content-center rounded-xl"
                                    id="card"
                                >
                                    <div className="bg-dark w-full rounded-lg" key={id}>
                                        <img
                                            src={poster_path ? `${image_300}/${poster_path}` : unavailable}
                                            className="card-img-top pt-3 pb-0 px-3"
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
                            
                        )
                    }) : <p className='items-center text-lg text-white'>Data Not Found!</p>
                }

            </div>
            <div className="flex items-center justify-center pb-10 mb-5 ml-2">
                <button className="px-3 py-1 m-1 text-center btn-primary rounded-full text-sm" onClick={Previous}>
                    Previous
                </button>
                <button className="px-3 py-1 m-1 text-center btn-primary rounded-full text-sm" onClick={Next}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Search