//===================================发表相关的js==================


//发表类型表单
function jinsom_publish_type_form(topic_name){
if(!jinsom.is_login){
jinsom_pop_login_style();	
return false;
}
layer.closeAll(); 
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/stencil/publish-type.php",
data:{topic_name:topic_name},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:false,
btn: false,
area: ['350px','auto'],
resize:false,
content: msg
})
}
});   
}

//弹出对应类型的表单
function jinsom_publish_power(type,topic_name){
if(!jinsom.is_login){
jinsom_pop_login_style();	
return false;
}
layer.closeAll(); 

if(type=='bbs'){
jinsom_follow_bbs_form(topic_name);
return false;
}

layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/power.php",
data:{type:type},
success: function(msg){
if(msg.code==0){
layer.closeAll('loading');
layer.msg(msg.msg);	
}else if(msg.code==1){

if(type=='single'){
window.location.href=jinsom.member_url_permalink+'info=publish-single&topic_name='+topic_name;
return false;
}


$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/"+type+"-form.php",
data:{type:type,topic_name:topic_name},
success: function(msg){
layer.closeAll('loading');


if(type=='redbag'){
jinsom_publish_form=layer.open({
type:1,
title:false,
btn: false,
fixed: false,
resize:false,
shade:0.4,
area: ['300px'],
skin: 'jinsom-publish-redbag-form',
content: msg
})
}else{

jinsom_publish_form=layer.open({
type:1,
title:false,
btn: false,
fixed: false,
resize:false,
closeBtn: 0,
shade:0.4,
area: ['550px', 'auto'],
skin: 'jinsom-publish-form',
content: msg
})

}

//移除已经选择的话题
$(".jinsom-publish-words-topic").on("click","span",function(){
$(this).remove();
if($('.jinsom-publish-words-topic span').length==0){
$('.jinsom-publish-words-bar .topic').removeClass('on');	
}
});


//发表动态上传图片
if(type=='words'){
words_images_max=jinsom.words_images_max;//最大上传数量
status=1;
layui.use(['upload'], function(){
var upload = layui.upload;
upload.render({
elem: '.jinsom-publish-words-upload',
url: jinsom.jinsom_ajax_url+'/upload/words.php',
multiple:true,
number:words_images_max,
accept:'file',
before: function(obj){
$('.jinsom-publish-words-image').show();
$('.jinsom-upload-add-icon').html('<img src="'+jinsom.admin_url+'/images/spinner.gif" />');
},
done: function(res, index, upload){
number=$('.jinsom-publish-words-image li').length;//获取当前上传图片的数量

if(number>=words_images_max-1){//如果已经上传了9张
$('.jinsom-upload-add-icon').hide();//隐藏添加按钮
}


if(number<words_images_max){
if(res.code == 1){
$('.jinsom-publish-words-image').prepend('<li><a href="'+res.file_url+'" data-fancybox="publish-gallery"><img src="'+res.file_thum_url+'" class="img"></a><div class="bar"><i class="jinsom-icon jinsom-fanhui2" onclick="jinsom_img_left(this)"></i><i class="jinsom-icon jinsom-bangzhujinru" onclick="jinsom_img_right(this)"></i><i class="jinsom-icon jinsom-guanbi" onclick="jinsom_remove_publish_img(this)"></i></div></li>');
}else{
layer.msg(res.msg);	
}
}
},
allDone: function(obj){
$('.jinsom-upload-add-icon').html('+');
},
error: function(index, upload){
layer.msg('上传失败！');
$('.jinsom-upload-add-icon').html('+');
}
});
});//upload
}

//上传视频封面
if(type=='video'){
layui.use(['upload'], function(){
var upload = layui.upload;
upload.render({
elem: '.jinsom-publish-set-video-img-upload',
url: jinsom.jinsom_ajax_url+'/upload/video-img.php',
accept:'file',
before: function(obj){
$('.jinsom-publish-set-video-img-upload').html('<i class="fa fa-spin fa-circle-o-notch"></i> 上传中...');
},
done: function(res, index, upload){
$('.jinsom-publish-set-video-img-upload').html('<i class="jinsom-icon jinsom-shangchuan"></i> 上传封面');
layer.msg(res.msg);
if(res.code == 1){
$('#jinsom-video-img-url').val(res.file_url);
}
},
error: function(index, upload){
layer.msg('上传失败！');
$('.jinsom-publish-set-video-img-upload').html('<i class="jinsom-icon jinsom-shangchuan"></i> 上传封面');
}
});
});//upload
}


//关闭发表窗口
$(".jinsom-publish-words-btn .cancel").click(function(){
layer.confirm('你确定要关闭窗口吗？', {
btnAlign: 'c',
btn: ['确定','取消']
}, function(index){
layer.close(jinsom_publish_form); 
layer.close(index);
});
});


}//success
}); //ajax


	
}//code==1

}//success
}); //ajax


}//jinsom_publish_power



//弹出选择话题窗口，弹出话题表单
function jinsom_publish_topic_form(type){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/topic-select.php",
data:{type:type},
success: function(msg){
layer.closeAll('loading');
window.jinsom_pop_topic_select_form=layer.open({
type:1,
title:false,
btn: false,
area: ['300px', '450px'],
skin: 'jinsom-publish-topic-form',
content: msg
})

}
}); 	
}


//选择话题
function jinsom_pop_topic_select(obj,type){
topic_name=$(obj).attr('data');
if(type=='sns'){
each_dom=$(".jinsom-publish-words-topic.sns span");
}else{
each_dom=$(".jinsom-publish-words-topic.pop span");
}

//判断插入的话题是否和已经选择的话题一样
each_dom.each(function(){
if($(this).attr('data')==topic_name){
$(this).remove();
}
});

layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/topic-power.php",
data:{topic_name:topic_name},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){
if(type=='sns'){
$('.jinsom-publish-words-form.sns .jinsom-publish-words-bar .topic').addClass('on'); 
$('.jinsom-publish-words-topic.sns').append('<span data="'+topic_name+'">#'+topic_name+'#</span>');
}else{
$('.jinsom-publish-words-form.pop .jinsom-publish-words-bar .topic').addClass('on'); 
$('.jinsom-publish-words-topic.pop').append('<span data="'+topic_name+'">#'+topic_name+'#</span>');
}
layer.close(jinsom_pop_topic_select_form);//关闭话题选择表单
}else{
layer.msg(msg.msg);
}
}
});


}


//参与话题
function jinsom_join_topic(topic_name){
if(!jinsom.is_login){
jinsom_pop_login_style();	
return false;
}
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/topic-power.php",
data:{topic_name:topic_name},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){
jinsom_publish_type_form(topic_name);
}else{
layer.msg(msg.msg);
}
}
});
}


//话题搜索
var topic_search=null;
function jinsom_pop_topic_search(){
if(topic_search){topic_search.abort();}//终止事件
key=$.trim($('.jinsom-publish-topic-header input').val());
$('.jinsom-publish-topic-content').html(jinsom.loading);
if(key==''){
type='hot';
}else{
type='search';
}
topic_search=$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/topic-search.php",
data:{key:key,type:type},
success: function(msg){
$('.jinsom-publish-topic-content').html(msg);
}
});
}


//显示标题
function jinsom_publish_show_title(obj){
if($(obj).hasClass('on')){
$(obj).removeClass('on');
$(obj).parents('.content').prev().remove();
}else{
$(obj).addClass('on');
$(obj).parents('.jinsom-publish-words-form').prepend('<input id="jinsom-pop-title" placeholder="标题" name="title">');
}	
}

/*
选择权限表单
power==0----公开
power==1----付费可见
power==2----密码可见
power==3----私密
power==4----VIP可见
power==5----登录可见
*/
function jinsom_publish_power_form(type){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/power-select.php",
data:{type:type},
success: function(msg){
layer.closeAll('loading');
window.jinsom_pop_power_select_form=layer.open({
type:1,
title:false,
btn: false,
resize:false,
closeBtn: 0,
shade:0.4,
area: ['280px'],
skin: 'jinsom-publish-power-form',
content: msg
})


//移除已经选择的话题
$(".jinsom-publish-power-content li").click(function(){
power_text=$(this).children('.left').html();
power=$(this).children('.left').find('i').attr('data');
if(type=='single'){
$('.jinsom-single-edior-footer-bar .power').html(power_text);
}else{
$('.jinsom-publish-words-bar .power').html(power_text);	
}
$('#jinsom-pop-power').val(power);//设置权限
if(type!='video'){
if(power==1||power==2||power==4||power==5){
if(type=='single'){
$('.jinsom-publish-words-power').html('<div class="jinsom-publish-words-power-content"></div>');
$('#jinsom-bbs-publish-hide-content').show();
}else if(type=='music'){
$('.jinsom-publish-words-power').html('<div class="jinsom-publish-words-power-content"><span><input type="checkbox" lay-skin="switch" lay-text="开|关" name="power-download"><i>开启后，音频允许下载</i></span></div>');
}else{
$('.jinsom-publish-words-power').html('<div class="jinsom-publish-words-power-content"><span><input type="checkbox" lay-skin="switch" lay-text="开|关" name="power-see-img"><i>开启后，没有权限也可以浏览图片</i></span><textarea placeholder="请输入隐藏内容" name="hide-content"></textarea></div>');
}


if(power==1){//付费可见
//if(type=='single'||type=='music'){
$('.jinsom-publish-words-power-content').prepend('<input placeholder="设置售价" type="number" class="price" name="price"> <i style="margin-right:20px;">'+jinsom.credit_name+'</i>');
// }else{
// $('.jinsom-publish-words-power-content').prepend('<input placeholder="设置售价" type="number" class="price" name="price">');
// }
}else{
$('.jinsom-publish-words-power-content .price').remove();	
}
if(power==2){//密码可见
$('.jinsom-publish-words-power-content').prepend('<input placeholder="设置密码" type="text" class="password" name="password" maxlength="20" style="margin-right:20px;">');
}else{
$('.jinsom-publish-words-power-content .password').remove();	
}

}else{
$('.jinsom-publish-words-power').html('');	
$('#jinsom-bbs-publish-hide-content').hide();
}

}else{//视频和音乐模块
if(power==1||power==2){//付费可见||密码可见
if(power==1){
$('.jinsom-publish-words-power-content').html('<input placeholder="设置售价" type="number" class="price" name="price"> <i style="margin-right: 40px;">'+jinsom.credit_name+'</i>');	
}
if(power==2){
$('.jinsom-publish-words-power-content').html('<input placeholder="设置密码" type="text" class="password" name="password" maxlength="20">');	
}
}else{
$('.jinsom-publish-words-power-content').empty();	
}



}

layui.use('form', function(){
var form = layui.form;
form.render('checkbox');
});



layer.close(jinsom_pop_power_select_form);//关闭
});

}
}); 	
}



//弹出设置评论状态表单
function jinsom_publish_comment_status(obj){
if($(obj).children('i').hasClass('ok')){
$(obj).html('<i class="jinsom-icon no jinsom-jinzhipinglun-" title="禁止评论"></i>');
layer.msg('已关闭评论');
$('#jinsom-pop-comment-status').val('closed');
}else{
$(obj).html('<i class="jinsom-icon ok jinsom-quxiaojinzhi-" title="允许评论"></i>');
layer.msg('已开启评论');
$('#jinsom-pop-comment-status').val('open');
}
}

//设置位置 城市
function jinsom_publish_city(obj){
if($(obj).hasClass('no')){
$(obj).removeClass('no');
$('#jinsom-pop-city').val($(obj).children('m').html());
}else{
$(obj).addClass('no');
$('#jinsom-pop-city').val('');
}
}



//发布动态
function jinsom_publish_words(obj,ticket,randstr){
if($(obj).parent().siblings('#jinsom-pop-title').length>0){
if($.trim($(obj).parent().siblings('#jinsom-pop-title').val())==''){
layer.msg('请输入标题！');
return false;
}
}

if($.trim($(obj).parent().siblings('.content').children('#jinsom-pop-content').val())==''){
layer.msg('请输入内容！');
return false;	
}

power=$(obj).parent().siblings('#jinsom-pop-power').val();
if(power==1||power==2||power==4||power==5){
if(power==1){
if($(obj).parent().siblings('.jinsom-publish-words-power').find('.price').val()==''){
layer.msg('请输入售价！');
return false;	
}
}
if(power==2){
if($.trim($(obj).parent().siblings('.jinsom-publish-words-power').find('.password').val())==''){
layer.msg('请输入密码！');
return false;	
}
}
if($.trim($(obj).parent().siblings('.jinsom-publish-words-power').find('textarea[name="hide-content"]').val())==''){
layer.msg('请输入隐藏内容！');
return false;		
}
}

data=$(obj).parents('.jinsom-publish-words-form').serialize();
if($(obj).parent().siblings('.jinsom-publish-words-topic').children('span').length>0){
topic='&topic=';
$(obj).parent().siblings('.jinsom-publish-words-topic').children('span').each(function(){
topic+=$(this).attr('data')+',';
});
topic=topic.substr(0,topic.length-1);
data=data+topic;
}

if($(obj).parent().siblings('.jinsom-publish-words-image').children('li').length>0){
img='&img=';
img_thum='&img_thum=';
$(obj).parent().siblings('.jinsom-publish-words-image').children('li').each(function(){
img+=$(this).children('a').attr('href')+',';
img_thum+=$(this).find('img').attr('src')+',';
});
img=img.substr(0,img.length-1);
img_thum=img_thum.substr(0,img_thum.length-1);
data=data+img+img_thum;
}

// alert(data)

layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/words.php",
data:data+'&ticket='+ticket+'&randstr='+randstr,
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
$('.jinsom-publish-words-btn .publish').removeAttr('onclick');
function d(){window.location.href=msg.url;}setTimeout(d,2000);
}else if(msg.code==2){
function d(){jinsom_update_phone_form(msg.user_id);}setTimeout(d,2000);//弹出绑定手机号
}

}
});  


}


//======================删除、向左、向右移动图片==========

//删除图片
function jinsom_remove_publish_img(obj){
$(obj).parents('li').remove();

number=$('.jinsom-publish-words-image li').length;
if(number<jinsom.words_images_max){
$('.jinsom-upload-add-icon').show();
}

}

//向左移动图片
function jinsom_img_left(obj){
var obj_li = $(obj).parents("li");
var obj_prev = obj_li.prev("li");
obj_li.insertBefore(obj_prev);
}

//向右移动图片
function jinsom_img_right(obj){
var obj_li = $(obj).parents("li");
var obj_next = obj_li.next("li");
obj_li.insertAfter(obj_next);
}





//===================发表音乐======================
function jinsom_publish_music(ticket,randstr){

if($('#jinsom-pop-title').length>0){
if($.trim($('#jinsom-pop-title').val())==''){
layer.msg('请输入标题！');
return false;
}
}

if($.trim($("#jinsom-pop-content").val())==''){
layer.msg('请输入内容！');
return false;	
}

power=$('#jinsom-pop-power').val();
if(power==1){
if($('.jinsom-publish-words-power-content .price').val()==''){
layer.msg('请输入售价！');
return false;	
}
}
if(power==2){
if($.trim($('.jinsom-publish-words-power-content .password').val())==''){
layer.msg('请输入密码！');
return false;	
}
}

music_url=$("#jinsom-music-url").val();
if(music_url==''){
layer.msg('请输入音乐地址或上传音乐！');
return false;	
}

// music_ret=/^https?:\/\/\S+\.mp3$/;
// if (!music_ret.test(music_url)){
// layer.msg('请输入一个mp3后缀的正确的音乐地址！带https://'); 
// return false;
// }  


data=$(".jinsom-publish-words-form").serialize();
if($('.jinsom-publish-words-topic span').length>0){
topic='&topic=';
$('.jinsom-publish-words-topic span').each(function(){
topic+=$(this).attr('data')+',';
});
topic=topic.substr(0,topic.length-1);
data=data+topic;
}


layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/music.php",
data:data+'&ticket='+ticket+'&randstr='+randstr,
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
$('.jinsom-publish-words-btn .publish').removeAttr('onclick');
function d(){window.location.href=msg.url;}setTimeout(d,2000);
}else if(msg.code==2){
function d(){jinsom_update_phone_form(msg.user_id);}setTimeout(d,2000);//弹出绑定手机号
}

}
});  


}//发布音乐





//发布视频
function jinsom_publish_video(ticket,randstr){
if($('#jinsom-pop-title').length>0){
if($.trim($('#jinsom-pop-title').val())==''){
layer.msg('请输入标题！');
return false;
}
}

if($.trim($("#jinsom-pop-content").val())==''){
layer.msg('请输入内容！');
return false;	
}

power=$('#jinsom-pop-power').val();
if(power==1){
if($('.jinsom-publish-words-power-content .price').val()==''){
layer.msg('请输入售价！');
return false;	
}
}
if(power==2){
if($.trim($('.jinsom-publish-words-power-content .password').val())==''){
layer.msg('请输入密码！');
return false;	
}
}

video_url=$("#jinsom-video-url").val();
if(video_url==''){
layer.msg('请输入视频地址或上传视频！');
return false;	
}


video_img=$('#jinsom-video-img-url').val();


data=$(".jinsom-publish-words-form").serialize();
if($('.jinsom-publish-words-topic span').length>0){
topic='&topic=';
$('.jinsom-publish-words-topic span').each(function(){
topic+=$(this).attr('data')+',';
});
topic=topic.substr(0,topic.length-1);
data=data+topic;
}

video='&video-url='+video_url;
video_img='&video-img-url='+video_img;
data=data+video+video_img;

layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/video.php",
data:data+'&ticket='+ticket+'&randstr='+randstr,
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
$('.jinsom-publish-words-btn .publish').removeAttr('onclick');
function d(){window.location.href=msg.url;}setTimeout(d,2000);
}else if(msg.code==2){
function d(){jinsom_update_phone_form(msg.user_id);}setTimeout(d,2000);//弹出绑定手机号
}

}
});  


}



//发布文章
function jinsom_publish_single(ticket,randstr){
content=ue_single.getContent();
if($.trim($('.jinsom-single-title').val())==''){
layer.msg('请输入标题！');
return false;
}

if($.trim(content)==''){
layer.msg('请输入内容！');
return false;	
}

power=$('#jinsom-pop-power').val();
if(power==1||power==2||power==4||power==5){
if(power==1){
if($('.jinsom-publish-words-power.single .price').val()==''){
layer.msg('请输入售价！');
return false;	
}
}
if(power==2){
if($.trim($('.jinsom-publish-words-power.single .password').val())==''){
layer.msg('请输入密码！');
return false;	
}
}

hide_content=ue_single_pay.getContent();
if($.trim(hide_content)==''){
layer.msg('隐藏内容不能为空！');
return false; 
}

}

data=$(".jinsom-publish-single-form").serialize();
if($('.jinsom-publish-words-topic.single span').length>0){
topic='&topic=';
$('.jinsom-publish-words-topic.single span').each(function(){
topic+=$(this).attr('data')+',';
});
topic=topic.substr(0,topic.length-1);
data=data+topic;
}

// data=data+'&content='+content;

layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/single.php",
data:data+'&ticket='+ticket+'&randstr='+randstr,
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
$('.jinsom-publish-words-btn .publish').removeAttr('onclick');
$(window).unbind('beforeunload');
ue_single.execCommand('clearlocaldata');
ue_single_pay.execCommand('clearlocaldata');

function d(){window.location.href=msg.url;}setTimeout(d,2000);
}else if(msg.code==2){
function d(){jinsom_update_phone_form(msg.user_id);}setTimeout(d,2000);//弹出绑定手机号
}

}
});  


}

//显示发帖表单
function jinsom_publish_bbs_form(bbs_id,topic_name){
if(!jinsom.is_login){
jinsom_pop_login_style();	
return false;
}
layer.load(1);
$.ajax({
type:"POST",
url:jinsom.jinsom_ajax_url+"/publish/bbs-type.php",
data:{bbs_id:bbs_id},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){
child_id=$('.jinsom-bbs-header').attr('child_id');
if(child_id!=''){
window.location.href=jinsom.member_url_permalink+'info=publish-bbs&bbs_id='+bbs_id+'&child_bbs_id='+child_id+'&topic_name='+topic_name;
}else{
window.location.href=jinsom.member_url_permalink+'info=publish-bbs&bbs_id='+bbs_id+'&topic_name='+topic_name;	
}
}else{
layer.msg(msg.msg);	
}
}
});
}


//发布帖子
function jinsom_publish_bbs_post(ticket,randstr){
title= $.trim($('.jinsom-bbs-title').val());
post_type= $('#jinsom-bbs-type').val();
content=ue.getContent();

if(title==''){
layer.msg('标题不能为空！');
return false;
}

if($.trim(content)==''){
layer.msg('内容不能为空！');
return false; 
}

if(post_type=='pay_see'||post_type=='vip_see'||post_type=='login_see'||post_type=='comment_see'){
hide_content=ue_pay.getContent();
if($.trim(hide_content)==''){
layer.msg('隐藏内容不能为空！');
return false; 
}

if(post_type=='pay_see'){
if($('#jinsom-bbs-price').val()==''){
layer.msg('售价不能为空！');
return false; 
}  
}

}

if(post_type=='answer'){//问答
if($('#jinsom-bbs-answer-price').val()==''){
layer.msg('悬赏金额不能为空！');
return false; 
}  
}


if($('#jinsom-bbs-category').val()==''){
layer.msg('请选择分类！');
return false; 
}  

data = $('#jinsom-bbs-publish-form').serialize();

//投票
if(post_type=='vote'){

var vote_list_num=$('.jinsom-bbs-publish-vote-list .layui-form-item').length;//获取项数
var vote_times=$('#jinsom-vote-times').val();

if(vote_times>vote_list_num-1){
layer.msg('次数不能大于或等于投票项数！'); 
return false;
}
vote_arr=[];
for (var i=0; i < vote_list_num; i++) {
vote_list_text=$(".jinsom-bbs-publish-vote-list").children('.layui-form-item').eq(i).find('input').val();

if($.trim(vote_list_text)==''){
layer.msg('投票项内容不能为空！');  
return false; 
}


reg=/,|&/g;
vote_list_text=vote_list_text.replace(reg,'，');
vote_arr.push(vote_list_text);
vote_arr.push(0);//写入每项的初始投票值
}

vote_arr.push(0);//写入总投票值。

vote_data=vote_arr.join(",");//投票数据
data=data+'&vote-data='+vote_data;//加上投票数据
}

//活动帖子
if(post_type=='activity'){

var activity_list_num=$('.jinsom-bbs-publish-activity-list .layui-form-item').length;//获取项数
activity_arr=[];
for (var i=0; i < activity_list_num; i++) {
activity_type=$(".jinsom-bbs-publish-activity-list").children('.layui-form-item').eq(i).find('select').val();//选项类型
activity_text=$(".jinsom-bbs-publish-activity-list").children('.layui-form-item').eq(i).find('.activity_type_name').val();//选项名称

if($.trim(activity_text)==''){
layer.msg('活动选项名称不能为空！');  
return false; 
}

// reg=/,/g;
// activity_text=activity_text.replace(reg,'，');
activity_arr.push(activity_type);
activity_arr.push(activity_text);
}


activity_data=activity_arr.join(",");//活动数据
data=data+'&activity-data='+activity_data;//加上活动数据
}

if($('.jinsom-publish-words-topic.bbs span').length>0){
topic='&topic=';
$('.jinsom-publish-words-topic.bbs span').each(function(){
topic+=$(this).attr('data')+',';
});
topic=topic.substr(0,topic.length-1);
data=data+topic;
}

layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/bbs.php",
data:data+'&ticket='+ticket+'&randstr='+randstr,
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
$('#jinsom-bbs-publish-btn').removeAttr('onclick');
$(window).unbind('beforeunload');
ue.execCommand('clearlocaldata');
if(post_type=='pay_see'||post_type=='vip_see'||post_type=='login_see'||post_type=='comment_see'){
ue_pay.execCommand('clearlocaldata');
}

function d(){window.location.href=msg.url;}setTimeout(d,2000);
}else if(msg.code==2){
function d(){jinsom_update_phone_form(msg.user_id);}setTimeout(d,2000);//弹出绑定手机号
}

}
}); 


}


//提交发红包
function jinsom_publish_redbag(){
credit=$('#jinsom-publish-redbag-credit').val();
number=$('#jinsom-publish-redbag-number').val();
type=$('.jinsom-publish-redbag-form .type>li.on').attr('data');
content=$('#jinsom-publish-redbag-content').val();

layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/redbag.php",
data:{credit:credit,number:number,type:type,content:content},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
function d(){window.location.href=msg.url;}setTimeout(d,2000);
}
}
}); 


}