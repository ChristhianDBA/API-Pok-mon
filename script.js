const pokemonContainer = document.getElementById("pokemonContainer");
const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");

let allPokemon = [];

// Cargar todos los Pokémon al iniciar la página
async function loadPokemon() {
    for (let i = 1; i <= 151; i++) {  // Puedes cambiar el rango para mostrar más Pokémon
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const data = await response.json();
            allPokemon.push(data);
            displayPokemon(data);
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    }
}

// Mostrar Pokémon individual en el contenedor
function displayPokemon(pokemon) {
    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("bg-white", "p-4", "rounded", "shadow-md", "text-center");

    pokemonElement.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="mx-auto">
        <h2 class="text-lg font-bold capitalize">${pokemon.name}</h2>
        <p class="text-gray-600">ID: ${pokemon.id}</p>
        <p class="text-gray-600">Type: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(", ")}</p>
    `;

    pokemonContainer.appendChild(pokemonElement);
}

// Buscar Pokémon y mostrar sugerencias
function searchPokemon() {
    const query = searchInput.value.toLowerCase();
    suggestions.innerHTML = "";

    // Filtrar Pokémon por nombre
    const filteredPokemon = allPokemon.filter(pokemon =>
        pokemon.name.includes(query)
    );

    // Mostrar sugerencias
    filteredPokemon.slice(0, 5).forEach(pokemon => {
        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add("p-2", "hover:bg-gray-200", "cursor-pointer");
        suggestionItem.textContent = pokemon.name;
        suggestionItem.onclick = () => {
            displaySinglePokemon(pokemon);
            suggestions.innerHTML = "";
            searchInput.value = pokemon.name;
        };
        suggestions.appendChild(suggestionItem);
    });

    // Mostrar solo los Pokémon que coinciden con el nombre buscado
    pokemonContainer.innerHTML = "";
    filteredPokemon.forEach(pokemon => displayPokemon(pokemon));
}

// Mostrar un Pokémon específico
function displaySinglePokemon(pokemon) {
    pokemonContainer.innerHTML = "";
    displayPokemon(pokemon);
}

// Cargar Pokémon al iniciar
loadPokemon();
