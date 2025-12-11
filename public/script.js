const API_URL = "/api/movies";

// Загрузить все фильмы
async function loadMovies() {
  try {
    const response = await fetch(API_URL);
    const movies = await response.json();
    displayMovies(movies);
  } catch (error) {
    console.error("Ошибка загрузки фильмов:", error);
  }
}

// Отобразить фильмы
function displayMovies(movies) {
  const container = document.getElementById("moviesList");
  container.innerHTML = "";

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.className = "movie-item";
    movieElement.innerHTML = `
            <h3>${movie.title} (${movie.year})</h3>
            <p>Режиссер: ${movie.director}</p>
            <div class="movie-actions">
                <button onclick="editMovie(${movie.id})">Редактировать</button>
                <button onclick="deleteMovie(${movie.id})">Удалить</button>
            </div>
        `;
    container.appendChild(movieElement);
  });
}

// Добавить фильм
document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const movie = {
    title: document.getElementById("title").value,
    year: document.getElementById("year").value,
    director: document.getElementById("director").value,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });

    if (response.ok) {
      document.getElementById("addForm").reset();
      loadMovies();
    }
  } catch (error) {
    console.error("Ошибка добавления фильма:", error);
  }
});

// Поиск фильмов
document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const year = document.getElementById("searchYear").value;
  const director = document.getElementById("searchDirector").value;
  const params = new URLSearchParams();

  if (year) params.append("year", year);
  if (director) params.append("director", director);

  try {
    const response = await fetch(`${API_URL}?${params}`);
    const movies = await response.json();
    displayMovies(movies);
  } catch (error) {
    console.error("Ошибка поиска:", error);
  }
});

// Сбросить поиск
document.getElementById("resetSearch").addEventListener("click", () => {
  document.getElementById("searchForm").reset();
  loadMovies();
});

// Редактировать фильм
async function editMovie(id) {
  const title = prompt("Новое название:");
  const year = prompt("Новый год:");
  const director = prompt("Новый режиссер:");

  if (title || year || director) {
    const updates = {};
    if (title) updates.title = title;
    if (year) updates.year = year;
    if (director) updates.director = director;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        loadMovies();
      }
    } catch (error) {
      console.error("Ошибка редактирования:", error);
    }
  }
}

// Удалить фильм
async function deleteMovie(id) {
  if (confirm("Удалить фильм?")) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadMovies();
      }
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  }
}

// Загрузить фильмы при загрузке страницы
document.addEventListener("DOMContentLoaded", loadMovies);
