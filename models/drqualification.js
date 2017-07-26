/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DrQualificationSchema = Schema(
        {
            qualification:{type: String, required: true},
            yearacquired:{type: Number, required: true},  
            yearsofexperience:{type: Number, required: true},
            drbiodata:{type:Schema.ObjectId, ref:'DrBiodata', required:true},
            drareaofspecialization:{type:Schema.ObjectId, ref:'DrAreaOfSpecialization', required:true}
            
    });


DrQualificationSchema
        .virtual('url')
        .get(function(){
           return '/doctor/qualification/' + this._id;
        });
        

module.exports = mongoose.model('DrQualification', DrQualificationSchema);
