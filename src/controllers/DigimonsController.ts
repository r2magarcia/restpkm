import { Request, Response } from "express";
import DigimonsService from "../services/DigimonsService";

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

export function StrongTo(req: Request, res: Response) {
    try {
        const id1 = req.params.dgm1 && +req.params.dgm1 || undefined;
        const id2 = req.params.dgm2 && +req.params.dgm2 || undefined;
        if(!id1 || !id2 ){ throw "Se requiere el ID del digimon."}

        const digimon1 = DigimonsService.get(id1);
        const digimon2 = DigimonsService.get(id2);

        digimon1.type.map(e=>console.log(e));

        res.status(200).send("digimon");
    } catch (error) {
        res.status(400).send(error);
    }
}

export function WeakTo(req: Request, res: Response) {
    try {
        const id1 = req.params.dgm1 && +req.params.dgm1 || undefined;
        const id2 = req.params.dgm2 && +req.params.dgm2 || undefined;
        if(!id1 || !id2 ){ throw "Se requiere el ID del digimon."}
        // const digimon = DigimonsService.getByType(type);
        // res.status(200).json(digimon);
    } catch (error) {
        res.status(400).send(error);
    }
}