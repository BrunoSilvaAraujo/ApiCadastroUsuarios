const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader)
       return res.status(401).send({error: 'Necessário ter um Token de autorização'})

    const parts = authHeader.split(' ');
    if(!parts.length === 2)
       return res.status(401).send({erro: 'Token inválido!'})
    
    const [schema, token] = parts;
    if(!/^Bearer$/i.test(schema))
        return res.status(401).send('Token mal formado!')

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({error: "Token Inválido!"})

        req.userId = decoded.id;
        return next();
    });
    
};