/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var DrQualification= require('../models/drqualification');
var DrAreaOfSpecialization = require('../models/drareaofspecialization');

exports.qualification_create_get = function (req,res, next){
    console.log('welcome to qualification');
    /*DrAreaOfSpecialization.find()
              .sort([['areaofspecialization', 'ascending']])
              .exec(function(err,specialization_list){
                  if(err){
                      return next(err);
                  }
                       res.render('qualification', { title: 'DoctorApp',specialization: specialization_list});
                                               
              });*/
            
                  //res.send('Qualification Page not yet implemented');  
};

exports.qualification_create_post = function (req,res,next){
    
res.send('Qualification Page Error not yet implemented');  
};

exports.qualification_delete_get = function (req,res){
  res.send('Qualification delete Page not yet implemented');  
};

exports.qualification_delete_post = function (req,res){
  res.send('Qualification delete Page Error not yet implemented');  
};

exports.qualification_update_get = function (req,res, next){
    DrQualification.findById(req.params.id)
     .populate('drareaofspecialization')
            .exec(function (err,qualification){
               
                if(err){
                    console.log('Error Querying DrBiodata Schema: '+err);
                    return next(err);
                }else{
                    
                     DrAreaOfSpecialization.find()
                        .sort([['areaofspecialization', 'ascending']])
                        .exec(function(err,specialization_list){
                            if(err){
                               console.log('Area of specialization Error:'+err);
                               return next(err);

                                  }
                                  
                                  res.render('qualification_update',{title:'Update Information',qualification:qualification, specialization:specialization_list,special:qualification.drareaofspecialization.areaofspecialization});
                            });
                    
                    
                }
                
            });
    
 // res.send('Qualification update Page not yet implemented');  
};

exports.qualification_update_post = function (req,res){
    
    req.checkBody('qualification','Qualification must be specificed').notEmpty();
    req.checkBody('qualificationyear','Qualification year must be specified').notEmpty();
    req.checkBody('yearsofexperience','Years of experience must be specified').notEmpty();
    
    req.sanitize('qualification').escape();
    req.sanitize('qualificationyear').escape();
    req.sanitize('yearsofexperience').escape();
    req.sanitize('qualification').trim();
    req.sanitize('qualificationyear').trim();
    req.sanitize('yearsofexperience').trim(); 
    
   
    var drqualification = new DrQualification({
        qualification: req.body.qualification,
        yearacquired : req.body.qualificationyear,
        yearsofexperience: req.body.yearsofexperience,   
        drareaofspecialization: req.body.spec,
        _id : req.params.id
       });
       
       
    var errors = req.validationErrors();
    if(errors){
                        
         DrAreaOfSpecialization.find()
            .sort([['areaofspecialization', 'ascending']])
            .exec(function(err,specialization_list){
              if(err){
                  console.log('Area of specialization Error:'+err);
                  return next(err);

              }                   
                  res.render('qualification_update',{title:'Update Information Error Page',qualification:drqualification, specialization:specialization_list, errors: errors});
            });
       
    }else{
         DrQualification.findByIdAndUpdate(req.params.id,drqualification,{},function (err,resp){
          if (err){
              console.log('Error Updating DrQualification into database:'+ err);
              return  next(err);        
          }
              console.log('Query Result:'+resp);
              res.send('Confirmation alert is a workin progress ')    ;
            
        });
        
        
        
       
    }
    
  //res.send('Qualification Update Page error not yet implemented');  
};

exports.qualification_details_get = function (req,res){
  res.send('Qualification detail Page not yet implemented');  
};

exports.qualification_qualificationlist_get = function (req,res){
  res.send('Qualification List not yet implemented');  
};
