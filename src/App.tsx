import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trending from "./pages/trending";
import Movies from "./pages/movies";
import TV from "./pages/tv";
import Search from "./pages/search";
import Detail from "./pages/detail";
import MovieDetail from "./pages/movieDetail";
import TvDetail from "./pages/tvDetail";
import Account from "./pages/account";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteMovie from "./pages/favoriteMovie";
import FavoriteTv from "./pages/favoriteTv";
import WatchlistMovie from "./pages/watchlistMovie";

// import SingleMovie from "./Pages/SingleMovie";
// import Error from "./Pages/Error";
const App = () => {
  return (
    <div className="layout">
    <BrowserRouter>
    <Header/>
        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TV />} />
          <Route path="/search" element={<Search />} /> 
          <Route path="/account" element={<Account />} /> 
          <Route path="/detail/:id" element={<Detail />} /> 
          <Route path="/detail-movie/:id" element={<MovieDetail />} /> 
          <Route path="/detail-tv/:id" element={<TvDetail />} /> 
          <Route path="/favorite-movie" element={<FavoriteMovie />} /> 
          <Route path="/favorite-tv" element={<FavoriteTv />} /> 
          <Route path="/watchlist-movie" element={<WatchlistMovie />} /> 
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
      
    </div>
  );
};
 
 
export default App;