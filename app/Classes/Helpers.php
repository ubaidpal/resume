<?php

use App\Models\Info;
use App\Models\Item;
use App\Models\Recommendations;
use App\Models\SocialLink;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

/**
 * Created by   :  Ubaid
 * Project Name : DigitLogix
 * Product Name : PhpStorm
 * Date         : 04-16-17 7:50 AM
 * File Name    : Helpers.php
 *   Copyright, All Rights Reserved, DigitLogix Limited, USA Company ID: 00000
 *   Year 2021
 **/
//add libraries

function getUserDetails() {
    $user = User::first();
    return $user;

}

function getRecommendations() {
    $recommendations = Recommendations::get();

    return $recommendations;

}

function getExperience() {
    $exp = '';
    $exp = Info::where('type', 'experience')->first();

    if(!empty($exp->descriptions)) {
        $exp = json_decode($exp->descriptions);
    }

    return $exp;

}

function getQualifications() {
    $qualification = '';
    $qualification = Info::where('type', 'qualifications')->first();

    if(!empty($qualification->descriptions)) {
        $qualification = json_decode($qualification->descriptions);
    }

    return $qualification;

}
function getProjects(){
    $items = [];
    $items = Item::where('type' ,0)->with('itemDetails')->get();
    return $items;
}

function getSocials(){
    $social = [];
    $social = SocialLink::first();
    return $social;
}

function getCurrentYear($date){

    return ' - '.$date;
}
function getUserAvatar() {

    if(isset(\Auth::user()->avatar)) {
        $data_image = asset('/profileImage/' . Auth::user()->avatar);
    } else {
        $data_image = asset('assets/img/user.png');
    }

    return $data_image;

}

//Helper function for get profle image
function getProfileAvatar($name = NULL, $avatarPath = NULL, $type = NULL) {

    if(!empty($avatarPath)) {
        $data_image = '/profileImage/' . $avatarPath;
    } else {
        $data_image = asset('assets/img/user.png');
    }

    return $data_image;
}

function secondsToTime($seconds) {
    $dtF = new \DateTime('@0');
    $dtT = new \DateTime("@$seconds");
    return $dtF->diff($dtT)->format('%a days, %h hours, %i minutes and %s seconds');
}

function changeDateTimeToDate($dateTime) {
    $timestamp = strtotime($dateTime);
    return remainingDaysCalculate(date('Y-m-d H:i:s', $timestamp));
}

//Helper function for remaining days calculate
function remainingDaysCalculate($sinceDate) {

    $start_date     = new DateTime();
    $date_expire    = new DateTime($sinceDate);
    $remaining_date = $date_expire->diff($start_date);
    if($remaining_date->y > 0) {
        $remaining_date = $remaining_date->format("%y Years, %m Months, %d Days, %h Hours and %i Minutes");
    } else if($remaining_date->m > 0) {
        $remaining_date = $remaining_date->format("%m Months, %d Days, %h Hours and %i Minutes");
    } else if($remaining_date->d > 0) {
        $remaining_date = $remaining_date->format("%d Days, %h Hours and %i Minutes");
    } else if($remaining_date->h > 0) {
        $remaining_date = $remaining_date->format("%h Hours and %i Minutes");
    } else if($remaining_date->i > 0) {
        $remaining_date = $remaining_date->format("%i Minutes");
    } else {
        $remaining_date = $remaining_date->format("%s Seconds");
    }

    $remaining__total_date = '(' . $remaining_date . ')';
    return $remaining__total_date;
}

//Helper function for remaining days calculate
function daysLeft($sinceDate) {

    $start_date     = new DateTime();
    $date_expire    = new DateTime($sinceDate);
    $remaining_date = $date_expire->diff($start_date)->format("%d");
    return $remaining_date;
}

function daysLeftCount($sinceDate) {
    $start_date     = new DateTime();
    $date_expire    = new DateTime($sinceDate);
    $remaining_date = $date_expire->diff($start_date);
    $numberDays     = intval($remaining_date->days);
    return $numberDays;
}

//Helper function for check expiry days left.
function daysLeftCheck($company_id) {

    if(isset($company_id)) {

        $expiryToken = ExpiryToken::where('user_id', $company_id)->first();
        $total_days  = \Config::get('constants_settings.SESSION_EXPIRY');  // default expiry days
        $profile     = Profile::where('user_id', $company_id)->first();

        if(isset($profile)) {
            $_user_meta_extend_days = Profile::get_user_meta($profile->user_id, '_user_meta_extend_days');

            if($_user_meta_extend_days !== FALSE) {

                $total_days = $_user_meta_extend_days;
            }
        }

        $today = strtotime(date('Y-m-d'));

        $expire = strtotime($expiryToken->expires_at . ' + ' . $total_days . ' days');//

        if($expire > $today) {
            $expire         = new Carbon($expiryToken->expires_at . ' + ' . $total_days . ' days');
            $now            = Carbon::now();
            $remaining_days = $expire->diff($now)->format("%m months %d days %h hours");
        } else {
            $remaining_days = 'Account Expired';
        }

        return $remaining_days;
    }
}

//Helper function for encryption and decryption
function ubaid_crypt($string, $action = 'e') {
    // you may change these values to your own

    $secret_key     = '@&**UbaidPAL_secret_key__';
    $secret_iv      = '@&**UbaidPAL_secret_iv';
    $output         = FALSE;
    $encrypt_method = "AES-256-CBC";
    $key            = hash('sha256', $secret_key);
    $iv             = substr(hash('sha256', $secret_iv), 0, 16);

    if($action == 'e') {
        $output = base64_encode(openssl_encrypt($string, $encrypt_method, $key, 0, $iv));
    } else if($action == 'd') {
        $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
    }

    return (!$output) ? $string : $output;
}

//Helper function for get country name
function getaddress($lat, $lng) {
    $url  = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' . trim($lat) . ',' . trim($lng) . '&sensor=false';
    $json = @file_get_contents($url);
    $data = json_decode($json);
    //dd($data);

    if($data != '') {
        $status = $data->status;
        if($status == "OK") {

            return $data->results[ 0 ]->formatted_address;
            // return  $data->results[0]->address_components[3]->short_name;
        } else {
            return FALSE;
        }
    }
}

//Helper function flush sessions
function setSession($name, $value) {
    Session::flash($name, $value);
    Session::save();
}

//get hostnema if https is missing
function getHostnameUrl($host_name) {
    $hostname      = str_replace('https://', '', $host_name);
    $host_name_get = rtrim($hostname, '/');
    return $host_name_get;
}

function getHttpsUrl($host_name) {
    $r                = explode('/', $host_name);
    $r                = array_filter($r);
    $r                = array_merge($r, array());
    $r                = preg_replace('/\?.*/', '', $r);
    $data[ 'param' ]  = $r[ 0 ] . '//';
    $data[ 'param1' ] = $r[ 1 ];
    return $data;
}

//Helper function for random String add
function generateRandomString($length = NULL, $type = NULL) {

    if($type === NULL) {
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    } else {
        $characters = '123456789';
    }
    $charactersLength = strlen($characters);
    $randomString     = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[ rand(0, $charactersLength - 1) ];
    }
    return $randomString;
}

//Helper function for get key feature col
function keyFeatureNote($note_data = NULL) {

    if(isset($note_data)) {
        $note_show = $note_data;
    } else {
        $note_show = 'Note:';
    }

    return $note_show;

}

//Helper function for get key feature col
function keyFeatureCol($col_md = NULL) {
    if(isset($col_md)) {
        $col_class = $col_md;
    } else {
        $col_class = 'col-md-2';
    }

    return $col_class;

}

function pre($array, $is_array = TRUE, $label = '') {

    if($is_array) {

        echo '<pre>';
        print_r($array);
        echo '</pre>';

    } else {
        echo "<li>$label - " . $array . '<br />';
    }

}

//Helper fucntion to write a Log file. - cron will run and each exception will be logged
// path of log will be - public/ic_cron_logs
// string as an input
function _cron_error_log($davice_type = '', $body = '') {

    if($body != '') {
        $body      = $davice_type . " - " . date("d-m-Y H:i:s") . PHP_EOL . $body;
        $file_name = '_cron_log_ ' . date('d-M-Y') . '.log'; // log will be created per day - current date
        if(!file_exists(public_path('_cron_logs/' . $file_name)))  // set this path in config/filesystems.
        {
            Storage::disk('logs')->put($file_name, $body . PHP_EOL . "-----------------" . PHP_EOL);
        } else {
            Storage::disk('logs')->append($file_name, $body . PHP_EOL . "-----------------" . PHP_EOL);
        }

    }

}

function _save_logs($file_path, $_type = '', $body = '') {

    if($body != '') {
        $file_name = $file_path . '.log'; // log will be created per day - current date
        $path      = public_path($file_path . "\\" . $file_name);
        Storage::disk('random_settings')->put($file_name, $body);

    }

}

//Helper fucntion to write a Log file.
// path of log will be - public/custom
// string as an input
function custom_logs($custom, $body = '', $date = FALSE) {

    $date = ($date) ? '_' . date('d-M-Y') : '';

    if($body != '') {
        $body      = date("d-m-Y H:i:s") . PHP_EOL . $body;
        $file_name = $custom . '/' . $custom . $date . '.log'; // log will be created per day - current date

        if(!file_exists(public_path($custom . $file_name)))  // set this path in config/filesystems.
        {
            Storage::disk('public_path')->put($file_name, $body . PHP_EOL . "-----------------" . PHP_EOL);
        } else {
            Storage::disk('public_path')->put($file_name, $body . PHP_EOL . "-----------------" . PHP_EOL);
        }
    }
}

//pass string to add http
function addhttp($url) {

    if(!preg_match("~^(?:f|ht)tps?://~i", $url)) {
        $url = "http://" . $url;
    }
    return $url;
}

//Helper function for Custom Color
function scheduleColor($schedule) {

    switch ($schedule) {
        case '1':
            $schedule_color = '#00acac';
            break;
        case '2':
            $schedule_color = '#dfe100';
            break;
        case '3':
            $schedule_color = '#ff001a';
            break;
        default:
            $schedule_color = '#337ab7';
    }

    return $schedule_color;
}

//Helpers function for random line chart generate
function random_color_part() {
    return str_pad(dechex(mt_rand(0, 255)), 2, '0', STR_PAD_LEFT);
}

function random_color() {
    return random_color_part() . random_color_part() . random_color_part();
}

function random_color_lineChart() {
    return random_color_part() . random_color_part() . random_color_part() . random_color_part();

}

//Helper function for logo set get string list from any array
function getArrayToString($array) {  //
    if(!empty($array)) {

        $sources_lists = '';
        foreach ($array as $key => $value) {

            $string        = !empty($value->user->name) ? $value->user->name : $value;
            $sources_lists .= '- ' . $string . '</br>';
        }
        return $sources_lists;
    } else {
        return $array;
    }

}

//Helper function for array to xml format
function ArraytoXml($array) {

    $ArraytoXml = ArrayToXml::convert($array);
    return $ArraytoXml;
}

//Helper function for put xml to custom path with custom filename
function CreateXmlInFolder($xmldata, $path, $filename, $append = FALSE) {

    if(!folderExists($path)) {

        createDirectory($path);

        return Storage::disk('xml')->put($filename, $xmldata);

    } else {

        if($append) {
            return Storage::disk('xml')->append($filename, $xmldata);
        } else {
            return Storage::disk('xml')->put($filename, $xmldata);
        }
    }

}

//check if path exists
function folderExists($path) {
    return Storage::disk('xml')->exists($path);
}

//Helper function for create a new directory with new path
function createDirectory($folder, $mode = 0777, $recursive = TRUE) {
    return Storage::disk('xml')->makeDirectory($folder, $mode, $recursive);
}

function remove_http($url) {

    $disallowed = array('http://', 'https://'); // http or https
    foreach ($disallowed as $d) {
        if(strpos($url, $d) === 0) {
            return str_replace($d, '', $url);
        }
    }
    return $url;
}

//for bytes
function format_Bytes($size, $precision = 2) {
    if($size > 0) {
        $size     = (int)$size;
        $base     = log($size) / log(1024);
        $suffixes = array(' B', ' KB', ' MB', ' GB', ' TB');

        return round(pow(1024, $base - floor($base)), $precision) . $suffixes[ floor($base) ];
    } else {
        return $size;
    }
}

//for gb
function format_GB($size, $precision = 2) {
    if($size > 0) {
        $size     = (int)$size;
        $base     = log($size) / log(1024);
        $suffixes = array(' MB', 'GB', ' TB');

        return round(pow(1024, $base - floor($base)), $precision) . $suffixes[ floor($base) ];
    } else {
        return $size;
    }
}

//Helper function for current date
function setDateString($data) {
    $old_date           = $data;
    $old_date_timestamp = strtotime($old_date);
    $new_date           = date('F j Y g:i a', $old_date_timestamp);
    return $new_date;
}

//Helper function for set country code in array
function countryCode() {
    return array('AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'CI', 'HR', 'CU', 'CW', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RE', 'RO', 'RU', 'RW', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SZ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU', 'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW');
}

function n_digit_random($digits) {

    $temp = "";

    for ($i = 0; $i < $digits; $i++) {
        $temp .= rand(0, 9);
    }

    return (int)$temp;

}

//Helper function for create dynamic chart colour
function dynamicChart($label_val, $country_codes) {

    return array(

        "label" => $label_val,

        "pointBackgroundColor" => '#' . random_color(),
        "pointRadius"          => 3,
        "borderWidth"          => 2,
        "backgroundColor"      => '#' . random_color(),
        "data"                 => $country_codes[ $label_val ]
    );
}

//Helper function for sort array with largest child
function mergesort($numlist) {

    if(count($numlist) == 1)
        return $numlist;

    $mid   = count($numlist) / 2;
    $left  = array_slice($numlist, 0, $mid);
    $right = array_slice($numlist, $mid);

    $left  = mergesort($left);
    $right = mergesort($right);

    return merge($left, $right);
}

//Helper function for nested array merge
function merge($left, $right) {

    $result     = array();
    $leftIndex  = 0;
    $rightIndex = 0;

    while ($leftIndex < count($left) && $rightIndex < count($right)) {
        if(count($left[ $leftIndex ]) < count($right[ $rightIndex ])) {

            $result[] = $right[ $rightIndex ];
            $rightIndex++;
        } else {
            $result[] = $left[ $leftIndex ];
            $leftIndex++;
        }
    }
    while ($leftIndex < count($left)) {
        $result[] = $left[ $leftIndex ];
        $leftIndex++;
    }
    while ($rightIndex < count($right)) {
        $result[] = $right[ $rightIndex ];
        $rightIndex++;
    }
    return $result;
}

//get before time function

function getBeforeHourTime($set_time = NULL, $format = 'Y-m-d H:i:s') {

    //Parameter Strcuture Time space unit i.e 4 Hours
    if($set_time) {
        $params      = explode(' ', $set_time);
        $before_time = !empty($params[ 0 ]) ? $params[ 0 ] : 4;
        $unit        = !empty($params[ 1 ]) ? strtolower($params[ 1 ]) : 'hours';
    } else {
        $before_time = 4;
        $unit        = 'hours';
    }
    $current_time = Carbon::now();
    $current_time = $current_time->toDateTimeString();

    //Calculate the past date, by default it is hours
    if($unit == 'minutes' || $unit == 'minute') {
        $before_time = Carbon::parse($current_time)->subMinutes($before_time)->format($format);
    } else if($unit == 'days' || $unit == 'day') {
        $before_time = Carbon::parse($current_time)->subDays($before_time)->format($format);
    } else if($unit == 'weeks' || $unit == 'week') {
        $before_time = Carbon::parse($current_time)->subWeeks($before_time)->format($format);
    } else if($unit == 'months' || $unit == 'month') {
        $before_time = Carbon::parse($current_time)->subMonths($before_time)->format($format);
    } else if($unit == 'years' || $unit == 'year') {
        $before_time = Carbon::parse($current_time)->subYears($before_time)->format($format);
    } else {
        $before_time = Carbon::parse($current_time)->subHours($before_time)->format($format);
    }
    return $before_time;
}

//Helper function set the custom title message on the graphs loggers.
function hourMinutes($title, $time) {
    $message = '';
    if($time == 15) {
        $message = $title . ' ' . $time . ' Minutes ';
    } elseif($time == 168) {
        $message = $title . ' 7 Days ';
    } else {
        if(strpos($time, 'Month') !== FALSE) {
            $message = $title . ' ' . $time . ' ';
        } else {
            $message = $title . ' ' . $time . ' Hours ';
        }
    }
    return $message;
}

//Helper function check the value in array if key value match they return value.
function checkExistArray($data_divide_chunks_raw, $v1) {
    foreach ($data_divide_chunks_raw as $key => $domain) {
        if($key == $v1) {
            return $key;
        }

    }
}

//Helper function to write a Log file.
// date formate
function getUpdatedAtAttribute($date) {
    $createdAt = Carbon::parse($date);
    return $createdAt->format('m/d/Y, H.iA');
}

function shorter($text, $chars_limit) {
    // Check if length is larger than the character limit
    if(strlen($text) > $chars_limit) {
        // If so, cut the string at the character limit
        $new_text = substr($text, 0, $chars_limit);
        // Trim off white space
        $new_text = trim($new_text);
        // Add at end of text ...
        return $new_text . "...";
    } // If not just return the text as is
    else {
        return $text;
    }
}

function noToWords($n) {
    $n = (0 + str_replace(",", "", $n));

    // is this a number?
    if(!is_numeric($n))
        return FALSE;
    // now filter it;
    if($n > 1000000000000)
        return round(($n / 1000000000000), 2) . ' t';
    elseif($n > 1000000000)
        return round(($n / 1000000000), 2) . ' b';
    elseif($n > 1000000)
        return round(($n / 1000000), 2) . ' m';
    elseif($n > 1000)
        return round(($n / 1000), 2) . ' k';
    elseif($n === 0)
        return 0;

    return number_format($n);
}

function dataFormateChange($date) {
    $input = $date;
    //$date = strtotime($input.'0000');
    $date = strtotime($input);
    return date('Y-m-d h:i:s', $date);
    //return date('D/M/Y h:i:s', $date);

}

function cronPolicyLog($users = NULL, $davice_type = '', $body = '') {

    if(is_array($body)) {
        $body = json_encode($body);
    }
    if($body != '') {
        $body      = $davice_type . " - " . date("d-m-Y H:i:s") . PHP_EOL . $body;
        $file_name = 'ic_cron_log_' . date('d-M-Y') . '.log'; // log will be created per day - current date
        try {
            if(!file_exists(public_path('ic_cron_logs/' . $file_name)))  // set this path in config/filesystems.
            {
                $body = truncateString($body, 1000, '....');
                Storage::disk('logs')->put($file_name, $body . PHP_EOL . "-----------------" . PHP_EOL);
            } else {
                $body = truncateString($body, 1000, '....');
                Storage::disk('logs')->append($file_name, $body . PHP_EOL . "-----------------" . PHP_EOL);
            }
        } catch (\Exception $e) {
            $body = truncateString($e->getMessage(), 1000, '....');
            Storage::disk('logs')->append($file_name, $body . PHP_EOL . "-----------------" . PHP_EOL);
        }
    }

}

//execute command response
function defualtCommandExecution($command, $taskCron = FALSE) {

    cronPolicyLog(NULL, 'SSH Script Command line # 2923 ', json_encode($command));
    $process = new Process($command);
    $process->run();

    if(!$process->isSuccessful()) {
        if($taskCron) {  // in the case of task perform
            cronPolicyLog(NULL, 'SSH Script Out Put Error line #2929 ', json_encode($process->getErrorOutput()));
        } else {
            return $process->getErrorOutput();
        }

    }
    if(!empty($process->getOutput())) {
        if($taskCron) { // in the case of task perform
            cronPolicyLog(NULL, 'SSH Script Successfully Executed line # 2937 ', json_encode($process->getOutput()));
        } else {
            return $process->getOutput();
        }

    }
    if(!$taskCron) { // in the case of task perform
        die;//return
    }

}

//Cron Logs against user id
//Helper function for Make Directory Of Migrate Device Logs

function truncateString($string, $length, $dots = "...") {
    return (strlen($string) > $length) ? substr($string, 0, $length - strlen($dots)) . $dots : $string;
}

function removeDuplicate($original_array) {
    $deduped_array = array();
    foreach ($original_array as $object) {
        $key                   = sha1(serialize($object));
        $deduped_array[ $key ] = $object;
    }
    return $deduped_array;
}

//set error and redirect to error page
function CustomeError($custom_value, $error) {
    setSession('error', preg_replace('/\s\s+/', ' ', $error));   //set session error
    Redirect::to('error/' . $custom_value . '')->send();
}

function filter_string_on_keys($val) {
    if(str_contains($val, '=')) {
        return TRUE;
    }
}

function getWindowSpanExecutionDate($date_type = NULL) {

    if(isset($date_type)) {
        if($date_type == 'daily') {
            $new_date = Carbon::now()->subDay(1);

        } else if($date_type == 'weekly') {
            $new_date = Carbon::now()->subWeek(1);
        } else if($date_type == 'monthly') {
            $new_date = Carbon::now()->subMonth(1);
        } else if($date_type == 'quarterly') {
            $new_date = Carbon::now()->subMonth(3);
        } else if($date_type == 'hourly') {
            $new_date = Carbon::now()->subHour(1);
        } else if(str_contains($date_type, 'minute')) {
            $date_type = explode('-', $date_type);
            $minutes   = $date_type[ 0 ];
            $new_date  = Carbon::now()->subMinutes($minutes);
        }
        return $new_date;
    } else {
        $new_date = Carbon::now()->subHour(2);
        return $new_date;
    }

}

// search record on mongo
function searchDate($date_type = NULL) {

    if(isset($date_type)) {
        if($date_type == 'daily') {
            $new_date = Carbon::now()->subDay(1);

        } else if($date_type == 'weekly') {
            $new_date = Carbon::now()->subWeek(1);
        } else if($date_type == 'monthly') {
            $new_date = Carbon::now()->subMonth(1);
        } else if($date_type == 'quarterly') {
            $new_date = Carbon::now()->subMonth(3);
        } else if(str_contains($date_type, 'monthly')) {
            $date_type = explode('-', $date_type);
            $month     = $date_type[ 0 ];
            $new_date  = Carbon::now()->subMonth($month);
        } else if($date_type == 'hourly') {
            $new_date = Carbon::now()->subHour(1);
        } else if(str_contains($date_type, 'minute')) {
            $date_type = explode('-', $date_type);
            $minutes   = $date_type[ 0 ];
            $new_date  = Carbon::now()->subMinutes($minutes);
        }
        return $new_date;
    } else {
        $new_date = Carbon::now()->subHour(4);
        return $new_date;
    }

}

//set mongo dash time
function setMongoUTCISOTime($time) {
    $set_time = getBeforeHourTime($time, 'Y-m-d\TH:i:s');
    $set_time = new  \MongoDB\BSON\UTCDateTime((new \DateTime($set_time))->getTimestamp());;

    return $set_time;
}

function assoc_array_shuffle($array) {

    $orig = array_flip($array);
    shuffle($array);
    foreach ($array as $key => $n) {
        $data[ $n ] = $orig[ $n ];
    }
    return array_flip($data);
}

//get hour to minutes or vice versa
function getBeforeHourToMinutes($set_time = NULL) {

    //Parameter Strcuture Time space unit i.e 4 Hours
    if($set_time) {
        $params      = explode(' ', $set_time);
        $before_time = !empty($params[ 0 ]) ? $params[ 0 ] : 4;
        $unit        = $params[ 1 ] ? strtolower($params[ 1 ]) : 'hours';
    } else {
        $before_time = 4;
        $unit        = 'hours';
    }

    //Calculate the past date, by default it is hours
    if($unit == 'minutes' || $unit == 'minute') {
        $before_time = $before_time;
    } else if($unit == 'days' || $unit == 'day') {
        $before_time = $before_time * 60 * 24;
    } else if($unit == 'weeks' || $unit == 'week') {
        $before_time = $before_time * 60 * 24 * 7;
    } else if($unit == 'months' || $unit == 'month') {
        $before_time = $before_time * 60 * 24 * 30;
    } else {
        $before_time = $before_time * 60;
    }
    return $before_time;
}

//top menu
function top_menu($show) {
    //dd($show);
    return isset($show) ? 'page-with-top-menu' : '';
}

//hour range for date time
function hoursRange($lower = 0, $upper = 86400, $step = 3600, $format = '', $his = TRUE) {
    $times = array();

    if(empty($format)) {
        $format = 'g:i a';
    }

    $his_format = $his ? 'H:i:s' : 'H:i';

    foreach (range($lower, $upper, $step) as $increment) {
        $increment = gmdate($his_format, $increment);

        list($hour, $minutes) = explode(':', $increment);

        $date = new DateTime($hour . ':' . $minutes);

        $times[ (string)$increment ] = $date->format($format);
    }

    return $times;
}

//jetnexis service type version 4.2.3
function protocolType() {
    return array(
        'DICOM'     => 'DICOM',
        'FTP'       => 'FTP',
        'HTTP'      => 'HTTP',
        'IMAP'      => 'IMAP',
        'DNS'       => 'DNS',
        'RDP'       => 'RDP',
        'RPC'       => 'RPC',
        'RPC/ADS'   => 'RPC/ADS',
        'RPC/CA/PF' => 'RPC/CA/PF',
        'SMTP'      => 'SMTP',
        'Layer 4'   => 'Layer 4 TCP',
        'TCP/UD'    => 'Layer4 TCP/UD',
        'UDP'       => 'Layer 4 UDP',
    );
}

// service type version 4.2.3
function workAtTechnology() {
    return array(
        0  => 'Fullstack',
        1  => 'Wordpress',
        2  => 'Shopify',

    );
}

function daysToYear($days) {
    $years = intval($days / 365);
    $days  = $days % 365;

    $months = intval($days / 30);
    $days   = $days % 30;

    return "$years years, $months months, $days days";
}

function secondsToHour($hour = NULL, $minutes = NULL, $fullTime = NULL) {
    $dtF = new \DateTime('@0');
    if(!empty($hour)) {
        $dtT = new \DateTime("@$hour");
        return $dtF->diff($dtT)->format('%h hours');
    } elseif(!empty($minutes) && ($minutes > 0)) {
        $dtT = new \DateTime("@$minutes");
        return $dtF->diff($dtT)->format('%i minutes');
    } else {
        $dtT = new \DateTime("@$fullTime");
        return $dtF->diff($dtT)->format('%a days, %h hours, %i minutes and %s seconds');
    }

}


