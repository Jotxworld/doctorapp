/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DrAreaOfSpecializationSchema = Schema(
        {
            areaofspecialization:{type:String,required: true, max:100}
    
});

DrAreaOfSpecializationSchema
        .virtual('url')
        .get(function(){
            return '/doctor/areaofspecialization/' + this._id;
        });
        
module.exports = mongoose.model('DrAreaOfSpecialization', DrAreaOfSpecializationSchema);
