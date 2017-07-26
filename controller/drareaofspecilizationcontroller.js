/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var DrAreaOfSpecialization = require('../models/drareaofspecialization');
var DrQualification = require('../models/drqualification');
var async = require('async');

exports.areaofspecialization_create_get = function (req,res){
    
  res.send('Areaofspecialization Page not yet implemented');
};

exports.areaofspecialization_create_post = function (req,res){
    res.send('Areaofspecialization Error Page not yet implemented');
};

exports.areaofspecialization_delete_get = function (req,res){
    res.send('Areaofspecialization delete Page not yet implemented');
};

exports.areaofspecialization_delete_post = function (req,res){
    res.send('Areaofspecialization delete error Page not yet implemented');
};

exports.areaofspecialization_update_get = function (req,res){
    res.send('Areaofspecialization Update Page not yet implemented');
};

exports.areaofspecialization_update_post = function (req,res){
    res.send('Areaofspecialization Update Error Page not yet implemented');
};

exports.areaofspecializationlist_get = function (req,res, next){
     DrAreaOfSpecialization.find()
              .sort([['areaofspecialization', 'ascending']])
              .exec(function(err,specialization_list){
                  if(err){
                      return next(err);
                  }else{
                      
                       res.render('specialization', { title: 'List of Specialization',specialization: specialization_list});
                  }
              });
    //res.send('Areaofspecialization List Page not yet implemented');
};

exports.areaofspecialization_by_doctor = function (req,res, next){
    
    DrAreaOfSpecialization.findById(req.params.id)
                  .exec(function (err,areaofspecialization){
                      if(err){
                          console.log('Error from specialization query: '+ err);
                          return next(err);
                      }else{
                          DrQualification.find({'drareaofspecialization': req.params.id})
                            .populate('drbiodata')
                            .exec(function (err,qualification){
                                if(err){
                                    console.log('Error query from qualification:' +err);
                                    return next(err);
                                }else{
                                      console.log('Drbiodata from qualification:' +qualification.drbiodata);
                                    res.render('specialization_by_doctor',{title:'DoctorApp',qualification:qualification, specialization: areaofspecialization});
                                }
                            });
                      }
                  });
        
    /*async.parallel({
     areaofspecialization: function (callback){
          DrAreaOfSpecialization.find(req.params.id)
                  .exec(callback);
      },   
        
     qualification: function (callback){
         DrQualification.findById({'drareaofspecialization': req.params.id})
                 .populate('drbiodata')
                 .exec(callback);
     }
     , function(err, results) {
             if(err){
                console.log('Query Error:' +err);
                return next(err);
                
            }
                res.render('specialization_by_doctor',{title:'DoctorApp',qualification:results.qualification, specialization: results.areaofspecialization});
                 //res.send('Doctors for each specialization not yet implemented');
            
        }   
    });*/
   
};
