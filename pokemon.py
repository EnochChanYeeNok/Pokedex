import requests
import csv
import time
from tqdm import tqdm

def get_all_pokemon_list():
    url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data['results']
    else:
        print(f"Failed to fetch Pokémon list. Status code: {response.status_code}")
        return []

def get_pokemon_details(pokemon_url):
    response = requests.get(pokemon_url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch data for {pokemon_url}. Status code: {response.status_code}")
        return None

def parse_pokemon_data(pokemon_json):
    if not pokemon_json:
        return None

    pokemon = {}
    pokemon['id'] = pokemon_json.get('id')
    pokemon['name'] = pokemon_json.get('name')
    pokemon['height_m'] = pokemon_json.get('height', 0) / 10  # Convert decimeters to meters
    pokemon['weight_kg'] = pokemon_json.get('weight', 0) / 10  # Convert hectograms to kilograms

    # Extract types
    types = [t['type']['name'] for t in pokemon_json.get('types', [])]
    pokemon['types'] = ', '.join(types)

    # Extract abilities
    abilities = [a['ability']['name'] for a in pokemon_json.get('abilities', [])]
    pokemon['abilities'] = ', '.join(abilities)

    # Extract image URL
    pokemon['image'] = pokemon_json.get('sprites', {}).get('front_default', '')

    return pokemon

def main():
    pokemon_list = get_all_pokemon_list()
    if not pokemon_list:
        print("No Pokémon data to process.")
        return

    # Open CSV file for writing
    with open('pokemons.csv', mode='w', newline='', encoding='utf-8') as file:
        fieldnames = ['id', 'name', 'height_m', 'weight_kg', 'types', 'abilities', 'image']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()

        # Iterate over each Pokémon and fetch details
        for pokemon in tqdm(pokemon_list, desc="Fetching Pokémon data"):
            pokemon_url = pokemon['url']
            pokemon_json = get_pokemon_details(pokemon_url)
            parsed_pokemon = parse_pokemon_data(pokemon_json)
            if parsed_pokemon:
                writer.writerow(parsed_pokemon)
            
            # Respectful delay to prevent hitting API rate limits
            time.sleep(0.2)  # 200 milliseconds

    print("Pokémon data has been successfully written to pokemons.csv")

if __name__ == '__main__':
    main()