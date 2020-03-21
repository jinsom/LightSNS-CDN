//上传类
$(function(){

//上传头像
$('#jinsom-upload-avatar').off('click').on('change', function(){
$('.jinsom-member-avatar span').css('display','inline-block');
$('.jinsom-member-avatar span').html('<i class="fa fa-spinner fa-spin"></i> 上传中...');

$("#jinsom-upload-avatar-form").ajaxSubmit({
dataType:'json',
success:function(data){
$('.jinsom-member-avatar span').hide();
$('.jinsom-member-avatar span').html('点击修改头像');
$('#jinsom-upload-avatar').val('');
if(data.code == 1){
$('.jinsom-member-avatar img').attr('src',data.file_url);
}else{
layer.msg(data.msg);
}
}, 
error:function(){
$('.jinsom-member-avatar span').hide();
$('.jinsom-member-avatar span').html('点击修改头像');
$('#jinsom-upload-avatar').val('');    
layer.msg('上传失败！'); 
} 
});
});


//上传本地视频
$('body').off('click').on('change','#jinsom-upload-video', function(){
var bar = $('.jinsom-video-bar');
var percent = $('.jinsom-video-percent');
var progress = $(".jinsom-video-progress");

$("#jinsom-upload-video-form").ajaxSubmit({
dataType:'json',
beforeSend: function() {
progress.show();
var percentVal = '0%';
bar.width(percentVal);
percent.html(percentVal);
},
uploadProgress: function(event, position, total, percentComplete) {
var percentVal = percentComplete + '%';
bar.width(percentVal);
percent.html(percentVal);
if(percentVal=='100%'){
percent.html('正在处理中...<i class="fa fa-spinner fa-spin"></i>');	
}
},
success:function(msg){
$('.jinsom-video-progress').hide();
layer.msg(msg.msg);
percent.children('i').remove();
$('#jinsom-upload-video').val('');
if(msg.code==0){
bar.width('0');
}else if(msg.code==1){
$('#jinsom-video-url').val(msg.file_url);
}


}, 
error:function(){
percent.children('i').remove();
layer.msg('上传失败！');
bar.width('0');
$('.jinsom-video-progress').hide();
$('#jinsom-upload-video').val('');
return false;
} 
});
});

//上传本地音乐
$('body').off('click').on('change','#jinsom-upload-music', function(){
var bar = $('.jinsom-music-bar');
var percent = $('.jinsom-music-percent');
var progress = $(".jinsom-music-progress");

$("#jinsom-upload-music-form").ajaxSubmit({
dataType:'json',
beforeSend: function() {
progress.show();
var percentVal = '0%';
bar.width(percentVal);
percent.html(percentVal);
},
uploadProgress: function(event, position, total, percentComplete) {
var percentVal = percentComplete + '%';
bar.width(percentVal);
percent.html(percentVal);
if(percentVal=='100%'){
percent.html('正在处理中...<i class="fa fa-spinner fa-spin"></i>');	
}
},
success:function(msg){
$('.jinsom-music-progress').hide();
layer.msg(msg.msg);
percent.children('i').remove();
$('#jinsom-upload-music').val('');
if(msg.code==0){
bar.width('0');
}else if(msg.code==1){
$('#jinsom-music-url').val(msg.file_url);
}


}, 
error:function(){
percent.children('i').remove();
layer.msg('上传失败！');
bar.width('0');
$('.jinsom-music-progress').hide();
$('#jinsom-upload-music').val('');
return false;
} 
});
});


//上传背景音乐
$('.jinsom-member-right').off('click').on('change','#jinsom-upload-user-bg-music', function(){
var bar = $('.jinsom-bg-music-bar');
var percent = $('.jinsom-bg-music-percent');
var progress = $(".jinsom-bg-music-progress");

$("#jinsom-upload-user-bg-music-form").ajaxSubmit({
beforeSend: function() {
progress.show();
var percentVal = '0%';
bar.width(percentVal);
percent.html(percentVal);
},
uploadProgress: function(event, position, total, percentComplete) {
var percentVal = percentComplete + '%';
bar.width(percentVal);
percent.html(percentVal);
},
success:function(msg){
$('.jinsom-bg-music-progress').hide();
layer.msg(msg.msg);

if(msg.code == 0){
bar.width('0');
}else if(msg.code == 1){
$('#jinsom-bg-music-url').val(msg.file_url);
$('#jinsom-upload-user-bg-music').val('');
}

}, 
error:function(){
layer.msg('上传失败！');
bar.width('0');
$('.jinsom-bg-music-progress').hide();
$('#jinsom-upload-user-bg-music').val('');
return false;
} 
});
});





//上传本地附件
$('body').off('click').on('change','#jinsom-insert-file-input', function(){
bar=$('.jinsom-file-bar');
percent=$('.jinsom-file-percent');
progress=$(".jinsom-file-progress");
if(percent.children('i').length==0){

$("#jinsom-insert-file-form").ajaxSubmit({
dataType : "json",
timeout: 120000,//120秒退出
beforeSend: function() {
$('#jinsom-insert-file').hide();
progress.show();
var percentVal = '0%';
bar.width(percentVal);
percent.html(percentVal);
},
uploadProgress: function(event, position, total, percentComplete) {
var percentVal = percentComplete + '%';
bar.width(percentVal);
percent.html(percentVal+' <i class="fa fa-spinner fa-spin"></i>');
if(percentVal=='100%'){
percent.html('正在处理中...<i class="fa fa-spinner fa-spin"></i>');	
}
},
success:function(data){
$('#jinsom-insert-file').show();
$('#jinsom-insert-file-input').val('');
if(data.code == 1){
$('#jinsom-insert-file-url').val(data.file_url);
$('#jinsom-insert-file-name').val(data.name);
percent.html('上传成功！100%').children('i').remove();
}else{
progress.hide();
percent.children('i').remove();
layer.msg(data.msg);
}
}, 
error:function(){
$('#jinsom-insert-file-input').val('');
layer.msg('上传失败！服务器配置问题！');
$('#jinsom-insert-file').show();
progress.hide();
return false;
} 
});

}
});




//上传
layui.use(['upload'], function(){
var upload = layui.upload;

//文章上传图片
upload.render({
elem: '#jinsom-single-upload',
url: jinsom.jinsom_ajax_url+'/upload/bbs.php',
multiple:true,
accept:'file',
before: function(obj){
$('#jinsom-single-upload').html('<i class="fa fa-spin fa-refresh">');
},
done: function(res, index, upload){
if(res.code == 1){
ue_single.focus();
ue_single.execCommand('inserthtml','<img src="'+res.file_url+'">');
}else{
layer.msg(res.msg);	
}
},
allDone: function(obj){
$('#jinsom-single-upload').html('<i class="fa fa-picture-o"></i>');
},
error: function(index, upload){
layer.msg('上传失败！');
$('#jinsom-single-upload').html('<i class="fa fa-picture-o"></i>');
}
});

//论坛上传图片
upload.render({
elem: '#jinsom-bbs-upload',
url: jinsom.jinsom_ajax_url+'/upload/bbs.php',
multiple:true,
accept:'file',
before: function(obj){
$('#jinsom-bbs-upload').html('<i class="fa fa-spin fa-refresh">');
},
done: function(res, index, upload){
if(res.code == 1){
ue.focus();
ue.execCommand('inserthtml','<img src="'+res.file_url+'">');
}else{
layer.msg(res.msg);	
}
},
allDone: function(obj){
$('#jinsom-bbs-upload').html('<i class="fa fa-picture-o"></i>');
},
error: function(index, upload){
layer.msg('上传失败！');
$('#jinsom-bbs-upload').html('<i class="fa fa-picture-o"></i>');
}
});

//文章权限区图片上传
upload.render({
elem: '#jinsom-single-pay-upload',
url: jinsom.jinsom_ajax_url+'/upload/bbs.php',
multiple:true,
accept:'file',
before: function(obj){
$('#jinsom-single-pay-upload').html('<i class="fa fa-spin fa-refresh">');
},
done: function(res, index, upload){
if(res.code == 1){
ue_single_pay.focus();
ue_single_pay.execCommand('inserthtml','<img src="'+res.file_url+'">');
}else{
layer.msg(res.msg);	
}
},
allDone: function(obj){
$('#jinsom-single-pay-upload').html('<i class="fa fa-picture-o"></i>');
},
error: function(index, upload){
layer.msg('上传失败！');
$('#jinsom-single-pay-upload').html('<i class="fa fa-picture-o"></i>');
}
});

//论坛上传图片==权限框框(付费区)
upload.render({
elem: '#jinsom-bbs-pay-upload',
url: jinsom.jinsom_ajax_url+'/upload/bbs.php',
multiple:true,
accept:'file',
before: function(obj){
$('#jinsom-bbs-pay-upload').html('<i class="fa fa-spin fa-refresh">');
},
done: function(res, index, upload){
if(res.code == 1){
ue_pay.focus();
ue_pay.execCommand('inserthtml','<img src="'+res.file_url+'">');
}else{
layer.msg(res.msg);	
}
},
allDone: function(obj){
$('#jinsom-bbs-pay-upload').html('<i class="fa fa-picture-o"></i>');
},
error: function(index, upload){
layer.msg('上传失败！');
$('#jinsom-bbs-pay-upload').html('<i class="fa fa-picture-o"></i>');
}
});

//论坛回复上传图片
upload.render({
elem: '#jinsom-bbs-comment-upload',
url: jinsom.jinsom_ajax_url+'/upload/bbs.php',
multiple:false,
accept:'file',
before: function(obj){
$('#jinsom-bbs-comment-upload').html('<i class="fa fa-spin fa-refresh">');
},
done: function(res, index, upload){
$('#jinsom-bbs-comment-upload').html('<i class="fa fa-picture-o"></i>');
if(res.code == 1){
ue.focus();
ue.execCommand('inserthtml','<img src="'+res.file_url+'">');
}else{
layer.msg(res.msg);	
}
},
error: function(index, upload){
layer.msg('上传失败！');
$('#jinsom-bbs-comment-upload').html('<i class="fa fa-picture-o"></i>');
}
});













});//layui











});