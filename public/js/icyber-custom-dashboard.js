 
var customDashboard = angular.module('CustomDashboard', []).constant('url', [

//f5 dashboard from splunk

/*0*/f5CountryAttackMap,
/*1*/getCountryAttacksUrl,
/*2*/getTopIpAttackUrl,
/*3*/getBlockedIpsInDb,
/*4*/checkActiveDeviceViaAPIURL,
/*5*/getBlockedIpsROI,


//Loggers Graphs from system

//f5 

/*6*/TopCountryAttacks,
/*7*/TopAttackingTypes,
/*8*/TopViolations,
/*9*/TopDestinationIPs,

//cisco

/*10*/TopDeniedDestinations,

//stormshield

/*11*/getEventsCounts,
/*12*/getBlockCounts,
/*13*/getTopUrl,
/*14*/getEventsGraph,
/*15*/getAlarmGraph,
/*16*/getSentCounts,
/*17*/getRecievedCounts,
/*18*/getSentGraph,

//generic server

/*19*/getTypeGraph,
/*20*/getPidGraph,
/*21*/getTypeGraphByTime,
/*22*/getAddressGraph,
/*23*/getSuccessGraph,

//f5 stats from splunk
/*24*/f5CountryAttacking ,
/*25*/f5AttackDistribute,
/*26*/f5AttackDistributeCountry,
/*27*/f5AttackDistributeAttacksTypes,
/*28*/f5AttackDistributeViolation,
/*29*/f5AttackDistributeSignature,
/*30*/getCountryAttacks ,
/*31*/getTopIpAttack ,
/*32*/f5SpreadingTopAttacking ,
/*33*/f5SpreadingTopAttackingViolation ,
/*34*/f5SpreadingTopAttackingSignature ,
/*35*/f5SpreadingTopAttackingCountries,
/*36*/f5SpreadingTopAttackingIPs,

//Cisco graphs from splunk

/*37*/getConnectionsDenialMb,
/*38*/getTopIpAttackUrlCisco,
/*39*/ciscoCountryAttackMap,
/*40*/allDeniedConnection,
/*41*/getTopDenialDestinations,
/*42*/getConnections,
/*43*/getDenialCount,
/*44*/getTraffic,
/*45*/getManagement,
/*46*/tcpProtocols,
/*47*/getManagementEvents,
/*48*/getOtherEvents,
/*49*/udpProtocols,
/*50*/connectionProtocols,
/*51*/mbProtocols,
/*52*/NonProtocols,
/*53*/getDeniedProtocolStats,
/*54*/topDeniedProtocols,
/*55*/getDeniedSource,

]);

white           = 'rgba(255,255,255,1.0)',
fillBlue        = 'rgba(52, 143, 226, 0.6)',
strokeBlue      = 'rgba(52, 143, 226, 0.8)',
fillPurpleLight = 'rgba(114, 124, 182, 0.2)',
strokePurple    = 'rgba(114, 124, 182, 0.8)',
green = '#00acac',
blue = '#348fe2',
barChart = null,  
ctx2 = '', 
barChartData = [],

randomHues = function( n, opacity ) {
 var res=[];
 for(var i=0;i<n;i++)
   res.push('rgb('  + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) +', '+opacity+ ')')
 return res
},

randomColor = randomHues(256, 0.8),

pieFunction = function(id ,title ,label ,data){

  var pieChartData = {
    labels: title,
    datasets: [{
      data: data,
      backgroundColor: randomColor,
      borderColor: randomColor,
      borderWidth: 2,
      label: label
    },
    {
      data: data,
      backgroundColor: randomColor,
      borderColor: randomColor,
      borderWidth: 2,
      label: label
    },
    {
      data: data,
      backgroundColor: randomColor,
      borderColor: randomColor,
      borderWidth: 2,
      label: label
    },
    {
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
},

ciscoPieFunction = function(id ,title ,protocol_name ,data){
  var pieChartData = {
    labels: protocol_name,
    datasets: [{
      data: data,
      backgroundColor: randomColor,
      borderColor: randomColor,
      borderWidth: 2,
      label: title
    }]
  };
  var ctx5 = document.getElementById(id).getContext('2d');
  window.myPie = new Chart(ctx5, {
    type: 'pie',
    data: pieChartData
  });
},

polarChart = function (id, labels, counts) {

  var polarAreaData = {
    labels: labels,
    datasets: [{
      data: counts,
      backgroundColor: randomColor,
      borderColor: randomColor,
      borderWidth: 2,
      label: 'My dataset'
    }]
  };

  var ctx4 = document.getElementById(id).getContext('2d');
  var polarAreaChart = new Chart(ctx4, {
    type: 'polarArea',
    data: polarAreaData
  });

},

lineChartFunction = function(id ,dataChart){
 var lineChartData = dataChart ;
 var ctx2 = document.getElementById(id).getContext('2d');
 var lineChart = new Chart(ctx2, {
   type: 'line',
   data: lineChartData
 });
},

BarChartFunction = function(id ,ips ,count ,title){
 barChartData = {
   labels:  ips,
   datasets: [{
     label: title,
     borderWidth: 2,
     borderColor: randomColor,
     backgroundColor: randomColor,
     data: count
   }, ]
 }

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
},

visitorsDonutChart = function(_ipAttack_Percent ,_donut_id) {
  Morris.Donut({
    element: _donut_id,
    data: _ipAttack_Percent,
    colors: [green, blue],
    labelFamily: 'Open Sans',
    labelColor: 'rgba(0,0,0,0.4)',
    labelTextSize: '12px',
    backgroundColor: '#242a30'
  });
}, 

attacksVectorMap = function(_attacks,wHeight, id) {
  if ((id).length !== 0) {
    $(id).css('height', wHeight);
    $(id).vectorMap({
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
}; 

customDashboard.controller('DashboardController', function ($scope, $http, url,$interval){

 $scope.timer = null;
 $scope.showDefaultStatus = true; // by default show true


 /*
  
  F5 Graphs
  
  */

  // function to get splunk country attack from the splunk api
  $scope.f5CountryAttackMap = function(){
    $scope._title = 'Loading...'; //before loading data
    $http({
      method: 'GET',
      url: url[0]
    }).success(function(response){

      $scope._title = response._title;
      $scope.attacksCount = response.attacksCount;
      $scope.countryCount = response.countryCount;
      $scope.uniqueIps = response.uniqueIps;
      $scope.attacks = response.f5CountryAttackMap;


      var wHeight = '181px';
      var data = JSON.parse($scope.attacks);
      attacksVectorMap(data,wHeight, '#f5-attack-map');

    });
  };


  // function to get splunk top ips TopIpsAttacks from the splunk api
  $scope.getF5CountryAttacks = function(){
     $scope._title = 'Loading...'; //before loading data
     $http({
      method: 'GET',
      url: url[1]
    }).success(function(response){

      $scope._countryAttackLabel = JSON.parse(response.countryAttackLabel);
      $scope._countryAttackPercent = JSON.parse(response.countryAttackPercent);
      $scope._count = JSON.parse(response.count);
      $scope._title = response._title;

      barChartData = {
        labels:  $scope._countryAttackLabel,
        datasets: [{
          label: 'Top Country Attacks',
          borderWidth: 2,
          borderColor: strokePurple,
          backgroundColor: fillPurpleLight,
          data:  $scope._count
        }, ]
      };

      var ctx2 = document.getElementById('country-attacks').getContext('2d');
      var barChart = new Chart(ctx2, {
        type: 'bar',
        data: barChartData
      });

      // for click event
      $("#country-attacks").click(function (evt) { 
        var activePoints = barChart.getElementsAtXAxis(evt);
        if(activePoints["0"]._view.label != 'undefined'){
          window.location = geoLocation +'/'+activePoints["0"]._view.label;

        }
      });
    });
  };

  // function to get splunk top ips attack from the splunk api
  $scope.getTopIpsAttacks = function(){
     $scope._title = 'Loading...'; //before loading data
     $http({
      method: 'GET',
      url: url[2]
    }).success(function(response){

      $scope._title = response._title;
      $scope.topCountsIPs = 'Total IPs ('+ response.topCountsIPs +' )';
      $scope.topCountsPercent = 'Maximum Attack Count ('+ response.topCountsPercent +' )';
      $scope.allIpClient = JSON.parse(response.allIpClient);
      $scope.allIpPercent = JSON.parse(response.allIpPercent);
      $scope.ipAttack_Percent = JSON.parse(response.ipAttack_Percent);

      var label = $scope.allIpClient;
      var data = $scope.allIpPercent;

      barChartData = {
        labels:label,
        datasets: [{
          label: 'Attack Count',
          borderWidth: 2,
          borderColor: strokePurple,
          backgroundColor: fillPurpleLight,
          data: data
        }, ]
      };

      var ctx2 = document.getElementById('top_attack_ip').getContext('2d');
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

      $("#top_attack_ip").click(function(evt){
        if(_virusTotal !== null){
          var activePoints = barChart.getElementAtEvent(evt);
          if(activePoints["0"]._view.label != 'undefined'){
           var live_ip = 'f5';
           window.location = getBlockedIpsClick+'/'+activePoints["0"]._view.label+'/'+live_ip;
         }
       }else{
        $('#warning_msg').text('Please add your total virus device...');
        $('#warning_to_scan_ips').modal();
        $('.continueWarningScan').click(function (e) {
         e.preventDefault();
         $('#warning_to_scan_ips').modal('hide');
         return false;
       });
      }

    }
    );
      var donutData = $scope.ipAttack_Percent;
      visitorsDonutChart(donutData ,'visitors-donut-chart');
    });
  };

  // function to get splunk top ips attack from the splunk api
  $scope.getBlockedIpsInDb = function(){
     $scope._title = 'Loading...'; //before loading data
     $http({
       method: 'GET',
       url: url[3]
     }).success(function(response){

       $scope._title = response._title;
       $scope.topBlockedCountsIPs = 'Total IPs ('+ response.topCountsIPs +' )';
       $scope.topBlockedCountsPercent = 'Maximum % Blocked ('+ response.topCountsPercent +' %)';
       $scope.allIpClient = JSON.parse(response.allIpClient);
       $scope.allIpPercent = JSON.parse(response.allIpPercent);
       $scope.ipAttack_Percent = JSON.parse(response.ipAttack_Percent);

       var label = $scope.allIpClient;
       var data = $scope.allIpPercent;

       barChartData = {
         labels:label,
         datasets: [{
           label: 'Attacking %',
           borderWidth: 2,
           borderColor: strokePurple,
           backgroundColor: fillPurpleLight,
           data: data,
         }, ]
       };

       var ctx2 = document.getElementById('blocked-ip-chart').getContext('2d');
       var barChart = new Chart(ctx2, {
         type: 'bar',
         data: barChartData
       });

       $("#blocked-ip-chart").click(function (evt) {
         if(_virusTotal !== null){
           var activePoints = barChart.getElementsAtXAxis(evt);
           if(activePoints["0"]._view.label != 'undefined'){
             window.location = getBlockedIpsClick+'/'+activePoints["0"]._view.label;

           }
         }else{
           $('#warning_msg').text('Please add your total virus device...');
           $('#warning_to_scan_ips').modal();
           $('.continueWarningScan').click(function (e) {
             e.preventDefault();
             $('#warning_to_scan_ips').modal('hide');
             return false;
           });
         }
       }
       );
       var donutData = $scope.ipAttack_Percent;
       visitorsDonutChart(donutData ,'visitors-donut-chart-blocked-Ips');

     });
   };

 // check via API call if the Device is active or Not
 $scope.checkActiveDeviceViaAPI = function ($param) { 
   statusDeviceCheck($scope, $http, url,$param); // this function run on initialize
   $scope.timer = $interval(function () {
     statusDeviceCheck($scope, $http, url,$param); //this function run on every 2 mint
   }, 120000 ); // Refresh Every 2 minute
 };

 // function to calculate per hour cost of blocked ip in db
 $scope.getBlockedIpsROI = function(){
   $scope._title = 'Loading...'; //before loading data
   $http({
     method: 'GET',
     url: url[5]
   }).success(function(response){

     $scope._title = response._title;
     $scope.working_cost_hour = 'Cost of IT resource /hour ('+ response.working_cost_hour +' )';
     $scope.topBlockedCountsPercent = 'Maximum Count ('+ response.totalcount +')';
     $scope.ip_count = JSON.parse(response.ip_count);
     $scope.allIpPercent = JSON.parse(response.allIpPercent);
     $scope.ipAttack_Percent = JSON.parse(response.ipAttack_Percent);

     var label = $scope.ip_count;
     var data = $scope.allIpPercent;

     barChartData = {
       labels:label,
       datasets: [{
         label: $scope._title,
         borderWidth: 2,
         borderColor: strokePurple,
         backgroundColor: fillPurpleLight,
         data: data,
       }, ]
     };

     var ctx2 = document.getElementById('blocked-ip-cost-chart').getContext('2d');
     var barChart = new Chart(ctx2, {
       type: 'bar',
       data: barChartData
     });

     $("#blocked-ip-cost-chart").click(function (evt) {
       if(_virusTotal !== null){
         var activePoints = barChart.getElementsAtXAxis(evt);
         if(activePoints["0"]._view.label != 'undefined'){
           window.location = getBlockedIpsClick+'/'+activePoints["0"]._view.label;
         }
       }else{
         $('#warning_msg').text('Please add your total virus device...');
         $('#warning_to_scan_ips').modal();
         $('.continueWarningScan').click(function (e) {
           e.preventDefault();
           $('#warning_to_scan_ips').modal('hide');
           return false;
         });
       }
     }
     );
     var donutData = $scope.ipAttack_Percent;
     visitorsDonutChart(donutData ,'visitors-donut-chart-blocked-Ips');

   });

 };

 $scope.f5CountryAttacks = function(){
  $scope.attacksCount = 'Loading...';
  $scope.countryCount = 'Loading...';
  $scope.uniqueIps = 'Loading...';
  $http({
    method: 'GET',
    url: url[24]
  }).success(function(response){

    $scope.attacksCount = response.attacksCount;
    $scope.countryCount = response.countryCount;
    $scope.uniqueIps = response.uniqueIps;

  });
};

$scope.f5AttackDistributes = function(){
 $scope._title = 'Loading...';
 $http({
   method: 'GET',
   url: url[25]
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
   url: url[26]
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
   url: url[27]
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
   url: url[28]
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
   url: url[29]
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
   url: url[30]
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
   url: url[31]
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
       borderColor: randomColor,
       backgroundColor: randomColor,
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
   url: url[32]
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
   url: url[33]
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
   url: url[34]
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
   url: url[35]
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
   url: url[36]
 }).success(function(response){

   $scope._ip_client = response._ip_client;
   $scope._count = response._count;
   $scope._percent = JSON.parse(response._percent);
   $scope._tc = JSON.parse(response._tc);
   $scope._title = response._title;

   pieFunction('f5-spreading-top-attacks-ips' ,$scope._ip_client  ,$scope._count ,$scope._percent);


 });
};


/*

Cisco

*/

$scope.getConnectionDenialMb = function(){
  $scope._title = 'Loading...'; //before loading data

  $http({
    method: 'GET',
    url: url[37]
  }).success(function(response){

    $scope.time = JSON.parse(response._time);
    $scope._mb = JSON.parse(response._mb);
    $scope._connections = JSON.parse(response._connections);
    $scope._title = response._title;

    var lineChartData = {
      labels: $scope.time,
      datasets: [{
        label: 'Connections',
        borderColor: strokeBlue,
        pointBackgroundColor: randomColor,
        pointRadius: 2,
        borderWidth: 2,
        backgroundColor: randomColor,
        data: $scope._connections
      }, {
        label: 'MB',
        borderColor: randomColor,
        pointBackgroundColor: randomColor,
        pointRadius: 2,
        borderWidth: 2,
        backgroundColor: randomColor,
        data:  $scope._mb
      }]
    };

    var ctx2 = document.getElementById('denial-mb').getContext('2d');
    var lineChart = new Chart(ctx2, {
      type: 'line',
      data: lineChartData
    });

  });
};


// function to get splunk top ips attack from the splunk api
$scope.getCiscoTopIpsAttacks = function() {
  $scope._title = 'Loading...'; //before loading data
  $http({
    method: 'GET',
    url: url[38]
  }).success(function(response){

    $scope._title = response._title;
    $scope.topCountsIPs = 'Total IPs ('+ response.topCountsIPs +' )';
    $scope.topCountsPercent = 'Maximum Attack Count ('+ response.topCountsPercent +' )';
    $scope.allIpClient = JSON.parse(response.allIpClient);
    $scope.allIpPercent = JSON.parse(response.allIpPercent);
    $scope.ipAttack_Percent = JSON.parse(response.ipAttack_Percent);

    var label = $scope.allIpClient;
    var data = $scope.allIpPercent;

    barChartData = {
      labels:label,
      datasets: [{
        label: 'Attack Count',
        borderWidth: 2,
        borderColor: strokePurple,
        backgroundColor: fillPurpleLight,
        data: data,
      }, ]
    };

    var ctx2 = document.getElementById('cisco_top_attack_ip').getContext('2d');
    var barChart = new Chart(ctx2, {
      type: 'bar',
      data: barChartData
    });

    $("#cisco_top_attack_ip").click(function(evt) {

      if(_virusTotal !== null){
        var activePoints = barChart.getElementsAtXAxis(evt);
        if(activePoints["0"]._view.label != 'undefined'){
         var live_ip = 'cisco';
         window.location = getBlockedIpsClick+'/'+activePoints["0"]._view.label+'/'+live_ip;
       }

     } else {

      $('#warning_msg').text('Please add your total virus device...');
      $('#warning_to_scan_ips').modal();
      $('.continueWarningScan').click(function (e) {
       e.preventDefault();
       $('#warning_to_scan_ips').modal('hide');
       return false;
     });
    }
  }
  );
    var donutData = $scope.ipAttack_Percent;
    visitorsDonutChart(donutData ,'cisco-donut-chart');
  }); 
};


  // function to get splunk country attack from the splunk api
  $scope.ciscoCountryAttackMap = function(){
     $scope._title = 'Loading...'; //before loading data
     $http({
      method: 'GET',
      url: url[39]
    }).success(function(response){

      $scope._title = response._title;
      $scope.attacksCount = response.attacksCount;
      $scope.countryCount = response.countryCount;
      $scope.uniqueIps = response.uniqueIps;
      $scope.attacks = response.ciscoCountryAttackMap;


      var wHeight = '295px';
      var data = JSON.parse($scope.attacks);
      attacksVectorMap(data, wHeight, '#cisco-attack-map');
    });
  };

  $scope.getConn = function(){
    $http({
      method: 'GET',
      url: url[0]
    }).success(function(response){

      $scope._Connection= response.getConnection

    });
  };

  $scope.getDenial = function(){
    $scope._Denials = 'Loading...';
    $http({
      method: 'GET',
      url: url[1]
    }).success(function(response){

      $scope._Denials= response.Denials

    });
  };

  $scope.getTraf = function(){
    $scope._traffic = 'Loading...';
    $http({
      method: 'GET',
      url: url[2]
    }).success(function(response){

      $scope._traffic= response.traffic

    });
  };

  $scope.GetMang = function(){
    $scope._management = 'Loading...';
    $http({
      method: 'GET',
      url: url[3]
    }).success(function(response){

      $scope._management= response.management

    });
  };

  $scope.getTcpProtocolStats = function(){
    $scope._title = 'Loading...';
    $http({
     method: 'GET',
     url: url[46]
   }).success(function(response){

    $scope._protocol_name = JSON.parse(response.protocol_name);
    $scope._mb = JSON.parse(response.denials);
    $scope._title = response._title;

    var pie = 'pie-chart-tcp';
    ciscoPieFunction(pie ,$scope._title ,$scope._protocol_name ,$scope._mb);

  });
 };

 $scope.getManagementEvents = function(){
  $scope._title = 'Loading...';
  $http({
    method: 'GET',
    url: url[6]
  }).success(function(response){

    $scope.time = JSON.parse(response._time);
    $scope._messages = JSON.parse(response._messages);
    $scope._title = response._title;

    var lineChartData = {
      labels: $scope.time,
      datasets: [{
        label: $scope._title,
        borderColor: strokeBlue,
        pointBackgroundColor: strokeBlue,
        pointRadius: 2,
        borderWidth: 2,
        backgroundColor: fillBlueLight,
        data: $scope._messages
      }]
    };

    var ctx2 = document.getElementById('management-events').getContext('2d');
    var lineChart = new Chart(ctx2, {
      type: 'line',
      data: lineChartData
    });


  });
};

$scope.getOtherEvents = function(){
  $scope._title = 'Loading...';
  $http({
    method: 'GET',
    url: url[7]
  }).success(function(response){

    $scope.time = JSON.parse(response._time);
    $scope._messages = JSON.parse(response._messages);
    $scope._title = response._title;

    var lineChartData = {
      labels: $scope.time,
      datasets: [{
        label: $scope._title,
        borderColor: strokeBlue,
        pointBackgroundColor: strokeBlue,
        pointRadius: 2,
        borderWidth: 2,
        backgroundColor: fillBlueLight,
        data: $scope._messages
      }]
    };

    var ctx2 = document.getElementById('other-events').getContext('2d');
    var lineChart = new Chart(ctx2, {
      type: 'line',
      data: lineChartData
    });


  });
};

$scope.getNoNProtocolStats = function(){
  $scope._title = 'Loading...';
  $http({
    method: 'GET',
    url: url[12]
  }).success(function(response){

    $scope._protocol_name = JSON.parse(response.protocol_name);
    $scope.mb = JSON.parse(response.mb);
    $scope._title = response._title;

    var pie = 'pie-chart-non';
    ciscoPieFunction(pie ,$scope._title ,$scope._protocol_name ,$scope.mb);

  });
};

$scope.getDeniedProtocolStats = function(){
  $scope._title = 'Loading...';
  $http({
    method: 'GET',
    url: url[53]
  }).success(function(response){

    $scope._protocol_name = JSON.parse(response.protocol_name);
    $scope._denials = JSON.parse(response._denials);
    $scope._title = response._title;

    var pie = 'pie-chart-denied';
    ciscoPieFunction(pie ,$scope._title ,$scope._protocol_name ,$scope._denials);

  });
};

$scope.allDeniedConnection = function() {
  $scope._title = 'Loading...';
  $http({
   method: 'GET',
   url: url[40]
 }).success(function(response) {

  $scope.time = JSON.parse(response.time);
  $scope.denials = JSON.parse(response.denials);
  $scope._title = response._title;

  barChartData = {
    labels:  $scope.time,
    datasets: [{
      label: 'Denials',
      borderWidth: 2,
      borderColor: strokeBlue,
      backgroundColor: randomColor,
      data:  $scope.denials
    }, ]
  };

  var ctx2 = document.getElementById('denied_connection').getContext('2d');
  var barChart = new Chart(ctx2, {
    type: 'bar',
    data: barChartData
  });
});
};

$scope.getUdpProtocolStats = function(){
  $scope._title = 'Loading...';
  $http({
    method: 'GET',
    url: url[49]
  }).success(function(response){

    $scope._protocol_name = JSON.parse(response.protocol_name);
    $scope._mb = JSON.parse(response.denials);
    $scope._title = response._title;

    var pie = 'pie-chart-udp';
    ciscoPieFunction(pie ,$scope._title ,$scope._protocol_name ,$scope._mb);

  });
};

$scope.getConnectionProtocolStats = function(){
  $scope._title = 'Loading...';
  $http({
    method: 'GET',
    url: url[50]
  }).success(function(response){

    $scope._protocol_name = JSON.parse(response.protocol_name);
    $scope._connection = JSON.parse(response.connection);
    $scope._title = response._title;

    var pie = 'pie-chart-connection';
    ciscoPieFunction(pie ,$scope._title ,$scope._protocol_name ,$scope._connection);

  });
};

$scope.getMbProtocolStats = function(){
  $scope._title = 'Loading...';
  $http({
    method: 'GET',
    url: url[51]
  }).success(function(response){

    $scope._protocol_name = JSON.parse(response.protocol_name);
    $scope.mb = JSON.parse(response.mb);
    $scope._title = response._title;

    var pie = 'pie-chart-mb';
    ciscoPieFunction(pie ,$scope._title ,$scope._protocol_name ,$scope.mb);

  });
};

$scope.getTopDenialDestinations = function () {
  $scope._title = 'Loading...';
  $http({
    method: 'GET',
    url: url[41]
  }).success(function (response) {

    $scope._protocol_name = JSON.parse(response.protocol_name);
    $scope._mb = JSON.parse(response.denials);
    $scope._title = response._title;

    var pie = 'denial-destination';
    ciscoPieFunction(pie, $scope._title, $scope._protocol_name, $scope._mb);

  });
};

$scope.topDeniedProtocols = function () {
  $scope._title = 'Loading...';
  $http({
    method: 'GET',
    url: url[54]
  }).success(function (response) {
    $scope._protocol_name = JSON.parse(response.protocol_name);
    $scope.denials = JSON.parse(response._denials);
    $scope._title = response._title;
    var pie = 'top-denied-protocol';
    ciscoPieFunction(pie, $scope._title, $scope._protocol_name, $scope.denials);

  });
};

$scope.getDeniedSource = function () {
  $scope._title = 'Loading...';
  $http({
    method: 'GET',
    url: url[55]
  }).success(function (response) {
    $scope._src_name = JSON.parse(response._src_name);
    $scope.denials = JSON.parse(response._denials);
    $scope._title = response._title;
    var pie = 'denied-source-protocol';
    ciscoPieFunction(pie, $scope._title, $scope._src_name, $scope.denials);

  });
};

  /*
  Logger graphs
  */

  $scope.TopCountryAttacks = function() {

  $scope._title = 'Loading...'; //before loading data
  $http({
   method: 'GET',
   url: url[6]

 }).success(function(response) {

  if(response) {

    $scope._countryAttackLabel = JSON.parse(response.countryAttackLabel);
    $scope._countryAttackPercent = JSON.parse(response.countryAttackPercent);
    $scope._count = JSON.parse(response.count);
    $scope._title = response._title;

    barChartData = {
      labels:  $scope._countryAttackLabel,
      datasets: [{
        label: 'Top Country Attacks',
        borderWidth: 2,
        borderColor: randomColor,
        backgroundColor: randomColor,
        data:  $scope._count
      }, ]
    };

    var ctx2 = document.getElementById('country_attacks').getContext('2d');
    var barChart = new Chart(ctx2, {
      type: 'bar',
      data: barChartData
    });
  } else {
    scope._title ='No Data found';
  }

});

}; 

//Top attacking types graph
$scope.TopAttackingTypes = function() {

 $scope._title = 'Loading...'; 

 $http({
   method: 'GET',
   url: url[7]

 }).success(function(response){

  if(response) {

    $scope._attack_type_label = JSON.parse(response.attack_type_label);
    $scope._attack_type_percent = JSON.parse(response.attack_type_percent);
    $scope._count = JSON.parse(response.count);
    $scope._title = response._title;

    barChartData = {
      labels:  $scope._attack_type_label,
      datasets: [{
        label:  'Top Attacking Types',
        borderWidth: 2,
        borderColor: randomColor,
        backgroundColor: randomColor,
        data:  $scope._count
      }, ]
    };

    var ctx2 = document.getElementById('attacking_types').getContext('2d');
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
  } else {
    scope._title ='No Data found';
  }
});

};

//Top voilations Graph
$scope.TopViolations = function() {

 $scope._title = 'Loading...';
 $http({
   method: 'GET',
   url: url[8]

 }).success(function(response){

  if(response) {

    $scope._violations_label = JSON.parse(response.violations_label);
    $scope._violations_percent = JSON.parse(response.violations_percent);
    $scope._count = JSON.parse(response.count);
    $scope._title = response._title;

    barChartData = {
      labels:  $scope._violations_label,
      datasets: [{
        label:  'Top Violations',
        borderWidth: 2,
        borderColor: randomColor,
        backgroundColor: randomColor,
        data:  $scope._count
      }, ]
    };

    var ctx2 = document.getElementById('voilations').getContext('2d');
    var barChart = new Chart(ctx2, {
      type: 'horizontalBar',
      data: barChartData,
      options: {
        scales: {
          xAxes: [{
            ticks: {
                  beginAtZero: true  // Edit the value according to what you need
                }
              }],
              yAxes: [{
                stacked: true
              }]
            }
          }
        });
  } else {
    scope._title ='No Data found';
  }

        });  //

    }; //

     // Destination Ips graps
     $scope.TopDestinationIPs = function() { 

       $scope._title = 'Loading...';
       $http({
         method: 'GET',
         url: url[9]

       }).success(function(response){

        if(response) {

          $scope._dest_ip_label = JSON.parse(response.dest_ip_label);
          $scope._dest_ip_percent = JSON.parse(response.dest_ip_percent);
          $scope._count = JSON.parse(response.count);
          $scope._title = response._title;

          barChartData = {
            labels:  $scope._dest_ip_label,
            datasets: [{
              label:  'Top Attacking IPs',
              borderWidth: 2,
              borderColor: randomColor,
              backgroundColor: randomColor,
              data:  $scope._count
            }, ]
          };

          var ctx2 = document.getElementById('destination_ips').getContext('2d');
          var barChart = new Chart(ctx2, {
            type: 'horizontalBar',
            data: barChartData,
            options: {
              scales: {
                xAxes: [{
                  ticks: {
                    beginAtZero: true 
                  }
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            }
          });
        } else {
          scope._title ='No Data found';
        }

      });
     };


     $scope.TopDeniedDestinations = function () { 
      $scope._title = 'Loading...';
      $http({
        method: 'GET',
        url: url[10]
      }).success(function (response) {

        if(response) {

         $scope._protocol_name = JSON.parse(response.protocol_name);
         $scope.denials = JSON.parse(response.denials);
         $scope._title = response._title;

         var pie = 'denial-destination';

         var pieChartData = {
          labels: $scope._protocol_name,
          datasets: [{
            data: $scope.denials,
            backgroundColor: randomColor,
            borderColor: randomColor,
            borderWidth: 2,
            label: $scope._protocol_name
          }]
        };
        var ctx5 = document.getElementById(pie).getContext('2d');
        window.myPie = new Chart(ctx5, {
          type: 'pie',
          data: pieChartData
        });

      } else {

       $scope._title ='No Data found';
     }

   });

    };

    // storm shield events counts
    $scope.getEventsCounts = function () { 
      $scope._title = 'Loading...';
      $http({
        method: 'GET',
        url: url[11]
      }).success(function (response) {

       $scope._events = response;

     });

    };

    //storm shield block counts
    $scope.getBlockCounts = function () { 
      $scope._title = 'Loading...';
      $http({
        method: 'GET',
        url: url[12]
      }).success(function (response) {

       $scope._blocks = response;

     });

    };

    //top url counts
    $scope.getTopUrl = function () { 
      $scope._title = 'Loading...';
      $http({
        method: 'GET',
        url: url[13]
      }).success(function (response) {

       $scope._top_url = response;

     });

    };

    //sent counts
    $scope.getSentCounts = function () { 
      $scope._title = 'Loading...';
      $http({
        method: 'GET',
        url: url[15]
      }).success(function (response) {

       $scope._sents = response;

     });

    };

      //sent counts
      $scope.getRecievedCounts = function () { 
        $scope._title = 'Loading...';
        $http({
          method: 'GET',
          url: url[16]
        }).success(function (response) {

         $scope._recieve = response;

       });

      };

    //storm shield event graphs
    $scope.getEventsGraph = function(){
     $scope._title = 'Loading...';
     $http({
       method: 'GET',
       url: url[14]
     }).success(function(response){

      if(response) {

        $scope._label = JSON.parse(response._label);
        $scope._count = JSON.parse(response.count);
        $scope._title = response._title;

        barChartData = {
          labels: $scope._label,
          datasets: [{
            label:  'Top logtype',
            borderWidth: 2,
            borderColor: randomColor,
            backgroundColor: randomColor,
            data:  $scope._count
          }]
        };

        var ctx2 = document.getElementById('event-graph').getContext('2d');
        var barChart = new Chart(ctx2, {
          type: 'bar',
          data: barChartData
        });
      } else {
        scope._title ='No Data found';
      }


    });
   };

   //storm shield alaram graph
   $scope.getAlarmGraph = function(){

     $scope._title = 'Loading...';
     $http({
       method: 'GET',
       url: url[14]
     }).success(function(response){
       if(response) {
         $scope._ip_client = response._ip_client;
         $scope._count = response._count;
         $scope._percent = JSON.parse(response._percent);
         $scope._title = response._title;

         pieFunction('alarm-graph', $scope._ip_client , $scope._count ,$scope._percent);
       } else {
        scope._title ='No Data found';
      }
    });
   };

    //storm shield sent graphs
    $scope.getSentGraph = function(){
     $scope._title = 'Loading...';
     $http({
       method: 'GET',
       url: url[18]
     }).success(function(response){

      if(response) {

        $scope._label = JSON.parse(response._label);
        $scope._count = JSON.parse(response.count);
        $scope._title = response._title;

        barChartData = {
          labels: $scope._label,
          datasets: [{
            label:  'Top Upload',
            borderWidth: 2,
            borderColor: randomColor,
            backgroundColor: randomColor,
            data:  $scope._count
          }]
        };

        var ctx2 = document.getElementById('sent-graph').getContext('2d');
        var barChart = new Chart(ctx2, {
          type: 'bar',
          data: barChartData
        });
      } else {
        scope._title ='No Data found';
      }


    });
   };

    //generic server alaram graph
    $scope.getTypeGraph = function(){

     $scope._title = 'Loading...';
     $http({
       method: 'GET',
       url: url[19]
     }).success(function(response){

       $scope._label = JSON.parse(response._label);
       $scope._label_titles = response._label_titles;
       $scope._count = JSON.parse(response.count);
       $scope._title = response._title;
       $scope._description = response._description;
       var datasets =[];

       for ($i = 0; $i < $scope._count.length; $i++) {

         var data = [];
         for (var j = 0; j < $scope._count.length; j++) {
           if (j == $i)
             data.push($scope._count[$i]);
           else
             data.push(0);
         }
         var color = randomColor;

         datasets.push({
           label: $scope._label_titles[$i],
           borderWidth: 2,
           backgroundColor: color[$i],
           
           data: data
         });
       }

       barChartData = {
        labels:  $scope._label_titles,
        datasets: datasets
      };
      var ctx2 = document.getElementById('type-graph').getContext('2d');
      var barChart = new Chart(ctx2, {
        type: 'horizontalBar',
        data: barChartData,
        options: {
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true 
              }
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }
      });

    });
   };

   //generic server alarm graph
   $scope.getPidGraph = function(){

     $scope._title = 'Loading...';
     $http({
       method: 'GET',
       url: url[20]
     }).success(function(response){
       if(response) {
         $scope._ip_client = response._ip_client;
         $scope._count = response._count;
         $scope._percent = JSON.parse(response._percent);
         $scope._title = response._title;
         $scope._description = response._description;

         pieFunction('pid-graph', $scope._ip_client , $scope._count ,$scope._percent);
       } else {
        $scope._title ='No Data found';
        $scope._description = '';
      }
    });
   };

   $scope.getTypeGraphByTime = function(){
    $scope._title = 'Loading...';
    $http({
      method: 'GET',
      url: url[21]
    }).success(function(response){

      $scope.event_types = JSON.parse(response.event_types);
      $scope._title = response._title;
      $scope._description = response._description;

      $scope._title = response._title;
      var datasets = [];
      var colorIndex = 0;
      var colors = randomHues(5,0.3);
      //  debugger;
      for (var key in $scope.event_types) {
        if ($scope.event_types.hasOwnProperty(key)) {

          var data = [];
          for(var i = 0; i < $scope.event_types[key].length ; i++){

            data.push({
              x: $scope.event_types[key][i]['x'],
              y: $scope.event_types[key][i]['y']
            });
          }
          datasets.push({
            label: key,
            borderColor: strokeBlue, //colors[colorIndex],
            pointBackgroundColor: strokeBlue, //colors[colorIndex],
            pointRadius: 2,
            borderWidth: 2,
            backgroundColor:colors[colorIndex],
            data: data
          });
        }
        colorIndex++;
      }

      var lineChartData = {
        datasets: datasets
      };

      var ctx2 = document.getElementById('line-types').getContext('2d');
      var lineChart = new Chart(ctx2, {
        type: 'line',
        data: lineChartData ,
        options: {
          responsive: true,
          title: {
            display: false,
            
          },
          scales: {
            xAxes: [{
              type: 'time',
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Date'
              },
              ticks: {
                major: {
                  fontStyle: 'bold',
                  fontColor: '#FF0000'
                }
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'value'
              }
            }]
          }
        }
      });


    });
  };

    //generic_server address graph
    $scope.getAddressGraph = function(){

     $scope._title = 'Loading...';
     $http({
       method: 'GET',
       url: url[21]
     }).success(function(response){
       if(response) {
         $scope._labels = JSON.parse(response._labels);
         $scope.counts = JSON.parse(response.counts);
         $scope._title = response._title;
         $scope._description = response._description;
         if( !isEmpty($scope.counts) ) {
          polarChart('addr-graph', $scope._labels, $scope.counts);
        }
      } else {
        $scope._title ='No Data found';
      }
    });
   };


    //Generic server success graph
    $scope.getSuccessGraph = function(){
     $scope._title = 'Loading...';
     $http({
       method: 'GET',
       url: url[22]
     }).success(function(response){

      if(response) {

       $scope._label = JSON.parse(response._label);
       $scope._label_titles = response._label_titles;
       $scope._count = JSON.parse(response.count);
       $scope._title = response._title;
       $scope._description = response._description;
       var datasets =[];

       for ($i = 0; $i < $scope._count.length; $i++) {

         var data = [];
         for (var j = 0; j < $scope._count.length; j++) {
           if (j == $i)
             data.push($scope._count[$i]);
           else
             data.push(0);
         }
         var color = randomColor;

         datasets.push({
           label: $scope._label[$i],
           borderWidth: 2,
           borderColor: color[$i],
           backgroundColor: color[$i],
           data: data
         });
       }

       barChartData = {
        labels:  $scope._label_titles,
        datasets: datasets
      };

      var ctx2 = document.getElementById('success-graph').getContext('2d');
      var barChart = new Chart(ctx2, {
        type: 'bar',
        data: barChartData
      });
    } else {
      scope._title ='No Data found';
    }

  });
   };   

 });

 var statusDeviceCheck = function($scope, $http, url,$param){
   $http({
     method: 'GET',
     url: url[4],
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

 customDashboard.filter('trustAsHtml',['$sce', function($sce) {

   return function(text) {

     return $sce.trustAsHtml(text);

   };

 }]);

