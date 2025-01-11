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
    detailsDiv.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}" class="detail-image">
        <h2>${capitalize(pokemon.name)} (#${pokemon.id})</h2>
        <ul>
            <li><strong>Height:</strong> ${pokemon.height_m} m</li>
            <li><strong>Weight:</strong> ${pokemon.weight_kg} kg</li>
            <li><strong>Types:</strong> ${pokemon.types}</li>
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
    statsDiv.innerHTML = `
        <h3>Stats</h3>
        <ul>
            ${stats.map(stat => `<li><strong>${capitalize(stat.stat.name)}:</strong> ${stat.base_stat}</li>`).join('')}
        </ul>
    `;
}

function displayMoves(moves) {
    const movesDiv = document.getElementById('pokemon-moves');
    const moveList = moves.map(m => capitalize(m.move.name)).join(', ');
    movesDiv.innerHTML = `
        <h3>Moves</h3>
        <p>${moveList}</p>
    `;
}

function displayAdditionalSprites(sprites) {
    const spritesDiv = document.getElementById('pokemon-sprites');
    spritesDiv.innerHTML = `
        <h3>Additional Sprites</h3>
        <img src="${sprites.back_default}" alt="Back view of ${capitalize(sprites.back_default ? 'Pokémon' : 'Unavailable')}" class="additional-sprite">
        <img src="${sprites.front_shiny}" alt="Shiny front view of ${capitalize(sprites.front_shiny ? 'Pokémon' : 'Unavailable')}" class="additional-sprite">
        <img src="${sprites.back_shiny}" alt="Shiny back view of ${capitalize(sprites.back_shiny ? 'Pokémon' : 'Unavailable')}" class="additional-sprite">
    `;
}

function showError(message) {
    const detailsDiv = document.getElementById('pokemon-details');
    detailsDiv.innerHTML = `<p class="error">${message}</p>`;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}