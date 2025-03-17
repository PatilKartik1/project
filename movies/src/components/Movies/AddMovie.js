import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";

const labelProps = {
  mt: 1,
  mb: 1,
  color: "white", // Label text color for dark mode
};

const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });

  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, actors);
    addMovie({ ...inputs, actors })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      width={"50%"}
      padding={4}
      margin="auto"
      display="flex"
      flexDirection="column"
      boxShadow="10px 10px 20px #333"
      bgcolor="#121212" // Dark background
      color="white" // White text
      borderRadius={2}
    >
      <Typography textAlign="center" variant="h5" fontFamily="verdana" mb={2}>
        Add New Movie
      </Typography>

      <FormLabel sx={labelProps}>Title</FormLabel>
      <TextField
        value={inputs.title}
        onChange={handleChange}
        name="title"
        variant="standard"
        margin="normal"
        InputProps={{ style: { color: "white" } }}
      />

      <FormLabel sx={labelProps}>Description</FormLabel>
      <TextField
        value={inputs.description}
        onChange={handleChange}
        name="description"
        variant="standard"
        margin="normal"
        InputProps={{ style: { color: "white" } }}
      />

      <FormLabel sx={labelProps}>Poster URL</FormLabel>
      <TextField
        value={inputs.posterUrl}
        onChange={handleChange}
        name="posterUrl"
        variant="standard"
        margin="normal"
        InputProps={{ style: { color: "white" } }}
      />

      <FormLabel sx={labelProps}>Release Date</FormLabel>
      <TextField
        type="date"
        value={inputs.releaseDate}
        onChange={handleChange}
        name="releaseDate"
        variant="standard"
        margin="normal"
        InputProps={{ style: { color: "white" } }}
      />

      <FormLabel sx={labelProps}>Actors</FormLabel>
      <Box display="flex" alignItems="center">
        <TextField
          value={actor}
          onChange={(e) => setActor(e.target.value)}
          variant="standard"
          margin="normal"
          InputProps={{ style: { color: "white" } }}
          sx={{ flexGrow: 1 }}
        />
        <Button
          onClick={() => {
            if (actor.trim()) {
              setActors([...actors, actor.trim()]);
              setActor("");
            }
          }}
          variant="contained"
          sx={{ bgcolor: "#00796b", ":hover": { bgcolor: "#004d40" } }}
        >
          Add
        </Button>
      </Box>

      <FormLabel sx={labelProps}>Featured</FormLabel>
      <Checkbox
        name="featured"
        checked={inputs.featured}
        onClick={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            featured: e.target.checked,
          }))
        }
        sx={{ color: "white" }}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          width: "50%",
          margin: "auto",
          bgcolor: "#d32f2f",
          ":hover": { bgcolor: "#9a0007" },
          mt: 3,
        }}
      >
        Add New Movie
      </Button>
    </Box>
  );
};

export default AddMovie;
