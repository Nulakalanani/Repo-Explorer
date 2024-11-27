// API URL for GitHub repository search
const apiURL = 'https://api.github.com/search/repositories?q=';

// DOM elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const repoResults = document.getElementById('repo-results');

// Event listener for search button
searchButton.addEventListener('click', function() {
    const query = searchInput.value;
    if (query) {
        fetchRepositories(query); // Call function to fetch repositories
    }
});

// Function to fetch repositories from GitHub API
async function fetchRepositories(query) {
    try {
        const response = await fetch(`${apiURL}${query}&sort=stars&order=desc`);

        // Ensure response is successful (status 200)
        if (response.ok) {
            const data = await response.json(); // Parse response as JSON

            // Clear previous results
            repoResults.innerHTML = '';

            // Check if we have any repositories
            if (data.items && data.items.length > 0) {
                data.items.forEach(function(repo) {
                    displayRepository(repo); // Call function to display repository
                });
            } else {
                repoResults.innerHTML = '<p>No repositories found.</p>';
            }
        } else {
            repoResults.innerHTML = `<p>Error: ${response.statusText}</p>`;
        }
    } catch (error) {
        console.error('Error fetching repositories:', error);
        repoResults.innerHTML = '<p>There was an error fetching the repositories. Please try again later.</p>';
    }
}

// Function to display repository details
function displayRepository(repo) {
    const repoElement = document.createElement('div');
    repoElement.classList.add('repo-item');
    repoElement.innerHTML = `
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        <p>${repo.description ? repo.description : 'No description available.'}</p>
        <div class="stats">
            <span>⭐ ${repo.stargazers_count} Stars</span>
            <span>🍴 ${repo.forks_count} Forks</span>
        </div>
    `;
    repoResults.appendChild(repoElement);
}