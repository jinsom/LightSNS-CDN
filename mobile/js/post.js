//内容相关的js


var status=1;

//pull和ajax
function jinsom_post(type,load_type,obj){
if($('.jinsom-load-post').length>0){//防止多次点击
alert(1);
return false;	
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


//自动滑动菜单
menu_width=0;
for(var i=0;i<$(obj).index();i++){
menu_width+=$(obj).parent().children('li').eq(i).outerWidth(true);
}
$(obj).parent().animate({
scrollLeft:menu_width-$(window).width()/2+$(obj).outerWidth()
});

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

post_list.prepend(jinsom.loading_post);//加载动画

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
post_list.html(msg);
jinsom_lightbox();//图片灯箱
if(load_type=='pull'){
layer.open({content:'刷新成功',skin:'msg',time:2});
}
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