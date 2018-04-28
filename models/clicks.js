// Importing Mongoose
var mongoose = require('mongoose');

// Defining Click Schema
var clickSchema = mongoose.Schema({
    click_num:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required : true
    },
    server_timestamp:{
        type: Date,
        default: Date.now
    }
})

// exporting Click Model
var Clicks  = module.exports = mongoose.model('Clicks', clickSchema);

// exporting CRUD operations on Click model
module.exports.getClicks = function(callback){
    Clicks.find(callback);
}

module.exports.getClicksById = function(id, callback){
    var query = {_id: id};
    Clicks.findById(query, callback);
}

module.exports.addClick = function(click, callback){
    Clicks.create(click, callback);
}

module.exports.updateClick = function(id, click, options, callback){
    var query = {_id:id};
    var updatedClick = {
        click_num:click.click_num,
        username: click.username,
        server_timestamp: click.server_timestamp
    }
    Clicks.findOneAndUpdate(query, updatedClick, options, callback);
}

module.exports.deleteClick = function(id,callback){
    var query= {_id:id};
    Click.remove(query,callback);
}

module.exports.getLatestClicks = function(count, callback){
    var countNum = parseInt(count);
    Clicks.find(callback).sort({server_timestamp:-1}).limit(countNum);
}