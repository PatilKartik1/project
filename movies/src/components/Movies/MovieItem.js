import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card
      sx={{
        margin: 2,
        width: 260,
        height: 380,
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 10px 30px rgba(255, 215, 0, 0.6)",
        },
        bgcolor: "#1c1c1c",
        color: "#fff",
      }}
    >
      <Box height="50%" overflow="hidden">
        <img
          height="100%"
          width="100%"
          src={posterUrl}
          alt={title}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" fontWeight="bold" color="#FFD700">
          {title}
        </Typography>
        <Typography variant="body2" color="gray">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          LinkComponent={Link}
          to={`/Booking/${id}`}
          sx={{
            bgcolor: "#FFD700",
            color: "#000",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#FFC107",
            },
          }}
          size="medium"
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
