const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

//все фильмы
router.get("/", moviesController.getAllMovies);

//один фильм
router.get("/:id", moviesController.getMovieById);

//создать фильм
router.post("/", moviesController.createMovie);

//обновить фильм
router.put("/:id", moviesController.updateMovie);

//удалить фильм
router.delete("/:id", moviesController.deleteMovie);

module.exports = router;
