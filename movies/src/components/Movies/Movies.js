import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helpers";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin="auto" marginTop={4} textAlign="center">
      <Typography
        margin="auto"
        variant="h4"
        padding={2}
        width="fit-content"
        bgcolor="#1c1c1c"
        color="#FFD700"
        borderRadius={2}
        boxShadow="0px 5px 15px rgba(255, 215, 0, 0.4)"
      >
        All Movies
      </Typography>
      <Box
        width="90%"
        margin="auto"
        marginTop={5}
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={3}
        justifyContent="center"
      >
        {movies &&
          movies.map((movie, index) => (
            <MovieItem
              key={index}
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Movies;
