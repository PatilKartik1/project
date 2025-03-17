import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { List, ListItem, ListItemText, Typography, Card, CardContent } from "@mui/material";
import { getAdminData } from "../../helpers/api-helpers"; // Fixed function name typo

const Admin = () => {
  const [admin, setAdmin] = useState(); // Fixed variable name typo

  useEffect(() => {
    getAdminData()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box 
      width="100%" 
      display="flex" 
      flexDirection={{ xs: "column", md: "row" }} 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      bgcolor="#121212" // Dark background
      color="white"
      padding={3}
    >
      {/* Admin Profile Section */}
      {admin && (
        <Card 
          sx={{ 
            width: { xs: "90%", md: "30%" }, 
            padding: 3, 
            textAlign: "center", 
            backgroundColor: "#1e1e1e", 
            color: "white",
            boxShadow: 3 
          }}
        >
          <PersonRoundedIcon sx={{ fontSize: "6rem", color: "#00d386" }} />
          <Typography variant="h6" mt={2}>{admin.email}</Typography>
        </Card>
      )}

      {/* Movies Added by Admin */}
      {admin && admin.addedMovies.length > 0 && (
        <Box 
          width={{ xs: "100%", md: "65%" }} 
          display="flex" 
          flexDirection="column" 
          alignItems="center"
          mt={{ xs: 3, md: 0 }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={2}>
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
                  color: "white"
                }}
              >
                <CardContent>
                  <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
                    <ListItemText
                      primary={`🎬 ${movie.title}`}
                      secondary={`Releasing: ${new Date(movie.releaseDate).toDateString()}`}
                    />
                  </ListItem>
                </CardContent>
              </Card>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Admin;
