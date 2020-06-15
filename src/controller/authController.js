const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Rota de criação de tabela de usuario recebendo os dados do usuario
// verifica se o usuario ja existe, se sim retorna erro
// faz com que nao retorne a senha para o usuario (linha 19)
router.post('/register', async function(req, res) {
        // desestrutura a requisição, retornando apenas o email para a verificação
        const { email } = req.body;

        try{
        // verifica se o usuario atraves do email ja existe
        if (await User.findOne({ email }))
          return res.status(400).send({Atenção: 'Este email já existe!'});

        const user =  await User.create(req.body);

        user.password = undefined;

        return res.send({user});
    }catch(err) {
        return res.status(400).send({error:'Registro inváldo!'})
    }
});

router.post('/authentication', async function(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) 
       return res.status(400).send({ error: 'Usuário não exite!'});

    if (!await bcrypt.compare(password, user.password))
       return res.status(400).send({ error: 'Senha inválida!'});
    
    user.password = undefined;
    res.send({ user });
})

module.exports = router;