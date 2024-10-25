import React, { useEffect, useState } from "react";
import Button from "../components/button/button";
import "../styles/components/movieList.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../features/store";
import addIcon from "../assets/Group 24.svg";
import logoutIcon from "../assets/logout_black_24dp 1.svg";
import MovieForm from "./movieForm";
import { addNewMovie, editMovie, fetchMoviesWithPagination, setPage } from "../features/auth/movieSlice";
import { useNavigate } from 'react-router-dom';


export default function MovieList() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, currentPage } = useSelector((state: RootState) => state.movie);
  const navigate = useNavigate();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchMoviesWithPagination({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleMovieAdd = () => {
    setSelectedMovie(null);
    setIsFormVisible(true);
  };

  const handleEditMovie = (movie: any) => {
    setSelectedMovie(movie);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  const handleSubmit = (movieData: {
    id?: string;
    title: string;
    year: string;
    poster: File | null;
  }) => {
     console.log("movieData--->", movieData);
    if (selectedMovie && movieData.id) {
      dispatch(editMovie({
        id: movieData.id,
        title: movieData.title,
        year: movieData.year,
        poster: movieData.poster,
      }));
    } else {
      dispatch(addNewMovie({
        title: movieData.title,
        year: movieData.year,
        poster: movieData.poster,
      }));
    }
  
    setIsFormVisible(false);
  };

  // const imageUrl  = (buffer: BlobPart)=>{
  //   const blob = new Blob([base], { type: 'image/jpeg' });
  //   const url = URL.createObjectURL(blob);
  //   return url
  // }

  const renderContent = () => (
    <div className="all-cards">
      <div className="group_cards">
        {movies.map((card, index) => (
          <div
            className="link_card"
            key={index}
            onClick={() => handleEditMovie(card)}
          >
            <div className="card">
              <div className="card__img_images">
                <img
                  src={`data:image/jpeg;base64,${card.poster}`}
                  width="200px"
                  height="300"
                  alt={card.title}
                ></img>
              </div>
              <div className="card_details">
                <div>{card.title}</div>
                <div>{card.year}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if(loading){
    return(
        <p>Loading...</p>
    )
  }

  const logout = () =>{
    navigate('/login');

  }

  return (
    <>
      {!isFormVisible && (
        <>
          {movies?.length > 0  && (<div className="movies_header">
            <div className="movies_header_title">
              <h1 className="movies_header_text">My Movies</h1>
              <img
                src={addIcon}
                width="25px"
                onClick={handleMovieAdd}
                alt="Add Movie"
              />
            </div>
            <div className="movies_header_logout" onClick={logout}>
              <span>Logout</span>
              <img src={logoutIcon} width="25px" alt="Logout" />
            </div>
          </div>)}

          {movies?.length > 0 ? (
            renderContent()
          ) : (
            <div className="empty_movie">
              <div className="empty_movie_content">
                <h1 className="empty_movie_title">Your movie list is empty</h1>
                <Button
                  onClick={handleMovieAdd}
                  label={"Add a new movie"}
                  className={"primary"}
                />
              </div>
            </div>
          )}
        </>
      )}
      {isFormVisible && (
        <MovieForm
          formTitle={selectedMovie ? "Edit" : "Create a new movie"}
          submitLabel={selectedMovie ? "Update" : "Submit"}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          selectedMovie={selectedMovie}
        />
      )}
    </>
  );
}
