let movies = [
  { id: 1, title: "Начало", year: 2010, director: "Кристофер Нолан" },
  {
    id: 2,
    title: "Криминальное чтиво",
    year: 1994,
    director: "Квентин Тарантино",
  },
  { id: 3, title: "Побег из Шоушенка", year: 1994, director: "Фрэнк Дарабонт" },
];

let nextId = 4;

exports.getAllMovies = (req, res) => {
  const { year, director } = req.query;
  let filteredMovies = [...movies];

  if (year) {
    filteredMovies = filteredMovies.filter((movie) => movie.year == year);
  }

  if (director) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.director.toLowerCase().includes(director.toLowerCase())
    );
  }

  res.json(filteredMovies);
};

exports.getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Фильм не найден" });
  }
};

exports.createMovie = (req, res) => {
  const { title, year, director } = req.body;

  if (!title || !year || !director) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  const newMovie = {
    id: nextId++,
    title,
    year: parseInt(year),
    director,
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
};

exports.updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, year, director } = req.body;
  const movieIndex = movies.findIndex((m) => m.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Фильм не найден" });
  }

  movies[movieIndex] = {
    ...movies[movieIndex],
    title: title || movies[movieIndex].title,
    year: year ? parseInt(year) : movies[movieIndex].year,
    director: director || movies[movieIndex].director,
  };

  res.json(movies[movieIndex]);
};

exports.deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = movies.length;
  movies = movies.filter((m) => m.id !== id);

  if (movies.length < initialLength) {
    res.json({ message: "Фильм удален" });
  } else {
    res.status(404).json({ error: "Фильм не найден" });
  }
};
