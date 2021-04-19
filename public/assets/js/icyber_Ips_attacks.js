 // white


 var app = angular.module('SPlunk', []).constant('url', [
    getTopIpAttackUrl,checkActiveDeviceViaAPIURL]);
 var defaults = {
   loading_div_id : 'loading-div-background'
},
handleAttackIPSChart = function(id ,pieChartData) {

   blue		= '#348fe2',
   blueLight	= '#5da5e8',
   blueDark	= '#1993E4',
   aqua		= '#49b6d6',
   aquaLight	= '#6dc5de',
   aquaDark	= '#3a92ab',
   green		= '#00acac',
   greenLight	= '#33bdbd',
   greenDark	= '#008a8a',
   orange		= '#f59c1a',
   orangeLight	= '#f7b048',
   orangeDark	= '#c47d15',
   dark		= '#2d353c',
   grey		= '#b6c2c9',
   purple		= '#727cb6',
   purpleLight	= '#8e96c5',
   purpleDark	= '#5b6392',
   red         = '#ff5b57';
   nv.addGraph(function() {
       var pieChart = nv.models.pieChart()
       .x(function(d) { return d.label })
       .y(function(d) { return d.value })
       .showLabels(true)
       .labelThreshold(.05);

       d3.select('#'+id).append('svg')
       .datum(pieChartData)
       .transition().duration(350)
       .call(pieChart);

       return pieChart;
   });


   nv.addGraph(function() {
       var chart = nv.models.pieChart()
       .x(function(d) { return d.label })
       .y(function(d) { return d.value })
       .showLabels(true)
       .labelThreshold(.05)
       .labelType("percent")
       .donut(true)
       .donutRatio(0.35);

       d3.select('#'+id).append('svg')
       .datum(pieChartData)
       .transition().duration(350)
       .call(chart);

       return chart;
   });
};

app.controller('SPlunkController', function ($scope, $http,url,$interval){

   $scope.timer = null;
     $scope.showDefaultStatus = true; // by default show true
     $scope.checkActiveDeviceViaAPI = function ($param) { // check via API call if the Device is active or Not
         DonutLoad($scope, $http, url); // this function run on initialize
         statusDeviceCheck($scope, $http, url,$param); // this function run on initialize
         $scope.timer = $interval(function () {
             statusDeviceCheck($scope, $http, url,$param); //this function run on every 2 mint
         }, 120000 ); // Refresh Every 2 minute
         //$scope.timer = $interval(function () {  $scope.checkActiveDeviceViaAPI($param)}, 3000);
     };

 });
 // function to get splunk top ips TopIpsAttacks from the splunk api
 var DonutLoad = function($scope, $http, url){
   show_loading_block('sit back and relax while graph load.');
   $("#loading-div-background").show();
   $http({
       method: 'GET',
       url: url[0]
   }).success(function(response){
       $("#loading-div-background").hide("slow");
       $scope.pieData = JSON.parse(response.pieData);
       $scope.topAttackingIPs = response.countryAttack;
       var pieChartData = $scope.pieData;
       handleAttackIPSChart('nv-pie-chart-ips-attacks' ,pieChartData);
       return false;

   });
};

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

