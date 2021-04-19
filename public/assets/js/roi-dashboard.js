 // white
 
 var app = angular.module('ROICalculator', []).constant('url', [getBlockedIpsROI]);

 white           = 'rgba(255,255,255,1.0)',
 fillBlue        = 'rgba(52, 143, 226, 0.6)',
 strokeBlue      = 'rgba(52, 143, 226, 0.8)',
 fillPurpleLight = 'rgba(114, 124, 182, 0.2)',
 strokePurple    = 'rgba(114, 124, 182, 0.8)',
 green = '#00acac',
 blue = '#348fe2',
        barChart = null, // 
        ctx2 = '', // 
        barChartData = [], //

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
    }, //
    attacksVectorMap = function(_attacks,wHeight) {
        if (('#splunck-attach-map').length !== 0) {
            $('#splunck-attach-map').css('height', wHeight);
            $('#splunck-attach-map').vectorMap({
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

    app.controller('DashboardROI', function ($scope, $http, url,$interval){
       $scope.timer = null;
     $scope.showDefaultStatus = true; // by default show true

   // function to calculate per hour cost of blocked ip in db
   $scope.getBlockedIpsROI = function(){
    $http({
       method: 'GET',
       url: url[0]
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
               label: 'Cost of blocked IPs',
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
                         //window.open(getBlockedIpsClick+'/'+activePoints["0"]._view.label, '_blank');
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
             //  return false;

             //for donut initialize


         });
};
});
    app.filter('trustAsHtml',['$sce', function($sce) {

       return function(text) {

           return $sce.trustAsHtml(text);

       };

   }]);

