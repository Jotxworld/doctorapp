/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var router = express.Router();


var drbiodata_controller = require('../controller/drbiodatacontroller');
var drqualification_controller = require('../controller/drqualificationcontroller');
var drareaofspecialization_controller = require('../controller/drareaofspecilizationcontroller');
var draddress_controller = require('../controller/draddresscontroller');
var drlocationbycity_controller = require('../controller/drlocationbycitycontroller');



router.get('/', drbiodata_controller.index);

router.get('/biodata/registration', drbiodata_controller.biodata_create_get);

router.post('/biodata/registration', drbiodata_controller.biodata_create_post);


//doctor/biodata/details/' + this._id

router.get('/biodata/details/:id/update', drbiodata_controller.biodata_update_get);

router.post('/biodata/details/:id/update', drbiodata_controller.biodata_update_post);

router.get('/biodata/:id/delete', drbiodata_controller.biodata_delete_get);

router.get('/biodata/details/:id', drbiodata_controller.biodata_details_get);

router.get('/biodata/all', drbiodata_controller.biodata_biodatalist_get);




/*router.get('/address/create', draddress_controller.address_create_get);

router.post('/address/create', draddress_controller.address_create_post);

router.get('/address/:id/delete', draddress_controller.address_delete_get);

router.post('/address/:id/delete', draddress_controller.address_delete_post);

router.get('/address/:id/update', draddress_controller.address_update_get);

router.post('/address/:id/update', draddress_controller.address_update_post);

router.get('/address/:id/details', draddress_controller.address_details_get);

router.get('/addresslist', draddress_controller.address_addresslist_get);*/



/*router.get('/qualification/create', drqualification_controller.qualification_create_get);

router.post('/qualification/create', drqualification_controller.qualification_create_post);

router.get('/qualification/:id/delete', drqualification_controller.qualification_delete_get);

router.post('/qualification/:id/delete', drqualification_controller.qualification_delete_post);

router.get('/qualification/:id/update', drqualification_controller.qualification_update_get);

router.post('/qualification/:id/update', drqualification_controller.qualification_update_post);

router.get('/qualification/id/details', drqualification_controller.qualification_details_get);*/




router.get('/states', drlocationbycity_controller.get_list_of_states);

router.get('/cities',drlocationbycity_controller.get_list_of_cities);

router.get('/city/:id',draddress_controller.get_list_of_doctors_in_city);

router.get('/state/:id', draddress_controller.get_list_of_doctors_in_state);


/*router.get('/areaofspecialization/create', drareaofspecialization_controller.areaofspecialization_create_get);

router.post('/areaofspecialization/create', drareaofspecialization_controller.areaofspecialization_create_post);

router.get('/areaofspecialization/:id/delete', drareaofspecialization_controller.areaofspecialization_delete_get);

router.post('/areaofspecialization/:id/delete', drareaofspecialization_controller.areaofspecialization_delete_post);

router.get('/areaofspecialization/:id/update', drareaofspecialization_controller.areaofspecialization_update_get);
o
router.post('/areaofspecialization/:id/update', drareaofspecialization_controller.areaofspecialization_update_post);

router.get('/areaofspecializations', drareaofspecialization_controller.areaofspecializationlist_get);
*/



//module.exports = router;


module.exports = router;
