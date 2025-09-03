import * as mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'express_mvc'
})

// connection.connect((err)=> {
//     if (err) {
//         console.log(err);
        
//     } else {
//         console.log(`Connexion établie avec MySql`);
        
//     }
// })
connection
    .connect()
    .then(() => console.log(`Connexion établie avec MySql`))
    .catch(err => console.log(err));

export default connection;