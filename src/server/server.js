const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');


const Action = require('./actionConfig');
const User = require('./user');
const Victim = require('./victims');
const Rescuer = require('./rescuer');

app.use(bodyparser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // * => allow all origins
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept'); // add remove headers according to your needs
    next()
  })

mongoose.connect('mongodb+srv://namidad:Namidad12@triage-su1vl.gcp.mongodb.net/triage?retryWrites=true').then(()=>{});

app.listen(4000, ()=>console.log('server started on port 4000.'));





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



// CREATE METHOD
app.post('/createMethod', (req, res, next) => {
    const method = new Action({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        victimsNum: req.body.victimsNum,
        rescuersNum: req.body.rescuersNum,
        isUsed: req.body.isUsed
    });
    method.save().then(result=>{
        res.json(true);
    }).catch(err=>console.log(err));
});



// UPDATE METHOD
app.post('/updateMethod', (req, res, next) => {
    Action.findById(req.body.id).then((
        method => {
            method.victimsNum = req.body.victimsNum;
            method.rescuersNum = req.body.rescuersNum;
            method.isUsed=req.body.isUsed;
            method.save();
            res.json(true);
        }
    )); 
});

// CREATE RESCUER
app.post('/createRescuer', (req, res, next) => {
    console.log(req.body);
    const rescuer = new Rescuer({
        _id: new mongoose.Types.ObjectId(),
        rescuerID: req.body.rescuerID,
        teamID: req.body.teamID,
        deviceName: req.body.deviceName,
        reports: [{
        timestamp: req.body.timestamp,
        rescuerID : req.body.rescuerID,
        priority: req.body.priority,
        sensorData: {
                timestamp: req.body.timestamp,
                pulse: req.body.pulse,
                saturation: req.body.saturation,
                breathPerMinute: req.body.breathPerMinute
        },
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        comment: req.body.comment
        }]
    });
    rescuer.save().then(result=>{
        res.json(true);
    }).catch(err=>console.log(err));
});

// RESCUER ADD REPORT
app.post('/addReportToRescuer', (req,res,next)=>{
    let report = {
        timestamp: req.body.timestamp,
        rescuerID : req.body.rescuerID,
        priority: req.body.priority,
        sensorData: {
                timestamp: req.body.timestamp,
                pulse: req.body.pulse,
                saturation: req.body.saturation,
                breathPerMinute: req.body.breathPerMinute
        },
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        comment: req.body.comment
    };

        Rescuer.findOneAndUpdate({rescuerID: req.body.rescuerID}, { $push : {reports : report}}, function (err, succ){
            if(err){
                console.log(err)
            } else {
                console.log(succ);
            }
        });
})


// CREATE VICTIM
app.post('/createVictim', (req,res,next)=>{
    const victim = new Victim({
        _id: new mongoose.Types.ObjectId(),
        currentPriority: req.body.victimID,
        state: req.body.victimID,
        victimID: req.body.victimID,
        reports: [{
            timestamp: req.body.timestamp,
            rescuerID : req.body.rescuerID,
            priority: req.body.priority,
            sensorData: {
                    timestamp: req.body.timestamp,
                    pulse: req.body.pulse,
                    saturation: req.body.saturation,
                    breathPerMinute: req.body.breathPerMinute
            },
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            comment: req.body.comment
            }],
        sensorReads : [{
            timestamp: req.body.timestamp,
            pulse: req.body.pulse,
            saturation: req.body.saturation,
            breathPerMinute: req.body.breathPerMinute
        }]
    });
    victim.save().then(result=>{
        res.json(true);
    }).catch(err=>console.log(err));
});


// ADD REPORT TO VICTIM
app.post('/addReportToVictim', (req,res,next)=>{
    let report = {
        timestamp: req.body.timestamp,
        rescuerID : req.body.rescuerID,
        priority: req.body.priority,
        sensorData: {
                timestamp: req.body.timestamp,
                pulse: req.body.pulse,
                saturation: req.body.saturation,
                breathPerMinute: req.body.breathPerMinute
        },
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        comment: req.body.comment
    };

        Victim.findOneAndUpdate({victimID: req.body.victimID}, { $push : {reports : report}}, function (err, succ){
            if(err){
                console.log("ERROR",err)
            } else {
                console.log("SUCC",succ);
            }
        });
})

// ADD SENSOR DATA TO VICTIM
app.post('/addSensorDataToVictim', (req,res,next)=>{
    let sensorData = {
        timestamp: req.body.timestamp,
        pulse: req.body.pulse,
        saturation: req.body.saturation,
        breathPerMinute: req.body.breathPerMinute
    }
    

        Victim.findOneAndUpdate({victimID: req.body.victimID}, { $push : {sensorReads : sensorData}}, function (err, succ){
            if(err){
                console.log("ERROR",err)
            } else {
                console.log("SUCC",succ);
            }
        });
})

// GET ALL VICTIMS

app.get('/getVictims', (req,res,next)=>{
    Victim.find().exec().then(victims=>{
        res.json(victims);
    }).catch(err=>console.log(err));
})

// GET ONE VICTIM

app.get('/getVictim/:id', (req,res,next)=>{
    Victim.findById(req.params.id).exec().then(victim=>{
        res.json(victim);
    }).catch(err=>console.log(err));
})