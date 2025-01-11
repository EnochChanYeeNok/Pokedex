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
                displayPokemonDetails(pokemon);
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

function displayPokemonDetails(pokemon) {
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

function showError(message) {
    const detailsDiv = document.getElementById('pokemon-details');
    detailsDiv.innerHTML = `<p class="error">${message}</p>`;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}