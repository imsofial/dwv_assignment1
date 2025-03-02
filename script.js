fetch('films.json')
    .then(response => response.json())
    .then(films => {
        const tableBody = document.querySelector('#filmsTable tbody');
        films.forEach(film => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${film.title}</td>
                <td>${film.release_year}</td>
                <td>${film.director}</td>
                <td>${film.box_office}</td>
                <td>${film.country}</td>
            `;
        });
    });

function filterFilms() {
    const query = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#filmsTable tbody tr');
    rows.forEach(row => {
        const title = row.cells[0].innerText.toLowerCase();
        row.style.display = title.includes(query) ? '' : 'none';
    });
}
