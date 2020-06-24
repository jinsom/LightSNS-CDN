
//打开发布内容表单
function jinsom_publish_form(type){

if($('.jinsom-topic-page-header').length>0){
topic=$('.jinsom-topic-page-header').attr('topic');
}else{
topic='';	
}

if(type=='bbs'){
myApp.closeModal();
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/bbs-like.php?type=publish'});
return false;
}
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/power.php",
data:{type:type},
success: function(msg){
if(msg.code==0){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
}else if(msg.code==1){
myApp.closeModal();
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/publish/'+type+'.php?topic='+topic+'&type='+type});
myApp.hideIndicator();
}
}
});
}


//移除照片
function jinsom_remove_image(max,obj){
$(obj).parents('li').remove();
img_count=$('#jinsom-publish-images-list li').length;
if(img_count<max){
$('.jinsom-publish-words-form .add').show();
}
jinsom_lightbox();
}


//@用户搜索用户
var aite_user_search=null;
function jinsom_pop_aite_user_search(){
if(aite_user_search){aite_user_search.abort();}//终止事件
key=$.trim($('.jinsom-publish-aite-form .search.aite input').val());
if(key==''){
return false;
}
// $('.jinsom-publish-aite-form .list.aite').html(jinsom.loading);
aite_user_search=$.ajax({
type: "POST",
url: jinsom.mobile_ajax_url+"/search/user.php",
data:{key:key},
success: function(msg){
if(msg.code==1){
html='';
for (var i = msg.data.length - 1; i >= 0; i--){
html+='\
<li onclick="jinsom_aite_selete_user(this)" data="'+msg.data[i].nickname+'">\
<div class="avatarimg">'+msg.data[i].avatar+msg.data[i].verify+'</div>\
<div class="name">'+msg.data[i].name+msg.data[i].vip+'</div>\
</li>';
}
$('.jinsom-publish-aite-form .list.aite').html(html);
}else{
$('.jinsom-publish-aite-form .list.aite').html(msg.content);	
}
}
});
}

//发布 搜索@用户  选择用户
function jinsom_aite_selete_user(obj){
myApp.closeModal();
textarea=$('.jinsom-publish-words-form .content textarea');
textarea.val(textarea.val()+' @'+$(obj).attr('data')+' ');
}

//发布 选择话题
function jinsom_publish_topic_selete(obj){
topic_name=$(obj).attr('data');
//判断插入的话题是否和已经选择的话题一样
$('.jinsom-publish-words-form .topic span').each(function(){
if($(this).attr('data')==topic_name){
$(this).remove();
}
});
// number=3;
// if($('.jinsom-publish-words-form .topic span').length>=number){
// layer.open({content:'最多只能插入'+number+'个话题！',skin:'msg',time:2});
// }else{
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/topic-power.php",
data:{topic_name:topic_name},
success: function(msg){
myApp.hideIndicator();
if(msg.code==1){
myApp.closeModal();
$('.jinsom-publish-words-form .topic').append('<span onclick="$(this).remove();" data="'+topic_name+'">#'+topic_name+'#</span>');
$('.jinsom-publish-aite-form .search.topic input').val('');
}else{
layer.open({content:msg.msg,skin:'msg',time:2});
}
}
});

// }

}



//话题搜索
var topic_search=null;
function jinsom_pop_topic_search(){
if(topic_search){topic_search.abort();}//终止事件
key=$.trim($('.jinsom-publish-aite-form .search.topic input').val());
if(key==''){
return false;
}
// $('.jinsom-publish-aite-form .list.topic').html(jinsom.loading);
topic_search=$.ajax({
type: "POST",
url: jinsom.mobile_ajax_url+"/search/topic.php",
data:{key:key},
success: function(msg){
if(msg.code==1){
html=msg.new;
for (var i = msg.data.length - 1; i >= 0; i--){
html+='\
<li class="search" onclick="jinsom_publish_topic_selete(this)" data="'+msg.data[i].name+'">\
<div class="avatarimg">'+msg.data[i].avatar+'</div>\
<div class="name">#'+msg.data[i].name+'#</div>\
<div class="hot"><i class="jinsom-icon jinsom-huo"></i> '+msg.data[i].hot+'</div>\
</li>';
}
$('.jinsom-publish-aite-form .list.topic').html(html);
}else{
$('.jinsom-publish-aite-form .list.topic').html(msg.new);	
}
}
});
}


//选择权限
function jinsom_publish_select_power(obj){
myApp.closeModal();
$('.jinsom-publish-power-form li').children('.select').remove();
$(obj).append('<div class="select"><i class="jinsom-icon jinsom-yuan_quan"></i></div>');
$('.jinsom-publish-words-form .tool .power').html($(obj).children('.left').html());
power=$(obj).children('.left').find('i').attr('data');
$('#jinsom-pop-power').val(power);
if(power==1){
$('.jinsom-publish-words-form .power-content').html('\
<input type="tel" name="price" class="price" placeholder="输入售价" class="">\
<label class="label-switch"><input type="checkbox" name="power-see-img"><div class="checkbox"></div><div class="tip">没有权限也可浏览图片</div></label>\
<textarea name="hide-content" placeholder="隐藏内容"></textarea>');
}else if(power==2){
$('.jinsom-publish-words-form .power-content').html('\
<input type="text" name="password" class="password" placeholder="输入密码" class="" maxlength="20">\
<label class="label-switch"><input type="checkbox" name="power-see-img"><div class="checkbox"></div><div class="tip">没有权限也可浏览图片</div></label>\
<textarea name="hide-content" placeholder="隐藏内容"></textarea>');
}else if(power==4||power==5){
$('.jinsom-publish-words-form .power-content').html('\
<label class="label-switch"><input type="checkbox" name="power-see-img"><div class="checkbox"></div><div class="tip">没有权限也可浏览图片</div></label>\
<textarea name="hide-content" placeholder="隐藏内容"></textarea>');	
}else{
$('.jinsom-publish-words-form .power-content').html('');	
}
}

//发布选择评论权限开关
function jinsom_publish_select_comment_power(obj){
if($(obj).children('i').hasClass('jinsom-quxiaojinzhi-')){
$(obj).children('i').removeClass('jinsom-quxiaojinzhi-').addClass('jinsom-jinzhipinglun-');	
$('#jinsom-pop-comment-status').val('closed');
layer.open({content:'已关闭评论',skin:'msg',time:2});
}else{
$(obj).children('i').removeClass('jinsom-jinzhipinglun-').addClass('jinsom-quxiaojinzhi-');	
$('#jinsom-pop-comment-status').val('open');	
layer.open({content:'已开启评论',skin:'msg',time:2});
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
function jinsom_publish_words(ticket,randstr){

if($.trim($(".jinsom-publish-words-form .content textarea").val())==''){
layer.open({content:'请输入内容！',skin:'msg',time:2});
return false;	
}

power=$('#jinsom-pop-power').val();
if(power==1||power==2||power==4||power==5){
if(power==1){
if($('.jinsom-publish-words-form .power-content .price').val()==''){
layer.open({content:'请输入售价！',skin:'msg',time:2});
return false;	
}
}
if(power==2){
if($.trim($('.jinsom-publish-words-form .power-content .password').val())==''){
layer.open({content:'请输入密码！',skin:'msg',time:2});
return false;	
}
}
if($.trim($(".jinsom-publish-words-form .power-content textarea").val())==''){
layer.open({content:'请输入隐藏内容！',skin:'msg',time:2});
return false;		
}
}

data=$("#jinsom-publish-form").serialize();
if($('.jinsom-publish-words-form .topic span').length>0){
topic='&topic=';
$('.jinsom-publish-words-form .topic span').each(function(){
topic+=$(this).attr('data')+',';
});
topic=topic.substr(0,topic.length-1);
data=data+topic;
}


if($('#jinsom-publish-images-list li').length>0){
img='&img=';
img_thum='&img_thum=';
$('#jinsom-publish-images-list li').each(function(){
img+=$(this).children('a').attr('href')+',';
img_thum+=$(this).find('img').attr('src')+',';
});
img=img.substr(0,img.length-1);
img_thum=img_thum.substr(0,img_thum.length-1);
data=data+img+img_thum;
}

myApp.showIndicator();
$.ajax({
type: "POST",
url: jinsom.jinsom_ajax_url+"/publish/words.php",
data:data+'&ticket='+ticket+'&randstr='+randstr,
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
type=$('.jinsom-home-menu li.on').attr('data');
jinsom_post_data(type,'pull',0,this);
function d(){myApp.getCurrentView().router.back();}setTimeout(d,2500);
}else if(msg.code==5){
function a(){myApp.popup('.jinsom-publish-topic-popup');}setTimeout(a,1500);
}else if(msg.code==2){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/setting/setting-phone.php'});
}

}
});  

}


//发布文章
function jinsom_publish_single(ticket,randstr){
if($.trim($(".jinsom-publish-words-form .title input").val())==''){
layer.open({content:'请输入标题！',skin:'msg',time:2});
return false;	
}
if($.trim($(".jinsom-publish-words-form .content textarea").val())==''){
layer.open({content:'请输入内容！',skin:'msg',time:2});
return false;	
}
power=$('#jinsom-pop-power').val();
if(power==1||power==2||power==4||power==5){
if(power==1){
if($('.jinsom-publish-words-form .power-content .price').val()==''){
layer.open({content:'请输入售价！',skin:'msg',time:2});
return false;	
}
}
if(power==2){
if($.trim($('.jinsom-publish-words-form .power-content .password').val())==''){
layer.open({content:'请输入密码！',skin:'msg',time:2});
return false;	
}
}
if($.trim($(".jinsom-publish-words-form .power-content textarea").val())==''){
layer.open({content:'请输入隐藏内容！',skin:'msg',time:2});
return false;		
}
}
data=$("#jinsom-publish-form").serialize();
if($('.jinsom-publish-words-form .topic span').length>0){
topic='&topic=';
$('.jinsom-publish-words-form .topic span').each(function(){
topic+=$(this).attr('data')+',';
});
topic=topic.substr(0,topic.length-1);
data=data+topic;
}
if($('#jinsom-publish-images-list li').length>0){
img='&img=';
$('#jinsom-publish-images-list li').each(function(){
img+=$(this).children('a').html()+'</br>';
});
data=data+img;
}

myApp.showIndicator();
$.ajax({
type: "POST",
url: jinsom.jinsom_ajax_url+"/publish/single.php",
data:data+'&ticket='+ticket+'&randstr='+randstr,
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
type=$('.jinsom-home-menu li.on').attr('data');
jinsom_post_data(type,'pull',0,this);
function d(){myApp.getCurrentView().router.back();}
setTimeout(d,2500);
}else if(msg.code==5){
function a(){myApp.popup('.jinsom-publish-topic-popup');}setTimeout(a,1500);
}else if(msg.code==2){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/setting/setting-phone.php'});
}

}
});  
}


//发布视频 | 音乐
function jinsom_publish_music_video(publish_type,ticket,randstr){
if($.trim($(".jinsom-publish-words-form .content textarea").val())==''){
layer.open({content:'请输入内容！',skin:'msg',time:2});
return false;	
}
power=$('#jinsom-pop-power').val();
if(power==1||power==2||power==4||power==5){
if(power==1){
if($('.jinsom-publish-words-form .power-content .price').val()==''){
layer.open({content:'请输入售价！',skin:'msg',time:2});
return false;	
}
}
if(power==2){
if($.trim($('.jinsom-publish-words-form .power-content .password').val())==''){
layer.open({content:'请输入密码！',skin:'msg',time:2});
return false;	
}
}
}

video_url=$("#jinsom-video-url").val();
if(video_url==''){
if(publish_type=='video'){
layer.msg('请上传视频！');	
}else{
layer.msg('请上传音频或填写音频地址！');
}
return false;	
}

data=$("#jinsom-publish-form").serialize();
if($('.jinsom-publish-words-form .topic span').length>0){
topic='&topic=';
$('.jinsom-publish-words-form .topic span').each(function(){
topic+=$(this).attr('data')+',';
});
topic=topic.substr(0,topic.length-1);
data=data+topic;
}

myApp.showIndicator();
$.ajax({
type: "POST",
url: jinsom.jinsom_ajax_url+"/publish/"+publish_type+".php",
data:data+'&ticket='+ticket+'&randstr='+randstr,
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
type=$('.jinsom-home-menu li.on').attr('data');
jinsom_post_data(type,'pull',0,this);
function d(){myApp.getCurrentView().router.back();}setTimeout(d,2500);
}else if(msg.code==5){
function a(){myApp.popup('.jinsom-publish-topic-popup');}setTimeout(a,1500);
}else if(msg.code==2){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/setting/setting-phone.php'});
}

}
});  

}


//打开发布帖子表单
function jinsom_publish_bbs_form(bbs_id,type){
if(type=='vote'||type=='activity'){
layer.open({content:'暂未开启！',skin:'msg',time:2});	
return false;
}

if($('.jinsom-topic-page-header').length>0){
topic=$('.jinsom-topic-page-header').attr('topic');
}else{
topic='';	
}

myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/bbs-type.php",
data:{bbs_id:bbs_id},
success: function(msg){
if(msg.code==0){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
}else if(msg.code==1){
myApp.closeModal();
if(type=='normal'||type=='pay'||type=='vip'||type=='login'||type=='comment'||type=='answer'){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/publish/bbs-normal.php?bbs_id='+bbs_id+'&type='+type+'&topic='+topic});	
}else{
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/publish/bbs-'+type+'.php?bbs_id='+bbs_id+'&topic='+topic});	
}
myApp.hideIndicator();
}
}
});
}


//发布帖子
function jinsom_publish_bbs(type,ticket,randstr){
if($.trim($(".jinsom-publish-words-form .title input").val())==''){
layer.open({content:'请输入标题！',skin:'msg',time:2});
return false;	
}

content=$(".jinsom-publish-words-form .content textarea").val();

if($.trim(content)==''){
layer.open({content:'请输入内容！',skin:'msg',time:2});
return false;	
}

if($('#jinsom-bbs-category').val()==''){
layer.open({content:'请选择分类！',skin:'msg',time:2});
return false; 
} 

if(type=='pay'){
price=$('.jinsom-publish-words-form .power-content .price').val();
if(!price){
layer.open({content:'请输入内容售价！',skin:'msg',time:2});
return false;		
}
}
if(type=='answer'){
price=$('.jinsom-publish-words-form .power-content .price').val();
if(!price){
layer.open({content:'请输入悬赏金额！',skin:'msg',time:2});
return false;		
}
}
if(type=='pay'||type=='vip'||type=='login'||type=='comment'){
hide_content=$('.jinsom-publish-words-form .power-content textarea').val();
if(hide_content==''){
layer.open({content:'请输入隐藏的内容！',skin:'msg',time:2});
return false;		
}
}
 


data=$("#jinsom-publish-form").serialize();
if($('.jinsom-publish-words-form .topic span').length>0){
topic='&topic=';
$('.jinsom-publish-words-form .topic span').each(function(){
topic+=$(this).attr('data')+',';
});
topic=topic.substr(0,topic.length-1);
data=data+topic;
}

if($('#jinsom-publish-images-list li').length>0){
img='&img=';
$('#jinsom-publish-images-list li').each(function(){
img+=$(this).children('a').html()+'</br>';
});
data=data+img;
}

myApp.showIndicator();
$.ajax({
type: "POST",
url: jinsom.jinsom_ajax_url+"/publish/bbs.php",
data:data+'&ticket='+ticket+'&randstr='+randstr,
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$(".jinsom-publish-words-form .content textarea").val('');
myApp.getCurrentView().router.back();
function e(){myApp.getCurrentView().router.refreshPage();}setTimeout(e,800);
}else if(msg.code==5){
function a(){myApp.popup('.jinsom-publish-topic-popup');}setTimeout(a,1500);
}else if(msg.code==2){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/setting/setting-phone.php'});
}

}
});  


}



//参与话题
function jinsom_join_topic(topic_name){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/topic-power.php",
data:{topic_name:topic_name},
success: function(msg){
myApp.hideIndicator();
if(msg.code==1){
myApp.popup('.jinsom-publish-type-form');
}else{
layer.open({content:msg.msg,skin:'msg',time:2});
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
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/publish/redbag.php",
data:{credit:credit,number:number,type:type,content:content},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
type=$('.jinsom-home-menu li.on').attr('data');
jinsom_post_data(type,'pull',0,this);
function d(){myApp.getCurrentView().router.back();}
setTimeout(d,2500);
}
}
}); 


}