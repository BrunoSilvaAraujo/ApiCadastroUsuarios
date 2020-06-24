const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

// Função geradora de Token
function generatorToken (params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

// Rota de criação de usuario
router.post('/register', async function(req, res) {
        const { email } = req.body;

        try{
        if (await User.findOne({ email }))
          return res.status(400).send({Atenção: 'Este email já existe!'});

        const user =  await User.create(req.body);

        user.password = undefined;

        return res.send({
            user,
            token: generatorToken({ id: user.id }),
        });
    }catch(err) {
        return res.status(400).send({error:'Registro inváldo!'})
    }
});

// Rota de autenticação de usuário pelo email e senha
router.post('/authentication', async function(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) 
       return res.status(400).send({ error: 'Usuário não exite!'});

    if (!await bcrypt.compare(password, user.password))
       return res.status(400).send({ error: 'Senha inválida!'});
    
    user.password = undefined;

    res.send({ 
        user, 
        token: generatorToken({ id: user.id }),
    });
}),

module.exports = router;
