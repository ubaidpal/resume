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
            <h4 class="panel-title">{{@$_page_header_Experience}}</h4>
        </div>

        <div class="panel-body">
            @if(!empty($_view_data_exp))
                <table class="table table-striped table-bordered data-table">
                    <thead>
                    <tr>
                        <?php
                        $_th = current($_view_data_exp);
                        if(!empty($_th)) {
                            foreach ($_th as $k => $title) {
                                echo '<th>' . ucfirst(str_replace('_', ' ', $k)) . '</th>';
                            }
                        }
                        ?>
                    </tr>
                    </thead>
                    <tbody>
                    @if(count($_view_data_exp) > 0)
                        @foreach($_view_data_exp as $key => $val)
                            <tr class="even gradeC">
                                @foreach($val as $key_inner => $val_inner)
                                    <td>{!! $val_inner !!}</td>
                                @endforeach
                            </tr>
                        @endforeach
                    @else
                        <tr class="even gradeC">
                            <td>No Data Found</td>
                        </tr>
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
                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i
                        class="fa fa-expand"></i></a>

                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i
                        class="fa fa-minus"></i></a>

            </div>
            <h4 class="panel-title">{{@$_page_header_Experience}}</h4>
        </div>

        @if ($message = Session::get('exMessage'))
            <div class="alert alert-success fade in">
                <button type="button" class="close" data-dismiss="alert">
                    <span aria-hidden="true">&times;</span>
                </button>
                {{ $message }}
            </div>
        @endif

        <div class="panel-body panel-form">
            <form class="form-horizontal form-bordered" enctype="multipart/form-data" method="post"
                  action="{!! url($name.'/save-experience') !!}">
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

                    <label class="control-label col-md-4">Total Experience *</label>
                    <div class="col-md-8">
                        <input type="number" name="total_exp" class="form-control" min="1" id="total_exp"
                               placeholder="Enter total number of experience e.g 5 Year" value="" required/>

                    </div>
                </div>
                <div class="form-group">

                    <label class="control-label col-md-4">Start Date *</label>
                    <div class="col-md-8">
                        <input type="text" name="ex_start_date" class="form-control date_picker" id="ex_start_date"
                               placeholder="Enter Start Date" value="" required/>

                    </div>
                </div>

                <div class="form-group">

                    <label class="control-label col-md-4">End Date *</label>
                    <div class="col-md-8">
                        <input type="text" name="ex_end_date" class="form-control group1 date_picker" id="ex_end_date"
                               placeholder="Enter End Date" value="" required/>

                        <input type="checkbox" name="current" class="" id="current1"> Enabled End Date
                    </div>

                </div>

                <div class="form-group">

                    <label class="control-label col-md-4">Enter Details</label>
                    <div class="col-md-8">
                        <textarea class="form-control tiny" name="_experience" placeholder="Enter Your Experience" maxlength="1000" rows="5"
                                  id="experience"></textarea>

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
<script>
    $(function () {
        enable_cb();
        $("#current1").click(enable_cb);
    });

    function enable_cb() {
        if (this.checked) {
            $("input.group1").removeAttr("disabled");
        } else {
            $("input.group1").attr("disabled", true);
        }
    }
</script>
