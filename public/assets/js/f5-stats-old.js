 // white
 
 var app = angular.module('F5StatisticDashboard', []).constant('url', [
     f5CountryAttacking,
     f5AttackDistribute,
     f5AttackDistributeCountry,
     f5AttackDistributeAttacksTypes,
     f5AttackDistributeViolation,
     f5AttackDistributeSignature,
     getCountryAttacks,
     getTopIpAttack,
     f5SpreadingTopAttacking,
     f5SpreadingTopAttackingViolation,
     f5SpreadingTopAttackingSignature,
     f5SpreadingTopAttackingCountries,
     f5SpreadingTopAttackingIPs
    ]);
 white           = 'rgba(255,255,255,1.0)',
     fillBlue        = 'rgba(52, 143, 226, 0.6)',
     strokeBlue      = 'rgba(52, 143, 226, 0.8)',
     fillBlueLight = 'rgba(114, 124, 182, 0.2)',
     strokePurple    = 'rgba(114, 124, 182, 0.8)',
     green = '#00acac',
     blue = '#348fe2',
     barChart = null, //
     ctx2 = '', //
     barChartData = []; //
 function randomHues(n){
     var res=[];
     for(var i=0;i<n;i++)
         res.push('rgb('  + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')')
     return res
 }
 var randomColor=randomHues(256);
 //pieFunction('f5-Spreading-attacking' ,$scope._attack_type  ,$scope._count ,$scope._percent);
 function  pieFunction(id ,title ,label ,data){
    var pieChartData = {
        labels: title,
        datasets: [{
            data: data,
            backgroundColor: randomColor,
            borderColor: randomColor,
            borderWidth: 2,
            label: label
        }]
    };
    var ctx5 = document.getElementById(id).getContext('2d');
    window.myPie = new Chart(ctx5, {
        type: 'pie',
        data: pieChartData
    });
}

 function  lineChartFunction(id ,dataChart){
     var lineChartData = dataChart ;
     var ctx2 = document.getElementById(id).getContext('2d');
     var lineChart = new Chart(ctx2, {
         type: 'line',
         data: lineChartData
     });
 }

 function  BarChartFunction(id ,ips ,count ,title){
     barChartData = {
         labels:  ips,
         datasets: [{
             label: title,
             borderWidth: 2,
             borderColor: randomColor,
             backgroundColor: randomColor,
             data: count
         }, ]
     };

     var ctx2 = document.getElementById(id).getContext('2d');
     var barChart = new Chart(ctx2, {
         type: 'horizontalBar',
         data: barChartData,
         options: {
             scales: {
                 xAxes: [{
                     ticks: {
                         beginAtZero: true // Edit the value according to what you need
                     }
                 }],
                 yAxes: [{
                     stacked: true
                 }]
             }
         }
     });
 }

 app.controller('SPlunkController', function ($scope, $http, url){
        $scope.f5CountryAttacks = function(){
            $scope.attacksCount = 'Loading...';
            $scope.countryCount = 'Loading...';
            $scope.uniqueIps = 'Loading...';
            $http({
                method: 'GET',
                url: url[0]
            }).success(function(response){

                $scope.attacksCount = response.attacksCount;
                $scope.countryCount = response.countryCount;
                $scope.uniqueIps = response.uniqueIps;
                //return false;

            });
        };
     $scope.f5AttackDistributes = function(){
         $scope._title = 'Loading...';
         $http({
             method: 'GET',
             url: url[1]
         }).success(function(response){

             if(response._title === undefined){
                 $scope._title = 'Attack Type Distribution by Type Over Time';
             }else{
                 $scope._title = response._title;
             }
             lineChartFunction('f5-distribute' ,response );


         });
     };
     $scope.f5AttackDistributesCountry = function(){
         $scope._title = 'Loading...';
         $http({
             method: 'GET',
             url: url[2]
         }).success(function(response){

             if(response._title === undefined){
                 $scope._title = 'Attack Distribution by Country Over Time';
             }else{
                 $scope._title = response._title;
             }
             lineChartFunction('f5-distribute-country' ,response );


         });
     };
     $scope.f5AttackDistributeAttacksTypes = function(){
         $scope._title = 'Loading...';
         $http({
             method: 'GET',
             url: url[3]
         }).success(function(response){

             $scope._attack_type = response._attack_type;
             $scope._count = response._count;
             $scope._percent = JSON.parse(response._percent);
             $scope._tc = JSON.parse(response._tc);
             $scope._title = response._title;

             BarChartFunction('f5-attacks-types' ,$scope._attack_type  ,$scope._count ,$scope._title);


         });
     };

     $scope.f5AttackDistributeViolation = function(){
         $scope._title = 'Loading...';
         $http({
             method: 'GET',
             url: url[4]
         }).success(function(response){

             $scope._violations = response._violations;
             $scope._count = response._count;
             $scope._percent = JSON.parse(response._percent);
             $scope._tc = JSON.parse(response._tc);
             $scope._title = response._title;

             BarChartFunction('f5-attacks-violation' ,$scope._violations  ,$scope._count ,$scope._title);


         });
     };

     $scope.f5AttackDistributeSignature = function(){
         $scope._title = 'Loading...';
         $http({
             method: 'GET',
             url: url[5]
         }).success(function(response){

             $scope._sig_names = response._sig_names;
             $scope._count = response._count;
             $scope._percent = JSON.parse(response._percent);
             $scope._tc = JSON.parse(response._tc);
             $scope._title = response._title;

             BarChartFunction('f5-attacks-signature' ,$scope._sig_names  ,$scope._count ,'count');


         });
     };

     $scope.getCountryAttacks = function(){
         $scope._title = 'Loading...';
         $http({
             method: 'GET',
             url: url[6]
         }).success(function(response){

             $scope._countryAttackLabel = JSON.parse(response.countryAttackLabel);
             $scope._countryAttackPercent = JSON.parse(response.countryAttackPercent);
             $scope._count = JSON.parse(response.count);
             $scope._title = response._title;

             BarChartFunction('f5-country-attacks' ,$scope._countryAttackLabel  ,$scope._count  ,$scope._title);


         });
     };
     $scope.getTopIpAttack = function(){
         $scope._title = 'Loading...';
         $http({
             method: 'GET',
             url: url[7]
         }).success(function(response){

             $scope.allIpClient = JSON.parse(response.allIpClient);
             $scope.allIpPercent = JSON.parse(response.allIpPercent);
             $scope.ipAttack_Percent = JSON.parse(response.ipAttack_Percent);
             $scope._title = response._title;

             barChartData = {
                 labels:  $scope.allIpClient,
                 datasets: [{
                     label: $scope._title,
                     borderWidth: 2,
                     borderColor: strokePurple,
                     backgroundColor: fillBlueLight,
                     data: $scope.allIpPercent
                 }, ]
             };

             var ctx2 = document.getElementById('f5-country-top-attacks').getContext('2d');
             var barChart = new Chart(ctx2, {
                 type: 'bar',
                 data: barChartData
             });
             BarChartFunction('f5-country-top-attacks' ,$scope.allIpClient  ,$scope.allIpPercent ,$scope._title);


         });
     };

     $scope.f5SpreadingTopAttacking = function(){
         $scope._title = 'Loading...';
         $http({
             method: 'GET',
             url: url[8]
         }).success(function(response){

             $scope._attack_type = response._attack_type;
             $scope._count = response._count;
             $scope._percent = JSON.parse(response._percent);
             $scope._tc = JSON.parse(response._tc);
             $scope._title = response._title;

             pieFunction('f5-Spreading-attacking' ,$scope._attack_type  ,$scope._count ,$scope._percent);


         });
     };
     $scope.f5SpreadingTopAttackingViolation = function(){
         $scope._title = 'Loading...';
         $http({
             method: 'GET',
             url: url[9]
         }).success(function(response){

             $scope._violations = response._violations;
             $scope._count = response._count;
             $scope._percent = JSON.parse(response._percent);
             $scope._tc = JSON.parse(response._tc);
             $scope._title = response._title;

             pieFunction('f5-spreading-top-attacks-violation' ,$scope._violations  ,$scope._count ,$scope._percent);


         });
     };
     $scope.f5SpreadingTopAttackingSignature = function(){
         $scope._title = 'Loading...';
         $http({
             method: 'GET',
             url: url[10]
         }).success(function(response){

             $scope._sig_names = response._sig_names;
             $scope._count = response._count;
             $scope._percent = JSON.parse(response._percent);
             $scope._tc = JSON.parse(response._tc);
             $scope._title = response._title;

             pieFunction('f5-spreading-top-attacks-signature' ,$scope._sig_names  ,$scope._count ,$scope._percent);


         });
     };
     $scope.f5SpreadingTopAttackingCountries = function(){
         $scope._title = 'Loading...';
         $http({
             method: 'GET',
             url: url[11]
         }).success(function(response){

             $scope._geo_location = response._geo_location;
             $scope._count = response._count;
             $scope._percent = JSON.parse(response._percent);
             $scope._tc = JSON.parse(response._tc);
             $scope._title = response._title;

             pieFunction('f5-spreading-top-attacks-countries' ,$scope._geo_location  ,$scope._count ,$scope._percent);


         });
     };
     $scope.f5SpreadingTopAttackingIPs = function(){
         $scope._title = 'Loading...';
         $http({
             method: 'GET',
             url: url[12]
         }).success(function(response){

             $scope._ip_client = response._ip_client;
             $scope._count = response._count;
             $scope._percent = JSON.parse(response._percent);
             $scope._tc = JSON.parse(response._tc);
             $scope._title = response._title;

             pieFunction('f5-spreading-top-attacks-ips' ,$scope._ip_client  ,$scope._count ,$scope._percent);


         });
     };


});




