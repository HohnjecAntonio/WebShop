const express = require('express');
const router = express.Router();
const data = require('../data/mydata');
const sessions = require('../sessions/session');

//global state
let globalAccessCounter = 0;

router.use(sessions.sessionManager);

//create middleware method handler functions
function makeRouteWithCounter(template) {

    return function(req, res, next) {
        if (req.session.stavke === undefined)
            req.session.stavke = new Map();
        
        let idKat = 0;

        res.render(template, {
            idKat,
            data,
            kutija: req.session.stavke,
            sessionID: req.session.id,
            s_url: sessions.sessionURLBuilder(req.session.id)
        });
    }
} 

router.get('/', (req, res) => res.redirect('/home/getCategories?sID=' + encodeURIComponent(req.session.id)));
router.get('/getCategories', makeRouteWithCounter('home'));

router.get('/getProducts/:id', function(req, res){
    if (req.session.stavke === undefined)
        req.session.stavke = new Map();

    if (req.query.hasOwnProperty('add')){
        if (req.session.stavke.has(req.query.add))
            req.session.stavke.set(req.query.add,req.session.stavke.get(req.query.add) + 1);
        else
            req.session.stavke.set(req.query.add,1);
            
        delete req.query[req.query.add];
    }

    if (req.params.id === undefined)
        idKat = 0;
    else
        idKat = req.params.id;
    
    if (idKat == 'cart'){
        res.redirect('/cart/getAll?sID=' + encodeURIComponent(req.session.id));
    }
    else
        res.render('home', {
            idKat,
            data,
            kutija: req.session.stavke,
            sessionID: req.session.id,
            s_url: sessions.sessionURLBuilder(req.session.id)
        });
    
})

module.exports = router;