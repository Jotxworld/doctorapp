/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DtPtComSchema = Schema(
        {
            drbiodata:{type: Schema.ObjectId, ref: 'DrBiodata', required: true},
            ptmedhistory:{type:Schema.ObjectId,ref:'PtMedHistory', required:true},
            consultation:{
                recommendation:{type: String, required: true},
                diagnostic:{type:String, required: true},
                advice:{type:String, required:true},
                date:{type:Date, required:true}
            }
            
     
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
        
module.exports = mongoose.model('DtPtCom', DtPtComSchema);
