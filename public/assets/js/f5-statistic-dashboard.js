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
    f5SpreadingTopAttackingIPs,
    getSetIntervalID
]);

white = 'rgba(255,255,255,1.0)',
    fillBlue = 'rgba(52, 143, 226, 0.6)',
    strokeBlue = 'rgba(52, 143, 226, 0.8)',
    fillBlueLight = 'rgba(114, 124, 182, 0.2)',
    strokePurple = 'rgba(114, 124, 182, 0.8)',
    green = '#00acac',
    blue = '#348fe2',
    barChart = null,
    ctx2 = '',
    barChartData = [];

function randomHues(n) {
    var res = [];
    for (var i = 0; i < n; i++)
        res.push('rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')')
    return res
}

var randomColor = randomHues(256);

function pieFunction(id, title, label, data) {
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

function lineChartFunction(id, dataChart) {
    var lineChartData = dataChart;
    var ctx2 = document.getElementById(id).getContext('2d');
    var lineChart = new Chart(ctx2, {
        type: 'line',
        data: lineChartData
    });
}

function BarChartFunction(id, ips, count, title) {
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

app.controller('SPlunkController', function ($scope, $http, url, $interval) {

    $scope.typeOptions = [ //
        {name: '30 Sec', value: '30000'}
    ];

    $scope.auto_refresh = $scope.typeOptions[0].value;

    //get graph name and autofresh value on select function 
    $scope.action_in = function (auto_refresh) {

        var target = event.target || event.srcElement || event.currentTarget;
        var id = target.attributes.id;
        var funtion_name = id.nodeValue; //get graph id so can integrate specific graph on refresh time

        if (auto_refresh) {
            $scope.CustomFunction(funtion_name, auto_refresh, true);
        }

    };

    //on load graph render on page
    $scope.CustomFunction = function (funtion_name, auto_refresh = 30000, refresh = false) {

        $scope.getCustomFunction(funtion_name);

        if (!refresh) {

            $scope.setInterval(funtion_name, auto_refresh);

        } else {

            $scope.getSetIntervalID(funtion_name, null, auto_refresh);
        }

    }

    //set interval with new interval id 
    $scope.setInterval = function (funtion_name, auto_refresh) {

        var interval = $interval(function () { // auto refresh after selected time to specific graph
            $scope.CallCustomFunctionAgain(funtion_name);
        }, auto_refresh);

        var interval_id = interval['$$intervalId'];
        $scope.getSetIntervalID(funtion_name, interval_id);

    }

    //set and get interval id for a specific graph
    $scope.getSetIntervalID = function (graph_name, interval_id = null, auto_refresh = null) {

        var interval_url;

        if (interval_id == null) {

            interval_url = url[13] + '/' + graph_name + '-stats';
        } else {
            interval_url = url[13] + '/' + graph_name + '-stats' + '/' + interval_id;
        }

        $http({
            method: 'GET',
            url: interval_url

        }).success(function (response) {

            if (response) {

                clearInterval(response);

                $scope.setInterval(graph_name, auto_refresh);

            }

        });

    }


    $scope.CallCustomFunctionAgain = function (funtion_name) {

        $scope.getCustomFunction(funtion_name);

    };


    //get custome function when it call back
    $scope.getCustomFunction = function (funtion_name) {

        switch (funtion_name) {

            case 'distTypeOverTime':
                $scope.distTypeOverTime();
                break;

            case 'distCountryOverTime':
                $scope.distCountryOverTime();
                break;

            case 'TopAttackingTypes':
                $scope.TopAttackingTypes();
                break;

            case 'f5SpreadingTopAttacking':
                $scope.f5SpreadingTopAttacking();
                break;

            case 'TopViolations':
                $scope.TopViolations();
                break;

            case 'f5SpreadingViolation':
                $scope.f5SpreadingViolation();
                break;

            case 'TopSignatures':
                $scope.TopSignatures();
                break;

            case 'f5SpreadingSignature':
                $scope.f5SpreadingSignature();
                break;

            case 'TopCountryAttacks':
                $scope.TopCountryAttacks();
                break;

            case 'f5SpreadingCountries':
                $scope.f5SpreadingCountries();
                break;

            case 'getTopIpAttack':
                $scope.getTopIpAttack();
                break;

            case 'f5SpreadingTopIPs':
                $scope.f5SpreadingTopIPs();
                break;

            default:

        }

    };


    $scope.f5CountryAttacks = function () {
        $scope.attacksCount = 'Loading...';
        $scope.countryCount = 'Loading...';
        $scope.uniqueIps = 'Loading...';
        $http({
            method: 'GET',
            url: url[0]
        }).success(function (response) {

            $scope.attacksCount = response.attacksCount;
            $scope.countryCount = response.countryCount;
            $scope.uniqueIps = response.uniqueIps;
            //return false;

        });
    };

    $scope.distTypeOverTimeProcessing = false;
    $scope.distTypeOverTime = function () {
        if (!$scope.distTypeOverTimeProcessing) {
            $scope.distTypeOverTimeProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: url[1]
            }).success(function (response) {

                if (response._title === undefined) {
                    $scope._title = 'Attack Type Distribution by Type Over Time';
                } else {
                    $scope._title = response._title;
                }
                $scope.distTypeOverTimeProcessing = false;
                if(response.labels && response.labels.length){
                    lineChartFunction('f5-distribute', response);
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

    $scope.distCountryOverTime = function () {
        if (!$scope.distCountryOverTimeProcessing) {
            $scope.distCountryOverTimeProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: url[2]
            }).success(function (response) {

                if (response._title === undefined) {
                    $scope._title = 'Attack Distribution by Country Over Time';
                } else {
                    $scope._title = response._title;
                }
                $scope.distCountryOverTimeProcessing = false;
                if(response.labels && response.labels.length) {
                    lineChartFunction('f5-distribute-country', response);
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
    $scope.TopAttackingTypes = function () {
        if (!$scope.TopAttackingTypesProcessing) {
            $scope.TopAttackingTypesProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: url[3]
            }).success(function (response) {

                $scope._attack_type = response._attack_type;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                BarChartFunction('f5-attacks-types', $scope._attack_type, $scope._count, $scope._title);
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
    $scope.TopViolations = function () {
        if (!$scope.TopViolationsProcessing) {
            $scope.TopViolationsProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: url[4]
            }).success(function (response) {

                $scope._violations = response._violations;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                BarChartFunction('f5-attacks-violation', $scope._violations, $scope._count, $scope._title);
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
    $scope.TopSignatures = function () {
        if(!$scope.TopSignaturesProcessing ){
            $scope.TopSignaturesProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: url[5]
            }).success(function (response) {

                $scope._sig_names = response._sig_names;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                BarChartFunction('f5-attacks-signature', $scope._sig_names, $scope._count, 'count');

                $scope.TopSignaturesProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TopSignaturesProcessing = false;
            });
        }else{
            console.log('TopSignatures request skipped');

        }
    };
    $scope.TopCountryAttacksProcessing = false;
    $scope.TopCountryAttacks = function () {
        if(!$scope.TopCountryAttacksProcessing){
            $scope.TopCountryAttacksProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: url[6]
            }).success(function (response) {

                $scope._countryAttackLabel = JSON.parse(response.countryAttackLabel);
                $scope._countryAttackPercent = JSON.parse(response.countryAttackPercent);
                $scope._count = JSON.parse(response.count);
                $scope._title = response._title;

                BarChartFunction('f5-country-attacks', $scope._countryAttackLabel, $scope._count, $scope._title);
                $scope.TopCountryAttacksProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.TopCountryAttacksProcessing = false;
            });
        }else{
            console.log('TopCountryAttacks request skipped');
        }
    };
    $scope.getTopIpAttackProcessing = false;
    $scope.getTopIpAttack = function () {
        if(!$scope.getTopIpAttackProcessing){
            $scope.getTopIpAttackProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: url[7]
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

                var ctx2 = document.getElementById('f5-country-top-attacks').getContext('2d');
                var barChart = new Chart(ctx2, {
                    type: 'bar',
                    data: barChartData
                });
                BarChartFunction('f5-country-top-attacks', $scope.allIpClient, $scope.allIpPercent, $scope._title);
                $scope.getTopIpAttackProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.getTopIpAttackProcessing = false;
            });
        }else{
            console.log('getTopIpAttack request skipped');

        }
    };

    $scope.f5SpreadingTopAttackingProcessing = false;
    $scope.f5SpreadingTopAttacking = function () {
        if (!$scope.f5SpreadingTopAttackingProcessing) {
            $scope.f5SpreadingTopAttackingProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: url[8]
            }).success(function (response) {

                $scope._attack_type = response._attack_type;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                pieFunction('f5-Spreading-attacking', $scope._attack_type, $scope._count, $scope._percent);
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
    $scope.f5SpreadingViolation = function () {
        if (!$scope.f5SpreadingViolationProcessing) {
            $scope.f5SpreadingViolationProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: url[9]
            }).success(function (response) {

                $scope._violations = response._violations;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                pieFunction('f5-spreading-top-attacks-violation', $scope._violations, $scope._count, $scope._percent);
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
    $scope.f5SpreadingSignature = function () {
        if(!$scope.f5SpreadingSignatureProcessing){
            $scope.f5SpreadingSignatureProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: url[10]
            }).success(function (response) {

                $scope._sig_names = response._sig_names;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                pieFunction('f5-spreading-top-attacks-signature', $scope._sig_names, $scope._count, $scope._percent);
                $scope.f5SpreadingSignatureProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.f5SpreadingSignatureProcessing = false;
            });
        }else{
            console.log('f5SpreadingSignature request skipped');
        }
    };
    $scope.f5SpreadingCountriesProcessing = false;
    $scope.f5SpreadingCountries = function () {
        if(!$scope.f5SpreadingCountriesProcessing){
            $scope.f5SpreadingCountriesProcessing = true;
            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: url[11]
            }).success(function (response) {

                $scope._geo_location = response._geo_location;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                pieFunction('f5-spreading-top-attacks-countries', $scope._geo_location, $scope._count, $scope._percent);
                $scope.f5SpreadingCountriesProcessing = false;
            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.f5SpreadingCountriesProcessing = false;
            });
        }else{
            console.log('f5SpreadingCountries request skipped');
        }
    };
    $scope.f5SpreadingTopIPsProcessing = false;
    $scope.f5SpreadingTopIPs = function () {
        if(!$scope.f5SpreadingTopIPsProcessing){
            $scope.f5SpreadingTopIPsProcessing = true;

            $scope._title = 'Loading...';
            $http({
                method: 'GET',
                url: url[12]
            }).success(function (response) {

                $scope._ip_client = response._ip_client;
                $scope._count = response._count;
                $scope._percent = JSON.parse(response._percent);
                $scope._tc = JSON.parse(response._tc);
                $scope._title = response._title;

                pieFunction('f5-spreading-top-attacks-ips', $scope._ip_client, $scope._count, $scope._percent);
                $scope.f5SpreadingTopIPsProcessing = false;

            }).error(function (err) {
                console.log('errr >> ');
                console.log(err);
                $scope.f5SpreadingTopIPsProcessing = false;
            });
        }else{
            console.log('f5SpreadingTopIPs request skipped');
        }
    };


});




