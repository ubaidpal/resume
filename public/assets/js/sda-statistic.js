var commands = {    // Commands Object to keep the data about all the commands
        vsscpService: {    // For monitor Health
            intervalId: 0,  //  Interval Id
            intervalSpan: 30000,    //  Interval Span in milli seconds
            processing: false,  //  The request Processing Status
            url: vsscpServiceUrl,  // The Request Url
            block: "vsscpService", // The Response Block
        },
        vssoaService: { // For monitor Route
            intervalId: 0,  // For monitor Health
            intervalSpan: 30000,    //  Interval Span in milli seconds
            processing: false, //  The request Processing Status
            url: vssoaServiceUrl,  // The Request Url
            block: "vssoaService", // The Response Block
        },
    },
    // Function to Trigger Monitor Health Request
    vsscpService = function () {
        getCommandStat("vsscpService");
    },
    // Function to Trigger Route Health Request
    vssoaService = function () {
        getCommandStat("vssoaService");
    },

    /*
    * Function to send request for a command response
    * @param: Command Name
    * */
    getCommandStat = function (commandName) {
        if (!commands[commandName].processing) {    // Check Whether the request is already processing or not
            commands[commandName].processing = true;    // If not put it into processing now
            $("#" + commands[commandName].block).html("Loading...");    // set the block content loading
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            jQuery.ajax({   // Ajax Request
                url: commands[commandName].url,
                type: "get",
                success: function (response) {
                    if (response != '') {
                        $("#" + commands[[commandName]].block).html(response);  // Set The Block Content To response
                    } else {
                        $("#" + commands[[commandName]].block).html('Data Not Found...');   // Response Data Not Found
                    }
                    commands[commandName].processing = false;   // Now the processing is complete, so make the processing false again  process again
                }, error: function (xhr, ajaxOptions, thrownError) {
                    console.log("ERROR:" + xhr.responseText + " - " + thrownError);
                    commands[commandName].processing = false;
                }
            });
        }
    },
    /*
    * Set the interval for a particular graph
    * @param commandName
    * @param interval Span(default 30000)
    * */
    setResponseInterval = function (commandName, intervalSpan = 30000) {
        clearInterval(commands[commandName].intervalId);
        commands[commandName].intervalId = intervalSpan;
        commands[commandName].intervalId = setInterval(window[commandName], commands[commandName].intervalSpan);
    },
    init = function () {
        vsscpService();
        vssoaService();
        setResponseInterval("vsscpService");
        setResponseInterval("vssoaService");
    };

$(document).ready(function (e) {
    init();
    $('.auto_refresh').change(function (e) {
        var interval = $(this).val(),
            commandName = $(this).data('command');
        setResponseInterval(commandName, interval);
    });
});

