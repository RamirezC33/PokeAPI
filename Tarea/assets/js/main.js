const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const searchInput = document.querySelector("#searchPokemon"); // Campo de búsqueda
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Cargar todos los Pokémon
let allPokemon = []; // Guardamos todos los Pokémon para filtrar después

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            allPokemon.push(data); // Guardamos cada Pokémon en el array
            mostrarPokemon(data);
        });
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

// Filtrar por tipo de Pokémon
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = "";

    allPokemon.forEach(data => {
        if(botonId === "ver-todos") {
            mostrarPokemon(data);
        } else {
            const tipos = data.types.map(type => type.type.name);
            if (tipos.some(tipo => tipo.includes(botonId))) {
                mostrarPokemon(data);
            }
        }
    });
}));

// Filtrar por nombre de Pokémon
searchInput.addEventListener("input", (event) => {
    const searchValue = event.target.value.toLowerCase();
    listaPokemon.innerHTML = "";

    const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchValue));
    
    filteredPokemon.forEach(pokemon => mostrarPokemon(pokemon));
});
