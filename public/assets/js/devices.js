var devices = angular.module('Devices', []),
    barChartData = null,
    loggerCharts = [];
// white
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
fillPurpleLight = 'rgba(114, 124, 182, 0.2)',
strokePurple = 'rgba(114, 124, 182, 0.8)',
highlightFillPurple = 'rgba(114, 124, 182, 0.8)',
highlightStrokePurple = 'rgba(114, 124, 182, 1)',


status,
blue = '#348fe2',
blueLight = '#5da5e8',
blueDark = '#1993E4',
aqua = '#49b6d6',
aquaLight = '#6dc5de',
aquaDark = '#3a92ab',
green = '#00acac',
greenLight = '#33bdbd',
greenDark = '#008a8a',
orange = '#f59c1a',
orangeLight = '#f7b048',
orangeDark = '#c47d15',
dark = '#2d353c',
grey = '#b6c2c9',
purple = '#727cb6',
purpleLight = '#8e96c5',
purpleDark = '#5b6392',
red = '#ff5b57',
devicesCharts = [],


// One way to write it, not the prettiest way to write it.
bytesToString = function (bytes) {

    var fmt = d3.format('.0f');

    if (bytes < 1024) {
        return fmt(bytes) + 'B';
    } else if (bytes < 1024 * 1024) {
        return fmt(bytes / 1024) + 'kB';
    } else if (bytes < 1024 * 1024 * 1024) {
        return fmt(bytes / 1024 / 1024) + 'MB';
    } else {
        return fmt(bytes / 1024 / 1024 / 1024) + 'GB';
    }
};

function randomHues(n, opacity) {
    var res = [];
    for (var i = 0; i < n; i++)
        res.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ', ' + opacity + ')')
    return res
};

var randomScalingFactor = function () {
    return Math.round(Math.random() * 100)
};

var randomColor = randomHues(256, 0.8);

function updateDevicesChartData(chart, data) {

    chart.data.labels = data.labels;
    chart.data.datasets = data.datasets;
    chart.update();
};

function devicesPieFunction(id, title, label, data) {

    var pieChartData = {
        labels: title,
        datasets: [{
            data: data,
            backgroundColor: randomColor,
            borderColor: randomColor,
            borderWidth: 2,
            label: title
        },
        {
            data: data,
            backgroundColor: randomColor,
            borderColor: randomColor,
            borderWidth: 2,
            label: title
        },
        {
            data: data,
            backgroundColor: randomColor,
            borderColor: randomColor,
            borderWidth: 2,
            label: title
        },
        {
            data: data,
            backgroundColor: randomColor,
            borderColor: randomColor,
            borderWidth: 2,
            label: title
        }]
    };
    if (!devicesCharts[id]) {
        var ctx5 = document.getElementById(id).getContext('2d');
        devicesCharts[id] = new Chart(ctx5, {
            type: 'pie',
            data: pieChartData
        });
    } else {
        updateDevicesChartData(devicesCharts[id], pieChartData);
    }
    return devicesCharts[id];
};

//visitors map
handleVisitorsVectorMap = function (countries) {

    jQuery('#visitors-map').vectorMap({
        map: 'world_mill_en',
        scaleColors: ['#e74c3c', '#0071a4'],
        container: $('#visitors-map'),
        normalizeFunction: 'linear',
        hoverOpacity: 0.5,
        hoverColor: false,
        markerStyle: {
            initial: {
                fill: '#4cabc7',
                stroke: 'transparent',
                r: 3
            }
        },
        regions: [{
            attribute: 'fill'
        }],
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
        backgroundColor: '#2d353c',
        series: {
            regions: [{
                values: countries
            }]
        },
    });

};

    //stacked chart
    handleStackedAreaChart = function (data, id, byteformate = false) {

       var stackedAreaChartData = data;

       nv.addGraph(function () {
        var stackedAreaChart = nv.models.stackedAreaChart()
        .useInteractiveGuideline(true)
        .x(function (d) {
            return d[0]
        })
        .y(function (d) {
            return d[1]
        })
        .controlLabels({stacked: 'Stacked'})
        .showControls(false)
        .duration(300);

        stackedAreaChart.xAxis.tickFormat(function (d) {
            return d3.time.format("%H:%M %p")(new Date(d))
        });
        (byteformate) ? stackedAreaChart.yAxis.tickFormat(bytesToString) : "";

        d3.select('#' + id + '')
        .append('svg')
        .datum(stackedAreaChartData)
        .transition().duration(1000)
        .call(stackedAreaChart)
        .each('start', function () {
            setTimeout(function () {
                d3.selectAll('#' + id + ' *').each(function () {
                    if (this.__transition__)
                        this.__transition__.duration = 1;
                })
            }, 0)
        });

        nv.utils.windowResize(stackedAreaChart.update);

        return stackedAreaChart;
    });

   };


   getDeviceStatus = function (response) {
    if (response != 0) {
        status = 'active';
        return status
    } else {
        status = 'inactive';
        return status;
    }
};

devices.controller('DeviceController', function ($scope, $http, $interval) {

    var getSetIntervalID = getSetIntervalID === null ? '' : getSetIntervalID;

    $scope.url = [
    checkActiveDeviceViaAPIURL,
    getSetIntervalID
    ];

    $scope.timer = null;
    $scope.showDefaultStatus = true; // by default show true


    $scope.typeOptions = [ //
    {name: '30 Sec', value: '30000'}
    ];

    $scope.auto_refresh = $scope.typeOptions[0].value;

    // function to refresh default
    $scope.auto_repeat_in_devices = function (repeat_time) {

        var target = event.target || event.srcElement || event.currentTarget;
        var id  = target.offsetParent.id;

        if(id) {
            var widgets_data = JSON.parse(id); //parse
            var repeat = $('.'+widgets_data[0].uniqid).data('repeat'); //getter
            $scope.deviceCustomFunction(widgets_data, repeat, true);
        }

    };

    //get graph name and autofresh value on select function
    $scope.action_in_devices = function (auto_refresh) {

        var target = event.target || event.srcElement || event.currentTarget;
        var id = target.attributes.id;
        widgets_data = JSON.parse(id.nodeValue); //parse

        if (auto_refresh) {
            $scope.deviceCustomFunction(widgets_data, auto_refresh, true);
        }

    };

    //on load graph render on page
    $scope.deviceCustomFunction = function (widgets_data, auto_refresh = 30000, refresh = false) {

        $('.'+widgets_data[0].uniqid).attr('id', JSON.stringify(widgets_data)); //setter
        $('.'+widgets_data[0].uniqid).attr('data-repeat',auto_refresh); //setter

        Object.values(widgets_data).forEach(function (widget_data) {

            function_name = widget_data.function_name;
            $scope.getCustomFunction(function_name, widget_data);

            if (!refresh) {
                $scope.setInterval(widget_data, auto_refresh);
            } else {
                $scope.getSetIntervalID(widget_data, null, auto_refresh);
            }

        });


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

        var interval_url,
        graph_name = widget_data.function_name,
        interval_url = widget_data.interval_url != null ? widget_data.interval_url : $scope.url[1];

        if (interval_id == null) {
            interval_url = interval_url + '/' + graph_name;
        } else {
            interval_url = interval_url + '/' + graph_name + '/' + interval_id;
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

        switch (function_name) {

            //sentiloneone dashboard
            case 'total_unresolved_threats':
            case 'endpoints':
            $scope.dashboardData(widget_data.url, function_name);
            break;


            //JTSimSwap
            case 'is_swapped':
            $scope.is_swapped(widget_data);
            break;

            case 'msisdn_graph':
            $scope.msisdn_graph(widget_data);
            break;

            case 'malicious_from_email':
            $scope.malicious_from_email(widget_data);
            break;

            case 'malicious_IP':
            $scope.malicious_IP(widget_data);
            break;

            case 'visits_summary':
            $scope.visits_Summary(widget_data);
            break;

            case 'bandwidth_summary':
            $scope.bandwidth_summary(widget_data);
            break;

            case 'requests_summary':
            $scope.requests_summary(widget_data);
            break;

            case 'threats':
            $scope.threat(widget_data);
            break;

            default:

        }

    };

    $scope.checkActiveDeviceViaAPI = function (param) { // check via API call if the Device is active or Not

        statusDeviceCheck($scope, $http, param); // this function run on initialize

        $scope.timer = $interval(function () {
            statusDeviceCheck($scope, $http, param); //this function run on every 2 mint
        }, 120000); // Refresh Every 2 minute

    };


    /*
    CLOUDFLARE
    */

    // function to get zone analysis
    $scope.getZoneAnalysis = function (zone_data = {}, zone_id) {

        localStorage.removeItem('zone_analysis');
        localStorage.clear();

        if (zone_id != '') {

            $scope._data = 'Loading...';
            var old_data = JSON.parse(localStorage.getItem('zone_analysis'));

            $http({
                method: 'GET',
                url: zone_data.url + '/' + zone_id
            }).success(function (response) {
                if (response) {
                    if (typeof (Storage) !== "undefined") {
                        var zone_analysis = response;
                        localStorage.setItem('zone_analysis', JSON.stringify(response));

                        $scope.renderRequests($scope.renderSavedData());
                        $scope.renderBandwidth($scope.renderSavedData());
                        $scope.renderUniqueVisitors($scope.renderSavedData());
                        $scope.renderCountryRegions($scope.renderSavedData());
                        $scope.renderCountryRegionsGraphs($scope.renderSavedData());

                    } else {
                        $scope._data = 'Sorry, your browser does not support web storage...';
                    }

                } else {
                    $scope.renderRequests(false);
                }
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.taskDataCheck = 0;
            });


        } else {
            console.log('taskData request skipped');
        }


    };

    //get custom collapse data of zone analysis
    $scope.renderSavedData = function (tab) {

        var task_data = JSON.parse(localStorage.getItem('zone_analysis')); //saved data

        if (task_data) {

            return task_data;
        }

    }

    //render requests of zone
    $scope.renderRequests = function (zone_analysis_data) {

        $scope.total_requests = 0;
        $scope.total_cache = 0;
        $scope.total_uncached = 0;
        var data = [],
        values = [];

        if (zone_analysis_data) {

            $scope.total_requests = zone_analysis_data.totals.requests.all;
            $scope.total_cache = zone_analysis_data.totals.requests.cached;
            $scope.total_uncached = zone_analysis_data.totals.requests.uncached;

            var colors = [blue, aquaLight];
            var requiredValues = ['cached', 'uncached'];

            for (var j = 0; j < requiredValues.length; j++) {
                data.push({
                    key: requiredValues[j],
                    color: colors[j],
                    values: []
                });
            }

            Object.values(zone_analysis_data.timeseries).forEach(function (value) {

                Object.entries(value.requests).forEach(function (req) {

                    for (var j = 0; j < requiredValues.length; j++) {
                        if (req[0] == requiredValues[j]) {
                            data[j]['values'].push([(new Date(value.since)).getTime(), req[1]]);

                        }
                    }

                });

            });
            
            handleStackedAreaChart(data, 'request-chart');

        }
        ;

    }

    //render bandwidths of zone
    $scope.renderBandwidth = function (zone_analysis_data) {
        // var zone_analysis_data = $scope.renderSavedData();
        $scope.total_bandwidth = 0;
        $scope.total_cache_bandwidth = 0;
        $scope.total_uncached_bandwidth = 0;
        var data = [],
        values = [];

        var colors = [blue, aquaLight];
        var requiredValues = ['cached', 'uncached'];

        for (var j = 0; j < requiredValues.length; j++) {
            data.push({
                key: requiredValues[j],
                color: colors[j],
                values: []
            });
        }

        if (zone_analysis_data) {

            $scope.total_bandwidth = $scope.bytesToSize(zone_analysis_data.totals.bandwidth.all);
            $scope.total_cache_bandwidth = $scope.bytesToSize(zone_analysis_data.totals.bandwidth.cached);
            $scope.total_uncached_bandwidth = $scope.bytesToSize(zone_analysis_data.totals.bandwidth.uncached);

            Object.values(zone_analysis_data.timeseries).forEach(function (value) {

                Object.entries(value.bandwidth).forEach(function (req) {

                    for (var j = 0; j < requiredValues.length; j++) {
                        if (req[0] == requiredValues[j]) {
                            data[j]['values'].push([(new Date(value.until)).getTime(), req[1]]);

                        }
                    }

                });

            });
console.log('band width data >>', data)
            handleStackedAreaChart(data, 'bandwidth-chart', true)
        }

    }

    //render bandwidths of zone
    $scope.renderThreat = function (zone_analysis_data) {
        // var zone_analysis_data = $scope.renderSavedData();
        $scope.total_all = 0;
        $scope.total_bad_browser = 0;
        $scope.total_unclassified = 0;
        var data = [],
            values = [];

        var colors = [blue, aquaLight];
        var requiredValues = ['Unclassified', 'Bad browser'];

        // for (var j = 0; j < requiredValues.length; j++) {
        //     data.push({
        //         key: requiredValues[j],
        //         color: colors[j],
        //         values: []
        //     });
        // }

        if (zone_analysis_data) {

            $scope.total_all = zone_analysis_data.totals.threats.all;
            $scope.total_bad_browser = zone_analysis_data.totals.threats.type['bic.ban.unknown'];
            $scope.total_unclassified = parseInt(zone_analysis_data.totals.threats.all) - parseInt(zone_analysis_data.totals.threats.type['bic.ban.unknown']);

            _.each(requiredValues, (name, i) => {                
                var dataSeries = [];
                if (i == 0) {
                    _.each(zone_analysis_data.timeseries, (timesSeries) => {
                        const all = timesSeries.threats ? timesSeries.threats.all : 0;
                        const bad = timesSeries.threats && timesSeries.threats.type && timesSeries.threats.type['bic.ban.unknown'] ? timesSeries.threats.type['bic.ban.unknown'] : 0;
                        const unclassified = all - bad;
                        const date = new Date(timesSeries.until).getTime();
                        dataSeries.push([date, unclassified]);
                    })
                } else {
                    _.each(zone_analysis_data.timeseries, (timesSeries) => {
                        const bad = timesSeries.threats && timesSeries.threats.type && timesSeries.threats.type['bic.ban.unknown'] ? timesSeries.threats.type['bic.ban.unknown'] : 0;
                        const date = new Date(timesSeries.until).getTime();
                        dataSeries.push([date, bad]);
                    })
                }
                data.push({
                    key: name,
                    color: colors[i],
                    values: dataSeries
                })
            });
            handleStackedAreaChart(data, 'threats-chart', true)
        }

    }

    //render bandwidths of zone
    $scope.renderUniqueVisitors = function (zone_analysis_data) {

        $scope.total_unique_visitors = 0;
        $scope.max_unique_visitors = 0;
        $scope.min_unique_visitors = 0;
        var uniques_array = [],
        data = [],
        values = [];

        if (zone_analysis_data) {

            Object.values(zone_analysis_data.timeseries).forEach(function (value) {
                uniques_array.push(value.uniques.all);
            });

            $scope.total_unique_visitors = zone_analysis_data.totals.uniques.all;
            $scope.max_unique_visitors = Math.max.apply(Math, uniques_array);
            $scope.min_unique_visitors = Math.min.apply(Math, uniques_array);


            var colors = [blueLight];
            var requiredValues = ['Unique Visitors'];

            for (var j = 0; j < requiredValues.length; j++) {
                data.push({
                    key: requiredValues[j],
                    color: colors[j],
                    values: []
                });
            }

            Object.values(zone_analysis_data.timeseries).forEach(function (value) {

                Object.entries(value.uniques).forEach(function (req) {

                    for (var j = 0; j < requiredValues.length; j++) {
                        data[j]['values'].push([(new Date(value.since)).getTime(), req[1]]);
                    }

                });

            });
            // console.log("unique data", data);
            handleStackedAreaChart(data, 'unique-chart');

        };

    }

    //render renderCountryRegions of zone
    $scope.renderCountryRegions = function (zone_analysis_data) {

        var uniques_array = {};

        if (zone_analysis_data) {

            Object.entries(zone_analysis_data.totals.requests.country).sort().forEach(function (key, value) {
                uniques_array[$scope.getCountryName(key[0])] = key[1];
            });

            var total = Object.entries(uniques_array).length;
            $scope.getKeysWithHighestValue = getKeysWithHighestValue(uniques_array, total);


            $('.dataTable').DataTable({
                dom: 'lBfrtip',
                buttons: [
                {extend: 'copy', className: 'btn-sm'},
                {extend: 'csv', className: 'btn-sm'},
                {extend: 'excel', className: 'btn-sm'},
                {extend: 'pdf', className: 'btn-sm'},
                {extend: 'print', className: 'btn-sm'}
                ],
                "order": [[1, "desc"]],
                data: $scope.getKeysWithHighestValue,
                columns: [
                {title: "Country / Region"},
                {title: "Traffic"}
                ],
                responsive: true,
                autoFill: true,
                colReorder: true,
                keys: true,
                rowReorder: true,
                select: true
            });

        }
        ;

    }

    //render renderCountryRegions of zone
    $scope.renderCountryRegionsGraphs = function (zone_analysis_data) {

        var uniques_array = {},
        uniques_countries = {},
        country_count = '';

        if (zone_analysis_data) {

            Object.values(getKeysWithHighestValue(zone_analysis_data.totals.requests.country, 5)).sort().forEach(function (key, value) {
                uniques_array[key[0]] = '#00acac'; //key[1];
                country_count += '<span class="list-group-item list-group-item-inverse text-ellipsis">\
                <span class="badge badge-success"> ' + key[1] + '</span>' + $scope.getCountryName(key[0]) + '</span>';
            });

            $scope.showCountryCounts = country_count;

            handleVisitorsVectorMap(uniques_array);

        }
        ;

    }


    /*
    SentinelOne
    */


    // function to get Dashboard Data
    $scope.dashboardData = function (url, data_type) {

        if (url != '') {

            $scope._threats_title = $scope._agents_title = '<i class="fa fa-spinner fa-pulse">';
            $scope._threats_data = '';
            $scope._agents_data = '';

            $http({
                method: 'GET',
                url: url
            }).success(function (response) {

                if (typeof response.data != 'undefined') {

                    $scope._threats_title = $scope._agents_title = '';

                    switch (data_type) {
                        case 'total_unresolved_threats':
                        $scope._threats_data = response.data.threats.total;
                        break;

                        case 'endpoints':
                        $scope._agents_data = response.data.agents.total;
                        break;
                    }


                } else {
                    $scope._title = 'No data found';
                    $scope._threats_title = '';
                    $scope._agents_title = '';  
                    $scope._threats_data = 0;
                    $scope._agents_data = 0;
                }
            });


        } else {
            $scope._title = 'Url Not Found';
            $scope._threats_title = '';
            $scope._agents_title = '';
        }


    };

    // function to get Sentinelonerss
    $scope.getSentinelonerss = function (url) {

        if (url != '') {

            $scope._title = '<i class="fa fa-spinner fa-pulse">';

            $http({
                method: 'GET',
                url: url
            }).success(function (response) {

                if (Object.keys(response).length > 0) {

                    $scope._title = response.title;
                    $scope.sntloners_detail = response.published + ' by ' + response.author;
                    $scope.sntloners_read_more = '<a href="'+ response .link+'"  class="card-link"> Read More </a>';

                } else {
                    $scope._title = 'No data found';
                }
            });


        } else {
            $scope._title = 'Url Not Found';
        }


    };


    /*
    JTSIMSWAP
    */

    $scope.is_swappedProcessing = false;
    $scope.is_swapped = function (widget_data) {
        if (!$scope.is_swappedProcessing) {
            $scope.is_swappedProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {


                $scope._title = response._title;

                if (response.name != null) {
                    var graph_id = widget_data.function_name;
                    var graphFound = !!devicesCharts[graph_id];

                    var myPie = devicesPieFunction(graph_id, response.name, response.count, JSON.parse(response.percent));
                    if (!graphFound) {
                        $("#" + widget_data.function_name).click(function (evt) {

                            var activePoints = myPie.getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {
                                var baseUrl =
                                widget_data.getDeviceUrl + '/' + widget_data.function_name + '/' +
                                activePoints["0"]._view.label + '/' + null + '/' + response.set_time + '/' + widget_data.device_id;

                                window.location = baseUrl;
                            }

                        });
                    }


                }


                $scope.is_swappedProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.is_swappedProcessing = false;
            });
        } else {
            console.log('is_swapped request skipped');
        }
    };

    $scope.msisdn_graphProcessing = false;
    $scope.msisdn_graph = function (widget_data) {

        var labels = [];

        if (!$scope.msisdn_graphProcessing) {
            $scope.msisdn_graphProcessing = true;
            $scope._title_msisdn_graph = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._title_msisdn_graph = response._title;
                var colors = randomColor,
                count = 0;

                var barTrue = [];
                var barFalse = [];

                Object.entries(response.labels).forEach(function (labels_key) {

                    labels.push(labels_key[0]);

                    var ts = labels_key[1]['true'] ? labels_key[1]['true'] : 0;
                    barTrue.push(ts);

                    var fs = labels_key[1]['false'] ? labels_key[1]['false'] : 0;
                    barFalse.push(fs);

                });


                var barChartData = {
                    labels: labels,
                    datasets: [{
                        label: 'true',
                        borderWidth: 2,
                        borderColor: randomColor[0],
                        backgroundColor: randomColor[0],
                        data: barTrue
                    }, {
                        label: 'false',
                        borderWidth: 2,
                        borderColor: randomColor[1],
                        backgroundColor: randomColor[1],
                        data: barFalse
                    }]
                };
                var graph_id = widget_data.function_name;
                if (!devicesCharts[graph_id]) {
                    var ctx2 = document.getElementById(graph_id).getContext('2d');
                    devicesCharts[graph_id] = new Chart(ctx2, {
                        type: 'bar',
                        data: barChartData
                    });

                    $("#" + widget_data.function_name).click(function (evt) {

                        var activePoints = devicesCharts[graph_id].getElementAtEvent(evt);
                        if (activePoints["0"]._view.datasetLabel != 'undefined') {

                            var baseUrl =
                            widget_data.getDeviceUrl + '/' + widget_data.function_name + '/' + activePoints["0"]._view.label + '/' +
                            activePoints["0"]._view.datasetLabel + '/' + response.set_time + '/' + widget_data.device_id;

                            window.location = baseUrl;
                        }

                    });
                } else {
                    updateDevicesChartData(devicesCharts[graph_id], barChartData)
                }


                $scope.msisdn_graphProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.msisdn_graphProcessing = false;
            });
        } else {
            console.log('msisdn_graph request skipped');
        }
    };

    $scope.malicious_IPProcessing = false;
    $scope.malicious_IP = function (widget_data) {
        console.log(widget_data);
        if (!$scope.malicious_IPProcessing) {
            $scope.malicious_IPProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {
                if (response) {

                    $scope._label = response._title;
                    $scope._label_titles = response.labels.title;
                    $scope._count = response.labels.counts;
                    $scope._title = 'Top Malicious IP with respect to data count ';
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


                    var graph_id ='malicious_IP';

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
                           return;
                        });

                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }

                } else {
                    $scope._title = 'NO Data found';
                }
                $scope.malicious_IPProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.malicious_IPProcessing = false;
            });
        } else {
            console.log('Malicious IP request skipped');
        }
    };
    $scope.visits_SummaryProcessing = false;
    $scope.visits_Summary = function (widget_data) {
        if (!$scope.visits_SummaryProcessing) {
            $scope.visits_SummaryProcessing = true;
            $scope._visits_label = 'Loading...';
                $http({
                    method: 'GET',
                    url: widget_data.url
                }).success(function (response) {
                    if (response) {
                        if (typeof (Storage) !== "undefined") {
                            $("#unique-chart").html("");
                            var html = "";
                            var zoneLists = response.zoneList;
                            localStorage.setItem('zone_analysis', JSON.stringify(response.response));
                            localStorage.setItem('zone_url', widget_data.url);
                            $scope.renderUniqueVisitors($scope.renderSavedData());
                            $scope._visits_label = 'Unique Visitors';
                            $("#cloud_flare_zones").html("");
                            zoneLists.forEach(function (zoneList) {
                                html += "<option value='" + zoneList.id + "'>" + zoneList.name + "</option>";
                            });
                            $("#cloud_flare_zones").html(html);
                        } else {
                            $scope._data = 'Sorry, your browser does not support web storage...';
                        }

                    } else {
                        $scope.renderRequests(false);
                    }
                    $scope.visits_SummaryProcessing = false;

                }).error(function (err) {
                    console.log('errr >> ');
                    console.log(err);
                    $scope.visits_SummaryProcessing = false;
                });
        } else {
            console.log('Visits Summary request skipped');
        }
    };

    $scope.bandwidth_summaryProcessing = false;
    $scope.bandwidth_summary = function (widget_data) {
        if (!$scope.bandwidth_summaryProcessing) {
            $scope.bandwidth_summaryProcessing = true;

            $scope._bandwidth_label = 'Loading...';
                $http({
                    method: 'GET',
                    url: widget_data.url
                }).success(function (response) {
                    if (response) {
                        if (typeof (Storage) !== "undefined") {
                            $("#bandwidth-chart").html("");
                            localStorage.setItem('zone_analysis', JSON.stringify(response.response));
                            $scope.renderBandwidth($scope.renderSavedData());
                            $scope._bandwidth_label = 'Band Width';
                        } else {
                            $scope._data = 'Sorry, your browser does not support web storage...';
                        }

                    } else {
                        $scope.renderRequests(false);
                    }
                    $scope.bandwidth_summaryProcessing = false;

                }).error(function (err) {
                    console.log('errr >> ');
                    console.log(err);
                    $scope.bandwidth_summaryProcessing = false;
                });
        } else {
            console.log('Band Width request skipped');
        }
    };

    $scope.threatProcessing = false;
    $scope.threat = function (widget_data) {
        if (!$scope.threatProcessing) {
            $scope.threatProcessing = true;

            $scope._threat_label = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {
                if (response) {
                    if (typeof (Storage) !== "undefined") {
                        console.log(' in success', response.response)
                        $("#threats-chart").html("");

                        localStorage.setItem('zone_analysis', (response.response ? JSON.stringify(response.response) : null));
                        $scope.renderThreat($scope.renderSavedData());
                        $scope._threat_label = 'Threats';
                    } else {
                        $scope._data = 'Sorry, your browser does not support web storage...';
                    }

                } else {
                    $scope.renderRequests(false);
                }
                $scope.threatProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.threatProcessing = false;
            });
        } else {
            console.log('Threats request skipped');
        }
    };

    $scope.requests_summaryProcessing = false;
    $scope.requests_summary = function (widget_data) {
        if (!$scope.requests_summaryProcessing) {
            $scope.requests_summaryProcessing = true;

            $scope._request_title = 'Loading...';
                $http({
                    method: 'GET',
                    url: widget_data.url
                }).success(function (response) {
                    if (response) {
                        if (typeof (Storage) !== "undefined") {
                            $("#request-chart").html("");
                            localStorage.setItem('zone_analysis', JSON.stringify(response.response));
                            $scope.renderRequests($scope.renderSavedData());
                            $scope._request_title = 'Request Summary';
                        } else {
                            $scope._data = 'Sorry, your browser does not support web storage...';
                        }

                    } else {
                        $scope.renderRequests(false);
                    }
                    $scope.requests_summaryProcessing = false;

                }).error(function (err) {
                    console.log('errr >> ');
                    console.log(err);
                    $scope.requests_summaryProcessing = false;
                });
        } else {
            console.log('Request Summary request skipped');
        }
    };

    $scope.malicious_from_emailProcessing = false;
    $scope.malicious_from_email = function (widget_data) {
        if (!$scope.malicious_from_emailProcessing) {
            $scope.malicious_from_emailProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {
                if (response) {

                    $scope._label = response._title;
                    $scope._label_titles = response.labels.title;
                    $scope._count = response.labels.counts;
                    $scope._title = 'Top Malicious email with respect to data count ';
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


                    var graph_id ='malicious_from_email';

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
                            return;
                        });

                    } else {
                        updateLoggerChartData(loggerCharts[graph_id], barChartData);
                    }

                } else {
                    scope._title = 'NO Data found';
                }
                $scope.malicious_from_emailProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.malicious_from_emailProcessing = false;
            });
        } else {
            console.log('Malicious Email request skipped');
        }
    };

    $scope.getZoneData = function(zone_id) {
        var widget_url = localStorage.getItem('zone_url')+'/'+zone_id.zones;
        $http({
            method: 'GET',
            url: widget_url
        }).success(function (response) {
            if (response) {
                $("#unique-chart").html("");
                $scope.renderUniqueVisitors($scope.renderSavedData());
            } else {
                $scope.renderRequests(false);
            }
        }).error(function (err) {
            console.log(" >>>error in zoneData Function",err);
        });
    };
    /*
    Helpers functions
    */

    //sort with values
    function getKeysWithHighestValue(o, n = null) {
        var keys = Object.entries(o);
        keys.sort(function (a, b) {
            return b[1] - a[1];
        })
        return keys.slice(0, n);
    }

    //convert bytes to megabytes
    $scope.bytesToSize = function (num) {
        var neg = num < 0;

        var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        if (neg) {
            num = -num;
        }

        if (num < 1) {
            return (neg ? '-' : '') + num + ' B';
        }

        var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);

        num = Number((num / Math.pow(1000, exponent)).toFixed(2));

        var unit = units[exponent];

        return (neg ? '-' : '') + num + ' ' + unit;
    }

    //get country name by code
    $scope.getCountryName = function (countryCode) {
        if (isoCountries.hasOwnProperty(countryCode)) {
            return isoCountries[countryCode];
        } else {
            return countryCode;
        }
    }


    $scope.toObject = function (arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i)
            rv[i] = arr[i];
        return rv;
    }

    $scope.resizeWindow = function () {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 500);

    }


});

var statusDeviceCheck = function ($scope, $http, param) {

    $http({
        method: 'GET',
        url: $scope.url[0],
        params: {type: param.device_type, device_id: param.device_id},
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


devices.filter('trustAsHtml', ['$sce', function ($sce) {

    return function (text) {

        return $sce.trustAsHtml(text);

    };

}]);


var isoCountries = {
    'AF': 'Afghanistan',
    'AX': 'Aland Islands',
    'AL': 'Albania',
    'DZ': 'Algeria',
    'AS': 'American Samoa',
    'AD': 'Andorra',
    'AO': 'Angola',
    'AI': 'Anguilla',
    'AQ': 'Antarctica',
    'AG': 'Antigua And Barbuda',
    'AR': 'Argentina',
    'AM': 'Armenia',
    'AW': 'Aruba',
    'AU': 'Australia',
    'AT': 'Austria',
    'AZ': 'Azerbaijan',
    'BS': 'Bahamas',
    'BH': 'Bahrain',
    'BD': 'Bangladesh',
    'BB': 'Barbados',
    'BY': 'Belarus',
    'BE': 'Belgium',
    'BZ': 'Belize',
    'BJ': 'Benin',
    'BM': 'Bermuda',
    'BT': 'Bhutan',
    'BO': 'Bolivia',
    'BA': 'Bosnia And Herzegovina',
    'BW': 'Botswana',
    'BV': 'Bouvet Island',
    'BR': 'Brazil',
    'IO': 'British Indian Ocean Territory',
    'BN': 'Brunei Darussalam',
    'BG': 'Bulgaria',
    'BF': 'Burkina Faso',
    'BI': 'Burundi',
    'KH': 'Cambodia',
    'CM': 'Cameroon',
    'CA': 'Canada',
    'CV': 'Cape Verde',
    'KY': 'Cayman Islands',
    'CF': 'Central African Republic',
    'TD': 'Chad',
    'CL': 'Chile',
    'CN': 'China',
    'CX': 'Christmas Island',
    'CC': 'Cocos (Keeling) Islands',
    'CO': 'Colombia',
    'KM': 'Comoros',
    'CG': 'Congo',
    'CD': 'Congo, Democratic Republic',
    'CK': 'Cook Islands',
    'CR': 'Costa Rica',
    'CI': 'Cote D\'Ivoire',
    'HR': 'Croatia',
    'CU': 'Cuba',
    'CY': 'Cyprus',
    'CZ': 'Czech Republic',
    'DK': 'Denmark',
    'DJ': 'Djibouti',
    'DM': 'Dominica',
    'DO': 'Dominican Republic',
    'EC': 'Ecuador',
    'EG': 'Egypt',
    'SV': 'El Salvador',
    'GQ': 'Equatorial Guinea',
    'ER': 'Eritrea',
    'EE': 'Estonia',
    'ET': 'Ethiopia',
    'FK': 'Falkland Islands (Malvinas)',
    'FO': 'Faroe Islands',
    'FJ': 'Fiji',
    'FI': 'Finland',
    'FR': 'France',
    'GF': 'French Guiana',
    'PF': 'French Polynesia',
    'TF': 'French Southern Territories',
    'GA': 'Gabon',
    'GM': 'Gambia',
    'GE': 'Georgia',
    'DE': 'Germany',
    'GH': 'Ghana',
    'GI': 'Gibraltar',
    'GR': 'Greece',
    'GL': 'Greenland',
    'GD': 'Grenada',
    'GP': 'Guadeloupe',
    'GU': 'Guam',
    'GT': 'Guatemala',
    'GG': 'Guernsey',
    'GN': 'Guinea',
    'GW': 'Guinea-Bissau',
    'GY': 'Guyana',
    'HT': 'Haiti',
    'HM': 'Heard Island & Mcdonald Islands',
    'VA': 'Holy See (Vatican City State)',
    'HN': 'Honduras',
    'HK': 'Hong Kong',
    'HU': 'Hungary',
    'IS': 'Iceland',
    'IN': 'India',
    'ID': 'Indonesia',
    'IR': 'Iran, Islamic Republic Of',
    'IQ': 'Iraq',
    'IE': 'Ireland',
    'IM': 'Isle Of Man',
    'IL': 'Israel',
    'IT': 'Italy',
    'JM': 'Jamaica',
    'JP': 'Japan',
    'JE': 'Jersey',
    'JO': 'Jordan',
    'KZ': 'Kazakhstan',
    'KE': 'Kenya',
    'KI': 'Kiribati',
    'KR': 'Korea',
    'KW': 'Kuwait',
    'KG': 'Kyrgyzstan',
    'LA': 'Lao People\'s Democratic Republic',
    'LV': 'Latvia',
    'LB': 'Lebanon',
    'LS': 'Lesotho',
    'LR': 'Liberia',
    'LY': 'Libyan Arab Jamahiriya',
    'LI': 'Liechtenstein',
    'LT': 'Lithuania',
    'LU': 'Luxembourg',
    'MO': 'Macao',
    'MK': 'Macedonia',
    'MG': 'Madagascar',
    'MW': 'Malawi',
    'MY': 'Malaysia',
    'MV': 'Maldives',
    'ML': 'Mali',
    'MT': 'Malta',
    'MH': 'Marshall Islands',
    'MQ': 'Martinique',
    'MR': 'Mauritania',
    'MU': 'Mauritius',
    'YT': 'Mayotte',
    'MX': 'Mexico',
    'FM': 'Micronesia, Federated States Of',
    'MD': 'Moldova',
    'MC': 'Monaco',
    'MN': 'Mongolia',
    'ME': 'Montenegro',
    'MS': 'Montserrat',
    'MA': 'Morocco',
    'MZ': 'Mozambique',
    'MM': 'Myanmar',
    'NA': 'Namibia',
    'NR': 'Nauru',
    'NP': 'Nepal',
    'NL': 'Netherlands',
    'AN': 'Netherlands Antilles',
    'NC': 'New Caledonia',
    'NZ': 'New Zealand',
    'NI': 'Nicaragua',
    'NE': 'Niger',
    'NG': 'Nigeria',
    'NU': 'Niue',
    'NF': 'Norfolk Island',
    'MP': 'Northern Mariana Islands',
    'NO': 'Norway',
    'OM': 'Oman',
    'PK': 'Pakistan',
    'PW': 'Palau',
    'PS': 'Palestinian Territory, Occupied',
    'PA': 'Panama',
    'PG': 'Papua New Guinea',
    'PY': 'Paraguay',
    'PE': 'Peru',
    'PH': 'Philippines',
    'PN': 'Pitcairn',
    'PL': 'Poland',
    'PT': 'Portugal',
    'PR': 'Puerto Rico',
    'QA': 'Qatar',
    'RE': 'Reunion',
    'RO': 'Romania',
    'RU': 'Russian Federation',
    'RW': 'Rwanda',
    'BL': 'Saint Barthelemy',
    'SH': 'Saint Helena',
    'KN': 'Saint Kitts And Nevis',
    'LC': 'Saint Lucia',
    'MF': 'Saint Martin',
    'PM': 'Saint Pierre And Miquelon',
    'VC': 'Saint Vincent And Grenadines',
    'WS': 'Samoa',
    'SM': 'San Marino',
    'ST': 'Sao Tome And Principe',
    'SA': 'Saudi Arabia',
    'SN': 'Senegal',
    'RS': 'Serbia',
    'SC': 'Seychelles',
    'SL': 'Sierra Leone',
    'SG': 'Singapore',
    'SK': 'Slovakia',
    'SI': 'Slovenia',
    'SB': 'Solomon Islands',
    'SO': 'Somalia',
    'ZA': 'South Africa',
    'GS': 'South Georgia And Sandwich Isl.',
    'ES': 'Spain',
    'LK': 'Sri Lanka',
    'SD': 'Sudan',
    'SR': 'Suriname',
    'SJ': 'Svalbard And Jan Mayen',
    'SZ': 'Swaziland',
    'SE': 'Sweden',
    'CH': 'Switzerland',
    'SY': 'Syrian Arab Republic',
    'TW': 'Taiwan',
    'TJ': 'Tajikistan',
    'TZ': 'Tanzania',
    'TH': 'Thailand',
    'TL': 'Timor-Leste',
    'TG': 'Togo',
    'TK': 'Tokelau',
    'TO': 'Tonga',
    'TT': 'Trinidad And Tobago',
    'TN': 'Tunisia',
    'TR': 'Turkey',
    'TM': 'Turkmenistan',
    'TC': 'Turks And Caicos Islands',
    'TV': 'Tuvalu',
    'UG': 'Uganda',
    'UA': 'Ukraine',
    'AE': 'United Arab Emirates',
    'GB': 'United Kingdom',
    'US': 'United States',
    'UM': 'United States Outlying Islands',
    'UY': 'Uruguay',
    'UZ': 'Uzbekistan',
    'VU': 'Vanuatu',
    'VE': 'Venezuela',
    'VN': 'Viet Nam',
    'VG': 'Virgin Islands, British',
    'VI': 'Virgin Islands, U.S.',
    'WF': 'Wallis And Futuna',
    'EH': 'Western Sahara',
    'YE': 'Yemen',
    'ZM': 'Zambia',
    'ZW': 'Zimbabwe'
};

function resizeDevicesCharts() {
    for (var key in loggerCharts) {
        if (loggerCharts.hasOwnProperty(key)) {
            loggerCharts[key].resize();

        }
    }
};

$(document).on('click', '[data-click=panel-expand]', function (e) {
    setTimeout(function () {
        resizeDevicesCharts();
    }, 200);

});
