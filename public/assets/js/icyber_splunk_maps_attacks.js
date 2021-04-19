 // white


 var app = angular.module('SPlunk', []).constant('url', [
    f5CountryAttackMap,checkActiveDeviceViaAPIURL]);

 attacksVectorMap = function(_attacks,wHeight) {
    if (('#splunk-map').length !== 0) {
        $('#splunk-map').css('height', wHeight);
        $('#splunk-map').vectorMap({
            map: 'world_mill_en',
            scaleColors: ['#e74c3c', '#0071a4'],
            normalizeFunction: 'polynomial',
            hoverOpacity: 0.5,
            hoverColor: false,
            markerStyle: {
                initial: {
                    fill: '#4cabc7',
                    stroke: 'transparent',
                    r: 3
                }
            },
            regionStyle: {
                initial: {
                    fill: 'rgb(97,109,125)',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0.4,
                    "stroke-opacity": 1
                },
                hover: {
                    "fill-opacity": 0.8
                },
                selected: {
                    fill: 'yellow'
                },
                selectedHover: {
                }
            },
            focusOn: {
                x: 0.5,
                y: 0.5,
                scale: 2
            },
            backgroundColor: '#242a30',
            markers: _attacks
        });
    }
    }; // 

    app.controller('SPlunkController', function ($scope, $http,url,$interval){

       $scope.timer = null;
     $scope.showDefaultStatus = true; // by default show true
     $scope.checkActiveDeviceViaAPI = function ($param) { // check via API call if the Device is active or Not
         f5CountryAttackMapInit($scope, $http, url); // this function run on initialize
         statusDeviceCheck($scope, $http, url,$param); // this function run on initialize
         $scope.timer = $interval(function () {
             statusDeviceCheck($scope, $http, url,$param); //this function run on every 2 mint
         }, 120000 ); // Refresh Every 2 minute
         //$scope.timer = $interval(function () {  $scope.checkActiveDeviceViaAPI($param)}, 3000);
     };
        // function to get splunk country attack from the splunk api
        var f5CountryAttackMapInit = function($scope, $http, url){
            show_loading_block('sit back and relax while graph load.');
            $("#loading-div-background").show();
            $http({
                method: 'GET',
                url: url[0]
            }).success(function(response){
                // $scope.title = response._title;
                //$scope.attacksCount = response.attacksCount;
                // $scope.countryCount = response.countryCount;
                //$scope.uniqueIps = response.uniqueIps;
                $("#loading-div-background").hide("slow");
                $('.attack_title').text(response._title);
                $('.attacksCount').text(response.attacksCount);
                $('.uniqueIps').text(response.uniqueIps);
                $('.countryCount').text(response.countryCount);
                $scope.attacks = JSON.parse(response.f5CountryAttackMap);

                attacksVectorMap($scope.attacks,wHeight);
                return false;
            });
        };

    });



    var statusDeviceCheck = function($scope, $http, url,$param){
       $http({
           method: 'GET',
           url: url[1],
           params: {type: $param.device_type, device_id: $param.device_id},
       }).success(function (response) {
           $scope.showDefaultStatus = false;
           if (response == 1) {
               $scope.device_status_via_api = '<span><i class="fa fa-circle text-success Blink"></i>&nbsp; </span>';
           } else if (response == 0) {
               $scope.device_status_via_api = '<span><i class="fa fa-circle text-danger Blink"></i>&nbsp; </span>';
           } else if(response == 2){
               $scope.device_status_via_api = '<span><i class="fa fa-circle Blink statusBlinkerDefaultColor"></i>&nbsp; </span>';
           }
       });
   };

   app.filter('trustAsHtml',['$sce', function($sce) {

       return function(text) {

           return $sce.trustAsHtml(text);

       };

   }]);


