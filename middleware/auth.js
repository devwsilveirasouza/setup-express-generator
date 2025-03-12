module.exports = function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/login');  // Se não estiver logado, redireciona para login
    }
    next(); // Se estiver logado, permite continuar
};
