const express = require("express");
const path = require("path");
const moviesRouter = require("./routes/movies");
const logger = require("./middleware/logger");

const app = express();
const PORT = process.env.PORT || 3001; // Измените порт

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger);

// Маршруты
app.use("/api/movies", moviesRouter);

// Главная страница
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
