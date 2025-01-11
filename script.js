// script.js

document.getElementById('search-button').addEventListener('click', fetchPokemon);
document.getElementById('pokemon-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        fetchPokemon();
    }
});

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