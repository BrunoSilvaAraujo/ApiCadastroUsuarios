const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./controller/authController')
const authRouter = require('./controller/authRouter')

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', router)
app.use('/', authRouter)

app.listen(port, function(){
	console.log(`\nSERVIDOR RODANDO NA PORTA:: "${port}"`)
	console.log('TIME: '+ Date.now())
})
