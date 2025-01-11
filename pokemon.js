// pokemon.js

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const pokemonId = params.get('id');

    if (!pokemonId) {
        showError('No Pokémon selected.');
        return;
    }

    fetchPokemonDetails(pokemonId);
});

function fetchPokemonDetails(id) {
    Papa.parse('pokemons.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const pokemons = results.data;
            const pokemon = pokemons.find(p => p.id === id || p.name.toLowerCase() === id.toLowerCase());

            if (pokemon) {
                displayBasicDetails(pokemon);
                fetchAdditionalDetails(id);
            } else {
                showError('Pokémon not found.');
            }
        },
        error: function(error) {
            console.error('Error loading CSV file:', error);
            showError('Failed to load Pokémon data.');
        }
    });
}

function displayBasicDetails(pokemon) {
    const detailsDiv = document.getElementById('pokemon-details');
    
    // Split types and trim whitespace
    const types = pokemon.types.split(',').map(type => type.trim());

    // Generate HTML for type names and images
    const typeElements = types.map(type => `
        <span class="type">
            <div class="icon ${type.toLowerCase()}">
                <img src="images/types/${type.toLowerCase()}.svg" alt="${capitalize(type)} Type" class="type-icon">
            </div>
            ${capitalize(type)}    
        </span>
    `).join(' ');

    detailsDiv.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}" class="detail-image">
        <h2>${capitalize(pokemon.name)} (#${pokemon.id})</h2>
        <ul>
            <li><strong>Height:</strong> ${pokemon.height_m} m</li>
            <li><strong>Weight:</strong> ${pokemon.weight_kg} kg</li>
            <li><strong>Types:</strong> ${typeElements}</li>
            <li><strong>Abilities:</strong> ${pokemon.abilities}</li>
        </ul>
    `;
}

function fetchAdditionalDetails(id) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Additional data not found');
            }
            return response.json();
        })
        .then(data => {
            displayStats(data.stats);
            displayMoves(data.moves);
            displayAdditionalSprites(data.sprites);
        })
        .catch(error => {
            console.error('Error fetching additional data:', error);
            // Optionally, display an error message or fallback content
        });
}

function displayStats(stats) {
    const statsDiv = document.getElementById('pokemon-stats');
    const statsTable = `
        <details>
            <summary>Stats</summary>
            <table>
                <thead>
                    <tr>
                        <th>Stat</th>
                        <th>Base Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${stats.map(stat => `
                        <tr>
                            <td>${capitalize(stat.stat.name)}</td>
                            <td>${stat.base_stat}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </details>
    `;
    statsDiv.innerHTML = statsTable;
}

function displayMoves(moves) {
    const movesDiv = document.getElementById('pokemon-moves');
    const movesTable = `
        <details>
            <summary>Moves</summary>
            <table>
                <thead>
                    <tr>
                        <th>Move Name</th>
                    </tr>
                </thead>
                <tbody>
                    ${moves.map(m => `
                        <tr>
                            <td>${capitalize(m.move.name)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </details>
    `;
    movesDiv.innerHTML = movesTable;
}

function displayAdditionalSprites(sprites) {
    const spritesDiv = document.getElementById('pokemon-sprites');
    const spritesTable = `
        <details>
            <summary>Additional Sprites</summary>
            <table>
                <thead>
                    <tr>
                        <th>Sprite</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Back Default</td>
                        <td><img src="${sprites.back_default}" alt="Back view of Pokémon" class="additional-sprite"></td>
                    </tr>
                    <tr>
                        <td>Front Shiny</td>
                        <td><img src="${sprites.front_shiny}" alt="Shiny front view of Pokémon" class="additional-sprite"></td>
                    </tr>
                    <tr>
                        <td>Back Shiny</td>
                        <td><img src="${sprites.back_shiny}" alt="Shiny back view of Pokémon" class="additional-sprite"></td>
                    </tr>
                </tbody>
            </table>
        </details>
    `;
    spritesDiv.innerHTML = spritesTable;
}

function showError(message) {
    const container = document.querySelector('.pokemon-details-container');
    container.innerHTML = `<p class="error">${message}</p>`;
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}