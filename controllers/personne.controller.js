const personnes = [
    { id: 1, nom: "Wick", prenom: "John", age: 45 },
    { id: 2, nom: "Dalton", prenom: "Jack", age: 55 },
    { id: 3, nom: "Maggio", prenom: "Sophie", age: 33 },
]


const showPersonnes = (req, res, next) => {
    //res.end("<p>Liste des personnes</p>")
    res.render('personnes', { personnes })


}

const addPerson = (req, res, next) => {

    personnes.push(req.body)
    req.session.firstname = req.body.prenom
    res.redirect('/personnes')

    // res.render('personnes',{personnes})  

}

const deleteUser = (req, res, next) => {


    const id = req.params.id
    const index = personnes.findIndex(p => p.id == id)
    if (index != -1) {
        personnes.splice(index, 1)
    } else {
        alert('Suppression impossible')
    }


    res.redirect('/personnes')
}

export default { showPersonnes, addPerson, deleteUser }
