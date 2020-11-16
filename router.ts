import express from 'express';
import * as DigimonsController from './src/controllers/DigimonsController';

export const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World with Typescript!')
})

router.get('/ts', (req, res) => {
    res.send('Typescript es lo máximo!')
})

router.get('/digimons', DigimonsController.getAll);
router.get('/digimons/:id', DigimonsController.get);
router.get('/digimons/getbyname/:name', DigimonsController.getByName);
router.get('/digimons/getbytype/:type', DigimonsController.getByType);
router.get('/digimons/strongto/:dgm1/:dgm2', DigimonsController.StrongTo);
router.get('/digimons/getbytype/:dgm1/:dgm2', DigimonsController.WeakTo);

router.post("/", (req, res) => {
    console.log("Cuerpo:", req.body);
    res.status(200).send(req.body);
});
