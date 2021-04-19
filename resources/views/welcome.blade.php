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

    <style>
        .headermessage {
            margin: 19px;
            color: black;
            font-family: 'Open Sans', sans-serif;
            font-size: 16px;
            font-weight: bold;
        }
        .image-block {
            border: 3px solid white ;
            background-color: black;
            padding: 0px;
            margin: 0px;
            height:200px;
            text-align: center;
            vertical-align: bottom;
        }
        .image-block > p {
            width: 100%;
            height: 100%;
            font-weight: normal;
            font-size: 19px;
            padding-top: 150px;
            background-color: rgba(3,3,3,0.0);
            color: rgba(6,6,6,0.0);
        }
        .image-block:hover > p {
            background-color: rgba(3,3,3,0.5);
            color: white;
        }
    </style>
</head>


<body>
<!-- Loading animation -->
<div class="preloader" style="display: none;">
    <div class="preloader-animation">
        <div class="dot1"></div>
        <div class="dot2"></div>
    </div>
</div>
<!-- /Loading animation -->

<div id="page" class="page">
    <!-- Header -->
    <header id="site_header" class="header mobile-menu-hide">
        <div class="my-photo">
            <img src="{{ asset('/profileImage/' . @$user->avatar) }}" alt="image">
            <div class="mask"></div>
        </div>

        <div class="site-title-block">
            <h1 class="site-title">{{ucfirst(@$user->name)}}</h1>
            <p class="site-description">Full Stack Developer</p>
        </div>

        <!-- Navigation & Social buttons -->
        <div class="site-nav">
            <!-- Main menu -->
            <ul id="nav" class="site-main-menu">
                <!-- About Me Subpage link -->
                <li class="">
                    <a class="pt-trigger" href="#home" data-animation="58" data-goto="1">Home</a><!-- href value = data-id without # of .pt-page. Data-goto is the number of section -->
                </li>
                <!-- /About Me Subpage link -->
                <!-- About Me Subpage link -->
                <li class="">
                    <a class="pt-trigger" href="#about_me" data-animation="59" data-goto="2">About me</a>
                </li>
                <!-- /About Me Subpage link -->
                <li class="">
                    <a class="pt-trigger" href="#resume" data-animation="60" data-goto="3">Resume</a>
                </li>
                <li class="">
                    <a class="pt-trigger" href="#portfolio" data-animation="61" data-goto="4">Portfolio</a>
                </li>
                <li style="display: none" class="">
                    <a class="pt-trigger" href="#blog" data-animation="58" data-goto="5">Blog</a>
                </li>
                <li >
                    <a class="pt-trigger" href="#contact" data-animation="59" data-goto="6">Contact</a>
                </li>
            </ul>
            <!-- /Main menu -->

            <!-- Social buttons -->
            <ul class="social-links">
                <li><a class="tip social-button" target="_blank" href="{{ 'https://'.@$socials->linkedin}}" title="Linkedin"><i class="fa fa-linkedin"></i></a></li> <!-- Full list of social icons: http://fontawesome.io/icons/#brand -->
                <li><a class="tip social-button" target="_blank"  href="{{'https://'.@$socials->github}}" title="Github"><i class="fa fa-github"></i></a></li>
                <li><a class="tip social-button" target="_blank"  href="{{'https://'.@$socials->twitter}}" title="Twitter"><i class="fa fa-twitter"></i></a></li>
                <li><a class="tip social-button" target="_blank"  href="{{'https://'.@$socials->facebook}}" title="Facebook"><i class="fa fa-facebook"></i></a></li>
                <li><a class="tip social-button" target="_blank"  href="{{'https://'.@$socials->instagram}}" title="Instagram"><i class="fa fa-instagram"></i></a></li>
                <!--<li><a class="tip social-button" href="#" title="Youtube"><i class="fa fa-youtube"></i></a></li>-->
                <!--<li><a class="tip social-button" href="#" title="last.fm"><i class="fa fa-lastfm"></i></a></li>-->
                <!--<li><a class="tip social-button" href="#" title="Dribbble"><i class="fa fa-dribbble"></i></a></li>-->
            </ul>
            <!-- /Social buttons -->
        </div>
        <!-- Navigation & Social buttons -->
    </header>
    <!-- /Header -->

    <!-- Mobile Header -->
    <div class="mobile-header mobile-visible">
        <div class="mobile-logo-container">
            <div class="mobile-site-title">{{ucfirst(@$user->name)}}</div>
        </div>

        <a class="menu-toggle mobile-visible">
            <i class="fa fa-bars"></i>
        </a>
    </div>
    <!-- /Mobile Header -->

    <!-- Main Content -->
    <div id="main" class="site-main">
        <!-- Page changer wrapper -->
        <div class="pt-wrapper">
            <!-- Subpages -->
            <div class="subpages">

                <!-- Home Subpage -->
                <section class="pt-page pt-page-1 section-with-bg section-paddings-0" style="background-image: url('frontend/images/home_page_bg_2.jpg');" data-id="home">
                    <div class="home-page-block-bg">
                        <div class="mask"></div>
                    </div>
                    <div class="home-page-block">
                        <div class="v-align">
                            <h2>{{ucfirst(@$user->name)}}</h2>
                            <div id="rotate" class="text-rotate">
                                <div style="display: block;">
                                    <p class="home-page-description">Full Stack Developer</p>
                                </div>
                                {{--<div style="display: block;">
                                    <p class="home-page-description">Web Developer</p>
                                </div>
                                <div style="display: block;">
                                    <p class="home-page-description">Mobile Developer</p>
                                </div>--}}
                            </div>

                            <div style="display: none"  class="block end" style="text-align: center">
                                <ul class="info-list">
                                    <li><span class="title">Age</span><span class="value">29</span></li>
                                    <li><span class="title">Address</span><span class="value">88 Some Street, Some Town</span></li>
                                    <li><span class="title">e-mail</span><span class="value"><a href=""><span class="__cf_email__" data-cfemail="553038343c3915302d34382539307b363a38"> </span></a></span></li>
                                    <li><span class="title">Phone</span><span class="value">+0123 123 456 789</span></li>
                                    <li><span class="title">Freelance</span><span class="value available">Available</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- End of Home Subpage -->

                <!-- About Me Subpage -->
                <section class="pt-page pt-page-2" data-id="about_me">
                    <div class="section-title-block">
                        <h2 class="section-title">About Me</h2>
                        <h5 class="section-description">Artist, Thinker, Team Player</h5>
                    </div>

                    <div class="row">
                        <div class="col-sm-6 col-md-6 subpage-block">
                            <div class="general-info">
                                {!! $user->about !!}
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-6 subpage-block" >
                            <div class="block-title">
                                <h3>Recommendations</h3>
                            </div>
                            <div class="testimonials owl-carousel owl-loaded owl-drag slideshow-container">
                                <!-- Testimonial 2 -->


                                @if(!$recommendations->isEmpty())

                                    @forelse($recommendations as $r)
                                        <div class="testimonial-item mySlides">
                                            <!-- Testimonial Content -->
                                            <div class="testimonial-content">
                                                <div class="testimonial-text">
                                                    {!! @$r->comment !!}
                                                </div>
                                            </div>

                                            <div class="testimonial-credits">
                                                <!-- Picture -->
                                                <div class="testimonial-picture">

                                                    @php

                                                        $image = '';
                                                        $imgU = explode('/storage/', $r->url);
                                                        if(!empty($imgU[1])){

                                                             $path =  $imgU[1];
                                                        }
                                                    @endphp
                                                    <img src="{{asset('storage/'.$path)}}" alt="">
                                                </div>
                                                <!-- /Picture -->
                                                <!-- Testimonial author information -->
                                                <div class="testimonial-author-info">
                                                    <p class="testimonial-author">  {!! ucfirst(@$r->name) !!}</p>
                                                </div>
                                            </div>
                                        </div>
                                        @empty
                                            <p>Not Found</p>
                                    @endforelse
                                         <div style="margin-top:5px;float: right;">
                                             <a class="prev" onclick="plusSlides(-1)" style="cursor: pointer;">&#10094;</a>
                                             <a class="next" onclick="plusSlides(1)" style="cursor: pointer;">&#10095;</a>
                                         </div>

                                @else
                                    <p>Not Found</p>
                                @endif



                            </div>
                        </div>

                        <!-- Services block -->
                        <div class="block-title">
                            <h3>Services</h3>
                        </div>

                        <div class="row">
                            <div class="col-sm-6 col-md-3 subpage-block">
                                <div class="service-block">
                                    <div class="service-info">
                                        <img src="{{asset('frontend/images/web_design.png')}}" alt="Responsive Design">
                                        <h4>Web/Mobile Development</h4>
                                        <p style="display: none"></p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-6 col-md-3 subpage-block">
                                <div class="service-block">
                                    <div class="service-info">
                                        <img src="{{asset('frontend/images/copywrite.png')}}" alt="Copywriter">
                                        <h4>Testing and Documentation</h4>
                                        <p></p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-6 col-md-3 subpage-block">
                                <div class="service-block">
                                    <div class="service-info">
                                        <img src="{{asset('frontend/images/ecommerce.png')}}" alt="E-Commerce">
                                        <h4>E-Commerce</h4>
                                        <p></p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-6 col-md-3 subpage-block">
                                <div class="service-block">
                                    <div class="service-info">
                                        <img src="{{asset('frontend/images/management.png')}}" alt="Management">
                                        <h4>Project Management</h4>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End of Services block -->

                        <!-- Clients block -->
                        <div style="display: none" class="block-title">
                            <h3>Clients</h3>
                        </div>

                        <div style="display: none" class="row">
                            <div class="col-sm-4 col-md-2 subpage-block">
                                <div class="client_block">
                                    <a href="http://localhost/cv/#" target="_blank"><img src="#" alt="image"></a>
                                </div>
                            </div>

                            <div class="col-sm-4 col-md-2 subpage-block">
                                <div class="client_block">
                                    <a href="http://localhost/cv/#" target="_blank"><img src="#" alt="image"></a>
                                </div>
                            </div>

                            <div class="col-sm-4 col-md-2 subpage-block">
                                <div class="client_block">
                                    <a href="http://localhost/cv/#" target="_blank"><img src="#" alt="image"></a>
                                </div>
                            </div>

                            <div class="col-sm-4 col-md-2 subpage-block">
                                <div class="client_block">
                                    <a href="http://localhost/cv/#" target="_blank"><img src="#" alt="image"></a>
                                </div>
                            </div>

                            <div class="col-sm-4 col-md-2 subpage-block">
                                <div class="client_block">
                                    <a href="http://localhost/cv/#" target="_blank"><img src="#" alt="image"></a>
                                </div>
                            </div>

                            <div class="col-sm-4 col-md-2 subpage-block">
                                <div class="client_block">
                                    <a href="http://localhost/cv/#" target="_blank"><img src="{{asset('frontend/images/client_6.html')}}" alt="image"></a>
                                </div>
                            </div>
                        </div>
                        <!-- End of Clients block -->

                        <!-- Fun facts block -->
                        <div style="display: none" class="block-title">
                            <h3>Fun Facts</h3>
                        </div>

                        <div  class="row">
                            <div class="col-sm-6 col-md-3 subpage-block">
                                <div class="fun-fact-block gray-bg">
                                    <i class="bg fa fa-smile-o fa-10x"></i>
                                    <h4>Happy Clients</h4>
                                    <span class="fun-value">Many</span>
                                </div>
                            </div>

                            <div class="col-sm-6 col-md-3 subpage-block">
                                <div class="fun-fact-block">
                                    <i class="fa fa-times fa-lg"></i>
                                    <h4>Working Hours</h4>
                                    <span class="fun-value">17,520</span>
                                </div>
                            </div>

                            <div style="display: none" class="col-sm-6 col-md-3 subpage-block">
                                <div class="fun-fact-block gray-bg">
                                    <i class="fa fa-trophy fa-lg"></i>
                                    <h4>Awards Won</h4>
                                    <span class="fun-value">21</span>
                                </div>
                            </div>

                            <div class="col-sm-6 col-md-3 subpage-block">
                                <div class="fun-fact-block">
                                    <i class="fa fa-coffee fa-lg"></i>
                                    <h4>Coffee Consumed</h4>
                                    <span class="fun-value">20,000</span>
                                </div>
                            </div>
                        </div>
                        <!-- End of Fun fucts block -->
                </section>

                <!-- End of About Me Subpage -->

                <!-- Resume Subpage -->
                <section class="pt-page pt-page-3" data-id="resume">
                    <div class="row">
                        <div class=" col-sm-9 col-md-9 section-title-block">
                            <h2 class="section-title">Resume</h2>
                            <h5 class="section-description"></h5>
                        </div>
                        {{--<div class="col-sm-3 col-md-3">
                            <div class="download-cv-block">
                                <a class="button" target="_blank" href="">Download CV</a>
                            </div>
                        </div>--}}
                    </div>

                    <div class="row">



                        <div class="col-sm-6 col-md-4 subpage-block">
                            <div class="block-title">
                                <h3>Experience</h3>
                            </div>
                            @if(!empty($experience))
                                @foreach($experience->_experience as $q)
                                    <div class="timeline">
                                        <!-- Single event -->
                                        <div class="timeline-event te-primary">
                                            <h5 class="event-date">{{@$q->ex_start_date.getCurrentYear(@$q->ex_end_date)}}</h5>
                                            <h6 class="section-description">{!! (!empty(@$q->total_exp)) ? 'Total Experience '.$q->total_exp : 'Experience not found.' !!}</h6>
                                            <ul>
                                                <li>{!! @$q->experience !!}</li>

                                            </ul>
                                        </div>

                                    </div>
                                @endforeach
                            @else
                                <div class="timeline">
                                    <!-- Single event -->
                                    <div class="timeline-event te-primary">
                                        <span class="event-description">Record Not Found.</span>

                                    </div>

                                </div>
                            @endif
                        </div>



                        <div class="col-sm-6 col-md-4 subpage-block">
                            <div class="block-title">
                                <h3>Education</h3>
                            </div>
                            @if($qualification)
                                @foreach($qualification->_qualifications as $q)
                                    <div class="timeline">
                                        <!-- Single event -->
                                        <div class="timeline-event te-primary">
                                            <h5 class="event-date">{!! @$q->start_date .' - '.@$q->end_date !!}</h5>
                                            <span class="event-description">{!! $q->qualifications !!}</span>
                                        </div>
                                        <!-- Single event -->
                                    </div>
                                @endforeach
                            @else
                            @endif

                        </div>



                        <div class="col-sm-6 col-md-4 subpage-block">
                            <div class="block-title">
                                <h3>Server Side Languages</h3>
                            </div>
                            <div class="skills-info">
                                <h4>Nodejs</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>

                                <h4>PHP 5&7,8 (Laravel,Yii, Codeigniter)</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>

                                <h4>Python</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-2"></div>
                                </div>
                            </div>

                            <div class="block-title">
                                <h3>Front-End</h3>
                            </div>
                            <div class="skills-info">
                                <h4>Angular</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>
                                <h4>VueJs/Vuex</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>
                                <h4>ReactJs/Redux</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>
                                <h4>HML5</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>

                                <h4>CSS3</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>

                                <h4>jQuery</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>

                            </div>


                            <div class="block-title">
                                <h3>Databases</h3>
                            </div>
                            <div class="skills-info">
                                <h4>MySQL</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>
                                <h4>MongoDB</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>


                            </div>


                            <div class="block-title">
                                <h3>CMS</h3>
                            </div>
                            <div class="skills-info">
                                <h4>WordPress</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>
                                <h4>Shopify</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-2"></div>
                                </div>
                                <h4>OpenCart</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-2"></div>
                                </div>


                            </div>

                            <div class="block-title">
                                <h3>Other Skills</h3>
                            </div>
                            <div class="skills-info">
                                <h4>AWS Services</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>
                                <h4>Docker</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>
                                <h4>Apache/</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>
                                <h4>Git / SVN / Jira / Slack</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>
                                <h4>Automated Testing (Headless Chrome)</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>


                                <h4>Jenkins / Memecache</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>

                                <h4>Linux / Bash Scripting</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>

                                <h4>SSO(SAML2.0)</h4>
                                <div class="skill-container">
                                    <div class="skill-percentage skill-1"></div>
                                </div>





                            </div>


                        </div>
                    </div>

                </section>
                <!-- End Resume Subpage -->


                <!-- Portfolio Subpage -->
                <section class="pt-page pt-page-4 pt-page" data-id="portfolio">
                    <div class="section-title-block">
                        <h2 class="section-title">Portfolio</h2>
                        <h5 class="section-description">Some of My Recent Projects</h5>
                    </div>

                    <!-- Portfolio Content -->
                    <div class="portfolio-content">

                        <!-- Portfolio filter -->
                        <ul id="portfolio_filters" class="portfolio-filters" style="">

                            @php
                                $technology = workAtTechnology();
                            @endphp

                        @foreach($technology as $key => $t)
                                @if(isset($items[0]->type) && $items[0]->type == $key)
                                    @php
                                        $active = 'active';
                                    @endphp
                                @else
                                    @php
                                        $active = '';
                                    @endphp
                                @endif
                                <li class="{!! $active !!}">
                                    <a class="filter btn btn-sm btn-link change_project {!! $active !!}" id="{!! $key !!}" data-group="{!! $key !!}">{!! $t !!}</a>
                                </li>
                            @endforeach

                        </ul>
                        <!-- End of Portfolio filter -->

                        <!-- Portfolio Grid -->

                        <div class="container-fluid">
                            <div class="row">
                                <div class="projects_data">
                            @if(!empty($items))
                                @forelse($items as $its)

                                        <script>var project_details = '{!! @$its !!}';</script>
                                    @php

                                        $image = '';
                                        $image = explode('/storage/', $its->itemDetails[0]->filename);
                                        if(!empty($image[1])){
                                             $path =  $image[1];
                                        }
                                    @endphp


                                        <a  href="{{url('project-details-load/'.@$its->id)}}">
                                        <div class="image-block col-sm-4" style="background:url({{'storage/'.$path}}) no-repeat center top;background-size:cover;">
                                            <p>{!! @$its->name !!}</p>
                                            <small style="text-decoration: none;color: #9c9c9c;">{!! @$its->descriptions !!}</small>
                                        </div>


                                        </a>



                                @empty
                                    <div> No Data Found</div>
                                @endforelse

                            @endif
                            </div>
                        </div>
                        </div>

                        <!-- /Portfolio Grid -->

                    </div>
                    <!-- /Portfolio Content -->

                </section>
                <!-- /Portfolio Subpage -->

                <!-- Blog Subpage -->
                <section class="pt-page pt-page-5" data-id="blog">
                    <div class="section-title-block">
                        <h2 class="section-title">Blog</h2>

                    </div>
                    <div class="blog-masonry" style="position: relative; height: 0px;">
                        <!-- Blog Post 1 -->
                        <div class="item" style="position: absolute; left: 0px; top: 0px; transition-property: opacity, transform; transition-duration: 0.4s; transition-delay: 0ms;">
                            <div class="blog-card">
                                <div class="media-block">
                                    <a href="#">
                                        <img class="post-image img-responsive" src="#" alt="blog-post-1">
                                        <div class="mask"></div>
                                        <div class="post-date"><span class="day">6</span><span class="month">Dec</span><!--<span class="year">2016</span>--></div>
                                    </a>
                                </div>
                                <div class="post-info">
                                    <ul class="category">
                                        <li><a href="http://localhost/cv/#">Travel</a></li>
                                    </ul>
                                    <a href="#"><h4 class="blog-item-title">Bootstrap is the Most Popular Framework</h4></a>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <!-- End Blog Subpage -->

                <!-- Contact Subpage -->
                <section class="pt-page pt-page-6 " data-id="contact">
                    <div class="section-title-block">
                        <h2 class="section-title">Contact</h2>
                        <h5 class="section-description">Get in Touch</h5>
                    </div>

                    <div class="row">
                        <div class="col-sm-6 col-md-6 subpage-block">
                            <div class="block-title">
                                <h3>Get in Touch</h3>
                            </div>
                            <p></p>
                            <div class="contact-info-block">
                                <div class="ci-icon">
                                    <i class="fa fa-globe"></i>
                                </div>
                                <div class="ci-text">
                                    <h5>{!! ucfirst(@$user->country) !!}</h5>
                                </div>
                            </div>
                            <div class="contact-info-block">
                                <div class="ci-icon">
                                    <i class="fa fa-mail-forward"></i>
                                </div>
                                <div class="ci-text">
                                    <h5><a href="javascript:void(0)" class="__cf_email__" data-cfemail="0967686c6c647a6168613d3c496e64686065276a6664"></a>{!! @$user->email !!}</h5>
                                </div>
                            </div>
                            <div class="contact-info-block">
                                <div class="ci-icon">
                                    <i class="fa fa-info"></i>
                                </div>
                                <div class="ci-text">
                                    <h5>{!! @$user->contact !!}</h5>
                                </div>
                            </div>
                            <div class="contact-info-block">
                                <div class="ci-icon">
                                    <i class="fa fa-user"></i>
                                </div>
                                <div class="ci-text">
                                    <h5>Skype ID : {!! @$user->content_id !!}</h5>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-6 subpage-block">
                            <div class="block-title">
                                <h3>Contact Form</h3>
                            </div>
                            <form id="form_submit"  method="get" action=""  novalidate="true">

                                <span  id="n_messages"></span>

                                <input type="hidden" value="{{ csrf_token() }}">
                                <div class="controls">
                                    <div class="form-group">
                                        <input id="form_name" type="text" name="contact_name" class="form-control" placeholder="Full Name" required="required" data-error="Name is required.">
                                        <div class="form-control-border"></div>
                                        <i class="form-control-icon fa fa-user"></i>
                                        <div class="help-block with-errors"></div>
                                    </div>

                                    <div class="form-group">
                                        <input id="form_email" type="email" name="email" class="form-control" placeholder="Email Address" required="required" data-error="Valid email is required.">
                                        <div class="form-control-border"></div>
                                        <i class="form-control-icon fa fa-envelope"></i>
                                        <div class="help-block with-errors"></div>
                                    </div>

                                    <div class="form-group">
                                        <textarea id="form_message" name="message" maxlength="100" class="form-control" placeholder="Message for me, only 100 word allowed" rows="4" required="required" data-error="Please, leave me a message."></textarea>
                                        <div class="form-control-border"></div>
                                        <i class="form-control-icon fa fa-comment"></i>
                                        <div class="help-block with-errors"></div>
                                    </div>

                                    <input type="hidden" name="_next" value="index.html#contact" />

                                    <input type="submit" class="button btn-send" value="Send message">
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <!-- End Contact Subpage -->

            </div>
        </div>
        <!-- /Page changer wrapper -->
    </div>
    <!-- /Main Content -->

</div>
</div>
{{--@if(!empty($items))
    <script id="portfolio-item" type="text/x-handlebars-template">
        @foreach($items as $key => $n_item)
        <figure class="item shuffle-item filtered" data-groups="[&quot;all&quot;, &quot;wordpress&quot;, &quot;reactjs&quot;, &quot;php&quot;]"
                style="position: absolute; top: 0px; left: 0px; visibility: visible; transition: transform 450ms ease-out 0s, opacity 450ms ease-out 0s;">
            @php

                $image = '';
                $image = explode('/storage/', $n_item->itemDetails[0]->filename);
                if(!empty($image[1])){
                     $path =  $image[1];
                }
            @endphp
            <a class="ajax-page-load" href="javascript:void(0)">
                <img src="{{asset('storage/'.$path)}}" alt="">
                <div style="display: block; left: 0px; top: 100%; transition: all 300ms ease 0s;">
                    <h5 class="name">{{ucfirst(@$n_item->name)}}</h5>
                    <small></small>
                </div>
            </a>
        </figure>

        @endforeach
    </script>
@endif--}}
<!-- portfolio-item -->

<!-- portfolio-item -->
</body>


<script>

    $('form').submit(function (e) {
        e.preventDefault();
        var formData = {
            'name': $('#form_name').val(),
            'email': $('#form_email').val(),
            'message': $('#form_message').val()
        };
        console.log(formData);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        jQuery.ajax({
            url: '{{url('contact-us')}}',
            type: "get",
            data: formData,
            //  "_token": "{{ csrf_token() }}",
            success: function (data) {

                if(data){

                    $('#n_messages').html('<div class="alert alert-success" > Message sent successfully! </div>');
                    $('#form_name').val('');
                    $('#form_email').val('');
                    $('#form_message').val('');

                }else {
                    $('.n_messages').html('<div class="alert alert-danger"> Opps! something wronged to send message. </div>');
                }
            }, error: function (xhr, ajaxOptions, thrownError) {
                console.log("ERROR:" + xhr.responseText + " - " + thrownError);
            }
        });
    });
    function myFunction() {
        confirm("Are You Sure!");
    }

    $('.change_project').click(function (e) {
        e.preventDefault();
        $('.portfolio-filters').children("li").removeClass("active");
        $(this).parent("li").addClass("active");

        jQuery.ajax({
            url: '{{url('multi-project-uploads-json')}}',
            type: "get",
            data: {type_id : e.target.id},
             "_token": "{{ csrf_token() }}",
            success: function (response) {

                if (response) {

                    var optionsHtml = '';
                    var subChild = '{{url('project-details-load/')}}';

                    $.each(response, function (key, val) {

                        var filePath = '',
                            filePath = val.item_details[0].filename,
                            filePath = filePath.split('/storage/'),
                         //   filePath = '{!! url('storage/') !!}'+'/'+filePath[1];
                            filePath = 'storage/'+filePath[1];

                        optionsHtml += '<a  href="' + subChild +'/'+ val.id + '">';
                        optionsHtml += '<div class="image-block col-sm-4" style="background: url('+filePath+') no-repeat center top;background-size:cover;">';
                        optionsHtml += '<p>' + val.name + '</p>';
                        optionsHtml += '<small style="text-decoration: none;color: #9c9c9c;">' + val.descriptions + '</small>';
                        optionsHtml += '</div>';
                        optionsHtml += '</a>';

                    });
                    console.log(optionsHtml);
                    $('.projects_data').html(optionsHtml);
                }else{
                    $('.projects_data').html('Not Found...');
                }


            }, error: function (xhr, ajaxOptions, thrownError) {
                console.log("ERROR:" + xhr.responseText + " - " + thrownError);
            }
        });



    });
</script>



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


       setInterval(function (){
           plusSlides(1);
       },6000)

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


   /* a('.subpages .ajax-page-load').click(function() {
        alert();
        var url_p = 'project-details-load/'+a(this).attr('href');

        return window.location.hash = 'portfolio/' + url_p.substr(0, url_p.length - 5), !1
    })*/

</script>

