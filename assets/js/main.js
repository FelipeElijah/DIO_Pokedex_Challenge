const limit = 10;
let offset = 0;
const maximumOfPokemons = 721;

function convertPokemonToList(pokemon){
    return `
        <li class="pokemon ${pokemon.type}" id="pokemonIntro">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.img}"
                     alt="${pokemon.name}">
            </div>
        </li>
    </a>
    `
}

const pokemonList = document.getElementById('pokemonList');
const LoadButton = document.getElementById('LoadButton');
const pokemonIntro = document.getElementById('pokemonIntro');

function loadPokemons (offset,limit) {
    pokeApiModule.getPokemons(offset,limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToList).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemons (offset,limit);

LoadButton.addEventListener('click', () => {offset += limit

    const numberWithNexPage = offset + limit;
    if(numberWithNexPage >= maximumOfPokemons){
        const newLimit = maxRecords - offset;
        loadPokemons(offset, newLimit);
        LoadButton.parentElement.removeChild(LoadButton);

    } else{
        loadPokemons(offset,limit);
    }});

//pokemonIntro.addEventListener('click',)