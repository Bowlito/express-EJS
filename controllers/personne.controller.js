const showPersonnes = (req, res, next) => {
    //res.end("<p>Liste des personnes</p>")
    res.render('personnes')
}

const addPerson = (req, res, next) => {
    const { nom, prenom, age } = req.body
    res.end(`Bonjour ${prenom} ${nom}, vous avez ${age} ans.`)
    console.log(req.body);
    
}


export default { showPersonnes, addPerson }
