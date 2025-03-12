const bcrypt = require('bcryptjs');
const db = require('./database');

async function createUser() {
    const hashedPassword = await bcrypt.hash('senha123', 10);
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['admin', hashedPassword], (err) => {
        if (err) console.error(err.message);
        else console.log('Usuário criado!');
    });
}

createUser();
