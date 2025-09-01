import express, { Router } from 'express';

//Ici, on gère les routes relatives aux personnes
const routeur = express.Router()

routeur.get('/', (req, res) => {
    console.log("adresse");
    
})

routeur.post('/', (req, res) => {

})

export default routeur