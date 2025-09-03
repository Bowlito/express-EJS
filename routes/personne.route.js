import express from 'express';
import PersonneController from '../controllers/personne.controller.js';
//Ici, on gère les routes relatives aux personnes
const routeur = express.Router()

//Mapping entre route et controller
routeur.get('/', PersonneController.show)
routeur.get('/:id', PersonneController.remove)
routeur.post('/', PersonneController.add)

export default routeur