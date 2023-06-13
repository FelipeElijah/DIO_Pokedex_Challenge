const pokeApiModule = {}

function convertPokeApiDetailsToPokemon (pokeDetails){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetails.id
    pokemon.name = pokeDetails.name
    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.img = pokeDetails.sprites.other.dream_world.front_default

    return pokemon
}

pokeApiModule.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailsToPokemon)
}

pokeApiModule.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
    .then((response)=> response.json())
    .then((jsonBody)=> jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApiModule.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error)=> console.log(error))
}