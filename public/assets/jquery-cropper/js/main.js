(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals.
        factory(jQuery);
    }
})(function ($) {

    'use strict';

    var console = window.console || {
            log: function () {
            }
        };

    function CropAvatar($element, aspectRatio) {
        this.$container = $element;

        this.height = $element.data('height');
        this.width = $element.data('width');
        this.$itemId = $element.data('itemId');

        this.$targetField = false;
        if (this.$container.attr('data-target-field')) {
            this.$targetField = this.$container.data('targetField');
        }
        this.$avatarView = this.$container.find('.avatar-view');
        this.$avatar = this.$avatarView.find('img');
        this.$avatarModal = $('#avatar-modal');
        //this.$loading = this.$container.find('.loading');
        this.$loading = $('.loading');
        this.$avatarForm = this.$avatarModal.find('.avatar-form');
        this.$avatarUpload = this.$avatarForm.find('.avatar-upload');
        this.$avatarSrc = this.$avatarForm.find('.avatar-src');
        this.$avatarData = this.$avatarForm.find('.avatar-data');
        this.$avatarInput = this.$avatarForm.find('.avatar-input');
        this.$avatarSave = this.$avatarForm.find('.avatar-save');
        this.$avatarBtns = this.$avatarForm.find('.avatar-btns');

        this.$avatarWrapper = this.$avatarModal.find('.avatar-wrapper');
        this.$avatarPreview = this.$avatarModal.find('.avatar-preview');
        this.$aspectRatio = aspectRatio;

        this.$updateId = false;

        if (this.$container.attr('data-update-id')) {
            this.$updateId = this.$container.attr('data-update-id');
        }

        this.init();
    }

    CropAvatar.prototype = {
        constructor: CropAvatar,

        support: {
            fileList: !!$('<input type="file">').prop('files'),
            blobURLs: !!window.URL && URL.createObjectURL,
            formData: !!window.FormData
        },

        init: function () {
            this.support.datauri = this.support.fileList && this.support.blobURLs;

            if (!this.support.formData) {
                this.initIframe();
            }
            this.$avatarForm.find('.slider-banner').remove();
            if (this.$container.attr('data-type')) {
                this.$sliderBenner = this.$container.data('type');
                //if(this.$avatarForm.find('.slider-banner').length == 0){
                this.appendInModal(this.$sliderBenner);
                //  }
            }//else{

            //}

            this.initTooltip();
            this.initModal();
            this.addListener();
        },

        addListener: function () {
            this.$avatarInput.unbind('change');
            this.$avatarView.unbind('click');
            this.$avatarBtns.unbind('click');

            this.$avatarView.on('click', $.proxy(this.click, this));
            this.$avatarInput.on('change', $.proxy(this.change, this));
            this.$avatarForm.on('submit', $.proxy(this.submit, this));
            this.$avatarBtns.on('click', $.proxy(this.rotate, this));
        },

        initTooltip: function () {
            this.$avatarView.tooltip({
                placement: 'bottom'
            });
        },
        appendInModal: function ($type) {
            if ($type == 'slider-banner') {
                var html = '<div class="slider-banner"><input type="hidden" value=' + $type + ' name="slider_banner"><div class="form-group"><label for="title">Title:</label><input type="text" value="" placeholder="Enter Title" required="" id="title" class="form-control" name="title"></div><div class="form-group"><label for="title">Detail:</label><textarea placeholder="Detail" required="" id="" class="form-control" name="detail"></textarea></div></div> ';
                this.$avatarForm.find('.avatar-body').prepend(html);
            }
        },
        initModal: function () {
            this.$avatarForm.unbind('submit');

            this.$avatarModal.modal({
                show: false
            });
        },

        initPreview: function () {
            var url = this.$avatar.attr('src');

            if(url != undefined){
                this.$avatarPreview.html('<img  alt="" src="' + url + '">');

            }else{
                this.$avatarPreview.html('<img alt="" style="width: 50px;height:50px" src="' + defImag + '">');
            }

        },

        initIframe: function () {
            var target = 'upload-iframe-' + (new Date()).getTime();
            var $iframe = $('<iframe>').attr({
                name: target,
                src: ''
            });
            var _this = this;

            // Ready ifrmae
            $iframe.one('load', function () {

                // respond response
                $iframe.on('load', function () {
                    var data;

                    try {
                        data = $(this).contents().find('body').text();
                    } catch (e) {
                        console.log(e.message);
                    }

                    if (data) {
                        try {
                            data = $.parseJSON(data);
                        } catch (e) {
                            console.log(e.message);
                        }

                        _this.submitDone(data);
                    } else {
                        _this.submitFail('Image upload failed!');
                    }

                    _this.submitEnd();

                });
            });

            this.$iframe = $iframe;
            this.$avatarForm.attr('target', target).after($iframe.hide());
        },

        click: function () {
            this.$avatarModal.modal('show');
            this.initPreview();
        },

        change: function () {

            var files;
            var file;
            if (this.support.datauri) {
                files = this.$avatarInput.prop('files');

                if (files.length > 0) {
                    file = files[0];
                    if (this.isImageFile(file)) {
                        if (this.url) {
                            URL.revokeObjectURL(this.url); // Revoke the old one
                        }

                        this.url = URL.createObjectURL(file);
                        this.startCropper();
                    }
                }
            } else {
                file = this.$avatarInput.val();

                if (this.isImageFile(file)) {
                    this.syncUpload();
                }
            }
        },

        submit: function () {
            if (!this.$avatarSrc.val() && !this.$avatarInput.val()) {
                return false;
            }

            if (this.support.formData) {
                this.ajaxUpload();
                return false;
            }
        },

        rotate: function (e) {
            var data;

            if (this.active) {
                data = $(e.target).data();

                if (data.method) {
                    this.$img.cropper(data.method, data.option);
                }
            }
        },

        isImageFile: function (file) {
            if (file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif)$/.test(file);
            }
        },

        startCropper: function () {
            var _this = this;
            var ratio = this.$aspectRatio.split('/');
            if (this.active) {
                this.$img.cropper('replace', this.url);
            } else {
                this.$img = $('<img src="' + this.url + '">');
                this.$avatarWrapper.empty().html(this.$img);
                var data = this.$container.data();
                var reSizeAble = true;
                var aspectRatio = NaN;
                if(typeof data.ratio != 'undefined' && data.ratio == 'fixed'){
                    reSizeAble = false;
                    aspectRatio= parseInt(ratio[0]) / parseInt(ratio[1])
                }

                this.$img.cropper({
                    //aspectRatio: parseInt(ratio[0]) / parseInt(ratio[1]),
                    aspectRatio: aspectRatio,
                    dragMode: 'move',
                    restore: false,
                    guides: false,
                    highlight: false,
                    cropBoxResizable: reSizeAble,
                    multiple: true,
                    viewMode:2,
                    preview: this.$avatarPreview.selector,
                    crop: function (e) {
                        var json = [
                            '{"x":' + e.x,
                            '"y":' + e.y,
                            '"height":' + e.height,
                            '"width":' + e.width,
                            '"rotate":' + e.rotate + '}'
                        ].join();

                        _this.$avatarData.val(json);
                    }
                });

                this.active = true;
            }

            this.$avatarModal.one('hidden.bs.modal', function () {
                _this.$avatarPreview.empty();
                _this.stopCropper();
            });
        },

        stopCropper: function () {
            if (this.active) {
                this.$img.cropper('destroy');
                this.$img.remove();
                this.active = false;
            }
        },

        ajaxUpload: function () {
            var url = this.$avatarForm.attr('action');
            var data = new FormData(this.$avatarForm[0]);
            data.append('height', this.height);
            data.append('width', this.width);
            data.append('itemId', this.$itemId);
            var dataD = this.$container.data();

            data.append('data', JSON.stringify(this.$container.data()));
            if (this.$updateId) {
                data.append('updateId', this.$updateId);
            }

            var _this = this;
            $.ajaxSetup(
                {
                    headers: {
                        'X-CSRF-Token': $('input[name="_token"]').val()
                    }
                });
            $.ajax(url, {
                type: 'post',
                data: data,
                dataType: 'json',
                processData: false,
                contentType: false,

                beforeSend: function () {
                    _this.submitStart();
                },

                success: function (data) {
                    _this.submitDone(data);
                },

                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    _this.submitFail(textStatus || errorThrown);
                },

                complete: function () {
                    _this.submitEnd();
                }
            });
        },

        syncUpload: function () {
            this.$avatarSave.click();
        },

        submitStart: function () {
            //this.$avatarSave.text('Please wait..');
            this.$loading.fadeIn();
        },

        submitDone: function (data) {
            if (this.$targetField) {
                $(this.$targetField).val(data.image_path);
            }

            if (this.$updateId) {
                this.$container.attr('data-update-id', data.id)
            }

            if ($.isPlainObject(data) && data.state === 200) {
                if (data.result) {
                    this.url = data.result;

                    if (this.support.datauri || this.uploaded) {
                        this.uploaded = false;
                        this.cropDone(data);
                    } else {
                        this.uploaded = true;
                        this.$avatarSrc.val(this.url);
                        this.startCropper();
                    }

                    this.$avatarInput.val('');
                } else if (data.message) {
                    this.alert(data.message);
                }
            } else {
                this.alert('Failed to response');
            }
        },

        submitFail: function (msg) {
            this.alert(msg);
        },

        submitEnd: function () {
            this.$loading.fadeOut();
        },

        cropDone: function (data) {
            this.$avatarSave.text('Done');
            this.$avatarForm.get(0).reset();
            this.$avatar.attr('src', this.url);
            $("#"+this.$itemId).attr('src', this.url);
            this.stopCropper();
            this.$avatarModal.modal('hide');
            window.location.reload();

        },

        alert: function (msg) {
            var $alert = [
                '<div class="alert alert-danger avatar-alert alert-dismissable">',
                '<button type="button" class="close" data-dismiss="alert">&times;</button>',
                msg,
                '</div>'
            ].join('');

            this.$avatarUpload.after($alert);
        }
    };

    $('.crop-avatar').on('click', function () {
        var ratio = $(this).data('aspectRatio');
        var $cropper = new CropAvatar($(this), ratio);
        $cropper.click();
    });
});
