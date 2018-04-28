// Importing Mongoose
var mongoose = require('mongoose');

// Defining User Schema
var userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    }
})

// exporting User Model
var Users  = module.exports = mongoose.model('Users', userSchema);

// exporting CRUD operations on User model
module.exports.getUsers = function(callback){
    Users.find(callback);
}

module.exports.getUserById = function(id, callback){
    var query = {_id: id};
    Users.findById(query, callback);
}

module.exports.getUserByName = function(name, callback){
    var query = {username: name};
    Users.find(query, callback);
}

module.exports.addUser = function(user, callback){
    Users.create(user, callback);
}

module.exports.updateUsers = function(id, user, options, callback){
    var query = {_id:id};
    var updatedUser = {
        username:user.username
    }
    Users.findOneAndUpdate(query, updatedUser, options, callback);
}

module.exports.deleteUsers = function(id,callback){
    var query= {_id:id};
    User.remove(query,callback);
}