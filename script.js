const searchInput = document.getElementById('searchInput');
const resultsTable = document.getElementById('resultsTable');
const resultsBody = document.getElementById('resultsBody');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('errorMessage');

searchInput.addEventListener('input', function() {
    loader.classList.remove('hidden');
    resultsTable.classList.add('hidden');
    errorMessage.classList.add('hidden');

    
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
        fetchData(searchInput.value);
    }, 300);
});

function fetchData(query) {
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then(response => response.json())
        .then(data => {
            loader.classList.add('hidden');

            if (data.length === 0) {
                errorMessage.textContent = 'No results found.';
                errorMessage.classList.remove('hidden');
                return;
            }

            resultsBody.innerHTML = '';
            data.forEach(item => {
                const row = `
                    <tr>
                        <td>${item.show.name}</td>
                        <td>${item.show.rating.average || 'N/A'}</td>
                        <td>${item.show.genres.join(', ') || 'N/A'}</td>
                        <td>${item.show.summary || 'N/A'}</td>
                    </tr>
                `;
                resultsBody.innerHTML += row;
            });
            resultsTable.classList.remove('hidden');
        })
        .catch(error => {
            errorMessage.textContent = 'Error fetching data. Please try again later.';
            errorMessage.classList.remove('hidden');
            loader.classList.add('hidden');
        });
}