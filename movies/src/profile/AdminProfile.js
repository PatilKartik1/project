import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getAdminById } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
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

const AdminProfile = () => {
  const [admin, setAdmin] = useState();

  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="center"
      alignItems="center"
      padding={3}
      sx={{ backgroundColor: "#121212", minHeight: "100vh", color: "white" }}
    >
      {/* Admin Profile Section */}
      {admin && (
        <Card
          sx={{
            width: { xs: "90%", md: "30%" },
            padding: 3,
            textAlign: "center",
            boxShadow: 3,
            backgroundColor: "#1e1e1e",
            color: "white",
          }}
        >
          <Stack alignItems="center" spacing={2}>
            <Avatar sx={{ width: 120, height: 120, bgcolor: "#f50057" }}>
              <AccountCircleIcon sx={{ fontSize: "6rem" }} />
            </Avatar>
            <Typography variant="h6">Admin</Typography>
            <Typography variant="body1" color="gray">
              {admin.email}
            </Typography>
          </Stack>
        </Card>
      )}

      {/* Added Movies Section */}
      {admin && admin.addedMovies.length > 0 && (
        <Box
          width={{ xs: "100%", md: "65%" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={{ xs: 3, md: 0 }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            mb={2}
            color="white"
          >
            Added Movies
          </Typography>
          <List sx={{ width: "100%", maxWidth: 600 }}>
            {admin.addedMovies.map((movie, index) => (
              <Card
                key={index}
                sx={{
                  marginBottom: 2,
                  boxShadow: 2,
                  borderRadius: 2,
                  backgroundColor: "#1e1e1e",
                  color: "white",
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
                      primary={`🎬 ${movie.title}`}
                      sx={{ flex: 1, color: "white" }}
                    />
                  </ListItem>
                  <Divider sx={{ backgroundColor: "gray" }} />
                </CardContent>
              </Card>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default AdminProfile;
