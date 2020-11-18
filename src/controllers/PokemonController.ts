import { Request, Response } from "express";
import PokemonsService from "../services/PokemonsService";
import {MonsterTypeI} from "../interfaces/MonsterTypeI";

export function getAll(_: any, res: Response) {
    const pokemons = PokemonsService.getAll();
    res.status(200).json(pokemons);
}

export function get(req: Request, res: Response) {
    try {
        const number = req.params.number && +req.params.number || undefined;
        if(!number){ throw "Se requiere el ID del pokemon."}
        const pokemon = PokemonsService.get(number);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).send(error);
    }
}

export function getByName(req: Request, res: Response) {
    try {
        const name = req.params.name || undefined;
        if(!name){ throw "Se requiere el ID del pokemon."}
        const pokemon = PokemonsService.getByName(name);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).send(error);
    }
}

export function getByType(req: Request, res: Response) {
    try {
        const type = req.params.type || undefined;
        if(!type){ throw "Se requiere el ID del pokemon."}
        const pokemon = PokemonsService.getByType(type);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).send(error);
    }
}

export function getStronger(req: Request, res: Response) {
    try {
        // let winner:number=0;

        const number1 = req.params.dg1 && +req.params.dg1 || undefined;
        const number2 = req.params.dg2 && +req.params.dg2 || undefined;
        // console.log(number1, number2);
        if(!number1 || !number2 ){ throw "Se requiere el ID del pokemon."}

        const pokemon1 = PokemonsService.get(number1);
        const pokemon2 = PokemonsService.get(number2);
        // console.log(pokemon1);
        // console.log(pokemon2);
        
        // pokemon1.type.map(e=>console.log(e));
       const dg1type: MonsterTypeI[] = pokemon1.type;
       const dg2type: MonsterTypeI[] = pokemon2.type;
       let foundStrong:boolean=false;
       let foundWeak:boolean=false;
       let winner=0;
    //    if(dg1type[0].strongAgainst.indexOf(dg2type[0].name)>-1  || )
        dg1type.forEach(e=>{
            
            foundStrong = dg2type.some(r=>e.strongAgainst.includes(r.name));
            foundWeak = dg2type.some(r=>e.weakAgainst.includes(r.name));
            winner+= foundStrong?1:0;
            winner-= foundWeak?1:0;
        })
        
        
        
        switch(true){
            case (winner>0):
                res.status(200).send(`${pokemon1.name} es fuerte contra ${pokemon2.name}`);
                break;
            case (winner<0):
                res.status(200).send(`${pokemon1.name} es debil contra ${pokemon2.name}`);
                break;
            case (winner==0):
                res.status(200).send(`${pokemon1.name} es neutral contra ${pokemon2.name}`);
                break;
            default:
                res.status(200).send("No se sumar");
        }
        
    } catch (error) {
        res.status(400).send(error);
    }
}

export function create(req: Request, res: Response) {
    try {
        const name = req.params.name || undefined;
        const type= req.params.type || undefined;
        const img = req.params.img || undefined;
        if(!name || !type || !img){ throw "Datos ingresados incompletos"}
        const pokemon = PokemonsService.create(name,type,img);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).send(error);
    }
}