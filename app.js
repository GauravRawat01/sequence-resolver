// Importing Node packages
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var qs = require('querystring');
var events = require('events');
var eventEmitter = new events.EventEmitter();

// Connecting to DB
mongoose.connect('mongodb://localhost/sequencedb');
var db = mongoose.connection;

// Models
Users = require('./models/users');
Clicks = require('./models/clicks');
UnusualPatterns = require('./models/unusualpatterns.js');

// Initializing app
var app = express();
app.use(express.static(path.join(__dirname+'/client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// App view engine
app.set('views', path.join(__dirname+"/client"));
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());

var unusualPatternClicks =[]

// Events
var sendAlertsToUsers = function sendAlertsToUsers(){
    console.log("Send alerts to usrs regarding an unusual pattern");
    // TODO ** Code to send alert to users
}

eventEmitter.on('sendAlerts', sendAlertsToUsers);

var checkForUnusualPattern = function checkForUnusualPattern(){
    console.log("Checking for unusual patterns");
    var unsualPatterns = [];
    var latestCLicks = [];
    UnusualPatterns.getUnusualPatterns(function(err, patterns){
        if(err) throw err;
        unusualPatterns = patterns;
    })
    var maxlength =0;
    for(var i=0; i< unusualPatterns.length; i++){
        if(unusualPatterns[i].click_sequence.split(","),length > maxlength){
            maxlength = unusualPatterns[i].click_sequence.split(","),length;
        }
    }
    Clicks.getLatestClicks(maxlength, function(err, clicks){
        if(err) throw err;
        latestClicks = clicks;
    })
    for(var i =0; i< unusualPatterns.length; i++){
        var currentLength = unusualPatterns[i].click_sequence.split(",").length;
        var currentClickSequence = "";
        for(var j=currentLength -1; j=0; j--){
            if(j==0){
                currentClickSequence = currentClickSequence + latestClicks[j].click_num + ",";
            }else{
                currentClickSequence = currentClickSequence + latestClicks[j].click_num;
            }
        }
        if(currentClickSequence.localeCompare(unusualPatterns[i].click_sequence)){
            // TODO ** Add the respective click enteries to the "unusualPatternClicks" array declared above.
            eventEmitter.emit('sendAlerts');
        }
    }
}

eventEmitter.on('checkForUnusualPattern', checkForUnusualPattern);

// App Routes
app.get('/', function(req, res){
    res.redirect('/home');
})

app.get('/home', function(req, res){
    res.sendFile('/app.html',{root:'./client'});
})

app.post('/gridpage', function(req, res){
    console.log(req.body);
    console.log(req.body['uname']);
    Users.getUserByName(req.body['uname'], function(err, user){
        if(err){
            res.sendFile('./register.html',{root:'./client'});
        }
        if(user == []){
            console.log("Adding User");
            var user = {username: req.body['uname']};
            Users.addUser(user, function(err, user){
                if(err) throw err;
                res.sendFile('/gridpage.html',{root:'./client'});
            })
        }else{
            res.sendFile('/gridpage.html',{root:'./client'});
        }
    })
})

app.post('/getUserByUsername', function(req, res){
    Users.getUserByName(req.body['uname'], function(err, user){
        if(err) throw err;
        res.json(user);
    })
})

app.post('/addClick', function(req, res){
    var username = req.body['username'];
    var click_num = req.body['click_num'];
    var clickToAdd={
        username: username,
        click_num: click_num
    }
    Clicks.addClick(clickToAdd, function(req, res){
        if(err) throw err;
        console.log("Click Registered");
        eventEmitter.emit('checkForUnusualPattern');
    })
})

app.get('/clicks', function(req, res){
    Clicks.getClicks(function(err, clicks){
        if(err) throw err;
        res.json(clicks);
    })
})

app.get('/clicks/:count', function(req, res){
    var count = req.params.count;
    Clicks.getLatestClicks(count, function(err, clicks){
        if(err) throw err;
        res.json(clicks);
    })
})

app.get('./unusualpatterns', function(req, res){
    UnusualPatterns.getUnusualPatterns(function(err, patterns){
        if(err) throw err;
        res.json(patterns);
    })
})

// Port Configuration
app.listen(8080, function(){
    console.log("Application listening on port 8080");
})