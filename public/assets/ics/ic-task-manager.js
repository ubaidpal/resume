/**
 * Created by   : Haroon Zuberi
 * Project Name : BlockAPT
 * Product Name : PhpStorm
 * Date         : 9/6/19 1:10 PM
 * File Name    : ic-task-manager.js
 */
var defaultValues = {
        editForm: {
            id: "task-edit-form",
            type: {
                label: "",
                input: "typeInput",
            },
            task: {
                block: "task",
                label: "taskLabel",
                input: "taskSelect"
            },
            typeId: {
                block: "typeId",
                label: "typeIdLabel",
                input: "typeIdSelect"
            },
            typeMeta: {
                block: "typeMeta",
                label: "typeMetaLabel",
                input: "typeMetaSelect"
            },
            azureVirtualMachines: {
                block: "azureVirtualMachines",
                label: "azureVirtualMachinesLabel",
                input: "azureVirtualMachinesSelect",
            },
            alertDuration: {
                block: "alertDuration",
                label: "alertDurationLabel",
                input: "alertDurationInput",
                errorBlock: "alertDurationMessage"
            },
            deviceCertificates: {
                block: "deviceCertificates",
                label: "deviceCertificatesLabel",
                input: "deviceCertificatesSelect",
            },
            startDate: {
                block: "startDate",
                label: "startDateLabel",
                input: "startDateInput"
            },
            endDate: {
                block: "endDate",
                label: "endDateLabel",
                input: "endDateInput"
            },
            repeat: {
                block: "repeated",
                label: "repeatedLabel",
                input: "repeatedInput"
            },
            repeatType: {
                block: "repeatType",
                label: "repeatTypeLabel",
                input: "repeatTypeInput"
            },
            repeatTypeMinute: {
                block: "repeatTypeMinute",
                label: "repeatTypeLabel",
                input: "repeatTypeInputMinute"
            },
            migrateDevices: {
                block: "deviceMigration",
                label: "deviceMigrationLabel",
                input1: "migrationDevice1",
                input2: "migrationDevice2",
                errorBlock: "deviceMigrationError"
            },
            ticket: {
                block: "ticket",
                label: "ticketLabel",
                input: "ticketCheckbox"
            },
            ticketAgents: {
                block: "ticketAgents",
                label: "ticketAgentsLebel",
                input: "ticketAgentsInput",
                selectAllCheckbox: "selectAllAgents"
            },
            ticketJira: {
                block: "ticketJira",
                label: "ticketJiraLebel",
                input: "ticketJiraInput",

            },
            description: {
                block: "descriptionLabel",
                label: "descriptionBlock",
                input: "description",

            }
        }
    },
    loadExistingTask = function (existingTask) {
        if (existingTask) {
            $('#' + defaultValues.editForm.repeatType.input).val(existingTask['date_type']).trigger("change");
            $('#' + defaultValues.editForm.description.input).html(existingTask['description']).trigger("change");

            var agents = existingTask['agents'].map(elem => elem.user_id);
            $('#' + defaultValues.editForm.ticketAgents.input).val(agents).trigger("change");

            $('#' + defaultValues.editForm.type.input).val(existingTask['type']).trigger("change");
            $('#' + defaultValues.editForm.task.input).val(existingTask['action']).trigger("change");

            $('#' + defaultValues.editForm.startDate.input).val(existingTask['start_date']).trigger("change");
            $('#' + defaultValues.editForm.endDate.input).val(existingTask['end_date']).trigger("change");

            // $("#" + defaultValues.editForm.endDate.input).datetimepicker({
            //     value: existingTask['end_date']
            // });

            // switch (existingTask['type']) {
            //     case 'playbooks':
            //         switch (existingTask['action']) {
            //             case 'run policy':
            //                 var type_ids = existingTask['task_type'].map(elem => elem.playbook_id);
            //                 $('#' + defaultValues.editForm.typeId.input).val(type_ids).trigger("change");
            //                 break;
            //         }
            //         break;
            //     case 'devices':
            //
            //         break;
            //
            // }
        }

    },
    init = function () {

        types = JSON.parse(decodeHtml(types));
        var dateToday = todayDate(),
            time = getUTCTime(dateToday);

        $("#" + defaultValues.editForm.startDate.input).val('');
        $("#" + defaultValues.editForm.endDate.input).val('');
        $("#" + defaultValues.editForm.startDate.input).datetimepicker({

            required: true,
            defaultTime: time,
            onChangeDateTime: function (dp, $input) {
                var dt = new Date($input.val()),
                    endDateVal = new Date($("#" + defaultValues.editForm.endDate.input).val()),
                    currentDate = todayDate();

                var formattedStartDate = !isNaN(dt.getTime()) ? getFormattedDate(dt) : '',
                    formattedStartDateTime = !isNaN(dt.getTime()) ? getFormattedDateTime(dt) : '',

                    formattedTodayDate = getFormattedDate(currentDate),
                    formattedTodayDateTime = getFormattedDateUTCTime(currentDate),
                    formattedEndDate = !isNaN(endDateVal.getTime()) ? getFormattedDate(endDateVal) : '',
                    formattedEndDateTime = !isNaN(endDateVal.getTime()) ? getFormattedDateTime(endDateVal) : '';

                if (formattedStartDate != '') {
                    if (formattedTodayDate == formattedStartDate) {
                        $("#" + defaultValues.editForm.startDate.input).datetimepicker({
                            defaultTime: time,
                        });
                    } else {
                        $("#" + defaultValues.editForm.startDate.input).datetimepicker({
                            defaultTime: "00:00",
                        });
                    }

                    if (formattedStartDateTime < formattedTodayDateTime) {
                        alert('Start Date cannot be Less than Today');
                        $("#" + defaultValues.editForm.startDate.input).val('');
                        return;
                    } else if (formattedEndDateTime != "" && formattedStartDateTime > formattedEndDateTime) {
                        alert('Start Date cannot be Greater than End Date');
                        $("#" + defaultValues.editForm.startDate.input).val('');
                        return;
                    }
                }


            },

        });
        $("#" + defaultValues.editForm.endDate.input).datetimepicker({
            defaultTime: time,

            onChangeDateTime: function (dp, $input) {
                var endDateVal = new Date($input.val()),
                    startDateVal = new Date($("#" + defaultValues.editForm.startDate.input).val()),
                    currentDate = todayDate();


                var formattedStartDateTime = !isNaN(startDateVal.getTime()) ? getFormattedDateTime(startDateVal) : '',
                    formattedTodayDateTime = getFormattedDateUTCTime(currentDate),
                    formattedEndDateTime = !isNaN(endDateVal.getTime()) ? getFormattedDateTime(endDateVal) : '';

                if (!isNaN(startDateVal.getTime())) {
                    formattedStartDateTime = getFormattedDateTime(startDateVal);
                }
                if (formattedEndDateTime != '') {
                    if (formattedEndDateTime < formattedTodayDateTime) {
                        alert('End Date cannot be older than Today');
                        $("#" + defaultValues.editForm.endDate.input).val('');
                        return;
                    }

                    if (formattedStartDateTime != "" && formattedStartDateTime > formattedEndDateTime) {
                        alert('End Date cannot be Less than start Date');
                        $("#" + defaultValues.editForm.endDate.input).val('');
                        return;
                    }
                }


                if (endDateVal.getDate() == startDateVal.getDate()) {
                    var time = startDateVal.getTime() + 60 * 60 * 1000;
                    $("#" + defaultValues.editForm.endDate.input).datetimepicker({
                        defaultTime: time
                    });
                } else {
                    $("#" + defaultValues.editForm.endDate.input).datetimepicker({
                        defaultTime: '00:00'
                    });
                }
            }
        });
        $("#" + defaultValues.editForm.typeId.input).select2({
            placeholder: "Select One or Multiple",
            allowClear: true
        });
        $("#" + defaultValues.editForm.azureVirtualMachines.input).select2({
            placeholder: "Select One or Multiple",
            allowClear: true
        });
        $("#" + defaultValues.editForm.deviceCertificates.input).select2({
            placeholder: "Select One or Multiple",
            allowClear: true
        });
        $("#" + defaultValues.editForm.typeMeta.input).select2({
            placeholder: "Select One or Multiple",
            allowClear: true
        });
        $('#' + defaultValues.editForm.ticketAgents.input).select2();

        if (taskAction) {
            var newAction = JSON.parse(decodeHtml(taskAction));
            loadExistingTask(newAction);
        }
    },
    getTime = function (date, increment = false) {
        var hours = date.getHours(),
            minutes = date.getMinutes();
        if (minutes > 0) {
            hours = hours + 1;
            minutes = 0;
        }
        if (increment) {
            hours++;
        }
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return hours + ':' + minutes;

    },
    getUTCTime = function (date, increment = false) {
        var hours = date.getUTCHours(),
            minutes = date.getUTCMinutes();
        if (minutes > 0) {
            hours = hours + 1;
            minutes = 0;
        }
        if (increment) {
            hours++;
        }
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return hours + ':' + minutes;

    },
    clearValue = function (event, id) {
        event.preventDefault();
        $('#' + id).datetimepicker('reset');
        switch (id) {
            case defaultValues.editForm.startDate.input:
                var dateToday = new Date();
                $("#" + defaultValues.editForm.startDate.input).datetimepicker({
                    defaultTime: getUTCTime(dateToday)
                });
                break;
            case defaultValues.editForm.endDate.input:
                var startDateVal = new Date($("#" + defaultValues.editForm.startDate.input).val());
                $("#" + defaultValues.editForm.endDate.input).datetimepicker({
                    defaultTime: startDateVal.getTime() + 60 * 60 * 1000
                });
                break;
        }
        return false;
    },
    setMinuteOptions = function (e) {
        var activeType = $("#" + defaultValues.editForm.repeatType.input + " option:selected").val();

        if (activeType && activeType == 'minute') {
            $("#" + defaultValues.editForm.repeatTypeMinute.input).val('1');
            $("#" + defaultValues.editForm.repeatTypeMinute.input).attr("required", "required");
            $("#" + defaultValues.editForm.repeatTypeMinute.block).css("display", "block");
        } else {
            $("#" + defaultValues.editForm.repeatTypeMinute.input).val('');
            $("#" + defaultValues.editForm.repeatTypeMinute.input).attr("required", false);
            $("#" + defaultValues.editForm.repeatTypeMinute.block).css("display", "none");
        }

    },
    /*
     * Decode Html by removing the the special and html characters
     * */
    decodeHtml = function (str) {
        var map = {
            "&amp;": '&',
            "&lt;": '<',
            "&gt;": '>',
            "&quot;": '"',
            "&#039;": "'"
        };
        return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (m) {
            return map[m];
        });
    },
    /*
     * Set Tasks based on selected action type
     * */
    setTaskOptions = function (e) {

        var typeVal = $('#' + defaultValues.editForm.type.input).val(),
            activeType = types.find(elem => elem.type == typeVal),
            html = "";
        html += "<option value=''>Choose One</option>";
        if (activeType) {

            Object.entries(activeType.tasks).forEach(function (task) {
                var label = task[1].toLowerCase()
                    .split(' ')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
                html += "<option value='" + task[0] + "'>" + label + "</option>";
            });
            $("#" + defaultValues.editForm.task.block).css("display", "block");
            $("#" + defaultValues.editForm.task.input).html(html);
        } else {
            $("#" + defaultValues.editForm.task.block).css("display", "none");
            $("#" + defaultValues.editForm.task.input).html(html);
        }
        $("#" + defaultValues.editForm.typeId.label).html("Choose Task and Type First");

        // Hide the Migrate Devices Block
        $("#" + defaultValues.editForm.migrateDevices.block).css("display", "none");
        $("#" + defaultValues.editForm.migrateDevices.input1).attr("required", false);
        $("#" + defaultValues.editForm.migrateDevices.input2).attr("required", false);

        $("#" + defaultValues.editForm.alertDuration.block).css("display", "none");
        // $("." + defaultValues.editForm.alertDuration.input).attr("required", false);

        $("#" + defaultValues.editForm.deviceCertificates.block).css("display", "none");
        $("#" + defaultValues.editForm.deviceCertificates.input).attr("required", false);

        $("#" + defaultValues.editForm.azureVirtualMachines.block).css("display", "none");
        $("#" + defaultValues.editForm.azureVirtualMachines.input).attr("required", false);

        $("#" + defaultValues.editForm.typeMeta.input).attr("required", false);

        $("#" + defaultValues.editForm.typeId.block).css("display", "none");
        $("#" + defaultValues.editForm.typeMeta.block).css("display", "none");

        $("#" + defaultValues.editForm.typeId.input).attr("required", "required");
        $("#" + defaultValues.editForm.typeId.input).html('');

    },
    /*
     * Set Task Types to select type ids according to selected task
     * */
    setTypeIdOptions = function (e) {
        var html = "",
            label = "",
            activeType = $("#" + defaultValues.editForm.type.input + " option:selected").val(),
            activeTask = $("#" + defaultValues.editForm.task.input + " option:selected").val(),
            typeIds = [];
        html += "<option value=''>Choose </option>";
        // Hide the Simple Device Selection Block
        $("#" + defaultValues.editForm.typeId.input).attr("required", false);
        $("#" + defaultValues.editForm.typeId.block).css("display", "none");
        $("#" + defaultValues.editForm.typeMeta.block).css("display", "none");
        // Hide the Migrate Devices Block
        $("#" + defaultValues.editForm.migrateDevices.block).css("display", "none");
        $("#" + defaultValues.editForm.migrateDevices.input1).attr("required", false);
        $("#" + defaultValues.editForm.migrateDevices.input2).attr("required", false);
        $("#" + defaultValues.editForm.typeId.input).attr("multiple", "multiple");

        $("#" + defaultValues.editForm.alertDuration.block).css("display", "none");
        // $("." + defaultValues.editForm.alertDuration.input).attr("required", false);
        $("." + defaultValues.editForm.alertDuration.input).val(0);
        $("." + defaultValues.editForm.alertDuration.input).attr("min", "0");

        $("#" + defaultValues.editForm.deviceCertificates.block).css("display", "none");
        $("#" + defaultValues.editForm.deviceCertificates.input).attr("required", false);

        $("#" + defaultValues.editForm.azureVirtualMachines.block).css("display", "none");
        $("#" + defaultValues.editForm.azureVirtualMachines.input).attr("required", false);

        if (activeType) {
            switch (activeType) {
                case "devices":
                    label = "Choose Device(s)*";
                    switch (activeTask) {
                        case 'migration':
                            typeIds = getMigrationDevices();
                            typeIds.forEach(function (typeId) {
                                if (activeType == 'devices') {
                                    html += "<option value='" + typeId.device_id + "'>" + typeId.device_type + "(" + typeId.hostname + ")</option>";
                                } else {
                                    html += "<option value='" + typeId.id + "'>" + typeId.name + "</option>";
                                }
                            });

                            // Show the Migrate Device Selection Block
                            $("#" + defaultValues.editForm.migrateDevices.input1).attr("required", "required");
                            $("#" + defaultValues.editForm.migrateDevices.input2).attr("required", "required");
                            $("#" + defaultValues.editForm.migrateDevices.block).css("display", "block");
                            $("#" + defaultValues.editForm.migrateDevices.input1).html(html);
                            $("#" + defaultValues.editForm.migrateDevices.input2).html(html);
                            break;
                        case 'check certificate expiry':
                            typeIds = getAlertDevices();
                            typeIds.forEach(function (typeId) {
                                html += "<option value='" + typeId.device_id + "'>" + typeId.device_type + "(" + typeId.hostname + ")</option>";

                            });

                            // SHow the Simple Device Select Block
                            $("#" + defaultValues.editForm.typeId.label).html(label);
                            $("#" + defaultValues.editForm.typeId.block).css("display", "block");
                            $("#" + defaultValues.editForm.typeId.input).attr("multiple", false);

                            // $("." + defaultValues.editForm.alertDuration.input).attr("required", "required");
                            $("#" + defaultValues.editForm.alertDuration.block).css("display", "block");
                            $("." + defaultValues.editForm.alertDuration.input).attr("min", "0");


                            $("#" + defaultValues.editForm.typeId.input).html(html);
                            break;
                        case 'generate report':
                            typeIds = getReportDevices();
                            typeIds.forEach(function (typeId) {
                                html += "<option value='" + typeId.device_id + "'>" + typeId.device_type + "(" + typeId.hostname + ")</option>";

                            });

                            // SHow the Simple Device Select Block
                            $("#" + defaultValues.editForm.typeId.label).html(label);
                            $("#" + defaultValues.editForm.typeId.block).css("display", "block");
                            $("#" + defaultValues.editForm.typeId.input).attr("multiple", false);
                            $("#" + defaultValues.editForm.typeId.input).html(html);
                            break;
                        case 'check license expiry':
                            typeIds = getAlertDevices();
                            typeIds.forEach(function (typeId) {
                                html += "<option value='" + typeId.device_id + "'>" + typeId.device_type + "(" + typeId.hostname + ")</option>";

                            });

                            // SHow the Simple Device Select Block
                            $("#" + defaultValues.editForm.typeId.label).html(label);
                            $("#" + defaultValues.editForm.typeId.block).css("display", "block");
                            $("#" + defaultValues.editForm.typeId.input).attr("multiple", false);
                            // $("." + defaultValues.editForm.alertDuration.input).attr("required", "required");
                            $("#" + defaultValues.editForm.alertDuration.block).css("display", "block");
                            $("." + defaultValues.editForm.alertDuration.input).attr("min", "0");

                            $("#" + defaultValues.editForm.typeId.input).html(html);
                            break;

                        case 'clear logs':
                            typeIds = getLogDevices();
                            typeIds.forEach(function (typeId) {
                                html += "<option value='" + typeId.device_id + "'>" + typeId.device_type + "(" + typeId.hostname + ")</option>";

                            });

                            // SHow the Simple Device Select Block
                            $("#" + defaultValues.editForm.typeId.label).html(label);
                            $("#" + defaultValues.editForm.typeId.block).css("display", "block");
                            $("#" + defaultValues.editForm.typeId.input).attr("multiple", true);
                            $("#" + defaultValues.editForm.typeId.input).html(html);
                            break;
                        case 'check swapped status':
                            typeIds = getTelecomDevices();
                            typeIds.forEach(function (typeId) {
                                html += "<option value='" + typeId.device_id + "'>" + typeId.device_type + "(" + typeId.hostname + ")</option>";

                            });

                            // SHow the Simple Device Select Block
                            $("#" + defaultValues.editForm.typeId.label).html(label);
                            $("#" + defaultValues.editForm.typeId.block).css("display", "block");
                            $("#" + defaultValues.editForm.typeId.input).attr("multiple", false);
                            $("#" + defaultValues.editForm.typeId.input).html(html);
                            break;
                        case 'archive':
                        case 'reboot':
                        case 'stand by':
                            typeIds = getDevices();
                            typeIds.forEach(function (typeId) {
                                html += "<option value='" + typeId.device_id + "'>" + typeId.device_type + "(" + typeId.hostname + ")</option>";

                            });

                            // SHow the Simple Device Select Block
                            $("#" + defaultValues.editForm.typeId.label).html(label);
                            $("#" + defaultValues.editForm.typeId.block).css("display", "block");
                            $("#" + defaultValues.editForm.typeId.input).html(html);
                            break;

                    }
                    break;
                case "playbooks":
                    label = "Choose Playbook(s)*";
                    typeIds = getPlaybooks();

                    typeIds.forEach(function (typeId) {

                        html += "<option value='" + typeId.id + "'>" + typeId.name + "</option>";
                    });
                    $("#" + defaultValues.editForm.typeId.label).html(label);
                    $("#" + defaultValues.editForm.typeId.block).css("display", "block");
                    $("#" + defaultValues.editForm.typeId.input).html(html);
                    break;
                case "SSH Devices":
                    label = "Choose SSH Device*";
                    typeIds = getSSHDevices();

                    typeIds.forEach(function (typeId) {
                        html += "<option value='" + typeId.device_id + "'>" + typeId.device_type + "(" + typeId.hostname + ")</option>";
                    });

                    $("#" + defaultValues.editForm.typeId.label).html(label);
                    $("#" + defaultValues.editForm.typeId.block).css("display", "block");
                    $("#" + defaultValues.editForm.typeId.input).html(html);
                    $("#" + defaultValues.editForm.typeId.input).attr("multiple", false);
                    break;

                case "Cloud Devices":
                    label = "Choose Cloud Device*";
                    typeIds = getCloudDevices();

                    typeIds.forEach(function (typeId) {
                        html += "<option value='" + typeId.device_id + "'>" + typeId.device_type + "(" + typeId.hostname + ")</option>";
                    });

                    $("#" + defaultValues.editForm.typeId.label).html(label);
                    $("#" + defaultValues.editForm.typeId.block).css("display", "block");
                    $("#" + defaultValues.editForm.typeId.input).html(html);
                    $("#" + defaultValues.editForm.typeId.input).attr("multiple", false);
                    break;

                default:

            }
            if (typeIds.length) {

            } else {
                $("#" + defaultValues.editForm.typeId.input).attr('required', false);

            }

        } else {
            $("#" + defaultValues.editForm.typeId.label).html("Choose Task and Type First");
            $("#" + defaultValues.editForm.typeId.block).css("display", "none");
            $("#" + defaultValues.editForm.typeId.input).html(html);
        }

    },
    setDeviceCertificates = function (event) {
        var certHtml = "",
            activeType = $("#" + defaultValues.editForm.type.input + " option:selected").val(),
            activeTask = $("#" + defaultValues.editForm.task.input + " option:selected").val(),
            certs = [],
            device_id = event.target.value;

        certHtml += "<option value=''>Choose </option>";
        if (activeType == 'devices') {
            if (activeTask == 'check certificate expiry') {
                $("#" + defaultValues.editForm.deviceCertificates.block).css("display", "block");
                $("#" + defaultValues.editForm.deviceCertificates.input).attr("required", "required");

                certs = getDeviceCertificates(device_id);

                certs.forEach(function (cert) {
                    certHtml += "<option value='" + cert.key + "'>" + cert.value + "</option>";
                });
                $("#" + defaultValues.editForm.deviceCertificates.input).html(certHtml);

                // Device certificates

            }
        }


    },
    // setMetaOptions = function (e) {
    //     var deviceId = $("#" + defaultValues.editForm.typeId.input + " option:selected").val(),
    //         activeType = $("#" + defaultValues.editForm.type.input + " option:selected").val();
    //
    //     if (activeType == 'SSH Devices') {
    //         var label = "Choose Command(s)*",
    //             typeIds = getSSHCommands(deviceId),
    //             html = "<option value=''>Choose One or Multiple </option>";
    //         if (typeIds) {
    //             for (var key in typeIds) {
    //                 if (typeIds.hasOwnProperty(key)) {
    //                     html += "<option value='" + typeIds[key] + "'>" + key + "</option>";
    //
    //                 }
    //             }
    //         }
    //
    //         $("#" + defaultValues.editForm.typeMeta.label).html(label);
    //         $("#" + defaultValues.editForm.typeMeta.block).css("display", "block");
    //         $("#" + defaultValues.editForm.typeMeta.input).attr("required", "required");
    //         $("#" + defaultValues.editForm.typeMeta.input).html(html);
    //     }
    //
    //
    // },
    setMetaOptions = function (e) {
        var deviceId = $("#" + defaultValues.editForm.typeId.input + " option:selected").val(),
            activeType = $("#" + defaultValues.editForm.type.input + " option:selected").val()
        activeTask = $("#" + defaultValues.editForm.task.input + " option:selected").val();
        switch (activeType) {
            case 'devices':
                switch (activeTask) {

                    case 'check swapped status':
                        var label = "Choose Msisdn(s)*",
                            typeIds = getMsisdns(deviceId),
                            html = "<option value=''>Choose One or Multiple </option>";
                        if (typeIds) {

                            for (var key in typeIds) {
                                if (typeIds.hasOwnProperty(key)) {
                                    html += "<option value='" + typeIds[key].msisdn + "'>" + typeIds[key].msisdn + "</option>";

                                }
                            }
                        }

                        $("#" + defaultValues.editForm.typeMeta.label).html(label);
                        $("#" + defaultValues.editForm.typeMeta.block).css("display", "block");
                        $("#" + defaultValues.editForm.typeMeta.input).attr("required", "required");
                        $("#" + defaultValues.editForm.typeMeta.input).html(html);
                        break;
                    case 'check certificate expiry':
                        var certHtml = "",
                            certs = [];

                        certHtml += "<option value=''>Choose </option>";
                        $("#" + defaultValues.editForm.deviceCertificates.block).css("display", "block");
                        $("#" + defaultValues.editForm.deviceCertificates.input).attr("required", "required");
                        $("#" + defaultValues.editForm.deviceCertificates.input).attr("name", "deviceCertificates[]");
                        $("#" + defaultValues.editForm.deviceCertificates.input).attr("multiple", "multiple");

                        certs = getDeviceCertificates(deviceId);

                        certs.forEach(function (cert) {
                            certHtml += "<option value='" + cert.key + "'>" + cert.value + "</option>";
                        });

                        $("#" + defaultValues.editForm.deviceCertificates.label).html('Choose Certificate(s)*');
                        $("#" + defaultValues.editForm.deviceCertificates.input).html(certHtml);

                        // Device certificates
                        break;
                    case 'generate report':
                        var label = "Choose Scan(s)*",
                            scans = deviceId > 0? getReportMetaOptions(deviceId): false,
                            templates = deviceId > 0? getReportingTemplates(deviceId):false,
                            html = "<option value=''>Choose One or Multiple </option>";
                        if (scans) {
                            scans.forEach(function (scan) {
                                html += "<option value='" + scan.id+'~~'+scan.name + "'>" + scan.name + "</option>";
                            });
                        }

                        $("#" + defaultValues.editForm.typeMeta.label).html(label);
                        $("#" + defaultValues.editForm.typeMeta.block).css("display", "block");

                        $("#" + defaultValues.editForm.deviceCertificates.input).attr("name", "report_template");
                        $("#" + defaultValues.editForm.deviceCertificates.input).attr("multiple", false);

                        $("#" + defaultValues.editForm.typeMeta.input).attr("required", "required");
                        $("#" + defaultValues.editForm.typeMeta.input).html(html);

                        // report template dropdown
                        var templateHtml = "";

                        templateHtml += "<option value=''>Choose Template</option>";
                        $("#" + defaultValues.editForm.deviceCertificates.block).css("display", "block");
                        $("#" + defaultValues.editForm.deviceCertificates.input).attr("required", "required");

                        if(templates){
                            templates.forEach(function (template) {
                                templateHtml += "<option value='" + template.id + "'>" + template.name + "</option>";
                            });
                        }

                        $("#" + defaultValues.editForm.deviceCertificates.label).html('Choose Template');
                        $("#" + defaultValues.editForm.deviceCertificates.input).html(templateHtml);

                        break;
                }
                break;
            case 'SSH Devices':
                var label = "Choose Command(s)*",
                    typeIds = getSSHCommands(deviceId),
                    html = "<option value=''>Choose One or Multiple </option>";
                if (typeIds) {
                    for (var key in typeIds) {
                        if (typeIds.hasOwnProperty(key)) {
                            html += "<option value='" + typeIds[key] + "'>" + key + "</option>";

                        }
                    }
                }

                $("#" + defaultValues.editForm.typeMeta.label).html(label);
                $("#" + defaultValues.editForm.typeMeta.block).css("display", "block");
                $("#" + defaultValues.editForm.typeMeta.input).attr("required", "required");
                $("#" + defaultValues.editForm.typeMeta.input).html(html);
                break;

            case 'Cloud Devices':
                var label = "Choose Subscription",
                    subscriptions = getAzureSubscription(deviceId),
                    html = "<option value=''>Choose One or Multiple </option>";
                if (subscriptions) {
                    subscriptions.forEach(function (sub) {
                        html += "<option value='" + sub.subscriptionId + "~" + deviceId + "'>" + sub.name + "</option>";
                    });
                }

                $("#" + defaultValues.editForm.typeMeta.label).html(label);
                $("#" + defaultValues.editForm.typeMeta.block).css("display", "block");
                $("#" + defaultValues.editForm.typeMeta.input).attr("required", "required");
                $("#" + defaultValues.editForm.typeMeta.input).html(html);
                break;

        }

    };

/*
On change get further get results
*/

$("#" + defaultValues.editForm.typeMeta.input).change(function () {

    var key, value, label,
        vmHtml = "";

    key = this.value;
    label = $("#" + defaultValues.editForm.typeMeta.label).html();
    value = key.split("~");

    switch (label) {

        case 'Choose Subscription':

            var virtual_machines = getazureVirtualMachines(value[1], value[0]);

            $("#" + defaultValues.editForm.azureVirtualMachines.block).css("display", "block");
            $("#" + defaultValues.editForm.azureVirtualMachines.input).attr("required", "required");

            virtual_machines.forEach(function (vm) {
                vmHtml += "<option value='" + vm.key + "'>" + vm.name + "</option>";
            });
            $("#" + defaultValues.editForm.azureVirtualMachines.input).html(vmHtml);

            break;
    }

});

/*
 * Get All Devices whoose functionality is available
 * */
var getDevices = function () {
        var url = "/" + userName + '/get-user-devices',
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data.devices) {
                    response = data.devices;
                }
            }
        });
        return response;
    },

    /*
    Cloud Devices
    */

    getCloudDevices = function () {
        var url = "/" + userName + '/get-cloud-devices',
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data.devices) {
                    response = data.devices;
                }
            }
        });
        return response;
    },

    getAzureSubscription = function (deviceId) {
        var url = "/" + userName + '/get-azure-subscriptions/' + deviceId,
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data.subscriptions) {
                    response = data.subscriptions;
                }
            }
        });
        return response;
    },

    getazureVirtualMachines = function (deviceId, subscriptionId) {
        var url = "/" + userName + '/get-azure-virtual-machines/' + subscriptionId + "/" + deviceId,
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data.virtual_machines) {
                    response = data.virtual_machines;
                }
            }
        });
        return response;
    },

    /*
     * Get All Telecom Devices
     * */
    getTelecomDevices = function () {
        var url = "/" + userName + '/get-telecom-devices',
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data.devices) {
                    response = data.devices;
                }
            }
        });
        return response;
    },
    getSSHDevices = function () {
        var url = "/" + userName + '/get-ssh',
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data.ssh_devices) {
                    response = data.ssh_devices;
                }
            }
        });
        return response;
    },
    getSSHCommands = function (deviceId) {
        var url = "/" + userName + '/get-ssh-commands/' + deviceId,
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data.ssl_commands) {
                    response = data.ssl_commands;
                }
            }
        });
        return response;
    },

    getReportMetaOptions = function (deviceId) {
        var url = "/" + userName + '/devices/ns/api/scans/' + deviceId,
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data) {
                    response = data;
                }else{
                    response = [];
                }
            }
        });
        return response;
    },
    getReportingTemplates = function (deviceId) {
        var url = "/" + userName + '/reporting-templates/api/list/' + deviceId,
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data) {
                    response = data;
                }else{
                    response = [];
                }
            }
        });
        return response;
    },
    getMsisdns = function (deviceId) {
        var url = "/" + userName + '/devices/JTSimSwap/msisdn/list/' + deviceId,
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data) {
                    response = data;
                }
            }
        });
        return response;
    },
    getMigrationDevices = function () {
        var url = "/" + userName + '/get-migration-devices',
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data.devices) {
                    response = data.devices;
                }
            }
        });
        return response;
    },
    getAlertDevices = function () {
        var url = "/" + userName + '/get-alert-devices',
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data.devices) {
                    response = data.devices;
                }
            }
        });
        return response;
    },
    getReportDevices = function () {
        var url = "/" + userName + '/get-report-devices',
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data.devices) {
                    response = data.devices;
                }
            }
        });
        return response;
    },

    getLogDevices = function () {
        var url = "/" + userName + '/get-log-devices',
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data.devices) {
                    response = data.devices;
                }
            }
        });
        return response;
    },

    getDeviceCertificates = function (device_id) {
        var url = "/" + userName + '/get-devices-certificates/' + device_id,
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data.devices) {
                    response = data.devices;
                }
            }
        });
        return response;
    },
    /*
     * Get All active Playbooks
     * */
    getPlaybooks = function () {
        var url = "/" + userName + '/get-playbooks',
            response = false;
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                if (data.playbooks) {
                    response = data.playbooks;
                }
            }
        });
        return response;
    },
    /*
     * It will handle the date change of set date time
     * */
    dateChangeHandler = function (currentDateTime) {
        // 'this' is jquery object datetimepicker
        if (currentDateTime) {
            if (currentDateTime.getDay() == 6) {
                this.setOptions({
                    minTime: '11:00'
                });
            } else
                this.setOptions({
                    minTime: '8:00'
                });
        }

    },
    setRepated = function (e) {
        var repeat = false;
        if ($('#' + defaultValues.editForm.repeat.input).is(":checked")) {
            repeat = true;
        }
        $("#" + defaultValues.editForm.endDate.input).val("");
        $("#" + defaultValues.editForm.repeatType.input).val("");

        if (repeat) {
            $("#" + defaultValues.editForm.endDate.input).attr("required", "required");
            $("#" + defaultValues.editForm.repeatType.input).attr("required", "required");


            $("#" + defaultValues.editForm.endDate.block).css("display", "block");
            $("#" + defaultValues.editForm.repeatType.block).css("display", "block");
        } else {
            $("#" + defaultValues.editForm.endDate.input).attr("required", false);
            $("#" + defaultValues.editForm.repeatType.input).attr("required", false);

            $("#" + defaultValues.editForm.endDate.block).css("display", "none");
            $("#" + defaultValues.editForm.repeatType.block).css("display", "none");
        }
    },
    selectAgents = function () {
        if ($("#" + defaultValues.editForm.ticketAgents.selectAllCheckbox).is(':checked')) {
            $("#" + defaultValues.editForm.ticketAgents.input + " > option").prop("selected", "selected");
            $("#" + defaultValues.editForm.ticketAgents.input).trigger("change");
        } else {
            $("#" + defaultValues.editForm.ticketAgents.input + " > option").removeAttr("selected");
            $("#" + defaultValues.editForm.ticketAgents.input).trigger("change");
        }
    },
    toggleJiraSelect = function (e) {
        hideAgentsSelect();
    },
    toggleAgentsSelect = function (e) {
        if ($("#" + defaultValues.editForm.ticket.input).is(':checked')) {
            showAgentsSelect();
        } else {
            hideAgentsSelect();
        }

    },
    showAgentsSelect = function () {
        $("#" + defaultValues.editForm.ticketJira.block).css('display', 'none');
        $("#" + defaultValues.editForm.ticketJira.input).attr('required', false);
        $("#" + defaultValues.editForm.ticketJira.input).val('').trigger('change');

        $("#" + defaultValues.editForm.ticketAgents.block).css('display', 'block');
        $("#" + defaultValues.editForm.ticketAgents.input).attr('required', 'required');
        $("#" + defaultValues.editForm.ticketAgents.input).val('').trigger('change');
        $("#" + defaultValues.editForm.ticketAgents.selectAllCheckbox).attr('checked', false);

    },
    hideAgentsSelect = function () {
        $("#" + defaultValues.editForm.ticketAgents.block).css('display', 'none');
        $("#" + defaultValues.editForm.ticketAgents.input).attr('required', false);
        $("#" + defaultValues.editForm.ticketAgents.input).val('').trigger('change');
        $("#" + defaultValues.editForm.ticketAgents.selectAllCheckbox).attr('checked', false);

        $("#" + defaultValues.editForm.ticketJira.block).css('display', 'block');
        $("#" + defaultValues.editForm.ticketJira.input).attr('required', 'required');
        $("#" + defaultValues.editForm.ticketJira.input).val('').trigger('change');
    };
$(document).ready(function () {
    init();
    $('#' + defaultValues.editForm.id).submit(function (e) {
        var device1 = $("#" + defaultValues.editForm.migrateDevices.input1 + " option:selected").val(),
            device2 = $("#" + defaultValues.editForm.migrateDevices.input2 + " option:selected").val();
        if (device1 != '' && device2 != '') {
            if (device1 == device2) {
                $('#' + defaultValues.editForm.migrateDevices.errorBlock).css('display', 'block');
                e.preventDefault();
                return false;
            }
        } else {
            var activeTask = $("#" + defaultValues.editForm.task.input + " option:selected").val();
            if (activeTask == 'check certificate expiry') {
                var alertDuration = 0;
                $('.' + defaultValues.editForm.alertDuration.input).each(function () {
                    alertDuration += parseInt($(this).val());
                });
                if (alertDuration == 0) {
                    $('#' + defaultValues.editForm.alertDuration.errorBlock).css('display', 'block');
                    e.preventDefault();
                    return false;
                } else {
                    return true;
                }

            }
            return true;
        }


    });
    $(".readonly").keydown(function (e) {
        e.preventDefault();
    });
});
// Clock on form coe
window.onload = setInterval(currentClock, 1000);

function currentClock() {
    var today = new Date(),
        date = today.getUTCFullYear() + '/' + (today.getUTCMonth() + 1) + '/' + today.getUTCDate(),
        time = today.getUTCHours() + ":" + today.getUTCMinutes() + ":" + today.getUTCSeconds();

    document.getElementById('time').innerHTML = date + ' ' + time;
}

function todayDate() {
    var d = new Date();
    d.setUTCFullYear(d.getFullYear());
    d.setUTCMonth(d.getMonth());
    d.setUTCDate(d.getDate());
    //d.setUTCHours(d.getHours());
    // d.getUTCMinutes(d.getMinutes());
    // d.setUTCSeconds(d.getSeconds());
    return d;

}

function UTCtodayDate() {
    var d = new Date();
    d.setUTCFullYear(d.getFullYear());
    d.setUTCMonth(d.getMonth());
    d.setUTCDate(d.getDate());
    d.setUTCHours(d.getHours());
    d.setUTCMinutes(d.getMinutes());
    d.setUTCSeconds(d.getSeconds());
    return d;

}

function getFormattedDate(dt) {
    var month = dt.getMonth() + 1,
        date = dt.getDate();

    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;

    return dt.getFullYear() + '/' + month + '/' + date;
}

function getFormattedTime(dt) {

    var hours = dt.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    var minutes = dt.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    time = hours + ':' + minutes;
    return time;
}

function getFormattedDateTime(dt) {
    var month = dt.getMonth() + 1,
        date = dt.getDate();
    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;

    var formattedDate = dt.getFullYear() + '/' + month + '/' + date;
    var hours = dt.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    var minutes = dt.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    time = hours + ':' + minutes;

    return formattedDate + ' ' + time;
}

function getFormattedDateUTCTime(dt) {
    var month = dt.getMonth() + 1,
        date = dt.getDate();
    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;

    var formattedDate = dt.getFullYear() + '/' + month + '/' + date;

    var hours = dt.getUTCHours();
    hours = hours < 10 ? '0' + hours : hours;
    var minutes = dt.getUTCMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    time = hours + ':' + minutes;

    return formattedDate + ' ' + time;
}
