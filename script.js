document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.querySelector("#filmsTable tbody");
  const searchInput = document.getElementById("searchInput");
  let films;

  fetch("films.json")
    .then((response) => response.json())
    .then((movies) => {
      renderTable(movies);
      films = movies;

      searchInput.addEventListener("input", () => {
        const filteredMovies = movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        renderTable(filteredMovies);
      });
    })
    .catch((error) => {
      console.error("Failed to load data.json", error);
      tableBody.innerHTML =
        "<tr><td colspan='6'>Failed to load data.</td></tr>";
    });

  function renderTable(movies) {
    tableBody.innerHTML = "";

    if (movies.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='6'>No movies found.</td></tr>";
      return;
    }

    movies.forEach((movie) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${movie.title}</td>
                <td>${movie.release_year}</td>
                <td>${movie.director || "N/A"}</td>
                <td>${movie.box_office || "N/A"}</td>
                <td>${movie.country || "N/A"}</td>
            `;
      tableBody.appendChild(row);
    });
  }
  function sortFilms(criteria) {
    let sorted = [...films]; // Копия массива

    if (criteria === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === "year") {
      sorted.sort((a, b) => b.release_year - a.release_year);
    } else if (criteria === "director") {
      sorted.sort((a, b) => {
        if (a.director == null || b.director == null) return 0;
        return a.director.localeCompare(b.director);
      }); // По убыванию
    }

    renderTable(sorted);
  }
  // Обработчик изменения фильтра
  document.getElementById("sortCriteria").addEventListener("change", (e) => {
    sortFilms(e.target.value);
  });
});
