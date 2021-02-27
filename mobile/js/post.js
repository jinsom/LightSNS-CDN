//内容相关的js


//pull和ajax
function jinsom_post(type,load_type,obj){
if($('.jinsom-load-post').length>0){
return false;	
}

if($(obj).attr('waterfall')!=0&&$(obj).index()!=0){
$('.jinsom-sns-page-content').addClass('waterfall');
}else if($(obj).attr('waterfall')==1&&$(obj).index()==0){
$('.jinsom-post-list-sns').addClass('waterfall');
}else{
$('.jinsom-sns-page-content,.jinsom-post-list-sns').removeClass('waterfall');
}


author_id=$(obj).attr('author_id');
if(load_type=='ajax'){//点击菜单
if(author_id){
if(author_id==jinsom.user_id){
post_list=$('.pages .page:last-child .jinsom-member-mine-post-list');	
}else{
post_list=$('.pages .page:last-child .jinsom-member-other-post-list');
}
}else{
post_list=$('.jinsom-post-list-sns');
$('.page-content').animate({scrollTop: 0 },0);	
}
data=$(obj).attr('data');




index=$(obj).index();

}else{//下拉
data=$('.jinsom-home-menu li.on').attr('data');
post_list=$('.jinsom-post-list-sns');
if(author_id){
index=$('.jinsom-member-menu li.on').index();
}else{
index=$('.jinsom-home-menu li.on').index();
}
}

post_list.before(jinsom.loading_post);//加载动画

sns_page=2;
sns_loading=false;
mine_page=2;
mine_loading=false;
other_page=2;
other_loading=false;
$(obj).addClass('on').siblings().removeClass('on');

$.ajax({
type:"POST",
url:jinsom.mobile_ajax_url+"/post/data.php",
data:{page:1,type:type,load_type:load_type,index:index,author_id:author_id,data:data},
success:function(msg){
$('.jinsom-load-post').remove();
post_list.html(msg);
jinsom_lightbox();//图片灯箱
if(load_type=='pull'){
layer.open({content:'刷新成功',skin:'msg',time:2});
}
if($(obj).attr('waterfall')!=0){//瀑布流渲染
var grid=$('.jinsom-post-list-sns').masonry({
itemSelector:'li',
gutter:0,
// transitionDuration:0
});
grid.masonry('reloadItems'); 
grid.imagesLoaded().progress( function() {
grid.masonry('layout');
}); 
}
}
});

}






//论坛内容切换 
function jinsom_bbs_post(bbs_id,type,obj){
if($('.jinsom-load-post').length>0){//防止多次点击
return false;	
}

bbs_page=2;
bbs_loading = false; 
$(obj).addClass('on').siblings().removeClass('on');
post_list=$(obj).parent().next();
post_list.attr('type',type);
post_list.attr('page',2);
topic=$(obj).attr('topic');
post_list.prepend(jinsom.loading_post);

if($(obj).parent().next().hasClass('jinsom-bbs-post-list-3')){
post_list.html(jinsom.loading_post);
}

$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/bbs.php",
data: {bbs_id:bbs_id,type:type,topic:topic},
success: function(msg){
if(msg!=0){

post_list.html(msg);

//渲染瀑布流
if($(obj).parent().next().hasClass('jinsom-bbs-post-list-3')){
waterfull_margin=$('#jinsom-waterfull-margin').height();
var grid=$('.page-on-center .jinsom-bbs-post-list-3').masonry({
itemSelector:'.grid',
gutter:waterfull_margin,
});

grid.masonry('reloadItems');  
grid.imagesLoaded().progress( function() {
grid.masonry('layout');
});
}



}else{
post_list.html(jinsom.empty);	
}
}
});	
}



//话题内容切换
function jinsom_topic_data(type,obj){
if($('.jinsom-load-post').length>0){//防止多次点击
return false;	
}

topic_id=$('.jinsom-topic-page-header').attr('data');
$(obj).addClass('on').siblings().removeClass('on');
more_list=$('.jinsom-topic-post-list');
more_list.attr('type',type);
more_list.attr('page',2);
more_list.prepend(jinsom.loading_post);
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
}
});	
}

//视频专题切换
function jinsom_video_post_data(obj){
if($('.jinsom-load-post').length>0){//防止多次点击
return false;	
}
$('.jinsom-video-page-content').animate({scrollTop:0},0);
video_page = 2;
number=$(obj).parents('.navbar').next().find('.jinsom-video-special-list').attr('number');
$(obj).addClass('on').siblings().removeClass('on');
post_list=$('.jinsom-video-special-list');
topic=$(obj).attr('data');
post_list.prepend(jinsom.loading_post);
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/video-special.php",
data: {topic:topic,page:1,type:'click',number:number},
success: function(msg){
post_list.html(msg);
}
});
}


function jinsom_collect_post(type,obj){
if($('.jinsom-load-post').length>0){//防止多次点击
return false;	
}
$('.page-content').animate({ scrollTop: 0 },0);
collect_loading = false;
collect_page = 2;
$(obj).addClass('on').siblings().removeClass('on');
post_list=$('.jinsom-collect-content .jinsom-post-list');
post_list.prepend(jinsom.loading_post);
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


//树洞
function jinsom_secret_post(type,load_type,obj){
if($('.jinsom-load-post').length>0){//防止多次点击
return false;	
}
$('.jinsom-secret-content').animate({ scrollTop: 0 },0);
secret_loading=false;
secret_page=2;
$(obj).addClass('on').siblings().removeClass('on');
post_list=$('.jinsom-post-secret-list');
post_list.prepend(jinsom.loading_post);
$.ajax({
type:"POST",
url:jinsom.mobile_ajax_url+"/post/secret.php",
data:{page:1,type:type,load_type:load_type},
success: function(msg){
post_list.html(msg);
if(load_type=='pull'){
layer.open({content:'刷新成功',skin:'msg',time:2});
}
}
});
}