$(function(){

layui.use(['layer', 'form','element'], function(){
var form = layui.form;
var element = layui.element;
// var laydate = layui.laydate;
var layer = layui.layer;
});

var header_height=$('.jinsom-header').height();


//全站滚动条事件
$(window).scroll(function(){
if($(window).scrollTop()>=header_height){
$('.jinsom-header').addClass('fixed');
}else{
$('.jinsom-header').removeClass('fixed');
}
});



//文章、帖子页面左侧栏小工具悬浮
if($('.jinsom-single-left-bar').length>0){
var elm = $('.jinsom-single-left-bar'); 
var startPos = $(elm).offset().top; //计算当前模块离顶部距离
$.event.add(window, "scroll", function() { 
var p2 = $(window).scrollTop()+header_height;//加上导航栏高度
if(p2>startPos){
elm.css({'position':'fixed','top':'60px','margin-left':'-60px','left':'inherit'});
}else{
elm.css({'position':'absolute'});	
}
});
}//判断是否存在模块




//弹窗搜索 


//点击弹出搜索
$('li.search').on('click', function(event){
event.preventDefault();
$('.jinsom-pop-search').addClass('show');
$('body').css('overflow','hidden');
$('.jinsom-pop-search-content input').focus();
});

//点击关闭搜索
$('.jinsom-pop-search .close').click(function() {
$('.jinsom-pop-search').removeClass('show');
$('body').css('overflow','auto');
});

//按esc键关闭 弹窗搜索
$(document).keyup(function(event){
if(event.which=='27'){
$('.jinsom-pop-search').removeClass('show');
$('body').css('overflow','auto');
}
});

//提交搜索
$(".jinsom-pop-search-content span").click(function(){
search_val =$.trim($(".jinsom-pop-search-content input").val());
if(search_val==''){
layer.msg('搜索的内容不能为空！');
return false;
}
window.location.href=jinsom.home_url+'/?s='+search_val;
});

// 回车搜索
$(".jinsom-pop-search-content input").keypress(function(e) {  
if(e.which == 13) {  
search_val =$.trim($(".jinsom-pop-search-content input").val());
if(search_val==''){
layer.msg('搜索的内容不能为空！');
return false;
}
window.location.href=jinsom.home_url+'/?s='+search_val;
}  
}); 


//论坛ajax搜索 回车搜索
$("#jinsom-bbs-search").keypress(function(e) {  
if(e.which == 13) {  
jinsom_ajax_bbs_search();
}  
}); 



//弹出更换背景封面表单
$('.jinsom-member-change-bg,.jinsom-member-change-bg-head .close').click(function() {
if($('.jinsom-member-change-bg-form').css('display')=='none'){
$(".jinsom-member-change-bg-form").show();
$(".jinsom-member-change-bg-form").animate({bottom:"0px"});
}else{
$(".jinsom-member-change-bg-form").animate({bottom:"-300px"});
function d(){$(".jinsom-member-change-bg-form").hide();}setTimeout(d,300);
}
});


//更换用户中心背景封面
$('.jinsom-member-change-bg-content li').click(function(){
$(this).addClass('on').siblings().removeClass('on');
bg=$(this).attr('bg');
color=$(this).attr('color');
number=$(this).attr('number');
author_id=$('.jinsom-member-main').attr('data');
$('.jinsom-member-main').css('background-color',color);
$('.jinsom-member-bg').css('background-image','url('+bg+')');
$.ajax({
type: "POST",
url:  jinsom.module_url+"/action/skin.php",
data: {number:number,author_id:author_id},
success: function(msg){
if(msg.code==2){
jinsom_recharge_vip_form();
function c(){layer.msg(msg.msg);}setTimeout(c,1000);
}
}
});
});

//个人主页查看更多资料
$(".jinsom-member-left-profile-more").click(function(){
$('.jinsom-member-left-profile-hide').show();
$(this).hide();
});

// --------------------------下拉事件-------------





//动态右上角下拉
$('.jinsom-posts-list,.jinsom-post-list,.jinsom-search-content,.jinsom-topic-post-list').on('click','.jinsom-post-setting',function(event){
event.stopPropagation();
$(this).children(".jinsom-post-setting-box").toggle(100);
});
//文章左侧栏自动目录
$('#jinsom-single-title-list').click(function(event){
event.stopPropagation();
$(this).children(".jinsom-single-title-list-content").toggle(0);
});
//个人主页拉黑下拉
$('.jinsom-member-follow-info span:last-child').click(function(event){
event.stopPropagation();
$(this).children(".jinsom-member-follow-box").toggle(100);
});
//通知栏
$('.jinsom-notice').click(function(event){
event.stopPropagation();
$(this).children('ul').toggle(0);
$(this).find('.number').remove();//移除闪烁

if($('.jinsom-notice-content li').length==0&&$('.jinsom-notice-content .a .jinsom-notice-empty').length==0){
$('.jinsom-notice-content .a,.jinsom-notice-content .b,.jinsom-notice-content .c').html(jinsom.loading);
$.ajax({   
url:jinsom.jinsom_ajax_url+"/action/notice.php",//获取关于动态/帖子的消息
type:'POST',   
data:{notice:1},    
success:function(msg){
$('.jinsom-notice-content .jinsom-load').remove();
item_arr=msg.item.data;
like_arr=msg.like.data;
follow_arr=msg.follow.data;
item='';
like='';
follow='';


if(msg.item.code==1){
for (var i = 0; i < item_arr.length; i++) {
type=item_arr[i].type;
if(type=='cash'||type=='reg'||type=='post_agree'||type=='post_refuse'||type=='bbs-apply-refuse'||type=='order-send'){
item+='\
<li class="clear">\
'+item_arr[i].status+'\
<a href="'+item_arr[i].post_link+'" class="url">\
'+item_arr[i].action+'\
</a>\
<span>'+item_arr[i].time+'</span>\
</li>';
}else{
item+='\
<li class="clear">\
'+item_arr[i].status+'\
<a href="'+item_arr[i].author_link+'" target="_blank" class="name">'+item_arr[i].user_name+'</a>\
<a href="'+item_arr[i].post_link+'" target="_blank" class="url">\
'+item_arr[i].action+'\
</a>\
<span>'+item_arr[i].time+'</span>\
</li>';
}
}
}else{
item='<div class="jinsom-notice-empty">有关动态、帖子、系统的消息会显示在这里</div>';	
}
$('.jinsom-notice-content .a').html(item);

if(msg.follow.code==1){
for (var i = 0; i < follow_arr.length; i++) {
follow+='\
<li class="clear">\
'+follow_arr[i].status+'\
<a href="'+follow_arr[i].author_link+'" target="_blank" class="name">'+follow_arr[i].user_name+'</a>\
<a href="'+follow_arr[i].author_link+'" target="_blank" class="url">\
'+follow_arr[i].action+'\
</a>\
<span>'+follow_arr[i].time+'</span>\
</li>';
}
}else{
follow='<div class="jinsom-notice-empty">有人关注你时会显示在这里</div>';	
}
$('.jinsom-notice-content .b').html(follow);

if(msg.like.code==1){
for (var i = 0; i < like_arr.length; i++) {
like+='\
<li class="clear">\
'+like_arr[i].status+'\
<a href="'+like_arr[i].author_link+'" target="_blank" class="name">'+like_arr[i].user_name+'</a>\
<a href="'+like_arr[i].post_link+'" target="_blank" class="url">\
'+like_arr[i].action+'\
</a>\
<span>'+like_arr[i].time+'</span>\
</li>';
}
}else{
like='<div class="jinsom-notice-empty">有人喜欢你动态/帖子时会显示在这里</div>';	
}
$('.jinsom-notice-content .c').html(like);


$('.jinsom-notice-content li').click(function(e){//点击之后 移除小红点
$(this).children('m').remove();
});


}   
});
}


});



//点击通知栏内容区禁止关闭
$(".jinsom-header-right").on("click",'.jinsom-notice ul', function(e){
e.stopPropagation();
});

//委派事件
$(document).on('click', function(event){
$('.jinsom-post-setting-box').hide();
$('.jinsom-smile-form').hide();//显示表情
$('.jinsom-single-title-list-content').hide();//文章左侧栏自动目录
$('.jinsom-notice ul').hide();
$('.jinsom-member-follow-box').hide();
});


//IM
$('.jinsom-chat-header-user').click(function(){
$(this).addClass('on');
$(this).siblings().removeClass('on');
$(".jinsom-chat-content-group").animate({left:'240px'},250);
$(".jinsom-chat-content-recent").animate({left:'240px'},250);
$('.jinsom-chat-clear-icon').hide();
});
$('.jinsom-chat-header-group').click(function(){
$(this).addClass('on');
$(this).siblings().removeClass('on');
$(".jinsom-chat-content-group").animate({left:'0px'},250);
$(".jinsom-chat-content-recent").animate({left:'240px'},250);
$('.jinsom-chat-clear-icon').hide();
});
$('.jinsom-chat-header-recent').click(function(){
$(this).addClass('on');
$(this).siblings().removeClass('on');
$(".jinsom-chat-content-group").animate({left:'0px'},250);
$(".jinsom-chat-content-recent").animate({left:'0px'},250);
$('.jinsom-chat-clear-icon').show();
});
//自动跟随屏幕高度
screen_height=$(window).height()-139;
$(".jinsom-chat-content").css('height',screen_height+'px');
$(window).resize(function() { 
screen_height=$(window).height()-139;
$(".jinsom-chat-content").css('height',screen_height+'px');
});



//关闭IM
$('.jinsom-chat-close-icon').click(function(){
$(".jinsom-chat").animate({right:'-280px'},280);
});
//打开IM
$('.jinsom-right-bar-im').click(function(){
$(this).children('.number').remove();
$(".jinsom-chat").animate({right:'0px'},280);
$('.jinsom-chat-content-recent-user').empty();
$('.jinsom-chat-content-follow-user').empty();
$('.jinsom-chat-content-group').empty();
$('.jinsom-chat-content-recent-user').append('<div class="jinsom-chat-loading"></div>');
$('.jinsom-chat-content-follow-user').append('<div class="jinsom-chat-loading"></div>');
$('.jinsom-chat-content-group').append('<div class="jinsom-chat-loading"></div>');
$.ajax({
type: "POST",
url:jinsom.module_url+"/chat/user-list.php",
data: {recent:1},
success: function(msg){
$('.jinsom-chat-content-recent-user').empty();
$('.jinsom-chat-content-recent-user').append(msg);  
}
});


$.ajax({
type: "POST",
url:jinsom.module_url+"/chat/user-list.php",
data: {group:1},
success: function(msg){
$('.jinsom-chat-content-group').empty();
$('.jinsom-chat-content-group').append(msg);  
}
});

$.ajax({
type: "POST",
url:jinsom.module_url+"/chat/user-list.php",
data: {follow:1},
success: function(msg){
$('.jinsom-chat-content-follow-user').empty();
$('.jinsom-chat-content-follow-user').append(msg);  
}
});

});



// 回车发送消息-单对单
$('body').on('keypress','.jinsom-chat-textarea',function(e){
if(e.which == 13) {  
e.preventDefault();
jinsom_send_msg();//发送消息
}  
}); 


// 回车发送消息-群组
$('body').on('keypress','.jinsom-chat-textarea-group',function(e){
if(e.which == 13) {  
e.preventDefault();
jinsom_send_group_msg();//发送群聊消息
}  
}); 




jinsom_post_js();//ajax后加载要执行的脚本




//侧栏小功能切换浏览排序
$('.jinsom-content-sort>li').click(function() {
$(this).addClass('on').siblings().removeClass('on');
name=$(this).attr('data');
if(name=='rand'){
$('.jinsom-right-bar li.sort').attr('title','随机排序').html('<i class="jinsom-icon jinsom-suijibofang"></i>');	
}if(name=='comment_count'){
$('.jinsom-right-bar li.sort').attr('title','热门排序').html('<i class="jinsom-icon jinsom-huo"></i>');	
}else{
$('.jinsom-right-bar li.sort').attr('title','顺序查看').html('<i class="jinsom-icon jinsom-shunxu-"></i>');	
}
SetCookie('sort',name);	
window.location.reload();
});	

//侧栏浮动按钮浏览排序切换
$('.jinsom-right-bar li.sort').click(function() {
$('.jinsom-content-sort>li').removeClass('on');
if($(this).children().hasClass('jinsom-suijibofang')){
$(this).attr('title','顺序查看').html('<i class="jinsom-icon jinsom-shunxu-"></i>');
$('.jinsom-content-sort>li[data="normal"]').addClass('on');
name='normal';
}else if($(this).children().hasClass('jinsom-shunxu-')){//如果是顺序切换热门
$(this).attr('title','热门排序').html('<i class="jinsom-icon jinsom-huo"></i>');
$('.jinsom-content-sort>li[data="comment_count"]').addClass('on');
name='comment_count';
}else{
$(this).attr('title','随机排序').html('<i class="jinsom-icon jinsom-suijibofang"></i>');
$('.jinsom-content-sort>li[data="rand"]').addClass('on');
name='rand';	
}
SetCookie('sort',name);	
window.location.reload();
});	

//右侧、个人主页左侧工具悬浮
$('.jinsom-content-right,.jinsom-member-left,.jinsom-publish-single-form .left').JinsomSidebarFixed({additionalMarginTop: 50});





// -------------------------------以下待优化


//返回顶部
$(".totop").click(function(){
$('html,body').animate({ scrollTop: 0 },500);
});
//返回底部
$(".tobottom").click(function(){
$('html,body').animate({scrollTop:$('.jinsom-bottom').offset().top},500);
});

//滚动事件
$(window).scroll(function(){
all_height=$(document).height();
height =$(document).scrollTop();//滚动条高度
if(height > 500){$(".totop").show()}else{$(".totop").hide();};
if((all_height-$(window).height()-height)<300){$(".tobottom").hide();}else{$(".tobottom").show();}
});



//动态风格
$(".jinsom-preference-content .post-style n").click(function(){
if($(this).html()=='时光轴'){
$(this).html('矩状');
$(".jinsom-post-list").addClass('block').removeClass('time');
jinsom_set_cookie('post-style','post-style-block.css');
}else{
$(this).html('时光轴');
$(".jinsom-post-list").addClass('time').removeClass('block');  
jinsom_set_cookie('post-style','post-style-time.css');
}
});

//动态风格
$(".jinsom-preference-content .sidebar-style n").click(function(){
if($(this).html()=='左'){
$(this).html('右');
jinsom_set_cookie('sidebar-style','sidebar-style-right.css');
}else{
$(this).html('左'); 
jinsom_set_cookie('sidebar-style','sidebar-style-left.css');
}
});

//单栏布局
$(".jinsom-preference-content .single-column").click(function(){
if($(this).children().hasClass('fa-toggle-off')){
$(this).html('单栏布局<i class="fa fa-toggle-on"></i>');
jinsom_set_cookie('layout-style','layout-single.css');
}else{
$(this).html('单栏布局<i class="fa fa-toggle-off"></i>');
jinsom_set_cookie('layout-style','layout-double.css');
}
});


//帖子间隔
$(".jinsom-preference-content .post-space").click(function(){
if($(this).children().hasClass('fa-toggle-off')){
$(this).html('帖子间隔<i class="fa fa-toggle-on"></i>');
jinsom_set_cookie('space-style','bbs-post-space-on.css');
}else{
$(this).html('帖子间隔<i class="fa fa-toggle-off"></i>');
jinsom_set_cookie('space-style','bbs-post-space-off.css');
}
});


//偏好设置-换背景图
$('.jinsom-preference-list').on('click','li',function(){
$(this).addClass('on').siblings().removeClass('on');
bg=$(this).attr('bg');
if(bg=='default'){
DelCookie('preference-bg');
$('#jinsom-bg-style').attr('href','');
}else{
jinsom_set_cookie('preference-bg',bg);
}
});



//头部通知栏 tab切换
$('.jinsom-notice-title').children().click(function(e){
e.stopPropagation();
$(this).siblings().removeClass('on');
$(this).addClass('on').children('.tip').remove();
num=$(this).index();
$(this).parent().next().children().hide();
$(this).parent().next().children().eq(num).show();
});
$('.jinsom-notice').on('click','a',function(e){//阻止冒泡
e.stopPropagation();
});

//复制侧栏分享链接
var clipboard = new ClipboardJS('#jinsom-copy-share-link');
clipboard.on('success', function(e) {
e.clearSelection();
$('#jinsom-copy-share-link').append('<g>复制成功！</g>');
function d(){$('#jinsom-copy-share-link').children('g').remove()}
setTimeout(d,1000);
});







});


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


