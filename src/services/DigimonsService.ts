import { DigimonI } from "../interfaces/DigimonInterfaces";
import { MonsterTypeI } from "../interfaces/MonsterTypeI";
const db = require('../db/Digimons.json');

module DigimonsService { 
    export function getAll(): Array<DigimonI> {
        const digimons: Array<DigimonI> = db;
        return digimons
    }
    export function get(id: number): DigimonI {
        const digimons: Array<DigimonI> = db;
        const digimon: Array<DigimonI> = digimons.filter(e => e.id === id);
        if (digimon.length < 1) {
            throw "No se encontró el digimon"
        }
        return digimon[0];
    }
    export function getByName(name: string): Array<DigimonI> {
        const digimons: Array<DigimonI> = db;
        const matches: Array<DigimonI> = digimons.filter(function(el) {
            return el.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) > -1;
        })
        if (matches.length < 1) {
            throw "No se encontró el digimon"
        }
        return matches;
    }
    
    export function getByType(type: string): Array<DigimonI> {
        const digimons: Array<DigimonI> = db;
        let matches: Array<DigimonI> = [];
        digimons.forEach(digimon => {
            const found = digimon.type.filter(e => e.name.toLowerCase() === type.toLowerCase());
            if (found.length>0) {
                matches.push(digimon);
            }
        })
         
        if (matches.length < 1) {
            throw "No se encontró el tipo"
        }
        return matches;
    }

    export function create(name:string,nametype:string,img:string):DigimonI{
        const digimons: Array<DigimonI> = db;
        const id=digimons.length+1;
        const type:MonsterTypeI={
            name:nametype,
            strongAgainst:[],
            weakAgainst:[]
        }
        const digimon:DigimonI={
            id:id,
            name:name,
            type:[type],
            img:img,
        }
        digimons.push(digimon);
        return digimon;
    }
}

export default DigimonsService;
