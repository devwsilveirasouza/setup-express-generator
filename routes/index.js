const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const db = require('../database');

router.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard');
});

// Rota para listar clientes
router.get('/', (req, res) => {
  db.all('SELECT * FROM customers', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar clientes');
    }
    res.render('index', { title: 'Customer List', customers: rows });
  });
});

// Rota para adicionar cliente
router.post('/save', (req, res) => {
  const { name, age } = req.body;
  db.run('INSERT INTO customers (name, age) VALUES (?, ?)', [name, age], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao adicionar cliente');
    }
    res.redirect('/');
  });
});

// Rota para editar cliente
router.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  db.run('UPDATE customers SET name = ?, age = ? WHERE id = ?', [name, age, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao atualizar cliente');
    }
    res.redirect('/');
  });
});

// Rota para deletar cliente
router.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM customers WHERE id = ?', [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao deletar cliente');
    }
    res.redirect('/');
  });
});

module.exports = router;
