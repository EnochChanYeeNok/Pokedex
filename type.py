import requests
import csv
import time
from tqdm import tqdm

def get_all_types():
    """
    Fetches the list of all Pokémon types from the PokéAPI.
    
    Returns:
        list: A list of dictionaries containing type name and URL.
    """
    url = 'https://pokeapi.co/api/v2/type/'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data['results']
    else:
        print(f"Failed to fetch types list. Status code: {response.status_code}")
        return []

def get_type_details(type_url):
    """
    Fetches detailed damage relations for a specific Pokémon type.
    
    Args:
        type_url (str): The API URL for the specific type.
    
    Returns:
        dict: A dictionary containing damage relations.
    """
    response = requests.get(type_url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch data for {type_url}. Status code: {response.status_code}")
        return None

def parse_type_data(type_json):
    """
    Parses the JSON data for a Pokémon type to extract damage relations.
    
    Args:
        type_json (dict): The JSON data for the type.
    
    Returns:
        dict: A dictionary with type name and its damage relations.
    """
    if not type_json:
        return None
    
    type_data = {}
    type_data['Name'] = type_json.get('name', '').capitalize()
    
    damage_relations = type_json.get('damage_relations', {})
    
    # Extract damage relations and join them into comma-separated strings
    strong_against = [t['name'].capitalize() for t in damage_relations.get('double_damage_to', [])]
    type_data['Strong_Against'] = ', '.join(strong_against) if strong_against else 'None'
    
    weak_against = [t['name'].capitalize() for t in damage_relations.get('double_damage_from', [])]
    type_data['Weak_Against'] = ', '.join(weak_against) if weak_against else 'None'
    
    resistant_to = [t['name'].capitalize() for t in damage_relations.get('half_damage_from', [])]
    type_data['Resistant_To'] = ', '.join(resistant_to) if resistant_to else 'None'
    
    vulnerable_to = [t['name'].capitalize() for t in damage_relations.get('half_damage_to', [])]
    type_data['Vulnerable_To'] = ', '.join(vulnerable_to) if vulnerable_to else 'None'
    
    return type_data

def main():
    """
    Main function to generate the types.csv file by fetching and parsing type data.
    """
    types_list = get_all_types()
    if not types_list:
        print("No type data to process.")
        return

    # Open CSV file for writing
    with open('types.csv', mode='w', newline='', encoding='utf-8') as file:
        fieldnames = ['Name', 'Strong_Against', 'Weak_Against', 'Resistant_To', 'Vulnerable_To']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()

        # Iterate over each type and fetch details
        for type_info in tqdm(types_list, desc="Fetching Type data"):
            type_url = type_info['url']
            type_json = get_type_details(type_url)
            parsed_type = parse_type_data(type_json)
            if parsed_type:
                writer.writerow(parsed_type)
            
            # Respectful delay to prevent hitting API rate limits
            time.sleep(0.2)  # 200 milliseconds

    print("Type data has been successfully written to types.csv")

if __name__ == '__main__':
    main()