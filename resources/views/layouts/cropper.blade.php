<!--

   Year 2020
   -->

<div class="modal fade" id="avatar-modal" aria-hidden="true" aria-labelledby="avatar-modal-label" role="dialog"
     tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form class="avatar-form" action="{{$url}}" enctype="multipart/form-data"
                  method="post" role="form" data-toggle="validator">
                {!! csrf_field() !!}
                <input type="hidden" id="{{$id}}" value="{{$id}}" name="session_id" class="form-control">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="avatar-modal-label">Change Avatar</h4>
                </div>
                <div class="modal-body">
                    <div class="avatar-body">

                        <!-- Upload image and data -->
                        <div class="avatar-upload">
                            <input type="hidden" class="avatar-src" name="avatar_src">
                            <input type="hidden" class="avatar-data" name="avatar_data">
                            <label for="avatarInput">Local upload</label>
                            <input type="file" class="avatar-input" id="avatarInput" name="avatar_file">
                        </div>

                        <!-- Crop and preview -->
                        <div class="row">
                            <div class="col-md-9">
                                <div class="avatar-wrapper"></div>
                            </div>
                            <div class="col-md-3">
                                <div class="avatar-preview preview-sm"></div>
                            </div>
                        </div>

                        <div class="row avatar-btns">
                            <div class="col-md-3">
                                <button type="button" class="btn btn-primary" data-method="zoom" data-option="0.1" title="Zoom In" style="color:#000000;">
                                    Zoom In
                                </button>
                                <button type="button" class="btn btn-primary" data-method="zoom" data-option="-0.1" title="Zoom In" style="color:#000000;">
                                    Zoom Out
                                </button>
                                <button type="radio" class="sr-only" id="viewMode3" name="viewMode" value="3"></button>

                                <button type="submit" class="btn btn-primary avatar-save avatar-save" style="margin-top:15px;">Done</button>

                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div> -->
            </form>
        </div>
    </div>
    <!-- Loading state -->
    <div class="loading" aria-label="Loading" role="img" tabindex="-1"></div>
    <!-- Cropping modal -->

</div><!-- /.modal -->

