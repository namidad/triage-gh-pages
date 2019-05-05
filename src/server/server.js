const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');


const Method = require('./method');
const User = require('./user');
const Victims = require('./victims');

app.use(bodyparser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept'); // add remove headers according to your needs
    next()
  })

mongoose.connect('mongodb+srv://namidad:Namidad12@triage-su1vl.gcp.mongodb.net/triage?retryWrites=true').then(()=>{});

app.listen(4000, ()=>console.log('server started on port 4000.'));

app.post('/method', (req, res, next) => {
    Method.findById(req.body.id).then((
        method => {
            method.isUsed=req.body.isUsed;
            method.save();
            res.json(true);
        }
    )); 
});

app.post('/createUser', (req,res,next)=>{
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password
    });
    user.save().then(result=>{
        res.json(true);
    }).catch(err=>console.log(err));
});

app.post('/createVictim', (req,res,next)=>{
    const victim = new Victims({
    _id: new mongoose.Types.ObjectId(),
    color: req.body.color,
    lat: req.body.lat,
    lng: req.body.lng,
    injury: req.body.injury
    });
    victim.save().then(result=>{
        res.json(true);
    }).catch(err=>console.log(err));
});

app.get('/getVictims', (req,res,next)=>{
    Victims.find().exec().then(victims=>{
        res.json(victims);
    }).catch(err=>console.log(err));
})


app.get('/getUsers', (req,res,next)=>{
    User.find().exec().then(users=>{
        res.json(users);
    }).catch(err=>console.log(err));
})

app.post('/login', (req,res,next) => {
    const login = req.body.username;
    const pass = req.body.password;
    User.findOne({username: login, password: pass}, (err,user)=>{
        if(err){
            res.json(false);
        }
        if(!user){
            res.json(false);
        } else {
            res.json(true);
        }
        
    })
});
