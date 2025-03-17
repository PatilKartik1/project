import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";

const Booking = () => {
  const [movie, setMovie] = useState(null);
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const { id } = useParams();

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!movie) return;

    newBooking({ ...inputs, movie: movie._id })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "20px" }}>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            variant="h4"
            textAlign="center"
            color="#2b2d42"
          >
            🎟️ Book Tickets for: {movie.title}
          </Typography>

          <Box display="flex" justifyContent="center">
            {/* Left Section: Movie Details */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              padding={3}
              width="45%"
              backgroundColor="#fff"
              borderRadius={5}
              boxShadow="5px 5px 15px rgba(0, 0, 0, 0.1)"
            >
              <img
                width="80%"
                height="300px"
                src={movie.posterUrl}
                alt={movie.title}
                style={{ borderRadius: "10px" }}
              />
              <Box width="80%" marginTop={3} padding={2} textAlign="center">
                <Typography paddingTop={2} fontSize="1.1rem" color="#555">
                  {movie.description}
                </Typography>
                <Typography fontWeight="bold" marginTop={2} color="#2b2d42">
                  🎭 Starring: {movie.actors.join(", ")}
                </Typography>
                <Typography fontWeight="bold" marginTop={1} color="#d90429">
                  📅 Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
              </Box>
            </Box>

            {/* Right Section: Booking Form */}
            <Box
              width="40%"
              padding={4}
              marginLeft={3}
              backgroundColor="#fff"
              borderRadius={5}
              boxShadow="5px 5px 15px rgba(0, 0, 0, 0.1)"
            >
              <form onSubmit={handleSubmit}>
                <Typography textAlign="center" variant="h5" color="#2b2d42" fontWeight="bold">
                  🎫 Secure Your Seats
                </Typography>

                <Box padding={3} display="flex" flexDirection="column">
                  <FormLabel sx={{ fontWeight: "bold", color: "#2b2d42" }}>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type="number"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                  />

                  <FormLabel sx={{ fontWeight: "bold", color: "#2b2d42" }}>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type="date"
                    margin="normal"
                    variant="outlined"
                    value={inputs.date}
                    onChange={handleChange}
                    fullWidth
                  />

                  <Button
                    type="submit"
                    sx={{
                      mt: 3,
                      bgcolor: "#2b2d42",
                      color: "white",
                      padding: "10px",
                      borderRadius: 2,
                      fontSize: "1rem",
                      ":hover": { bgcolor: "#121217" },
                    }}
                    variant="contained"
                    fullWidth
                  >
                    🎟️ Book Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Booking;
