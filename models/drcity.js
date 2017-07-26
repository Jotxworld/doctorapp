/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DrCitySchema = Schema({
    
    city:{type:String, required: true},
    state:{type:Schema.ObjectId, ref:'DrLocationByCity', required: true}
});

DrCitySchema
        .virtual('url')
        .get(function(){
            return '/doctor/city/' +this._id;
        });


module.exports = mongoose.model('DrCity', DrCitySchema);
