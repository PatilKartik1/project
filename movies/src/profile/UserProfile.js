import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import {
  deleteBooking,
  getUserBooking,
  getUserDetails,
} from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardContent,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const UserProfile = () => {
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="center"
      alignItems="center"
      padding={3}
    >
      {/* User Profile Section */}
      {user && (
        <Card
          sx={{
            width: { xs: "90%", md: "30%" },
            padding: 3,
            textAlign: "center",
            boxShadow: 3,
          }}
        >
          <Stack alignItems="center" spacing={2}>
            <Avatar sx={{ width: 120, height: 120 }}>
              <AccountCircleIcon sx={{ fontSize: "6rem" }} />
            </Avatar>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body1" color="text.secondary">
              {user.email}
            </Typography>
          </Stack>
        </Card>
      )}

      {/* Booking List Section */}
      {bookings && (
        <Box
          width={{ xs: "100%", md: "65%" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={{ xs: 3, md: 0 }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={2}>
            Bookings
          </Typography>
          <List sx={{ width: "100%", maxWidth: 600 }}>
            {bookings.map((booking, index) => (
              <Card
                key={index}
                sx={{
                  marginBottom: 2,
                  boxShadow: 2,
                  borderRadius: 2,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <CardContent>
                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText
                      primary={`🎬 ${booking.movie.title}`}
                      secondary={`Seat: ${booking.seatNumber} | Date: ${new Date(
                        booking.date
                      ).toDateString()}`}
                      sx={{ flex: 1 }}
                    />
                    <IconButton
                      onClick={() => handleDelete(booking._id)}
                      color="error"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </CardContent>
              </Card>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default UserProfile;
