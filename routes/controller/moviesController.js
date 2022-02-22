const Movies = require("../model/moviesModel");

const createMovie = async (req, res) => {
  try {
    // console.log(req.body);

    const { title, director, runtime, rating, description } = req.body;

    const newMovie = new Movies({
      title: title,
      director: director,
      runtime: runtime,
      rating: rating,
      description: description,
    });
    const savedMovie = await newMovie.save();
    res.status(200).json({
      message: "Movie was saved",
      payload: savedMovie,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).json({
        message: error,
        //   error: `duplicate for the title ${error.keyValue.todo}`,
        error: "something went wrong error 11000",
      });
    }
    res.json({
      message: "There is an error......",
      error: error.errors,
    });
  }
};

const getAllMovies = async (req, res) => {
  try {
    let allMovies = await Movies.find();
    res.status(200).json(allMovies);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteMovie = async (req, res) => {
  try {
      console.log("Beginning deleteMovie...");
      console.log(req.body);
      console.log(req.body.id);
      const { id } = req.body.id;

      let deleteMovieById = await Movies.findByIdAndDelete(id);
      if (deleteMovieById === null) {
        throw new Error(
          "There was an error!!!"
        );
      }
      res.status(200).json({
        message: "Movie delted",
        payload: deleteMovieById
      });
  } catch (error) {
    res.status(500).json({
      message: "error...",
      error: error.message,
    });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  deleteMovie,
};
