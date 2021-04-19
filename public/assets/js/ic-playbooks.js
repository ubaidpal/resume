var defaultValues = {
        playbookContainerId: "playbooks_builder",   // Id of the container that contain the flow chart,
        title: "Playbooks Demo",
        operatorTypes: [    // Operator Types and their properties
            {
                name: "start",
                title: "Starting Point",
                icon: "<i class='fa fa-magic'></i>&nbsp",
                class: "playbooks-operator-start",
                inputNamePrefix: "start_input_",
                inputLabelPrefix: "",
                outputNamePrefix: "start_output_",
                outputLabelPrefix: "Output ",
            }, {
                name: "device",
                title: "Device",
                icon: "<i class='fa fa-laptop'></i>&nbsp",
                class: "playbooks-operator-device",
                inputNamePrefix: "device_input_",
                inputLabelPrefix: "",
                outputNamePrefix: "device_output_",
                outputLabelPrefix: "Device ",
            }, {
                name: "processor",
                title: "Processor",
                icon: "<i class='fa fa-gears'></i>&nbsp",
                class: "playbooks-operator-processor",
                inputNamePrefix: "processor_input_",
                inputLabelPrefix: "",
                outputNamePrefix: "processor_output_",
                outputLabelPrefix: "Condition",
            }, {
                name: "action",
                title: "Action",
                icon: "<i class='fa fa-bolt'></i>&nbsp",
                class: "playbooks-operator-action",
                inputNamePrefix: "action_input_",
                inputLabelPrefix: "",
                outputNamePrefix: "action_output_",
                outputLabelPrefix: "Perform In ",
            }
        ],
        operatorClasses: [ // These are the classes that will be used in Operator Design
            "important",
            "success",
            "info",
            "warning",
            "danger",
            "secondary",
            "dark",
            "light",
        ],
        //Edit Operator Modal Information START
        editForms: {
            //Edit Start Operator Modal Information
            start: {
                modalId: "editStartModal", // Edit Modal Start Operator Id
                formId: "editStartForm", // Edit Start Operator Modal Form Id
                formTitleId: "editStartTitle", // Edit Start Operator form Title Field ID
                formOutputBlockId: "editStartOutputs",   // Edit Start Operators From Output Block ID
                formOperatorId: "editStartFormOperatorId",   //Edit Start Operator Form Operator ID field
            },
            //Edit Processor Operator Modal Information
            processor: {
                modalId: "editProcessorModal", // Edit Modal Processor Operator Id
                formId: "editProcessorForm", // Edit Processor Operator Modal Form Id
                formTitleId: "editProcessorTitle", // Edit Processor Operator form Title Field ID
                formInputName: "ruleId", // Edit Action Operator form Title Field Name
                formOutputBlockId: "editProcessorOutputs",   // Edit Processor Operators From Output Block ID
                formOperatorId: "editProcessorFormOperatorId",   //Edit Processor Operator Form Operator ID field
                formRuleValueBlock: "editProcessorRuleValueBlock",   //Edit Processor Operator Form Operator ID field
                formRuleValueId: "editProcessorFormRuleValueId",   //Edit Processor Operator Form Operator ID field
                formSourceBlock: "editProcessorFormSourceBlock",   //Edit Processor Operator Form Operator ID field
                formSourceId: "editProcessorFormSourceId",   //Edit Processor Operator Form Operator ID field
                formSourceName: "source",

                formPivotBlock: "editProcessorFormPivotBlock",
                formPivotId: "editProcessorFormPivotId",
                formPivotLabel: "editProcessorFormPivotLabel",
                formPivotName: "pivot",

                formPortsBlock: "editProcessorFormPortsBlock",
                formPortsLabel: "editProcessorFormPortsLabel",
                formPortsCheckboxLabel: "selectAllPortsLabel",
                formPortsCheckboxName: "selectAllPorts",
                formPortsId: "editProcessorFormPorts",
                formPortsName: "port[]",

                formParseEmailBlock: "parseEmailOptionsBlock",
                formParseEmailLabel: "parseEmailOptionsLabel",
                formParseEmailId: "parseEmailOptionsId",
                operatorParseEmailFor: "parse_email_for",
                operatorParseEmailName: "azure_users",

                operatorPortName: "port",
                operatorMsisdnName: "msisdn",
                operatorSupsbriptionId: "subscriptionId",
                operatorVMName: "virtual_machines",

                formOptionBlock: "ProcessorFormOptionBlock",
                formOptionLabel: "ProcessorFormOptionLabel",
                formOptionId: "ProcessorFormOption",

                manualIPBlock: "manualIPAdrressBlock",
                manualIPLabel: "manualIPAdrressLabel",
                manualIPId: "manualIPAdrress",

                notesID: 'processorNotes',
                templateNotes: {
                    'check-threshold':'Please Select a Source.',
                    'check-threshold-splunk':'Data in form of attacking IPs will come from Splunk device (Logging Device). Each IP has an attack rate percentage. Threshold set in the value will be bare minimum up to which BlockAPT will allow attacks. If the attack percentage value is equal to or greater than value entered in text field, then threshold will be matched, otherwise its unmatched and fallback is by default.',
                    'check-threshold-logger':'Data will come from Logger Ports. Selecting Source as logger indicates that data will be selected from the logger. Pivot point indicates which type of data to select like Source IPs, Destination IPs or so on. Ports will have data, choosing a port, more or all depends on what data user wants to check for attack type. If the attack percentage value is equal to or greater than value entered in text field, then threshold will be matched, otherwise its unmatched and fallback is by default.',
                    'check-swapped-status':'Some Advance Threat Defence devices will have data that needs to be checked if its swapped or not. In that case Source will be Threat Defence device and each device has its own data parameters that will be checked. Here JTSimSwap has MSISDNs that will be checked. Conditions will be Swapped, not Swapped and Fallback(default).',
                    'ip-auto-scan':'IPs are Auto Scanned to check if the are valid or not. Here source will be Azure (Central Management System). User can select one or multiple Virtual Machines of Central Management System. User’s Input IPs will be checked here if they are Valid, Invalid or Fallback (default). Further, valid IPs can be scanned via Vulnerability Scanners (BlackStoneOne, Qualys). ',
                    'parse-emails':'For Scanning purposes, we need a Vulnerability Scanner, here Source will be VirusTotal (Vulnerability Scanner). In order to get outlook users, we need a Cloud based Central Management, here in the case its Azure device. One or multiple Outlook user(s) can be selected. Here we are parsing email for content to check if they are Infected, Clean or Fallback (Default).',
                    'check-user-activity':'Azure Active Directory is used for Azure User Management. Azure Active Directory (LDAP) can be used to detect sign-in users and trigger playbooks based on certain user activity. For example – user A has recently signed into the corporate network over VPN from an IP address in London. Minutes later, that same users credentials are used to sign in to OWA or Salesforce from Russia. Playbook could be used to allow Valid Login, disable their account, or force a password reset automatically if Login is Invalid and fallback in default case.',
               
                }
            },
            //Edit Action Operator Modal Information
            action: {
                modalId: "editActionModal", // Edit Modal Action Operator Id
                formId: "editActionForm", // Edit Action Operator Modal Form Id
                formTitleId: "editActionTitle", // Edit Action Operator form Title Field ID
                formInputName: "actionId", // Edit Action Operator form Title Field Name
                formOutputBlockId: "editActionOutputs",   // Edit Action Operators From Output Block ID
                formOperatorId: "editActionFormOperatorId",   //Edit Action Operator Form Operator ID field
                paramsBlock: "editActionFormParamsBlock",   //Edit Action Operator Form Params Block
                paramName: "param",   //Edit Action Operator Form Operator ID field
            },
            //Edit Device Operator Modal Information
            device: {
                modalId: "editDeviceModal", // Edit Modal Device Operator Id
                deviceType: "deviceTypeTitle", // Device type Id
                deviceActionBlock: "deviceAction", // Device Block
                deviceAction: "actionIn", // Device Action

                formId: "editDeviceForm", // Edit Device Operator Modal Form Id
                formInputName: "deviceId", // Edit Action Operator form Title Field Name
                formPolicyName: "policy", // Edit Action Operator form Title Field Name
                formTitleId: "editDeviceTitle", // Edit Device Operator form Title Field ID
                formPolicyId: "editDevicePolicy", // Choose Device Policy Field
                formSubmit: "editDeviceSubmit", // Choose Device Policy Field
                formOutputBlockId: "editDeviceOutputs",   // Edit Device Operators From Output Block ID
                formOperatorId: "editDeviceFormOperatorId",   //Edit Device Operator Form Operator ID ,
                formSendEmailCheckboxId: "editDeviceSendEmail",
                formSendEmailBlock: "editDeviceSendEmailBlock",
                formSendEmailValueId: "editDeviceSendEmailValue",
                formSendNotificationId: "editDeviceSendNotification",
            },
            playbook: {
                modalId: "editPlaybookModal", // Edit Modal Device Operator Id
                formId: "editPlaybookForm", // Edit Device Operator Modal Form Id
                idField: "playbookId",
                nameField: "playbookName",
                statusField: "playbookStatus"
            }
        },
        //Edit Operator Modal Information END
        linkColor: "#0499FF",   //Default Link Color
        linkWidth: 8,   //Default Link Width
        playbookGrid: 5,   //Default Grid Size
        operatorClass: "playbooks-operator", //Operator default Class
        rules: [],
        devices: [],
        agents: [],
        actions: [
            {
                id: "1",
                name: "Allow Traffic",
                class: "playbooks-operator-success",
                output: false
            },
            {
                id: "6",
                name: "Blacklist",
                class: "playbooks-operator-danger",
                output: false
            },
            {
                id: "2",
                name: "Block",
                class: "playbooks-operator-danger",
                output: true
            },
            {
                id: "3",
                name: "Email",
                class: "playbooks-operator-success",
                output: false,
                paramField: "actionValue"
            },
            {
                id: "4",
                name: "Notification",
                class: "playbooks-operator-success",
                output: false
            },
            {
                id: "5",
                name: "Scan",
                class: "playbooks-operator-warning",
                output: true
            },
            // {
            //     id: "5",
            //     name: "Ticket",
            //     class: "playbooks-operator-warning",
            //     output: false,
            //     paramField: "agents[]",
            //     paramClass: "agents-select"
            // }
        ]
    },
    draggableOperators = $(".draggable_operator"),  //Dragable Operators Class
    $flowchart = $("#" + defaultValues.playbookContainerId),    //PlayBooks Container ID
    playbookLinks = [], //Playbook Links use for parsing purpose
    playbookOperators = {}, //Playbook Operators use for parsing purpose
    activePath = [],    //Playbook active or Current Path use for parsing purpose
    /*
    * Initialize the UI
    * */
    init = function () {
        // initialize select2
        $('.select2').select2();
        // Set Variables
        loggerPorts = JSON.parse(decodeHtml(loggerPorts));
        loggerPivots = JSON.parse(decodeHtml(loggerPivots));

        // Get Playbook Rules
        getPlaybookRules();


    },
    /*
    * write into console if testing
    * */
    write_console = function (str) {
        var debug = false;
        if (debug) {
            console.log(str);
        }
    },
    /*
    * Remove Input Field
    * */
    removeInputField = function (e, obj) {
        e.preventDefault();
        if (confirm("are you sure?")) {
            var block = $(obj).closest(".input-block");
            block.remove();
        }

    },
    /*
    * getPropertyHTML
    * @param:key:string
    * @param:value:string
    * @return html
    * */
    getPropertyHtml = function (key, value, title = "", type = "text") {
        var html = "";
        if (title === "") {
            title = key.replace(/_/g, " ").toUpperCase();
        }

        html += "<div class='form-group'>";
        html += "<label class='control-label col-md-3'>" + title + "</label>\n";
        html += "<div class='col-md-8'>\n";
        html += "<input type='" + type + "' id='" + key + "' class='form-control' name='" + key + "' value='" + value + "' required />\n";
        html += "</div>\n";
        html += "</div>\n";
        return html;
    },
    /*
    * Return a totally new Operator of specified type
    * @params: nInputs: Number of Inputs
    * @params: nOutputs: Number of Outputs
    *
    * */
    getNewOperator = function (nbInputs, nbOutputs, type) {
        var activeType = defaultValues.operatorTypes.find(function (elem) {
            return elem.name === type;
        });
        var data = {
            properties: {
                title: activeType.icon + activeType.title,
                inputs: {},
                outputs: {},
                class: defaultValues.operatorClass + " " + activeType.class
            },
            operatorTypes: type
        };
        if (type == 'processor') {
            data.ruleValue = '';
            data[defaultValues.editForms.processor.formSourceName] = 'splunk';
            data[defaultValues.editForms.processor.formPivotName] = '';
            data[defaultValues.editForms.processor.operatorPortName] = '';
            data[defaultValues.editForms.processor.operatorMsisdnName] = '';
            data[defaultValues.editForms.processor.operatorVMName] = '';
            data[defaultValues.editForms.processor.operatorParseEmailFor] = '';
            data[defaultValues.editForms.processor.operatorParseEmailName] = '';
        } else if (type == 'device') {
            data.policy = '';
        }
        if (defaultValues.editForms[type].formInputName) {
            data[defaultValues.editForms[type].formInputName] = '';
        }
        var i = 0;
        //Fill up Inputs
        for (i = 0; i < nbInputs; i++) {
            data.properties.inputs[activeType.inputNamePrefix + i] = {
                label: activeType.inputLabelPrefix,
            };

        }
        //Fill up Outputs
        for (i = 0; i < nbOutputs; i++) {
            data.properties.outputs[activeType.outputNamePrefix + i] = {
                label: activeType.outputLabelPrefix,
            };
        }
        return data;
    },
    /*
    * getOperatorData
    * it will get operator data according to an elements data ids
    * */
    getOperatorData = function ($element) {

        var nbInputs = parseInt($element.data("nb-inputs")),
            nbOutputs = parseInt($element.data("nb-outputs")),
            type = $element.data("type"),
            data = getNewOperator(nbInputs, nbOutputs, type);
        return data;
    },

    /*
    * Show Edit Operator Modal
    * */
    showEditOperatorModal = function (operatorId) {
        var operatorData = $flowchart.flowchart("getOperatorData", operatorId);

        switch (operatorData.operatorTypes) {
            case 'start':
                openEditStartOperatorModal(operatorId, operatorData);
                break;
            case 'processor':
                openEditProcessorOperatorModal(operatorId, operatorData);
                break;
            case 'action':
                openEditActionOperatorModal(operatorId, operatorData);
                break;
            case 'device':
                openEditDeviceOperatorModal(operatorId, operatorData);

                break;
            default:

        }
    },
    setTemplate = function () {
        var formInformation = defaultValues.editForms.processor,
            operatorId = $flowchart.flowchart("getSelectedOperatorId"),
            operatorData = $flowchart.flowchart("getOperatorData", operatorId),
            ruleId = $('#' + defaultValues.editForms.processor.formTitleId).val(),
            activeRule = defaultValues.rules.find(rule => rule.id == ruleId),
            ruleName = activeRule && activeRule.name ? activeRule.name : '';

        setProcessorSourceOptions(ruleName, operatorData[formInformation.formSourceName]);

        /*
        * Set Layout According to Rule
        * */
        switch (ruleName) {
            case 'Check Threshold':
                // set layout
                $('#'+formInformation.notesID).html(formInformation.templateNotes['check-threshold-splunk ']);

                $('#' + defaultValues.editForms.processor.formPortsLabel).html('Select Port(s)');
                $('#' + defaultValues.editForms.processor.formOptionBlock).css('display', 'none');
                $('#' + defaultValues.editForms.processor.formRuleValueBlock).css('display', 'block');
                $('#' + defaultValues.editForms.processor.formSourceBlock).css('display', 'block');
                $('#' + defaultValues.editForms.processor.manualIPBlock).css('display', 'none');


                $('#' + defaultValues.editForms.processor.formRuleValueId).attr('required', 'required');
                $('#' + defaultValues.editForms.processor.formRuleValueId).val('');
                $("#" + formInformation.formOptionId).attr('required', false);

                // set options
                $("#" + formInformation.formPivotId).val(operatorData[formInformation.formPivotName]).trigger('change');
                var ports = operatorData[formInformation.operatorPortName].split(',');
                $("#" + formInformation.formPortsId).val(ports).trigger('change');
                break;
            case 'Check Swapped Status':
                $('#'+formInformation.notesID).html(formInformation.templateNotes['check-swapped-status']);

                $('#' + defaultValues.editForms.processor.formPortsLabel).html('Select MSISDN(s)');

                $('#' + defaultValues.editForms.processor.formPortsCheckboxLabel).css('display', 'none');
                $('#' + defaultValues.editForms.processor.formOptionBlock).css('display', 'none');
                $('#' + defaultValues.editForms.processor.formRuleValueBlock).css('display', 'none');
                $('#' + defaultValues.editForms.processor.manualIPBlock).css('display', 'none');
                $('#' + defaultValues.editForms.processor.formSourceBlock).css('display', 'block');

                $("#" + formInformation.formOptionId).attr('required', false);

                $('#' + defaultValues.editForms.processor.formRuleValueId).attr('required', false);
                $('#' + defaultValues.editForms.processor.formRuleValueId).val('');


                var msisdn = operatorData[formInformation.operatorMsisdnName].split(',');
                $("#" + formInformation.formPortsId).val(msisdn).trigger('change');

                break;

            case 'IP Auto Scan':
                $('#'+formInformation.notesID).html(formInformation.templateNotes['ip-auto-scan']);

                $('#' + defaultValues.editForms.processor.formOptionLabel).html('Select Subscription ID');
                $("#" + defaultValues.editForms.processor.formPortsBlock).css('display', 'none');
                $('#' + defaultValues.editForms.processor.formPortsCheckboxLabel).css('display', 'none');
                $('#' + defaultValues.editForms.processor.formSourceBlock).css('display', 'block');
                $('#' + defaultValues.editForms.processor.formRuleValueId).attr('required', false);
                $("#" + formInformation.formOptionId).attr('required', true);

                $('#' + defaultValues.editForms.processor.formRuleValueId).val('');
                $('#' + defaultValues.editForms.processor.formPortsBlock).css('display', 'block');
                $('#' + defaultValues.editForms.processor.formPortsId).attr('required', 'required');
                $('#' + defaultValues.editForms.processor.formPortsLabel).html('Select Virtual Machine(s)');
                $('#' + defaultValues.editForms.processor.manualIPBlock).css('display', 'block');

                var subscriptionId = operatorData[formInformation.operatorSupsbriptionId];

                if (typeof subscriptionId !== 'undefined') {

                    getVirtualMachinesIPs(subscriptionId);

                    $("#" + formInformation.formOptionId).val(subscriptionId).trigger('change');
                    var vm = operatorData[formInformation.operatorVMName].split(',');
                    $("#" + formInformation.formPortsId).val(vm);

                    // set manual ip
                    if (operatorData[formInformation.manualIPId] !== 'undefined') {
                        $("." + formInformation.manualIPId).val(operatorData[formInformation.manualIPId]);
                    }

                } else {
                    getVirtualMachinesIPs($("#" + formInformation.formOptionId).val());
                }

                $("#" + formInformation.formOptionId).change(function () {
                    subscriptionId = $("#" + formInformation.formOptionId).find(":selected").val(); //change get subscription id
                    getVirtualMachinesIPs(subscriptionId);
                });

                break;
            case 'Parse Emails':
                $('#'+formInformation.notesID).html(formInformation.templateNotes['parse-emails']);

                $('#' + defaultValues.editForms.processor.formRuleValueId).attr('required', false);
                $('#' + defaultValues.editForms.processor.formRuleValueId).css('display', 'none');
                // set options
                $("#" + formInformation.formPivotId).val(operatorData[formInformation.formPivotName]).trigger('change');
                var azure_users = operatorData[formInformation.operatorParseEmailName].split(',');
                $("#" + formInformation.formPortsId).val(azure_users).trigger('change');
                var parse_for = operatorData[formInformation.operatorParseEmailFor].split(',');
                $("#" + formInformation.formParseEmailId).val(parse_for).trigger('change');
                break;
            case 'Check User Activity':
                $('#'+formInformation.notesID).html(formInformation.templateNotes['check-user-activity']);

                $('#' + defaultValues.editForms.processor.formRuleValueId).attr('required', false);
                $('#' + defaultValues.editForms.processor.formRuleValueId).css('display', 'none');
                // set options
                $("#" + formInformation.formPivotId).val(operatorData[formInformation.formPivotName]).trigger('change');
                var azure_users = operatorData[formInformation.operatorParseEmailName].split(',');
                $("#" + formInformation.formPortsId).val(azure_users).trigger('change');
                var parse_for = operatorData[formInformation.operatorParseEmailFor].split(',');
                $("#" + formInformation.formParseEmailId).val(parse_for).trigger('change');
                break;
            case '':
                $('#'+formInformation.notesID).html('You can Make up a processor by choosing the template');

                $("#" + defaultValues.editForms.processor.formRuleValueBlock).css('display', 'none');
                $("#" + defaultValues.editForms.processor.formPivotBlock).css('display', 'none');
                $("#" + defaultValues.editForms.processor.formSourceBlock).css('display', 'none');
                $("#" + defaultValues.editForms.processor.formPortsBlock).css('display', 'none');
                $('#' + defaultValues.editForms.processor.formOptionBlock).css('display', 'none');

        }
    },
    setProcessorSourceOptions = function (ruleName, value) {
        var options = '',
            userSplunk = false,
            formInformation = defaultValues.editForms.processor;


        switch (ruleName) {
            case 'Check Swapped Status':

                options += "<option value='JTDevice' selected>JT SimSwap Device </option>";
                value = 'JTDevice';
                break;
            case 'Check Threshold':

                userSplunk = getSplunkDevice();
                options = "<option value='logger'>Logger</option>";
                if (userSplunk) {
                    options += "<option value='splunk'>Splunk</option>";
                }
                break;

            case 'IP Auto Scan':
                options += "<option value='Auto Scan Device' selected> Auto Scan Device </option>";
                value = 'Auto Scan Device';
                break;
            case 'Parse Emails':
                options += "<option value='Select Scan Device' selected> Auto Scan Device </option>";
                value = 'Select Scan Device';
                break;
            case 'Check User Activity':
                break;
        }

        $("#" + formInformation.formSourceId).html(options);
        $("#" + formInformation.formSourceId).val(value);

        setSourceData();
    },
    /*
    * Set Source Options for Data Like ports or msisdns
    * */
    setSourceData = function () {
        var ruleId = $('#' + defaultValues.editForms.processor.formTitleId).val(),
            activeRule = defaultValues.rules.find(rule => rule.id == ruleId),
            ruleName = activeRule && activeRule.name ? activeRule.name : 'Check Threshold',
            value = $('#' + defaultValues.editForms.processor.formSourceId).val();

        $('#' + defaultValues.editForms.processor.formParseEmailBlock).css('display', 'none');
        $('#' + defaultValues.editForms.processor.formParseEmailId).attr('required', false);
        switch (ruleName) {
            case 'Check Threshold':

                if (value == 'logger') {
                    setPivotOptions();
                    setPortOptions();
                    $('#'+defaultValues.editForms.processor.notesID).html(defaultValues.editForms.processor.templateNotes['check-threshold-logger']);

                    $('#' + defaultValues.editForms.processor.formPortsCheckboxLabel).css('display', 'block');

                    $('#' + defaultValues.editForms.processor.formPivotBlock).css('display', 'block');
                    $('#' + defaultValues.editForms.processor.formPivotLabel).html('Select Pivot');
                    $('#' + defaultValues.editForms.processor.formPivotId).attr('required', 'required');

                    $('#' + defaultValues.editForms.processor.formPortsBlock).css('display', 'block');
                    $('#' + defaultValues.editForms.processor.formPortsId).attr('required', 'required');
                } else {
                    $('#'+defaultValues.editForms.processor.notesID).html(defaultValues.editForms.processor.templateNotes['check-threshold-splunk']);

                    $('#' + defaultValues.editForms.processor.formPivotId).val('').trigger('change');
                    $('#' + defaultValues.editForms.processor.formPortsId).val('').trigger('change');
                    $('#' + defaultValues.editForms.processor.formPivotBlock).css('display', 'none');
                    $('#' + defaultValues.editForms.processor.formPortsBlock).css('display', 'none');
                    $('#' + defaultValues.editForms.processor.formOptionBlock).css('display', 'none');

                    $('#' + defaultValues.editForms.processor.formPivotId).attr('required', false);
                    $('#' + defaultValues.editForms.processor.formPortsId).attr('required', false);
                    $('#' + defaultValues.editForms.processor.formOptionId).attr('required', false);

                }
                break;
            case 'Check Swapped Status':
                setSimswapOptions();

                $('#' + defaultValues.editForms.processor.formPivotBlock).css('display', 'block');
                $('#' + defaultValues.editForms.processor.formPivotLabel).html('Select Device');
                $('#' + defaultValues.editForms.processor.formPivotId).attr('required', 'required');

                $('#' + defaultValues.editForms.processor.formPortsBlock).css('display', 'block');
                $('#' + defaultValues.editForms.processor.formPortsId).attr('required', 'required');
                break;

            case 'IP Auto Scan':
                setAutoScanDevicesOptions();


                $('#' + defaultValues.editForms.processor.formPivotBlock).css('display', 'block');
                $('#' + defaultValues.editForms.processor.formPivotLabel).html('Select Device');
                $('#' + defaultValues.editForms.processor.formPivotId).attr('required', 'required');

                $('#' + defaultValues.editForms.processor.formOptionBlock).css('display', 'block');
                $('#' + defaultValues.editForms.processor.formOptionId).attr('required', 'required');
                break;
            case 'Parse Emails':
                setVTDevicesOptions();
                setAzureDeviceOptions();
                $('#' + defaultValues.editForms.processor.formPivotId).val('').trigger('change');
                $('#' + defaultValues.editForms.processor.formPortsId).val('').trigger('change');
                $('#' + defaultValues.editForms.processor.formPivotBlock).css('display', 'none');
                $('#' + defaultValues.editForms.processor.formPortsBlock).css('display', 'none');
                $('#' + defaultValues.editForms.processor.formOptionBlock).css('display', 'none');

                $('#' + defaultValues.editForms.processor.formPivotId).attr('required', false);
                $('#' + defaultValues.editForms.processor.formPortsId).attr('required', false);
                $('#' + defaultValues.editForms.processor.formOptionId).attr('required', false);

                $('#' + defaultValues.editForms.processor.formSourceBlock).css('display', 'block');
                $('#' + defaultValues.editForms.processor.formPivotBlock).css('display', 'block');
                $('#' + defaultValues.editForms.processor.formPivotLabel).html('Select Device');
                $('#' + defaultValues.editForms.processor.formPivotId).attr('required', 'required');

                $('#' + defaultValues.editForms.processor.formParseEmailBlock).css('display', 'block');
                $('#' + defaultValues.editForms.processor.formParseEmailId).attr('required', 'required');

                break;
            case 'Check User Activity':
                //setVTDevicesOptions();
                setAzureDeviceOptions();
                $('#' + defaultValues.editForms.processor.formPivotId).val('').trigger('change');
                $('#' + defaultValues.editForms.processor.formPortsId).val('').trigger('change');
                $('#' + defaultValues.editForms.processor.formPivotBlock).css('display', 'none');
                $('#' + defaultValues.editForms.processor.formPortsBlock).css('display', 'none');
                $('#' + defaultValues.editForms.processor.formOptionBlock).css('display', 'none');
                $('#' + defaultValues.editForms.processor.formParseEmailBlock).css('display', 'none');
                $('#' + defaultValues.editForms.processor.formSourceBlock).css('display', 'none');

                $('#' + defaultValues.editForms.processor.formPivotId).attr('required', false);
                $('#' + defaultValues.editForms.processor.formPortsId).attr('required', false);
                $('#' + defaultValues.editForms.processor.formOptionId).attr('required', false);
                $('#' + defaultValues.editForms.processor.formParseEmailId).attr('required', false);
                $('#' + defaultValues.editForms.processor.formSourceId).attr('required', false);


                $('#' + defaultValues.editForms.processor.formPivotBlock).css('display', 'block');
                $('#' + defaultValues.editForms.processor.formPivotLabel).html('Select Device');
                $('#' + defaultValues.editForms.processor.formPivotId).attr('required', 'required');

                break;
        }

    },
    /*
    * Set Ports Dropdown
    * */
    setPortOptions = function () {
        var options = '';
        loggerPorts.forEach(function (port) {
            options += "<option value='" + port.ics_tcp + "'>" + port.device_type + " (" + port.ics_tcp + ")" + "</option>";
        });
        $('#' + defaultValues.editForms.processor.formPortsId).html(options);
    },
    /*
    * Set Pivot Dropdown
    * */
    setPivotOptions = function () {
        var options = '';
        for (var key in loggerPivots) {
            if (loggerPivots.hasOwnProperty(key)) {
                options += "<option value='" + key + "'>" + loggerPivots[key] + "</option>";
            }
        }

        $('#' + defaultValues.editForms.processor.formPivotId).html(options);
    },
    /*
    * Set Pivot Dropdown
    * */
    setSimswapOptions = function () {

        var telecomDevices = getTelecomDevices(),
            options = '';
        for (i = 0; i < telecomDevices.length; i++) {
            options += "<option value='" + telecomDevices[i].device_id + "'>" + telecomDevices[i].device_type + "(" + telecomDevices[i].hostname + ")" + "</option>";
        }

        $('#' + defaultValues.editForms.processor.formPivotId).html(options);
        setMsisdnOptions();
    },
    setPivotDetails = function () {
        var formInformation = defaultValues.editForms.processor,
            operatorId = $flowchart.flowchart("getSelectedOperatorId"),
            operatorData = $flowchart.flowchart("getOperatorData", operatorId),
            ruleId = $('#' + defaultValues.editForms.processor.formTitleId).val(),
            activeRule = defaultValues.rules.find(rule => rule.id == ruleId),
            ruleName = activeRule && activeRule.name ? activeRule.name : '';
        switch (ruleName) {
            case 'Check Swapped Status':
                setMsisdnOptions();
                break;

            case 'IP Auto Scan':
                break;

            case 'Parse Emails':
                setOutlookUsers();
                break;
            case 'Check User Activity':
                setOutlookUsers();
                break;

        }
    },
    /*
    * Set MSISDN Dropdown
    * */
    setMsisdnOptions = function () {
        var deviceId = $('#' + defaultValues.editForms.processor.formPivotId).val();
        if (deviceId > 0) {
            var url = "/" + userName + '/devices/JTSimSwap/msisdn/list/' + deviceId,
                response = false,
                options = '';

            $.ajax({
                url: url,
                async: false,
                success: function (data) {
                    if (data) {
                        response = data;
                        response.forEach(function (msisdn) {
                            options += "<option value='" + msisdn.msisdn + "'>" + msisdn.msisdn + "</option>";
                        });
                    }
                }
            });
            $('#' + defaultValues.editForms.processor.formPortsId).html(options);

        }

    },
    setOutlookUsers = function () {
        var deviceId = $('#' + defaultValues.editForms.processor.formPivotId).val();
        if (deviceId > 0) {
            var url = "/" + userName + '/devices/Azure/outlook/users/' + deviceId,
                response = false,
                options = '';
            $.ajax({
                url: url,
                async: false,
                success: function (data) {
                    if (data) {
                        response = data;
                        response.forEach(function (user) {
                            options += "<option value='" + user.id + "'>" + user.email + "</option>";
                        });
                    }
                }
            });
            $('#' + defaultValues.editForms.processor.formPortsLabel).html('Select User(s)');
            $('#' + defaultValues.editForms.processor.formPortsId).html(options);
            $('#' + defaultValues.editForms.processor.formPortsBlock).css('display', 'block');
            $('#' + defaultValues.editForms.processor.formPortsId).attr('required', 'required');
        }

    },

    setAzureDeviceOptions = function () {
        var devices = getAutoScanIPDevices(), // get scan devices
            options = '';
        for (i = 0; i < devices.length; i++) {
            options += "<option value='" + devices[i].device_id + "'>" + devices[i].device_type + "(" + devices[i].hostname + ")" + "</option>";
        }

        $('#' + defaultValues.editForms.processor.formPivotId).html(options);
    },
    /*
    * Get User IP SCAN Device
    * */
    setAutoScanDevicesOptions = function () {

        setAzureDeviceOptions();
        getSubscriptionID();
    },
    /*
    * Get User IP SCAN Device
    * */
    setVTDevicesOptions = function () {

        var devices = getVTDevices(), // get scan devices
            options = '';
        for (i = 0; i < devices.length; i++) {
            options += "<option value='" + devices[i].device_id + "'>" + devices[i].device_type + "(" + devices[i].hostname + ")" + "</option>";
        }

        $('#' + defaultValues.editForms.processor.formSourceId).html(options);
    },

    /*
    * Set MSISDN Dropdown
    * */
    getSubscriptionID = function () {

        var deviceId = $('#' + defaultValues.editForms.processor.formPivotId).val(),
            options = '';

        if (deviceId > 0) {

            var subscriptions = getAzureSubscription(deviceId);

            if (subscriptions) {
                subscriptions.forEach(function (sub) {
                    options += "<option value='" + sub.subscriptionId + "~" + deviceId + "'>" + sub.name + "</option>"; //
                });
            }

            $('#' + defaultValues.editForms.processor.formOptionId).html(options);

        }

    },

    //get ips of virtual machies
    getVirtualMachinesIPs = function (subscriptionId) {
        vmHtml = getVirtualMachines(subscriptionId);
        $('#' + defaultValues.editForms.processor.formPortsId).html(vmHtml);
    },

    //get Azure virtual machines 
    getVirtualMachines = function (subscriptionId) {

        var value, //defaults 
            vmHtml = "",
            virtual_machines = [];

        value = subscriptionId.split("~");

        virtual_machines = getazureVirtualMachines(value[1], value[0]);


        if (virtual_machines.length > 0) {

            virtual_machines.forEach(function (vm) {
                vmHtml += "<option value='" + vm.value + "'>" + vm.name + "</option>"; //
            });

        }

        return vmHtml;
    },


    /*
    * get Select Dropdown Options HTML
    * */
    getOptions = function (options, selectedArray) {
        write_console('selected array');
        write_console(selectedArray);
        selectedArray = selectedArray ? selectedArray : [];
        var html = "";
        html += "<option value=''>Select Option</option>";

        options.forEach(function (option) {
            var selected = '';
            write_console(option.id);
            if (selectedArray.includes(option.id.toString())) {
                selected = 'selected';
            }
            html += "<option value='" + option.id + "' " + selected + ">" + option.name + "</option>";
        });
        return html;
    },

    /*
    * Open Start Operator Modal
    * */
    openEditStartOperatorModal = function (operatorId, operatorData) {
        var activeType = defaultValues.operatorTypes.find(function (elem) {
                return elem.name === operatorData.operatorTypes;
            }),
            formInformation = defaultValues.editForms.start;
        operatorData.properties.title = operatorData.properties.title.replace(activeType.icon, "");

        if (operatorData) {
            var titleHtml = getPropertyHtml("title", operatorData.properties.title);

            $("#" + formInformation.formOperatorId).val(operatorId);
            $("#" + formInformation.formTitleId).html(titleHtml);
            $("#" + formInformation.modalId).modal("toggle");
        }
    },

    /*
    * Open Start Operator Modal
    * */
    openEditProcessorOperatorModal = function (operatorId, operatorData) {
        var activeType = defaultValues.operatorTypes.find(function (elem) {
                return elem.name === operatorData.operatorTypes;
            }),
            formInformation = defaultValues.editForms.processor;
        operatorData.properties.title = operatorData.properties.title.replace(activeType.icon, "");

        if (operatorData) {
            var titleHtml = getOptions(defaultValues.rules);
            $("#" + formInformation.formTitleId).html(titleHtml);

            $("#" + formInformation.formOperatorId).val(operatorId);
            $("#" + formInformation.formTitleId).val(operatorData[formInformation.formInputName]);

            setTemplate();

            $("#" + formInformation.formRuleValueId).val(operatorData.ruleValue);
            $("#" + formInformation.modalId).modal("toggle");
        }
    },
    /*
    * Open Action Operator Modal
    * */
    openEditActionOperatorModal = function (operatorId, operatorData) {
        var activeType = defaultValues.operatorTypes.find(function (elem) {
                return elem.name === operatorData.operatorTypes;
            }),
            formInformation = defaultValues.editForms.action;
        operatorData.properties.title = operatorData.properties.title.replace(activeType.icon, "");
        if (operatorData) {
            var titleHtml = getOptions(defaultValues.actions);
            $("#" + formInformation.formOperatorId).val(operatorId);
            $("#" + formInformation.formTitleId).html(titleHtml);
            $("#" + formInformation.formTitleId).val(operatorData[formInformation.formInputName]);
            if (operatorData["paramValue"]) {
                setActionParam(operatorData["paramValue"]);
            }

            $("#" + formInformation.modalId).modal("toggle");
        }
    },
    /*
    * Open Device Operator Modal
    * */
    openEditDeviceOperatorModal = function (operatorId, operatorData) {

        var activeType = defaultValues.operatorTypes.find(function (elem) {
                return elem.name === operatorData.operatorTypes;
            }),
            getdeviceType,
            formInformation = defaultValues.editForms.device;
        operatorData.properties.title = operatorData.properties.title.replace(activeType.icon, "");


        if (operatorData.deviceTypeTitle) {
            getdeviceType = operatorData.deviceTypeTitle;
            $("#" + defaultValues.editForms.device.deviceType).val(getdeviceType);
        } else {
            getdeviceType = $("#" + defaultValues.editForms.device.deviceType).children("option:selected").html();
        }

        defaultValues.devices = setTypeDevices(getdeviceType);

        if (operatorData) {
            var deviceId = operatorData[formInformation.formInputName];
            var activeDevice = defaultValues.devices.find(device => device.id == deviceId);

            if (activeDevice || operatorData[formInformation.formInputName] == "") {
                if (defaultValues.devices.length > 0) {
                    $("#" + formInformation.formOperatorId).val(operatorId);
                    $("#" + formInformation.formTitleId).val(operatorData[formInformation.formInputName]);

                    var selectedValHtml = $('#' + defaultValues.editForms.device.formTitleId).children("option:selected").html();
                    policies = getDevicePolicies(selectedValHtml);
                    $("#" + defaultValues.editForms.device.formPolicyId).html(policies);
                    $("#" + formInformation.formPolicyId + " select").val(operatorData[formInformation.formPolicyName]);
                    $("#" + formInformation.modalId).modal("toggle");
                } else {
                    alert('Right now no Device is Active');
                }
            } else {
                alert("Right Now the Device Is not Live so You Can't Edit it");
            }
        }
    },


    setTypeDevices = function (deviceType) {

        $('#' + defaultValues.editForms.device.deviceActionBlock).css('display', 'block');

        switch (deviceType) { //check case

            case 'Firewall Devices' :
                defaultValues.devices = getActiveDevices();
                break;

            case 'Scan Devices' :
                defaultValues.devices = getScanDevices();
                break;
        }

        $('#' + defaultValues.editForms.device.formTitleId).html(getOptions(defaultValues.devices));

        return defaultValues.devices;

    },

    /*
    * It will set up the devices drop down for selected device type
    * */
    getSelectedDevliceType = function () {

        $('#' + defaultValues.editForms.device.deviceAction).css('display', 'none');
        var deviceType = $('#' + defaultValues.editForms.device.deviceType).find(":selected").val();
        setTypeDevices(deviceType);
    },

    /*
    * Open Device Operator Modal
    * */
    openEditPlaybookModal = function () {
        var formInformation = defaultValues.editForms.playbook;
        $("#" + formInformation.modalId).modal("toggle");
    },
    /*
    * Delete Selected Operator
    * */
    deleteSelectedOperator = function (e, form) {
        e.preventDefault();
        if (confirm("Are you Sure?")) {
            var formInformation = defaultValues.editForms[form];
            $flowchart.flowchart("deleteSelected");
            $("#" + formInformation.formId)[0].reset();
            $("#" + formInformation.modalId).modal("hide");
        }

    },
    /*
    * Make Operator Title by parsing rule template
    * */
    parseRuleTemplate = function (template, values = {}) {
        var codes = {
            value: "[value]"
        };
        for (var key in codes) {
            if (codes.hasOwnProperty(key) && values.hasOwnProperty(key)) {
                template = template.replace(codes[key], values[key], 'g');
            }
        }
        return template;
    },
    /*
    * It will remove and replace all the html special characters with their respective string
    * @param: str
    * @return string
    * */
    decodeHtml = function (str) {
        var map =
            {
                '&amp;': '&',
                '&lt;': '<',
                '&gt;': '>',
                '&quot;': '"',
                '&#039;': "'"
            };
        return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (m) {
            return map[m];
        });
    },
    /*
    * It will return policies of a specific device
    * @param: Device Name
    * @return Device Policies
    * */
    getDevicePolicies = function (deviceName) {
        var policy = "";
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: "/getDevicePolicy/" + deviceName,
            data: {},
            async: false,
            timeout: 5000,
            success: function (data) {
                if (data.policy_in[deviceName]) {
                    policy = data.policy_in[deviceName];
                }
            }
        });
        return policy;
    },
    /*
    * It will return all the active devices
    * */
    getActiveDevices = function () {
        var activeDevices = [];
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: "/" + userName + "/get-active-devices",
            data: {},
            async: false,
            success: function (data) {
                if (data.devices) {
                    activeDevices = data.devices;
                }
            }
        });
        return activeDevices;
    },

    /*
     * It will return all the cloud devices
     * */
    getScanDevices = function () {
        var scanDevices = [];
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: "/" + userName + "/scanDevices",
            data: {},
            async: false,
            success: function (data) {
                if (data.devices) {
                    scanDevices = data.devices;
                }
            }
        });
        return scanDevices;
    },
    /*
     * It will return all the cloud devices
     * */
    getVTDevices = function () {
        var scanDevices = [];
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: "/" + userName + "/devices/get-list",
            data: {
                'type': [
                    'VirusTotal'
                ]
            },
            async: false,
            success: function (data) {
                if (data.devices) {
                    scanDevices = data.devices;
                }
            }
        });
        return scanDevices;
    },

    /*
    * It will return all the Telecom devices
    * */
    getTelecomDevices = function () {
        var activeDevices = [];
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: "/" + userName + "/get-telecom-devices",
            data: {},
            async: false,
            success: function (data) {
                if (data) {
                    activeDevices = data.devices;
                }
            }
        });
        return activeDevices;
    },

    /*
    * It will return all the Telecom devices
    * */
    getAutoScanIPDevices = function () {

        var url = "/" + userName + '/get-cloud-devices', // cloud devices 
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

        if (subscriptionId != 'undefined') {

            var url = "/" + userName + '/virtualMachinePublicIps/' + subscriptionId + "/" + deviceId,
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

        }


    },

    /*
    * It will set the parameter for an action if needed
    * like for email we need email but nothing in all other cases
    * */
    setActionParam = function (paramValue = "") {
        var value = $("#" + defaultValues.editForms.action.formTitleId).val(),
            activeAction = defaultValues.actions.find(elem => elem.id == value),
            html = '';
        if (activeAction) {
            switch (activeAction.name) {
                case "Email":
                    write_console(paramValue);
                    html = getPropertyHtml(activeAction.paramField, paramValue, "Email", 'email');
                    $("#" + defaultValues.editForms.action.paramsBlock).html(html);
                    break;
                // case "Ticket":
                //     write_console(paramValue);
                //     html = getAgentsSelect('Select Agent(s)', activeAction.paramField, paramValue, activeAction.paramClass);
                //     $("#" + defaultValues.editForms.action.paramsBlock).html(html);
                //     $('.' + activeAction.paramClass).select2();
                //     break;
                default:
                    $("#" + defaultValues.editForms.action.paramsBlock).html("");
            }
        }
    },
    /*
    * It will set up the policy drop down for selected devlice
    * */
    getSelectedDevlicePolicy = function () {
        var deviceName = $('#' + defaultValues.editForms.device.formTitleId).children("option:selected").html(),
            policies = getDevicePolicies(deviceName);
        $('#' + defaultValues.editForms.device.formPolicyId).html(policies);
    },
    /*
    * getPlaybookRules
    * Make a request to get the rules from the database
    * */
    getPlaybookRules = function () {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: '/' + userName + '/get-playbook-rules',
            type: 'get',
            success: function (data) {
                if (data.rules) {
                    defaultValues.rules = data.rules;
                }
            }
        });
    },
    /*
    * getAgents
    * Make a request to get the agents from the database
    * */
    getAgentsSelect = function (title, selectName, values, classes) {
        var valueArray = values ? values.split(',') : [];
        var html = '';
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: '/' + userName + '/tickets/agents',
            type: 'get',
            async: false,
            success: function (data) {
                if (data) {
                    defaultValues.agents = data;
                    html += "<div class='form-group'>";
                    html += "<label class='control-label col-md-3'>" + title + "</label>\n";
                    html += "<div class='col-md-8'>\n";
                    html += "<select name='" + selectName + "' class='form-control " + classes + "' multiple='true' required>";
                    html += getOptions(defaultValues.agents, valueArray);
                    html += "</select>";
                    html += "</div>\n";
                    html += "</div>\n";
                }
            }
        });
        return html;
    },
    /*
    * ParsePlaybook
    * @param: playbookJson
    * Parse Playbook to make policies
    * @return: Policies
    * */
    parsePlaybook = function (playbookJson) {
        write_console('>>>>>>>>> IN parsePlaybook <<<<<<<<<<<<<');
        write_console(playbookJson);
        var policies = [];
        playbookOperators = playbookJson['operators'];
        playbookLinks = Object.values(playbookJson['links']);
        while (playbookLinks.length > 0) {
            parseOperator('start'); //Start Parsing from the starting poing
            policies.push(activePath);  //Push the result into the policies array
            write_console('>>>>>>>>>>>> ACTIVE PATH <<<<<<<<<<<<<<<<<<<<');
            write_console(activePath);
            activePath = [];
        }
        blockAction = defaultValues.actions.find(elem => elem.name === 'Block');    //Get the block action
        write_console('>>>>>>>>>>>>> Before Block Action <<<<<<<<<<<<');
        write_console(policies);

        policies = policies.filter(function (elem) {    // Filter all the operator that are making meaning
            var decisionOperator = elem[elem.length - 1].operator;   // Like they must have a Device at the end in case of block
            if (decisionOperator.operatorTypes === 'device') {  // Or an Action in case of others
                return true;
            } else if (decisionOperator.operatorTypes === 'action') {
                if (decisionOperator.actionId && decisionOperator.actionId != blockAction.id) {
                    return true;
                }
            }
        });
        write_console('>>>>>>>>>>>>> Before extractMeaningfullPolicies <<<<<<<<<<<<');
        write_console(policies);

        var meaningfullPolicies = extractMeaningfullPolicies(policies);
        var groupedPolicies = groupPolicies(meaningfullPolicies);

        write_console('>>>>>>>>>>>>> Final Policies <<<<<<<<<<<<');
        write_console(groupedPolicies);
        return groupedPolicies;
    },
    /*
    * Parser Part: Parse Operator
    * It will push the operator to the current active Policy
    * and check we should stop or not
    * */
    parseOperator = function (key, link = false) {
        write_console('>>>>>>>>>>>>>> IN parseOperator <<<<<<<<<<<<<<<');
        write_console(key);
        write_console(link);
        var operator = playbookOperators[key],  // Get the Operator
            obj = {
                operator: operator
            };
        if (link) {
            activePath[activePath.length - 1].link = link;
        }
        activePath.push(obj);  // Push the operator to the current active path
        var operatorLinks = playbookLinks.filter(link => link.fromOperator === key);    // Get all the links of particular operator
        if (operatorLinks.length === 0) {   //  Check if it is end or not
            var linkIndex = playbookLinks.findIndex(elem => JSON.stringify(elem) === JSON.stringify(link));
            playbookLinks.splice(linkIndex, 1); // If end then remove the current link to the action
        } else {
            var activeLink = operatorLinks[0];  // if it has links then only take the first one and use it to get next one
            var nextOperator = playbookOperators[activeLink['toOperator']];
            if (nextOperator.operatorTypes == 'device') {

                activePath[activePath.length - 1].link = link;
                activePath.push({
                    operator: nextOperator
                });
                var activeLinkIndex = playbookLinks.findIndex(elem => JSON.stringify(elem) === JSON.stringify(activeLink));
                playbookLinks.splice(activeLinkIndex, 1);
            } else {
                parseOperator(activeLink['toOperator'], activeLink);
            }
        }
    },
    /*
    * Parser Part: Extract Meaningfull Policies
    * After making up the arrays of policies of the chart we need to convert them to a meaningfull policy to store in database
    * @param: policies:array
    * @return: mearningfull policies:array
    * */
    extractMeaningfullPolicies = function (policies) {
        write_console('>>>>>>>>>>>> IN extractMeaningfullPolicies <<<<<<<<<<<');
        write_console(policies);

        var meaningfullPolicies = [];
        if (policies.length) {
            var actions = {};
            defaultValues.actions.forEach(function (action) {
                actions[action.id] = action;
            });
            policies.forEach(function (policy) {
                var currentPolicy = {},
                    policyParams = {},
                    policyActions = {},
                    addPolicy = true;
                policy.forEach(function (policyItem) {

                    switch (policyItem.operator.operatorTypes) {
                        case 'start':
                            break;
                        case 'processor':
                            var source = policyItem.operator.properties.outputs[policyItem.link.fromConnector].source;
                            if (source) {
                                policyParams['rule_id'] = policyItem.operator.ruleId ? policyItem.operator.ruleId : '';
                                policyParams['rule_name'] = policyItem.operator.ruleName ? policyItem.operator.ruleName : '';
                                if (policyItem.operator.ruleValue) {
                                    policyParams['ip_percentage'] = policyItem.operator.ruleValue;
                                }
                                policyParams['operator'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].operator;


                                switch (policyParams['rule_name']) {
                                    case 'Check Threshold':
                                        policyParams['src'] = source;
                                        policyParams['port'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].port;
                                        policyParams['pivot'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].pivot;

                                        break;
                                    case 'Check Swapped Status':
                                        policyParams['src'] = source;
                                        policyActions['msisdn'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].port;
                                        currentPolicy['device_id'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].pivot;

                                        break;

                                    case 'IP Auto Scan':
                                        policyParams['src'] = source;
                                        policyParams['subscription'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].subscription;
                                        policyParams['virtual_machines_ips'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].virtual_machines;
                                        policyParams['manualIPAdrress'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].manualIPAdrress;
                                        policyParams['source_device_id'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].pivot;
                                        break;

                                    case 'Parse Emails':
                                        policyParams['src'] = 'azure_outlook';
                                        policyParams['scan_device'] = source;

                                        policyParams['azure_device'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].pivot;
                                        policyParams['azure_users'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].azure_users;
                                        policyParams['parse_email_for'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].parse_email_for;
                                        break;
                                }

                            } else {
                                policyParams['rule_id'] = policyItem.operator.ruleId ? policyItem.operator.ruleId : '';
                                policyParams['rule_name'] = policyItem.operator.ruleName ? policyItem.operator.ruleName : '';
                                policyParams['operator'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].operator;
                                policyParams['src'] = 'azure_directory';
                                policyParams['azure_device'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].pivot;
                                policyParams['azure_users'] = policyItem.operator.properties.outputs[policyItem.link.fromConnector].azure_users;
                            }
                            break;
                        case 'action':
                            if (policyItem.operator.actionId) {
                                var actionName = actions[policyItem.operator.actionId].name.toLowerCase();
                                switch (actionName) {
                                    case 'email':
                                        policyActions['action'] = actionName;
                                        if (policyItem.operator.paramValue) {
                                            policyActions[actionName] = policyItem.operator.paramValue;
                                        }
                                        addPolicy = true;
                                        break;
                                    // case 'ticket':
                                    //     policyActions['action'] = actionName;
                                    //     if (policyItem.operator.paramValue) {
                                    //         policyActions[actionName] = policyItem.operator.paramValue;
                                    //     }
                                    //     break;
                                    case 'block':
                                        policyActions['action'] = actionName;
                                        addPolicy = false;
                                        break;
                                    case 'blacklist':
                                        policyActions['action'] = actionName;
                                        addPolicy = true;
                                        break;
                                    case 'scan':
                                        policyActions['action'] = actionName;
                                        addPolicy = false;
                                        break;
                                    case 'notification':
                                        policyActions['action'] = actionName;
                                        policyActions['notification'] = true;
                                        addPolicy = true;
                                        break;
                                    case 'allow traffic':
                                        addPolicy = false;
                                        break;
                                    default:
                                        policyActions['action'] = actionName;
                                        addPolicy = false;
                                }
                            }
                            break;
                        case 'device':
                            var activeType = defaultValues.operatorTypes.find(elem => elem.name === 'device');
                            policyActions['action_in'] = policyItem.operator.properties.title.replace(activeType.icon, "");
                            currentPolicy['device_id'] = policyItem.operator.deviceId ? policyItem.operator.deviceId : '';
                            currentPolicy['policy'] = policyItem.operator.policy ? policyItem.operator.policy : '';
                            addPolicy = true;
                            break;
                    }
                });
                if (addPolicy) {
                    currentPolicy.params = policyParams;
                    currentPolicy.actions = policyActions;
                    meaningfullPolicies.push(currentPolicy);
                }
            });
        }

        write_console('>>>>>>>>>>>> Meaningfull Policies <<<<<<<<<<<');
        write_console(meaningfullPolicies);

        return meaningfullPolicies;
    },
    /*
    * Parser Part: Group Similar Policies
    * */
    groupPolicies = function (policies) {
        write_console(' >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> groupPolicies Before <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        write_console(policies);
        var groupedPolicies = Object.values(policies.reduce((result, {
            params,
            actions,
            device_id,
            policy
        }) => {
            var newKey = JSON.stringify(params);
            // Create new group
            if (!result[newKey]) result[newKey] = {
                params: params,
                actions: []
            };
            var data = {

                actions: actions
            };
            if (device_id) {
                data.device_id = device_id;
            }
            if (policy) {
                data.policy = policy;
            }
            // Append to group
            result[newKey].actions.push(data);
            return result;
        }, {}));
        write_console(' >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> groupPolicies After <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        write_console(policies);
        return groupedPolicies;
    },
    /*
    * Get User SPlunk Device
    * */
    getSplunkDevice = function () {
        var splunk = null;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: '/' + userName + '/get-user-splunk',
            type: 'get',
            async: false,
            success: function (data) {
                splunk = data.splunk;
            }
        });
        return splunk;
    },

    getJSONObject = function (jsonString) {
        jsonString = decodeHtml(jsonString);
        jsonString = jsonString.replace(/\:null/gi, "\:\"\"");
        jsonString = JSON.parse(jsonString);
        return jsonString;
    },

    /*
    * Convert Form Data into object
    * */
    getFormData = function ($form) {
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            if (n['name'].includes('[]')) {
                if (!indexed_array[n['name']]) {
                    indexed_array[n['name']] = [];
                }
                indexed_array[n['name']].push(n['value']);
            } else {
                indexed_array[n['name']] = n['value'];

            }
        });

        return indexed_array;
    },
    loaderStart = function () {
        $('input, select, button').attr('disabled', 'disabled');
    },
    loaderStop = function () {
        $('input, select, button').attr('disabled', false);
    };
$(document).ready(function () {
    init();
    //Define the Flowchart container
    var $container = $flowchart.parent(),
        data = {};
    if (playbook) {
        playbook = getJSONObject(playbook);
        data = playbook.playbook_json;
        $('#' + defaultValues.editForms.playbook.idField).val(playbook.id);
        $('#' + defaultValues.editForms.playbook.nameField).val(playbook.name);
        $('#' + defaultValues.editForms.playbook.statusField).attr("checked", (playbook.active == "1" ? true : false));
    } else {
        $('#' + defaultValues.editForms.playbook.idField).val("");
        $('#' + defaultValues.editForms.playbook.nameField).val("");
        $('#' + defaultValues.editForms.playbook.statusField).attr("checked", false);
        var activeType = defaultValues.operatorTypes.find(function (elem) {
            return elem.name === 'start';
        });
        data = { //Initial Data for Flowchart
            title: defaultValues.title,
            operators: {
                start: {
                    top: 30,
                    left: 20,
                    operatorTypes: 'start',
                    properties: {
                        title: activeType.icon + activeType.title,
                        inputs: {},
                        outputs: {
                            start_output: {
                                label: activeType.outputLabelPrefix
                            },
                        },

                        class: defaultValues.operatorClass + " " + activeType.class
                    }
                },
            },
            links: {}
        };

    }

    //Make up the Flowchart
    $flowchart.flowchart({
        data: data,
        multipleLinksOnInput: true,
        multipleLinksOnOutput: true,
        linkWidth: defaultValues.linkWidth,
        defaultLinkColor: defaultValues.linkColor,
        grid: defaultValues.playbookGrid,
        onOperatorSelect: function (operatorId) {
            // showEditOperatorModal(operatorId);
            return true;
        },
        /*
        * onLinkCreate: Call when a new link is created
        * @param: linkId
        * @param: linkData
        * @return: Boolean
        * Implement the rules for creating new links
        * 1- A Device can only be connected to an Action
        * */
        onLinkCreate: function (linkId, linkData) {
            var toOperatorData = $flowchart.flowchart("getOperatorData", linkData.toOperator),
                fromOperatorData = $flowchart.flowchart("getOperatorData", linkData.fromOperator);
            if (fromOperatorData && toOperatorData) {
                if (toOperatorData.operatorTypes === "device") {
                    if (fromOperatorData.operatorTypes === "action") {
                        return true;
                    } else {
                        alert("Device can only Connect to an Action");
                        return false;
                    }
                } else if (fromOperatorData.operatorTypes == "action" && toOperatorData.operatorTypes == "action") {
                    alert("Action Can't be Connected to Action");
                    return false;

                } else {
                    return true;
                }
            } else {
                return false;
            }
        },
        /*
        * onOperatorCreate: Call when a new link is created
        * @param: operatorId
        * @param: operatorData
        * @return: Boolean
        * */
        onOperatorCreate: function (operatorId, operatorData) {
            if (operatorData.operatorTypes == 'start') {  // There can be only 1 start operator in the rule
                var chart = $flowchart.flowchart("getData")
                operators = Object.values(chart.operators);
                var startOperatorIndex = operators.findIndex(elem => elem.operatorTypes == 'start');
                if (startOperatorIndex == -1) {
                    return true;
                } else {
                    alert('There can be only 1 start operator');
                    return false;
                }
            } else if (operatorData.operatorTypes && operatorData.operatorTypes == 'device' && operatorData.deviceTypeTitle) {

                //setTypeDevices(operatorData.deviceTypeTitle);
                //defaultValues.devices = getActiveDevices();
                if (defaultValues.devices.length == 0 && operatorData.deviceId == "") {
                    alert('Right Now No Device is Active');
                    return false;
                    //return true;
                } else {
                    return true;
                }
            } else {
                return true;
            }

        },
        /*
        * Select The operator on Mouse over
        * */
        onOperatorMouseOver(operatorId) {
            $flowchart.flowchart("selectOperator", operatorId);
            return true;
        },

    });
    // Flowchart End
    // Make the Buttons Dragable to make operatos
    draggableOperators.draggable({
        cursor: "move",
        opacity: 0.7,
        appendTo: "body",
        zIndex: 1000,
        helper: function () {
            var $this = $(this);
            var data = getOperatorData($this);
            return $flowchart.flowchart("getOperatorElement", data);
        },
        stop: function (e, ui) {
            var $this = $(this);
            var elOffset = ui.offset;
            var containerOffset = $container.offset();
            if (elOffset.left > containerOffset.left &&
                elOffset.top > containerOffset.top &&
                elOffset.left < containerOffset.left + $container.width() &&
                elOffset.top < containerOffset.top + $container.height()) {

                var flowchartOffset = $flowchart.offset();

                var relativeLeft = elOffset.left - flowchartOffset.left;
                var relativeTop = elOffset.top - flowchartOffset.top;

                var positionRatio = $flowchart.flowchart("getPositionRatio");
                relativeLeft /= positionRatio;
                relativeTop /= positionRatio;

                var data = getOperatorData($this);
                data.left = relativeLeft;
                data.top = relativeTop;

                $flowchart.flowchart("addOperator", data);
            }
        }

    });

    /*
    * Context Menu Implemented
    * */
    // get all types classes except start
    var classes = '',
        types = defaultValues.operatorTypes.filter(elem => elem.name != "start");
    for (var i = 0; i < types.length; i++) {
        classes += "." + types[i].class + ' ';
        if (i != types.length - 1) {
            classes += ',';
        }
    }
    // Initialize the Right Click Menu on Operator
    $.contextMenu({
        selector: classes,
        items: {
            "Edit": {
                name: "Edit",
                callback: function (key, opt) {
                    var operatorId = $flowchart.flowchart("getSelectedOperatorId");
                    showEditOperatorModal(operatorId);

                }
            },
            "delete": {
                name: "Delete",
                callback: function (key, opt) {
                    if (confirm('Are you sure?')) {
                        $flowchart.flowchart("deleteSelected");
                    }
                }

            },
        }
    });
    var startType = defaultValues.operatorTypes.find(elem => elem.name == "start");

    $.contextMenu({
        selector: "." + startType.class,
        items: {
            "Edit": {
                name: "Edit",
                callback: function (key, opt) {
                    var operatorId = $flowchart.flowchart("getSelectedOperatorId");
                    showEditOperatorModal(operatorId);

                }
            },
        }
    });
    // Initialize the Right CLick Menu on links
    $.contextMenu({
        selector: ".flowchart-link",
        items: {
            "Edit": {
                name: "Add Processor",
                callback: function (key, opt) {

                    var linkId = $(this).data("link_id"),
                        chart = $flowchart.flowchart("getData"),
                        newOperator = getNewOperator(1, 1, "processor"),
                        linkData = chart.links[linkId],
                        fromOperatorData = $flowchart.flowchart("getOperatorData", linkData.fromOperator);
                    newOperator.top = fromOperatorData.top + 120;
                    newOperator.left = fromOperatorData.left + 140;
                    var newOperatorId = $flowchart.flowchart("addOperator", newOperator),
                        newLink1 = {
                            fromOperator: linkData.fromOperator,
                            fromConnector: linkData.fromConnector,
                            fromSubConnector: linkData.fromSubConnector,
                            toOperator: newOperatorId,
                            toConnector: "processor_input_0",
                            toSubConnector: 0
                        },
                        newLink2 = {
                            fromOperator: newOperatorId,
                            fromConnector: "processor_output_0",
                            fromSubConnector: 0,
                            toOperator: linkData.toOperator,
                            toConnector: linkData.toConnector,
                            toSubConnector: linkData.toSubConnector
                        };
                    $flowchart.flowchart("addLink", newLink1);
                    $flowchart.flowchart("addLink", newLink2);
                    $flowchart.flowchart("deleteLink", linkId);


                }
            },
            "delete": {
                name: "Delete",
                callback: function (key, opt) {
                    var linkId = $(this).data("link_id");
                    if (confirm('Are you sure?')) {
                        $flowchart.flowchart("deleteLink", linkId);
                    }
                }

            },
        }
    });
    // Submit code for Start Operator Form
    $('#' + defaultValues.editForms.start.formId).submit(function (e) {
        e.preventDefault();
        var formData = $("#" + defaultValues.editForms.start.formId).serializeArray(),
            operatorObject = formData.find(elem => elem.name == "operatorId"),
            operatorId = operatorObject.value,
            operatorData = $flowchart.flowchart("getOperatorData", operatorId),
            activeType = defaultValues.operatorTypes.find(elem => elem.name == operatorData.operatorTypes),
            title = formData.find(elem => elem.name == 'title');
        //Change the Title of the operator
        operatorData.properties.title = activeType.icon + title.value;
        //Save te.preventDefault();he Operator
        $flowchart.flowchart("setOperatorData", operatorId, operatorData);
        $('#' + defaultValues.editForms.start.formId)[0].reset();
        $('#' + defaultValues.editForms.start.modalId).modal("hide");
    });
    // Submit code for Processor Operator Form
    $('#' + defaultValues.editForms.processor.formId).submit(function (e) {


        var formData = $(this).serializeArray(),
            operatorObject = formData.find(elem => elem.name == "operatorId"),
            operatorId = operatorObject.value,
            ruleObject = formData.find(elem => elem.name == "ruleId"),
            ruleId = ruleObject.value,
            valueObject = formData.find(elem => elem.name == "ruleValue"),
            ruleValue = valueObject.value,
            sourceObject = formData.find(elem => elem.name == "source"),
            sourceValue = sourceObject ? sourceObject.value : '',
            pivotObject = formData.find(elem => elem.name == "pivot"),
            pivotValue = pivotObject ? pivotObject.value : '',
            portsObject = formData.filter(elem => elem.name == "port[]"),
            portValues = portsObject ? portsObject.map(elem => elem.value) : '',
            manualIPObject = formData.filter(elem => elem.name == "manualIPAdrress[]"),
            manualValues = manualIPObject ? manualIPObject.map(elem => elem.value) : '',
            parseEmailObject = formData.filter(elem => elem.name == "parse_email_options[]"),
            parseEmailValues = parseEmailObject ? parseEmailObject.map(elem => elem.value) : '',
            activeRule = defaultValues.rules.find(rule => rule.id == ruleId),
            operatorData = $flowchart.flowchart("getOperatorData", operatorId),
            activeType = defaultValues.operatorTypes.find(elem => elem.name == operatorData.operatorTypes),

            subscriptionObject = formData.find(elem => elem.name == "subscriptionId"),
            subscriptionValue = subscriptionObject ? subscriptionObject.value : '';


        //Change the Title of the operator
        operatorData.properties.outputs = {};
        operatorData.ruleId = ruleId;
        operatorData.ruleValue = ruleValue;
        operatorData.ruleName = activeRule.name;
        operatorData.source = sourceValue;
        operatorData.pivot = pivotValue;
        operatorData.subscriptionId = subscriptionValue;

        switch (activeRule.name) {
            case 'Check Threshold':
                operatorData.azure_users = '';
                operatorData.virtual_machines = '';
                operatorData.port = portValues.join(',');
                operatorData.msisdn = '';
                operatorData.virtual_machines = '';
                operatorData.parse_email_for = '';

                break;
            case 'Check Swapped Status':
                operatorData.azure_users = '';
                operatorData.virtual_machines = '';
                operatorData.msisdn = portValues.join(',');
                operatorData.virtual_machines = '';
                operatorData.port = '';
                operatorData.parse_email_for = '';

                break;

            case 'IP Auto Scan':
                operatorData.azure_users = '';
                operatorData.virtual_machines = portValues.join(',');
                operatorData.msisdn = '';
                operatorData.port = '';
                operatorData.manualIPAdrress = manualValues.join(',');
                operatorData.parse_email_for = '';
                break;
            case 'Parse Emails':
                operatorData.virtual_machines = '';
                operatorData.msisdn = '';
                operatorData.port = '';
                operatorData.azure_users = portValues.join(',');
                operatorData.parse_email_for = parseEmailValues.join(',');

                break;
            case 'Check User Activity':
                operatorData.virtual_machines = '';
                operatorData.msisdn = '';
                operatorData.port = '';
                operatorData.azure_users = portValues.join(',');
                operatorData.parse_email_for = parseEmailValues.join(',');

                break;

        }

        for (var i = 0; i < activeRule.cases.length; i++) {
            operatorData.properties.outputs[activeType.outputNamePrefix + i] = {
                label: activeRule.cases[i].label,
                operator: activeRule.cases[i].operator,
                source: sourceValue,
                pivot: pivotValue,
                port: portValues.join(','),
                subscription: subscriptionValue,
                manualIPAdrress: manualValues.join(','),
                virtual_machines: operatorData.virtual_machines,
                azure_users: operatorData.azure_users,
                parse_email_for: operatorData.parse_email_for
            };
        }

        var title = parseRuleTemplate(activeRule.title_template, {
            value: ruleValue
        });
        operatorData.properties.title = activeType.icon + title;
        //Save the Operator
        $flowchart.flowchart("setOperatorData", operatorId, operatorData);

        $("#" + defaultValues.editForms.processor.modalId).modal("hide");
    });
    // Submit code for Action Form
    $('#' + defaultValues.editForms.action.formId).submit(function (e) {
        e.preventDefault();
        var formData = $(this).serializeArray(),
            operatorObject = formData.find(elem => elem.name == "operatorId"),
            operatorId = operatorObject.value,
            actionObject = formData.find(elem => elem.name == "actionId"),
            actionId = actionObject.value,
            activeAction = defaultValues.actions.find(action => action.id == actionId),
            operatorData = $flowchart.flowchart("getOperatorData", operatorId),
            activeType = defaultValues.operatorTypes.find(elem => elem.name == operatorData.operatorTypes);


        operatorData.properties.title = activeType.icon + activeAction.name;
        operatorData.actionId = actionId;
        write_console(formData);
        for (var i = 0; i < defaultValues.actions.length; i++) {
            operatorData.properties.class = operatorData.properties.class.replace(defaultValues.actions[i].class, '');
        }

        write_console(formData);

        operatorData.properties.class += ' ' + activeAction.class;
        if (!activeAction.output) {
            operatorData.properties.outputs = {};
        } else {
            operatorData.properties.outputs = {
                'block_in': {
                    label: activeAction.name + ' in'
                }
            };
        }

        if (activeAction.paramField) {
            var paramObject = formData.filter(elem => elem.name == activeAction.paramField),
                param = '',
                paramArray = [];
            if (activeAction.name != 'Ticket') {
                param = paramObject[0].value;
                operatorData['paramValue'] = param;
            } else {
                var serarator = '';
                paramObject.forEach(function (po) {
                    var selectedAgent = defaultValues.agents.find(elem => elem.id == po.value);
                    if (selectedAgent) {
                        param += (serarator + selectedAgent.name);
                        paramArray.push(po.value);
                        serarator = ', ';
                    }
                });
                operatorData['paramValue'] = paramArray.join(',');
            }

            write_console(paramObject);
        } else {
            operatorData['paramValue'] = '';
        }
        write_console(operatorData.properties);
        param = param ? param : '';
        operatorData.properties.inputs[Object.keys(operatorData.properties.inputs)[0]].label = param;
        //Save the Operator
        $flowchart.flowchart("setOperatorData", operatorId, operatorData);
        $('#' + defaultValues.editForms.action.modalId).modal("hide");
    });
    // Submit code for Device Operator Form
    $('#' + defaultValues.editForms.device.formId).submit(function (e) {

        e.preventDefault();
        var formData = $(this).serializeArray(),
            operatorObject = formData.find(elem => elem.name == "operatorId"),
            operatorId = operatorObject.value,

            deviceTypeObject = formData.find(elem => elem.name == "deviceTypeId"),
            deviceType = deviceTypeObject.value,

            deviceObject = formData.find(elem => elem.name == "deviceId"),
            deviceId = deviceObject.value,

            activeDevice = defaultValues.devices.find(device => device.id == deviceId),
            operatorData = $flowchart.flowchart("getOperatorData", operatorId),

            activeType = defaultValues.operatorTypes.find(elem => elem.name == operatorData.operatorTypes),
            deviceInputName = $('#' + defaultValues.editForms.device.formPolicyId + ' select').attr('name'),
            policyObject = formData.find(elem => elem.name == deviceInputName),
            policy = (policyObject) ? policyObject.value : '';
        write_console(policy);
        operatorData.properties.title = activeType.icon + activeDevice.name;
        operatorData.properties.inputs[Object.keys(operatorData.properties.inputs)[0]].label = policy;

        operatorData[defaultValues.editForms.device.deviceType] = deviceType;
        operatorData[defaultValues.editForms.device.formInputName] = deviceId;
        operatorData[defaultValues.editForms.device.formPolicyName] = policy;

        //Save the Operator
        $flowchart.flowchart("setOperatorData", operatorId, operatorData);
        $('#' + defaultValues.editForms.device.modalId).modal("hide");
    });

    // Submit Code for Playbook Save
    $('#' + defaultValues.editForms.playbook.formId).submit(function (e) {
        e.preventDefault();
        loaderStart();
        var url = $('#' + defaultValues.editForms.playbook.formId).attr('action'),
            data = {},
            id = $('#' + defaultValues.editForms.playbook.idField).val();
        data['chart'] = $flowchart.flowchart("getData");
        write_console('>>>>>>>>>>>>>>>>>>>> Chart <<<<<<<<<<<<<<<<<<<<<');
        write_console(data['chart']);
        data['policies'] = parsePlaybook(data['chart']);
        write_console('>>>>>>>>>>>>>>>>>>>> Policies <<<<<<<<<<<<<<<<<<<<<');
        write_console(data['policies']);

        if (id > 0) {
            data['id'] = id;
        }
        data['name'] = $('#' + defaultValues.editForms.playbook.nameField).val();
        if ($('#' + defaultValues.editForms.playbook.statusField).is(":checked")) {
            data['status'] = 1;
        } else {
            data['status'] = 0;
        }
        write_console(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: function (data) {
                if (data.success) {
                    $('#' + defaultValues.editForms.playbook.modalId).modal('toggle');
                    window.location = '/' + userName + '/playbooks/';
                    loaderStop();
                }
            }
        });
    });

    $('#' + defaultValues.editForms.action.modalId).on('hidden.bs.modal', function () {
        $('#' + defaultValues.editForms.action.paramsBlock).html('');
        $('#' + defaultValues.editForms.action.formId)[0].reset();

    });

    $('#' + defaultValues.editForms.processor.modalId).on('hidden.bs.modal', function () {
        $('#' + defaultValues.editForms.processor.formId)[0].reset();
    });

    $('#' + defaultValues.editForms.device.modalId).on('hidden.bs.modal', function () {
        $('#' + defaultValues.editForms.device.formId)[0].reset();
    });
    //Device Operator Send Email
    /*$('#' + defaultValues.editForms.device.formSendEmailCheckboxId).click(function (e) {
        if($(this).prop("checked") == true){
            $('#' + defaultValues.editForms.device.formSendEmailBlock).css('display','block');
        }
        else if($(this).prop("checked") == false){
            $('#' + defaultValues.editForms.device.formSendEmailBlock).css('display','none');
        }
    });*/
    $("#" + defaultValues.editForms.processor.formPortsCheckboxName).click(function () {
        if ($("#" + defaultValues.editForms.processor.formPortsCheckboxName).is(':checked')) {
            $("#" + defaultValues.editForms.processor.formPortsId + " > option").prop("selected", "selected");
            $("#" + defaultValues.editForms.processor.formPortsId).trigger("change");
        } else {
            $("#" + defaultValues.editForms.processor.formPortsId + " > option").removeAttr("selected");
            $("#" + defaultValues.editForms.processor.formPortsId).trigger("change");
        }
    });
    $('#' + defaultValues.editForms.processor.formSourceId).change(function () {

    });
});
