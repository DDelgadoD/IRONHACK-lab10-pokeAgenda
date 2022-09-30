// Reto 1: Hacer un fetch a la PokéAPI y mostrar el nombre de un pokemon en un console.log
// Reto 2: Hacer un html con un input y una lista, y darle estilo
// Reto 3: Hacer que al pulsar una tecla en el input se vea en un console.log el valor del input
// Reto 4: Hacer un array con la información de los 151 primeros Pokémon
// Reto 5: Mostrar en la lista el nombre y la imagen de los Pokémon

/* Helpers */
const addlistener = (where, handler, func) =>
    document.querySelector(where).addEventListener(handler, func);
const value = (where) => document.querySelector(where).value;

/* Variables globales */
const allPokemons = document.createElement("div");
allPokemons.classList.add("pokemon");
let allPokemonsList = [];


/* Funciones Ejercicio */

const getThemAll = async (inicio, final) => {
    let i = inicio;

    while (i <= final) {
        url = "https://pokeapi.co/api/v2/pokemon/" + i;
        await fetch(url)
            .then((response) => response.json())
            .then((json) => {
                const list = document.querySelector(".pokemon");
                const a = document.createElement("a");
                a.classList.add("panel-block", "center");
                list.appendChild(a);
                a.innerHTML += `<span><img src= ${json.sprites.front_default} alt= ${json.name}></span> ${json.name}`;
            });

        i += 1;
    }

}; 

const filter = () => {
    var re = new RegExp(value("#search"), "i");
    let selectedPokemons = document.createElement("div");
    selectedPokemons.classList.add("pokemon");

    if (value("#search") == "") {
        document.querySelector(".pokemon").innerHTML = allPokemons.innerHTML;
    } else {
        document.querySelector(".pokemon").innerHTML = "";
        
        allPokemonsList.filter((pokemon) => {
            if (pokemon.innerText.search(re) != -1) {
                selectedPokemons.appendChild(pokemon);
            }
        });
        document.querySelector(".pokemon").innerHTML +=
            selectedPokemons.innerHTML;
    }
};

/* Listeners Ejercicio */
addlistener("#search", "input", filter);

window.addEventListener("load", async () => {
    await getThemAll(1, 151);
    allPokemons.innerHTML = document.querySelector(".pokemon").innerHTML;
    allPokemonsList = [...document.querySelectorAll(".center")];
});
