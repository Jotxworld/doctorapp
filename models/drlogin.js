/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DrLoginSchema = Schema(
        {
            username:{type: String, required: true, max: 100},
            password:{type: String, required: true, max: 100},
            email:{type: String, required: true, lowercase:true},
            drbiodata:{type: Schema.ObjectId, ref: 'DrBiodata', required: true}
     
});

// virtual for full name
/*DrLoginSchema
        .virtual('name')
        .get(function(){
            return this.firstname +',' +this.lastname;
        });
// virtual for drbiodata url    */    
/*DrLoginSchema
        .virtual('url')
        .get(function(){
           return 'doctor/login/' + this._id;
        });
*/        
        
module.exports = mongoose.model('DrLogin', DrLoginSchema);
