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
      // console.log("Beginning deleteMovie...");
      // console.log(req.body);
      // console.log(req.body.id);
      const { id } = req.body;

      let deleteMovieById = await Movies.deleteOne({_id: id});
      if (deleteMovieById.deletedCount == 0) {
        throw new Error(
          "There was an error!!!"
        );
      }
      res.send("Success, movie was deleted");
  } catch (error) {
    res.status(500).json({
      message: "error...",
      error: error.message,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.body;
    let updateThisMovie = await Movies.findByIdAndUpdate(id, req.body, { new: true });
    if (updateThisMovie.deletedCount == 0)
      throw new Error("No Movie with this id was found, can't update.");
    res
      .send("We are updating a movie...");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error", error: error });
  }

}

const getOneMovie = async (req, res) => {
  try {
    const { id } = req.body;
    let getThisMovie = await Movies.findById(id);
    console.log(getThisMovie)
    res.send(getThisMovie);
  } catch (error) {
    
  }
}

module.exports = {
  createMovie,
  getAllMovies,
  deleteMovie,
  updateMovie,
  getOneMovie,
};
