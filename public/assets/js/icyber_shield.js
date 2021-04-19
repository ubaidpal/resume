/* BlockAPT js*/

// search data


jQuery.fn.highlight = function(pat) {
    function innerHighlight(node, pat) {
        var skip = 0;
        if (node.nodeType == 3) {
            var pos = node.data.toUpperCase().indexOf(pat);
            if (pos >= 0) {
                var spannode = document.createElement('span');
                spannode.className = 'highlight';
                var middlebit = node.splitText(pos);
                var endbit = middlebit.splitText(pat.length);
                var middleclone = middlebit.cloneNode(true);
                spannode.appendChild(middleclone);
                middlebit.parentNode.replaceChild(spannode, middlebit);
                skip = 1;
            }
        } else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
            for (var i = 0; i < node.childNodes.length; ++i) {
                i += innerHighlight(node.childNodes[i], pat);
            }
        }
        return skip;
    }
    return this.each(function() {
        innerHighlight(this, pat.toUpperCase());
    });
};

jQuery.fn.removeHighlight = function() {
    function newNormalize(node) {
        for (var i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
            var child = children[i];
            if (child.nodeType == 1) {
                newNormalize(child);
                continue;
            }
            if (child.nodeType != 3) { continue; }
            var next = child.nextSibling;
            if (next == null || next.nodeType != 3) { continue; }
            var combined_text = child.nodeValue + next.nodeValue;
            new_node = node.ownerDocument.createTextNode(combined_text);
            node.insertBefore(new_node, child);
            node.removeChild(child);
            node.removeChild(next);
            i--;
            nodeCount--;
        }
    }

    return this.find("span.highlight").each(function() {
        var thisParent = this.parentNode;
        thisParent.replaceChild(this.firstChild, this);
        newNormalize(thisParent);
    }).end();
};







//input field change on click
var defaults = {
        device_type_slect_id: '#device_type',
        username_tab: '#username_tab',
        password_tab: '#password_tab',
        device_username: '#username',
        device_password: '#password',
        device_hostname: '#hostname',
        input_jetnexus_ip: '#jetnexus_ip',
        input_kemp_ip: '#kemp_ip',
        device_InputUsername: '#InputUsername',
        device_InputPassword: '#InputPassword',
        device_InputHostname: '#InputHostname',
        device_JiraHidden: '#JiraHidden',
        device_azureHidden: '#azureHidden',
        device_JiraProjectKey: '#jira-project-key',
        _device_meta_InputJiraName: '#InputJiraName',
        loading_div_id: 'loading-div-background',
        access_pattern: '.access_pattern',
        ics_tcp: '#ics_tcp',
        Device_network: '#device-network',
        Device_network_required: '#device_network_required',
        device_free_licence: '#free_licence',
        free_licence: '#licence',

        //Azure Device Defaults
        vm_security_rule_source: '.source',
        vm_security_rule_destination: '.destination'
    },

    default_add_device = function() {
        $(defaults.device_InputUsername).attr('placeholder', 'Enter Username');
        $(defaults.device_InputHostname).attr('placeholder', 'Enter Hostname');
        $(defaults.device_InputPassword).attr('placeholder', 'Enter Password');
        $(defaults.device_InputHostname).val('');
        $(defaults.device_InputHostname).prop('readonly', false);
    },

    jetnexus_add_device = function() {

        $(defaults.Device_network).show();
        $(defaults.Device_network_required).prop('required', true);

        $(defaults.input_jetnexus_ip).show();
        $(".jetnexus_ip").prop('required', true);
        $(defaults.device_InputUsername).attr('placeholder', 'Enter Username ');
        $(defaults.device_InputHostname).attr('placeholder', 'Enter Hostname');
        $(defaults.device_InputPassword).attr('placeholder', 'Enter Password');
        $(defaults.device_InputHostname).val('');
        $(defaults.device_InputHostname).prop('readonly', false);
    },

    splunk_add_device = function() {
        $(defaults.device_free_licence).show();
    },

    blackstoneone_add_device = function() {
        $(defaults.device_username).html('Name:');
        $(defaults.device_InputUsername).attr('placeholder', 'Enter Hostname');
        $(defaults.device_InputHostname).attr('placeholder', 'Enter Name');
        $(defaults.device_InputPassword).attr('placeholder', 'Enter Password');
        $(defaults.device_InputHostname).val('');
        $(defaults.device_InputHostname).prop('readonly', false);
    },
    f5_add_device = function() {
        $(defaults.Device_network).show();
        $(defaults.Device_network_required).prop('required', true);
    },
    cloudflare_add_device = function() {
        $(defaults.device_username).html('Email');
        $(defaults.device_password).html('Api Key');
        $(defaults.device_InputUsername).attr('placeholder', 'Enter Email');
        $(defaults.device_InputPassword).attr('placeholder', 'Enter Api Key');
        $(defaults.device_InputHostname).val('www.cloudflare.com');
        $(defaults.device_InputHostname).prop('readonly', true);
    },
    virustotal_add_device = function() {

        $(defaults.device_username).html('Device Name');
        $(defaults.device_password).html('Api Key');
        $(defaults.device_hostname).html('Hostname');
        $(defaults.device_InputPassword).attr('placeholder', 'Enter Api Key');
        $(defaults.device_InputHostname).val('www.virustotal.com');
        $(defaults.device_InputHostname).prop('readonly', true);

    },

    jira_add_device = function() {
        $(defaults.device_JiraHidden).show();
        $(defaults.device_InputUsername).attr('placeholder', 'Enter valid administrator Email address');
        $(defaults.device_InputHostname).attr('placeholder', 'Enter domain; e.g. example.atlassian.net');
        $(defaults.device_InputPassword).attr('placeholder', 'Enter password');
        $(defaults._device_meta_InputJiraName).attr('placeholder', 'Enter Valid User Name');
        $(defaults.device_InputHostname).val('');
        $(defaults.device_InputHostname).prop('readonly', false);
        $(defaults.device_JiraProjectKey).bind('keypress', alpha_letter);

    },

    azure_add_device = function() {
        $(defaults.device_azureHidden).show();

        $(defaults.device_username).html('Client ID');
        $(defaults.device_InputUsername).attr('placeholder', 'Enter Client ID');
        $(defaults.device_InputHostname).attr('placeholder', 'Enter Hostname');
        $(defaults.device_password).html('Client Secret');
        $(defaults.device_InputPassword).attr('placeholder', 'Enter Client Secret');
        $(defaults.device_InputHostname).val('');
        $(defaults.device_InputHostname).prop('readonly', false);
        $(defaults.device_JiraProjectKey).bind('keypress', alpha_letter);

    },

    nessus_add_device = function() {

        $(defaults.Device_network).hide(); // f5 types hidden
        $(defaults.Device_network_required).prop('required', false); // f5 types required false

        $(defaults.device_username).html('Access Key');
        $(defaults.device_InputUsername).attr('placeholder', 'Enter Access Key');
        $(defaults.device_InputHostname).attr('placeholder', 'Enter Hostname');
        $(defaults.device_password).html('Secret Key');
        $(defaults.device_InputPassword).attr('placeholder', 'Enter Secret Key');
        //  $(defaults.device_InputHostname).val('');
        //$(defaults.device_InputHostname).prop('readonly', false);
        $(defaults.device_JiraProjectKey).bind('keypress', alpha_letter);

    },
    alpha_letter = function(event) {
        var key = event.keyCode;
        return ((key >= 65 && key <= 90) || key == 8);
    },

    stellar_add_device = function() {
        $(defaults.device_username).html('Device Name');
        $(defaults.device_InputUsername).val('Stellar');
        $(defaults.device_InputUsername).prop('readonly', true);
        $(defaults.device_password).html('Public Key');
        $(defaults.device_hostname).html('Hostname');
        $(defaults.device_InputPassword).attr('placeholder', 'Enter Public Key');
        $(defaults.device_InputHostname).attr('placeholder', 'Enter domain; e.g. https://horizon-testnet.stellar.org');
    },

    alienvault_add_device = function() {
        $(defaults.device_username).html('Device Name');
        $(defaults.device_InputUsername).val('AlienVault');
        $(defaults.device_InputUsername).prop('readonly', true);
        $(defaults.device_password).html('Api Key');
        $(defaults.device_InputPassword).attr('placeholder', 'Enter Api Key');
        $(defaults.device_InputHostname).val('otx.alienvault.com');
        $(defaults.device_InputHostname).prop('readonly', true);
    },

    kemp_add_device = function() {

        $(defaults.input_kemp_ip).show();
        $(".kemp_ip").prop('required', true);
        $(defaults.device_InputUsername).attr('placeholder', 'Enter Username ');
        $(defaults.device_InputHostname).attr('placeholder', 'Enter Hostname');
        $(defaults.device_InputPassword).attr('placeholder', 'Enter Password');
        $(defaults.device_InputHostname).val('');
        $(defaults.device_InputHostname).prop('readonly', false);
    },
    max__mind_add_device = function() {
        $(defaults.device_username).html('Account ID');
        $(defaults.device_password).html('License KEY');
        $(defaults.device_InputHostname).val('geolite.info');
        $(defaults.device_InputHostname).prop('readonly', true);
        $(defaults.device_InputUsername).attr('placeholder', 'Enter Account ID E.g. 485256');
        $(defaults.device_InputPassword).attr('placeholder', 'Enter License KEY E.g. 2QYAYDxP9p0P');
    },
    show_loading_block = function(loading_message) {

        var loading_html = '<div id=' + defaults.loading_div_id + '>\n\
        <div id="loading-div" class="ui-corner-all" >\n\
        <img id="bg_archive_img" src="/images/loading.gif" alt="Loading.."/>\n\
        <h2 id="bg_archive">Loading...</h2><h3 id="bg_archive">Do not close this window</h3>\n\
        <p>' + loading_message + '</p>\n\
        <br/> <a target="_blank" href= "/" class="btn btn-inverse btn-sm">Click here if you want to proceed any other work.</a></div>\n\
        </div>';

        $('body').append(loading_html);
        $("#" + defaults.loading_div_id).css({ opacity: 0.8 }).show();
    },
    close_loading_block = function() {

        if ($("#" + defaults.loading_div_id) == null) {
            $("#" + defaults.loading_div_id).desroy();
        }
    },
    show_loading_block_migrate = function(loading_message, url) {
        var loading_html = '<div id=' + defaults.loading_div_id + '>\n\
        <div id="loading-div" class="ui-corner-all" >\n\
        <img id="bg_archive_img" src="/images/loading.gif" alt="Loading.."/>\n\
        <h2 id="bg_archive">Loading...</h2><h3 id="bg_archive">Do not close this window</h3>\n\
        <p>' + loading_message + ' <span><a target="_blank" href= "/">Click here if you want to proceed any other work.</a></span></p>\n\
        <br/>  <a target="_blank" href="' + url + '" class="btn btn-inverse btn-sm">Click here to view migration progress.</a>\n\
        <br/> \n\
        </div>\n\
        </div>';

        $('body').append(loading_html);
        $("#" + defaults.loading_div_id).css({ opacity: 0.8 }).show();
    },
    access_pattern = function() {

        $(defaults.device_JiraHidden).show();
        $(defaults.device_hostname).html('Hostname');

    },

    f5_tcp_fields = function() {
        $(defaults.ics_tcp).attr('placeholder', 'Enter TCP for F5 e.g from 3000 to 3999');
    },

    cisco_tcp_fields = function() {
        $(defaults.ics_tcp).attr('placeholder', 'Enter TCP for Cisco e.g from 4000 to 4999');
    };


$(document).ready(function() {

    var _default = $(defaults.device_type_slect_id).find(":selected").val();
    switch (_default) {

        case 'F5 Networks':
        case 'F5':
            $(defaults.Device_network).show(); // f5 types hidden
            $(defaults.Device_network_required).prop('required', true); // f5 types required false
            break;

        case 'jetNEXUS':
            $(defaults.Device_network).show(); // jetNEXUS types hidden
            $(defaults.Device_network_required).prop('required', true); // f5 types required false
            break;
        case 'Nessus':
            nessus_add_device();
            break;
        default:
            $(defaults.Device_network).hide(); // f5 types hidden
            $(defaults.Device_network_required).prop('required', false); // f5 types required false
            break;
    }

    $('body').on('change', defaults.device_type_slect_id, function() {

        $(defaults.Device_network).hide(); // f5 types hidden
        $(defaults.Device_network_required).prop('required', false); // f5 types required false
        $(defaults.input_jetnexus_ip).hide();
        $(defaults.device_JiraHidden).hide();
        $(defaults.device_azureHidden).hide();
        $(defaults.device_azureHidden + " input").val("");

        $(defaults.device_username).html('Username');
        $(defaults.device_password).html('Password');
        $(defaults.device_hostname).html('Hostname');
        $(defaults.device_InputUsername).attr('placeholder', 'Enter Username');
        $(defaults.device_InputPassword).attr('placeholder', 'Enter Password');
        $(defaults.device_InputHostname).attr('placeholder', 'Enter Hostname');


        var selected_davice_type = $(this).find(":selected").val();


        switch (selected_davice_type) {

            case 'F5 Networks':
            case 'F5':
                f5_add_device();
                break;

            case 'Splunk':
                splunk_add_device();
                break;

            case 'Cloudflare':
                cloudflare_add_device();
                break;

            case 'BlackstoneOne':
                blackstoneone_add_device();
                break;

            case 'VirusTotal':
                virustotal_add_device();
                break;

            case 'Jira':
                jira_add_device();
                break;

            case 'Stellar':
                stellar_add_device();
                break;

            case 'jetNEXUS':
                jetnexus_add_device();
                break;

            case 'AlienVault':
                alienvault_add_device();
                break;

            case 'Kemp':
                kemp_add_device();
                break;

            case 'azure':
                azure_add_device();
                break;

            case 'Nessus':

                nessus_add_device();
                break;
            case 'MaxMind':

                max__mind_add_device();
                break;

            default:
                default_add_device();
                break;
        }

    });


    $('body').on('change', defaults.device_type_slect_id, function() {

        var selected_davice_type = $(this).find(":selected").text();
        if (selected_davice_type === 'F5') {
            f5_tcp_fields();
        }

    });


    var event_type_value = $('#event_type_value').val(); //get value of event type
    $("#event_type").val(event_type_value); // set value to the value of types


    jQuery(document).on("click", '#all_select', function(e) {

        if ($(this).is(':checked', true)) {
            $(".checkbox_select").prop('checked', true);
        } else {
            $(".checkbox_select").prop('checked', false);
        }
    });


    /*********Reboot Devices via Api******/

    $(document).on("click", '.reboot_devices', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var id = e.target.id,
            data = {
                'device_id': id
            },
            device_type = $(this).data("device_type"),
            hostname = $(this).data("hostname");
        $('#loading').html('Loading....');
        $('#msg_success').html('');
        $('#msg_alert').hide();

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        var answer = confirm("Are you sure you want to reboot device?");
        if (answer) {
            $.ajax({
                type: "get",
                url: reboot_url,
                async: true,
                cache: false,
                data: data,
                success: function(data) {

                    $('#loading').html('');
                    $('#msg_alert').show();

                    if (data == 1) {
                        $('#msg_success').html(device_type + '(' + hostname + ' ) Device Restart Successfully.');
                    } else {

                        $('#msg_success').html(device_type + '(' + hostname + ') ' + data);
                        $('#msg_alert').removeClass('alert-success');
                        $('#msg_alert').addClass('alert-danger');

                    }

                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log("ERROR:" + xhr.responseText + " - " + thrownError);
                }
            });
        }

    });

    /*********End Reboot Devices via Api******/


    /*********Standyby Devices via Api******/
    $(document).on("click", '.standby_device', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var id = e.target.id,
            data = {
                'device_id': id
            },
            device_type = $(this).data("device_type");
        hostname = $(this).data("hostname");
        $('#loading').html('Loading....');
        $('#msg_success').html('');
        $('#msg_alert').hide();

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        var answer = confirm("Are you sure you want to Standyby device?");
        if (answer) {
            $.ajax({
                type: "get",
                url: stabdby_url,
                async: true,

                cache: false,
                data: data,
                success: function(data) {

                    $('#loading').html('');
                    $('#msg_alert').show();

                    if (data == 1) {
                        $('#msg_success').html(device_type + '(' + hostname + ' ) Device Standby Successfully.');
                    } else {

                        $('#msg_success').html(device_type + '(' + hostname + ') ' + data);
                        $('#msg_alert').removeClass('alert-success');
                        $('#msg_alert').addClass('alert-danger');

                    }


                },
                error: function(xhr, ajaxOptions, thrownError) {
                    console.log("ERROR:" + xhr.responseText + " - " + thrownError);
                }
            });
        }

    });

    /*********End Standy Device******/

    if (typeof jira_device_id != 'undefined' && typeof get_projects != 'undefined') {
        projectOnLoad(jira_device_id);
    }


});

// validation check for f5 and cisco tcp value
jQuery(document).on('click', '.saveTcp', function(e) {
    e.preventDefault();

    var ics_tcp = $('#ics_tcp').val();
    var device_type = $('#device_type').val();

    if (ics_tcp >= 3000 && ics_tcp <= 3999) {

        //if( device_type === 'F5' || device_type === 'Cisco' ) {

        jQuery('#logger_tcp').submit();
        return false;

        /* } else {

           $('.tcp_error').html('Woops! we are working on this feature and it will be available soon.').show();

       }*/

    } else {

        $('.tcp_error').html('Please add port between 3000 - 3999').show();
    }

});

// validation check for from date cannot be greater to Date
jQuery(document).on('click', '#saveAttackIps', function(e) {
    e.preventDefault();
    var fromDate = $('#from_date').val();
    var toDate = $('#to_date').val();
    if (fromDate > toDate) {
        $('#date_error').html('From date cannot be greater than to Date.').show();
        return false;
    } else {

        $('#date_error').hide();
        jQuery('#searchIpsAttack').submit();
    }
});
/*******End Show And Hide Field On Click Action Field in Policy Creator*****/

/**************Make archive and show loading page*************/
jQuery(document).on("click", '#saveArchive', function(e) {
    e.preventDefault();
    //$("#loadingIcon").show();
    $(".saveArchive").hide();
    //$("#main_body :input").attr("disabled", true);
    show_loading_block('sit back and relax while we make your archive.');
    $("#loading-div-background").show();
    $("#sidebar").css('pointer-events:none');
    $('#sidebar').click(false);
    $("#header").css('pointer-events:none');
    $('#header').click(false);
    jQuery('#create_archive').submit();
});
/*******End of make archive and show loading page*****/

/**************Migrate F5 to jn show loading page*************/
jQuery(document).on("click", '.migrateF5', function(e) {
    e.preventDefault();
    var getF5Val = $('#f5_device_id').val();
    var getJnVal = $('#jn_device_id').val();
    if (getF5Val != 0 && getJnVal != 0 && !$.isEmptyObject(getJnVal)) {
        $('#warning_to_save_migrate').modal();
        $('#device_errorF5').hide();
        $('#device_errorJn').hide();
        $(".continueF5").click(function() {
            show_loading_block('sit back and relax while we make your migrate complete.');
            $("#loading-div-background").show();
            $("#sidebar").css('pointer-events:none');
            $('#sidebar').click(false);
            $("#header").css('pointer-events:none');
            $('#header').click(false);
            $('#warning_to_save_migrate').modal('hide');
            $('#importF5Device').modal('hide');
            jQuery('#importJetNexsus').submit();
        });

    } else if (getF5Val == '0') {
        $('#device_errorJn').hide();
        $('#device_errorF5').html('Please select your device to import ...').show();
        return false;
    } else if (getJnVal == '0') {
        $('#device_errorF5').hide();
        $('#device_errorJn').html('Please select your device to Export...').show();
        return false;
    } else if ($.isEmptyObject(getJnVal)) {
        $('#device_errorF5').hide();
        $('#device_errorJn').hide();
        $('.device_errorJn').html('Please select your device to Export...').show();
        return false;
    }

});

/**************Migrate jn to F5 show loading page*************/
jQuery(document).on("click", '.migrateJnToF5', function(e) {
    e.preventDefault();
    var getJnVal = $('#jn_device_id_jn').val();
    var getF5Val = $('#f5_device_id_F5').val();
    var url = $('.migrateUrlBlade').val();
    if (getJnVal != 0 && getF5Val != 0 && !$.isEmptyObject(getF5Val)) {
        $('#warning_to_save_migrate').modal();
        $('.device_errorF5').hide();
        $('.device_errorJn').hide();
        $(".continueF5").click(function() {
            show_loading_block_migrate('Sit back and relax while migration is in process,', url);
            $("#loading-div-background").show();
            $("#sidebar").css('pointer-events:none');
            $('#sidebar').click(false);
            $("#header").css('pointer-events:none');
            $('#header').click(false);
            $('#warning_to_save_migrate').modal('hide');
            $('#importJnToF5Device').modal('hide');
            jQuery('#importJetNexsusToF5').submit();
        });
    } else if (getJnVal == "0") {
        $('.device_errorF5').hide();
        $('.device_errorJn').html('Please select your device to Export...').show();
        return false;
    } else if (getF5Val == "0") {
        $('.device_errorJn').hide();
        $('.device_errorF5').html('Please select your device to import ...').show();
        return false;
    } else if ($.isEmptyObject(getF5Val)) {
        $('.device_errorJn').hide();
        $('.device_errorF5').html('Please select your device to Export ...').show();
        return false;
    }

});
/**********************Migrate Multiple Devices*************************/
$(document).on("click", '.migrate_jn_F5_all_Devices', function(e) {
    e.preventDefault();
    var f5_jn_device_id = $('#f5_jn_device_id').val();
    var jn_device_orF5_id = $('#jn_device_orF5_id').val();
    var device_import = f5_jn_device_id.split("_");
    var device_export = jn_device_orF5_id.split("_");
    var url = $('.migrateUrlBlade').val();
    if (f5_jn_device_id != 0 && jn_device_orF5_id != 0 && !$.isEmptyObject(jn_device_orF5_id) && device_import[0] != device_export[0]) {

        $('#device_error_Selected_device').hide();
        $('#device_error_F5_jn').hide();
        $('#warning_to_save_migrate').modal();
        $(".continueF5").click(function() {
            show_loading_block_migrate('Sit back and relax while migration is in process,', url);
            $("#loading-div-background").show();
            $("#sidebar").css('pointer-events:none');
            $('#sidebar').click(false);
            $("#header").css('pointer-events:none');
            $('#header').click(false);
            $('#warning_to_save_migrate').modal('hide');
            $('.importAllDevicesRestApi').modal('hide');
            $('.gallery').hide();
            //$('.importAllDevicesSubmit').submit();
            var _import_device = $('.import_device option:selected').val();
            var _export_device = $('.export_devices option:selected').val();
            var _import_device_split = _import_device.split('_');
            var _export_device_split = _export_device.split('_');

            var import_split_device = _import_device_split[1];
            var export_split_device = _export_device_split[1];


            if (import_split_device == "F5" && export_split_device == "jetNEXUS") {
                $('.importAllDevicesSubmit').attr('action', migrationJnToF5).submit();
                return false;
            } else if (import_split_device == "jetNEXUS" && export_split_device == "F5") {
                $('.importAllDevicesSubmit').attr('action', migrationF5ToJn).submit();
                return false;
            } else if (import_split_device == "F5" && export_split_device == "F5") {
                $('.importAllDevicesSubmit').attr('action', migrationF5ToF5).submit();
                return false;
            } else if (import_split_device == "jetNEXUS" && export_split_device == "jetNEXUS") {
                $('.importAllDevicesSubmit').attr('action', migrationJnToJn).submit();
                return false;
            } else if (import_split_device == "jetNEXUS" && export_split_device == "Kemp") {
                $('.importAllDevicesSubmit').attr('action', migrationJnToKemp).submit();
                return false;
            } else if (import_split_device == "Kemp" && export_split_device == "jetNEXUS") {
                $('.importAllDevicesSubmit').attr('action', migrationKempToJn).submit();
                return false;
            } else if (import_split_device == "Kemp" && export_split_device == "F5") {
                $('.importAllDevicesSubmit').attr('action', migrationKempToF5).submit();
                return false;
            } else if (import_split_device == "F5" && export_split_device == "Kemp") {
                $('.importAllDevicesSubmit').attr('action', migrationF5ToKemp).submit();
                return false;
            } else if (import_split_device == "Kemp" && export_split_device == "Kemp") {
                $('.importAllDevicesSubmit').attr('action', comingSoon).submit();
                return false;
            }
        });

    } else if (f5_jn_device_id == '0') {
        $('#device_error_Selected_device').hide();
        $('#device_error_F5_jn').html('Please select your device to import ...').show();
        return false;
    } else if (device_import[0] === device_export[0]) {
        $('#device_error_F5_jn').hide();
        $('#device_error_Selected_device').html('Selected device cannot be same, Please select a different device...').show();
        return false;
    } else if (jn_device_orF5_id == '0') {
        $('#device_error_F5_jn').hide();
        $('#device_error_Selected_device').html('Please select your device to import ...').show();
        return false;
    } else if ($.isEmptyObject(jn_device_orF5_id)) {

        $('#device_error_Selected_device').hide();
        $('.device_error_Selected_device').html('Please select your device to Export ...').show();
        return false;
    }

});

/**********************End Migrate Multiple Devices*************************/
jQuery(document).on("click", '.migrateSingleF5Device', function(e) {
    e.preventDefault();
    var getJnVal = $('#jn_device_id').val();
    if (getJnVal != 0) {
        $('#warning_to_save_migrate').modal();
        $('#device_errorJn').hide();
        $(".continueF5").click(function() {
            show_loading_block('sit back and relax while we make your migrate complete.');
            $("#loading-div-background").show();
            $("#sidebar").css('pointer-events:none');
            $('#sidebar').click(false);
            $("#header").css('pointer-events:none');
            $('#header').click(false);
            $('#warning_to_save_migrate').modal('hide');
            $('.importJnDevices').modal('hide');
            jQuery('#importSingleJetNexsus').submit();
        });
    } else {
        $('#device_errorJn').html('Please select your device to Export...').show();
        return false;
    }

});
/*******End of Migrate F5 show loading page*****/
/*******Select All Device in array*****/
$(".checkAllDevice").change(function() {

    if (this.checked === false) {
        $("#schedule_device_id option").prop("selected", false);
    } else {
        //"select all" change
        $("#schedule_device_id option").prop("selected", true);
    }


});

$(".check_all_groups").change(function() {

    if (this.checked === false) {
        $("#group_id option").prop("selected", false);
    } else {
        //"select all" change
        $("#group_id option").prop("selected", true);
    }


});

/*******End Select All Device in array*****/

/*********Delete Save F5 archive******/
$('#confirm-delete-archive').on('show.bs.modal', function(e) {
    $(this).find('.btn-delete-f5-archives').attr('href', $(e.relatedTarget).data('href'));

    $('.debug-url').html('Delete URL: <strong>' + $(this).find('.btn-delete-f5-archives').attr('href') + '</strong>');
});

$(function() {
    $('.staticParent').on('keydown', '.child', function(e) {
        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) || (/65|67|86|88/.test(e.keyCode) && (e.ctrlKey === true || e.metaKey === true)) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
    });
});

/*********End Multiselect Ips in PaltoAlto******/
function showModal(obj) {
    var meta = $(obj).data('meta');
    var html = '';
    for (var key in meta) {
        if (meta.hasOwnProperty(key)) {
            // console.log(key + " -> " + p[key]);
            html += "<tr>";
            html += "<th>" + key + "</th>";
            html += "<td>" + meta[key] + "</td>";
            html += "</tr>";
        }
    }
    $('#meta-details-table').html(html);
    $('#meta-view-modal').modal('toggle');
}

/*********For Notifications******/
function markNotificationAsRead(count) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    if (count != 0) {
        jQuery.ajax({
            url: notificationUrl,
            type: "post",
            success: function(data) {
                if (data > 0) {
                    $(".noti_count").text('');
                    $(".noti_count").text(0);
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log("ERROR:" + xhr.responseText + " - " + thrownError);
            }
        });
    }

}


/*********End  Notifications******/

/*********Multiple Cc Email******/
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

(function($) {
    $.fn.multipleInput = function() {
        return this.each(function() {
            // list of email addresses as unordered list
            $list = $('<ul/>');
            // input
            var $input = $('<input type="email" id="email_search" class="email_search multiemail"/>').keyup(function(event) {
                if (event.which == 13 || event.which == 32 || event.which == 188) {
                    if (event.which == 188) {
                        var val = $(this).val().slice(0, -1); // remove space/comma from value
                    } else {
                        var val = $(this).val(); // key press is space or comma
                    }
                    if (validateEmail(val)) {
                        // append to list of emails with remove button
                        $list.append($('<li class="multipleInput-email"><span>' + val + '</span></li>')
                            .append($('<a href="#" class="multipleInput-close" title="Remove"><i class="glyphicon glyphicon-remove-sign"></i></a>')
                                .click(function(e) {
                                    $(this).parent().remove();
                                    e.preventDefault();
                                })
                            )
                        );
                        $(this).attr('placeholder', '');
                        // empty input
                        $(this).val('');
                    } else {
                        alert('Please enter valid email id, Thanks!');
                    }
                }
            });
            // container div
            var $container = $('<div class="multipleInput-container" />').click(function() {
                $input.focus();
            });
            // insert elements into DOM
            $container.append($list).append($input).insertAfter($(this));
            return $(this).hide();
        });
    };
})(jQuery);
$('.smtp_email_cc').multipleInput();

var frm = $('#smtpForm');
frm.submit(function(e) {
    e.preventDefault();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    var url = frm.attr('action');
    // data =frm.serialize();
    var smtp_driver = $('#smtp_driver').val(),
        smtp_host = $('#smtp_host').val(),
        smtp_port = $('#smtp_port').val(),
        smtp_username = $('#smtp_username').val(),
        smtp_password = $('#smtp_password').val(),
        smtp_email_from = $('#smtp_email_from').val(),
        smtp_email_to = $('#smtp_email_to').val();

    var texts = [];
    $('.tagit-label').each(function() {
        texts.push($(this).html());
    });

    var data = {
            'smtp_driver': smtp_driver,
            'smtp_host': smtp_host,
            'smtp_port': smtp_port,
            'smtp_username': smtp_username,
            'smtp_password': smtp_password,
            'smtp_email_from': smtp_email_from,
            'smtp_email_to': smtp_email_to,
            'smtp_email_cc': texts
        }
        //debugger;
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function(data) {
            if (data != 0) {
                $('#msg_alert').show();
                $('#msg_success').html('SMTP Settings has been successfully saved.');
            }

        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("ERROR:" + xhr.responseText + " - " + thrownError);
        }
    });

});

/*********End Multiple Cc Email******/


/*end process execution script on load*/


/*********Delete SSl Device confirmation******/
$(document).on("click", '.delete-ssl', function(e) {
    e.preventDefault();
    e.stopPropagation();


    var device_id = $(this).data("device_id"),
        hostname = $(this).data("hostname");
    device_type = $(this).data("device_type");
    $('.device_id').val(device_id);
    $('.sure_msg').html('Are You Sure Delete The ' + device_type + '(' + hostname + ') Device ?');
    $('#myModalLabel2').html(' Delete The ' + device_type + '(' + hostname + ') Device');

});

/****************Add Commands for select specific device*******************/
$(document).on('click', '.command', function(e) {
    $('.command_password').modal('hide');
    $('#msg').hide();
    $('#msg_danger').hide();
    var command_name = $("input[name=command_name]").val();
    if (command_name.length === 0) {
        var html = '<div class="alert alert-danger fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button><span>Please add commands First...</span> </div>';
        $('#msg').html(html).show();
        return false;
    }
    $('#command_password').modal('show');
    return false;
});

$('#submit-btn').click(function(e) {
    e.preventDefault();
   
    // var check_auth_settings = $('#require_auth').val(),
    // new_auth_key = $('#new_auth_key').val();
    // alert(check_auth_settings);
    // alert(new_auth_key);
    // if(check_auth_settings != 0 && new_auth_key == '' ){
    //     $('#command_password').modal('hide');
    //     var html = '<div class="alert alert-danger fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button><span>Please add both auth title and auth command</span> </div>';
    //     $('#msg').html(html).show();
       
    //     return false;
    // }else if(check_auth_settings != 0 && new_auth_key == ''){

    // }
    
  
    var frm = $('#cli_commands_form'),
        url = frm.attr('action'),
        command_name = $("input[name=command_name]").val(),
        auth_commands = $("#auth_commands").val(),
        new_auth_commands = $("input[name=new_auth_commands]").val(),
        new_auth_key = $("input[name=new_auth_key]").val(),
        check_auth_settings = $('#require_auth').val(),
        password = $("input[name=password]").val();
    if (password.length === 0) {
        var html = '<div class="alert alert-danger fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button><span>Please add your system password First...</span> </div>';
        $('#msg_danger').html(html).show();

        return false;
    }
    var device_id = $("input[name=device_id]").val();
    var data = {
        'device_id': device_id,
        'command_name': command_name,
        'new_auth_commands': new_auth_commands,
        'auth_commands': auth_commands,
        'password': password,
        'new_auth_key': new_auth_key,
        'check_auth_settings' : check_auth_settings

    };
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: "post",
        url: url,
        async: true,
        cache: false,
        data: data,
        success: function(data) {
            if (data.status === true) {
                $('#command_password').modal('hide');
                $('#msg_danger').hide();
                $("#msg_danger_request").hide();
                var html = '<div class="alert alert-success fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button><span>' + data.msg + '</span> </div>';
                $('#msg').html(html).show();
                setInterval(function() {
                    location.reload();
                }, 3000);
            } else {
                $('#msg').hide();
                $("#msg_danger").hide();
                var html = '<div class="alert alert-danger fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button><span>' + data.msg + '</span> </div>';
                $('#msg_danger_request').html(html).show();
                $("#password").val('');
                return false;
            }

        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("ERROR:" + xhr.responseText + " - " + thrownError);
        }
    });
});


/*process execution script on load*/
function onloadgetStatus(file_name, onload_url) {

    $('.alert-success').hide();
    $('.default_' + file_name).html('<span>Checking Status &nbsp;<i class="fa fa-circle statusBlinkerDefaultColor Blink"> </i></span>').show();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    jQuery.ajax({
        url: onload_url,
        type: "GET",
        success: function(status) {

            $('.' + file_name).prepend(status.list_output);

            if (status.status == 'online') {

                $('.default_' + file_name).hide();
                $('.failed_' + file_name).hide();
                $('.success_' + file_name).html('<span>Status: ' + status.status + ' &nbsp;<i class="fa fa-circle text-success Blink"> </i></span>').show();
                $(".start_" + file_name).attr("disabled", true);
                $(".stop_" + file_name).attr("disabled", false);

            } else {

                $('.default_' + file_name).hide();
                $('.success_' + file_name).hide();
                $('.failed_' + file_name).html('<span>Status: ' + status.status + ' &nbsp;<i class="fa fa-circle text-danger Blink"> </i></span>').show();
                $(".start_" + file_name).attr("disabled", false);
                $(".stop_" + file_name).attr("disabled", true);
            }

        },
        error: function(xhr, ajaxOptions, thrownError) {

            console.log("ERROR:" + xhr.responseText + " - " + thrownError);
        }
    });

}


/*process execution script start stop*/

$(document).on("click", ".start_process", function(e) {

    $(".start_process").val('Starting...');
    $('.default_' + file_name).html('<span>Checking Status &nbsp;<i class="fa fa-circle statusBlinkerDefaultColor Blink"> </i></span>').show();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var file_name = $(this).data('file_name');

    jQuery.ajax({

        url: '/process/start/' + file_name + '.js',
        type: "GET",
        success: function(status) {

            var found = file_name.search("-");
            if(found > 0){
                var change_name = file_name.split("-");
                file_name = change_name[1];
            }

            if (status.length > 0) {

                $('.' + file_name).prepend(status);
                $('.default_' + file_name).hide();
                $('.failed_' + file_name).hide();
                $('.success_' + file_name).html('<span>Status: online &nbsp;<i class="fa fa-circle text-success Blink"> </i></span>').show();
                $(".start_" + file_name).attr("disabled", true);
                $(".stop_" + file_name).attr("disabled", false);

            } else {

                $('.default_' + file_name).hide();
                $('.success_' + file_name).hide();
                $('.failed_' + file_name).html('<span>Status: stopped &nbsp;<i class="fa fa-circle text-danger Blink"> </i></span>').show();
                $(".start_" + file_name).attr("disabled", false);
                $(".stop_" + file_name).attr("disabled", true);

            }
        },
        error: function(xhr, ajaxOptions, thrownError) {

            console.log("ERROR:" + xhr.responseText + " - " + thrownError);
        }
    });

});


$(document).on("click", ".stop_process", function(e) {

    $('.default_' + file_name).html('<span>Checking Status &nbsp;<i class="fa fa-circle statusBlinkerDefaultColor Blink"> </i></span>').show();
    $("input.start_process").attr("disabled", false);
    $(".stop_process").val('Stopping...');
    var tag = 'stop_process';
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var file_name = $(this).data('file_name');

    jQuery.ajax({

        url: '/process/stop/' + file_name + '.js',
        type: "GET",
        success: function(status) {

            var found = file_name.search("-");
            if(found > 0){
                var change_name = file_name.split("-");
                file_name = change_name[1];
            }

            if (status.length > 0) {
                $('.' + file_name).prepend(status);
                $(".start_" + file_name).attr("disabled", false);
                $(".stop_" + file_name).attr("disabled", true);
                $('.default_' + file_name).hide();
                $('.success_' + file_name).hide();
                $('.failed_' + file_name).html('<span>States: stopped &nbsp;<i class="fa fa-circle text-danger Blink"> </i></span>').show();
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {

            console.log("ERROR:" + xhr.responseText + " - " + thrownError);
        }
    });


});

/*process execution script start stop*/

/*
    Jira Device Work
    */

//create project
$(document).on("click", ".create_project", function(e) {

    $('#plzWait').show();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $("#create_project").modal("show");
    return false;

});


//get all projects of a device
function projectOnLoad(jira_device_id) {

    $('.projects').html('<p class="plzWait">Please Wait...</p>');

    jQuery.ajax({

        url: get_projects,
        type: "GET",
        data: { device_id: jira_device_id },

        success: function(data) {

            if (typeof data.error == 'undefined') {

                $('.projects').html(data);
                ProjectOnLoad(jira_device_id);

            } else {

                $('.plzWait').hide();
                alert(data.error);
                //$('.projects').html(data.error);
            }

        },
        error: function(xhr, ajaxOptions, thrownError) {

            console.log("ERROR:" + xhr.responseText + " - " + thrownError);
        }
    });

};


//selected project data
function ProjectOnLoad(jira_device_id) {

    var key = $('.project_issues').find(":selected").val();
    $('#key_value').val(key);
    GetIssueFields(key, jira_device_id);
};


//selected project data
function ProjectOnLoad(jira_device_id) {

    var key = $('.project_issues').find(":selected").val();
    $('#key_value').val(key);
    GetIssueFields(key, jira_device_id);
};

//on change project get issues and its fields
$(document).on("change", ".project_issues", function(e) {

    var key = this.value;
    $('#key_value').val(key);
    $('.issues_types').html('');
    $('.issues_fields').html('');
    $('.issue_submit').hide();
    GetIssueFields(key, jira_device_id);

});


//get specific issue all fields which are required for now
function GetIssueFields(key, jira_device_id) {

    $('.issues_types').html('<p class="plzWait">Please Wait...</p>');

    jQuery.ajax({

        url: get_issues,
        type: "GET",
        data: { key_id: key, device_id: jira_device_id },

        success: function(data) {

            if (data != 0) {

                $('.issues_types').html(data);

                IssueOnLoad(key, jira_device_id);

            } else {

                $('.plzWait').hide();
                $("#issue_data .modal-body").html('<p>No Record Found</p>');
            }

        },
        error: function(xhr, ajaxOptions, thrownError) {

            console.log("ERROR:" + xhr.responseText + " - " + thrownError);
        }
    });

};


//get issue detail
$(document).on("click", ".issue_key", function(e) {

    var issue_id = e.target.id,
        key = project_key,
        issue_type = $(this).data("issuetype");

    $(".issues_fields").html('');
    $('.issues_types').html('');
    $(".issues_fields").html('<strong>Please Wait:<strong>');
    $(".issue_id").html('<strong>Edit Issue:<strong> ' + issue_id);
    $("#issue_detail").modal("show");

    GetFields(key, jira_device_id, issue_type, issue_id);

});


//create issue of any project
$(document).on("click", ".create_issue", function(e) {

    var key = e.target.id,
        toAppend = '';
    $('.plzWait').show();
    $('.issues_types').html('');
    $('.issues_fields').html('');
    $("#create_issue").modal("show");
    jQuery.ajax({

        url: create_issue,
        type: "GET",
        data: { key_id: key, device_id: jira_device_id },

        success: function(data) {

            if (data != 0) {
                $('.plzWait').hide();
                $('.issues_types').html(data);
                IssueOnLoad(key, jira_device_id);
            } else {

                $('.plzWait').hide();
                $(".issue_data .modal-body").html('<p>No Record Found</p>');
            }

        },
        error: function(xhr, ajaxOptions, thrownError) {

            console.log("ERROR:" + xhr.responseText + " - " + thrownError);
        }
    });

});

//on load get issue fileds of project based on project key
function IssueOnLoad(key, jira_device_id) {

    var issue_type = $('#issue_status').find(":selected").text();
    $('.issues_fields').html('<p class="plzWait">Please Wait...</p>');
    GetFields(key, jira_device_id, issue_type);

};

//get specific issue all fields which are required for now
function GetFields(key, jira_device_id, issue_type, issue_id = null) {

    jQuery.ajax({

        url: get_issue_fields,
        type: "GET",
        data: { key_id: key, device_id: jira_device_id, issue_type: issue_type, issue_id: issue_id },

        success: function(data) {

            if (data != 0) {
                $('.plzWait').hide();
                $('.defualt_filed').hide();
                $('.issues_fields').html(data);
                $('.issue_submit').show();
                $(".issue_id").html('<strong>Edit Issue:<strong> ' + issue_id);
                $(".issue_key").val(issue_id);
                if (typeof task_id !== 'undefined') {
                    getDescription(task_id, tasks_title); // Need For Task Creations
                }
                if (typeof exceptionMessage != 'undefined' && exceptionMessage != null) { // for default
                    $('input[name="summary~string"]').val(exceptionMessage);
                }
            } else {

                $('.plzWait').hide();
                $(".issue_data .modal-body").html('<p>No Record Found</p>');
            }

        },
        error: function(xhr, ajaxOptions, thrownError) {

            console.log("ERROR:" + xhr.responseText + " - " + thrownError);
        }
    });

};

//get issue detail
$(document).on("change", ".issue_status", function(e) {

    var issue_type = this.value,
        key = null;
    $('.issues_fields').html(' ');
    $('.issues_fields').html('<p class="plzWait">Please Wait...</p>');

    if (typeof project_key !== 'undefined') {
        key = project_key;
    } else {
        key = $('.project_issues').find(":selected").val();
    }
    console.log(key);
    GetFields(key, jira_device_id, issue_type);

});

//get all users
$(document).on("click", ".search-assignee", function(e) {

    var parentForm = '#create_issue';
    $('.assignee-user').html('Loading...');
    var issue_key = $(".issue_key").val(),
        project_key = $('.project_issues').val(),
        key_value = $('#key_value').val(),
        assignee_name = $(parentForm + ' .assignee-name').val(),
        toAppend = '';

    if (typeof project_key !== 'undefined') {
        project_key = project_key;
    }
    if (typeof issue_key !== 'undefined') {
        issue_key = issue_key;
    }
    if (typeof key_value !== 'undefined') {
        project_key = key_value;
    }

    if (typeof assignee_name == 'undefined') {
        assignee_name = $('.assignee-name').val();
    }

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    jQuery.ajax({

        url: get_project_users,
        type: "GET",
        data: { device_id: jira_device_id, issue_key: issue_key, assignee: assignee_name, project_key: project_key },

        success: function(users) {

            if (users.length > 0) {

                $('.all-assignees').hide();

                $.each(users, function(i, user) {

                    toAppend += '<option value = ' + user.value + '>' + user.name + '</option>';
                });

                var users = '<select name="assignee" class="form-control" >' + toAppend + ' </select>';

                $('.assignee-user').html(users);
            } else {

                $('.all-assignees').show();
                $('.assignee-user').html('no record found for ' + assignee_name);
            }

            assignee_name = $('.assignee-name').val('');

        },
        error: function(xhr, ajaxOptions, thrownError) {

            console.log("ERROR:" + xhr.responseText + " - " + thrownError);
        }
    });

});

//get all users
$(document).on("click", "#assignee_users", function(e) {
    $('#user_load').show();
    var status = $('#assigned_user').val(),
        issue_key = $("#issue_id").text(),
        toAppend = '';

    if (status != 'Unassigned') {
        $('#users_list option[value="' + status + '"]').attr("selected", "selected");
    }

    $('#assignee_users').hide();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    jQuery.ajax({

        url: get_project_users,
        type: "GET",
        data: { device_id: jira_device_id, issue_key: issue_key },

        success: function(users) {

            if (users.length > 0) {

                $('#user_load').hide();
                $('#users_list').show();
                $('#assignee_users').hide();

                $.each(users, function(i, user) {

                    toAppend += '<option value = ' + user.name + '>' + user.displayName + '</option>';
                });

                $('#users_list').html(toAppend);
            }

        },
        error: function(xhr, ajaxOptions, thrownError) {

            console.log("ERROR:" + xhr.responseText + " - " + thrownError);
        }
    });

});

//get all statuses
$(document).on("click", "#all_statuses", function(e) {

    $('#all_statuses').hide();
    $('#statuses').show();
});

//update status
$('#statuses').on("change", function(e) {

    var status_id = $(this).find(":selected").val(),
        status_text = $(this).find(":selected").text(),
        issue_key = $("#issue_id").text();

    $('.success_msg').hide();
    $('.sub').hide();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    jQuery.ajax({

        url: update_issue_status,
        type: "GET",
        data: { device_id: jira_device_id, issue_key: issue_key, status_id: status_id },

        success: function(data) {

            if (data != 0) {
                $('.sub').show();
                $('.success_msg').html('Issue Status ' + status_text + ' has updated successfully...').show();
            }

        },
        error: function(xhr, ajaxOptions, thrownError) {

            console.log("ERROR:" + xhr.responseText + " - " + thrownError);
        }
    });

});

function getDescription(jira_device_id, tasks_title) {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    jQuery.ajax({
        url: jira_description, // jira route for issue-fields
        type: "GET",
        data: { jira_device_id: jira_device_id },
        success: function(data) {
            console.log(tasks_title);
            console.log(data);
            $('input[name="summary~string"]').val(tasks_title);
            $("textarea.form-control").val(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {

            console.log("ERROR:" + xhr.responseText + " - " + thrownError);
        }
    });

};
/*
    Jira End
    */
/*
 * Clock Code
 * */

window.onload = setInterval(currentClock, 1000);

function currentClock() {
    var today = new Date(),
        today_date = today.getUTCDate();
    if (today_date < 10) {
        today_date = "0" + today_date;
    }
    today_month = today.getUTCMonth() + 1;
    if (today_month < 10) {
        today_month = "0" + today_month;
    }
    today_year = today.getUTCFullYear();
    if (today_year < 10) {
        today_year = "0" + today_year;
    }
    date = today_date + '/' + today_month + '/' + today_year;
    hour = today.getUTCHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    minute = today.getUTCMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    second = today.getUTCSeconds();

    if (second < 10) {
        second = "0" + second;
    }
    time = hour + ":" + minute + ":" + second;
    $('.sidebar-time').html(date + ' ' + time);
}


function setParentHeight() {
    $('.iframe_height').each(function() {
        var parent = $(this).parent('.widget-chart-content');
        parent.css('height', '85%');

        parent = $(this).parent('.panel-body');
        parent.css('height', '85%');
        parent.data('body-height', '85%');

    });
}

setParentHeight();

/*
    Azure create Virtual Machine Networking Security rule 
    Inbound or Outbound
    */
$(defaults.vm_security_rule_source).change(function() {

    var selected_source = $(this).find(":selected").val();

    switch (selected_source) {
        case 'IP Addresses':
            $('.sourceAddress').show();
            break;

        case 'Service Tag':
            $('.serviceTags').show();
            $('.sourceAddress').hide();
            break;


        default:
            $('.serviceTags').hide();
            $('.sourceAddress').hide();
            break;
    }

});

$(defaults.vm_security_rule_destination).change(function() {

    var selected_destination = $(this).find(":selected").val();

    switch (selected_destination) {
        case 'IP Addresses':
            $('.destinationAddress').show();
            break;

        default:
            $('.destinationAddress').hide();
            break;
    }

});

$('.dropdown-menu option, .dropdown-menu select').click(function(e) {
    e.stopPropagation();
});


$(document).on("click", '#submitJira', function(e) {
    e.preventDefault();
    var getJiraError = $('#jira_id').val();

    if (getJiraError == 0) {
        $('.jira_error').html('Please select your jira device first ...').show();
        return false;
    }

    jQuery('#jira-submit').submit();
});
