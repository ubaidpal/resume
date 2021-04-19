<!DOCTYPE html>
<!-- saved from url=(0100)http://localhost/cv/#contact -->
<html lang="en" class=" js no-touch cssanimations csstransforms csstransforms3d csstransitions" style="">
<!-- Mirrored from naeemshah.me/ by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 10 Feb 2021 13:43:52 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=utf-8" /><!-- /Added by HTTrack -->
<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{{ucfirst(@$user->name)}} Full Stack Developer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="description" content="Full Stack Developer">
    <meta name="keywords" content="{{ucfirst(@$user->name)}} ,{{ucfirst(@$user->name)}} Full Stack Developer,Full Stack Developer">
    <meta name="author" content="{{ucfirst(@$user->name)}}">
    <meta property="og:image" content="{{ asset('/profileImage/' . @$user->avatar) }}"/>
    <meta property="og:title" content="{{ucfirst(@$user->name)}}"/>
    <meta property="og:site_name" content="{{ucfirst(@$user->name)}} Full Stack Developer"/>
    <meta property="og:type" content="blog"/>

    <link rel="shortcut icon" href="{{ asset('frontend/images/icons8_code_50_sJr_icon.ico')}}" />
    <link href="{{ asset('/assets/plugins/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('frontend/css/bootstrap.css')}}" rel="stylesheet" />
    <link href="{{ asset('frontend/css/normalize.css')}}" rel="stylesheet" />
    <link href="{{ asset('frontend/css/transition-animations.css')}}" rel="stylesheet" />
    <link href="{{ asset('frontend/css/owl.carousel.css')}}" rel="stylesheet" />
    <link href="{{ asset('frontend/css/magnific-popup.css')}}" rel="stylesheet" />
    <link href="{{ asset('frontend/css/animate.css')}}" rel="stylesheet" />
    <link href="{{ asset('frontend/css/main.css')}}" rel="stylesheet" />
    <link href="{{ asset('frontend/npm/pixeden-stroke-7-icon_1-2-3/pe-icon-7-stroke/dist/pe-icon-7-stroke.min.css')}}" rel="stylesheet" />


    <link href="{{ asset('frontend/font-awesome/4-7-0/css/font-awesome.min.css')}}" rel="stylesheet"  crossorigin="anonymous">

    <script src="{{ asset('frontend/js/jquery-2.1.3.min.js')}}"></script>
    <script src="{{ asset('frontend/js/modernizr.custom.js')}}"></script>
    <script src="{{ asset('frontend/gtag/js_id_ua-62623871-2.js')}}"></script>
    <script src="{{ asset('frontend/gtag/js_id_ua-60241133-1.js')}}"></script>


    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-60241133-1');
    </script>


</head>


<body>

<style>
    * {box-sizing:border-box}

    /* Slideshow container */
    .slideshow-container {
        max-width: 1000px;
        position: relative;
        margin: auto;
    }

    /* Hide the images by default */
    .mySlides {
        display: none;
    }

    /* Next & previous buttons */
    .prev, .next {
        cursor: pointer;
        position: absolute;
        top: 50%;
        width: auto;
        margin-top: -22px;
        padding: 16px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        transition: 0.6s ease;
        border-radius: 0 3px 3px 0;
        user-select: none;
    }

    /* Position the "next button" to the right */
    .next {
        right: 0;
        border-radius: 3px 0 0 3px;
    }

    /* On hover, add a black background color with a little bit see-through */
    .prev:hover, .next:hover {
        background-color: rgba(0,0,0,0.8);
    }

    /* Caption text */
    .text {
        color: #f2f2f2;
        font-size: 15px;
        padding: 8px 12px;
        position: absolute;
        bottom: 8px;
        width: 100%;
        text-align: center;
    }

    /* Number text (1/3 etc) */
    .numbertext {
        color: #f2f2f2;
        font-size: 12px;
        padding: 8px 12px;
        position: absolute;
        top: 0;
    }

    /* The dots/bullets/indicators */
    .dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
    }

    .active, .dot:hover {
        background-color: #717171;
    }

    /* Fading animation */
    .fade {
        -webkit-animation-name: fade;
        -webkit-animation-duration: 1.5s;
        animation-name: fade;
        animation-duration: 1.5s;
    }

    @-webkit-keyframes fade {
        from {opacity: .4}
        to {opacity: 1}
    }

    @keyframes fade {
        from {opacity: .4}
        to {opacity: 1}
    }

</style>
<div id="portfolio-page" class="portfolio-page-content">


    <div class="container">
        <div class="portfolio-nav">
            <div id="portfolio-close-button" class="portfolio-close-button">
                <a href="{{url('/')}}"><i class="fa fa-close"></i></a>
            </div>
        </div>

        <div class="portfolio-title">
            <h1>{!! @$item->name !!}</h1>
        </div>

        <div class="row">
            <div class="col-sm-7 col-md-7">
                <div class="slideshow-container">
                    @if(!empty($items))
                        @php $count = 1; @endphp
                        @foreach($items as $new_i)
                            @php

                                $imaged = '';
                                $imaged = explode('/storage/', @$new_i->filename);
                                if(!empty($imaged[1])){
                                     $path_n =  $imaged[1];
                                }

                            @endphp
                            <div class="mySlides">
                                <img src="{{asset('storage/'.$path_n)}}" style="width: 653px;height: 500px; margin-right: 10px;">
                                <div class="text"></div>
                            </div>



                            @php  $count++;@endphp
                        @endforeach
                    @endif
                    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                    <a class="next" onclick="plusSlides(1)">&#10095;</a>

                </div>
                <br>

            </div>

            <div class="col-sm-5 col-md-5 portfolio-block">
                <!-- Project Description -->
                <div class="block-title">
                    <h3>Description</h3>
                </div>
                <ul class="project-general-info">
                    <li style="display: none"><p><i class="fa fa-user"></i>{!! @$item->name !!}</p></li>
                    <li><p><i class="fa fa-globe"></i> <a target="_blank" href="{!! @$item->url !!}">{!! @$item->url !!}</a></p></li>
                </ul>

                <p class="text-justify">{!! @$item->descriptions !!}</p>
                <!-- /Project Description -->

                <!-- Technology -->
                <div class="tags-block">
                    <div class="block-title">
                        <h3>Technology</h3>
                    </div>
                    <ul class="tags">
                        @php $pr = json_decode(@$item->technology); @endphp
                        @if(!empty($pr))
                            @foreach($pr as $p)
                                <li><a href="javascript:void(0)">{!! $p !!}</a></li>
                            @endforeach
                        @else
                            <li><a href="javascript:void(0)">No record found</a></li>
                        @endif

                    </ul>
                </div>
                <!-- /Technology -->

                <!-- Share Buttons -->
                <div style="display: none" class="btn-group share-buttons">
                    <div class="block-title">
                        <h3>Share</h3>
                    </div>
                    <a href="#" target="_blank" class="btn"><i class="fa fa-facebook"></i> </a>
                    <a href="#" target="_blank" class="btn"><i class="fa fa-twitter"></i> </a>
                    <a href="#" target="_blank" class="btn"><i class="fa fa-dribbble"></i> </a>
                </div>
                <!-- /Share Buttons -->
            </div>
        </div>
    </div>
</div>
<script>
    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
       // var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
       /* for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }*/
        slides[slideIndex-1].style.display = "block";
       // dots[slideIndex-1].className += " active";
    }

</script>
</body>

<script src="{{ asset('frontend/js/bootstrap.min.js')}}"></script>
<script src="{{ asset('frontend/js/page-transition.js')}}"></script>
<script src="{{ asset('frontend/js/imagesloaded.pkgd.min.js')}}"></script>
<script src="{{ asset('frontend/js/validator.js')}}"></script>
<script src="{{ asset('frontend/js/jquery.shuffle.min.js')}}"></script>
<script src="{{ asset('frontend/js/masonry.pkgd.min.js')}}"></script>
<script src="{{ asset('frontend/js/owl.carousel.min.js')}}"></script>
<script src="{{ asset('frontend/js/jquery.magnific-popup.min.js')}}"></script>
<script src="{{ asset('frontend/js/jquery.hoverdir.js')}}"></script>
<script src="{{ asset('frontend/js/main.js')}}"></script>
<script src="{{ asset('frontend/ajax/libs/handlebars-js/4-1-2/handlebars.min.js')}}"></script>
<script src="{{ asset('frontend/js/portfolio.js')}}"></script>

<script>
    /* a('.subpages .ajax-page-load').click(function() {
         alert();
         var url_p = 'project-details-load/'+a(this).attr('href');

         return window.location.hash = 'portfolio/' + url_p.substr(0, url_p.length - 5), !1
     })*/
</script>
