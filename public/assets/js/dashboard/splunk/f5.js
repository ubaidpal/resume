var F5App = angular.module('F5DashboardFromSplunk', []),

    blue = '#348fe2',
    blueLight = '#5da5e8',
    blueDark = '#1993E4',
    aqua = '#49b6d6',
    aquaLight = '#6dc5de',
    aquaDark = '#3a92ab',
    green = '#0f9e3e',
    greenLight = '#33bdbd',
    greenDark = '#008a8a',
    orange = '#f59c1a',
    orangeLight = '#f7b048',
    orangeDark = '#c47d15',
    dark = '#2d353c',
    darkLight = '#474e55',
    grey = '#b6c2c9',
    purple = '#727cb6',
    purpleLight = '#8e96c5',
    purpleDark = '#5b6392',
    red = '#ff5b57',

    white = 'rgba(255,255,255,1.0)',
    fillBlueLight = 'rgba(114, 124, 182, 0.2)',
    fillBlue = 'rgba(52, 143, 226, 0.6)',
    strokeBlue = 'rgba(52, 143, 226, 0.8)',
    fillPurpleLight = 'rgba(114, 124, 182, 0.2)',
    strokePurple = 'rgba(114, 124, 182, 0.8)',

    barChart = null,
    ctx2 = '',
    barChartData = [],
    f5Charts = [],

    randomHues = function (n) {
        var res = [];
        for (var i = 0; i < n; i++)
            res.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')')
        return res
    },

    randomColor = randomHues(256),

    f5VisitorsDonutChart = function (_ipAttack_Percent, _donut_id) {
        "use strict"
        if (!f5Charts[_donut_id]) {
            f5Charts[_donut_id] = Morris.Donut({
                element: _donut_id,
                data: _ipAttack_Percent,
                colors: [green, blue],
                labelFamily: 'Open Sans',
                labelColor: 'rgba(0,0,0,0.4)',
                labelTextSize: '12px',
                backgroundColor: '#242a30'
            });
        } else {
            f5Charts[_donut_id] = f5UpdateMorrisChartData(f5Charts[_donut_id], _ipAttack_Percent);
        }

    },

    updateF5ChartData = function (chart, data) {
        chart.data.labels = data.labels;
        chart.data.datasets = data.datasets;
        chart.update();
    },
    f5UpdateMorrisChartData = function (chart, data) {
        if (data && data.length > 0) {
            chart.setData(data);
        }
        return chart;
    },

    f5LineChartFunction = function (id, dataChart) {
        var lineChartData = dataChart;
        if (!f5Charts[id]) {
            var ctx2 = document.getElementById(id).getContext('2d');
            f5Charts[id] = new Chart(ctx2, {
                type: 'line',
                data: lineChartData,

                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                }
            });
        } else {
            updateF5ChartData(f5Charts[id], lineChartData);
        }


    },

    f5PieFunction = function (id, title, label, data) {
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
        if (!f5Charts[id]) {
            var ctx5 = document.getElementById(id).getContext('2d');
            f5Charts[id] = new Chart(ctx5, {
                type: 'pie',
                data: pieChartData,
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                }
            });
        } else {
            updateF5ChartData(f5Charts[id], pieChartData);
        }

    },

    f5BarChartFunction = function (id, ips, count, title) {
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
        if (!f5Charts[id]) {
            var ctx2 = document.getElementById(id).getContext('2d');
            f5Charts[id] = new Chart(ctx2, {
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
                        }],

                        maintainAspectRatio: false,
                        responsive: true,
                    }
                }
            });
        } else {
            updateF5ChartData(f5Charts[id], barChartData);
        }
    },

    f5AttacksVectorMap = function (_attacks, wHeight) {
        if (('#splunk-map').length !== 0) {
            $('#splunk-map').css('height', wHeight);
            $('#splunk-map').vectorMap({
                map: 'world_mill_en',

                scaleColors: [grey, darkLight],
                normalizeFunction: 'linear',
                hoverOpacity: 0.5,
                hoverColor: false,
                zoomOnScroll: false,
                markerStyle: {initial: {fill: green, stroke: 'transparent', r: 3}},
                regionStyle: {
                    initial: {
                        fill: darkLight, "fill-opacity": 1,
                        stroke: 'none', "stroke-width": 0.4, "stroke-opacity": 1
                    },
                    hover: {"fill-opacity": 0.8}, selected: {fill: 'yellow'}
                },
                focusOn: {x: 0.5, y: 0.5, scale: 1},
                backgroundColor: 'transparent',
                markers: _attacks
            });
        }
    };

F5App.controller('SPlunkController', function ($scope, $http, $interval) {

    $scope.url = [
        getSetIntervalID,
        checkActiveDeviceViaAPIURL,
    ];

    $scope.typeOptions = [ //
        {name: '30 Sec', value: '30000'}
    ];

    $scope.auto_refresh = $scope.typeOptions[0].value;

    // function to refresh default
    $scope.auto_repeat = function (repeat_time) {

        var target = event.target || event.srcElement || event.currentTarget;
        var id = target.offsetParent.id;
        if (id) {
            var widget_data = JSON.parse(id); //parse
            var repeat = $('.' + widget_data.function_name).data('repeat'); //getter
            $scope.CustomFunction(id, repeat, true);
        }

    };

    // function to get splunk multiple data
    $scope.get_user_splunk_devices = function (_user_splunk_device_url) {
        $scope.get_splunk_devices(_user_splunk_device_url);
    };

    //get splunk devices
    $scope.get_splunk_devices = function (_user_splunk_device_url) {

        $http({ //get http response
            method: 'GET',
            url: _user_splunk_device_url
        }).success(function (response) {

            if (response[0]['widget_data']) {

                $scope.CustomFunction(response[0]['widget_data']);
                $scope.splunk_devices = response;

                $scope.device_option = [
                    {name: response[0]['device_name'], value: response[0]['widget_data']}
                ];

                $scope._device_data = $scope.device_option[0].value;

                widget_data = JSON.parse(response[0]['widget_data']); //parse
                $('.' + widget_data.function_name).attr('id', response[0]['widget_data']);
            }

        }).error(function (err) {
            console.log('errr >> ');
            console.log(err);
        });
    }

    //get splunk devices and get data accordingly
    $scope.action_in_splunk = function (splunk_data) {

        widget_data = JSON.parse(splunk_data); //parse
        $('.' + widget_data.function_name).attr('id', splunk_data);
        $('.' + widget_data.function_name).attr('data-repeat', splunk_data);
        $scope.CustomFunction(splunk_data, 30000, true);
    };

    //get graph name and autofresh value on select function
    $scope.action_in_f5 = function (auto_refresh) {

        var target = event.target || event.srcElement || event.currentTarget;
        var id = target.attributes.id;
        var function_name = id.nodeValue; //get graph id so can integrate specific graph on refresh time
        if (auto_refresh) {
            $scope.CustomFunction(function_name, auto_refresh, true);
        }

    };

    //on load graph render on page
    $scope.CustomFunction = function (widget_data, auto_refresh = 30000, refresh = false) {

        widget_data = JSON.parse(widget_data); //parse
        function_name = widget_data.function_name;
        $scope.getCustomFunction(function_name, widget_data);


        if (!refresh) {
            $scope.setInterval(widget_data, auto_refresh);
        } else {
            $('.' + function_name).attr('data-repeat', auto_refresh); //setter
            $scope.getSetIntervalID(widget_data, null, auto_refresh);
        }

    }

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

        var interval_url;
        graph_name = widget_data.function_name;

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
        var append = 1;
        $scope.getCustomFunction(function_name, widget_data, append);
    };

    //get custome function when it call back
    $scope.getCustomFunction = function (function_name, widget_data = {}, append = 0) {
        $scope.removeExtraIframes(function_name);

        switch (function_name) {

            case 'getTopIpsAttacks':
                $scope.getTopIpsAttacks(widget_data, append);
                break;

            case 'f5CountryAttackMap':
                $scope.f5CountryAttackMap(widget_data, append);
                break;

            case 'getBlockedIpsInDb':
                $scope.getBlockedIpsInDb(widget_data, append);
                break;

            case 'getCountryAttacks':
                $scope.getCountryAttacks(widget_data, append);
                break;

            case 'getBlockedIpsROI':
                $scope.getBlockedIpsROI(widget_data, append);
                break;

            case 'distTypeOverTime':
                $scope.distTypeOverTime(widget_data);
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

            case 'getTopIpAttack':
                $scope.getTopIpAttack(widget_data);
                break;

            case 'f5SpreadingTopIPs':
                $scope.f5SpreadingTopIPs(widget_data);
                break;

            default:

        }

    };

    $scope.timer = null;
    $scope.showDefaultStatus = true; // by default show true
    $scope.getTopIpsAttacksCheck = 0;
    // function to get splunk top ips attack from the splunk api
    $scope.getTopIpsAttacks = function (widget_data, append = 0) {

        if ($scope.getTopIpsAttacksCheck == 0) {
            $scope.getTopIpsAttacksCheck = 1;

            $('#visitors-donut-chart').html(''); // this is my <canvas> element
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {
                $scope._title = response._title;
                $scope.topCountsIPs = 'Total IPs (' + (response.topCountsIPs ? response.topCountsIPs : '0') + ' )';
                $scope.topCountsPercent = 'Maximum Attack Count (' + (response.topCountsPercent ? response.topCountsPercent : '0') + ' )';
                $scope.allIpClient = JSON.parse(response.allIpClient);
                $scope.allIpPercent = JSON.parse(response.allIpPercent);
                $scope.ipAttack_Percent = JSON.parse(response.ipAttack_Percent);

                var label = $scope.allIpClient;
                var data = $scope.allIpPercent;

                barChartData = {
                    labels: label,
                    datasets: [{
                        label: 'Attack Count',
                        borderWidth: 2,
                        borderColor: strokePurple,
                        backgroundColor: fillPurpleLight,
                        data: data
                    },]
                };
                var graph_id = 'getTopIpsAttacks';
                if (!f5Charts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    f5Charts[graph_id] = new Chart(ctx2, {
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

                    $("#getTopIpsAttacks").click(function (evt) {
                            if (_virusTotal !== null) {
                                /*var activePoints = barChart.getElementsAtXAxis(evt);*/
                                var activePoints = f5Charts[graph_id].getElementAtEvent(evt);
                                if (activePoints["0"]._view.label != 'undefined') {
                                    var live_ip = 'f5';
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
                    updateF5ChartData(f5Charts[graph_id], barChartData);
                }

                // if (append > 0) {
                //     $('#visitors-donut-chart').remove(); // this is my <canvas> element
                //     $('#visitors-donut').append('<div id="visitors-donut-chart" style="height: 160px"></div>');
                // }//this code user after response
                var donutData = $scope.ipAttack_Percent;
                f5VisitorsDonutChart(donutData, 'visitors-donut-chart');
                $scope.getTopIpsAttacksCheck = 0;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.getTopIpsAttacksCheck = 0;
            });
        } else {
            console.log('getTopIpsAttacks request skipped');
        }

    };
    $scope.getCountryAttacksCheck = 0;
    // function to get splunk top ips TopIpsAttacks from the splunk api
    $scope.getCountryAttacks = function (widget_data = {}) {
        if ($scope.getCountryAttacksCheck == 0) {
            $scope.getCountryAttacksCheck = 1;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                var datasets = [];

                $scope.labels = response.countryAttackLabel;
                $scope.count = response.count;
                $scope._title = response._title;

                for ($i = 0; $i < $scope.count.length; $i++) {

                    var data = [];
                    for (var j = 0; j < $scope.count.length; j++) {
                        if (j == $i)
                            data.push($scope.count[$i]);
                        else
                            data.push(0);
                    }

                    var color = randomColor;

                    datasets.push({
                        label: $scope.labels[$i],
                        borderWidth: 2,
                        backgroundColor: color[$i],
                        data: data
                    });
                }

                barChartData = {
                    labels: $scope.labels,
                    datasets: datasets
                };
                var graph_id = 'getCountryAttacks';
                if (!f5Charts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    f5Charts[graph_id] = new Chart(ctx2, {
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

                    // for click event
                    $("#getCountryAttacks").click(function (evt) {
                        var activePoints = f5Charts[graph_id].getElementsAtXAxis(evt);
                        if (activePoints["0"]._view.label != 'undefined') {
                            window.location = geoLocation + '/' + activePoints["0"]._view.label;

                        }
                    });
                } else {
                    updateF5ChartData(f5Charts[graph_id], barChartData);
                }

                $scope.getCountryAttacksCheck = 0;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.getCountryAttacksCheck = 0;
            });
        } else {
            console.log('getCountryAttacks request skipped');
        }
    };

    $scope.f5CountryAttackMapCheck = 0;
    // function to get splunk country attack from the splunk api
    $scope.f5CountryAttackMap = function (widget_data, append = 0) {

        if ($scope.f5CountryAttackMapCheck == 0) {
            $scope.f5CountryAttackMapCheck = 1;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {
                $scope._title = response._title;
                $scope.f5attacksCount = response.attacksCount;
                $scope.f5countryCount = response.countryCount;
                $scope.f5uniqueIps = response.uniqueIps;
                $scope.attacks = response.f5CountryAttackMap;

                var wHeight = '181px';
                var data = JSON.parse($scope.attacks);
                if (append > 0) {
                    $('#splunk-map').remove(); // this is my <canvas> element
                    $('#splunck-attach-map').html('');
                    $('#map_g').html('<div id="splunk-map" style="height: 160px"></div>');
                }
                f5AttacksVectorMap(data, wHeight);
                $scope.f5CountryAttackMapCheck = 0;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.f5CountryAttackMapCheck = 0;
            });
        } else {
            console.log('f5CountryAttackMap request skipped');
        }


    };

    $scope.getBlockedIpsInDbCheck = 0;
    // function to get splunk top ips attack from the splunk api
    $scope.getBlockedIpsInDb = function (widget_data = {}, append = 0) {
        if ($scope.getBlockedIpsInDbCheck == 0) {
            $scope.getBlockedIpsInDbCheck = 1;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._title = response._title;
                $scope.topBlockedCountsIPs = 'Total IPs (' + (response.topCountsIPs ? response.topCountsIPs : '0') + ')';
                $scope.topBlockedCountsPercent = 'Maximum % Blocked (' + (response.topCountsPercent ? response.topCountsPercent : '0') + ' %)';
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
                var graph_id = 'getBlockedIpsInDb';
                if (!f5Charts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    f5Charts[graph_id] = new Chart(ctx2, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            maintainAspectRatio: false,
                            responsive: true,
                        }

                    });

                    $("#getBlockedIpsInDb").click(function (evt) {
                            if (_virusTotal !== null) {
                                var activePoints = f5Charts[graph_id].getElementsAtXAxis(evt);
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
                } else {
                    updateF5ChartData(f5Charts[graph_id], barChartData);
                }

                // if (append > 0) {
                //     $('#visitors-donut-chart-blocked-Ips').remove(); // this is my <canvas> element
                //     $('#results-graph').append('<div id="visitors-donut-chart-blocked-Ips" style="height: 160px"></div>');
                // }
                var donutData = $scope.ipAttack_Percent;
                f5VisitorsDonutChart(donutData, 'visitors-donut-chart-blocked-Ips');
                $scope.getBlockedIpsInDbCheck = 0;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.getBlockedIpsInDbCheck = 0;
            });
        } else {
            console.log('getBlockedIpsInDb request skipped');
        }

    };

    // check via API call if the Device is active or Not
    $scope.checkActiveDeviceViaAPI = function ($param) {

        statusDeviceCheck($scope, $http, $param); //this function run on every 2 mint
        $scope.timer = $interval(function () {
            statusDeviceCheck($scope, $http, $param); //this function run on every 2 mint
        }, 120000); // Refresh Every 2 minute

    };
    $scope.getBlockedIpsROICheck = 0;
    // function to calculate per hour cost of blocked ip in db
    $scope.getBlockedIpsROI = function (widget_data = {}) {
        if ($scope.getBlockedIpsROICheck == 0) {
            $scope.getBlockedIpsROICheck = 1;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url + '/roi_tech'
            }).success(function (response) {

                $scope._title = response._title;
                $scope.working_cost_hour = 'Cost of IT resource /hour (' + response.working_cost_hour + ' )';
                $scope.topBlockedCountsPercent = 'Maximum Count (' + response.totalcount + ')';
                $scope.ip_count = JSON.parse(response.ip_count);
                $scope.allIpPercent = JSON.parse(response.allIpPercent);
                $scope.ipAttack_Percent = JSON.parse(response.ipAttack_Percent);

                var label = $scope.ip_count;
                var data = $scope.allIpPercent;

                barChartData = {
                    labels: label,
                    datasets: [{
                        label: $scope._title,
                        borderWidth: 2,
                        borderColor: strokePurple,
                        backgroundColor: fillPurpleLight,
                        data: data,
                    },]
                };
                var graph_id = 'blocked-ip-cost-chart';
                if (!f5Charts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    f5Charts[graph_id] = new Chart(ctx2, {
                        type: 'bar',
                        data: barChartData,
                        options: {
                            maintainAspectRatio: false,
                            responsive: true,
                        }
                    });

                    $("#blocked-ip-cost-chart").click(function (evt) {
                            if (_virusTotal !== null) {
                                var activePoints = f5Charts[graph_id].getElementsAtXAxis(evt);
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
                } else {
                    updateF5ChartData(f5Charts[graph_id], barChartData);
                }

                var donutData = $scope.ipAttack_Percent;
                f5VisitorsDonutChart(donutData, 'visitors-donut-chart-blocked-Ips');
                $scope.getBlockedIpsROICheck = 0;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.getBlockedIpsROICheck = 0;
            });
        } else {
            console.log('getBlockedIpsROI request skipped');
        }
    };

    $scope.f5CountryAttacks = function (widget_data) {
        $scope.attacksCount = 'Loading...';
        $scope.countryCount = 'Loading...';
        $scope.uniqueIps = 'Loading...';
        $http({
            method: 'GET',
            url: widget_data.url
        }).success(function (response) {

            $scope.attacksCount = response.attacksCount;
            $scope.countryCount = response.countryCount;
            $scope.uniqueIps = response.uniqueIps;
            //return false;

        });
    };

    $scope.distTypeOverTimeProcessing = false;
    $scope.distTypeOverTime = function (widget_data = {}) {
        if (!$scope.distTypeOverTimeProcessing) {
            $scope.distTypeOverTimeProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response._title === undefined) {
                    $scope._title = 'Attack Type Distribution by Type Over Time';
                } else {
                    $scope._title = response._title;
                }
                $scope.distTypeOverTimeProcessing = false;
                if (response.labels && response.labels.length) {
                    f5LineChartFunction('distTypeOverTime', response);
                }
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.distTypeOverTimeProcessing = false;
            });
        } else {
            console.log('distTypeOverTime request skipped');

        }
    };

    $scope.distCountryOverTimeProcessing = false;

    $scope.distCountryOverTime = function (widget_data = {}) {
        if (!$scope.distCountryOverTimeProcessing) {
            $scope.distCountryOverTimeProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                if (response._title === undefined) {
                    $scope._title = 'Attack Distribution by Country Over Time';
                } else {
                    $scope._title = response._title;
                }
                $scope.distCountryOverTimeProcessing = false;
                if (response.labels && response.labels.length) {
                    f5LineChartFunction('distCountryOverTime', response);
                }
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.distCountryOverTimeProcessing = false;
            });
        } else {
            console.log('distCountryOverTime request skipped');
        }
    };
    $scope.TopAttackingTypesProcessing = false;
    $scope.TopAttackingTypes = function (widget_data = {}) {
        if (!$scope.TopAttackingTypesProcessing) {
            $scope.TopAttackingTypesProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._attack_type = response._attack_type;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                f5BarChartFunction('TopAttackingTypes', $scope._attack_type, $scope._count, $scope._title);
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
    $scope.TopViolationsProcessing = false;
    $scope.TopViolations = function (widget_data = {}) {
        if (!$scope.TopViolationsProcessing) {
            $scope.TopViolationsProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._violations = response._violations;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                f5BarChartFunction('TopViolations', $scope._violations, $scope._count, $scope._title);
                $scope.TopViolationsProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TopViolationsProcessing = false;
            });
        } else {
            console.log('TopViolations request skipped');
        }
    };
    $scope.TopSignaturesProcessing = false;
    $scope.TopSignatures = function (widget_data = {}) {
        if (!$scope.TopSignaturesProcessing) {
            $scope.TopSignaturesProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._sig_names = response._sig_names;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                f5BarChartFunction('TopSignatures', $scope._sig_names, $scope._count, 'count');

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
    $scope.TopCountryAttacksProcessing = false;
    $scope.TopCountryAttacks = function (widget_data = {}) {
        if (!$scope.TopCountryAttacksProcessing) {
            $scope.TopCountryAttacksProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {
                $scope._countryAttackLabel = response.countryAttackLabel;
                $scope._countryAttackPercent = response.countryAttackPercent;
                $scope._count = response.count;
                $scope._title = response._title;

                f5BarChartFunction('TopCountryAttacks', $scope._countryAttackLabel, $scope._count, $scope._title);
                $scope.TopCountryAttacksProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TopCountryAttacksProcessing = false;
            });
        } else {
            console.log('TopCountryAttacks request skipped');
        }
    };
    $scope.getTopIpAttackProcessing = false;
    $scope.getTopIpAttack = function (widget_data = {}) {
        if (!$scope.getTopIpAttackProcessing) {
            $scope.getTopIpAttackProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope.allIpClient = JSON.parse(response.allIpClient);
                $scope.allIpPercent = JSON.parse(response.allIpPercent);
                $scope.ipAttack_Percent = JSON.parse(response.ipAttack_Percent);
                $scope._title = response._title;

                barChartData = {
                    labels: $scope.allIpClient,
                    datasets: [{
                        label: $scope._title,
                        borderWidth: 2,
                        borderColor: strokePurple,
                        backgroundColor: fillBlueLight,
                        data: $scope.allIpPercent
                    },]
                };
                var graph_id = 'getTopIpAttack';

                // var ctx2 = document.getElementById(graph_id).getContext('2d');
                // var barChart = new Chart(ctx2, {
                //     type: 'bar',
                //     data: barChartData,
                //     options: {
                //         maintainAspectRatio: false,
                //         responsive: true,
                //     }
                // });
                f5BarChartFunction(graph_id, $scope.allIpClient, $scope.allIpPercent, $scope._title);
                $scope.getTopIpAttackProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.getTopIpAttackProcessing = false;
            });
        } else {
            console.log('getTopIpAttack request skipped');

        }
    };

    $scope.f5SpreadingTopAttackingProcessing = false;
    $scope.f5SpreadingTopAttacking = function (widget_data = {}) {
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
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                f5PieFunction('f5SpreadingTopAttacking', $scope._attack_type, $scope._count, $scope._percent);
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
    $scope.f5SpreadingViolation = function (widget_data = {}) {
        if (!$scope.f5SpreadingViolationProcessing) {
            $scope.f5SpreadingViolationProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._violations = response._violations;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                f5PieFunction('f5SpreadingViolation', $scope._violations, $scope._count, $scope._percent);
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
    $scope.f5SpreadingSignatureProcessing = false;
    $scope.f5SpreadingSignature = function (widget_data = {}) {
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
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                f5PieFunction('f5SpreadingSignature', $scope._sig_names, $scope._count, $scope._percent);
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
    $scope.f5SpreadingCountriesProcessing = false;
    $scope.f5SpreadingCountries = function (widget_data = {}) {
        if (!$scope.f5SpreadingCountriesProcessing) {
            $scope.f5SpreadingCountriesProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._geo_location = response._geo_location;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                f5PieFunction('f5SpreadingCountries', $scope._geo_location, $scope._count, $scope._percent);
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
    $scope.f5SpreadingTopIPs = function (widget_data = {}) {
        if (!$scope.f5SpreadingTopIPsProcessing) {
            $scope.f5SpreadingTopIPsProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._ip_client = response._ip_client;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                f5PieFunction('f5SpreadingTopIPs', $scope._ip_client, $scope._count, $scope._percent);
                $scope.f5SpreadingTopIPsProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.f5SpreadingTopIPsProcessing = false;
            });
        } else {
            console.log('f5SpreadingTopIPs request skipped');
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

var statusDeviceCheck = function ($scope, $http, $param) {
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

F5App.filter('trustAsHtml', ['$sce', function ($sce) {

    return function (text) {

        return $sce.trustAsHtml(text);

    };

}]);

function resizeF5Charts() {

    for (var key in f5Charts) {
        if (f5Charts.hasOwnProperty(key)) {
            f5Charts[key].resize();

        }
    }

}

$(document).on('click', '[data-click=panel-expand]', function (e) {
    setTimeout(function () {
        resizeF5Charts();
    }, 200);

});
