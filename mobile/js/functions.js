document.write("<script type='text/javascript' src='"+jinsom.cdn_url+"/mobile/js/post.js?ver=123'></script>");//文章相关
document.write("<script type='text/javascript' src='"+jinsom.cdn_url+"/mobile/js/login.js'></script>");//登录相关
document.write("<script type='text/javascript' src='"+jinsom.cdn_url+"/mobile/js/chat.js'></script>");//聊天相关
document.write("<script type='text/javascript' src='"+jinsom.cdn_url+"/mobile/js/comment.js'></script>");//评论相关
document.write("<script type='text/javascript' src='"+jinsom.cdn_url+"/mobile/js/publish.js'></script>");//发布相关
document.write("<script type='text/javascript' src='"+jinsom.cdn_url+"/mobile/js/recharge.js'></script>");//发布相关
document.write("<script type='text/javascript' src='"+jinsom.cdn_url+"/assets/js/jquery.fancybox.min.js'></script>");//图片灯箱


//置顶动态
function jinsom_sticky_post(post_id,obj){
layer.closeAll();
layer.open({
content: '你要'+$(obj).children('p').html()+'这个内容吗？'
,btn: ['确定', '取消']
,yes: function(index){
myApp.showIndicator();
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/action/commend-post.php",
data: {post_id:post_id,type:'sticky-post'},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){//置顶成功
$(obj).html('取消置顶');
}else if(msg.code==2){//取消置顶
$(obj).html('置顶');
}
}
});
layer.close(index);
}
});
}


//推荐动态
function jinsom_commend_post(post_id,obj){
layer.closeAll();
layer.open({
content: '你要'+$(obj).children('p').html()+'这个内容吗？'
,btn: ['确定', '取消']
,yes: function(index){
myApp.showIndicator();
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/action/commend-post.php",
data: {post_id:post_id,type:'commend-post'},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){//推荐成功
$(obj).html('取消推荐');	
}else if(msg.code==2){//取消置顶
$(obj).html('推荐');
}
}
});

layer.close(index);
}
});
}




//删除动态内容
function jinsom_delete_post(post_id,obj,type){
layer.closeAll();
layer.open({
content: '你要删除这个内容吗？'
,btn: ['确定', '取消']
,yes: function(index){
myApp.showIndicator();
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/delete/post.php",
data: {post_id:post_id,type:'post'},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
if(type=='single'){
history.back(-1);	
}
$('.jinsom-post-'+post_id).fadeTo("slow",0.06, function(){
$(this).slideUp(0.06, function(){
$(this).remove();
});
});

}
}
});

layer.close(index);
}
});
}



//置顶帖子
function jinsom_sticky_bbs_post(post_id,bbs_id,obj){
layer.closeAll();
layer.open({
content: '你要'+$(obj).children('p').html()+'这个内容吗？'
,btn: ['确定', '取消']
,yes: function(index){
myApp.showIndicator();
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/action/commend-post.php",
data: {post_id:post_id,bbs_id:bbs_id,type:'sticky-bbs-post'},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){//置顶成功
$(obj).html('取消置顶');
}else if(msg.code==2){//取消置顶
$(obj).html('论坛置顶');
}
}
});

layer.close(index);
}
});
}




//加精帖子
function jinsom_commend_bbs_post(post_id,bbs_id,obj){
layer.closeAll();
layer.open({
content: '你要'+$(obj).children('p').html()+'这个内容吗？'
,btn: ['确定', '取消']
,yes: function(index){
myApp.showIndicator();
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/action/commend-post.php",
data: {post_id:post_id,bbs_id:bbs_id,type:'commend-bbs-post'},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){//加精成功
$(obj).html('取消加精');
}else if(msg.code==2){//取消加精
$(obj).html('加精');
}
}
});
layer.close(index);
}
});
}


//采纳答案
function jinsom_answer_adopt(obj,post_id){
this_dom=$(obj);
comment_id=$(obj).attr('data');
layer.open({
content: '你要采纳这个答案吗？'
,btn: ['确定', '取消']
,yes: function(index){
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/answer.php",
data: {comment_id:comment_id,post_id:post_id,type:'adopt'},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function a(){layer.closeAll();}setTimeout(a,2000); 
this_dom.parent().prev().prepend('<i class="jinsom-icon jinsom-yicaina"></i>');
$('.jinsom-single-comment-list-'+post_id+' .footer span.answer').remove();
// $('.jinsom-bbs-single-footer .add').remove();
$('.jinsom-post-'+post_id+' h1 .jinsom-bbs-post-type-answer').addClass('ok').html('');
}	
}
});
}
});
}

//删除帖子内容
function jinsom_delete_bbs_post(post_id,bbs_id,obj,type){
layer.closeAll();
layer.open({
content: '你要删除这个内容吗？'
,btn: ['确定', '取消']
,yes: function(index){
myApp.showIndicator();
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/delete/post.php",
data: {post_id:post_id,bbs_id:bbs_id,type:'bbs'},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
if(type=='single'){
history.back(-1);	
}
$('.jinsom-post-'+post_id).fadeTo("slow",0.06, function(){
$(this).slideUp(0.06, function(){
$(this).remove();
});
});

}
}
});

layer.close(index);
}
});
}

//删除动态评论
function jinsom_delete_post_comments(comment_id,obj){//我的评论页面
layer.open({
content: '你确定要删除该评论？'
,btn: ['确定', '取消']
,yes: function(index){
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:  jinsom.jinsom_ajax_url+"/delete/comment.php",
data: {comment_id:comment_id,type:'post'},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){//成功
comment_dom=$(obj).parent('.footer');
comment_dom.siblings('.jinsom-comment-image-list').remove();
comment_dom.siblings('.content').html('<m class="delete"><i class="fa fa-trash"></i> 该评论内容已被删除。</m>');
$(obj).remove();
}
}
});
}
}); 
}

//删除一级/二级回帖
function jinsom_delete_bbs_post_comments(comment_id,bbs_id,type,obj){
layer.open({
content: '你确定要删除该评论？'
,btn: ['确定', '取消']
,yes: function(index){
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:  jinsom.jinsom_ajax_url+"/delete/comment.php",
data: {comment_id:comment_id,type:type,bbs_id:bbs_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$(obj).parents('.jinsom-comment-'+comment_id).fadeTo("slow",0.06, function(){
$(this).slideUp(0.06, function() {
$(this).remove();
});
});
}
}
});
}
}); 
}



//喜欢内容
function jinsom_like(post_id,obj){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}

like_num=$('.jinsom-post-'+post_id+' .footer .like_num');
like_dom=$('.jinsom-post-'+post_id).children('.footer').find('i.like');
user_id=jinsom.user_id;
avatar=jinsom.avatar;

if($(obj).children('i').hasClass('had')){
like_num.html(parseInt(like_num.html())-1); 
like_dom.removeClass('jinsom-shiliangzhinengduixiang31 had').addClass('jinsom-xihuan2');   
$('.jinsom-post-'+post_id+' .footer').next('.jinsom-post-like').children('#had_like_'+user_id).remove();

}else{
like_num.html(parseInt(like_num.html())+1); 
like_dom.removeClass('jinsom-xihuan2').addClass('jinsom-shiliangzhinengduixiang31 had');   
$('.jinsom-post-'+post_id+' .footer').next('.jinsom-post-like').prepend('<a href="#" id="had_like_'+user_id+'">'+avatar+'</a>');  
layer.open({content:'喜欢成功！',skin:'msg',time:2});
}

$.ajax({   
url:jinsom.jinsom_ajax_url+"/action/like-post.php",
type:'POST',   
data:{post_id:post_id},
}); 

}




//打开@链接
function jinsom_post_link(obj){
type=$(obj).attr('type');
if(type=='at'){
user_id=$(obj).attr('user_id');
if(user_id==jinsom.user_id){
myApp.getCurrentView().router.loadPage(jinsom.theme_url+'/mobile/templates/page/member-mine.php?author_id='+user_id);
}else{
myApp.getCurrentView().router.loadPage(jinsom.theme_url+'/mobile/templates/page/member-other.php?author_id='+user_id);    
}
}else if(type=='link'){
window.open($(obj).attr('data'));  
}
}


//喜欢音乐
function jinsom_like_music(obj){
post_id=$('.jinsom-player-footer-btn .play').attr('post_id');

like_num=$('.jinsom-post-'+post_id+' .footer .like_num');
like_dom=$('.jinsom-post-'+post_id).children('.footer').find('i.like');
user_id=jinsom.user_id;
avatar=jinsom.avatar;

if($(obj).hasClass('jinsom-xihuan2')){
$(obj).removeClass('jinsom-xihuan2').addClass('jinsom-shiliangzhinengduixiang31');

like_num.html(parseInt(like_num.html())+1); 
like_dom.removeClass('jinsom-xihuan2').addClass('jinsom-shiliangzhinengduixiang31 had');   
$('.jinsom-post-'+post_id+' .footer').next().prepend('<a href="#" id="had_like_'+user_id+'">'+avatar+'</a>'); 
layer.open({content:'喜欢成功！',skin:'msg',time:2});
}else{
$(obj).removeClass('jinsom-shiliangzhinengduixiang31').addClass('jinsom-xihuan2');    

like_num.html(parseInt(like_num.html())-1); 
like_dom.removeClass('jinsom-shiliangzhinengduixiang31 had').addClass('jinsom-xihuan2');   
$('.jinsom-post-'+post_id+' .footer').next().children('#had_like_'+user_id).remove();
}

$.ajax({   
url:jinsom.jinsom_ajax_url+"/action/like-post.php",
type:'POST',   
data:{post_id:post_id},    
success:function(results){}   
});
}



//签到
function jinsom_sign(obj,ticket,randstr){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
myApp.showIndicator();
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/action/sign.php",
data: {sign:1,ticket:ticket,randstr:randstr},
dataType:'json',
success: function(msg){ 
myApp.hideIndicator();
if(msg.code==0){//签到失败
layer.open({content:msg.msg,skin:'msg',time:2});
}else if(msg.code==1||msg.code==2){//已经签到|签到成功
layer.open({
content:'<div class="jinsom-sign-success-form">'+msg.content+'</div>'
});

$(obj).addClass('had').html(msg.text_mobile);
$(obj).parent().prev().find('span').html(msg.sign_c);
month_day=parseInt($('.jinsom-sign-page-month-days span').text());
$('.jinsom-sign-page-month-days span').html(month_day+1);
$('.jinsom-mine-page .list-block li.sign .item-after').html('累计'+msg.sign_c+'天');
$('.jinsom-sign-page-content tbody td.today').removeClass('no-sign').addClass('had-sign').children('span').append('<i class="jinsom-icon jinsom-dagou"></i>');


}
}
});
}


//补签表单
function jinsom_sign_add_form(day){
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/stencil/sign-add.php",
data:{day:day},
success: function(msg){
myApp.hideIndicator();
layer.open({
content:'<div class="jinsom-sign-add-form">'+msg+'</div>'
});
}
});
}

//补签
function jinsom_sign_add(day){
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/sign-add.php",
data:{day:day},
success: function(msg){
myApp.hideIndicator();
if(msg.code==1){
layer.open({
content:'<div class="jinsom-sign-success-form">'+msg.content+'</div>'
});

//前端渲染
$('.jinsom-sign-header .left p:first-child span').text(msg.sign_c);
$('.jinsom-mine-page .list-block li.sign .item-after').html('累计'+msg.sign_c+'天');
$('.jinsom-sign-page-all-days span').html(msg.sign_c);
month_day=parseInt($('.jinsom-sign-page-month-days span').text());
$('.jinsom-sign-page-month-days span').html(month_day+1);
$('#jinsom-sign-day-'+day).removeClass('no-sign').addClass('had-sign').children('span').html(day+'<i class="jinsom-icon jinsom-dagou"></i>');

}else{
layer.open({content:msg.msg,skin:'msg',time:2});
}
}
});
}


//查看签到宝箱
function jinsom_sign_treasure_form(number){
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/stencil/sign-treasure.php",
data:{number:number},
success: function(msg){
myApp.hideIndicator();
layer.open({
content:'<div class="jinsom-sign-treasure-form">'+msg+'</div>'
});
}
});	
}


//领取宝箱奖励
function jinsom_sign_treasure(number,obj){
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/sign-treasure.php",
data:{number:number},
success: function(msg){
myApp.hideIndicator();
if(msg.code==1){
layer.open({
content:'<div class="jinsom-sign-success-form">'+msg.content+'</div>'
});

//前端渲染
$(obj).addClass('had').html('已领取').removeAttr('onclick');
}else{
layer.open({content:msg.msg,skin:'msg',time:2});
}
}
});
}








//关注
function jinsom_follow(author_id,obj){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/follow.php",
data: {author_id:author_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
follow_dom=$('.jinsom-follow-'+author_id);
if(msg.code==1){//取消关注
follow_dom.removeClass('has').addClass('no');  
follow_dom.html('<i class="jinsom-icon jinsom-guanzhu"></i>关注');
}else if(msg.code==2){//关注成功
follow_dom.removeClass('no').addClass('has');
follow_dom.html('<i class="jinsom-icon jinsom-yiguanzhu"></i>已关');     
}else if(msg.code==3){//相互关注成功
follow_dom.removeClass('no').addClass('has');
follow_dom.html('<i class="jinsom-icon jinsom-xianghuguanzhu"></i>互关');    
}
}
}); 
}



//动态播放视频
function jinsom_play_video(post_id,video_url,obj){
$(obj).before('<div id="jinsom-video-'+post_id+'" post_id="'+post_id+'"></div>');
$(obj).remove();
video_type=jinsom_video_type(video_url);
window['video_'+post_id]=new window[video_type]({
id:'jinsom-video-'+post_id,
url:video_url,
'x5-video-player-type': 'h5',
'x5-video-player-fullscreen': false,
playbackRate: [0.5,1,2,6,8],
fitVideoSize:'fixWidth',
playsinline: true,
autoplay:true,
ignores: ['volume','pc'],
closeVideoTouch: true,
rotate:{
innerRotate: true, //只旋转内部video
clockwise: false // 旋转方向是否为顺时针
}
});
window['video_'+post_id].on('play',function(){
if($('.jinsom-video-playing').length>0){
current_post_id=$('.jinsom-video-playing').attr('post_id');
window['video_'+current_post_id].pause();
}
	
$('#jinsom-video-'+post_id).addClass('jinsom-video-playing');
})
window['video_'+post_id].on('pause',function(){
$('#jinsom-video-'+post_id).removeClass('jinsom-video-playing');
})
}

//获取视频播放类型
function jinsom_video_type(video_url){
var index1=video_url.lastIndexOf(".");
var index2=video_url.length;
var type=video_url.substring(index1,index2);
if(type=='.m3u8'){
return 'HlsJsPlayer';
}else if(type=='.flv'){
return 'FlvJsPlayer';
}else{
return 'Player';	
}
}




//拉黑
function jinsom_add_blacklist(type,author_id,obj){
layer.closeAll();
if(type=='add'){
title='你要将对方加入黑名单吗？';	
}else{
title='你要将对方移出黑名单吗？';		
}
layer.open({
content:title
,btn: ['确定', '取消']
,yes: function(index){
myApp.showIndicator();
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/action/add-blacklist.php",
data: {author_id:author_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$(obj).html('拉黑').attr('onclick','jinsom_add_blacklist("add",'+author_id+',this)');	
}else if(msg.code==2){
$(obj).html('取消拉黑').attr('onclick','jinsom_add_blacklist("remove",'+author_id+',this)');	
}
}
});
}
});

}


//标为已读
function jinsom_chat_set_hadread(author_id,obj){
$(obj).parent().prev().find('.tips').remove();

//将底部数量减少
all_tips=parseInt($('.jinsom-xiaoxizhongxin .badge').html());
this_tips=parseInt($(obj).find('.badge').html());
now_tips=all_tips-this_tips;
if(now_tips){//如果还有未读消息
$('.jinsom-xiaoxizhongxin .badge').html(now_tips);	
}else{
$('.jinsom-xiaoxizhongxin .badge').remove();
}

$.ajax({   
url:jinsom.jinsom_ajax_url+"/action/read-msg.php",
type:'POST',   
data:{author_id:author_id},    
success:function(results){}   
});
}




//查看密码动态
function jinsom_get_password_posts(post_id,obj){
this_dom=obj;
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
password= $(obj).prev().val();
if(password==''){
layer.open({content:'请输入密码！',skin:'msg',time:2});
return false;
}
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/password-post.php",
data: {post_id:post_id,password:password},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function d(){
// if($(obj).parents('.jinsom-single').length==0){
// myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/post-'+msg.post_type+'.php?post_id='+post_id});
// }
$('.jinsom-tips-'+post_id).addClass('jinsom-hide-content').html(msg.hide_content).removeClass('jinsom-tips');
}
setTimeout(d,2000);
}
}
});
}


//购买付费内容
function jinsom_buy_post_form(post_id){
if(!jinsom.is_login){
myApp.closeModal();
myApp.loginScreen();  
return false;
}
myApp.closeModal();
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/post-buy.php?post_id='+post_id});
}


//查看全文
function jinsom_moren_content(obj){
if($(obj).prev().hasClass('hidden')){
$(obj).prev().removeClass('hidden');
$(obj).html("收起内容");
}else{
$(obj).prev().addClass('hidden');
$(obj).html("查看全文");
}
}


//购买付费内容
function jinsom_pay_for_visible(post_id,obj){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
myApp.showIndicator();
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/action/pay-for-visible.php",
dataType:'json',
data: {post_id:post_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$(obj).removeAttr('onclick');
function c(){window.location.href="/?p="+post_id;}setTimeout(c,1500);


// $('.jinsom-video-img-'+post_id+' .tips').remove();//如果是视频则移除视频的提示。
// function c(){myApp.getCurrentView().router.back();}setTimeout(c,1500);
//将列表也同步状态
// $.ajax({
// type: "POST",
// url:jinsom.mobile_ajax_url+"/post/hide-content.php",
// data: {post_id:post_id,type:'pay'},
// success: function(msg){
// $('.jinsom-tips-'+post_id).removeClass('jinsom-tips').addClass('jinsom-hide-content').html(msg.content);
// }
// });

}else if(msg.code==3){//弹出金币充值窗口
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/mywallet/recharge-credit.php'});
}
}
});    
}

function jinsom_video_password(post_id){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
layer.open({content:'暂未开启！',skin:'msg',time:2});
}

//关注论坛
function jinsom_bbs_like(bbs_id,obj){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/bbs-like.php",
data: {bbs_id:bbs_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){//关注成功
$(obj).removeClass('no').addClass('had');
$(obj).html('<i class="jinsom-icon jinsom-yiguanzhu"></i>已关');  

html='<li id="jinsom-bbs-like-'+bbs_id+'">\
<a href="javascript:jinsom_publish_bbs_type('+bbs_id+')" class="link">\
<div class="img">\
'+$(obj).siblings('.item-media').children('a').html()+'\
</div>\
<div class="name">'+$(obj).siblings('.item-inner').find('.name').text()+'</div>\
</a>\
</li>';
if($('.jinsom-bbs-like-content.publish .jinsom-empty-page').length>0){
$('.jinsom-bbs-like-content.publish').html('<div class="jinsom-bbs-like">'+html+'</div>');
}else{
$('.jinsom-bbs-like-content.publish .jinsom-bbs-like').prepend(html);
}


}else{//取消关注
$(obj).removeClass('had').addClass('no');  
$(obj).html('<i class="jinsom-icon jinsom-guanzhu"></i>关注');  

$('#jinsom-bbs-like-'+bbs_id).remove();//移除我关注的论坛

}
}
}); 
}


//打赏
function jinsom_reward(post_id,type,obj){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
number=$(obj).attr('data');
myApp.showIndicator();
$.ajax({   
url:jinsom.jinsom_ajax_url+"/action/reward.php",
type:'POST',   
data:{number:number,post_id:post_id,type:type},    
success:function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
myApp.getCurrentView().router.back();

comment_num=$('.jinsom-post-'+post_id+' .footer .comment_number');
comment_num.html(parseInt(comment_num.html())+1); 
$('.jinsom-post-'+post_id).next('.jinsom-single-comment').children('.header').find('span').html(parseInt(comment_num.html()));
$('.jinsom-post-'+post_id).parent().prev().find('.number').html(parseInt(comment_num.html())+'条评论');
comment_list=$('.jinsom-single-comment-list-'+post_id);
comment_list.prepend('\
<div class="jinsom-comment-'+msg.id+'">\
<div class="up" onclick="jinsom_comment_up('+msg.id+',this)"><i class="fa fa-thumbs-o-up"></i><m>0</m></div>\
<div class="header clear">\
<div class="avatarimg">'+jinsom.avatar+jinsom.verify+'</div>\
<div class="info">\
<div class="name">'+jinsom.nickname+jinsom.lv+jinsom.vip+'</div>\
<div class="from"><span>手机端</span></div>\
</div>\
</div>\
<div class="content"><m class="reward"><span class="jinsom-redbag-icon"></span>打赏了'+number+jinsom.credit_name+'。</m></div>\
<div class="footer">\
<span class="time">刚刚</span>\
<span class="comment">\
<a href="'+jinsom.theme_url+'/mobile/templates/page/comment.php?post_id='+post_id+'&name='+jinsom.nickname_base+'" class="link">回复</a>\
</span>\
</div>\
</div>\
');



}   
}
});
}



//提交卡密兑换
function jinsom_keypay(){
key=$('#jinsom-pop-key').val();
if(key==''){
layer.open({content:'请输入卡密！',skin:'msg',time:2});
return false;	
}
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/key-use.php",
data:{key:key},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$('#jinsom-pop-key').val('');
myApp.getCurrentView().router.back();
if(msg.type=='credit'){
current_credit=parseInt($('.jinsom-mywallet-header .number span').html());
recharge_credit=parseInt(msg.number);
$('.jinsom-mywallet-header .number span').html(current_credit+recharge_credit);
}
}
}
});	
}



//大转盘
function jinsom_lottery(obj){
if($(obj).hasClass('on')){
return false;
}

number=$('#jinsom-lottery-money').val();
if(number==''){
layer.open({content:'请输入下注金额！',skin:'msg',time:2});
return false;	
}
$(obj).addClass('on').html('抽奖中...');

//点击抽奖，然后ajax后台获取json数据，返回来抽奖的角度。
$.ajax({   
url:jinsom.mobile_ajax_url+"/action/lottery.php",
dataType:'json',
type:'POST',   
data:{number:number},    
success:function(msg){

if(msg.code==0){
$(obj).removeClass('on').html('开始翻倍');
layer.open({content:msg.msg,skin:'msg',time:2});	
}else{

$('.jinsom-lottery-arrow').rotate({
duration:5000,//转动时间
angle: 0,//起始角度
animateTo:1440+msg.rand,//结束的角度
callback: function(){
$(obj).removeClass('on').html('开始翻倍');
layer.open({content:msg.msg,skin:'msg',time:2});//简单的弹出获奖信息

lottery_times=parseInt($('.jinsom-lottery-info .times span').html());
$('.jinsom-lottery-info .times span').html(lottery_times-1);

count_money=parseInt($('.jinsom-lottery-info .credit span').html());
$('.jinsom-lottery-info .credit span,.jinsom-mywallet-header .number span,.jinsom-mine-list-credit').html(count_money+msg.count-number);


}
});
}


}   
});


}

//====================================设置类===================

//上传头像菜单
function jinsom_upload_avatar_menu(obj,user_id){
var buttons1 = [{text: '查看头像',onClick:function(){

avatar_url=$(obj).find('img').attr('src');
show_avatar = myApp.photoBrowser({
photos : [avatar_url],
theme:'dark',
toolbar:false,
type:'popup',
});
show_avatar.open();	
}},
{text: '上传头像',onClick:function(){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/upload-avatar.php?user_id='+user_id});
}}];
var buttons2 = [{text: '取消',color:'red'}
];
var groups = [buttons1, buttons2];
myApp.actions(groups);
}





//查看二维码
function jinsom_show_user_code(user_id){
url=jinsom.member_url_permalink+jinsom.referral_link_name+'='+user_id;
html='<div class="popup jinsom-publish-type-form profile-qrcode"><div class="page-content"><div id="jinsom-qrcode"></div><p class="tips">扫码加关注我</p><div class="close"><a href="#" class="link icon-only close-popup"><i class="jinsom-icon jinsom-xiangxia2"></i></a></div>';
myApp.popup(html);
jinsom_qrcode('jinsom-qrcode',200,200,url);
}

//修改昵称
function jinsom_update_nickname_form(author_id,obj){
myApp.prompt('', function (value) {
myApp.showIndicator();
$.ajax({
type:"POST",
url:jinsom.jinsom_ajax_url+"/update/nickname.php",
data:{nickname:value,author_id:author_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$(obj).find('.value').html(msg.nickname);

if(msg.self){//管理团队修改自己资料或者普通用户修改自己资料
if($('.jinsom-mine-page .list-block li .item-title .name font').length>0){
$('.jinsom-mine-page .list-block li .item-title .name font').html(msg.nickname);	
}else{
$('.jinsom-mine-page .list-block li .item-title .name').html(msg.nickname);	
}
}

}
}
});	
});
$('.modal-text-input').val($(obj).find('.value').html()).focus();
}



//修改资料==管理员
//update_type=='admin' 管理员修改
function jinsom_update_profile(author_id,type,obj,update_type){
if(update_type=='admin'){
url='profile-admin.php';
}else{
url='profile.php';
}
myApp.prompt('', function (value) {
myApp.showIndicator();
$.ajax({
type:"POST",
url:jinsom.mobile_ajax_url+"/setting/"+url,
data:{value:value,author_id:author_id,type:type},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$(obj).find('.value').html(value);
}
}
});	
});
$('.modal-text-input').val($(obj).find('.value').html()).focus();	
}

//修改个人说明
function jinsom_update_desc(author_id){
description=$('#jinsom-setting-desc').val();
myApp.showIndicator();
$.ajax({
type:"POST",
url:jinsom.jinsom_ajax_url+"/update/profile.php",
data:{author_id:author_id,description:description,mobile:1},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$('.jinsom-setting-box li.desc .value').html(description);
history.back(-1);//返回上一页
}
}
});	
}



//关注的论坛直接弹出论坛的发布类型
function jinsom_publish_bbs_type(bbs_id){
myApp.showIndicator();
$.ajax({
type:"POST",
url:jinsom.mobile_ajax_url+"/publish/bbs-type.php",
data:{bbs_id:bbs_id},
success: function(msg){
myApp.hideIndicator();
if(msg=='normal'){
jinsom_publish_bbs_form(bbs_id,'normal');	
}else if(msg=='pay'){
jinsom_publish_bbs_form(bbs_id,'pay');	
}else if(msg=='comment'){
jinsom_publish_bbs_form(bbs_id,'comment');	
}else if(msg=='vip'){
jinsom_publish_bbs_form(bbs_id,'vip');	
}else if(msg=='login'){
jinsom_publish_bbs_form(bbs_id,'login');	
}else if(msg=='answer'){
jinsom_publish_bbs_form(bbs_id,'answer');	
}else if(msg=='vote'){
jinsom_publish_bbs_form(bbs_id,'vote');	
}else if(msg=='activity'){
jinsom_publish_bbs_form(bbs_id,'activity');	
}else if(msg=='no'){
layer.open({content:'没有开启发布功能！',skin:'msg',time:2});
}else{
$('.jinsom-publish-bbs-type-form .bottom').html(msg);	
myApp.popup('.jinsom-publish-bbs-type-form');
}
}
});	
}


//搜索
function jinsom_search(keyword){
search_loading = false;
search_page=2;
keyword=$.trim(keyword);
if(keyword==''){
layer.open({content:'请输入搜索关键词！',skin:'msg',time:2});	
return false;
}
type=$('.jinsom-search-post-list').attr('type');
$('.jinsom-search-tab').show();
$('.jinsom-search-content').css({'margin-top':'10vw','background-color':'#eeeeee'});
$('.jinsom-search-hot,.jinsom-pop-search-bbs,.jinsom-pop-search-topic').remove();
$('#jinsom-search').val(keyword);
jinsom_search_js(keyword,type);
}

//搜索
function jinsom_ajax_search(type,obj){
search_loading = false;
search_page=2;
$(obj).addClass('on').siblings().removeClass('on');
keyword=$.trim($('#jinsom-search').val());
if(keyword==''){
layer.open({content:'请输入搜索关键词！',skin:'msg',time:2});	
return false;
}
$('.page-content').animate({ scrollTop: 0 },0);
list.attr('type',type);

jinsom_search_js(keyword,type);
}


function jinsom_search_js(keyword,type){
list=$('.jinsom-search-post-list');
list.prepend(jinsom.loading_post);
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/search.php",
data: {keyword:keyword,type:type,page:1},
success: function(msg){
if(msg!=0){
list.html(msg);
}else{
list.html('<div class="jinsom-empty-page">没有更多内容</div>');	
}
}
});	


//加载更多
search_loading = false;
search_page=2;
search_post_list=$('.jinsom-search-post-list');
$('.jinsom-search-content.infinite-scroll').on('infinite',function(){
search_type=$('.jinsom-search-tab li.on').attr('type');
if(search_type=='user'||search_type=='forum'||search_type=='topic') return;
if (search_loading) return;
search_loading = true;
search_post_list.after(jinsom.loading_post);
keyword=$.trim($('#jinsom-search').val());
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/search.php",
data: {keyword:keyword,type:search_type,page:search_page},
success: function(msg){
if(msg!=0){
search_post_list.append(msg);
search_loading = false; 
search_page++;
}else{
search_loading = true; 
}
$('.jinsom-load-post').remove();
}
});


});


}


//关注话题
function jinsom_topic_like(topic_id,obj){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
n=parseInt($(".jinsom-topic-page-header .info .number span:nth-child(2) i").html());
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/topic-like.php",
data: {topic_id:topic_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$(obj).addClass("had").html('<i class="jinsom-icon jinsom-yiguanzhu"></i> 已 关');
n++;	
}else if(msg.code==2){
$(obj).removeClass("had").html('<i class="jinsom-icon jinsom-guanzhu"></i> 关 注');
n--;	
}
$(".jinsom-topic-page-header .info .number span:nth-child(2) i").text(n); 
}
});

}


//打开赠送礼物页面
function jinsom_send_gift_page(author_id){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/send-gift.php?author_id='+author_id});
}


//送礼物
function jinsom_send_gift(author_id){
if($('.jinsom-send-gift-form li.on').length==0){
layer.open({content:'请选择需要赠送的礼物！',skin:'msg',time:2});	
return false;
}
name=$('.jinsom-send-gift-form li.on .top .name').text();

myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/send-gift.php",
data: {name:name,author_id:author_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function c(){history.back(-1);}setTimeout(c,2000);
}
}
});
}

//投票
function jinsom_bbs_vote(post_id){
i=0;
data = [];
$(".jinsom-bbs-vote-form input").each(function(){
if($(this).is(':checked')){
data.push(i+1);	
}
i++;
});

if(data.length>0){
data_arr = data.join(",");
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/vote.php",
data: {post_id:post_id,vote:data_arr},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
myApp.getCurrentView().router.refreshPage();
//function d(){window.location.reload();}setTimeout(d,1500);	
}

}
});
}else{ //判断是否选择了投票选项
layer.open({content:'请至少选择一项进行投票！',skin:'msg',time:2});
}
}


//清除未读消息===
function jinsom_clear_notice(){
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/action/notice-clear.php",
success: function(msg){
layer.open({content:msg.msg,skin:'msg',time:2});	
if(msg.code==1){
$('#jinsom-chat-tab-recently .badge,.jinsom-footer-toolbar .notice .badge').remove();
}
}
});
}

//提交选择头衔
function jinsom_use_honor(user_id){
dom=$('.jinsom-user_honor-select-form .list li.on');
if(dom.length==0){
layer.open({content:'请选择要使用的头衔！',skin:'msg',time:2});	
return false;
}
honor=dom.text();
myApp.showIndicator();
$.ajax({   
url:jinsom.jinsom_ajax_url+"/action/use-honor.php",
type:'POST', 
data:{user_id:user_id,honor:honor},
success:function(msg){
myApp.hideIndicator();
if(msg.code==1){
$('.jinsom-setting-box li.honor .value').text(msg.honor);
history.back(-1);//返回上一页
layer.open({content:msg.msg,skin:'msg',time:2});	
}else{
layer.open({content:msg.msg,skin:'msg',time:2});	
}
}   
});
}


//每日领取成长值
function jinsom_get_vip_number(obj){
myApp.showIndicator();
$.ajax({   
url:jinsom.jinsom_ajax_url+"/action/get-vip-number.php",
type:'POST', 
success:function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$(obj).addClass('had').html('今日已领取成长值');
}else if(msg.code==2){
$(obj).addClass('had').html('今日已领取成长值');	
old_number=parseInt($('.jinsom-vip-page-header-card .info span m').text());
new_number=parseInt(msg.number)+old_number;
$('.jinsom-vip-page-header-card .info span m').text(new_number);
}
}   
});
	
}


//报名
function jinsom_activity(post_id){
if($(".jinsom-activity-form-list li").children('.item').val()==''){
layer.open({content:'内容不能为空！',skin:'msg',time:2});
return false;	
}
// if($(".jinsom-activity-form-list li").children('.upload').val()==''){
// layer.open({content:'请上传内容！',skin:'msg',time:2});
// return false;	
// }

data='<div class="jinsom-bbs-comment-activity">';
$(".jinsom-activity-form-list li").each(function(){
data+='<li>';
data+='<label>'+$(this).children('label').html()+'</label>';
value=$(this).children('.item').val();
if($(this).children('.item').hasClass('upload')){
data+='<div class="content"><a href="'+value+'" target="_blank" download="" class="jinsom-post-link"><i class="fa fa-link"></i> 附件下载</a></div>';
}else{
data+='<div class="content">'+value+'</div>';	
}
data+='</li>';
});
data+='</div>';

myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/activity.php",
data: {content:data,post_id:post_id},
success: function(msg){	
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
myApp.getCurrentView().router.back();
// myApp.getCurrentView().router.refreshPage();
$('.jinsom-post-'+post_id+' .jinsom-bbs-activity-btn').addClass('no').removeAttr('onClick').html('你已经参与');
}
});

}


//获取文件后缀
function jinsom_get_file_type(filename){
var index1=filename.lastIndexOf(".");
var index2=filename.length;
var type=filename.substring(index1,index2);
return type;
}


//内容更多操作
function jinsom_post_more_form(post_id,bbs_id,type){
myApp.showIndicator();
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/stencil/post-more.php",
data: {post_id:post_id,bbs_id:bbs_id,type:type},
success: function(msg){	
myApp.hideIndicator();
layer.open({
type: 1,
content:msg,
anim: 'up',
style:'position:fixed;bottom:0;left:0;width: 100%;border:none;box-sizing: border-box;'
});	

//复制侧栏分享链接
var clipboard = new ClipboardJS('#jinsom-copy-share-link');
clipboard.on('success', function(e) {
e.clearSelection();
layer.open({content:'复制成功！',skin:'msg',time:2});
});

}
});
}


//切换排行榜数据
function jinsom_leaderboard_data(type,obj){
$(obj).addClass('on').siblings().removeClass('on');
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/stencil/leaderboard.php",
data: {type:type},
success: function(msg){	
$('.jinsom-leaderboard-content').html(msg);
}
});
}

//快捷回复
function jinsom_quick_reply(a,obj){
content=$(obj).parent().next().children('textarea');
content.val(content.val()+a);
}

//快捷插入表情
function jinsom_add_smile(a,type,obj){//普通
content=$('.jinsom-smile-textarea');
content.val(content.val()+a);
layer.closeAll();
}

//保释黑名单用户
function jinsom_blacklist_bail(author_id,obj){
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/blacklist-bail.php",
data:{author_id:author_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$(obj).parents('li').remove();
}
}
}); 	
}

//幸运抽奖
function jinsom_luck_start(text,obj){
$(obj).text('抽奖中...');
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/luck-draw.php",
success: function(msg){
layer.open({content:msg.msg,skin:'msg',time:2});
$(obj).text('开始抽奖 ('+text+')');
if(msg.code==1){
$('.jinsom-luck-draw-current-credit span').html(msg.credit);
if($('.jinsom-luck-draw-list .a .jinsom-empty-page').length>0){
$('.jinsom-luck-draw-list .a').empty();
}
$('.jinsom-luck-draw-list .a').prepend("<li><span class='img' style='background-image:url("+msg.cover+")'></span><span class='name'>"+msg.name+"</span></li>");
$('.jinsom-luck-draw-cover .img').css('background-image','url('+msg.cover+')');
$('.jinsom-luck-draw-cover .img .name').html(msg.name);
}
}
});

}


//提现
function jinsom_cash(){
number=$('#jinsom-cash-number').val();
type=$('.jinsom-cash-form-content .type m.on').attr('type');
name=$('#jinsom-cash-name').val();
alipay=$('#jinsom-cash-alipay-phone').val();
wechat=$('#jinsom-cash-wechat-phone').val();
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/cash.php",
data:{number:number,type:type,name:name,alipay:alipay,wechat:wechat},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$('.jinsom-cash-form-content').html('<div class="jinsom-cash-form-end"><i class="jinsom-icon jinsom-zhifuchenggong"></i><p>已提交申请，等待审核中</p></div>');
}
}
});
}


//驳回内容
//where:暂时无效
function jinsom_content_management_refuse(post_id,bbs_id,where,obj){
layer.closeAll();
myApp.prompt('请输入驳回的原因', function (reason) {
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/content-management.php",
data:{post_id:post_id,bbs_id:bbs_id,type:'refuse',reason:reason,where:1},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){

if(where=='single'){
history.back(-1);	
}
$('.jinsom-post-'+post_id).fadeTo("slow",0.06, function(){
$(this).slideUp(0.06, function(){
$(this).remove();
});
});

}
}
});
});
}

//打开转发页面
function jinsom_reprint_form(post_id){
layer.closeAll();
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/reprint.php?post_id='+post_id});
}

//转发
function jinsom_reprint(post_id){
content = $('#jinsom-reprint-value').val();
comment_a=$('#jinsom-reprint-check-a').is(':checked');
comment_b=$('#jinsom-reprint-check-b').is(':checked');
if($('#jinsom-reprint-check-b').length>0){
type='b';
}else{
type='a';
}

if(content==''){content='转发了';}
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/reprint.php",
data: {content:content,post_id:post_id,comment_a:comment_a,comment_b:comment_b,type:type},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function c(){history.back(-1);}setTimeout(c,2000);
}else if(msg.code==2){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/setting/setting-phone.php'});
}
}
});

}


//抢红包
function jinsom_get_redbag(post_id,obj){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/get-redbag.php?post_id='+post_id});
if($(obj).text()=='打开'){
$(obj).addClass('had').removeClass('open').text('红包已打开');
}
}


//切换马甲
function jinsom_exchange_majia(majia_user_id){
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/majia.php",
data:{majia_user_id:majia_user_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function c(){window.location.reload();}setTimeout(c,2000);
}
}
});
}

//领取任务奖励
function jinsom_task_finish(task_id,type,obj){
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/task.php",
data:{task_id:task_id,type:type},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$(obj).addClass('had').removeClass('on').text('已领取');
$('.jinsom-task-form-header .header .number n').text(msg.task);
$('.jinsom-mine-page .list-block li.task .item-after n').text(msg.task);
}

}
});
}

//打开宝箱
function jinsom_task_treasure_form(task_id){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/task-treasure.php?task_id='+task_id});	
}

//打开宝箱任务
function jinsom_task_treasure(task_id,obj){
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/task-treasure.php",
data:{task_id:task_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$(obj).addClass('had').text('已领取');
}
}
});
}


//访问密码论坛，输入密码
function jinsom_bbs_visit_password(bbs_id){
pass=$('#jinsom-bbs-visit-psssword').val();
if(pass==''){
layer.open({content:'请输入访问密码！',skin:'msg',time:2});
return false;
}
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.module_url+"/action/bbs-visit-password.php",
data: {bbs_id:bbs_id,pass:pass,visit:1},
success: function(msg){
myApp.hideIndicator();
if(msg.code==1){
layer.open({content:msg.msg,skin:'msg',time:2});
function d(){window.location.reload();}setTimeout(d,2000);
}else if(msg.code==3){
myApp.loginScreen(); 
}else{
layer.open({content:msg.msg,skin:'msg',time:2});
}
}
});
}

//更换语言
function jinsom_change_language(obj,type){
$(obj).addClass('on').siblings().removeClass('on');
SetCookie('lang',type);
window.location.reload();
}


//付费访问论坛
function jinsom_bbs_visit_pay(bbs_id){
layer.open({
content: '你确定要支付吗？'
,btn: ['确定', '取消']
,yes: function(index){
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/bbs-visit-pay.php",
data:{bbs_id:bbs_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function c(){window.location.reload();}setTimeout(c,2000);
}else if(msg.code==3){
function c(){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/mywallet/recharge-credit.php'});
}
setTimeout(c,1500);
}
}
});
}
});
}


//生成二维码
function jinsom_qrcode(dom,width,height,link){
$('#'+dom).qrcode({
width:width,
height:height,
text:link
});
}

//打开海报页面
function jinsom_content_playbill_page(post_id,url){
layer.closeAll();
myApp.getCurrentView().router.load({
url:jinsom.theme_url+'/mobile/templates/page/playbill-content.php?post_id='+post_id,
query:{url:url}
});	
}

//打开推广海报页面
function jinsom_referral_playbill_page(url){
layer.closeAll();
myApp.getCurrentView().router.load({
url:jinsom.theme_url+'/mobile/templates/page/playbill-referral.php',
query:{url:url}
});	
}

//直播评论互动
function jinsom_comment_live(post_id){
content=$.trim($('#jinsom-live-comment-content').val());
myApp.showIndicator();
$.ajax({
type:"POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/comment-live.php",
data: {content:content,post_id:post_id},
success: function(msg) {
myApp.hideIndicator();
if(msg.code==1){//成功
$('#jinsom-live-comment-content').val('');
comment_html='\
<li>\
<div class="left">'+msg.avatar+'</div>\
<div class="right">\
<div class="name">'+msg.nickname+'</div>\
<div class="content">'+msg.content+'</div>\
</div>\
</li>\
';
if($('.jinsom-live-page-nav-list ul.comment-list .jinsom-empty-page').length>0){
$('.jinsom-live-page-nav-list ul.comment-list').html(comment_html);
}else{
$('.jinsom-live-page-nav-list ul.comment-list').append(comment_html);
}
$('.jinsom-live-page-nav-list').scrollTop($('.jinsom-live-page-nav-list')[0].scrollHeight);//互动评论向下啦
count=parseInt($('.jinsom-live-content').attr('count'));
$('.jinsom-live-content').attr('count',count+1);
if(ajax_get_live_comment){ajax_get_live_comment.abort();}
jinsom_ajax_get_live_comment();

}else if(msg.code==2){//没有绑定手机号
layer.open({content:msg.msg,skin:'msg',time:2});
function d(){myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/setting/setting-phone.php'});}setTimeout(d,2000);
}else{
layer.open({content:msg.msg,skin:'msg',time:2});
}
},
});
}


//直播精彩视频切换
function jinsom_live_jingcai_video_play(url,obj){
$(obj).addClass('on').siblings().removeClass('on');
if($('.jinsom-no-video-live').length>0){
$('.jinsom-no-video-live').before('<div id="jinsom-video-live"></div>');
$('.jinsom-no-video-live').remove();
}
$('#jinsom-video-live').empty();
video_type=jinsom_video_type(url);
new window[video_type]({
id: 'jinsom-video-live',
url: url,
autoplay: true,
playsinline: true,
'x5-video-player-type': 'h5',
'x5-video-player-fullscreen': false,
});
}

//实时获取弹幕
function jinsom_ajax_get_live_comment(){
count=parseInt($('.jinsom-live-content').attr('count'));
post_id=$('.jinsom-live-content').attr('post_id');
window.ajax_get_live_comment=$.ajax({
type: "POST",
url:jinsom.module_url+"/action/live-comment-ajax.php",
timeout:30000,
dataType:'json',
data: {count:count,post_id:post_id},
success: function(msg){
if(msg.code==2){
$('.jinsom-live-page-nav-list ul.comment-list').append(msg.msg);
$('.jinsom-live-page-nav-list').scrollTop($('.jinsom-live-page-nav-list')[0].scrollHeight);//互动评论向下啦
$('.jinsom-live-content').attr('count',msg.count);
jinsom_ajax_get_live_comment();
}else if(msg.code==3){//异常
}else{
jinsom_ajax_get_live_comment();	
}
},
error:function(XMLHttpRequest,textStatus,errorThrown){ 
if(textStatus=="timeout"){ 
jinsom_ajax_get_live_comment();
} 
} 
});	
}

//打赏界面
function jinsom_reward_form(post_id,type){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
myApp.getCurrentView().router.loadPage(jinsom.theme_url+'/mobile/templates/page/reward.php?post_id='+post_id+'&type='+type);
}

//生成推广地址
function jinsom_referral_url(obj){
$(obj).append('<i class="fa fa-spinner fa-spin"></i>');
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.mobile_ajax_url+"/action/referral-url.php",
success: function(msg){
myApp.hideIndicator();
$(obj).children('i').remove();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$('.jinsom-referral-url').show();
$('#jinsom-referral-url-cover').html(msg.url);
// $(obj).remove();
}
}
});
}


//首页sns模块
function jinsom_index_sns_js_load(){
//首页下拉刷新
var ptrContent = $('.jinsom-sns-page-content.pull-to-refresh-content');
ptrContent.on('refresh', function (e) {
setTimeout(function (){//显示刷新成功
$('.jinsom-sns-page-content .preloader').hide();
$('.jinsom-sns-page-content .jinsom-refresh-success').show();
}, 800);

//下拉刷新完成
setTimeout(function (){
myApp.pullToRefreshDone();
$('.jinsom-sns-page-content .preloader').show();
$('.jinsom-sns-page-content .jinsom-refresh-success').hide();
type=$('.jinsom-home-menu li.on').attr('data');
jinsom_post_data(type,'pull',0,this);
}, 1600);

});



//首页加载更多内容
sns_loading = false;
sns_page = 2;
index_post_list=$('.jinsom-post-list');
$('.jinsom-sns-page-content.infinite-scroll').on('infinite',function(){
if(sns_loading) return;
sns_loading = true;
index_post_list.after(jinsom.loading_post);
type=$('.jinsom-home-menu li.on').attr('data');
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/data.php",
data: {page:sns_page,type:type,load_type:'more'},
success: function(msg){
$('.jinsom-load-post').remove();
if(msg==0){
sns_loading = true; 
}else{
index_post_list.append(msg);
jinsom_lightbox()
sns_page++;
sns_loading = false;  
} 
}
});
}); 
}

//首页消息模块
function jinsom_index_notice_js_load(){
//下拉刷新
var ptrContent = $('.jinsom-notice-page-content.pull-to-refresh-content');
ptrContent.on('refresh', function (e) {
setTimeout(function (){//显示刷新成功
$('.jinsom-notice-page-content .preloader').hide();
$('.jinsom-notice-page-content .jinsom-refresh-success').show();
}, 800);

// //下拉刷新完成
setTimeout(function (){
myApp.pullToRefreshDone();
$('.jinsom-notice-page-content .preloader').show();
$('.jinsom-notice-page-content .jinsom-refresh-success').hide();
//消息页面
$.ajax({   
url:jinsom.mobile_ajax_url+"/stencil/notice-page.php",
type:'POST',    
success:function(msg){
$('.jinsom-chat').html(msg);
$('.jinsom-chat-notice li').click(function(event){
$(this).children('.tips').remove();
});
}
});
}, 1600);

});


}


//瀑布流图片预加载
function jinsom_loadImage(url) {
var img = new Image(); 
img.src = url;
if (img.complete) {
return img.src;
}
img.onload = function () {
return img.src;
};
};


//点击广告
function jinsom_click_ad(){
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/click-ad.php",
});	
}

//出售宠物
function jinsom_pet_sell(id,number,obj,ticket,randstr){
myApp.showIndicator();
$.ajax({   
url:jinsom.mobile_ajax_url+"/action/pet.php",
type:'POST',    
data:{id:id,type:'sell',ticket:ticket,randstr:randstr},
success:function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});

if(msg.code==1){
$(obj).after('<div class="jinsom-pet-nest-btn" onclick="jinsom_pet_store('+number+')">'+msg.text+'</div>').remove();
$('.jinsom-pet-content.mine .jinsom-pet-nest-list li').eq(number).find('.pet_img').remove();
$('.jinsom-pet-content.mine .jinsom-pet-nest-list li').eq(number).find('.green').text(msg.text);
$('.jinsom-pet-nest-list.single .pet_img').remove();
$('.navbar-on-center .center').text('');
}

}
});
}

//偷宠物
function jinsom_pet_steal(id,number,obj,ticket,randstr){
myApp.showIndicator();
$.ajax({   
url:jinsom.mobile_ajax_url+"/action/pet.php",
type:'POST',    
data:{id:id,type:'steal',ticket:ticket,randstr:randstr},
success:function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});

if(msg.code==1){
$(obj).remove();
$('.jinsom-pet-content.other .jinsom-pet-nest-list li').eq(number).find('.pet_img').remove();
$('.jinsom-pet-content.other .jinsom-pet-nest-list li').eq(number).find('.green').text(msg.text);
$('.jinsom-pet-content.other .jinsom-pet-nest-list li').eq(number).children('a').removeAttr('href');
$('.jinsom-pet-nest-list.single .pet_img').remove();
$('.jinsom-pet-nest-list.single li .nest p').text(msg.text).addClass('green');
// function d(){history.back(-1);}setTimeout(d,1500);
}

}
});
}



//购买窝、解锁窝
function jinsom_pet_buy_nest(number,obj){
myApp.showIndicator();
$.ajax({   
url:jinsom.mobile_ajax_url+"/action/pet.php",
type:'POST',    
data:{number:number,type:'deblocking'},
success:function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$(obj).after('<div class="jinsom-pet-nest-btn" onclick="jinsom_pet_store('+number+')">'+msg.text+'</div>').remove();
$('.jinsom-pet-content.mine .jinsom-pet-nest-list li').eq(number).removeClass('gray');
$('.jinsom-pet-content.mine .jinsom-pet-nest-list li').eq(number).find('.no').text(msg.text).addClass('green');
$('.jinsom-pet-nest-list.single li').removeClass('gray');
}

}
});
}

//购买宠物蛋
function jinsom_pet_buy(number,iiii){
myApp.showIndicator();
$.ajax({   
url:jinsom.mobile_ajax_url+"/action/pet.php",
type:'POST',    
data:{number:number,iiii:iiii,type:'buy'},
success:function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$('.jinsom-pet-nest-btn').remove();
$('.jinsom-pet-nest-list.single li .animal').html('<img class="egg_img" src="'+msg.img_egg+'">');
$('.jinsom-pet-content.mine .jinsom-pet-nest-list li').eq(number).find('.animal').html('<img class="egg_img" src="'+msg.img_egg+'">');
$('.jinsom-pet-nest-list.single li .nest').append('<p>'+msg.text+' '+msg.hatch_time+'</p>');
$('.jinsom-pet-content.mine .jinsom-pet-nest-list li').eq(number).find('.green').text(msg.text+' '+msg.hatch_time).removeClass('green');
$('.navbar-on-center').prev().children('.center').text(msg.pet_name);
function d(){history.back(-1);}setTimeout(d,1500);
}

}
});	
}

//打开商店界面
function jinsom_pet_store(number){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/pet-store.php?number='+number});	
}



//收藏内容
function jinsom_collect(post_id,type,obj){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
if(type=='img'){
url=$(obj).parent().siblings('.fancybox-stage').find('img').attr('src');
}else{
url='';	
}

if($(obj).children('i').hasClass('jinsom-shoucang')){
$(obj).children('i').addClass('jinsom-shoucang1').removeClass('jinsom-shoucang');
$(obj).children('p').text($(obj).attr('a'));
}else{
$(obj).children('i').addClass('jinsom-shoucang').removeClass('jinsom-shoucang1');
$(obj).children('p').text($(obj).attr('b'));
}
$.ajax({   
url:jinsom.jinsom_ajax_url+"/action/collect.php",
type:'POST',   
data:{post_id:post_id,type:type,url:url},  
}); 
}


//图片灯箱
function jinsom_lightbox(){
$("[data-fancybox]").fancybox({
loop : true,
arrows : false,
protect:false,
buttons : ['collect','download','thumbs','close'],
btnTpl: {
collect:
'<a  onclick=\'jinsom_collect("","img",this)\' class="fancybox-button fancybox-button--collect" href="javascript:;"><i class="jinsom-icon jinsom-shoucang1"></i></a>'
},
mobile:{
clickSlide: function(current, event){
return "close";
},
clickContent: function(current, event){
return "close";
},
},
hash:false,
afterShow: function(instance,current){
window.history.pushState(null,null,'/?lightbox&r='+Math.random().toString(36).substr(2,5));
// console.log($.fancybox.getInstance().current.src);

$.ajax({   
url:jinsom.jinsom_ajax_url+"/action/collect-is.php",
type:'POST',   
data:{url:$.fancybox.getInstance().current.src}, 
success:function(msg){ 
if(msg.code==1){
$('.fancybox-button--collect i').addClass('jinsom-shoucang').removeClass('jinsom-shoucang1');
}else{
$('.fancybox-button--collect i').addClass('jinsom-shoucang1').removeClass('jinsom-shoucang');	
}
} 
}); 


},
});	
}


//评论置顶
function jinsom_up_comment(comment_id,bbs_id,obj){
title=$(obj).text();
layer.open({
content: '你确定要'+title+'吗？'
,btn: ['确定', '取消']
,yes: function(index){
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:  jinsom.jinsom_ajax_url+"/action/up-comment.php",
data: {comment_id:comment_id,bbs_id:bbs_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
$(obj).text(msg.name);
$(obj).parents('.jinsom-single-comment-list').find('.up-comment').remove();	
if(msg.code==1){//成功
$(obj).parents('.jinsom-comment-li').find('.from').prepend('<span class="up-comment">'+title+'</span>');
$(obj).parents('.jinsom-single-comment-list').prepend($(obj).parents('.jinsom-comment-li'));
$(obj).parents('.jinsom-comment-li').siblings().find('.comment-up').text(title);
}
}
});
}
}); 
}


//cookies
function SetCookie(name,value){
var argv=SetCookie.arguments;
var argc=SetCookie.arguments.length;
var expires=(2<argc)?argv[2]:null;
var path=(3<argc)?argv[3]:null;
var domain=(4<argc)?argv[4]:null;
var secure=(5<argc)?argv[5]:false;
document.cookie=name+"="+escape(value)+((expires==null)?"":("; expires="+expires.toGMTString()))+((path==null)?"":("; path="+path))+((domain==null)?"":("; domain="+domain))+((secure==true)?"; secure":"");
}
function GetCookie(Name) {
var search = Name + "=";
var returnvalue = "";
if (document.cookie.length > 0) {
offset = document.cookie.indexOf(search);
if (offset != -1) {      
offset += search.length;
end = document.cookie.indexOf(";", offset);                        
if (end == -1)
 end = document.cookie.length;
returnvalue=unescape(document.cookie.substring(offset,end));
}
}
return returnvalue;
}
//删除cookie
function DelCookie(name){
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=GetCookie(name);
if(cval!=null){
document.cookie= name + "="+cval+";expires="+exp.toGMTString();
} 
}

