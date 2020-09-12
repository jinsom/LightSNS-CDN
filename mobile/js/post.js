//内容相关的js

/*
data_type：数据类型 all:全部  words：动态 music：音乐 single：文章 video：视频
load_type：加载类型  pull:下拉刷新 menu：菜单 load：首次载入
author_id:页面属性  如果为0则为非个人主页  大于0则为个人主页
obj：this
*/
var status=1;
function jinsom_post_data(data_type,load_type,author_id,obj){


if($('.jinsom-load-post').length==0&&load_type!='pull'){
if(!author_id){
$('.jinsom-post-list-sns').prepend(jinsom.loading_post);
}else{
$('.jinsom-member-mine-post-list').prepend(jinsom.loading_post);	
}
}


if(!author_id){
$('.page-content').animate({ scrollTop: 0 },0);

// if($(obj).index()!=0){
// $('.jinsom-mobile-home-sns-top').hide();
// }else{
// $('.jinsom-mobile-home-sns-top').show();
// }

}

if(load_type=='load'||load_type=='pull'){
if(author_id){
if(author_id==jinsom.user_id){
post_list=$('.pages .page:last-child .jinsom-member-mine-post-list');	
}else{
post_list=$('.pages .page:last-child .jinsom-member-other-post-list');
}
}else{
post_list=$('.jinsom-post-list-sns');	
}
}else{
if(author_id){
post_list=$(obj).parent().next();
post_list.attr('page',2);
}else{
post_list=$('.jinsom-post-list-sns');	
}
}
sns_page = 2;
sns_loading = false;
$(obj).addClass('on').siblings().removeClass('on');
// if(load_type!='pull'&&load_type!='load'){//不是下拉刷新并且不是首页加载
// post_list.html(jinsom.loading);
// }


$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/data.php",
data: {type:data_type,author_id:author_id},
success: function(msg){
post_list.html(msg);
jinsom_lightbox();//图片灯箱
}
});

}






//论坛内容切换 
function jinsom_bbs_post(bbs_id,type,obj){
if(status==0){return false;	}
bbs_page=2;
bbs_loading = false; 
$(obj).addClass('on').siblings().removeClass('on');
more_list=$(obj).parent().next();
more_list.attr('type',type);
more_list.attr('page',2);
status=0;
topic=$(obj).attr('topic');
more_list.prepend(jinsom.loading_post);
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/bbs.php",
data: {bbs_id:bbs_id,type:type,topic:topic},
success: function(msg){
if(msg!=0){

$(obj).parent().next().empty();
if($(obj).parent().next().hasClass('jinsom-bbs-post-list-3')){
container=$(obj).parent().next();
$(msg).find('img').each(function(index){
jinsom_loadImage($(this).attr('src'));
})
var $newElems = $(msg).css({ opacity: 1}).appendTo(container);
$newElems.imagesLoaded(function(){
// $newElems.animate({ opacity: 1},800);
container.masonry( 'reload', $newElems,true);
});
}else{
more_list.html(msg);
}



}else{
more_list.html(jinsom.empty);	
}
status=1;
}
});	
}



//话题内容切换
function jinsom_topic_data(type,obj){
if(status==0){
return false;	
}
topic_id=$('.jinsom-topic-page-header').attr('data');
$(obj).addClass('on').siblings().removeClass('on');
more_list=$('.jinsom-topic-post-list');
more_list.attr('type',type);
more_list.attr('page',2);
status=0;
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/topic.php",
data: {topic_id:topic_id,type:type},
success: function(msg){
if(msg!=0){
more_list.html(msg);
}else{
more_list.html(jinsom.empty);	
}
status=1;
}
});	
}

//视频专题切换
function jinsom_video_post_data(obj){
if(status==0){
return false;	
}
$('.jinsom-video-page-content').animate({scrollTop:0},0);
video_page = 2;
video_loading = false;
$(obj).addClass('on').siblings().removeClass('on');
post_list=$('.jinsom-video-special-list');
topic=$(obj).attr('data');
status=0;
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/video-special.php",
data: {topic:topic,page:1,type:'click'},
success: function(msg){
post_list.html(msg);
status=1;
}
});
}


function jinsom_collect_post(type,obj){
$('.page-content').animate({ scrollTop: 0 },0);
collect_loading = false;
collect_page = 2;
$(obj).addClass('on').siblings().removeClass('on');
post_list=$('.jinsom-collect-content .jinsom-post-list');
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/collect.php",
data: {type:type,page:1},
success: function(msg){
post_list.html(msg);
jinsom_lightbox();//灯箱
}
});
}