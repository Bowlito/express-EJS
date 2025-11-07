import yup from '../config/yup.config.js'
import personneRepository from '../repositories/personnes.repository.js'





import filmRepository from "../repositories/films.repository.js"



const show = async (req, res, next) => {
    const personnes = await personneRepository.findAll()
    if (personnes) {
        res.render('personnes', {
            "personnes": personnes,
            "erreurs": null
        })
    } else {
        res.render('personnes', {
            personnes: [],
            erreurs: ["Problème de récupération de données"]
        })

    }
}
const add = async (req, res, next) => {

    personneSchema
        .validate(req.body, { abortEarly: false })
        .then(async () => {
            req.session.firstname = req.body.prenom
            const p = await personneRepository.save(req.body)
            if (p == null) {
                res.render('personnes', {
                    erreurs: ["Problème d'insertion"],
                    personnes: personneRepository.findAll()
                })
            } else {
                console.log(p);
                
                res.redirect('/personnes')

            }
        })
        .catch(async err => {
            console.log(err);
            const personnes = await personneRepository.findAll()
            res.render('personnes', {
                erreurs: err.errors,
                personnes
            })
        })



}

const remove =  async (req, res, next) => {
    const id = req.params.id
    await personneRepository.erase(id)
    res.redirect('/personnes')
}




//const updatePersonne = async (req, res, next) => {}

export default { show, add, remove }