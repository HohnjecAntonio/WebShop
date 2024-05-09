var express = require('express');
var router = express.Router();
const sessions = require('../sessions/session');

router.use(sessions.sessionManager);

function makeRouteWithCounter(template) {
    return function(req, res, next) {
        res.render(template, {
            kutija: req.session.stavke,
            sessionID: req.session.id,
            s_url: sessions.sessionURLBuilder(req.session.id)
        });
    }
}

router.post('/add/:id', function(req,res){
    if (req.session.stavke.has(req.params.idKat))
        req.session.stavke.set(req.params.id,req.session.stavke.get(req.params.id)+1);
    else
        req.session.stavke.set(req.params.id,1);
    res.redirect('/cart/getAll?sID='+ req.query.sID);
});

router.post('/remove/:id', function (req,res){
    if (req.params.id <= 0) res.redirect('/getAll');

    if (req.params.id)
        if (req.session.stavke.has(req.params.idKat)){
            if (req.session.stavke.get(req.params.id))
                req.session.stavke.set(req.params.id,req.session.stavke.get(req.params.id)-1);
        }
        else{
            req.session.stavke.set(req.params.id,1);
        }
    
    res.redirect('/cart/getAll?sID='+ req.query.sID);
});

router.get('/', (req,res) => res.redirect('/cart/getAll'));
router.get('/getAll', makeRouteWithCounter('cart'));

module.exports = router;