<div class="col-md-10">
    <!-- begin col-6 -->

    <div class="panel panel-inverse" data-sortable-id="form-plugins-9">
        <div class="panel-heading">
            <div class="panel-heading-btn">
                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>

                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>

            </div>
            <h4 class="panel-title">About</h4>
        </div>

        <div class="panel-body">
            <form class="form-horizontal form-bordered" enctype="multipart/form-data" method="post" action="{!! url($name.'/save-about') !!}" >
                {{ csrf_field() }}

                @if ($message = Session::get('about'))
                    <div class="alert alert-success fade in">
                        <button type="button" class="close" data-dismiss="alert">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {{ $message }}
                    </div>
                @endif
                <div class="form-group">

                    <label class="control-label col-md-4">Enter About *</label>
                    <div class="col-md-8">
                        <textarea id="" class="form-control tiny" name="about" placeholder="maximum required 1000 word.." maxlength="1000" rows="5" id="about" >{!! @$about->about !!}</textarea>

                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-md-4"> </label>
                    <div class="col-md-8">
                        <button class="btn btn-primary btn-sm" type="submit"><i class="fa fa-save"></i> Submit</button>
                    </div>
                </div>
            </form>

        </div>

    </div>
</div>
