/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var DrBiodata =  require('../models/drbiodata');
var DrAddress = require('../models/draddress');
var DrQualification= require('../models/drqualification');
var DrAreaOfSpecialization = require('../models/drareaofspecialization');
var DrLocationByCity =  require('../models/drlocationbycity');
var DrCity = require('../models/drcity');
var DrLogin = require('../models/drlogin');
var nodemailer = require('nodemailer');

//var async = require('async');
/*exports.index= function(req,res){
    res.re
};*/
exports.index = function (req,res){
    //res.send('Index Not yet implemented');
    res.render('index',{title:'DoctorApp'});
};
exports.biodata_create_get = function(req,res, next){
    //res.send('Registration Page NOT YET IMPLEMENTED'); 
    // res.render('biodata', { title: 'DoctorApp'});
    DrAreaOfSpecialization.find()
              .sort([['areaofspecialization', 'ascending']])
              .exec(function(err,specialization_list){
                  if(err){
                      console.log('Biodata Error:'+err);
                      return next(err);
                      
                  }else{
                       DrLocationByCity.find()
              .sort([['state','ascending']])
              .exec(function(err,state_list){
                  if(err){
                      return next(err);
                  }else{
                      DrCity.find()
                              .sort([['city','ascending']])
                              .exec(function (err,city_list){
                                  if(err){
                                      console.log('Error Querying Database:'+err);
                                                        return next(err);
                                  }else{
                                       //res.render('biodata', { drbiodata: drbiodata, title: 'DoctorApp',specialization: specialization_list, state:state_list, errors:errors, city:city_list});   
                                  res.render('biodata', { title: 'DoctorApp',specialization: specialization_list, state:state_list, city:city_list});
                                  }
                          
                              }); 
                      
                       //res.render('biodata', { title: 'DoctorApp',specialization: specialization_list, state:state_list});
                  }
              });
                      //res.render('biodata', { title: 'DoctorApp',specialization: specialization_list});
                      //.sort([['state','ascending'],['city','ascending']])
        
                  }
              });
              

                       
               
    
     
   //res.send('Registration Page NOT YET IMPLEMENTED'); 
};

exports.biodata_create_post =function(req,res,next){
                  
    req.checkBody('firstname', 'First name must be specified.').notEmpty();
    req.checkBody('lastname', 'Last name must be specified.').notEmpty();
    req.checkBody('othernames', 'Other names must be alphanumeric text.').isAlpha();
    req.checkBody('dateofbirth', 'Invalid date.').optional({ checkFalsy:true}).isDate();
    req.checkBody('sex','Sex must be alphanumeric text.').isAlpha();
    req.checkBody('marital_status','Marital Status must be alphanumeric text.').isAlpha();
    
    req.sanitize('firstname').escape();
    req.sanitize('lastname').escape();
    req.sanitize('othernames').escape();
    req.sanitize('firstname').trim();
    req.sanitize('lastname').trim();
    req.sanitize('othernames').trim();
    req.sanitize('dateofbirth').toDate();
    req.sanitize('sex').escape();
    req.sanitize('marital_status').escape();
    req.sanitize('sex').trim();
    req.sanitize('marital_status').trim();
    
    //Specialization
   req.checkBody('spec','Specialization must be specified').notEmpty();
    
    
    //Qualification Module
    req.checkBody('qualification','Qualification must be specificed').notEmpty();
    req.checkBody('qualificationyear','Qualification year must be specified').notEmpty();
    req.checkBody('yearsofexperience','Years of experience must be specified').notEmpty();
    
    req.sanitize('qualification').escape();
    req.sanitize('qualificationyear').escape();
    req.sanitize('yearsofexperience').escape();
    req.sanitize('qualification').trim();
    req.sanitize('qualificationyear').trim();
    req.sanitize('yearsofexperience').trim(); 
    
   
    
    req.checkBody('organization', 'Name of Organization must be specified').notEmpty();
    req.checkBody('address_one','Organization Address One must be specified').notEmpty();
    req.checkBody('mobile_phone_number', 'Mobile Phone Number must be specified').notEmpty();
    req.checkBody('office_phone_number', 'Office Phone Number must be specified').notEmpty();
    req.checkBody('email_address','Email Address must be specified').notEmpty();
    
    req.sanitize('organization').escape();
    req.sanitize('organization').trim();
    req.sanitize('address_one').escape();
    req.sanitize('address_one').trim();
    req.sanitize('address_two').escape();
    req.sanitize('address_two').trim();
    req.sanitize('mobile_phone_number').escape();
    req.sanitize('mobile_phone_number').trim();
    req.sanitize('office_phone_number').escape();
    req.sanitize('office_phone_number').trim();
    req.sanitize('email_address').trim();
    req.sanitize('email_address').escape();
    
    req.checkBody('username', 'Username must be specified').notEmpty();
    req.checkBody('password', 'Password must be specified').notEmpty();
    req.sanitize('username').escape();
    req.sanitize('username').trim();
    req.sanitize('password').escape();
    req.sanitize('password').trim();
    
   
    
                      
    
    
    var errors = req.validationErrors();
    
     //drbiodata object 
        var drbiodata =  new DrBiodata({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        othernames: req.body.othernames,
        dateofbirth: req.body.dateofbirth,
        sex: req.body.sex,
        maritalstatus: req.body.marital_status
              
    });
   
   
  
    
    if(errors){   
        var drqual = {
        qualification: req.body.qualification,
        yearacquired : req.body.qualificationyear,
        yearsofexperience: req.body.yearsofexperience,   
        drareaofspecialization: req.body.spec    
        };
        
        var draddr = {
        practicefirm: req.body.organization,
        officestradd_one: req.body.address_one,
        officestradd_two: req.body.address_two,
        mobilephoneno: req.body.mobile_phone_number,
        officenumber: req.body.office_phone_number,
        dremail: req.body.email_address,
        drcity: req.body.city    
        };
        
        var drlog = {
        username : req.body.username,
        password : req.body.password,
        email : req.body.email_address   
        };
        
        DrAreaOfSpecialization.find()
              .sort([['areaofspecialization', 'ascending']])
              .exec(function(err,specialization_list){
                  if(err){
                      return next(err);
                  }else{
                      
                        DrLocationByCity.find()
              .sort([['state','ascending'],['city','ascending']])
              .exec(function(err,state_list){
                  if(err){
                      return next(err);
                  }else{
                      DrCity.find()
                              .sort([['city','ascending']])
                              .exec(function (err,city_list){
                                  if(err){
                                      console.log('Error Querying Database:'+err);
                                                        return next(err);
                                  }else{
                                      // res.render('biodata', { drbiodata: drbiodata, title: 'DoctorApp', draddress: draddr, drlogin: drlog, qualification: drqual, specialization: specialization_list, errors:errors, city:city_list}); 
                                       res.render('biodata', { drbiodata: drbiodata, title: 'DoctorApp', draddress: draddr, qualification: drqual, specialization: specialization_list, errors:errors, city:city_list});   
                                  }
                          
                              });
                      
                      
                      
                  }
              });
        
                  }
              });
        
         //res.render('biodata', { title: 'DoctorApp',specialization: specialization_list});, specialization: specialization_list
         //res.render('biodata', { title: 'DoctorApp',specialization: specialization_lst, state:statelst, errors:errors});   
       
    }else{
       DrLogin.findOne({'username':req.body.username, 'email':req.body.email_address})
                .exec(function (err,result){
                    if(err){
                         console.log('Error Searching Login Database:'+ err);
                         return next(err);
                    }else{
                        
                      /*var transporter = nodemailer.createTransport({
                           service:'gmail',
                           auth:{
                               user:'jotxworld@gmail.com',
                               pass:'1stcl@ss'
                           }
                       }); 
                       var mailOptions = {
                           from:'jotxworld@gmail.com',
                           to:'odedeletayo@yahoo.com',
                           subject: 'Sending Email Using test using Node Js',
                           text:'This is our 1st mail, I hope it was easy!'
                       };
                       
                       transporter.sendMail(mailOptions, function (error, info){
                          if(error){
                              console.log('Error from sending email' +error);
                                return next(error);
                          } 
                       });*/
                        
                      
                        console.log('Username is:'+ req.body.username);
                        console.log('Result is:'+result);
                        if(result=== null){
                              drbiodata.save(function (err){
                                if (err){
                                        console.log('Biodata Error are:'+ err);
                                        return  next(err);        
               }
            
        });
        
        var drlogin = DrLogin(
                {
                    username : req.body.username,
                    password : req.body.password,
                    email : req.body.email_address,
                    drbiodata : drbiodata._id
            
        });
        
        drlogin.save(function (err){
            if(err){
                console.log('Error Saving Login Details:'+err);
                return next(err);
            }
        });
        
         console.log('Drbiodata data is:'+drbiodata._id);
         var spect = req.body.spec;
         console.log('Selected Area Of Specialization: '+ spect); 
        
        
         var drqualification = DrQualification(
          
            {
        qualification: req.body.qualification,
        yearacquired : req.body.qualificationyear,
        yearsofexperience: req.body.yearsofexperience,   
        drbiodata: drbiodata._id,
        drareaofspecialization: req.body.spec                                
    });
    console.log('Qualification is:' +drqualification);
         
       
       drqualification.save(function(err){
           if(err){
                return  next(err);
           }
       }); 
   var state_city = req.body.city;

   console.log('Value of Selected City: '+state_city);
     DrCity.findOne({'_id':state_city})
             .exec(function (err,selected_city){
                 if(err){
                     console.log('Error Querying DrLocationByCity:' +err);
                     return next(err);
                 }
                 
                  var draddress = DrAddress({
                    practicefirm: req.body.organization,
                    officestradd_one: req.body.address_one,
                    officestradd_two: req.body.address_two,
                    mobilephoneno: req.body.mobile_phone_number,
                    officenumber: req.body.office_phone_number,
                    dremail: req.body.email_address,
                    drbiodata: drbiodata._id,
                    drcity: req.body.city,
                    drstate:selected_city.state
                }
                    );
                     ////result_val=selected_city; 
                console.log('City and State Selected is:' +selected_city); 
                
                
                console.log('DrAddress:'+draddress);
    
    draddress.save(function(err){
        if(err){
             console.log('Error with DrAddress:' +err);
             
                        return next(err);
        }
        
          DrCity.findOne({'_id':draddress.drcity})
                  .exec(function(err,city){
                  if(err){
                      console.log('Error with DrCity Query:' +err);
                      return next(err);
                  }
                  
                       //res.render('qualification', { title: 'DoctorApp',specialization: specialization_list});
                     console.log('Name of the selected city is:' +city.city);   
                     
                     DrLocationByCity.findOne({'_id':city.state})
                             .exec(function (err,state){
                                 if(err){
                                        console.log('Error with LocationByCity Query:' +err);
                                                return  next(err);
                                 }
                                    console.log('State is:' +state.state);
                                    
                                 res.render('doctor_biodata_detail',{drbiodata: drbiodata, qualification: drqualification, title: 'DoctorApp', draddress: draddress,city:city, state:state}); 
                             });
                             
               //res.render('qualification',{drbiodata: drbiodata, specialization: specialization_list, title: 'DoctorApp'}); 
              
              });
        
        
    } );
   
             });
               
                            
                            
                            
                            console.log('Result am Undefined');
       }else{
                            //res.send('This user already exist');
                            res.render('registration_editby_login');
                        }
                     
                    }
                });
       //DrAddress.findOne({'dremail':})
        //res.send(drbiodata,drqualification);

   
       
    }
    
   //res.send('Registration Error NOT YET IMPLEMENTED'); 
};

exports.biodata_delete_get =function(req,res){
   res.send('Registration Page delete NOT YET IMPLEMENTED'); 
};

exports.biodata_delete_post =function(req,res){
   res.send('Registration Page delete Error NOT YET IMPLEMENTED'); 
};

exports.biodata_update_get =function(req,res, next){
    DrBiodata.findById(req.params.id)
            .exec(function (err,drbiodata){
                if(err){
                    console.log('Error Querying DrBiodata Schema: '+err);
                    return next(err);
                }
                res.render('biodata_update',{title:'Update Information',drbiodata:drbiodata});
            });
            
 
   //res.send('Doctor Edit  Page NOT YET IMPLEMENTED'); 
};

exports.biodata_update_post =function(req,res, next){
                   
    req.checkBody('firstname', 'First name must be specified.').notEmpty();
    req.checkBody('lastname', 'Last name must be specified.').notEmpty();
    req.checkBody('othernames', 'Other names must be alphanumeric text.').isAlpha();
    req.checkBody('dateofbirth', 'Invalid date.').optional({ checkFalsy:true}).isDate();
    req.checkBody('sex','Sex must be alphanumeric text.').isAlpha();
    req.checkBody('marital_status','Marital Status must be alphanumeric text.').isAlpha();
    
    req.sanitize('firstname').escape();
    req.sanitize('lastname').escape();
    req.sanitize('othernames').escape();
    req.sanitize('firstname').trim();
    req.sanitize('lastname').trim();
    req.sanitize('othernames').trim();
    req.sanitize('dateofbirth').toDate();
    req.sanitize('sex').escape();
    req.sanitize('marital_status').escape();
    req.sanitize('sex').trim();
    req.sanitize('marital_status').trim();
    
  
    
    var errors = req.validationErrors();
    
     //drbiodata object 
        var drbiodata =  new DrBiodata({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        othernames: req.body.othernames,
        dateofbirth: req.body.dateofbirth,
        sex: req.body.sex,
        maritalstatus: req.body.marital_status,
        _id:req.params.id      
    });
   
   
   
   if(errors){    
       res.render('biodata', { drbiodata: drbiodata, title:'Update Information Error Page', errors:errors});
         
       
    }else{
                                                                                         
                              DrBiodata.findByIdAndUpdate(req.params.id,drbiodata,{},function (err,resp){
                                if (err){
                                        console.log('Error Updating Biodata into database:'+ err);
                                        return  next(err);        
                                    }
                                    console.log('Query Result:'+resp);
                              res.send('Confirmation alert is a workin progress ')    ;
            
        });
        
                          
    }
    
   //res.send('Doctor Edit update submit Page error NOT YET IMPLEMENTED'); 
};

exports.biodata_biodatalist_get =function(req,res, next){
    
    DrAreaOfSpecialization.find()
              .sort([['areaofspecialization', 'ascending']])
              .exec(function(err,specialization_list){
                  if(err){
                      return next(err);
                  }else{
                      
                       res.render('specialization', { title: 'List of Specialization',specialization: specialization_list});
                  }
              });
   //res.send('Biodata detail Page NOT YET IMPLEMENTED'); 
};

exports.biodata_details_get =function(req,res,next){
    DrBiodata.findById(req.params.id)
            .exec(function (err,drbiodata){
                if(err){
                    console.log('Error Querying DrBiodata Schema: '+err);
                    return next(err);
                }else{
                    DrQualification.findOne({'drbiodata': req.params.id})
                            .populate('drareaofspecialization')
                            .exec(function (err,qual){
                                if(err){
                                    console.log('Error Querying DrQualification: '+err);
                                    return next(err);
                                }
                                else{
                                    DrAddress.findOne({'drbiodata':req.params.id})
                                            .populate('drcity')
                                            .exec(function(err,draddress){
                                                if(err){
                                                    console.log('Error Querying DrAddress: '+err);
                                                    return next (err);
                                                }else{
                                                    DrLocationByCity.findOne({'_id':draddress.drcity.state})
                                                            .exec(function (err,state){
                                                                if(err){
                                                                    console.log('Error Querying DrLocationByCity: '+err);
                                                                    return next (err);
                                                                }
                                                                 console.log('State:' +state);
                                                                  console.log('Qualification:' +qual);
                                                                  console.log('Drbiodata: '+drbiodata);
                                                 
                                                 console.log('Address:' +draddress.drcity.state);
                                    console.log('Specialization:' +qual.drareaofspecialization.areaofspecialization);
                                    //res.render('doctor_biodata_detail',{title:'DoctorApp',drbiodata:drbiodata, qualification:qual,specialization:qual.drareaofspecialization.areaofspecialization, draddress:draddress,city:draddress.drcity, state:state});
                                      res.render('doctor_biodata_users',{title:'DoctorApp',drbiodata:drbiodata, qualification:qual,specialization:qual.drareaofspecialization.areaofspecialization, draddress:draddress,city:draddress.drcity, state:state});          
                                                            });
                                                
                                                }
                                                
                                                
                                            });
                                   
                                }
                            });
                    
                }
                //res.render('doctor_biodata_detail',{title:'DoctorApp',drbiodata:drbiodata});
                
            });
   //res.send('Doctor Biodata Details NOT YET IMPLEMENTED'); 
};

exports.get_drlogin = function (req, res, next){
    //res.send('Login Page Not Yet Implemented');
    res.render('doctor_login');
};

exports.post_drlogin = function (req,res,next){
  res.send('Login Error Page Not Yet Implemented');  
};







