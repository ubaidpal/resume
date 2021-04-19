//Logger Angular Js File

var app = angular.module('LoggerDashboard', []),

white = 'rgba(255,255,255,1.0)',
fillBlue = 'rgba(52, 143, 226, 0.6)',
strokeBlue = 'rgba(52, 143, 226, 0.8)',
fillBlueLight = 'rgba(114, 124, 182, 0.2)',
strokePurple = 'rgba(114, 124, 182, 0.8)',
fillPurpleLight = 'rgba(114, 124, 182, 0.2)',
green = '#00acac',
blue = '#348fe2',
barChart = null,
ctx2 = '',
barChartData = null,
url = null,
function_name = null,
widget_data = null,
loggerCharts = [];


function randomHues(n, opacity) {
    var res = [];
    for (var i = 0; i < n; i++)
        res.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ', ' + opacity + ')')
    return res
}

var randomColor = randomHues(256, 0.8);

function loggerPieFunction(id, title, label, data, chartName) {
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
    if (!loggerCharts[chartName]) {
        var ctx5 = document.getElementById(id).getContext('2d');

        loggerCharts[chartName] = new Chart(ctx5, {
            type: 'pie',
            data: pieChartData,
            options: {
                maintainAspectRatio: false,
                responsive: true,
            }
        });

    } else {
        updateLoggerChartData(loggerCharts[chartName], pieChartData);
    }
    return loggerCharts[chartName];
}


function loggerPolarChart(id, labels, counts, chartName) {

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

    if (!loggerCharts[chartName]) {
        var ctx4 = document.getElementById(id).getContext('2d');
        loggerCharts[chartName] = new Chart(ctx4, {
            type: 'polarArea',
            data: polarAreaData,
            options: {
                maintainAspectRatio: false,
                responsive: true,
            }
        });
        $("#" + id).click(function (evt) {
            var activePoints = polarAreaChart.getElementAtEvent(evt);
            if (activePoints["0"]._view.label != 'undefined') {
                window.location = getDeviceUrl + '/type-list/' + activePoints["0"]._view.label + '/' + response.set_time;
            }
        });
    } else {
        updateLoggerChartData(loggerCharts[chartName], polarAreaData);
    }
    return loggerCharts[chartName];

}

function LoggerLineChartFunction(id, dataChart, chartName) {
    var lineChartData = dataChart;

    if (!loggerCharts[chartName]) {
        var ctx2 = document.getElementById(id).getContext('2d');
        loggerCharts[chartName] = new Chart(ctx2, {
            type: 'line',
            data: lineChartData,
            options: {
                maintainAspectRatio: false,
                responsive: true,
            }
        });
    } else {
        updateLoggerChartData(loggerCharts[chartName], lineChartData);
    }
    return loggerCharts[chartName];
}

function LoggerBarChartFunction(id, ips, count, title, chartName) {
    barChartData = {
        labels: ips,
        datasets: [{
            label: title,
            borderWidth: 2,
            borderColor: randomColor,
            backgroundColor: randomColor,
            data: count
        },]
    };
    if (!loggerCharts[chartName]) {
        var ctx2 = document.getElementById(id).getContext('2d');
        loggerCharts[chartName] = new Chart(ctx2, {
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
                },
                maintainAspectRatio: false,
                responsive: true,
            }
        });
    } else {
        updateLoggerChartData(loggerCharts[chartName], barChartData);
    }
    return loggerCharts[chartName];

}

function updateLoggerChartData(chart, data) {
    chart.data.labels = data.labels;
    chart.data.datasets = data.datasets;
    chart.update();
}

app.controller('LoggerController', function ($scope, $http, $timeout, $interval) {

    $scope.url = [

    /*27*/getSetIntervalID,

    ];

    $scope.typeOptions = [ //
    {name: '30 Sec', value: '30000'}
    ];

    $scope.auto_refresh = $scope.typeOptions[0].value;

    // function to refresh default
    $scope.auto_repeat_in_logger = function (repeat_time) {

        var target = event.target || event.srcElement || event.currentTarget;
        var id  = target.offsetParent.id;
        if(id) {
            var widget_data = JSON.parse(id); //parse
            var repeat = $('.'+widget_data.function_name).data('repeat'); //getter
            $scope.CustomFunction(id, repeat, true);
        }

    };

    //get graph name and autofresh value on select function 
    $scope.action_in = function (auto_refresh) {

        var target = event.target || event.srcElement || event.currentTarget;
        var id = target.attributes.id;
        widget_data = id.nodeValue; //get graph id so can integrate specific graph on refresh time
        if (auto_refresh) {
            $scope.CustomFunction(widget_data, auto_refresh, true);
        }

    };

    //on load graph render on page
    $scope.CustomFunction = function (_data, auto_refresh = 30000, refresh = false) {

        widget_data = JSON.parse(_data); //parse
        function_name = widget_data.function_name;
        $scope.getCustomFunction(function_name, widget_data);
        $('.'+function_name).attr('id',_data); //setter

        if (!refresh) {
            $scope.setInterval(widget_data, auto_refresh);
        } else {
            $('.'+function_name).attr('data-repeat',auto_refresh); //setter
            $scope.getSetIntervalID(widget_data, null, auto_refresh);
        }

    };

    //set interval with new interval id 
    $scope.setInterval = function (widget_data, auto_refresh) {

        var interval = $interval(function () { // auto refresh after selected time to specific graph
            $scope.CallCustomFunctionAgain(widget_data.function_name, widget_data);
        }, auto_refresh);

        var interval_id = interval['$$intervalId'];
        $scope.getSetIntervalID(widget_data, interval_id);

    }

    //set and get interval id for a specific graph
    $scope.getSetIntervalID = function (widget_data, interval_id = null, auto_refresh = null) {

        var interval_url,
        graph_name = widget_data.function_name + '-' + widget_data.tcp_port;

        if (interval_id == null) {
            interval_url = $scope.url[0] + '/' + graph_name;
        } else {
            interval_url = $scope.url[0] + '/' + graph_name + '/' + interval_id;
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

    }


    //on selected specific interval render graph
    $scope.CallCustomFunctionAgain = function (function_name, widget_data = null) {
        $scope.getCustomFunction(function_name, widget_data);
    };


    //get custome function when it call back
    $scope.getCustomFunction = function (function_name, widget_data = {}) {

        var graph_id = (Object.keys(widget_data).length > 0)
        ? function_name + widget_data.tcp_port : function_name;

        $scope.removeExtraIframes(graph_id);

        switch (function_name) {

            //f5 ltm and waf
            case 'TopDistTypeOverTime':
            $scope.TopDistTypeOverTime(widget_data);
            break;

            case 'distCountryOverTime':
            $scope.distCountryOverTime(widget_data);
            break;

            case 'TopAttackingTypes':
            $scope.TopAttackingTypes(widget_data);
            break;

            case 'f5SpreadingTopAttacking':
            $scope.f5SpreadingTopAttacking(widget_data);
            break;

            case 'TopViolations':
            $scope.TopViolations(widget_data);
            break;

            case 'f5SpreadingViolation':
            $scope.f5SpreadingViolation(widget_data);
            break;

            case 'TopSignatures':
            $scope.TopSignatures(widget_data);
            break;

            case 'f5SpreadingSignature':
            $scope.f5SpreadingSignature(widget_data);
            break;

            case 'TopCountryAttacks':
            $scope.TopCountryAttacks(widget_data);
            break;

            case 'f5SpreadingCountries':
            $scope.f5SpreadingCountries(widget_data);
            break;

            case 'TopDestinationIPs':
            $scope.TopDestinationIPs(widget_data);
            break;
            case 'f5SpreadingTopIPs':
            $scope.f5SpreadingTopIPs(widget_data);
            break;

            // palo alto graphs
            case 'paloDestinations':
            $scope.paloDestinations(widget_data);
            break;

            case 'paloSourceIP':
            $scope.paloSourceIP(widget_data);
            break;

            case 'paloProtocolType':
            $scope.paloProtocolType(widget_data);
            break;

            case 'paloProtocolAction':
            $scope.paloProtocolAction(widget_data);
            break;

            case 'paloDestinationLocationAction':
            $scope.paloDestinationLocationAction(widget_data);
            break;

            case 'paloSourceLocationCountryAction':
            $scope.paloSourceLocationCountryAction(widget_data);
            break;

            case 'paloNetSourceIP':
            $scope.paloNetSourceIP(widget_data);
            break;

            case 'netDestinationIP':
            $scope.netDestinationIP(widget_data);
            break;

            case 'sourcePort':
            $scope.sourcePort(widget_data);
            break;

            case 'destinationPorts':
            $scope.destinationPorts(widget_data);
            break;

            // Jetnexis Graphs
            case 'jetnexisPIDGraph':
            $scope.jetnexisPIDGraph(widget_data);
            break;

            case 'jetnexisHostnameGraph':
            $scope.jetnexisHostnameGraph(widget_data);
            break;

            case 'jetnexisErrorListMessage':
            $scope.jetnexisErrorListMessage(widget_data);
            break;

            case 'jetnexisSeverityMessage':
            $scope.jetnexisSeverityMessage(widget_data);
            break;

            case 'jetnexisVersionMessage':
            $scope.jetnexisVersionMessage(widget_data);
            break;

            case 'jetnexisTagMessage':
            $scope.jetnexisTagMessage(widget_data);
            break;

            case 'jetnexisUriMessage':
            $scope.jetnexisUriMessage(widget_data);
            break;

            case 'jetnexisClientPortMessage':
            $scope.jetnexisClientPortMessage(widget_data);
            break;

            case 'jetnexisActionTypeMessage':
            $scope.jetnexisActionTypeMessage(widget_data);
            break;

            //Ltm
            case 'TopLtmDestinationIPs':
            $scope.TopLtmDestinationIPs(widget_data);
            break;
            case 'TopLtmSourceIPs':
            $scope.TopLtmSourceIPs(widget_data);
            break;

            //generic serve
            case 'getTypeGraph':
            $scope.getTypeGraph(widget_data);
            break;
            case 'getNodeGraph':
            $scope.getNodeGraph(widget_data);
            break;
            case 'getSuccessGraph':
            $scope.getSuccessGraph(widget_data);
            break;

            //stormshield
            case 'getAlarmGraph':
            $scope.getAlarmGraph(widget_data);
            break;
            case 'getSentGraph':
            $scope.getSentGraph(widget_data);
            break;
            case 'TopLoggerPortsCounts':
             $scope.TopLoggerPortsCounts(widget_data);
             break;
            // sentinelOne graphs
            case 'publicIPs':
            $scope.publicIPs(widget_data);
            break;
            case 'deviceIPs':
            $scope.deviceIPs(widget_data);
            break;
            case 'sourceMacAddresses':
            $scope.sourceMacAddresses(widget_data);
            break;
            case 'sentinelLog':
            $scope.sentinelLog(widget_data);
            break;
            // Fortinet SourceIp Graph
            case 'fortinetSourceIP':
            $scope.fortinetSourceIP(widget_data);
            break;
            // Fortinet DestinationIp Graph
            case 'fortinetDestinationIP':
            $scope.fortinetDestinationIP(widget_data);
            break;
            default:

        }

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

    $scope.TopCountryAttacksProcessing = false;
    //country attacks
    $scope.TopCountryAttacks = function (widget_data) {
        if (!$scope.TopCountryAttacksProcessing) {
            $scope.TopCountryAttacksProcessing = true;
            $scope._title = 'Loading...'; //before loading data
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {

                    $scope._countryAttackLabel = JSON.parse(response.countryAttackLabel);
                    $scope._countryAttackPercent = JSON.parse(response.countryAttackPercent);
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;

                    barChartData = {
                        labels: $scope._countryAttackLabel,
                        datasets: [{
                            label: 'Top Country Attacks',
                            borderWidth: 2,
                            borderColor: randomColor,
                            backgroundColor: randomColor,
                            data: $scope._count
                        },]
                    };

                    var graph_id = (Object.keys(widget_data).length > 0)
                    ? 'TopCountryAttacks' + widget_data.tcp_port : 'TopCountryAttacks';

                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
                            type: 'bar',
                            data: barChartData,
                            options: {
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });

                        $("#" + graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {

                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                    'SourceLocationCountry', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                                getDeviceUrl + '/meta/SourceLocationCountry/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                                window.open(baseUrl);

                                //window.location = getDeviceUrl + '/meta/SourceLocationCountry/' + activePoints["0"]._view.label + '/' + response.set_time;
                            }
                        });
                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }

                } else {
                    scope._title = 'NO Data found';
                }
                $scope.TopCountryAttacksProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TopCountryAttacksProcessing = false;
            });
        } else {
            console.log('TopCountryAttacks request skipped');
        }

    }; // 
    $scope.TopAttackingTypesProcessing = false;
    //Top attacking types graph
    $scope.TopAttackingTypes = function (widget_data) {

        if (!$scope.TopAttackingTypesProcessing) {
            $scope.TopAttackingTypesProcessing = true;
            $scope._title = 'Loading...'; //

            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {

                    $scope._attack_type_label = JSON.parse(response.attack_type_label);
                    $scope._attack_type_percent = JSON.parse(response.attack_type_percent);
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;

                    barChartData = {
                        labels: $scope._attack_type_label,
                        datasets: [{
                            label: 'Top Attacking Types',
                            borderWidth: 2,
                            borderColor: randomColor,
                            backgroundColor: randomColor,
                            data: $scope._count
                        },]
                    };

                    var graph_id = (Object.keys(widget_data).length > 0)
                    ? 'TopAttackingTypes' + widget_data.tcp_port : 'TopAttackingTypes';
                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
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
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });

                        $("#" + graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {

                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                    'WAFAttackType', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                                getDeviceUrl + '/meta/WAFAttackType/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                                window.open(baseUrl);


                                //window.location = getDeviceUrl + '/meta/WAFAttackType/' + activePoints["0"]._view.label + '/' + response.set_time;
                            }
                        });
                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }


                } else {
                    scope._title = 'NO Data found';
                }
                $scope.TopAttackingTypesProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TopAttackingTypesProcessing = false;
            });
        } else {
            console.log('TopAttackingTypes request skipped');
        }

    };
    $scope.TopViolationsProcessing = false
    //Top voilations Graph
    $scope.TopViolations = function (widget_data) {

        if (!$scope.TopViolationsProcessing) {
            $scope.TopViolationsProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {

                    $scope._violations_label = JSON.parse(response.violations_label);
                    $scope._violations_percent = JSON.parse(response.violations_percent);
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;

                    barChartData = {
                        labels: $scope._violations_label,
                        datasets: [{
                            label: 'Top Violations',
                            borderWidth: 2,
                            borderColor: randomColor,
                            backgroundColor: randomColor,
                            data: $scope._count
                        },]
                    };

                    var graph_id = (Object.keys(widget_data).length > 0)
                    ? 'TopViolations' + widget_data.tcp_port : 'TopViolations';
                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
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
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });

                        $("#" + graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {

                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                    'WAFViolations', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                                getDeviceUrl + '/meta/WAFViolations/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                                window.open(baseUrl);

                                //window.location = getDeviceUrl + '/meta/WAFViolations/' + activePoints["0"]._view.label + '/' + response.set_time;
                            }
                        });
                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }
                } else {
                    scope._title = 'NO Data found';
                }
                $scope.TopViolationsProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TopViolationsProcessing = false;
            });  //
        } else {
            console.log('TopViolations request skipped');
        }

    }; //

    $scope.TopDestinationIPsProcessing = false;
    // Destination Ips graps
    $scope.TopDestinationIPs = function (widget_data) {

        if (!$scope.TopDestinationIPsProcessing) {
            $scope.TopDestinationIPsProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {

                    $scope._dest_ip_label = JSON.parse(response.dest_ip_label);
                    $scope._dest_ip_percent = JSON.parse(response.dest_ip_percent);
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;

                    barChartData = {
                        labels: $scope._dest_ip_label,
                        datasets: [{
                            label: 'Top Attacking IPs',
                            borderWidth: 2,
                            borderColor: randomColor,
                            backgroundColor: randomColor,
                            data: $scope._count
                        },]
                    };


                    var graph_id = (Object.keys(widget_data).length > 0)
                    ? 'TopDestinationIPs' + widget_data.tcp_port : 'TopDestinationIPs';
                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
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
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });


                        $("#" + graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {

                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                    'SourceIP', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                                getDeviceUrl + '/meta/SourceIP/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                                window.open(baseUrl);

                                //window.location = getDeviceUrl + '/meta/SourceIP/' + activePoints["0"]._view.label + '/' + response.set_time;
                            }
                        });
                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }


                } else {
                    scope._title = 'NO Data found';
                }
                $scope.TopDestinationIPsProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TopDestinationIPsProcessing = false;
            });
        } else {
            console.log('TopDestinationIPs request skipped');
        }
    };
    $scope.TopSignaturesProcessing = false;
    // TopSignatures
    $scope.TopSignatures = function (widget_data) {
        if (!$scope.TopSignaturesProcessing) {
            $scope.TopSignaturesProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url

            }).success(function (response) {

                if (response) {

                    $scope.signatureLabel = JSON.parse(response.signatureLabel);
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;

                    barChartData = {
                        labels: $scope.signatureLabel,
                        datasets: [{
                            label: 'Top Signatures',
                            borderWidth: 2,
                            borderColor: randomColor,
                            backgroundColor: randomColor,
                            data: $scope._count
                        },]
                    };

                    var graph_id = (Object.keys(widget_data).length > 0)
                    ? 'TopSignatures' + widget_data.tcp_port : 'TopSignatures';
                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
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
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });

                        $("#" + graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {

                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                    'WAFSigNames', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                                getDeviceUrl + '/meta/WAFSigNames/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                                window.open(baseUrl);

                                // window.location = getDeviceUrl + '/meta/WAFSigNames/' + activePoints["0"]._view.label + '/' + response.set_time;
                            }
                        });
                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }


                } else {
                    scope._title = 'No Data found';
                }
                $scope.TopSignaturesProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TopSignaturesProcessing = false;
            });
        } else {
            console.log('TopSignatures request skipped');
        }

    };
    $scope.f5SpreadingTopAttackingProcessing = false;
    $scope.f5SpreadingTopAttacking = function (widget_data) {
        if (!$scope.f5SpreadingTopAttackingProcessing) {
            $scope.f5SpreadingTopAttackingProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._attack_type = response._attack_type;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._title = response._title;

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'f5SpreadingTopAttacking' + widget_data.tcp_port : 'f5SpreadingTopAttacking';
                var graphFound = !!loggerCharts[graph_id];

                var myPie = loggerPieFunction(graph_id, $scope._attack_type, $scope._count, $scope._percent, graph_id);
                if (!graphFound) {
                    $("#" + graph_id).click(function (evt) {

                        var activePoints = myPie.getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                response.type, activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/' + response.type + '/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);

                            //window.location = getDeviceUrl + '/meta/' + response.type + '/' + activePoints["0"]._view.label + '/' + response.set_time;
                        }
                    });
                }


                $scope.f5SpreadingTopAttackingProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.f5SpreadingTopAttackingProcessing = false;
            });
        } else {
            console.log('f5SpreadingTopAttacking request skipped');
        }
    };

    $scope.f5SpreadingViolationProcessing = false;
    $scope.f5SpreadingViolation = function (widget_data) {
        if (!$scope.f5SpreadingViolationProcessing) {
            $scope.f5SpreadingViolationProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {

                    $scope._violations = response._violations;
                    $scope._count = response._count;
                    $scope._percent = JSON.parse(response._percent);
                    $scope._title = response._title;

                    var graph_id = (Object.keys(widget_data).length > 0)
                    ? 'f5SpreadingViolation' + widget_data.tcp_port : 'f5SpreadingViolation';
                    var graphFound = !!loggerCharts[graph_id];

                    var myPie = loggerPieFunction(graph_id, $scope._violations, $scope._count, $scope._percent, graph_id);
                    if (!graphFound) {
                        $("#" + graph_id).click(function (evt) {

                            var activePoints = myPie.getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {

                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                    response.type, activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                                getDeviceUrl + '/meta/' + response.type + '/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                                window.open(baseUrl);

                                //window.location = getDeviceUrl + '/meta/' + response.type + '/' + activePoints["0"]._view.label + '/' + response.set_time;
                            }
                        });
                    }


                }
                $scope.f5SpreadingViolationProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.f5SpreadingViolationProcessing = false;
            });
        } else {
            console.log('f5SpreadingViolation request skipped');
        }
    };

    $scope.f5SpreadingCountriesProcessing = false;
    $scope.f5SpreadingCountries = function (widget_data) {
        if (!$scope.f5SpreadingCountriesProcessing) {
            $scope.f5SpreadingCountriesProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {

                    $scope._geo_location = response._geo_location;
                    $scope._count = response._count;
                    $scope._percent = JSON.parse(response._percent);
                    $scope._title = response._title;

                    var graph_id = (Object.keys(widget_data).length > 0)
                    ? 'f5SpreadingCountries' + widget_data.tcp_port : 'f5SpreadingCountries';
                    var graphFound = !!loggerCharts[graph_id];

                    var myPie = loggerPieFunction(graph_id, $scope._geo_location, $scope._count, $scope._percent, graph_id);

                    if (!graphFound) {
                        $("#" + graph_id).click(function (evt) {

                            var activePoints = myPie.getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {

                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                    response.type, activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                                getDeviceUrl + '/meta/' + response.type + '/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                                window.open(baseUrl);

                                //window.location = getDeviceUrl + '/meta/' + response.type + '/' + activePoints["0"]._view.label + '/' + response.set_time;
                            }
                        });
                    }


                }
                $scope.f5SpreadingCountriesProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.f5SpreadingCountriesProcessing = false;
            });
        } else {
            console.log('f5SpreadingCountries request skipped');
        }
    };

    $scope.f5SpreadingTopIPsProcessing = false;
    $scope.f5SpreadingTopIPs = function (widget_data) {
        if (!$scope.f5SpreadingTopIPsProcessing) {
            $scope.f5SpreadingTopIPsProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {

                    $scope._ip_client = response._ip_client;
                    $scope._count = response.count;
                    $scope._percent = JSON.parse(response._percent);
                    $scope._title = response._title;

                    var graph_id = (Object.keys(widget_data).length > 0)
                    ? 'f5SpreadingTopIPs' + widget_data.tcp_port : 'f5SpreadingTopIPs';
                    var graphFound = !!loggerCharts[graph_id];
                    var myPie = loggerPieFunction(graph_id, $scope._ip_client, $scope._count, $scope._percent, response, graph_id);
                    if (!graphFound) {
                        $("#" + graph_id).click(function (evt) {

                            var activePoints = myPie.getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {

                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                    response.type, activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                                getDeviceUrl + '/meta/' + response.type + '/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                                window.open(baseUrl);
                                //window.location = getDeviceUrl + '/meta/' + response.type + '/' + activePoints["0"]._view.label + '/' + response.set_time;
                            }
                        });
                    }

                    $scope.f5SpreadingTopIPsProcessing = false;

                }

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.f5SpreadingTopIPsProcessing = false;
            });
        } else {
            console.log('f5SpreadingTopIPs request skipped');
        }
    };

    $scope.f5SpreadingSignatureProcessing = false;
    $scope.f5SpreadingSignature = function (widget_data) {
        if (!$scope.f5SpreadingSignatureProcessing) {
            $scope.f5SpreadingSignatureProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._sig_names = response._sig_names;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._title = response._title;

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'f5SpreadingSignature' + widget_data.tcp_port : 'f5SpreadingSignature';
                var graphFound = !!loggerCharts[graph_id];

                var myPie = loggerPieFunction(graph_id, $scope._sig_names, $scope._count, $scope._percent, graph_id);
                if (!graphFound) {
                    $("#" + graph_id).click(function (evt) {

                        var activePoints = myPie.getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                response.type, activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/' + response.type + '/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);

                            //window.location = getDeviceUrl + '/meta/' + response.type + '/' + activePoints["0"]._view.label + '/' + response.set_time;
                        }
                    });
                }


                $scope.f5SpreadingSignatureProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.f5SpreadingSignatureProcessing = false;
            });
        } else {
            console.log('f5SpreadingSignature request skipped');
        }
    };
    $scope.distCountryOverTimeProcessing = false;
    $scope.distCountryOverTime = function (widget_data) {
        if (!$scope.distCountryOverTimeProcessing) {
            $scope.distCountryOverTimeProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope.event_types = JSON.parse(response.event_types);
                $scope._title = response._title;
                $scope._description = response._description;

                $scope._title = response._title;
                var datasets = [];
                var colorIndex = 0;
                var colors = randomHues(5, 0.3);

                angular.forEach($scope.event_types, function (value, element) {

                    if ($scope.event_types.hasOwnProperty(element)) {

                        var data = [];
                        for (var i = 0; i < $scope.event_types[element].length; i++) {

                            data.push({
                                x: $scope.event_types[element][i]['x'],
                                y: $scope.event_types[element][i]['y']
                            });
                        }
                        datasets.push({
                            label: element,
                            borderColor: strokeBlue, //colors[colorIndex],
                            pointBackgroundColor: strokeBlue, //colors[colorIndex],
                            pointRadius: 2,
                            borderWidth: 2,
                            backgroundColor: colors[colorIndex],
                            data: data
                        });
                    }
                    colorIndex++;


                });

                var lineChartData = {
                    datasets: datasets
                };

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'distCountryOverTime' + widget_data.tcp_port : 'distCountryOverTime';
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');

                    loggerCharts[graph_id] = new Chart(ctx2, {
                        type: 'line',
                        data: lineChartData,
                        options: {
                            maintainAspectRatio: false,
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

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);

                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'SourceLocationCountry', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/SourceLocationCountry/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);

                            // window.location = getDeviceUrl + '/meta/SourceLocationCountry/' + activePoints["0"]._view.label + '/' + response.set_time;
                        }

                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], lineChartData);
                }

                $scope.distCountryOverTimeProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.distCountryOverTimeProcessing = false;
            });
        } else {
            console.log('distCountryOverTime request skipped');
        }

    };


    $scope.TopDistTypeOverTimeProcessing = false;
    $scope.TopDistTypeOverTime = function (widget_data) {

        if (!$scope.TopDistTypeOverTimeProcessing) {
            $scope.TopDistTypeOverTimeProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {
                $scope.event_types = JSON.parse(response.event_types);
                $scope._title = response._title;
                $scope._description = response._description;

                $scope._title = response._title;
                var datasets = [];
                var colorIndex = 0;
                var colors = randomHues(5, 0.3);

                angular.forEach($scope.event_types, function (value, element) {

                    if ($scope.event_types.hasOwnProperty(element)) {

                        var data = [];
                        for (var i = 0; i < $scope.event_types[element].length; i++) {

                            data.push({
                                x: $scope.event_types[element][i]['x'],
                                y: $scope.event_types[element][i]['y']
                            });
                        }
                        datasets.push({
                            label: element,
                            borderColor: strokeBlue, //colors[colorIndex],
                            pointBackgroundColor: strokeBlue, //colors[colorIndex],
                            pointRadius: 2,
                            borderWidth: 2,
                            backgroundColor: colors[colorIndex],
                            data: data
                        });
                    }
                    colorIndex++;

                });

                var lineChartData = {
                    datasets: datasets
                };

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'TopDistTypeOverTime' + widget_data.tcp_port : 'TopDistTypeOverTime';
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
                        type: 'line',
                        data: lineChartData,
                        options: {
                            maintainAspectRatio: false,
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

                    $("#" + graph_id).click(function (evt) {

                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);

                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'WAFAttackType', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/WAFAttackType/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(newUrl);

                            // window.location = getDeviceUrl + '/meta/WAFAttackType/' + activePoints["0"]._view.label + '/' + response.set_time;
                        }

                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], lineChartData);
                }


                $scope.TopDistTypeOverTimeProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TopDistTypeOverTimeProcessing = false;
            });
        } else {
            console.log('TopDistTypeOverTime request skipped');
        }
    };


    $scope.TopDeniedDestinations = function (widget_data) {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            if (response) {

                $scope._protocol_name = JSON.parse(response.protocol_name);
                $scope.denials = JSON.parse(response.denials);
                $scope._title = response._title;


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
                var graph_id = 'denial-destination';

                if (!loggerCharts[graph_id]) {
                    var ctx5 = document.getElementById(pie).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx5, {
                        type: 'pie',
                        data: pieChartData,
                        options: {
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], pieChartData);
                }

            } else {

                $scope._title = 'NO Data found';
            }

        });
    };


    /*
    Stormshield
    */


    //storm shield event graphs
    $scope.getEventsGraph = function (widget_data = {}) {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            if (response) {

                $scope._label = JSON.parse(response._label);
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;

                barChartData = {
                    labels: $scope._label,
                    datasets: [{
                        label: 'Top logtype',
                        borderWidth: 2,
                        borderColor: randomColor,
                        backgroundColor: randomColor,
                        data: $scope._count
                    }]
                };
                var graph_id = 'event-graph';
                if (!loggerCharts[graph_id]) {

                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }
            } else {
                scope._title = 'NO Data found';
            }


        });
    };

    // storm shield events counts
    $scope.getEventsCounts = function (widget_data = {}) {

        widget_data = JSON.parse(widget_data); //parse

        $timeout(function () {
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._events = response;

            });
        }, 1000);
    };

    //storm shield block counts
    $scope.getBlockCounts = function (widget_data = {}) {

        widget_data = JSON.parse(widget_data); //parse

        $timeout(function () {
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: (widget_data) ? widget_data.url : $scope.url[6]
            }).success(function (response) {

                $scope._blocks = response;

            });
        }, 2000);
    };

    //top url counts
    $scope.getTopUrl = function (widget_data = {}) {

        widget_data = JSON.parse(widget_data); //parse

        $timeout(function () {
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._top_url = response;

            });
        }, 1000);
    };

    //sent counts
    $scope.getSentCounts = function (widget_data = {}) {

        widget_data = JSON.parse(widget_data); //parse
        $scope._title = 'Loading...';

        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            $scope._sents = response;

        });

    };

    //sent counts
    $scope.getRecievedCounts = function (widget_data = {}) {

        widget_data = JSON.parse(widget_data); //parse

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            $scope._recieve = response;

        });

    };

    //storm shield event graphs
    $scope.getEventsGraph = function (widget_data = {}) {
        $timeout(function (widget_data) {
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {

                    $scope._label = JSON.parse(response._label);
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;

                    barChartData = {
                        labels: $scope._label,
                        datasets: [{
                            label: 'Top logtype',
                            borderWidth: 2,
                            borderColor: randomColor,
                            backgroundColor: randomColor,
                            data: $scope._count
                        }]
                    };
                    var block_id = 'event-graph';
                    var graph_id = 'storm-event-graph';
                    if (loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(block_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
                            type: 'bar',
                            data: barChartData,
                            options: {
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });
                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }

                } else {
                    scope._title = 'NO Data found';
                }
            }, 2000);

        });
    };

    //storm shield alaram graph
    $scope.getAlarmGraph = function (widget_data = {}) {

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            if (response) {
                $scope._ip_client = response._ip_client;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._title = response._title;

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'getAlarmGraph' + widget_data.tcp_port : 'getAlarmGraph';
                var graphFound = !!loggerCharts[graph_id];
                var myPie = loggerPieFunction(graph_id, $scope._ip_client, $scope._count, $scope._percent, graph_id);
                if (!graphFound) {

                    $("#" + graph_id).click(function (evt) {

                        var activePoints = myPie.getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                response.type, activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/' + response.type + '/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);

                            //window.location = getDeviceUrl + '/meta/' + response.type + '/' + activePoints["0"]._view.label + '/' + response.set_time;
                        }
                    });
                }

            } else {
                scope._title = 'NO Data found';
            }
        });
    };

    //storm shield sent graphs
    $scope.getSentGraph = function (widget_data = {}) {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            if (response) {

                $scope._label = JSON.parse(response._label);
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;

                barChartData = {
                    labels: $scope._label,
                    datasets: [{
                        label: 'Top Upload',
                        borderWidth: 2,
                        borderColor: randomColor,
                        backgroundColor: randomColor,
                        data: $scope._count
                    }]
                };

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'getSentGraph' + widget_data.tcp_port : 'getSentGraph';
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var uri_value = activePoints["0"]._view.label.replace(/\//g, '~');

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlRaw(getDeviceUrl + '/' + widget_data.device_name, 'sent', uri_value,
                                    response.set_time, widget_data.tcp_port) :
                                getDeviceUrl + '/raw-list/sent/' + uri_value + '/' + response.set_time + '/' + tcp_port;


                            //var baseUrl = getDeviceUrl + '/meta/severity/' + activePoints["0"]._view.label + '/' + response.set_time;
                            window.open(baseUrl);
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }

            } else {
                scope._title = 'NO Data found';
            }


        });
    };

    /*
    **GENERIC SERVER GRAPHS**
    */

    //generic server alaram graph
    $scope.getTypeGraph = function (widget_data = {}) {

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            if (response) {

                $scope._label = JSON.parse(response._label);
                $scope._label_titles = response._label_titles;
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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
                    labels: $scope._label_titles,
                    datasets: datasets
                };

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'getTypeGraph' + widget_data.tcp_port : 'getTypeGraph';

                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
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
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            getDeviceUrl + '/' + widget_data.device_name + '/type-list/' + activePoints["0"]._view.label + '/' + response.set_time +'/'+widget_data.tcp_port:
                            getDeviceUrl + '/type-list/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);

                            //window.location = getDeviceUrl + '/type-list/' + activePoints["0"]._view.label + '/' + response.set_time;
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }


            }

        });
    };

    //generic server alarm graph
    $scope.getPidGraph = function (widget_data = {}) {

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {
            if (response) {
                $scope._ip_client = response._ip_client;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._title = response._title;
                $scope._description = response._description;

                var graph_id = 'pid-graph';
                loggerPieFunction('pid-graph', $scope._ip_client, $scope._count, $scope._percent, graph_id);
            } else {
                $scope._title = 'No Data found';
                $scope._description = '';
            }
        });
    };

    $scope.getTypeGraphByTime = function (widget_data = {}) {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            if (response) {

                $scope.event_types = JSON.parse(response.event_types);
                ;
                $scope._title = response._title;
                $scope._description = response._description;

                $scope._title = response._title;
                var datasets = [];
                var colorIndex = 0;
                var colors = randomHues(5, 0.3);
                //  debugger;
                for (var key in $scope.event_types) {
                    if ($scope.event_types.hasOwnProperty(key)) {

                        var data = [];
                        for (var i = 0; i < $scope.event_types[key].length; i++) {

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
                            backgroundColor: colors[colorIndex],
                            data: data
                        });
                    }
                    colorIndex++;
                }

                var lineChartData = {
                    datasets: datasets
                };
                var graph_id = 'line-types';
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
                        type: 'line',
                        data: lineChartData,
                        options: {
                            maintainAspectRatio: false,
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
                    $("#line-types").click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            getDeviceUrl + '/' + widget_data.device_name + '/type-list/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port :
                            getDeviceUrl + '/type-list/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);

                            //window.location = getDeviceUrl + '/type-list/' + activePoints["0"]._view.label + '/' + response.set_time;
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], lineChartData);
                }


            }

        });
};

    //generic server alaram graph
    $scope.getNodeGraph = function (widget_data = {}) {

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            if (response) {

                $scope._label = JSON.parse(response._label);
                $scope._label_titles = response._label_titles;
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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
                    labels: $scope._label_titles,
                    datasets: datasets
                };

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'getNodeGraph' + widget_data.tcp_port : 'getNodeGraph';
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
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
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'node', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/node/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);

                            //window.location = getDeviceUrl + '/meta/node/' + activePoints["0"]._view.label + '/' + response.set_time;
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }

            }

        });
    };

    //generic_server address graph
    $scope.getAddressGraph = function (widget_data = {}) {

        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {
            if (response) {
                $scope._labels = JSON.parse(response._labels);
                $scope.counts = JSON.parse(response.counts);
                $scope._title = response._title;
                $scope._description = response._description;
                if ($scope.counts) {

                    loggerPolarChart('addr-graph', $scope._labels, $scope.counts, 'addr-graph');

                }
            } else {
                $scope._title = 'No Data found';
            }
        });
    };


    //Generic server success graph
    $scope.getSuccessGraph = function (widget_data = {}) {
        $scope._title = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            if (Object.keys(response).length > 0) {

                $scope._label = JSON.parse(response._label);
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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
                        backgroundColor: color[$i],

                        data: data
                    });
                }

                barChartData = {
                    labels: $scope._label,
                    datasets: datasets
                };

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'getSuccessGraph' + widget_data.tcp_port : 'getSuccessGraph';
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
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
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {
                            window.location = getDeviceUrl + '/type-list/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }

            }

        });
    };


    /*JETNEXUS*/


    //pid graph
    $scope.jetnexisPIDGraphProcessing = false;
    $scope.jetnexisPIDGraphChart = false;
    $scope.jetnexisPIDGraph = function (widget_data) {


        if (!$scope.jetnexisPIDGraphProcessing) {
            $scope.jetnexisPIDGraphProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {

                    $scope._label = JSON.parse(response._label);
                    $scope._label_titles = response._label_titles;
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;
                    $scope._description = response._description;
                    var datasets = [];

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
                        labels: $scope._label_titles,
                        datasets: datasets
                    };
                    var graph_id = (Object.keys(widget_data).length > 0) ? 'jetnexisPIDGraph' + widget_data.tcp_port : 'jetnexisPIDGraph';

                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');

                        loggerCharts[graph_id] = new Chart(ctx2, {
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
                                },
                                maintainAspectRatio: false,
                                responsive: true
                            }
                        });

                        $("#" + graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {

                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlRaw(getDeviceUrl + '/' + widget_data.device_name, 'ThreatID',
                                    activePoints["0"]._view.label, response.set_time, widget_data.tcp_port) :
                                getDeviceUrl + '/raw-list/ThreatID/' + activePoints["0"]._view.label + '/' + response.set_time + '/' + tcp_port;

                                window.open(baseUrl);
                            }
                        });
                    } else {
                        // $scope.removeChartData($scope.jetnexisPIDGraphChart);
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }


                    $scope.jetnexisPIDGraphProcessing = false;

                }

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.jetnexisPIDGraphProcessing = false;
            });
        } else {
            console.log('jetnexis PID Graph request skipped');
        }
    };

    //hostname (destination Ip)

    $scope.jetnexisHostnameGraphProcessing = false;
    $scope.jetnexisHostnameGraph = function (widget_data) {


        if (!$scope.jetnexisHostnameGraphProcessing) {
            $scope.jetnexisHostnameGraphProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {

                    $scope._label = JSON.parse(response._label);
                    $scope._label_titles = response._label_titles;
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;
                    $scope._description = response._description;
                    var datasets = [];

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

                    var graph_id = (Object.keys(widget_data).length > 0) ?
                    'jetnexisHostnameGraph' + widget_data.tcp_port : 'jetnexisHostnameGraph',

                    barChartData = {
                        labels: $scope._label_titles,
                        datasets: datasets
                    };
                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
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
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });

                        $("#"+graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {

                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlRaw(getDeviceUrl + '/' + widget_data.device_name, 'HTTPDomain',
                                    activePoints["0"]._view.label, response.set_time, widget_data.tcp_port) :
                                getDeviceUrl + '/raw-list/HTTPDomain/' + activePoints["0"]._view.label + '/' +
                                response.set_time + '/' + tcp_port;


                                window.open(baseUrl);
                            }
                        });
                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }

                    $scope.jetnexisHostnameGraphProcessing = false;

                }

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.jetnexisHostnameGraphProcessing = false;

            });
        } else {
            console.log('jetnexisHostnameGraph request skipped');
        }

    };

    // Error Messsages
    $scope.jetnexisErrorListMessageProcessing = false;
    $scope.jetnexisErrorListMessage = function (widget_data) {

        if (!$scope.jetnexisErrorListMessageProcessing) {

            $scope.jetnexisErrorListMessageProcessing = true;

            if (widget_data) {
                url = widget_data.url;
            }

            $scope._title = 'Loading...';
            $('#jetnexisErrorListMessage').html('<div class="list-group-item text-ellipsis">Loading... </div>');
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {
                    $scope._title = response._title;

                    var error_id = (Object.keys(widget_data).length > 0) ?
                    '#jetnexisErrorListMessage' + widget_data.tcp_port : '#jetnexisErrorListMessage';

                    $(error_id).html(response.devices_list);
                }
                $scope.jetnexisErrorListMessageProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.jetnexisErrorListMessageProcessing = false;

            });
        } else {
            console.log('jetnexisErrorListMessage request skipped');
        }
    };

    //Severity Status Graph
    $scope.jetnexisSeverityMessageProcessing = false;
    $scope.jetnexisSeverityMessage = function (widget_data) {
        if (!$scope.jetnexisSeverityMessageProcessing) {
            $scope.jetnexisSeverityMessageProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {
                if (response) {

                    $scope._label = JSON.parse(response._label);
                    $scope._label_titles = response._label_titles;
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;
                    $scope._description = response._description;
                    var datasets = [];

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

                    var graph_id = (Object.keys(widget_data).length > 0) ?
                    'jetnexisSeverityMessage' + widget_data.tcp_port : 'jetnexisSeverityMessage',

                    barChartData = {
                        labels: $scope._label_titles,
                        datasets: datasets
                    };
                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
                            type: 'bar',
                            data: barChartData,
                            options: {
                                scales: {
                                    xAxes: [{
                                        stacked: true
                                    }],
                                    yAxes: [{
                                        stacked: true
                                    }]
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });

                        $("#" + graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {

                                var uri_value = activePoints["0"]._view.label.replace(/\//g, '~');

                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlRaw(getDeviceUrl + '/' + widget_data.device_name, 'EventSeverity', uri_value,
                                    response.set_time, widget_data.tcp_port) :
                                getDeviceUrl + '/raw-list/EventSeverity/' + uri_value + '/' + response.set_time + '/' + tcp_port;


                                //var baseUrl = getDeviceUrl + '/meta/severity/' + activePoints["0"]._view.label + '/' + response.set_time;
                                window.open(baseUrl);
                            }
                        });
                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }

                    $scope.jetnexisSeverityMessageProcessing = false;
                }


            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.jetnexisSeverityMessageProcessing = false;

            });
        } else {
            console.log('jetnexisSeverityMessage request skipped');
        }
    };

    //version Graph
    $scope.jetnexisVersionMessageProcessing = false;
    $scope.jetnexisVersionMessage = function (widget_data) {
        if (!$scope.jetnexisVersionMessageProcessing) {
            $scope.jetnexisVersionMessageProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {

                    $scope._label = JSON.parse(response._label);
                    $scope._label_titles = response._label_titles;
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;
                    $scope._description = response._description;
                    var datasets = [];

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

                    var graph_id = (Object.keys(widget_data).length > 0) ?
                    'jetnexisVersionMessage' + widget_data.tcp_port : 'jetnexisVersionMessage',

                    barChartData = {
                        labels: $scope._label_titles,
                        datasets: datasets
                    };
                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
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
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });

                        $("#" + graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {
                                var uri_value = activePoints["0"]._view.label.replace(/\//g, '~');

                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlRaw(getDeviceUrl + '/' + widget_data.device_name, 'HTTPVersion', uri_value,
                                    response.set_time, widget_data.tcp_port) :
                                getDeviceUrl + '/raw-list/HTTPVersion/' + uri_value + '/' + response.set_time + '/' + tcp_port;

                                //var baseUrl = getDeviceUrl + '/meta/version/' + uri_value + '/' + response.set_time;
                                window.open(baseUrl);
                            }
                        });
                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }

                    $scope.jetnexisVersionMessageProcessing = false;

                }


            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.jetnexisVersionMessageProcessing = false;

            });
        } else {
            console.log('jetnexisVersionMessage request skipped');
        }
    };

    //Tag Graph
    $scope.jetnexisTagMessageProcessing = false;
    $scope.jetnexisTagMessage = function (widget_data) {
        if (!$scope.jetnexisTagMessageProcessing) {
            $scope.jetnexisTagMessageProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {

                    $scope._label = JSON.parse(response._label);
                    $scope._label_titles = response._label_titles;
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;
                    $scope._description = response._description;
                    var datasets = [];

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

                    var graph_id = (Object.keys(widget_data).length > 0) ?
                    'jetnexisTagMessage' + widget_data.tcp_port : 'jetnexisTagMessage',

                    barChartData = {
                        labels: $scope._label_titles,
                        datasets: datasets
                    };
                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
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
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });

                        $("#" + graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {

                                var uri_value = activePoints["0"]._view.label.replace(/\//g, '~');
                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlRaw(getDeviceUrl + '/' + widget_data.device_name,
                                    'Tag', uri_value, response.set_time, widget_data.tcp_port) :
                                getDeviceUrl + '/raw-list/Tag/' + uri_value + '/' + response.set_time + '/' + tcp_port;


                                //var baseUrl = getDeviceUrl + '/meta/tag/' + uri_value + '/' + response.set_time;

                                window.open(baseUrl);
                            }
                        });
                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }

                    $scope.jetnexisTagMessageProcessing = false;

                }

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.jetnexisTagMessageProcessing = false;

            });
        } else {
            console.log('jetnexisTagMessage request skipped');
        }
    };

    //Uri Graph
    $scope.jetnexisUriMessageProcessing = false;
    $scope.jetnexisUriMessage = function (widget_data) {
        if (!$scope.jetnexisUriMessageProcessing) {
            $scope.jetnexisUriMessageProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {

                    $scope._label = JSON.parse(response._label);
                    $scope._label_titles = response._label_titles;
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;
                    $scope._description = response._description;
                    var datasets = [];

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

                    var graph_id = (Object.keys(widget_data).length > 0) ?
                    'jetnexisUriMessage' + widget_data.tcp_port : 'jetnexisUriMessage',

                    barChartData = {
                        labels: $scope._label_titles,
                        datasets: datasets
                    };
                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
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
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });

                        $("#" + graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {
                                var uri_value = activePoints["0"]._view.label.replace(/\//g, '~');

                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlRaw(getDeviceUrl + '/' + widget_data.device_name, 'HTTPUri',
                                    uri_value, response.set_time, widget_data.tcp_port) :
                                getDeviceUrl + '/raw-list/HTTPUri/' + uri_value + '/' + response.set_time + '/' + tcp_port;

                                //var baseUrl = getDeviceUrl + '/meta/uri/' + uri_value + '/' + response.set_time;
                                window.open(baseUrl);
                            }
                        });
                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }

                    $scope.jetnexisUriMessageProcessing = false;

                }

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.jetnexisUriMessageProcessing = false;

            });
        } else {
            console.log('jetnexisUriMessage request skipped');
        }
    };

    $scope.jetnexisClientPortMessageProcessing = false;
    $scope.jetnexisClientPortMessage = function (widget_data) {
        if (!$scope.jetnexisClientPortMessageProcessing) {
            $scope.jetnexisClientPortMessageProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {

                    $scope._label = JSON.parse(response._label);
                    $scope._label_titles = response._label_titles;
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;
                    $scope._description = response._description;
                    var datasets = [];

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

                    var graph_id = (Object.keys(widget_data).length > 0) ?
                    'jetnexisClientPortMessage' + widget_data.tcp_port : 'jetnexisClientPortMessage',

                    barChartData = {
                        labels: $scope._label_titles,
                        datasets: datasets
                    };
                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
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
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });

                        $("#" + graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {

                                var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlRaw(getDeviceUrl + '/' + widget_data.device_name, 'SourcePort',
                                    activePoints["0"]._view.label, response.set_time, widget_data.tcp_port) :
                                getDeviceUrl + '/raw-list/SourcePort/' + activePoints["0"]._view.label + '/' + response.set_time + '/' + widget_data.tcp_port;

                                window.open(baseUrl);
                            }
                        });
                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }

                    $scope.jetnexisClientPortMessageProcessing = false;

                }

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.jetnexisClientPortMessageProcessing = false;

            });
        } else {
            console.log('jetnexisClientPortMessage request skipped');
        }
    };
    // Destination Ips graps
    $scope.jetnexisActionTypeMessageProcessing = false;
    $scope.jetnexisActionTypeMessage = function (widget_data) {
        if (!$scope.jetnexisActionTypeMessageProcessing) {
            $scope.jetnexisActionTypeMessageProcessing = true;

            $scope._title = 'Loading...';
            $('#jetnexisActionTypeMessage').html('<div class="list-group-item list-group-item-inverse text-ellipsis">Loading... </div>');
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {
                    $scope._title = response._title;

                    var action_type_msg = (Object.keys(widget_data).length > 0) ?
                    '#jetnexisActionTypeMessage' + widget_data.tcp_port : '#jetnexisActionTypeMessage';

                    $(action_type_msg).html(response.devices_list);
                }
                $scope.jetnexisActionTypeMessageProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.jetnexisActionTypeMessageProcessing = false;

            });
        } else {
            console.log('jetnexisActionTypeMessage request skipped');
        }
    };

    /*Paloalto*/

    // Destination Ips graps
    $scope.paloDestinationsProcessing = false;
    $scope.paloDestinations = function (widget_data) {
        if (!$scope.paloDestinationsProcessing) {
            $scope.paloDestinationsProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label);
                $scope._label_titles = response._label_titles;
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'paloDestinations' + widget_data.tcp_port : 'paloDestinations',

                barChartData = {
                    labels: $scope._label_titles,
                    datasets: datasets
                };
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
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
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'DestinationIP', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/DestinationIP/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;


                            window.open(baseUrl);
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }

                $scope.paloDestinationsProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.paloDestinationsProcessing = false;

            });
        } else {
            console.log('paloDestinations request skipped');
        }
    };


    // Destination Ips graps
    $scope.paloSourceIPProcessing = false;
    $scope.paloSourceIP = function (widget_data) {
        if (!$scope.paloSourceIPProcessing) {
            $scope.paloSourceIPProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label);
                $scope._label_titles = response._label_titles;
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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


                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'paloSourceIP' + widget_data.tcp_port : 'paloSourceIP',

                barChartData = {
                    labels: $scope._label_titles,
                    datasets: datasets
                };
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
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
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'SourceIP', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/SourceIP/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }

                $scope.paloSourceIPProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.paloSourceIPProcessing = false;

            });
        } else {
            console.log('palo SourceIP request skipped');
        }
    };


    $scope.paloProtocolTypeProcessing = false;
    $scope.paloProtocolType = function (widget_data) {
        if (!$scope.paloProtocolTypeProcessing) {
            $scope.paloProtocolTypeProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label);
                $scope._label_titles = response._label_titles;
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'paloProtocolType' + widget_data.tcp_port : 'paloProtocolType',

                barChartData = {
                    labels: $scope._label_titles,
                    datasets: datasets
                };
                if (!loggerCharts[graph_id]) {
                    var ctx = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            scales: {
                                xAxes: [{
                                    stacked: true
                                }],
                                yAxes: [{
                                    stacked: true
                                }]
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'ProtocolType', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/ProtocolType/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }

                $scope.paloProtocolTypeProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.paloProtocolTypeProcessing = false;

            });
        } else {
            console.log('paloProtocolType request skipped');
        }
    };


    $scope.paloProtocolActionProcessing = false;
    $scope.paloProtocolAction = function (widget_data) {
        if (!$scope.paloProtocolActionProcessing) {
            $scope.paloProtocolActionProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label);
                $scope._label_titles = response._label_titles;
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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
                        data: data,
                        backgroundColor: [color[$i]],
                        borderColor: [color[$i]],
                        borderWidth: 2,
                        label: $scope._label_titles[$i]
                    });
                }

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'paloProtocolAction' + widget_data.tcp_port : 'paloProtocolAction',

                barChartData = {
                    labels: $scope._label_titles,
                    datasets: datasets
                };
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
                        type: 'horizontalBar',
                        data: barChartData,
                        options: {
                            scales: {
                                xAxes: [{
                                    stacked: true
                                }],
                                yAxes: [{
                                    stacked: true
                                }]
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);

                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'ProtocolAction', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/ProtocolAction/' + activePoints["0"]._view.label + '/' + response.set_time+ '/' + tcp_port;

                            window.open(baseUrl);
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }

                $scope.paloProtocolActionProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.paloProtocolActionProcessing = false;

            });
        } else {
            console.log('paloProtocolAction request skipped');
        }
    };

    $scope.paloDestinationLocationActionProcessing = false;
    $scope.paloDestinationLocationAction = function (widget_data) {
        if (!$scope.paloDestinationLocationActionProcessing) {
            $scope.paloDestinationLocationActionProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label);
                $scope._label_titles = response._label_titles;
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'paloDestinationLocationAction' + widget_data.tcp_port : 'paloDestinationLocationAction',

                barChartData = {
                    labels: $scope._label_titles,
                    datasets: datasets
                };
                if (!loggerCharts[graph_id]) {

                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            scales: {
                                xAxes: [{
                                    stacked: true
                                }],
                                yAxes: [{
                                    stacked: true
                                }]
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'DestinationLocation', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/DestinationLocation/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }
                $scope.paloDestinationLocationActionProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.paloDestinationLocationActionProcessing = false;

            });
        } else {
            console.log('paloDestinationLocationAction request skipped');
        }
    };

    $scope.paloSourceLocationCountryActionProcessing = false;
    $scope.paloSourceLocationCountryAction = function (widget_data) {
        if (!$scope.paloSourceLocationCountryActionProcessing) {
            $scope.paloSourceLocationCountryActionProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label);
                $scope._label_titles = response._label_titles;
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'paloSourceLocationCountryAction' + widget_data.tcp_port : 'paloSourceLocationCountryAction',

                barChartData = {
                    labels: $scope._label_titles,
                    datasets: datasets
                };
                if (!loggerCharts[graph_id]) {

                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
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
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'SourceLocationCountry', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/SourceLocationCountry/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }
                $scope.paloSourceLocationCountryActionProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.paloSourceLocationCountryActionProcessing = false;

            });
        } else {
            console.log('paloSourceLocationCountryAction request skipped');
        }
    };

    $scope.paloNetSourceIPProcessing = false;
    $scope.paloNetSourceIP = function (widget_data) {
        if (!$scope.paloNetSourceIPProcessing) {
            $scope.paloNetSourceIPProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label);
                $scope._label_titles = response._label_titles;
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'paloNetSourceIP' + widget_data.tcp_port : 'paloNetSourceIP',

                barChartData = {
                    labels: $scope._label_titles,
                    datasets: datasets
                };
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
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
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'NATSourceIP', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/NATSourceIP/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }

                $scope.paloNetSourceIPProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.paloNetSourceIPProcessing = false;

            });
        } else {
            console.log('paloNetSourceIP request skipped');
        }
    };

    $scope.netDestinationIPProcessing = false;
    $scope.netDestinationIP = function (widget_data) {
        if (!$scope.netDestinationIPProcessing) {
            $scope.netDestinationIPProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label);
                $scope._label_titles = response._label_titles;
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'netDestinationIP' + widget_data.tcp_port : 'netDestinationIP',

                barChartData = {
                    labels: $scope._label_titles,
                    datasets: datasets
                };
                if (!loggerCharts[graph_id]) {

                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
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
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'NATDestinationIP', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/NATDestinationIP/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }
                $scope.netDestinationIPProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.netDestinationIPProcessing = false;

            });
        } else {
            console.log('netDestinationIP request skipped');
        }
    };

    $scope.sourcePortProcessing = false;
    $scope.sourcePort = function (widget_data) {
        if (!$scope.sourcePortProcessing) {
            $scope.sourcePortProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label);
                $scope._label_titles = response._label_titles;
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'sourcePort' + widget_data.tcp_port : 'sourcePort',

                barChartData = {
                    labels: $scope._label_titles,
                    datasets: datasets
                };
                if (!loggerCharts[graph_id]) {

                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            scales: {
                                xAxes: [{
                                    stacked: true
                                }],
                                yAxes: [{
                                    stacked: true
                                }]
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'SourcePort', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/SourcePort/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);

                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }
                $scope.sourcePortProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.sourcePortProcessing = false;

            });
        } else {
            console.log('sourcePort request skipped');
        }
    };

    $scope.destinationPortProcessing = false;
    $scope.destinationPorts = function (widget_data) {
        if (!$scope.destinationPortProcessing) {
            $scope.destinationPortProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label);
                $scope._label_titles = response._label_titles;
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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

                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'destinationPorts' + widget_data.tcp_port : 'destinationPorts',

                barChartData = {
                    labels: $scope._label_titles,
                    datasets: datasets
                };
                if (!loggerCharts[graph_id]) {

                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            scales: {
                                xAxes: [{
                                    stacked: true
                                }],
                                yAxes: [{
                                    stacked: true
                                }]
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'DestinationPort', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/DestinationPort/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;

                            window.open(baseUrl);


                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }
                $scope.destinationPortProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.destinationPortProcessing = false;

            });
        } else {
            console.log('destinationPorts request skipped');
        }
    };


    /*
    ***F5 ltm***
    */

    $scope.TopLtmDestinationIPsProcessing = false;
    // Destination Ips graps
    $scope.TopLtmDestinationIPs = function (widget_data) {

        if (!$scope.TopLtmDestinationIPsProcessing) {
            $scope.TopLtmDestinationIPsProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url

            }).success(function (response) {

                if (response) {

                    $scope._dest_ip_label = JSON.parse(response.dest_ip_label);
                    $scope._dest_ip_percent = JSON.parse(response.dest_ip_percent);
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;
                    $scope._device_id = response.tcp_port;

                    barChartData = {
                        labels: $scope._dest_ip_label,
                        datasets: [{
                            label: 'Top Attacking Destination IPs',
                            borderWidth: 2,
                            borderColor: randomColor,
                            backgroundColor: randomColor,
                            data: $scope._count
                        },]
                    };


                    var graph_id = (Object.keys(widget_data).length > 0)
                    ? 'TopLtmDestinationIPs' + widget_data.tcp_port : 'TopLtmDestinationIPs';

                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
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
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });

                        $("#" + graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'DestinationIP', activePoints["0"]._view.label, response.set_time + '/' + $scope._device_id) :
                            getDeviceUrl + '/meta/DestinationIP/' + activePoints["0"]._view.label + '/' + response.set_time + '/' + $scope._device_id;

                            window.open(baseUrl);


                        });

                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }

                } else {
                    scope._title = 'NO Data found';
                }
                $scope.TopLtmDestinationIPsProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TopLtmDestinationIPsProcessing = false;
            });
        } else {
            console.log('TopLtmDestinationIPs request skipped');
        }
    };

    $scope.TopLoggerPortsCountsProcessing = false;
    // Destination Ips graps
    $scope.TopLoggerPortsCounts = function (widget_data) {

        if (!$scope.TopLoggerPortsCountsProcessing) {

            $scope.TopLoggerPortsCountsProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url

            }).success(function (response) {

                if (response) {

                    $scope._label = response.port_title;
                    $scope._label_titles = response.port_title;
                    $scope._count = response.counts;
                    $scope._title = 'Top Ports with respect to data count ';
                    $scope._device_id = response._title;

                    var datasets = [];

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
                        labels: $scope._label_titles,
                        datasets: datasets
                    };


                    var graph_id = (Object.keys(widget_data).length > 0)
                        ? 'TopLoggerPortsCounts' + response._title : 'TopLoggerPortsCounts';

                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
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
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });

                        $("#" + graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                            if((Object.keys(widget_data).length > 0)){
                                getDeviceNameByPort(getDeviceUrl , activePoints["0"]._view.label);
                               return;
                            }
                        });

                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }

                } else {
                    scope._title = 'NO Data found';
                }
                $scope.TopLoggerPortsCountsProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TopLoggerPortsCountsProcessing = false;
            });
        } else {
            console.log('TopLoggerPortsCounts request skipped');
        }
    };
    function getDeviceNameByPort(url ,port) {
        let new_url =  url+'/device-name/'+port;

        $http({
            method: 'GET',
            url: new_url

        }).success(function (response) {

            if(response){
                let baseUrl =  getDeviceUrl + '/'+response.device_type+'/graphs/'+port;
                window.open(baseUrl);
            }else{
                return null;
            }

        });
    };
    $scope.TopLtmSourceIPsProcessing = false;
    // Destination Ips graps
    $scope.TopLtmSourceIPs = function (widget_data) {

        if (!$scope.TopLtmSourceIPsProcessing) {
            $scope.TopLtmSourceIPsProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url

            }).success(function (response) {

                if (response) {
                    $scope._source_ip_label = JSON.parse(response.source_ip_label);
                    $scope._source_ip_percent = JSON.parse(response.source_ip_percent);
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;
                    $scope._device_id = response.tcp_port;

                    barChartData = {
                        labels: $scope._source_ip_label,
                        datasets: [{
                            label: 'Top Attacking Source IPs',
                            borderWidth: 2,
                            borderColor: randomColor,
                            backgroundColor: randomColor,
                            data: $scope._count
                        },]
                    };

                    var graph_id = (Object.keys(widget_data).length > 0)
                    ? 'TopLtmSourceIPs' + widget_data.tcp_port : 'TopLtmSourceIPs';
                    if (!loggerCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        loggerCharts[graph_id] = new Chart(ctx2, {
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
                                },
                                maintainAspectRatio: false,
                                responsive: true,
                            }
                        });

                        $("#" + graph_id).click(function (evt) {
                            var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'SourceIP', activePoints["0"]._view.label, response.set_time + '/' + $scope._device_id) :
                            getDeviceUrl + '/meta/SourceIP/' + activePoints["0"]._view.label + '/' + response.set_time + '/' + $scope._device_id;
                            window.open(baseUrl);
                            /*if (activePoints["0"]._view.label != 'undefined') {
                                window.location = getDeviceUrl + '/meta/SourceIP/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+$scope._device_id;
                            }*/
                        });
                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }


                } else {
                    scope._title = 'NO Data found';
                }
                $scope.TopLtmSourceIPsProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TopLtmSourceIPsProcessing = false;
            });
        } else {
            console.log('TopLtmSourceIPs request skipped');
        }
    };

    // Destination Ips graps
    $scope.publicIPsProcessing = false;
    $scope.publicIPs = function (widget_data) {
        if (!$scope.publicIPsProcessing) {
            $scope.publicIPsProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label ? response._label : null);
                $scope._label_titles = response._label_titles ? response._label_titles : null;
                $scope._count = JSON.parse(response.count ? response.count : 0);
                $scope._title = response._title ? response._title : null;
                $scope._description = response._description ? response._description : null;
                var datasets = [];

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

                var graph_id = (Object.keys(widget_data).length > 0)
                    ? 'publicIPs' + widget_data.tcp_port : 'publicIPs',

                    barChartData = {
                        labels: $scope._label_titles,
                        datasets: datasets
                    };
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
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
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                    'PublicIP', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                                getDeviceUrl + '/meta/PublicIP/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;

                            window.open(baseUrl);
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }

                $scope.publicIPsProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.publicIPsProcessing = false;

            });
        } else {
            console.log('public IPs request skipped');
        }
    };

    $scope.deviceIPsProcessing = false;
    $scope.deviceIPs = function (widget_data) {
        if (!$scope.deviceIPsProcessing) {
            $scope.deviceIPsProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label ? response._label : null);
                $scope._label_titles = response._label_titles ? response._label_titles : null;
                $scope._count = JSON.parse(response.count ? response.count : 0);
                $scope._title = response._title ? response._title : null;
                $scope._description = response._description ? response._description : null;
                var datasets = [];

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

                var graph_id = (Object.keys(widget_data).length > 0)
                    ? 'deviceIPs' + widget_data.tcp_port : 'deviceIPs',

                    barChartData = {
                        labels: $scope._label_titles,
                        datasets: datasets
                    };
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
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
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                    'DeviceIP', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                                getDeviceUrl + '/meta/DeviceIP/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;

                            window.open(baseUrl);
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }

                $scope.deviceIPsProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.deviceIPsProcessing = false;

            });
        } else {
            console.log('Device IPs request skipped');
        }
    };

    $scope.sourceMacAddressesProcessing = false;
    $scope.sourceMacAddresses = function (widget_data) {
        if (!$scope.sourceMacAddressesProcessing) {
            $scope.sourceMacAddressesProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label ? response._label : null);
                $scope._label_titles = response._label_titles ? response._label_titles : null;
                $scope._count = JSON.parse(response.count ? response.count : 0);
                $scope._title = response._title ? response._title : null;
                $scope._description = response._description ? response._description : null;
                var datasets = [];

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

                var graph_id = (Object.keys(widget_data).length > 0)
                    ? 'sourceMacAddresses' + widget_data.tcp_port : 'sourceMacAddresses',

                    barChartData = {
                        labels: $scope._label_titles,
                        datasets: datasets
                    };
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
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
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                                $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                    'SourceMacAddresses', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                                getDeviceUrl + '/meta/SourceMacAddresses/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;

                            window.open(baseUrl);
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }

                $scope.sourceMacAddressesProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.sourceMacAddressesProcessing = false;

            });
        } else {
            console.log('Source Mac Addresses request skipped');
        }
    };

    $scope.sentinelLogProcessing = false;
    $scope.sentinelLog = function (widget_data) {

        if (!$scope.sentinelLogProcessing) {

            $scope.sentinelLogProcessing = true;

            if (widget_data) {
                url = widget_data.url;
            }

            $scope._title = 'Loading...';
            $('#sentinelLog').html('<div class="list-group-item text-ellipsis">Loading... </div>');
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response) {
                    $scope._title = response._title;

                    var error_id = (Object.keys(widget_data).length > 0) ?
                        '#sentinelLog' + widget_data.tcp_port : '#sentinelLog';

                    $(error_id).html(response.devices_list);
                }
                $scope.sentinelLogProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.sentinelLogProcessing = false;

            });
        } else {
            console.log('sentinel Log request skipped');
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

    $scope.makeClickUrlMeta = function (base_url, type, label, time) {
        return base_url + '/meta/' + type + '/' + label + '/' + time;
    };

    $scope.makeClickUrlRaw = function (base_url, type, label, time, tcp_port) {
        return base_url + '/raw-list/' + type + '/' + label + '/' + time + '/' + tcp_port;
    }

    $scope.fortinetSourceIPProcessing = false;
    $scope.fortinetSourceIP = function (widget_data) {
        if (!$scope.fortinetSourceIPProcessing) {
            $scope.fortinetSourceIPProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label);
                $scope._label_titles = response._label_titles;
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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
                        label: 'Source IP ',
                        borderWidth: 2,
                        backgroundColor: color[$i],

                        data: data
                    });
                }


                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'fortinetSourceIP' + widget_data.tcp_port : 'fortinetSourceIP',

                barChartData = {
                    labels: $scope._label_titles,
                    datasets: datasets
                };
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
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
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'SourceIP', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/SourceIP/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }

                $scope.fortinetSourceIPProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.fortinetSourceIPProcessing = false;

            });
        } else {
            console.log('fortinet SourceIP request skipped');
        }
    };

    $scope.fortinetDestinationIPProcessing = false;
    $scope.fortinetDestinationIP = function (widget_data) {
        if (!$scope.fortinetDestinationIPProcessing) {
            $scope.fortinetDestinationIPProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._label = JSON.parse(response._label);
                $scope._label_titles = response._label_titles;
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;
                $scope._description = response._description;
                var datasets = [];

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
                        label:'Destination IP ',
                        borderWidth: 2,
                        backgroundColor: color[$i],

                        data: data
                    });
                }


                var graph_id = (Object.keys(widget_data).length > 0)
                ? 'fortinetDestinationIP' + widget_data.tcp_port : 'fortinetDestinationIP',

                barChartData = {
                    labels: $scope._label_titles,
                    datasets: datasets
                };
                if (!loggerCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    loggerCharts[graph_id] = new Chart(ctx2, {
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
                            },
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#" + graph_id).click(function (evt) {
                        var activePoints = loggerCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.label != 'undefined') {

                            var baseUrl = (Object.keys(widget_data).length > 0) ?
                            $scope.makeClickUrlMeta(getDeviceUrl + '/' + widget_data.device_name,
                                'DestinationIP', activePoints["0"]._view.label, response.set_time+'/'+widget_data.tcp_port) :
                            getDeviceUrl + '/meta/DestinationIP/' + activePoints["0"]._view.label + '/' + response.set_time+'/'+widget_data.tcp_port;
                            window.open(baseUrl);
                        }
                    });
                } else {
                    updateLoggerChartData(loggerCharts[graph_id], barChartData);
                }

                $scope.fortinetDestinationIPProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.fortinetDestinationIPProcessing = false;

            });
        } else {
            console.log('fortinet Destination request skipped');
        }
    };

});


app.filter('trustAsHtml', ['$sce', function ($sce) {

    return function (text) {

        return $sce.trustAsHtml(text);

    };

}]);

function resizeLoggerCharts() {
    for (var key in loggerCharts) {
        if (loggerCharts.hasOwnProperty(key)) {
            loggerCharts[key].resize();

        }
    }
}

$(document).on('click', '[data-click=panel-expand]', function (e) {
    setTimeout(function () {
        resizeLoggerCharts();
    }, 200);

});
