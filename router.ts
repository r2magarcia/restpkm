import express from 'express';
import * as DigimonsController from './src/controllers/DigimonsController';
import * as PokemonController from './src/controllers/PokemonController';


export const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World with Typescript!')
})

router.get('/ts', (req, res) => {
    res.send('Typescript es lo máximo!')
})

router.get('/digimons', DigimonsController.getAll);
router.get('/digimons/:id', DigimonsController.get);
router.get('/digimons/name/:name', DigimonsController.getByName);
router.get('/digimons/type/:type', DigimonsController.getByType);
router.get('/digimons/stronger/:dg1/:dg2', DigimonsController.getStronger);
router.get('/digimons/new/:name/:type/:img', DigimonsController.create);

router.get('/pokemons', PokemonController.getAll);
router.get('/pokemons/:number', PokemonController.get);
router.get('/pokemons/name/:name', PokemonController.getByName);
router.get('/pokemons/type/:type', PokemonController.getByType);
router.get('/pokemons/stronger/:dg1/:dg2', PokemonController.getStronger);
router.get('/pokemons/new/:name/:type/:img', PokemonController.create);

router.post("/", (req, res) => {
    console.log("Cuerpo:", req.body);
    res.status(200).send(req.body);
});
