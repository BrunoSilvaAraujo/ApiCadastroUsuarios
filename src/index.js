const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./controller/authController');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', router)

app.listen(port, function(){
	console.log(`\nSERVIDOR RODANDO NA PORTA:: "${port}"`)
	console.log('TIME: '+ Date.now())
})
