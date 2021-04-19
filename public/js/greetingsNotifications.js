/**
 * Created by   :  Ubaid Ullah
 * Project Name : BlockAPT
 * Product Name : PhpStorm
 * Date         : 1/10/2018 12:40 PM
 * File Name    :
 */
var handleDashboardGritterNotificationForBlockIp = function() {
        if (!sessionStorage.alreadyClicked) {
            sessionStorage.alreadyClicked = 1;
                $(window).load(function () {
                    setTimeout(function () {
                        $.gritter.add({
                            title: 'IP Attacks Notifications.',
                            text: 'Shield has blocked IPs with '+policy_percent+'% attack rate via '+policy_in+'. '+cloudFlareUrl,
                            image: '/images/logo_blue.png',
                            sticky: true,
                            time: '',
                            class_name: 'my-sticky-class'
                        });
                    }, 1000);
                });
        }
};
