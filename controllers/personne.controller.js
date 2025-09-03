import yup from 'yup'
import { setLocale } from 'yup';
import { fr } from 'yup-locales';
import connection from '../config/db.js';


setLocale(fr)


const personneSchema = yup.object().shape({
    nom: yup
        .string()
        .required()
        .matches(/^[A-Z]{1}.{2,19}$/, "Le nom doit commencer par une majuscule et comporter entre 3 et 20 lettres"),

    prenom: yup
        .string()
        .min(3, (args) => `Le prénom doit contenir au moins ${args.min} caractères`)
        .max(20),

    age: yup
        .number()
        .required()
        .positive()
})




const showPersonnes = async (req, res, next) => {

    const SELECT = 'SELECT * FROM personnes'
    try {
        const resultat = await connection.query(SELECT)

        res.render('personnes', {
            personnes: resultat[0],
            erreurs: null
        })
    } catch (error) {
        res.render('personnes', {
            personnes: [],
            erreurs: "Problème de récup des données"
        })
    }

}

const addPerson = (req, res, next) => {


    personneSchema

        .validate(req.body, { abortEarly: false })
        .then(async () => {
            const INSERT = `INSERT INTO personnes VALUES (NULL, "${req.body.nom}", "${req.body.prenom}", "${req.body.age}")`
            try {
                await connection.query(INSERT)
                res.redirect('/personnes')
            } catch (error) {
                res.render('personnes', {
                    personnes: [],
                    erreurs: "Problème d'insertion"
                })
            }

        })
        .catch(err => {
            res.render('personnes', {
                erreurs: err.errors,
                personnes: []
            })
        })


}

const deleteUser = async (req, res, next) => {


    const id = req.params.id


    if (id != -1) {
        const DELETE = `DELETE FROM personnes WHERE id = ${id}`
        try {
            await connection.query(DELETE)
            res.redirect('/personnes')
        } catch (error) {
            res.render('personnes', {
                personnes: [],
                erreurs: "Problème de supression"
            })
        }

    }
}
export default { showPersonnes, addPerson, deleteUser }


// _________________________________________________CORRECTION ACHREF___________________________________________________________________

/* 
import * as yup from 'yup'
import { fr } from 'yup-locales'
import connection from '../config/db.js'

yup.setLocale(fr)



const personneSchema = yup.object().shape({
    nom: yup
        .string()
        .required()
        .matches(/^[A-Z]{1}.{2,19}$/, "Le nom doit commencer par une majuscule et comporter entre 3 et 20 lettres"),
    prenom: yup
        .string()
        .min(3, (args) => `Le prénom doit contenir au moins ${args.min} caractères, valeur saisie : ${args.value} `)
        .max(20),
    age: yup
        .number()
        .required()
        .positive()

})


// const personnes = [
//     { id: 1, nom: "Wick", prenom: "John", age: 45 },
//     { id: 2, nom: "Dalton", prenom: "Jack", age: 55 },
//     { id: 3, nom: "Maggio", prenom: "Sophie", age: 33 },
// ]

const showPersonnes = async (req, res, next) => {
    const SELECT = "SELECT * FROM personnes"
    try {
        const resultat = await connection.query(SELECT)
        res.render('personne', {
            personnes: resultat[0],
            erreurs: null
        })

    } catch (error) {
        res.render('personne', {
            personnes: [],
            erreurs: "Problème de récupération de données"
        })

    }
}
const addPersonne = (req, res, next) => {

    personneSchema
        .validate(req.body, { abortEarly: false })
        .then(async () => {
            req.session.firstname = req.body.prenom
            const INSERT = "INSERT INTO personnes values (null, ?, ?, ?)"
            try {
                await connection.query(INSERT, [req.body.nom, req.body.prenom, req.body.age])
            } catch (error) {
                res.render('personne', {
                    erreurs: error,
                    personnes: [] // à refaire après l'ajout de PersonneRepository
                })
            }
            res.redirect('/personne')
        })
        .catch(err => {
            console.log(err);
            res.render('personne', {
                erreurs: err.errors,
                personnes: [] // à refaire après l'ajout de PersonneRepository
            })
        })



}
const deletePersonne = async (req, res, next) => {
    const id = req.params.id
    const DELETE = "DELETE FROM personnes WHERE id=?"
    try {
        await connection.query(DELETE, id);
        res.redirect('/personne')
    } catch (error) {
        res.render('personne', {
            erreurs: ['Problème de suppression de données'],
            personnes: [] // à refaire après l'ajout de PersonneRepository
        })
    }

}

export default { showPersonnes, addPersonne, deletePersonne }
*/