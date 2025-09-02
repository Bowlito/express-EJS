import express from 'express';
import 'dotenv/config';
import personne from './routes/personne.route.js';
import adresse from './routes/adresse.route.js';

const app = express();

//Utiliser le Middleware body-parser
app.use(express.urlencoded())

//Mapping entre routes et le routeur
app.use("/personnes", personne)
app.use("/adresse", adresse)

//Config du moteur de template
app.set('view engine', 'ejs')
app.set('views', import.meta.dirname + '/templates')
app.set('view options', { delimiter: '?' })

app.get(['/', '/home', '/accueil'], (req, res) => {
    res.render('index',
        {
            nom: 'Wick',
            nomImportant: '<strong>Mitroglou</strong>',
            estConnecte: false,
            nombres: [2,3,8,5, 1]
        }
    )
})



app.all('/*splat', (req, res) => {
    res
        .status(404)
        .end("Page introuvable")
})

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
    console.log(`Adresse serveur : http://localhost:${PORT}`);

})