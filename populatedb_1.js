#!/usr/bin/env node
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



console.log('This script populates a some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')){
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
 return;
 }

var async = require('async');

var DrLocationByCity = require('./models/drlocationbycity');
var DrCity = require('./models/drcity');



var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*function createVal(state,callback){
var drlocationbycitys = [];
var drlocationcity = new DrLocationByCity({
    state: state
    //city:city
});
     

  drlocationcity.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log('New State and City: ' + drlocationcity);
    drlocationbycitys.push(drlocationcity);
    callback(null, drlocationcity);
  } );
}
*/
function createCity(state,city,callback){
    
    DrLocationByCity.findOne({'state': state})
            .exec(function(err, result){
                if(err){
                    callback(err);
                           console.log('Error Querying Database LocationByCity'+err);
                    return err;
                }else{
                    console.log('Length of the result is:' +result.length);
                    
                        if(result.state!==state){
                            console.log('Result not yet equals to'+''+result.state+':' +state);                            
                        }else{
                            var stateId = result._id;
                            console.log('State: '+result.state +'Database Id is:'+stateId);
                            
                                                     
                        }
                        
                    
                     var drcity =  new DrCity({
                                city: city,
                                state: stateId
            
                            });  
                     drcity.save(function(err){
                                if(err){
                                    callback(err);
                                    console.log('Error Saving Data into Database'+ err);
                                    return;
                                }else{
                                    console.log('Success saving city:'+city+'ID'+stateId);
                                }
                            });
                }
            });
    
    
}
function setValueCity(callback){
    
    async.parallel([
function(callback){createCity('Abia','Aba',callback);},
function(callback){createCity('Abia','Umuahia',callback);},
function(callback){createCity('Adamawa','Yola',callback);},
function(callback){createCity('Adamawa','Jimeta',callback);},
function(callback){createCity('AkwaIbom','Uyo',callback);},
function(callback){createCity('Anambra','Awka','Onitsha',callback);},
function(callback){createCity('Anambra','Onitsha',callback);},
function(callback){createCity('Bauchi','Bauchi',callback);},
function(callback){createCity('Benue','Makurdi',callback);},
function(callback){createCity('Borno','Maiduguri',callback);},
function(callback){createCity('CrossRiver','Calabar',callback);},
function(callback){createCity('Delta','Warri',callback);},
function(callback){createCity('Edo','Benincity',callback);},
function(callback){createCity('Ekiti','AdoEkiti',callback);},
function(callback){createCity('Enugu','Enugu',callback);},
function(callback){createCity('Enugu','Nsukka',callback);},
function(callback){createCity('Gombe','Gombe',callback);},
function(callback){createCity('Imo','Owerri',callback);},
function(callback){createCity('Kaduna','Kaduna',callback);},
function(callback){createCity('Kaduna','Zaria',callback);},
function(callback){createCity('Kano','Kano',callback);},
function(callback){createCity('Katsina','Katsina',callback);},
function(callback){createCity('Kogi','Okene',callback);},
function(callback){createCity('Kwara','Ilorin',callback);},
function(callback){createCity('Lagos','Ikorodu',callback);},
function(callback){createCity('Lagos','Ikeja',callback);},
function(callback){createCity('Lagos','Lagos',callback);},
function(callback){createCity('Lagos','Badagary',callback);},
function(callback){createCity('Nasarawa','Lafia',callback);},
function(callback){createCity('Niger','Minna',callback);},
function(callback){createCity('Niger','Suleja',callback);},
function(callback){createCity('Ogun','Abeokuta',callback);},
function(callback){createCity('Ogun','Sagamu',callback);},
function(callback){createCity('Ogun','Owode',callback);},
function(callback){createCity('Ondo','Akure',callback);},
function(callback){createCity('Ondo','Ondo',callback);},
function(callback){createCity('Ondo','Owo',callback);},
function(callback){createCity('Osun','Ife',callback);},
function(callback){createCity('Osun','Osogbo',callback);},
function(callback){createCity('Osun','Ilesha',callback);},
function(callback){createCity('Oyo','Ibadan',callback);},
function(callback){createCity('Oyo','Oyo',callback);},
function(callback){createCity('Oyo','Ogbomosho',callback);},
function(callback){createCity('Oyo','Iseyin',callback);},
function(callback){createCity('Plateau','Jos',callback);},
function(callback){createCity('Rivers','PortHarcourt',callback);},
function(callback){createCity('Sokoto','Sokoto',callback);},
function(callback){createCity('Yobe','Potiskum',callback);}
]
,callback);
};
    /*
        createCity('Abia','Aba',function(err, result){
             if(err){
            console.log('Error Callback: '+err);
           callback(err,null);
           return;
        }
        console.log('Database data: '+result);
        });
        */
       
    //};

   /* 
    * 
async.parallel([
function(callback){createCity('Abia','Aba',callback);},
function(callback){createCity('Abia','Umuahia',callback);},
function(callback){createCity('Adamawa','Yola',callback);},
function(callback){createCity('Adamawa','Jimeta,callback);},
function(callback){createCity('AkwaIbom','Uyo',callback);},
function(callback){createCity('Anambra','Awka','Onitsha',callback);},
function(callback){createCity('Anambra','Onitsha,callback);},
function(callback){createCity('Bauchi','Bauchi',callback);},
function(callback){createCity('Benue','Makurdi',callback);},
function(callback){createCity('Borno','Maiduguri',callback);},
function(callback){createCity('CrossRiver','Calabar',callback);},
function(callback){createCity('Delta','Warri',callback);},
function(callback){createCity('Edo','Benincity',callback);},
function(callback){createCity('Ekiti','AdoEkiti',callback);},
function(callback){createCity('Enugu','Enugu',callback);},
function(callback){createCity('Enugu','Nsukka',callback);},
function(callback){createCity('Gombe','Gombe',callback);},
function(callback){createCity('Imo','Owerri',callback);},
function(callback){createCity('Kaduna','Kaduna',callback);},
function(callback){createCity('Kaduna','Zaria',callback);},
function(callback){createCity('Kano','Kano',callback);},
function(callback){createCity('Katsina','Katsina',callback);},
function(callback){createCity('Kogi','Okene',callback);},
function(callback){createCity('Kwara','Ilorin',callback);},
function(callback){createCity('Lagos','Ikorodu',callback);},
function(callback){createCity('Lagos','Ikeja',callback);},
function(callback){createCity('Lagos','Lagos',callback);},
function(callback){createCity('Lagos','Badagary',callback);},
function(callback){createCity('Nasarawa','Lafia',callback);},
function(callback){createCity('Niger','Minna',callback);},
function(callback){createCity('Niger','Suleja',callback);},
function(callback){createCity('Ogun','Abeokuta',callback);},
function(callback){createCity('Ogun','Sagamu',callback);},
function(callback){createCity('Ogun','Owode',callback);},
function(callback){createCity('Ondo','Akure',callback);},
function(callback){createCity('Ondo','Ondo',callback);},
function(callback){createCity('Ondo','Owo',callback);},
function(callback){createCity('Osun','Ife',callback);},
function(callback){createCity('Osun','Osogbo',callback);},
function(callback){createCity('Osun','Ilesha',callback);},
function(callback){createCity('Oyo','Ibadan',callback);},
function(callback){createCity('Oyo','Oyo',callback);},
function(callback){createCity('Oyo','Ogbomosho',callback);},
function(callback){createCity('Oyo','Iseyin',callback);},
function(callback){createCity('Plateau','Jos',callback);},
function(callback){createCity('Rivers','PortHarcourt',callback);},
function(callback){createCity('Sokoto','Sokoto',callback);},
function(callback){createCity('Yobe','Potiskum',callback);}
]
,callback);
}
 
 **/
    
/*function setValueCity(callback){

    async.parallel([function(callback){createCity('Abia','Aba','Umuahia',callback);},
function(callback){createCity('Adamawa','Yola','Jimeta',callback);},
function(callback){createCity('AkwaIbom','Uyo',callback);},
function(callback){createCity('Anambra','Awka','Onitsha',callback);},
function(callback){createCity('Bauchi','Bauchi',callback);},
function(callback){createCity('Benue','Makurdi',callback);},
function(callback){createCity('Borno','Maiduguri',callback);},
function(callback){createCity('CrossRiver','Calabar',callback);},
function(callback){createCity('Delta','Warri',callback);},
function(callback){createCity('Edo','Benincity',callback);},
function(callback){createCity('Ekiti','AdoEkiti',callback);},
function(callback){createCity('Enugu','Enugu','Nsukka',callback);},
function(callback){createCity('Gombe','Gombe',callback);},
function(callback){createCity('Imo','Owerri',callback);},
function(callback){createCity('Kaduna','Kaduna','Zaria',callback);},
function(callback){createCity('Kano','Kano',callback);},
function(callback){createCity('Katsina','Katsina',callback);},
function(callback){createCity('Kogi','Okene',callback);},
function(callback){createCity('Kwara','Ilorin',callback);},
function(callback){createCity('Lagos','Ikorodu','Ikeja','Lagos','Badagary',callback);},
function(callback){createCity('Nasarawa','Lafia',callback);},
function(callback){createCity('Niger','Minna','Suleja',callback);},
function(callback){createCity('Ogun','Abeokuta','Sagamu','Owode',callback);},
function(callback){createCity('Ondo','Akure','Ondo','Owo',callback);},
function(callback){createCity('Osun','Ife','Osogbo','Ilesha',callback);},
function(callback){createCity('Oyo','Ibadan','Oyo','Ogbomosho','Iseyin',callback);},
function(callback){createCity('Plateau','Jos',callback);},
function(callback){createCity('Rivers','PortHarcourt',callback);},
function(callback){createCity('Sokoto','Sokoto',callback);},
function(callback){createCity('Yobe','Potiskum',callback);}
]
,callback);
}
*/


/*
 *[function(callback){createCity('Abia','Aba','Umuahia,callback);},
function(callback){createCity('Adamawa','Yola','Jimeta,callback);},
function(callback){createCity('AkwaIbom','Uyo,callback);},
function(callback){createCity('Anambra','Awka','Onitsha,callback);},
function(callback){createCity('Bauchi','Bauchi,callback);},
function(callback){createCity('Benue','Makurdi,callback);},
function(callback){createCity('Borno','Maiduguri,callback);},
function(callback){createCity('CrossRiver','Calabar,callback);},
function(callback){createCity('Delta','Warri,callback);},
function(callback){createCity('Edo','Benincity,callback);},
function(callback){createCity('Ekiti','AdoEkiti,callback);},
function(callback){createCity('Enugu','Enugu','Nsukka,callback);},
function(callback){createCity('Gombe','Gombe,callback);},
function(callback){createCity('Imo','Owerri,callback);},
function(callback){createCity('Kaduna','Kaduna','Zaria,callback);},
function(callback){createCity('Kano','Kano,callback);},
function(callback){createCity('Katsina','Katsina,callback);},
function(callback){createCity('Kogi','Okene,callback);},
function(callback){createCity('Kwara','Ilorin,callback);},
function(callback){createCity('Lagos','Ikorodu','Ikeja','Lagos','Badagary,callback);},
function(callback){createCity('Nasarawa','Lafia,callback);},
function(callback){createCity('Niger','Minna','Suleja,callback);},
function(callback){createCity('Ogun','Abeokuta','Sagamu','Owode,callback);},
function(callback){createCity('Ondo','Akure','Ondo','Owo,callback);},
function(callback){createCity('Osun','Ife','Osogbo','Ilesha,callback);},
function(callback){createCity('Oyo','Ibadan','Oyo','Ogbomosho','Iseyin,callback);},
function(callback){createCity('Plateau','Jos,callback);},
function(callback){createCity('Rivers','PortHarcourt,callback);},
function(callback){createCity('Sokoto','Sokoto,callback);},
function(callback){createCity('Yobe','Potiskum,callback);}
]
 
 */
/*function setValueCity(callback){
async.parallel([ 
function(callback){createVal('Abia',callback);},
function(callback){createVal('Adamawa',callback);},
function(callback){createVal('AkwaIbom',callback);},
function(callback){createVal('Anambra',callback);},
function(callback){createVal('Bauchi',callback);},
function(callback){createVal('Benue',callback);},
function(callback){createVal('Borno',callback);},
function(callback){createVal('CrossRiver',callback);},
function(callback){createVal('Delta',callback);},
function(callback){createVal('Edo',callback);},
function(callback){createVal('Ekiti',callback);},
function(callback){createVal('Enugu',callback);},
function(callback){createVal('Gombe',callback);},
function(callback){createVal('Imo',callback);},
function(callback){createVal('Kaduna',callback);},
function(callback){createVal('Kano',callback);},
function(callback){createVal('Katsina',callback);},
function(callback){createVal('Kogi',callback);},
function(callback){createVal('Kwara',callback);},
function(callback){createVal('Lagos',callback);},
function(callback){createVal('Nasarawa',callback);},
function(callback){createVal('Niger',callback);},
function(callback){createVal('Ogun',callback);},
function(callback){createVal('Ondo',callback);},
function(callback){createVal('Osun',callback);},
function(callback){createVal('Oyo',callback);},
function(callback){createVal('Plateau',callback);},
function(callback){createVal('Rivers',callback);},
function(callback){createVal('Sokoto',callback);},
function(callback){createVal('Yobe',callback);}
], callback);
}
*/
/*
 * 
 * 
 * function(callback){createVal('Abia',['Aba','Umuahia'],callback);},
function(callback){createVal('Adamawa',['Yola','Jimeta'],callback);},
function(callback){createVal('AkwaIbom',['Uyo'],callback);},
function(callback){createVal('Anambra',['Awka','Onitsha'],callback);},
function(callback){createVal('Bauchi',['Bauchi'],callback);},
function(callback){createVal('Benue',['Makurdi'],callback);},
function(callback){createVal('Borno',['Maiduguri'],callback);},
function(callback){createVal('CrossRiver',['Calabar'],callback);},
function(callback){createVal('Delta',['Warri'],callback);},
function(callback){createVal('Edo',['Benincity'],callback);},
function(callback){createVal('Ekiti',['AdoEkiti'],callback);},
function(callback){createVal('Enugu',['Enugu','Nsukka'],callback);},
function(callback){createVal('Gombe',['Gombe'],callback);},
function(callback){createVal('Imo',['Owerri'],callback);},
function(callback){createVal('Kaduna',['Kaduna','Zaria'],callback);},
function(callback){createVal('Kano',['Kano'],callback);},
function(callback){createVal('Katsina',['Katsina'],callback);},
function(callback){createVal('Kogi',['Okene'],callback);},
function(callback){createVal('Kwara',['Ilorin'],callback);},
function(callback){createVal('Lagos',['Ikorodu','Ikeja','Lagos','Badagary'],callback);},
function(callback){createVal('Nasarawa',['Lafia'],callback);},
function(callback){createVal('Niger',['Minna','Suleja'],callback);},
function(callback){createVal('Ogun',['Abeokuta','Sagamu','Owode'],callback);},
function(callback){createVal('Ondo',['Akure','Ondo','Owo'],callback);},
function(callback){createVal('Osun',['Ife','Osogbo','Ilesha'],callback);},
function(callback){createVal('Oyo',['Ibadan','Oyo','Ogbomosho','Iseyin'],callback);},
function(callback){createVal('Plateau',['Jos'],callback);},
function(callback){createVal('Rivers',['PortHarcourt'],callback);},
function(callback){createVal('Sokoto',['Sokoto'],callback);},
function(callback){createVal('Yobe',['Potiskum'],callback);}
], callback);
}
 * 
 */
  /*
   * 
   * function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log('New State and City: ' + drlocationcity);
    //drlocationbycitys.push(drlocationcity);
    callback(null, drlocationcity);
  }
   
  
  
  
 




/*function createGenreAuthors(callback) {
    async.parallel([
        function(callback) {
          authorCreate('Patrick', 'Rothfuss', '1973-06-06', null, callback);
        },
        function(callback) {
          authorCreate('Ben', 'Bova', '1932-11-8', null, callback);
        },
        function(callback) {
          authorCreate('Isaac', 'Asimov', '1920-01-02', '1992-04-06', callback);
        },
        function(callback) {
          authorCreate('Bob', 'Billings', null, null, callback);
        },
        function(callback) {
          authorCreate('Jim', 'Jones', '1971-12-16', null, callback);
        },
        function(callback) {
          genreCreate("Fantasy", callback);
        },
        function(callback) {
          genreCreate("Science Fiction", callback);
        },
        function(callback) {
          genreCreate("French Poetry", callback);
        }
        ],
        // optional callback
        callback);
}


*/
//setValueCity;
  //  mongoose.connection.close();
async.series([
    setValueCity
       
],
// optional callback
function (err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    
    //All done, disconnect from database
    mongoose.connection.close();
});



