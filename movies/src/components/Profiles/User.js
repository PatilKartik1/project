import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { DeleteForeverOutlined } from "@mui/icons-material/";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { deleteBooking, getUserBookings } from "../../helpers/api-helpers";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getUserBookings()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <Box 
      width="100%" 
      display="flex" 
      flexDirection={{ xs: "column", md: "row" }} 
      alignItems="center"
      padding={4}
      gap={4}
    >
      {/* User Profile Section */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          width: { xs: "90%", md: "30%" },
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <PersonRoundedIcon sx={{ fontSize: "10rem", color: "#1976D2" }} />
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          {bookings.length > 0 ? bookings[0].user.name : "User"}
        </Typography>
      </Paper>

      {/* Bookings Section */}
      <Paper
        elevation={3}
        sx={{
          width: { xs: "90%", md: "60%" },
          padding: 3,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={2}>
          Bookings
        </Typography>
        <Divider />
        <List>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <ListItem
                key={index}
                sx={{
                  bgcolor: "#00d386",
                  color: "white",
                  textAlign: "center",
                  borderRadius: 2,
                  marginY: 1,
                  padding: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <ListItemText>
                  <Typography fontWeight="bold">🎬 {booking.movie.title}</Typography>
                  <Typography>Seat: {booking.seatNumber}</Typography>
                  <Typography>Date: {new Date(booking.date).toDateString()}</Typography>
                </ListItemText>
                <IconButton onClick={() => handleDelete(booking._id)} color="error">
                  <DeleteForeverOutlined />
                </IconButton>
              </ListItem>
            ))
          ) : (
            <Typography textAlign="center" color="gray" mt={2}>
              No bookings found.
            </Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default User;
