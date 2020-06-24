const express = require('express')
const authMiddleware = require('../middleware/auth')
const User = require('../models/user')

const router = express.Router()

router.use(authMiddleware);

// Rota de teste para verificar funcionamento  do Token
router.get('/registred', async function(req, res) {
    const user = await User.findById(req.userId)
    res.send(`<h1>Acesso concedido! </h1>
              <h3>Usuário: ${req.userId}</h3>
              <h3>Usuário: ${user}</h3>
    `)
});

module.exports = router;