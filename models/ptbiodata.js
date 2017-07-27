/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
var PtBiodataSchema = Schema(
        {
            firstname:{type: String, required: true, max: 100},
            lastname:{type: String, required: true, max: 100},
            othernames:{type: String, required: false, max: 100},
            dateofbirth:{type: Date},
            sex:{type: String, enum:['Male','Female'], required: true},
            maritalstatus:{type: String, required: true, enum:['Single','Married','Widowed']},
            phone_number:{type: String, required:true, max: 12}
            
            
            
    
});

// virtual for full name
PtBiodataSchema
        .virtual('name')
        .get(function(){
            return this.firstname +',' +this.lastname;
        });
// virtual for drbiodata url        
PtBiodataSchema
        .virtual('url')
        .get(function(){
           return '/patient/biodata/details/' + this._id;
        });
 
PtBiodataSchema
.virtual('date_of_birth_formatted')
.get(function () {
  //return moment(this.date_of_birth).format('MMMM Do, YYYY');
  return this.date_of_birth ? moment(this.date_of_birth).format('MM-DD-YYYY') : '';
});
        
module.exports = mongoose.model('PtBiodata', PtBiodataSchema);
