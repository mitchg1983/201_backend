const express = require('express');
const router = express.Router();

const {
    createMovie,
    getAllMovies,
    deleteMovie,
    updateMovie,
    getOneMovie
} = require("./controller/moviesController")

router.post("/create-movie", createMovie);
router.get("/get-all-movies", getAllMovies);
router.delete("/delete-movie", deleteMovie);
router.put("/update-movie", updateMovie);
router.post("/get-one-movie", getOneMovie);

module.exports = router;