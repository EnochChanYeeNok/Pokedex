# Pokédex
## Overview

Pokédex is a comprehensive web application designed to provide detailed information about Pokémon. Users can search for Pokémon by name or ID, view their statistics, explore type counter relationships, and utilize a type counter calculator to strategize battles effectively. The application leverages modern web technologies and Python scripts to deliver an interactive and informative experience for Pokémon enthusiasts.

**Live Demo:** [pokedex-roan-three-49.vercel.app](https://pokedex-roan-three-49.vercel.app)

## Features

- **Search Functionality**: Quickly search for Pokémon by name or ID to access detailed information.
- **Type Counter Relationships**: Explore how different Pokémon types interact, including strengths, weaknesses, resistances, and vulnerabilities.
- **Type Counter Calculator**: Calculate effective counters based on two selected Pokémon types to aid in battle strategies.
- **Responsive Design**: Ensures optimal viewing experience across various devices and screen sizes.
- **Interactive Tables**: Collapsible tables for organized display of additional information, enhancing user experience.
- **Visual Type Indicators**: Type names are displayed alongside their corresponding icons for easy identification.

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (ES6)
- **Backend Scripts**:
  - Python 3.x
- **Libraries & Tools**:
  - [Papa Parse](https://www.papaparse.com/) for CSV parsing in JavaScript
  - [Requests](https://docs.python-requests.org/en/latest/) for HTTP requests in Python
  - [tqdm](https://tqdm.github.io/) for progress bars in Python

## Installation

### Prerequisites

- **Python 3.6+**: Ensure Python is installed on your system. You can download it from [here](https://www.python.org/downloads/).
- **pip**: Python package installer. It typically comes bundled with Python installations.

### Clone the Repository

```bash
git clone https://github.com/enoche/Pokedex.git
cd Pokedex
```

### Install Python Dependencies

Install the required Python libraries using `pip`:

```bash
pip install requests tqdm
```

## Generating CSV Data

The application relies on two CSV files: `pokemons.csv` and `types.csv`, which store Pokémon data and type relationships, respectively. Use the provided Python scripts to generate these files.

### Generate Pokémon Data

Run the `pokemon.py` script to fetch and store Pokémon details.

```bash
python pokemon.py
```

### Generate Types Data

Run the `type.py` script to fetch and store Pokémon type relationships.

```bash
python type.py
```

These scripts will create `pokemons.csv` and `types.csv` in the project directory.

## Running the Application

The application is frontend-based and can be run by simply opening the `index.html` file in a web browser.

1. **Open the Application**:
   - Navigate to the project directory.
   - Open `index.html` with your preferred web browser.

   **Example**:
   - **Windows**: Right-click `index.html` and choose "Open with" > your browser.
   - **macOS/Linux**: Use the terminal or file explorer to open `index.html` with your browser.

## Usage

### Searching for a Pokémon

1. **Access the Search Bar**:
   - On the main page (`index.html`), locate the search bar at the top.

2. **Enter Pokémon Name or ID**:
   - Input the desired Pokémon's name (e.g., "Pikachu") or ID number.

3. **Initiate Search**:
   - Click the "Search" button to retrieve and display the Pokémon's details.

### Exploring Type Counter Relationships

1. **Navigate to Type Calculator**:
   - Click the "Type Calculator" button on the main page to access the Type Counter Relationships and Calculator.

2. **Toggle Between Sections**:
   - Use the "Show Type Counters" and "Show Calculator" buttons to switch between viewing the type relationships table and the counter calculator.

3. **View Type Relationships**:
   - When "Show Type Counters" is active, a table displaying each type's strengths, weaknesses, resistances, and vulnerabilities will be visible.

### Using the Type Counter Calculator

1. **Select Pokémon Types**:
   - In the Type Calculator section, select two types from the dropdown menus labeled "Type 1" and "Type 2."

2. **Calculate Counters**:
   - Click the "Calculate Counter" button to determine effective counters based on the selected types.

3. **View Results**:
   - The results will display which types are super effective or not very effective against the chosen combination.

## Project Structure

```
Pokedex/
│
├── images/
│   ├── types/
│   │   ├── normal.svg
│   │   ├── fire.svg
│   │   ├── water.svg
│   │   ├── electric.svg
│   │   ├── grass.svg
│   │   ├── ice.svg
│   │   ├── fighting.svg
│   │   ├── poison.svg
│   │   ├── ground.svg
│   │   ├── flying.svg
│   │   ├── psychic.svg
│   │   ├── bug.svg
│   │   ├── rock.svg
│   │   ├── ghost.svg
│   │   ├── dragon.svg
│   │   ├── dark.svg
│   │   ├── steel.svg
│   │   └── fairy.svg
│
├── styles.css
├── icon.css
├── pokemons.csv
├── types.csv
├── index.html
├── script.js
├── type.py
├── pokemon.py
├── type.html
└── type.js
```

- **images/types/**: Contains SVG icons representing each Pokémon type.
- **styles.css**: Main stylesheet for the application's layout and design.
- **icon.css**: Stylesheet specifically for type icons.
- **pokemons.csv**: CSV file containing Pokémon data generated by `pokemon.py`.
- **types.csv**: CSV file containing type relationships generated by `type.py`.
- **index.html**: The main entry point of the application where users can search for Pokémon.
- **script.js**: JavaScript file handling search functionality and dynamic content rendering on `index.html`.
- **type.py**: Python script to generate `types.csv` by fetching data from PokéAPI.
- **pokemon.py**: Python script to generate `pokemons.csv` by fetching data from PokéAPI.
- **type.html**: Page dedicated to displaying type counter relationships and the type counter calculator.
- **type.js**: JavaScript file managing the display logic and calculations on `type.html`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [PokéAPI](https://pokeapi.co/) for providing comprehensive Pokémon data.
- [Papa Parse](https://www.papaparse.com/) for efficient CSV parsing in JavaScript.
- The contributors and the community for their support and feedback.

---
