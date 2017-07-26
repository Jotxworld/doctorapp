/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DrLocationByCitySchema = Schema({
    state:{type:String, required: true}
   /* city:[
            {type:String, required: true}
        ]
        */            
    
});

DrLocationByCitySchema
        .virtual('url')
        .get(function(){
            return '/doctor/state/' +this._id;
        });


module.exports = mongoose.model('DrLocationByCity', DrLocationByCitySchema);
