const showPersonnes = (req, res, next) => {
    //res.end("<p>Liste des personnes</p>")
    res.render('personnes')
}

const addPerson = (req, res, next) => {
    res.end("Formulaire reçu")
}


export default { showPersonnes, addPerson }
