import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from "react-router-dom";

const labelStyle = { mt: 1, mb: 1, fontWeight: "bold", color: "#555" };

const AuthForm = ({ onSubmit, isAdmin }) => {
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };

  return (
    <Dialog PaperProps={{ style: { borderRadius: 20, padding: "20px", boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)" } }} open={true}>
      <Box display="flex" justifyContent="flex-end">
        <IconButton component={Link} to="/" sx={{ color: "#333" }}>
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <Typography variant="h4" textAlign="center" fontWeight="bold" sx={{ color: "#333", mb: 2 }}>
        {isSignup ? "Sign Up" : "Log In"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          width={380}
          margin="auto"
        >
          {!isAdmin && isSignup && (
            <>
              <FormLabel sx={labelStyle}>Full Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                variant="outlined"
                type="text"
                name="name"
                fullWidth
                sx={{ bgcolor: "#f5f5f5", borderRadius: 1 }}
              />
            </>
          )}

          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            variant="outlined"
            type="email"
            name="email"
            fullWidth
            sx={{ bgcolor: "#f5f5f5", borderRadius: 1 }}
          />

          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            variant="outlined"
            type="password"
            name="password"
            fullWidth
            sx={{ bgcolor: "#f5f5f5", borderRadius: 1 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              borderRadius: 2,
              bgcolor: "#2b2d42",
              ":hover": { bgcolor: "#1f202b" },
              padding: "10px 0",
              fontSize: "16px",
            }}
          >
            {isSignup ? "Create Account" : "Log In"}
          </Button>

          {!isAdmin && (
            <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{ mt: 1, textTransform: "none", fontSize: "14px", color: "#2b2d42" }}
            >
              {isSignup ? "Already have an account? Log In" : "New here? Sign Up"}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default AuthForm;
