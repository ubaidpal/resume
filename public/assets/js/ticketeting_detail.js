/**
 * Created by   :  Ubaid Pal
 * Project Name : BlockAPT
 * Product Name : PhpStorm
 * Date         : 12/31/2019 6:52 PM
 * File Name    : ticketeting_detail.js
 */
var Ticketing = angular.module('Ticketing', []),

    white = 'rgba(255,255,255,1.0)',
    fillBlue = 'rgba(52, 143, 226, 0.6)',
    strokeBlue = 'rgba(52, 143, 226, 0.8)',
    fillPurpleLight = 'rgba(114, 124, 182, 0.2)',
    strokePurple = 'rgba(114, 124, 182, 0.8)',
    green = '#00acac',
    blue = '#348fe2',
    barChart = null,
    ctx2 = '',
    barChartData = [],
    ticketsCharts = [],
    randomColor = randomHues(256, 0.8);

function updateTicketChartData(chart, data) {

    chart.data.labels = data.labels;
    chart.data.datasets = data.datasets;
    chart.update();
};

function ticketsPieFunction(id, title, label, data) {

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
            }
        ]
    };
    if (!ticketsCharts[id]) {
        var ctx5 = document.getElementById(id).getContext('2d');
        ticketsCharts[id] = new Chart(ctx5, {
            type: 'pie',
            data: pieChartData
        });
    } else {
        updateTicketChartData(ticketsCharts[id], pieChartData);
    }
    return ticketsCharts[id];
};

function randomHues(n, opacity) {
    var res = [];
    for (var i = 0; i < n; i++)
        res.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ', ' + opacity + ')')
    return res;
};

Ticketing.controller('TicketsController', function ($scope, $http, $interval) {

    $scope.IsVisible = false;


    $scope.timer = null;
    $scope.showDefaultStatus = true; // by default show true


    $scope.typeOptions = [ //
        {name: '30 Sec', value: '30000'}
    ];

    $scope.auto_refresh = $scope.typeOptions[0].value;

    //get graph name and autofresh value on select function 
    $scope.action_in_tickets = function (auto_refresh) {

        var target = event.target || event.srcElement || event.currentTarget;
        var id = target.attributes.id;
        function_name = id.nodeValue; //get graph id so can integrate specific graph on refresh time
        if (auto_refresh) {
            $scope.TicketCustomFunction(function_name, auto_refresh, true);
        }

    };

    //on load graph render on page
    $scope.TicketCustomFunction = function (widget_data, auto_refresh = 30000, refresh = false) {

        widget_data = JSON.parse(widget_data); //parse
        function_name = widget_data.function_name;
        $scope.getCustomFunction(function_name, widget_data);


        if (!refresh) {
            $scope.setInterval(widget_data, auto_refresh);
        } else {
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
            graph_name = widget_data.function_name;

        if (interval_id == null) {
            interval_url = getSetIntervalID + '/' + graph_name;
        } else {
            interval_url = getSetIntervalID + '/' + graph_name + '/' + interval_id;
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

            case 'TicketsStatus':
                $scope.TicketsStatus(widget_data);
                break;
            case 'TicketsUsers':
                $scope.TicketsUsers(widget_data);
                break;

            case 'TicketsUpdateStatus':
                $scope.TicketsUpdateStatus(widget_data);
                break;

        }

    };


    /*  
    Stats Tabs
    */

    //get custom collapse data
    $scope.ticketCounts = function () {

        $http({
            method: 'GET',
            url: "/" + userName + '/tickets/ticketCounts'
        }).success(function (response) {

            $scope._total = response._total;
            $scope._open = response._open;
            $scope._closed = response._closed;
            $scope._pending = response._pending;

        }).error(function (err) {

            $scope._total = 0;
            $scope._open = 0;
            $scope._closed = 0;
            $scope._pending = 0;

        });

    }

    /*
     * Render Graph of Ticket Status 
     */
    $scope.ticketsStatusProcessing = false;
    $scope.TicketsStatus = function (widget_data) {
        if (!$scope.ticketsStatusProcessing) {
            $scope.ticketsStatusProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._title = response._title;

                if (response.name != null) {
                    var graph_id = widget_data.function_name;
                    var graphFound = !!ticketsCharts[graph_id];

                    var myPie = ticketsPieFunction(graph_id, response.name, response.count, response.count);
                    if (!graphFound) {
                        $("#" + widget_data.function_name).click(function (evt) {

                            var activePoints = myPie.getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {
                                var baseUrl =
                                    widget_data.getTicketUrl + '?get_status=' + activePoints["0"]._view.label;
                                window.location = baseUrl;
                            }

                        });
                    }


                }


                $scope.ticketsStatusProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.ticketsStatusProcessing = false;
            });
        } else {
            console.log('ticketsStatus request skipped');
        }
    };

    /*
     * Render Graph of ticket users or assignees 
     */

    $scope.TicketsUsersGraphProcessing = false;
    $scope.TicketsUsers = function (widget_data) {


        if (!$scope.TicketsUsersGraphProcessing) {
            $scope.TicketsUsersGraphProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {

                $scope._title = response._title;

                if (response._label_titles != null) {

                    $scope._label_titles = response._label_titles;
                    $scope._count = JSON.parse(response.count);
                    $scope._title = response._title;

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

                    var graph_id = widget_data.function_name;

                    barChartData = {
                        labels: $scope._label_titles,
                        datasets: datasets
                    };
                    if (!ticketsCharts[graph_id]) {
                        var ctx2 = document.getElementById(graph_id).getContext('2d');
                        ticketsCharts[graph_id] = new Chart(ctx2, {
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
                            var activePoints = ticketsCharts[graph_id].getElementAtEvent(evt);
                            if (activePoints["0"]._view.label != 'undefined') {

                                var baseUrl = widget_data.getTicketUrl + '?user=' + activePoints["0"]._view.label;
                                window.open(baseUrl);
                            }
                        });
                    } else {
                        updateTicketChartData(ticketsCharts[graph_id], barChartData);
                    }

                    $scope.TicketsUsersGraphProcessing = false;

                }

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TicketsUsersGraphProcessing = false;

            });
        } else {
            console.log('TicketsUsersGraph request skipped');
        }

    };

    /*
     * Render Graph of Ticket update status 
     */

    $scope.TicketsUpdateStatusProcessing = false;
    $scope.TicketsUpdateStatus = function (widget_data) {
        if (!$scope.TicketsUpdateStatusProcessing) {
            $scope.TicketsUpdateStatusProcessing = true;

            $scope._title = 'Loading...';

            $http({
                method: 'GET',
                url: widget_data.url
            }).success(function (response) {
                $scope._title = response._title;
                if (response) {
                    $('#TicketsUpdateStatus').html(response.tickets_update);
                }

                $scope.TicketsUpdateStatusProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TicketsUpdateStatusProcessing = false;

            });
        } else {
            console.log('TicketsUpdateStatus request skipped');
        }
    };


    // function to get splunk country attack from the splunk api
    $scope.taskData = function (ticket_id) {

        localStorage.removeItem('task_data');
        localStorage.clear();

        if (ticket_id != 0) {

            $scope._data = 'Loading...';
            var old_data = JSON.parse(localStorage.getItem('task_data'));

            $http({
                method: 'GET',
                url: systemsArtefactUrl + '/' + ticket_id
            }).success(function (response) {
                if (response) {
                    if (typeof (Storage) !== "undefined") {
                        var task_data = response;
                        localStorage.setItem('task_data', JSON.stringify(response));
                    } else {
                        $scope._data = 'Sorry, your browser does not support web storage...';
                    }

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

    //get custom collapse data
    $scope.renderSavedData = function (tab) {

        var task_data = JSON.parse(localStorage.getItem('task_data')); //saved data

        if (task_data) {

            return task_data;
        }

    }


    /*
        
    Analysis Tabs

    */

    //render analysis on click panel
    $scope.onClickRenderAnalysis = function () {

        $scope._data = 'Loading...';

        var task = $scope.renderSavedData(),
            playbook_logs, url, html = '';

        if (task) {

            if (task.task_type != undefined) {
                if (task.task_type[0] && task.task_type[0].play_books) {
                    var type_ids = task.task_type.map(elem => elem.playbook_id).join(',');
                    type = 'playbook';
                    url = getAnalysis + '/playbook/' + task.id + '/' + type_ids;

                } else {
                    type = 'task';
                    url = getAnalysis + '/task/' + task.id;

                }
            } else {
                type = 'task';
                url = getAnalysis + '/task/' + task.id;
            }

            $scope.getAnalysisLogs(url, type);

        } else {

            $scope._data = 'Something Went Wrong!!';

        }

    }

    //get response of any url
    $scope.getAnalysisLogs = function (url, type) {
        $http({
            method: 'GET',
            url: url
        }).success(function (response) {

            if (Object.keys(response).length > 0) {
                switch (type) {

                    case 'playbook':
                        $scope._data = $scope.getAnalysis(response.type);
                        $scope.getAnalysisGraph(response);

                        break;

                    default:
                        $scope._data = $scope.getAnalysis(response);
                        break;
                }

            } else {

                $scope._data = 'No Analysis Found ';
            }

            return $scope._data;
        });

    }
    console.log("asasas");

    //get 15 minutes analysis 
    $scope.getAnalysis = function (analysis) {
        var table_start = '',
            table_tr = '',
            table_end = '',
            html = ''; //defaults

        if (analysis && analysis.logs != null) {
            html += '<div class="analysis-data"><table class="table table-stripped">';
            html += '<tr>';
            html += '<th>Execution Time</th>';
            html += '<th>Analysis</th>';
            html += '</tr>';

            analysis.logs.forEach(function (log) {
                if (log.status) {
                    html += '<tr>';
                } else {
                    html += '<tr class="danger">';
                }
                html += '<td>' + log.created_at.date + '</td>';
                html += '<td>' + log.message + '</td>';
                html += '</tr>';
            });
            html += '</table></div>';
        } else {


            table_start = '';
            
            if (analysis) {
                table_start += '<table class="table table-profile display"><thead><tr><th></th><th><h4></h4></th></tr></thead><tbody>';
                Object.keys(analysis).forEach(function (log_key) {
                    table_tr += '<tr><td>' + analysis[log_key] + '</td><tr>';
                });
                table_end = '</tbody></table>';

            }
            

            html = table_start + table_tr + table_end;

            return html;
        }

        return html;

    }


    $scope.analysisChart = null;
    $scope._title = "Ticket Analysis";
    //analysis graph
    $scope.getAnalysisGraph = function (response) {

        $scope.IsVisible = true;
        var datasets = [];

        if (typeof response.labels == "string") {
            $scope.labels = JSON.parse(response.labels);
            $scope.count = JSON.parse(response.count);
        } else {
            $scope.labels = response.labels.title;
            $scope.count = response.labels.counts;
        }

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

        var ctx2 = document.getElementById('analysis_graph').getContext('2d');
        if (!$scope.analysisChart) {

            $scope.analysisChart = new Chart(ctx2, {
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
            $scope.analysisChart.data.labels = barChartData.labels;
            $scope.analysisChart.data.datasets = barChartData.datasets;
            $scope.analysisChart.update();
        }

    }

    /*
        
    Artifacts and Digital Assets
                
    */

    //render artifacts 
    $scope.onClickRenderArtifact = function () {
        $scope._data = 'Loading...'; //default loading
        var task = $scope.renderSavedData(),
            html = '';

        if (task.task_type != undefined) {

            if (Object.keys(task.task_type).length > 0) {

                task.task_type.forEach(function (task_type) { //task type

                    if (task_type.play_books) {
                        html += $scope.rendorDigitalAssetsPlaybooks(task_type.play_books);
                    } else {
                        html = $scope.rendorDigitalAssets(task.task_type, task.type);
                    }
                });

                $scope._data = html;

            } else {

                $scope._data = 'No Digital Assets Found';
            }
            return $scope._data;
        } else {
            $scope._data = 'No Assets Artifacts Found ';
            return $scope._data;
        }


    }

    //rendor digital assets
    $scope.rendorDigitalAssets = function (assets, type) {

        var html = '',
            dl_start = '',
            dl_end = '',
            device = '',
            ssh_meta = '',
            ssh_meta_list = '',
            meta = '',
            meta_list = '',
            meta_json,
            sshmeta = {};

        if (assets && Object.keys(assets).length < 2) {

            assets = assets[0];
            device = '<dt>Device</dt><dd>' + $scope.getCustomUrl('devices_ids', assets.device_id) + '</dd>';

            if (assets.ssh_meta) {

                sshmeta = JSON.parse(assets.ssh_meta);
                Object.keys(sshmeta).forEach(function (log_key) {
                    ssh_meta_list += '<li>' + sshmeta[log_key] + '</li>';
                });

                meta += "<dt>SSH Scripts</dt> <dd><ul>" + ssh_meta_list + "</ul></dd></tr>";
            }

            if (assets.meta) {

                meta_json = JSON.parse(assets.meta);

                switch (type) {

                    case "Cloud Devices":

                        Object.entries(meta_json).forEach(function (meta_key) {
                            meta += "<dt>" + meta_key[0].toString().replace('_', ' ').toUpperCase() + "</dt> <dd><ul>" + meta_key[1] + "</ul></dd></tr>"
                        });

                        break;

                    default:

                        if (meta_json.certs) {
                            meta_list += '<ul>';
                            meta_json.certs.forEach(function (cert) {
                                meta_list += '<li>' + cert + '</li>';
                            });
                            meta_list += '</ul>';
                        }

                        meta += "<dt>Certificates</dt> <dd><ul>" + meta_list + "</ul></dd></tr>"

                        break;
                }


            }

        } else {
            device += '<dt>Migration From</dt><dd>' + $scope.getCustomUrl('devices_ids', assets[0].device_id) + '</dd>';
            device += '<dt>Migration To</dt><dd>' + $scope.getCustomUrl('devices_ids', assets[1].device_id) + '</dd>';
        }

        dl_start += '<dl class="dl-horizontal">';


        dl_end += "\
        " + device + meta + "\
        </dl>";

        html = dl_start + dl_end;

        return html;
    }

    //rendor playbooks
    $scope.rendorDigitalAssetsPlaybooks = function (playbook) {

        var html = '',
            dl_start = '',
            dl_end = '',
            src = '',
            pivot = '',
            ports = [],
            port = '',
            port_list = '',
            threshold = 'N/A',
            action = '',
            assets = [];

        dl_start += '<h4 style="text-align: center;">Playbook: ' + $scope.getCustomUrl('playbook', playbook.name, playbook.id, 'playbook') + '</h4>\
        <dl class="dl-horizontal">';

        if (playbook.user_play_book[0]) {
            pb = playbook.user_play_book[0];

            var params = JSON.parse(pb.params);

            if (params.pivot) {
                pivot = '<dt>Pivot</dt><dd>' + params.pivot + '</dd>';
            }

            src = $scope.capitalizeString(params.src);
            threshold = params.ip_percentage;

            if (params.port) {

                ports = params.port.split(','); //split ports 

                ports.forEach(function (p) {
                    port_list += '<li>' + $scope.getCustomUrl('tcpRoutes', p) + '</li>';
                });

                port += '<dt>Ports</dt><dd><ul>' + port_list + '</ul></dd>';

            }

        }
        if (playbook && playbook.user_play_book) {
            if (Array.isArray(playbook.user_play_book)) {
                playbook.user_play_book.forEach(function (pb) {

                    var params = JSON.parse(pb.params); // params

                    var list = "";
                    pb.actions.forEach(function (pb_action) {
                        var action = JSON.parse(pb_action.action);
                        switch (action.action) {
                            case "email":
                                list = "<li>" + $scope.capitalizeString(action.action) + " To " + $scope.capitalizeString(action.email) + "</li>";
                                break;
                            case "block":
                                assets.push($scope.getCustomUrl('devices', action.action_in, pb_action.device_id));
                                list += "<li>" + $scope.getCustomUrl('devices', $scope.capitalizeString(action.action_in), pb_action.device_id) + "</li>";
                                break;
                            case "notification":
                                // list += "<li>" + $scope.capitalizeString(action.action) + "</li>";
                                break;
                        }
                    });
                    action += list;
                });
            } else {
                var list = "",
                    pb = playbook.user_play_book;
                pb.actions.forEach(function (pb_action) {
                    var action = JSON.parse(pb_action.action);
                    switch (action.action) {
                        case "email":
                            list = "<li>" + $scope.capitalizeString(action.action) + " To " + $scope.capitalizeString(action.email) + "</li>";
                            break;
                        case "block":
                            assets.push($scope.getCustomUrl('devices', action.action_in, pb_action.device_id));
                            list += "<li>" + $scope.getCustomUrl('devices', $scope.capitalizeString(action.action_in), pb_action.device_id) + "</li>";
                            break;
                        case "notification":
                            // list += "<li>" + $scope.capitalizeString(action.action) + "</li>";
                            break;
                    }
                });
                action += list;
            }

        }


        dl_end += "<dt>Source</dt><dd>" + src + "</dd>\
        " + pivot + port + "\
        <dt><td class='field'>Threshold</td><dd>" + threshold + "</dd>\
        <dt>Action(s)</dt><dd><ul>" + action + "</ul></dd>\
        </dl>";

        html = dl_start + dl_end;

        return html;
    }

    $scope.capitalizeString = function (str) {
        return str.charAt(0).toUpperCase() + str.substring(1); //
    };

    $scope.taskRunStatus = function (status) {

        switch (status) {

            case 1:
                return 'Success';
                break;

            case 0:
                return 'Failed';
                break;
        }
    }

    //get sysytem urls 
    $scope.systemUrls = function () {

        $http({ //http
            method: 'GET', //get 
            url: systemUrls
        }).success(function (response) {

            if (typeof (Storage) !== "undefined") {

                var systemUrls = response;
                localStorage.setItem('systemUrls', JSON.stringify(systemUrls));
            } else {
                $scope._data = 'Sorry, your browser does not support web storage...';
            }

        }).error(function (err) {
            console.log(err);
        });

    }

    //get custom urls of every scenerio
    $scope.getCustomUrl = function (type, child_type, id = '', param = null) {

        var urls = JSON.parse(localStorage.getItem('systemUrls')); //get urls

        if (urls) {

            if (param) {

                return "<a href='" + base_url + urls[type][param] + id + "'>" + child_type + "</a>"; //return custom url 
            } else {

                return (id != '') ? "<a href='" + base_url + urls[type][child_type] + id + "'>" + child_type + "</a>" :
                    urls[type][child_type]; // return devices url 
            }

        }

    }


});

Ticketing.filter('trustAsHtml', ['$sce', function ($sce) {

    return function (text) {

        return $sce.trustAsHtml(text);

    };

}]);


function resizeTicketsCharts() {
    for (var key in ticketsCharts) {
        if (ticketsCharts.hasOwnProperty(key)) {
            ticketsCharts[key].resize();

        }
    }
}

$(document).on('click', '[data-click=panel-expand]', function (e) {
    setTimeout(function () {
        resizeTicketsCharts();
    }, 200);

});
