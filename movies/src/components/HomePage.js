import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieItem from "./Movies/MovieItem";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box width="100%" minHeight="100vh" bgcolor="#000" color="#fff">
      {/* Hero Section */}
      <Box
        width="100%"
        height="50vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundImage:
            "url('https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="rgba(0, 0, 0, 0.6)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant="h3" fontWeight="bold" color="#FFD700">
            Experience Movies Like Never Before
          </Typography>
          <Button
            LinkComponent={Link}
            to="/movies"
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "#FFD700",
              color: "#000",
              fontWeight: "bold",
              '&:hover': { bgcolor: "#FFC107" },
            }}
          >
            Book Your Tickets Now
          </Button>
        </Box>
      </Box>
      
      {/* Latest Releases */}
      <Box padding={5} textAlign="center">
        <Typography variant="h4" fontWeight="bold" color="#FFD700">
          Latest Releases
        </Typography>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
        padding={3}
      >
        {movies &&
          movies.slice(0, 4).map((movie) => (
            <MovieItem
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
            />
          ))}
      </Box>
      
      {/* View All Movies Button */}
      <Box display="flex" justifyContent="center" padding={5}>
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{
            color: "#FFD700",
            borderColor: "#FFD700",
            fontWeight: "bold",
            '&:hover': { bgcolor: "#FFD700", color: "#000" },
          }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;