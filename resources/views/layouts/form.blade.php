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
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
  <meta content="" name="description" />
  <meta content="" name="author" />
  <link rel="shortcut icon" href="{{ asset('assets/img/fav.png') }}" >
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>Digit Logix</title>

  <!-- ================== BEGIN BASE CSS STYLE ================== -->
    <!-- ================== BEGIN BASE CSS STYLE ================== -->
    <link href="{{ asset('/assets/plugins/jquery-ui/themes/base/minified/jquery-ui.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/simple-line-icons/css/simple-line-icons.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/ionicons/css/ionicons.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/css/animate.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/css/style.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/css/style-responsive.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/css/theme/default.css')}}" rel="stylesheet" id="theme" />
    <!-- ================== END BASE CSS STYLE ================== -->

    <!-- ================== BEGIN PAGE LEVEL STYLE ================== -->
    <link href="{{ asset('/assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/ionRangeSlider/css/ion.rangeSlider.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/ionRangeSlider/css/ion.rangeSlider.skinNice.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/password-indicator/css/password-indicator.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/bootstrap-combobox/css/bootstrap-combobox.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/bootstrap-select/bootstrap-select.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/jquery-tag-it/css/jquery.tagit.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/bootstrap-daterangepicker/daterangepicker.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/select2/dist/css/select2.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/bootstrap-eonasdan-datetimepicker/build/css/bootstrap-datetimepicker.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/bootstrap-colorpalette/css/bootstrap-colorpalette.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/jquery-simplecolorpicker/jquery.simplecolorpicker.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/jquery-simplecolorpicker/jquery.simplecolorpicker-fontawesome.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/jquery-simplecolorpicker/jquery.simplecolorpicker-glyphicons.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/plugins/bootstrap-wysihtml5/dist/bootstrap3-wysihtml5.min.css" rel="stylesheet')}}" />
    <!-- ================== END PAGE LEVEL STYLE ================== -->
    <!--for cropper-->
    <link href="{{ asset('/assets/jquery-cropper/css/cropper.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('/assets/jquery-cropper/css/main.css')}}" rel="stylesheet" />

    <!-- ================== BEGIN BASE JS ================== -->
    <link href="{{ asset('assets/plugins/jquery-tag-it/css/jquery.tagit.css')}}" rel="stylesheet" />
    <link href="{{ asset('assets/plugins/bootstrap-wysihtml5/src/bootstrap3-wysihtml5.css')}}" rel="stylesheet" />

    <link href="{{ asset('/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css')}}" rel="stylesheet"/>
    <link href="{{ asset('/assets/plugins/DataTables/extensions/Buttons/css/buttons.bootstrap.min.css')}}" rel="stylesheet"/>
    <link href="{{ asset('/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css')}}" rel="stylesheet"/>

    @if(@$playbook_page)
        <script src="{{ asset('/assets/plugins/jquery/jquery-1.10.2.min.js')}}"></script>
    @else
        <script src="{{ asset('/assets/plugins/jquery/jquery-1.9.1.min.js')}}"></script>
    @endif
    <script src="{{ asset('/assets/plugins/jquery/jquery-migrate-1.1.0.min.js')}}"></script>
    <script src="{{ asset('/assets/plugins/jquery-ui/ui/minified/jquery-ui.min.js')}}"></script>
    <script src="{{ asset('/assets/plugins/bootstrap/js/bootstrap.min.js')}}"></script>
    <script src="{{ asset('/assets/plugins/slimscroll/jquery.slimscroll.min.js')}}"></script>
    <script src="{{ asset('/assets/plugins/jquery-cookie/jquery.cookie.js')}}"></script>
    <!-- ================== BEGIN PAGE LEVEL JS ================== -->
  @yield('css')
</head>
<body>

  @include('layouts.app.main')

  <!-- Scripts -->


  <script src="{{ asset('/assets/plugins/bootstrap-combobox/js/bootstrap-combobox.js')}}"></script>

  <script src="{{ asset('/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js')}}"></script>
  <script src="{{ asset('/assets/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js')}}"></script>
  <script src="{{ asset('/assets/plugins/ionRangeSlider/js/ion-rangeSlider/ion.rangeSlider.min.js')}}"></script>
  <script src="{{ asset('/assets/plugins/masked-input/masked-input.min.js')}}"></script>
  <script src="{{ asset('/assets/plugins/password-indicator/js/password-indicator.js')}}"></script>
  <script src="{{ asset('/assets/plugins/bootstrap-select/bootstrap-select.min.js')}}"></script>
  <script src="{{ asset('/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.min.js')}}"></script>
  <script src="{{ asset('/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput-typeahead.js')}}"></script>
  <script src="{{ asset('/assets/plugins/jquery-tag-it/js/tag-it.js')}}"></script>
  <script src="{{ asset('/assets/plugins/bootstrap-daterangepicker/moment.js')}}"></script>
  <script src="{{ asset('/assets/plugins/bootstrap-daterangepicker/daterangepicker.js')}}"></script>
  <script src="{{ asset('/assets/plugins/select2/dist/js/select2.min.js')}}"></script>
  <script src="{{ asset('/assets/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js')}}"></script>
  <script src="{{ asset('/assets/plugins/bootstrap-eonasdan-datetimepicker/build/js/bootstrap-datetimepicker.min.js')}}"></script>
  <script src="{{ asset('/assets/plugins/bootstrap-show-password/bootstrap-show-password.js')}}"></script>
  <script src="{{ asset('/assets/plugins/bootstrap-colorpalette/js/bootstrap-colorpalette.js')}}"></script>
  <script src="{{ asset('/assets/plugins/jquery-simplecolorpicker/jquery.simplecolorpicker.js')}}"></script>
  <script src="{{ asset('/assets/plugins/clipboard/clipboard.min.js')}}"></script>
  {{--  <script src="{{ asset('/assets/js/form-plugins.demo.min.js')}}"></script> --}}
  <script src="{{ asset('/assets/js/form-plugins.demo.js')}}"></script>
  <script src="{{ asset('/assets/plugins/ckeditor/ckeditor.js')}}"></script>
  <script src="{{ asset('/assets/plugins/bootstrap-wysihtml5/dist/bootstrap3-wysihtml5.all.min.js')}}"></script>
  <script src="{{ asset('/assets/js/form-wysiwyg.demo.min.js')}}"></script>

  <script src="{{ asset('/assets/js/apps.js')}}"></script>
  <script src="{{ asset('/assets/highlight/highlightRegex.js')}}"></script>
  <script src="{{ asset('/assets/js/icyber_shield.js')}}"></script>
  <!-- ================== END PAGE LEVEL JS ================== -->
  @yield('script')

  <script type="text/javascript">

    $('.show_key_feature').on("click", function(){
      $('.key_feature').slideToggle(function(){
      });
    });

  </script>

  <script>
    $(document).ready(function() {
      App.init();
      FormPlugins.init();
      FormWysihtml5.init();
      @yield('app')
    });

  </script>


</body>
</html>
