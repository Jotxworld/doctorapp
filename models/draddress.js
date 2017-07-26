/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DrAddressSchema = Schema(
        {
    
            practicefirm:{type: String, required: true},
            officestradd_one:{type: String, required: true},
            officestradd_two:{type: String},
            mobilephoneno:{type: Number, min: 7, maximum: 15},
            officenumber:{type: Number, required: true, min: 7, maximum: 15},
            dremail:{type: String, required: true, lowercase:true},
            drbiodata:{type: Schema.ObjectId, ref:'DrBiodata', required: true},
            drcity:{type: Schema.ObjectId, ref:'DrCity', required: true},
            drstate:{type: Schema.ObjectId, ref:'DrLocationByCity', required:true}
                
});


DrAddressSchema
        .virtual('url')
        .get(function(){
            return '/doctor/address/' + this._id;
        });
        
        
module.exports = mongoose.model('DrAddress', DrAddressSchema);
