/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var DrLocationByCity = require('../models/drlocationbycity');
var DrCity = require('../models/drcity');

exports.get_list_of_states = function (req,res,next){
    DrLocationByCity.find()
            .sort([['state','ascending']])
            .exec(function(err,list_of_states){
                if(err){
                    console.log('Error Querying DrLocationByCity for States:'+err);
                    return next(err);
                }else{
                    res.render('stateslist',{title:'List Of States',states:list_of_states});
                }
            });
    //res.send('List of States Not yet Implemented');
};

exports.get_list_of_cities = function(req, res, next){
    DrCity.find()
            .sort([['city','ascending']])
            .populate('state')
            .exec(function(err,result){
                if(err){
                    console.log('Error Querying DrCity: '+err );
                    return next(err);
                }else{
                    //console.log('Result is:'+result);
                    //res.send('List of Cities Not yet Implemented');
                  res.render('city_list',{title:'List Of Cities',cities:result});
                }
            });
};


