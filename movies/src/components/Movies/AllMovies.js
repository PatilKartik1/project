import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../helpers/api-helpers";
import CradLayout from "../HomePage/CradLayout";

const AllMovies = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin="auto" marginTop={4} textAlign="center">
      <Typography
        variant="h4"
        padding={2}
        textAlign="center"
        bgcolor="#1c1c1c"
        color="#FFD700"
        borderRadius={2}
        boxShadow="0px 5px 15px rgba(255, 215, 0, 0.4)"
        width="fit-content"
        margin="auto"
      >
        All Movies
      </Typography>
      <Box
        margin="auto"
        width="90%"
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={4}
        justifyContent="center"
        padding={3}
      >
        {movies &&
          movies.map((movie, index) => (
            <CradLayout
              id={movie._id}
              title={movie.title}
              releaseDate={movie.releaseDate}
              posterUrl={movie.posterUrl}
              description={movie.description}
              key={index}
            />
          ))}
      </Box>
    </Box>
  );
};

export default AllMovies;
