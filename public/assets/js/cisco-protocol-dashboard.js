// white
var app = angular.module('CiscoPrtocolDashboard', []).constant('url', [
    getConnections,
    getDenialCount,
    getTraffic,
    getManagement,
    tcpProtocols,
    getConnectionsDenialMb,
    getManagementEvents,
    getOtherEvents,
    allDeniedConnection,
    udbProtocols,
    connectionProtocols,
    mbProtocols,
    NonProtocols,
    DeniedProtocols,
    getDenialDestinations,
    topDeniedProtocols,
    topDeniedSource


]);

function randomHues(n) {
    var res = [];
    for (var i = 0; i < n; i++)
        res.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')')
    return res
}

var randomColor = randomHues(256);

function pieFunction(id, title, protocol_name, data) {
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
}

var white = 'rgba(255,255,255,1.0)';
var fillBlack = 'rgba(45, 53, 60, 0.6)';
var fillBlackLight = 'rgba(45, 53, 60, 0.2)';
var strokeBlack = 'rgba(45, 53, 60, 0.8)';
var highlightFillBlack = 'rgba(45, 53, 60, 0.8)';
var highlightStrokeBlack = 'rgba(45, 53, 60, 1)';

// blue
var fillBlue = 'rgba(52, 143, 226, 0.6)';
var fillBlueLight = 'rgba(52, 143, 226, 0.2)';
var strokeBlue = 'rgba(52, 143, 226, 0.8)';
var highlightFillBlue = 'rgba(52, 143, 226, 0.8)';
var highlightStrokeBlue = 'rgba(52, 143, 226, 1)';

// grey
var fillGrey = 'rgba(182, 194, 201, 0.6)';
var fillGreyLight = 'rgba(182, 194, 201, 0.2)';
var strokeGrey = 'rgba(182, 194, 201, 0.8)';
var highlightFillGrey = 'rgba(182, 194, 201, 0.8)';
var highlightStrokeGrey = 'rgba(182, 194, 201, 1)';

// green
var fillGreen = 'rgba(0, 172, 172, 0.6)';
var fillGreenLight = 'rgba(0, 172, 172, 0.2)';
var strokeGreen = 'rgba(0, 172, 172, 0.8)';
var highlightFillGreen = 'rgba(0, 172, 172, 0.8)';
var highlightStrokeGreen = 'rgba(0, 172, 172, 1)';

// purple
var fillPurple = 'rgba(114, 124, 182, 0.6)';
var fillPurpleLight = 'rgba(114, 124, 182, 0.2)';
var strokePurple = 'rgba(114, 124, 182, 0.8)';
var highlightFillPurple = 'rgba(114, 124, 182, 0.8)';
var highlightStrokePurple = 'rgba(114, 124, 182, 1)';


var randomScalingFactor = function () {
    return Math.round(Math.random() * 100)
};

white = 'rgba(255,255,255,1.0)',
    fillBlue = 'rgba(52, 143, 226, 0.6)',
    strokeBlue = 'rgba(52, 143, 226, 0.8)',
    fillPurpleLight = 'rgba(114, 124, 182, 0.2)',
    strokePurple = 'rgba(114, 124, 182, 0.8)',
    green = '#00acac',
    blue = '#348fe2',
    barChart = null, //
    ctx2 = '', //
    barChartData = [], //

    barChartData = [], //

    visitorsDonutChart = function (_ipAttack_Percent, _donut_id) {
        Morris.Donut({
            element: _donut_id,
            data: _ipAttack_Percent,
            colors: randomColor,
            labelFamily: 'Open Sans',
            labelColor: 'rgba(0,0,0,0.4)',
            labelTextSize: '12px',
            backgroundColor: '#242a30'
        });
    }, //, //, //
    attacksVectorMap = function (_attacks, wHeight) {
        if (('#cisco-attack-map').length !== 0) {
            $('#cisco-attack-map').css('height', wHeight);
            $('#cisco-attack-map').vectorMap({
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
                    selectedHover: {}
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

app.controller('CiscoController', function ($scope, $http, url, $interval) {
    $scope.timer = null;
    $scope.showDefaultStatus = true; // by default show true
    $scope._Connection = 'Loading...';
    $scope.getConn = function () {
        $http({
            method: 'GET',
            url: url[0]
        }).success(function (response) {

            $scope._Connection = response.getConnection

        });
    };

    $scope.getDenial = function () {
        $scope._Denials = 'Loading...';
        $http({
            method: 'GET',
            url: url[1]
        }).success(function (response) {

            $scope._Denials = response.Denials

        });
    };

    $scope.getTraf = function () {
        $scope._traffic = 'Loading...';
        $http({
            method: 'GET',
            url: url[2]
        }).success(function (response) {

            $scope._traffic = response.traffic

        });
    };

    $scope.GetMang = function () {
        $scope._management = 'Loading...';
        $http({
            method: 'GET',
            url: url[3]
        }).success(function (response) {

            $scope._management = response.management

        });
    };

    $scope.getTcpProtocolStats = function () {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: url[4]
        }).success(function (response) {

            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope._mb = JSON.parse(response.denials);
            $scope._title = response._title;

            var pie = 'pie-chart-tcp';
            pieFunction(pie, $scope._title, $scope._protocol_name, $scope._mb);

        });
    };
    $scope.getConnectionDenialMb = function () {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: url[5]
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

            var ctx2 = document.getElementById('line-chart-cisco').getContext('2d');
            var lineChart = new Chart(ctx2, {
                type: 'line',
                data: lineChartData
            });


        });
    };

    $scope.getManagementEvents = function () {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: url[6]
        }).success(function (response) {

            $scope.time = JSON.parse(response._time);
            $scope._messages = JSON.parse(response._messages);
            $scope._title = response._title != ''?response._title: '&nbsp;';

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

    $scope.getOtherEvents = function () {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: url[7]
        }).success(function (response) {

            $scope.time = JSON.parse(response._time);
            $scope._messages = JSON.parse(response._messages);
            $scope._title = response._title != ''?response._title: '&nbsp;';

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

    $scope.getNoNProtocolStats = function () {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: url[12]
        }).success(function (response) {

            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope.mb = JSON.parse(response.mb);
            $scope._title = response._title;

            var pie = 'pie-chart-non';
            pieFunction(pie, $scope._title, $scope._protocol_name, $scope.mb);

        });
    };

    $scope.getDeniedProtocolStats = function () {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: url[13]
        }).success(function (response) {

            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope._denials = JSON.parse(response._denials);
            $scope._title = response._title;

            var pie = 'pie-chart-denied';
            pieFunction(pie, $scope._title, $scope._protocol_name, $scope._denials);

        });
    };

    $scope.getStats = function () {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: url[8]
        }).success(function (response) {

            $scope.time = JSON.parse(response.time);
            $scope.denials = JSON.parse(response.denials);
            $scope._title = response._title;

            barChartData = {
                labels: $scope.time,
                datasets: [{
                    label: 'Denials',
                    borderWidth: 2,
                    borderColor: strokeBlue,
                    backgroundColor: highlightStrokeBlue,
                    data: $scope.denials
                },]
            };

            var ctx2 = document.getElementById('bar-chart').getContext('2d');
            var barChart = new Chart(ctx2, {
                type: 'bar',
                data: barChartData
            });
        });
    };

    $scope.getUdpProtocolStats = function () {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: url[9]
        }).success(function (response) {

            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope._mb = JSON.parse(response.denials);
            $scope._title = response._title;

            var pie = 'pie-chart-udp';
            pieFunction(pie, $scope._title, $scope._protocol_name, $scope._mb);

        });
    };
    $scope.getConnectionProtocolStats = function () {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: url[10]
        }).success(function (response) {

            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope._connection = JSON.parse(response.connection);
            $scope._title = response._title;

            var pie = 'pie-chart-connection';
            pieFunction(pie, $scope._title, $scope._protocol_name, $scope._connection);

        });
    };

    $scope.getMbProtocolStats = function () {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: url[11]
        }).success(function (response) {

            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope.mb = JSON.parse(response.mb);
            $scope._title = response._title;

            var pie = 'pie-chart-mb';
            pieFunction(pie, $scope._title, $scope._protocol_name, $scope.mb);

        });
    };

    $scope.getDenialDestinations = function () {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: url[14]
        }).success(function (response) {

            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope._mb = JSON.parse(response.denials);
            $scope._title = response._title;

            var pie = 'denial-destination';
            pieFunction(pie, $scope._title, $scope._protocol_name, $scope._mb);

        });
    };

    $scope.getTopDenied = function () {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: url[15]
        }).success(function (response) {
            $scope._protocol_name = JSON.parse(response.protocol_name);
            $scope.denials = JSON.parse(response._denials);
            $scope._title = response._title;
            var pie = 'top-denied-protocol';
            pieFunction(pie, $scope._title, $scope._protocol_name, $scope.denials);

        });
    };

    $scope.getDeniedSource = function () {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: url[16]
        }).success(function (response) {
            $scope._src_name = JSON.parse(response._src_name);
            $scope.denials = JSON.parse(response._denials);
            $scope._title = response._title;
            var pie = 'denied-source-protocol';
            pieFunction(pie, $scope._title, $scope._src_name, $scope.denials);

        });
    };


});




