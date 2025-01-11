// script.js

document.getElementById('search-button').addEventListener('click', fetchPokemon);
document.getElementById('pokemon-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        fetchPokemon();
    }
});
document.getElementById('load-all-button').addEventListener('click', loadAllPokemons);

function fetchPokemon() {
    const query = document.getElementById('pokemon-input').value.toLowerCase().trim();
    if (!query) {
        alert('Please enter a Pokémon name or ID.');
        return;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => displayPokemon(data))
        .catch(error => {
            alert(error.message);
            document.getElementById('pokemon-data').style.display = 'none';
        });
}

function displayPokemon(pokemon) {
    const pokemonDataDiv = document.getElementById('pokemon-data');
    pokemonDataDiv.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name} (#${pokemon.id})</h2>
        <ul>
            <li><strong>Height:</strong> ${pokemon.height / 10} m</li>
            <li><strong>Weight:</strong> ${pokemon.weight / 10} kg</li>
            <li><strong>Types:</strong> ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</li>
            <li><strong>Abilities:</strong> ${pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</li>
        </ul>
    `;
    pokemonDataDiv.style.display = 'block';
}

function loadAllPokemons() {
    Papa.parse('pokemons.csv', {
        download: true,
        header: true,
        complete: function(results) {
            displayAllPokemons(results.data);
        },
        error: function(error) {
            console.error('Error loading CSV file:', error);
            alert('Failed to load Pokémon data.');
        }
    });
}

function displayAllPokemons(pokemons) {
    const allPokemonsDiv = document.getElementById('all-pokemons');
    allPokemonsDiv.innerHTML = ''; // Clear previous content

    pokemons.forEach(pokemon => {
        // Handle potential missing data
        if (!pokemon.id || !pokemon.name || !pokemon.image) return;

        const card = document.createElement('div');
        card.classList.add('pokemon-card');

        card.innerHTML = `
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
            <p>#${pokemon.id}</p>
            <p>Type: ${pokemon.types}</p>
        `;

        allPokemonsDiv.appendChild(card);
    });
}