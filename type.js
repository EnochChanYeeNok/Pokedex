// type.js

document.addEventListener('DOMContentLoaded', () => {
    loadTypeCounters();
    populateTypeDropdowns();

    document.getElementById('calculate-button').addEventListener('click', calculateCounter);
});

// Load type counter relationships from types.csv and display in the table
function loadTypeCounters() {
    Papa.parse('types.csv', {
        download: true,
        header: true,
        complete: function(results) {
            displayTypeCounters(results.data);
        },
        error: function(error) {
            console.error('Error loading types CSV:', error);
            alert('Failed to load type counter data.');
        }
    });
}

function displayTypeCounters(types) {
    const tableBody = document.querySelector('#counters-table tbody');
    tableBody.innerHTML = ''; // Clear existing content

    types.forEach(type => {
        const row = document.createElement('tr');

        // Create cells for each column
        const typeCell = document.createElement('td');
        typeCell.innerHTML = `
            <span class="type">
                ${capitalize(type.Name)} 
                <img src="images/types/${type.Name.toLowerCase()}.svg" alt="${capitalize(type.Name)} Type" class="type-icon">
            </span>
        `;

        const strongAgainstCell = document.createElement('td');
        strongAgainstCell.innerHTML = type.Strong_Against
            ? type.Strong_Against.split(',').map(t => formatType(t)).join(', ')
            : 'None';

        const weakAgainstCell = document.createElement('td');
        weakAgainstCell.innerHTML = type.Weak_Against
            ? type.Weak_Against.split(',').map(t => formatType(t)).join(', ')
            : 'None';

        const resistantToCell = document.createElement('td');
        resistantToCell.innerHTML = type.Resistant_To
            ? type.Resistant_To.split(',').map(t => formatType(t)).join(', ')
            : 'None';

        const vulnerableToCell = document.createElement('td');
        vulnerableToCell.innerHTML = type.Vulnerable_To
            ? type.Vulnerable_To.split(',').map(t => formatType(t)).join(', ')
            : 'None';

        // Append cells to the row
        row.appendChild(typeCell);
        row.appendChild(strongAgainstCell);
        row.appendChild(weakAgainstCell);
        row.appendChild(resistantToCell);
        row.appendChild(vulnerableToCell);

        tableBody.appendChild(row);
    });
}

// Populate type dropdowns for the calculator
function populateTypeDropdowns() {
    Papa.parse('types.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const types = results.data.map(type => type.Name);
            populateSelectOptions('type1', types);
            populateSelectOptions('type2', types);
        },
        error: function(error) {
            console.error('Error loading types CSV:', error);
            alert('Failed to load types for calculator.');
        }
    });
}

function populateSelectOptions(selectId, types) {
    const select = document.getElementById(selectId);
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.toLowerCase();
        option.textContent = capitalize(type);
        select.appendChild(option);
    });
}

// Calculate the counter effectiveness based on selected types
function calculateCounter() {
    const type1 = document.getElementById('type1').value;
    const type2 = document.getElementById('type2').value;

    if (!type1 && !type2) {
        alert('Please select at least one type.');
        return;
    }

    Papa.parse('types.csv', {
        download: true,
        header: true,
        complete: function(results) {
            const typesData = results.data;
            const multiplier = getMultiplier(typesData, type1, type2);
            displayCalculationResult(multiplier);
        },
        error: function(error) {
            console.error('Error loading types CSV:', error);
            alert('Failed to perform calculation.');
        }
    });
}

function getMultiplier(typesData, type1, type2) {
    let multiplierMap = {};

    // Initialize multiplierMap with all types at 1x
    typesData.forEach(type => {
        multiplierMap[type.Name.toLowerCase()] = 1;
    });

    // Process type1
    if (type1) {
        const t1 = typesData.find(t => t.Name.toLowerCase() === type1);
        if (t1) {
            // Strong against: deals double damage
            t1.Strong_Against.split(',').forEach(t => {
                if (t) multiplierMap[t.trim().toLowerCase()] *= 2;
            });
            // Weak against: deals half damage
            t1.Weak_Against.split(',').forEach(t => {
                if (t) multiplierMap[t.trim().toLowerCase()] *= 0.5;
            });
        }
    }

    // Process type2
    if (type2) {
        const t2 = typesData.find(t => t.Name.toLowerCase() === type2);
        if (t2) {
            // Strong against: deals double damage
            t2.Strong_Against.split(',').forEach(t => {
                if (t) multiplierMap[t.trim().toLowerCase()] *= 2;
            });
            // Weak against: deals half damage
            t2.Weak_Against.split(',').forEach(t => {
                if (t) multiplierMap[t.trim().toLowerCase()] *= 0.5;
            });
        }
    }

    return multiplierMap;
}

function displayCalculationResult(multiplierMap) {
    const resultDiv = document.getElementById('calculation-result');
    resultDiv.innerHTML = ''; // Clear previous results

    const sortedTypes = Object.keys(multiplierMap).sort((a, b) => multiplierMap[b] - multiplierMap[a]);

    // Display types with multipliers greater than 1
    const strongAgainst = sortedTypes.filter(type => multiplierMap[type] > 1);
    // Display types with multipliers less than 1
    const weakAgainst = sortedTypes.filter(type => multiplierMap[type] < 1);

    let resultHTML = '<h3>Counter Effectiveness</h3>';

    if (strongAgainst.length > 0) {
        resultHTML += '<p><strong>Super Effective Against:</strong></p><ul>';
        strongAgainst.forEach(type => {
            resultHTML += `
                <li>
                    <span class="type">
                        ${capitalize(type)} 
                        <img src="images/types/${type}.svg" alt="${capitalize(type)} Type" class="type-icon">
                    </span>
                    <span class="multiplier">x${multiplierMap[type]}</span>
                </li>
            `;
        });
        resultHTML += '</ul>';
    } else {
        resultHTML += '<p><strong>Super Effective Against:</strong> None</p>';
    }

    if (weakAgainst.length > 0) {
        resultHTML += '<p><strong>Not Very Effective Against:</strong></p><ul>';
        weakAgainst.forEach(type => {
            resultHTML += `
                <li>
                    <span class="type">
                        ${capitalize(type)} 
                        <img src="images/types/${type}.svg" alt="${capitalize(type)} Type" class="type-icon">
                    </span>
                    <span class="multiplier">x${multiplierMap[type]}</span>
                </li>
            `;
        });
        resultHTML += '</ul>';
    } else {
        resultHTML += '<p><strong>Not Very Effective Against:</strong> None</p>';
    }

    resultDiv.innerHTML = resultHTML;
}

// Helper functions
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatType(type) {
    return `
        <span class="type">
            ${capitalize(type.trim())}
            <img src="images/types/${type.trim().toLowerCase()}.svg" alt="${capitalize(type.trim())} Type" class="type-icon">
        </span>
    `;
}