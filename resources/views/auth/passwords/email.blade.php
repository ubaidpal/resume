<!--
   Copyright, All Rights Reserved, BlockAPT Limited, UK Company ID: 11759911 #*,
   Year 2020
   -->
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Digit Logix</title>

    <!-- ================== BEGIN BASE CSS STYLE ================== -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
    <link href="{{ asset('assets/plugins/jquery-ui/themes/base/minified/jquery-ui.min.css')}}" rel="stylesheet"/>
    <link href="{{ asset('assets/plugins/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet"/>
    <link href="{{ asset('assets/plugins/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet"/>
    <link href="{{ asset('assets/css/animate.min.css')}}" rel="stylesheet"/>
    <link href="{{ asset('assets/css/style.min.css')}}" rel="stylesheet"/>
    <link href="{{ asset('assets/css/style-responsive.min.css')}}" rel="stylesheet"/>
    <link href="{{ asset('assets/css/theme/default.css')}}" rel="stylesheet" id="theme"/>
    <!-- ================== END BASE CSS STYLE ================== -->

    <!-- ================== BEGIN BASE JS ================== -->
    <script src="{{ asset('assets/plugins/pace/pace.min.js')}}"></script>
    <!-- ================== END BASE JS ================== -->
</head>
<body class="pace-top">
<!-- begin #page-loader -->
<div id="page-loader" class="fade in"><span class="spinner"></span></div>
<!-- end #page-loader -->

<div class="login-cover">
    <div class="login-cover-image"><img src="{{asset('assets/img/login-bg/bg-1.jpg')}}" data-id="login-cover-image" alt=""/></div>
    <div class="login-cover-bg"></div>
</div>
<!-- begin #page-container -->
<div id="page-container" class="fade">
    <!-- begin login -->
    <div class="login login-v2" data-pageload-addclass="animated fadeIn">
        <!-- begin brand -->
        <div class="login-header">
            <div class="brand">
                <span><img style="margin: -10px 93px 2px;"
                           src="https://digitlogix.com/wp-content/uploads/thegem-logos/logo_4b9b4a91ba84ef09a89937e8f87b14dd_1x.png"></span>
            </div>
            <div class="icon">
                <i class="fa fa-sign-in"></i>
            </div>
        </div>
        <!-- end brand -->
        <div class="login-content">
            <form class="margin-bottom-0" method="POST" action="{{ route('password.email') }}">
                @csrf


                <div class="form-group m-b-20">
                    <input type="text" class="form-control input-lg  @error('email') is-invalid @enderror" name="email"
                           value="{{ old('email') }}" placeholder="{{ __('E-Mail Address') }}" required autocomplete="email" autofocus>
                    @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>

                <div class="login-buttons">
                    <button type="submit" class="btn btn-success btn-block btn-lg">  {{ __('Send Password Reset Link') }}</button>
                </div>

            </form>
        </div>
    </div>
    <!-- end login -->

</div>
<!-- end page container -->


<!-- Scripts -->

<!-- ================== BEGIN BASE JS ================== -->
<script src="{{ asset('assets/plugins/jquery/jquery-1.9.1.min.js')}}"></script>
<script src="{{ asset('assets/plugins/jquery/jquery-migrate-1.1.0.min.js')}}"></script>
<script src="{{ asset('assets/plugins/jquery-ui/ui/minified/jquery-ui.min.js')}}"></script>
<script src="{{ asset('assets/plugins/bootstrap/js/bootstrap.min.js')}}"></script>

<script src="{{ asset('assets/plugins/slimscroll/jquery.slimscroll.min.js')}}"></script>
<script src="{{ asset('assets/plugins/jquery-cookie/jquery.cookie.js')}}"></script>
<!-- ================== END BASE JS ================== -->

<!-- ================== BEGIN PAGE LEVEL JS ================== -->
<script src="{{ asset('assets/js/login-v2.demo.min.js')}}"></script>
<script src="{{ asset('assets/js/apps.min.js')}}"></script>
<!-- ================== END PAGE LEVEL JS ================== -->

<script>
    $(document).ready(function () {
        App.init();
        LoginV2.init();
    });
</script>

</body>
</html>
