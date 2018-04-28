var mongoose = require('mongoose');

var unusualPatternSchema = mongoose.Schema({
    click_sequence:{
        type: String,
        required: true
    }
});

UnusualPatterns = module.exports = mongoose.model('UnusualPatterns', unusualPatternSchema);

module.exports.getUnusualPatterns = function(callback){
    UnusualPatterns.find(callback);
}

module.exports.addUnusualPatterns = function(unusualPattern, callback){
    UnusualPatterns.create(unusualPattern, callback);
}