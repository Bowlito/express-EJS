import express from 'express';
import PersonneController from '../controllers/personne.controller.js';
//Ici, on gère les routes relatives aux personnes
const routeur = express.Router()

//Mapping entre route et controller
routeur.get('/', PersonneController.showPersonnes)
routeur.get('/:id', PersonneController.deletePersonne)

routeur.post('/', PersonneController.addPersonne)

export default routeur