import { PokemonI } from "../interfaces/PokemonInterfaces";
import { MonsterTypeI } from "../interfaces/MonsterTypeI";
const db = require('../db/Pokemons.json');

module PokemonsService { 
    export function getAll(): Array<PokemonI> {
        const pokemons: Array<PokemonI> = db;
        return pokemons
    }
    export function get(number: number): PokemonI {
        const pokemons: Array<PokemonI> = db;
        const pokemon: Array<PokemonI> = pokemons.filter(e => e.number === number);
        if (pokemon.length < 1) {
            throw "No se encontró el pokemon"
        }
        return pokemon[0];
    }
    export function getByName(name: string): Array<PokemonI> {
        const pokemons: Array<PokemonI> = db;
        const matches: Array<PokemonI> = pokemons.filter(function(el) {
            return el.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) > -1;
        })
        if (matches.length < 1) {
            throw "No se encontró el pokemon"
        }
        return matches;
    }
    
    export function getByType(type: string): Array<PokemonI> {
        const pokemons: Array<PokemonI> = db;
        let matches: Array<PokemonI> = [];
        pokemons.forEach(pokemon => {
            const found = pokemon.type.filter(e => e.name.toLowerCase() === type.toLowerCase());
            if (found.length>0) {
                matches.push(pokemon);
            }
        })
         
        if (matches.length < 1) {
            throw "No se encontró el tipo"
        }
        return matches;
    }

    export function create(name:string,nametype:string,img:string):PokemonI{
        const pokemons: Array<PokemonI> = db;
        const number=pokemons.length+1;
        const type:MonsterTypeI={
            name:nametype,
            strongAgainst:[],
            weakAgainst:[]
        }
        const pokemon:PokemonI={
            number:number,
            name:name,
            type:[type],
            img:img,
        }
        pokemons.push(pokemon);
        return pokemon;
    }
}

export default PokemonsService;
