const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../database');

// Página de login
router.get('/login', (req, res) => {
    res.render('login', { message: null });
});

// Processo de login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.status(500).send('Erro no servidor.');
        }
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('login', { message: 'Usuário ou senha inválidos' });
        }

        req.session.userId = user.id;  // Armazena o ID do usuário na sessão
        res.redirect('/dashboard');    // Redireciona para a área protegida
    });
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;
