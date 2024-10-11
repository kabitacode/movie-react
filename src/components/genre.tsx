import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch';
import { REACT_APP_API_KEY } from '../config';

type Result = {
    id: number;
    name: string;
    genres: any;
}

const Genre = ({ genre, setGenre, setPage, type, value, setValue }: any) => {
    const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${REACT_APP_API_KEY}&language=en-US`;

    const { data } = useFetch<Result>(url);
    setGenre(data?.genres);


    const CategoryAdd = (genres: any) => {
        setValue([...value, genres]);
        setGenre(genre.filter((g: any) => g.id !== genres.id));
        setPage(1);
    };

    const CategoryRemove = (genres: any) => {
        setValue(value.filter((g: any) => g.id !== genres.id));
        setGenre([...genre, genres]);
        setPage(1);
    };

    return (
        <>
            <div className="container">
                <div className="row mb-3">
                    <div className="col-12 d-flex flex-wrap">
                        {value &&
                            value.map((val: any, index: number) => {
                                const { id, name } = val;
                                return (

                                    <div className="m-2" key={index}>
                                        <button
                                            className="bg-dark text-white px-4 py-2 rounded-full text-sm text-center buttons"
                                            onClick={() => CategoryRemove(val)}
                                        >
                                            {name}
                                        </button>
                                    </div>

                                );
                            })}


                        {genre &&
                            genre.map((val: any, index: number) => {
                                const { id, name } = val;
                                return (

                                    <div className="m-2" key={index}>
                                        <button
                                            className="bg-dark text-white rounded-full text-sm px-4 py-2 text-center button"
                                            onClick={() => CategoryAdd(val)}
                                        >
                                            {name}
                                        </button>
                                    </div>

                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Genre