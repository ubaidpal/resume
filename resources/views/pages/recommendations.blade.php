

@if(Auth::check())
    @extends('layouts.form')

    @section(@$active_tab,"active")
    @section(@$active_tab_1,"active")

@section('create_this')

@endsection

@section('content')
    @include('layouts.sidebar')
@stop
<link href="{{ asset('/assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css')}}" rel="stylesheet"/>
<link href="{{ asset('/assets/plugins/DataTables/extensions/Buttons/css/buttons.bootstrap.min.css')}}" rel="stylesheet"/>
<link href="{{ asset('/assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css')}}" rel="stylesheet"/>
<link href="{{ asset('/assets/css/style.min.css')}}" rel="stylesheet"/>
<link href="{{ asset('/assets/css/style-responsive.min.css')}}" rel="stylesheet"/>
@section('content1')

    <div id="content" class="content">
        <ol class="breadcrumb pull-right">

            <li class="active">{{@$_page_header}}</li>
        </ol>
        <h1 class="page-header">{{@$_page_header}} - <small>{{@$_page_header_small}}</small></h1>
        <!-- end page-header -->
    @include('pages.about')
        <div class="col-md-10">
            <!-- begin col-6 -->

            <div class="panel panel-inverse" data-sortable-id="form-plugins-9">
                <div class="panel-heading">
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>

                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>

                    </div>
                    <h4 class="panel-title">{{@$_page_header}}</h4>
                </div>


                <div class="panel-body">
                        @if(!$_view_data->isEmpty())
                        <table class="table table-striped table-bordered data-table">
                            <thead>
                            <tr>
                                <th>Thumbnail</th>
                                <th>Name</th>
                                <th>Comment</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            @if(!empty($_view_data))
                                @forelse($_view_data as $key => $r)
                                    @php
                                        $path = $editUrl = '';
                                            $delUrl =  url(@$name.'/delete-recommendations/'.@$r->id);
     $image = '';
                                                            $imgU = explode('/storage/', $r->url);
                                                            if(!empty($imgU[1])){
                                                                  $path =    asset('storage/'.$imgU[1]);
                                                            }

                                              $image =   '<img  id="profile_photo" style="width: 45px;height: 50px;" src="'.$path.'" class="img-responsive img-rounded" alt="">';
                                            $action = '<a onclick="myFunction()" href= "' . $delUrl . '"><i class = "fa fa-trash-o"></i> ' . @$r->name . '</a>';
                                             // $editUrl = '<a href= "' . url($name.'/edit-recommendations/'.$r->id) . '"><i class = "fa fa-pencil"></i>'.@$r->name.'</a> |';
                                    $action = $editUrl. '<a onclick="myFunction()" href= "' . $delUrl . '"> <i class = "fa fa-trash-o"></i> ' .@$r->name. '</a>';
                                    @endphp
                                    <tr class="even gradeC">
                                        <td>{!! $image !!}</td>
                                        <td>{!! @$r->name!!}</td>
                                        <td>{!! @$r->comment !!}</td>
                                        <td>{!! $action !!}</td>
                                    </tr>
                                @empty
                                    <tr class="even gradeC">
                                        <td>No Data Found</td>
                                    </tr>
                                @endforelse

                            @endif
                            </tbody>
                        </table>

                    @else
                        <div>No Data Found</div>
                    @endif
                </div>

            </div>
        </div>
        <div class="col-md-10">
            <!-- begin col-6 -->

            <div class="panel panel-inverse" data-sortable-id="form-plugins-9">
                <div class="panel-heading">
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>

                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>

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
                    <form class="form-horizontal form-bordered" enctype="multipart/form-data" method="post" action="{!! url($name.'/saveRecommendations') !!}" >
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

                            <label class="control-label col-md-4">Enter Recommender Name *</label>
                            <div class="col-md-8">
                                <input class="form-control" name="name" placeholder="Enter name.."  id="name" required/>

                            </div>
                        </div>

                        <div class="form-group">

                            <label class="control-label col-md-4">Enter Recommendation *</label>
                            <div class="col-md-8">
                                <textarea class="form-control tiny" name="comment" placeholder="maximum required 5000 word.." maxlength="5000" rows="5" id="comment" >{!! @$adminProfile->recommendation !!}</textarea>

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">Choose Image</label>
                            <div class="col-md-8">
                                <input id="image" type="file" name="image" required placeholder="png,jpeg,jpg allowed only">
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="control-label col-md-4"> </label>
                            <div class="col-md-8">
                                <button class="btn btn-primary btn-sm" type="submit"><i class="fa fa-save"></i> Save</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    <!-- begin row -->
        <!-- end row -->


        <!-- end row -->
    </div>
    <style>

    </style>
@endsection

@section('script')

    <script src="{{ asset('/assets/plugins/DataTables/media/js/jquery.dataTables.js')}}"></script>
    <script src="{{ asset('/assets/plugins/DataTables/media/js/dataTables.bootstrap.min.js')}}"></script>
    <script src="{{ asset('/assets/plugins/DataTables/extensions/Buttons/js/dataTables.buttons.min.js')}}"></script>
    <script src="{{ asset('/assets/plugins/DataTables/extensions/Buttons/js/buttons.bootstrap.min.js')}}"></script>
    <script src="{{ asset('/assets/plugins/DataTables/extensions/Buttons/js/buttons.flash.min.js')}}"></script>
    <script src="{{ asset('/assets/plugins/DataTables/extensions/Buttons/js/jszip.min.js')}}"></script>
    <script src="{{ asset('/assets/plugins/DataTables/extensions/Buttons/js/pdfmake.min.js')}}"></script>
    <script src="{{ asset('/assets/plugins/DataTables/extensions/Buttons/js/vfs_fonts.min.js')}}"></script>
    <script src="{{ asset('/assets/plugins/DataTables/extensions/Buttons/js/buttons.html5.min.js')}}"></script>
    <script src="{{ asset('/assets/plugins/DataTables/extensions/Buttons/js/buttons.print.min.js')}}"></script>
    <script src="{{ asset('/assets/plugins/DataTables/extensions/Responsive/js/dataTables.responsive.min.js')}}"></script>
    <script src="{{ asset('/assets/js/table-manage-buttons.demo.js')}}"></script>
{{--    <script src="{{ asset('/assets/js/table-manage-buttons.demo.min.js')}}"></script>--}}


    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/jquery.tinymce.min.js" referrerpolicy="origin"></script>
    <script>

        $(document).ready(function() {
            $('.data-table').DataTable( {
                dom: 'Bfrtip',
                buttons: [
                    { extend: 'copy', className: 'btn-sm' },
                    { extend: 'csv', className: 'btn-sm' },
                    { extend: 'excel', className: 'btn-sm' },
                    { extend: 'pdf', className: 'btn-sm' },
                    { extend: 'print', className: 'btn-sm' }
                ],
                "order": [[ 0, "desc" ]],
                responsive: true,
                autoFill: true,
                colReorder: true,
                keys: true,
                rowReorder: true,
                select: true
            } );
        } );

        $('textarea.tiny').tinymce({
            height: 500,
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
        });
        function myFunction() {
            confirm("Are You Sure!");
        }
    </script>
@stop

@endif

