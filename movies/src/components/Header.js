import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    if (isUserLoggedIn && movie) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#000", padding: "8px 16px" }}>
      <Toolbar>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton LinkComponent={Link} to="/">
            <MovieIcon sx={{ color: "#FFD700" }} />
          </IconButton>
          <Typography variant="h6" color="#FFD700" fontWeight="bold">
            Cinemas
          </Typography>
        </Box>
        <Box width={"40%"} margin="auto">
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies?.map((option) => option.title) || []}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search movies..."
                sx={{
                  bgcolor: "white",
                  borderRadius: "8px",
                  input: { color: "black" },
                }}
              />
            )}
          />
        </Box>
        <Box display="flex">
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab
              label="Movies"
              LinkComponent={Link}
              to="/movies"
              sx={{ color: "#FFD700" }}
            />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab
                  label="Admin"
                  LinkComponent={Link}
                  to="/admin"
                  sx={{ color: "#FFD700" }}
                />
                <Tab
                  label="Login"
                  LinkComponent={Link}
                  to="/auth"
                  sx={{ color: "#FFD700" }}
                />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab
                  label="Profile"
                  LinkComponent={Link}
                  to="/user"
                  sx={{ color: "#FFD700" }}
                />
                <Tab
                  onClick={() => logout(false)}
                  label="Logout"
                  LinkComponent={Link}
                  to="/"
                  sx={{ color: "#FFD700" }}
                />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab
                  label="Add Movie"
                  LinkComponent={Link}
                  to="/add"
                  sx={{ color: "#FFD700" }}
                />
                <Tab
                  label="Profile"
                  LinkComponent={Link}
                  to="/user-admin"
                  sx={{ color: "#FFD700" }}
                />
                <Tab
                  onClick={() => logout(true)}
                  label="Logout"
                  LinkComponent={Link}
                  to="/"
                  sx={{ color: "#FFD700" }}
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
