/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
DrAddress = require('../models/draddress');
DrLocationByCity = require('../models/drlocationbycity');
DrCity = require('../models/drcity');

exports.address_create_get = function(req,res){
    res.send('Address Page NOT YET Implemented');
};

exports.address_create_post = function(req,res){
    res.send('Address Error Page NOT YET Implemented');
};

exports.address_delete_get = function(req,res){
    res.send('Address delete Page NOT YET Implemented');
};

exports.address_delete_post = function(req,res){
    res.send('Address delete Error Page NOT YET Implemented');
};

exports.address_update_get = function(req,res, next){
    DrAddress.findById(req.params.id)
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
                        DrCity.find()
                            .sort([['city','ascending']])
                            .exec(function (err,city_list){
                                if(err){
                                 console.log('Error Querying Database:'+err);
                                                return next(err);
                                }
                                res.render('address_update',{title:'Update Information',draddress:draddress,city:city_list,drbiodatacity:draddress.drcity});
                    });
                        
                    });
                                                                
             }
             
         });
    
    
    //res.send('Address update Page NOT YET Implemented');
};

exports.address_update_post = function(req,res,next){
    
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
    
    var state_city = req.body.city;

   console.log('Value of Selected City: '+state_city);
    
    
    
    var draddre = {
        practicefirm: req.body.organization,
        officestradd_one: req.body.address_one,
        officestradd_two: req.body.address_two,
        mobilephoneno: req.body.mobile_phone_number,
        officenumber: req.body.office_phone_number,
        dremail: req.body.email_address,
        drcity: req.body.city
    };
    
     var errors = req.validationErrors();
     
     if(errors){
         DrCity.find()
            .sort([['city','ascending']])
            .exec(function (err,city_list){
                if(err){
                    console.log('Error Querying Database:'+err);
                    return next(err);
                }
                    res.render('address_update',{title:'Update Error Page',draddress:draddre,city:city_list,errors: errors});
                                //res.render('address_update',{title:'Update Information',draddress:draddress,city:city_list,drbiodatacity:draddress.drcity});
            });
         
         
     }else{
          DrCity.findOne({'_id':state_city})
             .exec(function (err,selected_city){
                 if(err){
                     console.log('Error Querying DrLocationByCity:' +err);
                     return next(err);
                 }//else{
                 
                    var draddress = new DrAddress({
                    practicefirm: req.body.organization,
                    officestradd_one: req.body.address_one,
                    officestradd_two: req.body.address_two,
                    mobilephoneno: req.body.mobile_phone_number,
                    officenumber: req.body.office_phone_number,
                    dremail: req.body.email_address,
                    drcity: req.body.city,
                    drstate:selected_city.state,
                    _id: req.params.id
                    });
                    
                    DrAddress.findByIdAndUpdate(req.params.id,draddress,{},function (err,resp){
                        if (err){
                            console.log('Error Updating DrAddress into database:'+ err);
                            return  next(err);        
                        }
                            console.log('Query Result:'+resp);
                            res.send('Confirmation alert for draddress is a work in progress ')    ;
            
        });
                    
                // }    
    
             });
     }
    
   // res.send('Address update Page error NOT YET Implemented');
};

exports.address_details_get = function(req,res){
    res.send('Address detail Page NOT YET Implemented');
};

exports.address_addresslist_get = function(req,res){
    res.send('Address List Page NOT YET Implemented');
};

exports.get_list_of_doctors_in_city = function (req,res,next){
    DrAddress.find({'drcity':req.params.id})
            .populate('drbiodata')
            .exec(function(err, doctor_list){
                if(err){
                    console.log('Error Querying DrAddress: '+err);
                    return next(err);
                }else{
                    DrCity.findOne({'_id':req.params.id})
                            .exec(function(err,city){
                                if(err){
                                    console.log('Error Querying DrCity: '+err);
                                    return next(err);
                                }
                                else{
                                    console.log('Result of Doctor List:' +req.params.id);
                                    //res.send('Doctors list based on city not yet implemented');
                                    res.render('doctor_list_based_on_city',{title:'Registered Practioners',city:city,doctorlist:doctor_list});
                                }
                            });
                   // res.render('doctor_list_based_on_city',{title:'Currently Registered Doctors In'})
                    //res.send('Doctors list based on city not yet implemented');
                }
            });
};

exports.get_list_of_doctors_in_state = function (req,res,next){
     DrAddress.find({'drstate':req.params.id})
            .populate('drbiodata')
            .exec(function(err, doctor_list_by_state){
                if(err){
                    console.log('Error Querying DrAddress: '+err);
                    return next(err);
                }else{
                    DrLocationByCity.findOne({'_id':req.params.id})
                            .exec(function (err,state){
                                if(err){
                                    console.log('Error Querying DrLocationByCity: '+err);
                                    return next(err);
                                }
                                
                                console.log('Result for Array is:'+doctor_list_by_state);
                      
                        //res.send('Doctors list based on state not yet implemented');
                        res.render('doctor_list_based_on_state',{title:'Registered Practitioners',state:state,doctorlist:doctor_list_by_state });
                            });
                        
                    }
                    
                  
                });
            
};


