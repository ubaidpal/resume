/**
 * Created by   : UbaidUllah
 * Project Name : BlockAPT
 * Product Name : PhpStorm
 * Date         : 5/18/2018 9:30 AM
 * File Name    :
 */
// white

var app = angular.module('IPAttacks', []).constant('url', []);


app.controller('Controller', function ($scope, $http, url){

    $scope.url = [

    userStatus,
    createIpAttackBackup,

    ];
    

    $scope.deviceCheck = function deviceCheck($user_id ,$status) { // check via API call if the Device is active or Not

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $http({
            method: 'get',
            url: $scope.url[0],
            params: { "_token": "{{ csrf_token() }}",user_id: $user_id , status:$status}
        }).success(function (response) {
            if (response) {
                window.location.replace(response);
            }
        });
    };

    $scope.createIpBackup = function createIpBackup($id,$user_meta_days) { // check via API call if the Device is active or Not
        $('#warning_msg').text('IP Backup feature will take backup of data for ' +$user_meta_days+ ' days and store back-up in an XML file and clean-up database');
        $('#warning_to_scan_ips').modal();
        $('.continueWarningScan').click(function (e) {
            e.preventDefault();
            $('#warning_to_scan_ips').modal('hide');
            $http({
                method: 'Get',
                url: $scope.url[1],
                params: {user_id: $id}
            }).success(function (response) {
                // console.log(response);
                var html = '';
                html += '<div class="alert alert-success fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>'+response.message+'</div>';
                $('.backup_message').show(html);
               // $scope.backup_message = '<div class="alert alert-success fade in"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>DB Data base created successfullllly</div>';
               window.location.replace(response);
            });
        });
    };

});

app.filter('trustAsHtml', ['$sce', function ($sce) {

    return function (text) {
        
         $sce.trustAsHtml(text);

    };

}]);

