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
          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
 
 
export default App;