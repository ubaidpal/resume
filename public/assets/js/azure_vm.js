var graphs = {
    cpuAverage: {
        chart: null,
        blockId: "vm-cpu-average",
        metric: "Percentage CPU",
        processing: false,
        title: "CPU Usage",
        xTitle: "",
        yTitle: "Percentage",
        startTime: null,
        dataLength: 100,
        dataPoints: []
    },
    networkTotal: {
        blockId: "vm-network-total",
        metric: "Network In",
        metric1: "Network Out",
        processing: false,
        title: "Network (total)",
        xTitle: "",
        yTitle: "",
        startTime: null,
        dataLength: 100,
        dataPoints: [],
        dataPoints1: [],
    }
};
var updateInterval = 60000; // initial value

var cpuRequestProcessing = false;

$(window).load(function() {

    $('#' + graphs.cpuAverage.blockId).html('Loading Graph...');
    init();

    // generates first set of dataPoints
    updateChart();
    setInterval(function() {
        updateChart()
    }, updateInterval);
});

function init() {
    // Initialize CPU Average Chart
    graphs.cpuAverage.chart = new CanvasJS.Chart(graphs.cpuAverage.blockId, {

        animationEnabled: true,
        title: {
            text: graphs.cpuAverage.title
        },
        axisX: {
            title: graphs.cpuAverage.xTitle,
        },
        axisY: {
            title: graphs.cpuAverage.yTitle,
            includeZero: true,
            suffix: "%"
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
        },
        data: [{
            name: graphs.cpuAverage.title,
            type: "spline",
            dataPoints: graphs.cpuAverage.dataPoints
        }]
    });

    // Initialize Network Total Chart
    graphs.networkTotal.chart = new CanvasJS.Chart(graphs.networkTotal.blockId, {

        animationEnabled: true,
        title: {
            text: graphs.networkTotal.title
        },
        axisX: {
            title: graphs.networkTotal.xTitle,
        },
        axisY: {
            title: graphs.networkTotal.yTitle,
            includeZero: true,
            suffix: "MB"
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
        },
        data: [{
                name: graphs.networkTotal.title,
                type: "spline",
                name: "Network In",
                dataPoints: graphs.networkTotal.dataPoints
            },
            {
                name: graphs.networkTotal.title,
                type: "spline",
                name: "Network Out",
                dataPoints: graphs.networkTotal.dataPoints1
            },
        ]
    });
}

function refreshCPUAverage() {
    if (!graphs.cpuAverage.processing) {
        graphs.cpuAverage.processing = true;
        var requestData = {
            timeline: '1 hours',
            metric: graphs.cpuAverage.metric
        };
        if (graphs.cpuAverage.startTime) {
            requestData['start_time'] = graphs.cpuAverage.startTime;
        }
        $.ajaxSetup({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        jQuery.ajax({
            url: urls.cpuAverage,
            type: "get",
            data: requestData,
            success: function(data) {
                var d = new Date();
                if (data.data) {
                    data.data.forEach(function(point) {
                        if (typeof point.timeStamp === "undefined")
                            return;
                        var current_datetime = new Date(point.timeStamp);
                        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()

                        graphs.cpuAverage.dataPoints.push({
                            label: formatted_date,
                            y: (point.average) ? point.average : 0,
                        });
                    });
                    if (graphs.cpuAverage.dataPoints.length > graphs.cpuAverage.dataLength) {
                        var length_counter = graphs.cpuAverage.dataPoints.length - graphs.cpuAverage.dataLength;
                        graphs.cpuAverage.dataPoints.splice(0, length_counter);
                    }
                    if (graphs.cpuAverage.dataPoints.length) {
                        graphs.cpuAverage.chart.render();
                    }
                    var timeValueCheck = data.data[data.data.length - 1].timeStamp;
                    if (typeof timeValueCheck === "undefined") {
                        graphs.cpuAverage.startTime = d.toISOString();
                    } else {
                        graphs.cpuAverage.startTime = data.data[data.data.length - 1].timeStamp;
                    }

                }
                graphs.cpuAverage.processing = false;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                //console.log("ERROR:" + xhr.responseText + " - " + thrownError);
                graphs.cpuAverage.processing = false;
            }
        });
    }
}



function refreshNetworkTotal() {
    if (!graphs.networkTotal.processing) {
        graphs.networkTotal.processing = true;
        var requestData = {
            timeline: '1 hours',
            metric: graphs.networkTotal.metric,
            metric1: graphs.networkTotal.metric1
        };
        if (graphs.networkTotal.startTime) {
            requestData['start_time'] = graphs.networkTotal.startTime;
        }
        $.ajaxSetup({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
        });
        jQuery.ajax({
            url: urls.networkTotal,
            type: "get",
            data: requestData,
            success: function(data) {
                var d = new Date();
                if (data.metric) {
                    data.metric.data.forEach(function(point) {
                        if (!point.timeStamp)
                            return;
                        var current_datetime = new Date(point.timeStamp);
                        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()

                        graphs.networkTotal.dataPoints.push({
                            label: formatted_date,
                            y: (point.total) ? point.total / 1048576 : 0,
                        });
                    });
                    if (graphs.networkTotal.dataPoints.length > graphs.networkTotal.dataLength) {
                        var length_counter = graphs.networkTotal.dataPoints.length - graphs.networkTotal.dataLength;
                        graphs.networkTotal.dataPoints.splice(0, length_counter);
                    }

                    data.metric1.data.forEach(function(point) {
                        if (!point.timeStamp)
                            return;

                        var current_datetime = new Date(point.timeStamp);
                        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()

                        graphs.networkTotal.dataPoints1.push({
                            label: formatted_date,
                            y: (point.total) ? point.total / 1048576 : 0,
                        });
                    });

                    if (graphs.networkTotal.dataPoints1.length > graphs.networkTotal.dataLength) {
                        length_counter = graphs.networkTotal.dataPoints1.length - graphs.networkTotal.dataLength;
                        graphs.networkTotal.dataPoints1.splice(0, length_counter);
                    }


                    if (graphs.networkTotal.dataPoints.length && graphs.networkTotal.dataPoints1.length) {
                        graphs.networkTotal.chart.render();
                    }
                    var timeValueCheck = data.metric.data[data.metric.data.length - 1].timeStamp;
                    if (typeof timeValueCheck === "undefined") {
                        graphs.networkTotal.startTime = d.toISOString();
                    } else {
                        graphs.networkTotal.startTime = data.metric.data[data.metric.data.length - 1].timeStamp;
                    }

                }
                graphs.networkTotal.processing = false;
            },
            error: function(xhr, ajaxOptions, thrownError) {
                //console.log("ERROR:" + xhr.responseText + " - " + thrownError);
                graphs.networkTotal.processing = false;
            }
        });
    }
}

function updateChart() {
    refreshCPUAverage();
    refreshNetworkTotal();
}
