import { Request, Response } from "express";
import DigimonsService from "../services/DigimonsService";
import {MonsterTypeI} from "../interfaces/MonsterTypeI";

export function getAll(_: any, res: Response) {
    const digimons = DigimonsService.getAll();
    res.status(200).json(digimons);
}

export function get(req: Request, res: Response) {
    try {
        const id = req.params.id && +req.params.id || undefined;
        if(!id){ throw "Se requiere el ID del digimon."}
        const digimon = DigimonsService.get(id);
        res.status(200).json(digimon);
    } catch (error) {
        res.status(400).send(error);
    }
}

export function getByName(req: Request, res: Response) {
    try {
        const name = req.params.name || undefined;
        if(!name){ throw "Se requiere el ID del digimon."}
        const digimon = DigimonsService.getByName(name);
        res.status(200).json(digimon);
    } catch (error) {
        res.status(400).send(error);
    }
}

export function getByType(req: Request, res: Response) {
    try {
        const type = req.params.type || undefined;
        if(!type){ throw "Se requiere el ID del digimon."}
        const digimon = DigimonsService.getByType(type);
        res.status(200).json(digimon);
    } catch (error) {
        res.status(400).send(error);
    }
}

export function getStronger(req: Request, res: Response) {
    try {
        // let winner:number=0;

        const id1 = req.params.dg1 && +req.params.dg1 || undefined;
        const id2 = req.params.dg2 && +req.params.dg2 || undefined;
        // console.log(id1, id2);
        if(!id1 || !id2 ){ throw "Se requiere el ID del digimon."}

        const digimon1 = DigimonsService.get(id1);
        const digimon2 = DigimonsService.get(id2);
        // console.log(digimon1);
        // console.log(digimon2);
        
        // digimon1.type.map(e=>console.log(e));
       const dg1type: MonsterTypeI[] = digimon1.type;
       const dg2type: MonsterTypeI[] = digimon2.type;
       let foundStrong:boolean=false;
       let foundWeak:boolean=false;
    //    if(dg1type[0].strongAgainst.indexOf(dg2type[0].name)>-1  || )
        dg1type.forEach(e=>{
            console.log(e);
            foundStrong = dg2type.some(r=>e.strongAgainst.includes(r.name));
            foundWeak = dg2type.some(r=>e.weakAgainst.includes(r.name));
        })
        let winner=0;
        winner+= foundStrong?1:0;
        winner-= foundWeak?1:0;
        
        switch(true){
            case (winner>0):
                res.status(200).send(`${digimon1.name} es fuerte contra ${digimon2.name}`);
                break;
            case (winner<0):
                res.status(200).send(`${digimon1.name} es debil contra ${digimon2.name}`);
                break;
            case (winner==0):
                res.status(200).send(`${digimon1.name} es neutral contra ${digimon2.name}`);
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
        const digimon = DigimonsService.create(name,type,img);
        res.status(200).json(digimon);
    } catch (error) {
        res.status(400).send(error);
    }
}