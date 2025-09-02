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

const personnes = [
    { id: 1, nom: "Wick", prenom: "John", age: 45 },
    { id: 2, nom: "Dalton", prenom: "Jack", age: 55 },
    { id: 3, nom: "Maggio", prenom: "Sophie", age: 33 },
]


const showPersonnes = (req, res, next) => {

    const SELECT = 'SELECT * FROM personnes'
    const query = connection.query(SELECT, (error, resultat) => {
        console.log(query.sql);
        console.log(resultat);


        if (resultat) {
            res.render('personnes', {
                personnes: resultat,
                erreurs: null
            })
        }
    })
}

const addPerson = (req, res, next) => {



    personneSchema

        .validate(req.body, { abortEarly: false })
        .then(() => {
            const INSERT = `INSERT INTO personnes VALUES (NULL, "${req.body.nom}", "${req.body.prenom}", "${req.body.age}")`
            const query = connection.query(INSERT, (error, resultat) => {
                console.log(query.sql);
                console.log(error);
            })
            req.session.firstname = req.body.prenom
            res.redirect('/personnes')
        })
        .catch(err => {
            res.render('personnes', {
                erreurs: err.errors,
                personnes
            })
        })


}

const deleteUser = (req, res, next) => {


    const id = req.params.id
    const index = personnes.findIndex(p => p.id == id)
    
    if (index != -1) {
        const DELETE = `DELETE FROM personnes WHERE id = "${index}"`
        const query = connection.query(DELETE, (error, resultat) => {
            console.log(query.sql);
            console.log(error);
        })
    } else {
        alert('Suppression impossible')
    }


    res.redirect('/personnes')
}

export default { showPersonnes, addPerson, deleteUser }
