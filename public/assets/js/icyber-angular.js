 

var app = angular.module('Angular', []).constant('url', [
  getScans,
  getDevicePolicy,
  MigrationViewUrl]);

app.controller('AngularController', function ($scope, $http, url, $interval) {

 $scope.timer = null;
 $scope.typeOptions = [
 { name: 'Select Firewall device to create policy', value: 'Select Firewall device to create policy' }
 ];

 $scope.policy_creator = $scope.typeOptions[0].value;

       //get scans of ip which is blocked
       $scope.getIPScans = function() {

        $http({
          method: 'GET',
          url: url[0]

        }).success(function(response){


          $scope._view_data = response._view_data;
          $scope._view_data_header = response._view_data_header;
          $scope.engine_header = response.engine_header;
          $scope.engine_detection = response.engine_detection;
          $scope.scan_engine = response.scan_engine;

          $scope.status = response.positives;

        });
      };

      $scope.action_in = function(policy_creator) {

       var target = event.target || event.srcElement || event.currentTarget;
       var id  =  target.attributes.id;
       var value = id.nodeValue;

         $scope.show_loader = true; // by default show true

         $http({
          method: 'GET',
          url: url[1]+'/'+policy_creator

        }).success(function(response){

          $scope.policy_in = response.policy_in;
          $scope.submit = response.submit;

          if(response) {
            $scope.show_loader = false;
          }

        });

      };

      $scope.migration_view = function ($redirect_to, $user_id) { 

         reDirectUrl($scope, $http, url,$user_id,$interval); // this function run on initialize

         if ($redirect_to != 'migration') {

          $scope.please_wait = true; // by default show true

          $scope.timer = $interval(function () {

             reDirectUrl($scope, $http, url,$user_id,$interval); //this function run on every 3 sec

           }, 10000 ); 

        } else {

          reDirectUrl($scope, $http, url,$user_id,$interval);

        }

      };

    });

    var reDirectUrl = function($scope, $http, url,$user_id,$interval){ //

     $http({
       method: 'GET',
       url: url[2],
       params: {user_id: $user_id},

     }).success(function (response) {

      $scope.show_html = JSON.parse(response.data);
      $scope.status = JSON.parse(response.status);

      if ( $scope.show_html  && response != '') {

        if($scope.status != "0") {

          $scope.please_wait = false; 
          $scope.read_log = $scope.show_html;

        } else {

          $scope.please_wait = false; 
          $scope.read_log = $scope.show_html;
          clearInterval($interval);
        }

      } else {

        $scope.please_wait = false; 
        $scope.read_log = 'No Data found';
        clearInterval($interval);
      }
    });
   };

   app.filter('trustAsHtml',['$sce', function($sce) {

    return function(text) {

      return $sce.trustAsHtml(text);

    };

  }]);


       // console.log($scope.status);
     /*   
        $scope._view_scans = [];
        angular.forEach($scope._view_data, function (value, key) {
          angular.forEach(value, function (value_inner, key_inner) {
            $scope._view_scans.push(value_inner);
          });
        });

        console.log($scope._view_scans);*/
             /*  //get scans of ip which is blocked
       $scope.getLoadBalancers = function(){

        $http({
          method: 'GET',
          url: url[1]

        }).success(function(response){
          console.log(response);
          return false;

        });
      };*/
