import React from "react";
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
  const data = [
    {
      icon: "fas fa-fire-alt",
      name: "Trending",
      link: "/"
    },
    {
      icon: "fas fa-film",
      name: "Movies",
      link: "movies"
    },
    {
      icon: "fas fa-tv",
      name: "TV Series",
      link: "tv"
    },
    {
      icon: "fas fa-search",
      name: "Search",
      link: "search"
    },
    {
      icon: "fas fa-user-circle",
      name: "Account",
      link: "account"
    },
  ];

  return (
    <>
      <div className="container-fluid position">
        <div className="row">
          <div className="col-12 text-center bg-dark">
            {data.map((val, index) => {
              return (
                <button key={index} className="col-sm-2 col-md-2 btn btn-dark">
                  <NavLink to={val.link} className={'no-underline'}>
                    {({ isActive, isPending, isTransitioning }) => (
                      <div>
                        <i className={`${val.icon} ${isActive ? 'text-orange-400 font-bold' : 'text-white'}`} id="fire"></i>
                        <br />
                        <h5 className={isActive ? 'text-orange-400 font-bold no-underline' : 'font-normal text-white no-underline'}>{val.name}</h5>
                      </div>
                    )}
                  </NavLink>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};


export default Footer;