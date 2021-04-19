@if(Auth::check())

    @extends('layouts.form')

    @section($active_tab,"active")

@section('create_this')


@endsection

@section('content')
    @include('layouts.sidebar')
@stop

@section('content1')
    <div id="content" class="content">
        <ol class="breadcrumb pull-right">

            <li class="active">{{@$_page_header}}</li>
        </ol>
        <h1 class="page-header">{{@$_page_header}} - <small>{{@$_page_header_small}}</small></h1>
        <!-- end page-header -->

        <div class="col-md-10">
            <!-- begin col-6 -->

            <div class="panel panel-inverse" data-sortable-id="form-plugins-9">
                <div class="panel-heading">
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i
                                class="fa fa-expand"></i></a>

                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i
                                class="fa fa-minus"></i></a>

                    </div>
                    <h4 class="panel-title">{{@$_page_header}}</h4>
                </div>

                @if ($message = Session::get('message'))
                    <div class="alert alert-success fade in">
                        <button type="button" class="close" data-dismiss="alert">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {{ $message }}
                    </div>
                @endif

                <div class="panel-body panel-form">
                    <form class="form-horizontal form-bordered" enctype="multipart/form-data" method="post"
                          action="{{url($name.'/profile-update')}}">
                        {{ csrf_field() }}

                        @if ($errors->any())
                            <div class="alert alert-danger">
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif


                        <div class="form-group">

                            <input type="hidden" id="{{$id}}" value="{{$id}}" name="id" class="form-control">
                            <input type="hidden" id="" value="{{@$name}}" name="username" class="form-control">
                            <label class="control-label col-md-4">Enter Name *</label>
                            <div class="col-md-8">
                                <input type="text" id="" value="{!! @$adminProfile->name !!}" name="name" class="form-control">

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-4">Enter Contact </label>
                            <div class="col-md-8">
                                <input type="text" id="" placeholder="E.g.+1-555555555555555" value="{!! @$adminProfile->contact !!}"
                                       name="contact" class="form-control">

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-4">Enter Country </label>
                            <div class="col-md-8">
                                <input type="text" id="" placeholder="E.g. USA" value="{!! @$adminProfile->country !!}" name="country"
                                       class="form-control">

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-4">Enter Your Skype Id: </label>
                            <div class="col-md-8">
                                <input type="text" id="" placeholder="E.g. yourname@skype.com" value="{!! @$adminProfile->content_id !!}"
                                       name="content_id" class="form-control">

                            </div>
                        </div>


                        <div class="form-group">
                            <label class="control-label col-md-4">Avatar </label>
                            <div class="col-md-8">
                                <img id="profile_photo" src="{!! getUserAvatar() !!}" style="" class="img-responsive img-rounded" alt="">

                                <span class="btn btn-success fileinput-button">
								<a class="btn btn-green btn-block edit-item crop-avatar"
                                   href="javascript:void(0);"
                                   data-aspect-ratio="1/1" data-height="252" data-width="252"
                                   data-item-id="{{"public"}}" data-target-field="#profile_image_file" data-ratio="fixed"><span></span>Upload
								<span class="hidden-375">a profile</span> image</a>
							</span>
                                <span style="color: #00acac;">Only JPG, PNG and GIF files are allowed.</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">Email</label>
                            <div class="col-md-6">
                                <input type="email" disabled value="{!! @$adminProfile->email !!}" id="" name="email" class="form-control"
                                       required>
                            </div>

                            <div class="col-md-2">
                                <a id="showPass" href="javascript:void(0)">Change Password</a>
                                <a id="hidePass" style="display: none" href="javascript:void(0)">Hide Password</a>
                            </div>

                        </div>

                        <!-- begin panel -->
                        <div class="panel-body panel-form" style="display: none" id="pass">

                            <div class="form-group">
                                <label class="control-label col-md-4">Old Password</label>
                                <div class="col-md-8">
                                    <input type="password" name="old_password" class="form-control m-b-5"/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-4">New Password</label>
                                <div class="col-md-8">
                                    <input type="text" name="password" min="6" id="password-indicator-default" class="form-control m-b-5"/>
                                    <div id="passwordStrengthDiv" class="is0 m-t-5"></div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-md-4">Confirm Password </label>
                                <div class="col-md-8">
                                    <input type="text" name="conformed_password" class="form-control m-b-5"/>
                                </div>
                            </div>


                        </div>
                        <!-- end panel -->

                        <div class="form-group">
                            <label class="control-label col-md-4">Update User</label>
                            <div class="col-md-8">
                                <button class="btn btn-primary btn-sm" type="submit"><i class="fa fa-save"></i> Save</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    @include('layouts.cropper', ['url'=> url('/'.$name.'/profile_image_update')])

    <!-- begin row -->
        <div class="row">
            <div class="col-md-8">
                <div class="widget-chart with-sidebar bg-black">


                </div>
            </div>

        </div>
        <!-- end row -->


        <!-- end row -->
    </div>
    <style>

    </style>
@endsection

@section('script')
    <!--for cropper-->
    <script>
        var defImag = '{{asset('assets/img/user.png')}}';
    </script>
    <script src="{{ asset('/assets/jquery-cropper/js/cropper.min.js')}}"></script>
    <script src="{{ asset('/assets/jquery-cropper/js/main.js')}}"></script>

    <script>

        function changepass() {
            document.getElementById("changepass").style.display = "block";
            document.getElementById("feild").style.display = "none";
        }


        $(document).ready(function () {
            $("#showPass").click(function () {
                $("#pass").show('slow');
                $("#hidePass").show();
                $("#showPass").hide();

            });

        });

        $(document).ready(function () {
            $("#hidePass").click(function () {
                $("#pass").hide('slow');
                $("#showPass").show();
                $("#hidePass").hide();

            });

        });
    </script>

@stop

@endif

