<!DOCTYPE html>
<html>
<head>
    <title>{{ @$data['main'] }}</title>
</head>
<body>
<br>
<h1 style="text-align: center">Title: {{ @$data['title'] }}</h1>
<p style="text-align: center">Message: {{ @$data['body'] }}</p>
<br>


<p style="text-align: center;color:#000 !important;font-family:arial,sans-serif;">

    &copy; {{@$data['year']}} <a href="{!! @$data['website'] !!}"
                                 style="color:#eb2123 !important;font-family:arial,sans-serif;">{{@$data['main']}}</a>. All rights reserved.<br/>
    <br/>
    &nbsp;
</p>
<p style="text-align: center">Thank you</p>
</body>
</html>


