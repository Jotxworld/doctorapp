/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
app.controller('myController', function ($scope){
   $scope.sex = [
            { name:'Male'},
            { name:'Female'}
        ]; 
        
    $scope.marital_status = ['Single','Married','Widowed'];
    /*$scope.setFirstName = function(firstname){
        if(firstname === undefined){
            val = '';
        }else{
            val = firstname;
        }
         return val;   
    };*/
    
    //$scope.firstname= firstname;
    /*$scope.biodata = function(firstname, lastname, othernames, date_of_birth, sex, maritalstatus){
        $scope.firstname = firstname;
        $scope.lastname = lastname;
        $scope.othernames = othernames;
        $scope.dateofbirth= date_of_birth;
        $scope.select_sex = sex;
        $scope.marital_status = maritalstatus;
    };*/
    
    $scope.special = function(specialization){
     
            $scope.areaofspecialization_id =specialization._id;
            $scope.areaofspecialization= specialization.areaofspecialization;
        
        return areaofspecialization_id;
    };
    
});






