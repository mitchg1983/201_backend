const express = require('express');
const router = express.Router();

const {
    createMovie,
    getAllMovies,
    deleteMovie,
} = require("./controller/moviesController")

router.post("/create-movie", createMovie);
router.get("/get-all-movies", getAllMovies);
router.delete("/delete-movie", deleteMovie);

module.exports = router;