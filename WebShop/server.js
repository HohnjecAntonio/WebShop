const express = require('express');
const path = require('path');
const data = require('./data/mydata');

const homeRouter=require('./routes/home.routes');
const cartRouter=require('./routes/cart.routes');

const app = express();
app.set('views',path.join(__dirname,'views')); 
app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req,res)=>res.redirect('/home'));
app.use('/cart', cartRouter);
app.use('/home', homeRouter);

app.listen(3000);