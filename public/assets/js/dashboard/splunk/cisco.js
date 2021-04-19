var CiscoApp = angular.module('CiscoDashboardFromSplunk', []),

white = 'rgba(255,255,255,1.0)',
fillBlue = 'rgba(52, 143, 226, 0.6)',
strokeBlue = 'rgba(52, 143, 226, 0.8)',
fillPurpleLight = 'rgba(114, 124, 182, 0.2)',
strokePurple = 'rgba(114, 124, 182, 0.8)',
white = 'rgba(255,255,255,1.0)',
fillBlack = 'rgba(45, 53, 60, 0.6)',
fillBlackLight = 'rgba(45, 53, 60, 0.2)',
strokeBlack = 'rgba(45, 53, 60, 0.8)',
highlightFillBlack = 'rgba(45, 53, 60, 0.8)',
highlightStrokeBlack = 'rgba(45, 53, 60, 1)',

// blue
fillBlue = 'rgba(52, 143, 226, 0.6)',
fillBlueLight = 'rgba(52, 143, 226, 0.2)',
strokeBlue = 'rgba(52, 143, 226, 0.8)',
highlightFillBlue = 'rgba(52, 143, 226, 0.8)',
highlightStrokeBlue = 'rgba(52, 143, 226, 1)',

// grey
fillGrey = 'rgba(182, 194, 201, 0.6)',
fillGreyLight = 'rgba(182, 194, 201, 0.2)',
strokeGrey = 'rgba(182, 194, 201, 0.8)',
highlightFillGrey = 'rgba(182, 194, 201, 0.8)',
highlightStrokeGrey = 'rgba(182, 194, 201, 1)',

// green
fillGreen = 'rgba(0, 172, 172, 0.6)',
fillGreenLight = 'rgba(0, 172, 172, 0.2)',
strokeGreen = 'rgba(0, 172, 172, 0.8)',
highlightFillGreen = 'rgba(0, 172, 172, 0.8)',
highlightStrokeGreen = 'rgba(0, 172, 172, 1)',

// purple
fillPurple = 'rgba(114, 124, 182, 0.6)',
highlightFillPurple = 'rgba(114, 124, 182, 0.8)',
highlightStrokePurple = 'rgba(114, 124, 182, 1)',

blue        = '#348fe2',
blueLight   = '#5da5e8',
blueDark    = '#1993E4',
aqua        = '#49b6d6',
aquaLight   = '#6dc5de',
aquaDark    = '#3a92ab',
green       = '#0f9e3e',
greenLight  = '#33bdbd',
greenDark   = '#008a8a',
orange      = '#f59c1a',
orangeLight = '#f7b048',
orangeDark  = '#c47d15',
dark        = '#2d353c',
darkLight   = '#474e55',
grey        = '#b6c2c9',
purple      = '#727cb6',
purpleLight = '#8e96c5',
purpleDark  = '#5b6392',
red         = '#ff5b57',

barChart = null,
ctx2 = '',
ciscoCharts = [],
barChartData = [],

randomHues = function (n) {
    var res = [];
    for (var i = 0; i < n; i++)
        res.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')')
    return res
},

randomColor = randomHues(256),

visitorsDonutChart = function (_ipAttack_Percent, _donut_id) {
    if (!ciscoCharts[_donut_id]) {
        Morris.Donut({
            element: _donut_id,
            data: _ipAttack_Percent,
            colors: [green, blue],
            labelFamily: 'Open Sans',
            labelColor: 'rgba(0,0,0,0.4)',
            labelTextSize: '12px',
            backgroundColor: '#242a30'
        });

    } else {
        updateMorrisChartData(ciscoCharts[_donut_id], _ipAttack_Percent);
    }
},

updateMorrisChartData = function (chart, data) {
    chart.setData(data);
},

CiscoAttacksVectorMap = function (_attacks, wHeight) {
    if (('#cisco-attack-map').length !== 0) {
        $('#cisco-attack-map').css('height', wHeight);
        $('#cisco-attack-map').vectorMap({
            map: 'world_mill_en',
            scaleColors: [grey, darkLight],
            normalizeFunction:'linear',
            hoverOpacity:0.5,
            hoverColor:false,
            zoomOnScroll:false,
            markerStyle:{initial:{fill:green,stroke:'transparent',r:3}},
            regionStyle:{initial:{fill: darkLight,"fill-opacity":1,
            stroke:'none',"stroke-width":0.4,"stroke-opacity":1},
            hover:{"fill-opacity":0.8},selected:{fill:'yellow'}},
            focusOn:{x:0.5,y:0.5,scale:1},
            backgroundColor:'transparent',
            markers: _attacks
        });
    }
},

ciscoPieFunction = function (id, label, title, data) {
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
    if (!ciscoCharts[id]) {
        var ctx5 = document.getElementById(id).getContext('2d');
        ciscoCharts[id] = new Chart(ctx5, {
            type: 'pie',
            data: pieChartData,
            options: {
                maintainAspectRatio: false,
                responsive: true,
            }
        });
    } else {
        updateCiscoChartData(ciscoCharts[id], pieChartData);
    }

},

updateCiscoChartData = function (chart, data) {
    chart.data.labels = data.labels;
    chart.data.datasets = data.datasets;
    chart.update();
};

CiscoApp.controller('CiscoController', function ($scope, $http, $interval) {

    $scope.timer = null; //timer

    $scope.url = [
    getSetIntervalID,
    checkActiveDeviceViaAPIURL,
    ];

    $scope.typeOptions = [ //
    {name: '30 Sec', value: '30000'}
    ];

    $scope.auto_refresh = $scope.typeOptions[0].value;

    $scope.showDefaultStatus = true;

     // function to refresh default
     $scope.auto_repeat_in_cisco = function (repeat_time) {

        var target = event.target || event.srcElement || event.currentTarget;
        var id  = target.offsetParent.id;
        if(id) {
            var widget_data = JSON.parse(id); //parse
            var repeat = $('.'+widget_data.function_name).data('repeat'); //getter
            $scope.CiscoCustomFunction(id, repeat, true);
        }

    };

    // function to get splunk multiple data
    $scope.get_cisco_splunk_devices = function (_user_splunk_device_url) {
        $scope.get_splunk_devices(_user_splunk_device_url);
    };

    //get splunk devices 
    $scope.get_splunk_devices =  function(_user_splunk_device_url) {

        $http({ //get http response
            method: 'GET',
            url: _user_splunk_device_url
        }).success(function (response) {

            if (response[0]['widget_data']) {

                $scope.CiscoCustomFunction(response[0]['widget_data']);
                $scope.splunk_devices = response;

                $scope.device_option = [ 
                {name: response[0]['device_name'], value: response[0]['widget_data']}
                ];

                $scope._device_data = $scope.device_option[0].value;

                widget_data = JSON.parse(response[0]['widget_data']); //parse
                $('.'+widget_data.function_name).attr('id', response[0]['widget_data']);
            }

        }).error(function (err) {
            console.log('errr >> ');
            console.log(err);
        });
    }

     //get splunk devices and get data accordingly
     $scope.action_in_splunk = function (splunk_data) {

        widget_data = JSON.parse(splunk_data); //parse
        $('.'+widget_data.function_name).attr('id', splunk_data);
        $('.'+widget_data.function_name).attr('data-repeat', splunk_data);
        $scope.CiscoCustomFunction(splunk_data, 30000, true);
    };

    //get graph name and autofresh value on select function
    $scope.action_in_cisco = function (auto_refresh) {

        var target = event.target || event.srcElement || event.currentTarget;
        var id = target.attributes.id;
        var function_name = id.nodeValue; //get graph id so can integrate specific graph on refresh time
        if (auto_refresh) {
            $scope.CiscoCustomFunction(function_name, auto_refresh, true);
        }

    };

    //on load graph render on page
    $scope.CiscoCustomFunction = function (widget_data, auto_refresh = 30000, refresh = false) {

        widget_data = JSON.parse(widget_data); //parse
        function_name = widget_data.function_name; //function name
        $scope.getCiscoCustomFunction(function_name, widget_data);

        if (!refresh) {
            $scope.setInterval(widget_data, auto_refresh);
        } else {
            $('.'+function_name).attr('data-repeat',auto_refresh); //setter
            $scope.getSetIntervalID(widget_data, null, auto_refresh);
        }

    }

    //set interval with new interval id 
    $scope.setInterval = function (widget_data, auto_refresh) {

        var interval = $interval(function () { // auto refresh after selected time to specific graph
            $scope.CallCiscoCustomFunctionAgain(widget_data.function_name, widget_data);
        }, auto_refresh);

        var interval_id = interval['$$intervalId'];
        $scope.getSetIntervalID(widget_data, interval_id);

    };

    //set and get interval id for a specific graph
    $scope.getSetIntervalID = function (widget_data, interval_id = null, auto_refresh = null) {

        var interval_url;

        if (interval_id == null) {
            interval_url = $scope.url[0] + '/' + widget_data.function_name;
        } else {
            interval_url = $scope.url[0] + '/' + widget_data.function_name + '/' + interval_id;
        }

        $http({
            method: 'GET',
            url: interval_url

        }).success(function (response) {

            if (response > 0) {
                clearInterval(response);
                $scope.setInterval(widget_data, auto_refresh);
            }

        });

    };


    //on selected specific interval render graph
    $scope.CallCiscoCustomFunctionAgain = function (function_name, widget_data = {}) {
        $scope.getCiscoCustomFunction(function_name, widget_data);
    };

    //get custome function when it call back
    $scope.getCiscoCustomFunction = function (function_name, widget_data = {}) {
        $scope.removeExtraIframes(function_name);

        switch (function_name) {

            case 'getTopIpsAttacks':
            $scope.getTopIpsAttacks(widget_data);
            break;

            case 'ciscoCountryAttackMap':
            $scope.ciscoCountryAttackMap(widget_data);
            break;

            case 'getBlockedIpsInDb':
            $scope.getBlockedIpsInDb(widget_data);
            break;

            case 'getConnectionDenialMb':
            $scope.getConnectionDenialMb(widget_data);
            break;


            //count boxes
            case 'getConnection':
            $scope.getConnection(widget_data);
            break;
            case 'getDenial':
            $scope.getDenial(widget_data);
            break;
            case 'getTraffic':
            $scope.getTraffic(widget_data);
            break;
            case 'getManagement':
            $scope.getManagement(widget_data);
            break;

            //Cisco Protocoals
            case 'getTcpProtocolStats':
            $scope.getTcpProtocolStats(widget_data);
            break;

            case 'getUdpProtocolStats':
            $scope.getUdpProtocolStats(widget_data);
            break;

            case 'getConnectionProtocolStats':
            $scope.getConnectionProtocolStats(widget_data);
            break;

            case 'getMbProtocolStats':
            $scope.getMbProtocolStats(widget_data);
            break;

            case 'getNoNProtocolStats':
            $scope.getNoNProtocolStats(widget_data);
            break;

            case 'getDeniedProtocolStats':
            $scope.getDeniedProtocolStats(widget_data);
            break;

            //Denials
            case 'getDeniedConnection':
            $scope.getDeniedConnection(widget_data);
            break;
            case 'getDenialDestinations':
            $scope.getDenialDestinations(widget_data);
            break;
            case 'getDeniedSource':
            $scope.getDeniedSource(widget_data);
            break;
            case 'getDeniedProtocols':
            $scope.getDeniedProtocols(widget_data);
            break;

            //Management
            case 'getManagementEvents':
            $scope.getManagementEvents(widget_data);
            break;
            case 'getOtherEvents':
            $scope.getOtherEvents(widget_data);
            break;

            
            
        }

    };

    $scope.getConnection = function (widget_data) {

        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {
            $scope._Connection = response.getConnection

        });
    };

    $scope.getDenial = function (widget_data) {
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            $scope._Denials = response.Denials

        });
    };

    $scope.getTraffic = function (widget_data) {
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            $scope._traffic = response.traffic

        });
    };

    $scope.getManagement = function (widget_data) {
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            $scope._management = response.management

        });
    };
    // check via API call if the Device is active or Not
    $scope.checkActiveDeviceViaAPI = function ($param) {

        // this function run on initialize
        statusDeviceCheck($scope, $http , $param);
        $scope.timer = $interval(function () {

            //this function run on every 2 mint
            statusDeviceCheck($scope, $http, $param);  // Refresh Every 2 minute
        }, 120000);
    };

    $scope.getConnectionDenialMb = function (widget_data) {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            $scope.time = JSON.parse(response._time);
            $scope._mb = JSON.parse(response._mb);
            $scope._connections = JSON.parse(response._connections);
            $scope._title = response._title;

            var lineChartData = {
                labels: $scope.time,
                datasets: [{
                    label: 'Connections',
                    borderColor: strokeBlue,
                    pointBackgroundColor: strokeBlue,
                    pointRadius: 2,
                    borderWidth: 2,
                    backgroundColor: fillBlueLight,
                    data: $scope._connections
                }, {
                    label: 'MB',
                    borderColor: strokeBlack,
                    pointBackgroundColor: strokeBlack,
                    pointRadius: 2,
                    borderWidth: 2,
                    backgroundColor: fillBlackLight,
                    data: $scope._mb
                }]
            };
            var graph_id = widget_data.function_name;
            if (!ciscoCharts[graph_id]) {
                var ctx2 = document.getElementById(graph_id).getContext('2d');
                ciscoCharts[graph_id] = new Chart(ctx2, {
                    type: 'line',
                    data: lineChartData,
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                    }
                });
            } else {
                updateCiscoChartData(ciscoCharts[graph_id], barChartData);
            }


        });
    };

    $scope.getAttackMapCheck = 0;
    // function to get splunk country attack from the splunk api
    $scope.ciscoCountryAttackMap = function (widget_data) {

        $('#cisco-attack-map').html('');
        $scope._title = 'Loading...';

        if ($scope.getAttackMapCheck == 0) {

            $scope.getAttackMapCheck = 1;

            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._title = response._title;
                $scope.attacksCount = response.attacksCount;
                $scope.countryCount = response.countryCount;
                $scope.uniqueIps = response.uniqueIps;
                $scope.attacks = response.ciscoCountryAttackMap;


                var wHeight = '275px';
                var data = JSON.parse($scope.attacks);
                CiscoAttacksVectorMap(data, wHeight);
                $scope.getAttackMapCheck = 0;

            });

        } else {
            console.log('getAttackMapCheck request skipped');
        }
    };


    // function to get splunk top ips attack from the splunk api
    $scope.getTopIpsAttacks = function (widget_data = {}) {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            $scope._title = response._title;
            $scope.topCountsIPs = 'Total IPs (' + response.topCountsIPs + ' )';
            $scope.topCountsPercent = 'Maximum Attack Count (' + response.topCountsPercent + ' )';
            $scope.allIpClient = JSON.parse(response.allIpClient);
            $scope.allIpPercent = JSON.parse(response.allIpPercent);
            $scope.ipAttack_Percent = JSON.parse(response.ipAttack_Percent);

            if (response._title === 'Please add Cisco Device') {
                $('.attacksCountCss').hide();
                $('.cisco_url').show();
                $('.cisco_url').html(addDeviceUrl);
            }
            var label = $scope.allIpClient;
            var data = $scope.allIpPercent;

            barChartData = {
                labels: label,
                datasets: [{
                    label: 'Attack Count',
                    borderWidth: 2,
                    borderColor: strokePurple,
                    backgroundColor: fillPurpleLight,
                    data: data,
                },]
            };
            var graph_id = 'getTopIpsAttacks';
            if (!ciscoCharts[graph_id]) {
                var ctx2 = document.getElementById(graph_id).getContext('2d');
                ciscoCharts[graph_id] = new Chart(ctx2, {
                    type: 'bar',
                    data: barChartData,
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                    }
                });

                $("#getTopIpsAttacks").click(function (evt) {

                    if (_virusTotal !== null) {
                        var activePoints = ciscoCharts[graph_id].getElementsAtXAxis(evt);
                        if (activePoints["0"]._view.label != 'undefined') {
                            var live_ip = 'cisco';
                            window.location = getBlockedIpsClick + '/' + activePoints["0"]._view.label + '/' + live_ip;
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
            } else {
                updateCiscoChartData(ciscoCharts[graph_id], barChartData);
            }

            var donutData = $scope.ipAttack_Percent;
            visitorsDonutChart(donutData, 'visitors-donut-chart');
        });
    };

    // function to get splunk top ips attack from the splunk api
    $scope.getBlockedIpsInDb = function (widget_data) {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            $scope._title = response._title;
            $scope.topBlockedCountsIPs = 'Total IPs (' + response.topCountsIPs + ' )';
            $scope.topBlockedCountsPercent = 'Maximum % Blocked (' + response.topCountsPercent + ' %)';
            $scope.allIpClient = JSON.parse(response.allIpClient);
            $scope.allIpPercent = JSON.parse(response.allIpPercent);
            $scope.ipAttack_Percent = JSON.parse(response.ipAttack_Percent);

            var label = $scope.allIpClient;
            var data = $scope.allIpPercent;

            barChartData = {
                labels: label,
                datasets: [{
                    label: 'Attacking %',
                    borderWidth: 2,
                    borderColor: strokePurple,
                    backgroundColor: fillPurpleLight,
                    data: data,
                },]
            };
            var graph_id = widget_data.function_name;
            if(!ciscoCharts[graph_id]){
                var ctx2 = document.getElementById(graph_id).getContext('2d');
                ciscoCharts[graph_id] = new Chart(ctx2, {
                    type: 'bar',
                    data: barChartData,
                    options: {
                        maintainAspectRatio: false,
                        responsive: true,
                    }
                });

                $("#"+widget_data.function_name).click(function (evt) {
                    if (_virusTotal !== null) {
                        var activePoints = ciscoCharts[graph_id].getElementsAtXAxis(evt);
                        if (activePoints["0"]._view.label != 'undefined') {
                            window.location = getBlockedIpsClick + '/' + activePoints["0"]._view.label;
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
            }else{
                updateCiscoChartData(ciscoCharts[graph_id], barChartData);
            }

            var donutData = $scope.ipAttack_Percent;
            visitorsDonutChart(donutData, 'visitors-donut-chart-blocked-Ips');
        });
    };


    /*
    *  Protocoals
    */

    //get cisco protocoals
    $scope.getTcpProtocolStatsCheck = 0;
    $scope.getTcpProtocolStats = function(widget_data){

        if ($scope.getTcpProtocolStatsCheck == 0) {

            $scope.getTcpProtocolStatsCheck = 1;

            $scope._title = 'Loading...';
            $http({
               method: 'GET',
               url: widget_data.url
           }).success(function(response){

            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope._mb = JSON.parse(response.denials);
            $scope._title = response._title;

            var pie_id = widget_data.function_name;
            ciscoPieFunction(pie_id ,$scope._title ,$scope._protocol_name ,$scope._mb);

            $scope.getTcpProtocolStatsCheck = 0;
        });

       } else {
        console.log('getTcpProtocolStats request skipped');
    }
};

//udp protocoals
$scope.getUdpProtocolStatsCheck = 0;
$scope.getUdpProtocolStats = function(widget_data){

    if ($scope.getUdpProtocolStatsCheck == 0) {

        $scope.getUdpProtocolStatsCheck = 1;

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function(response){

            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope._mb = JSON.parse(response.denials);
            $scope._title = response._title;

            var graph_id = widget_data.function_name;
            ciscoPieFunction(graph_id ,$scope._title ,$scope._protocol_name ,$scope._mb);
            $scope.getUdpProtocolStatsCheck = 0;

        });

    } else {
        console.log('getUdpProtocolStats request skipped');
    }
};

$scope.getConnectionProtocolStatsCheck = 0;
$scope.getConnectionProtocolStats = function(widget_data){

    if ($scope.getConnectionProtocolStatsCheck == 0) {

        $scope.getConnectionProtocolStatsCheck = 1;

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function(response){

            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope._connection = JSON.parse(response.connection);
            $scope._title = response._title;

            var graph_id = widget_data.function_name;
            ciscoPieFunction(graph_id ,$scope._title ,$scope._protocol_name ,$scope._connection);

            $scope.getConnectionProtocolStatsCheck = 0;
        });

    } else {
        console.log('getConnectionProtocolStats request skipped');
    }
};

$scope.getMbProtocolStatsCheck = 0;
$scope.getMbProtocolStats = function(widget_data){

    if ($scope.getMbProtocolStatsCheck == 0) { //check if get response

        $scope.getMbProtocolStatsCheck = 1;

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function(response){

            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope.mb = JSON.parse(response.mb);
            $scope._title = response._title;

            var graph_id = widget_data.function_name;
            ciscoPieFunction(graph_id ,$scope._title ,$scope._protocol_name ,$scope.mb);
            $scope.getMbProtocolStatsCheck = 0;

        });

    } else {
        console.log('getMbProtocolStats request skipped');
    }
};

$scope.getNoNProtocolStatsCheck = 0;
$scope.getNoNProtocolStats = function(widget_data){

    if ($scope.getNoNProtocolStatsCheck == 0) {

        $scope.getNoNProtocolStatsCheck = 1;

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function(response){

            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope.mb = JSON.parse(response.mb);
            $scope._title = response._title;

            var graph_id = widget_data.function_name;
            ciscoPieFunction(graph_id ,$scope._title ,$scope._protocol_name ,$scope.mb);
            $scope.getNoNProtocolStatsCheck = 0;

        });

    } else {
        console.log('getNoNProtocolStats request skipped');
    }
};

$scope.getDeniedProtocolStatsCheck = 0;
$scope.getDeniedProtocolStats = function(widget_data){

    if ($scope.getDeniedProtocolStatsCheck == 0) {

        $scope.getDeniedProtocolStatsCheck = 1;

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function(response){

            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope._denials = JSON.parse(response._denials);
            $scope._title = response._title;

            var graph_id = widget_data.function_name;
            ciscoPieFunction(graph_id ,$scope._title ,$scope._protocol_name ,$scope._denials);
            $scope.getDeniedProtocolStatsCheck = 0;
        });

    } else {
        console.log('getDeniedProtocolStats request skipped');
    }
};

/*
**Deniels
*/

$scope.getDeniedConnectionCheck = 0;
$scope.getDeniedConnection = function(widget_data) {

    if ($scope.getDeniedConnectionCheck == 0) {

        $scope.getDeniedConnectionCheck = 1;

        $scope._title = 'Loading...';
        $http({
         method: 'GET',
         url: widget_data.url
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
                backgroundColor: highlightStrokeBlue,
                data:  $scope.denials
            }, ]
        };

        var graph_id = widget_data.function_name;

        if (!ciscoCharts[graph_id]) {
            var ctx2 = document.getElementById(graph_id).getContext('2d');
            var barChart = new Chart(ctx2, {
                type: 'bar',
                data: barChartData
            });
        } else {
            updateCiscoChartData(ciscoCharts[id], barChartData);
        }
    });

     $scope.getDeniedConnectionCheck = 0;

 } else {
        console.log('getDeniedConnection request skipped'); // skip request 
    }
};

$scope.getDenialDestinationsCheck = 0;
$scope.getDenialDestinations = function (widget_data) {

    if ($scope.getDenialDestinationsCheck == 0) {

        $scope.getDenialDestinationsCheck = 1;

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope._mb = JSON.parse(response.denials);
            $scope._title = response._title;

            var graph_id = widget_data.function_name;
            ciscoPieFunction(graph_id, $scope._title, $scope._protocol_name, $scope._mb);
            $scope.getDenialDestinationsCheck = 0;
        });

    } else {
        console.log('getDenialDestinations request skipped'); // skip request 
    }
};

$scope.getDeniedSourceCheck = 0;
$scope.getDeniedSource = function (widget_data) {

    if ($scope.getDeniedSourceCheck == 0) {

        $scope.getDeniedSourceCheck = 1;

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            $scope._src_name = JSON.parse(response._src_name);
            $scope.denials = JSON.parse(response._denials);
            $scope._title = response._title;

            var graph_id = widget_data.function_name;
            ciscoPieFunction(graph_id, $scope._title, $scope._src_name, $scope.denials);
            $scope.getDeniedSourceCheck = 0;

        });

    } else {
        console.log('getDeniedSource request skipped'); // skip request 
    }
};

$scope.getDeniedProtocolsCheck = 0;
$scope.getDeniedProtocols = function (widget_data) {

    if ($scope.getDeniedProtocolsCheck == 0) {

        $scope.getDeniedProtocolsCheck = 1;

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {
            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope.denials = JSON.parse(response._denials);
            $scope._title = response._title;

            var graph_id = widget_data.function_name;
            ciscoPieFunction(graph_id, $scope._title, $scope._protocol_name, $scope.denials);
            $scope.getDeniedProtocolsCheck = 0;
        });

    } else {
        console.log('getDeniedProtocols request skipped'); // skip request 
    }
};

/*
**Management
*/
$scope.getManagementEventsCheck = 0;
$scope.getManagementEvents = function(widget_data){

    if ($scope.getManagementEventsCheck == 0) {

        $scope.getManagementEventsCheck = 1;

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
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

            var graph_id = widget_data.function_name;

            if (!ciscoCharts[graph_id]) {
                var ctx2 = document.getElementById(graph_id).getContext('2d');
                var lineChart = new Chart(ctx2, {
                    type: 'line',
                    data: lineChartData
                });
            } else {
                updateCiscoChartData(ciscoCharts[id], lineChartData);
            }

        });

        $scope.getManagementEventsCheck = 0;
    } else {
        console.log('getManagementEvents request skipped'); // skip request 
    }
};

$scope.getOtherEventsCheck = 0;
$scope.getOtherEvents = function(widget_data){

 if ($scope.getOtherEventsCheck == 0) {

    $scope.getOtherEventsCheck = 1;

    $scope._title = 'Loading...';
    $http({
        method: 'GET',
        url: widget_data.url
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

        var graph_id = widget_data.function_name;

        if (!ciscoCharts[graph_id]) {
            var ctx2 = document.getElementById(graph_id).getContext('2d');
            var lineChart = new Chart(ctx2, {
                type: 'line',
                data: lineChartData
            });
        } else {
            updateCiscoChartData(ciscoCharts[id], lineChartData);
        }

    });

    $scope.getOtherEventsCheck = 0;

} else {
        console.log('getOtherEvents request skipped'); // skip request 
    }
};

$scope.IsJsonString = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

    /*
    * It will remove the extra iframes of a div
    * */
    $scope.removeExtraIframes = function (block) {
        $('#' + block).parent();
        var iframes = $('#' + block).parent().find('.chartjs-hidden-iframe');
        iframes.each(function (i, frame) {
            $(frame).remove();
        });
    }

});

var statusDeviceCheck = function ($scope, $http,$param) {
    $http({
        method: 'GET',
        url: $scope.url[1],
        params: {type: $param.device_type, device_id: $param.device_id},
    }).success(function (response) {
        $scope.showDefaultStatus = false;
        if (response == 1) {
            $scope.device_status_via_api = '<span><i class="fa fa-circle text-success Blink"></i>&nbsp; </span>';
        } else if (response == 0) {
            $scope.device_status_via_api = '<span><i class="fa fa-circle text-danger Blink"></i>&nbsp; </span>';
        } else if (response == 2) {
            $scope.device_status_via_api = '<span><i class="fa fa-circle Blink statusBlinkerDefaultColor"></i>&nbsp; </span>';
        }

    });
};

CiscoApp.filter('trustAsHtml', ['$sce', function ($sce) {

    return function (text) {

        return $sce.trustAsHtml(text);

    };

}]);
function resizeCiscoCharts(){

    for (var key in ciscoCharts) {
        if (ciscoCharts.hasOwnProperty(key)) {
            ciscoCharts[key].resize();

        }
    }
}
$(document).on('click', '[data-click=panel-expand]', function (e) {
    setTimeout(function () {
        resizeCiscoCharts();
    }, 200);

});
