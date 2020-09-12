var myApp=new LightSNS({
tapHold:false,
scrollTopOnNavbarClick:true,//返回顶部
swipeBackPage:false,
cache:false,
// pushState:true,
sortable:true,
ajaxLinks:'a.link',
modalTitle:'',
modalButtonOk:'确定',
modalButtonCancel:'取消',
onAjaxStart: function (xhr) {
myApp.showIndicator();
},
onAjaxComplete: function (xhr) {
myApp.hideIndicator();
}
});
// var $$=Jinsom;

mobile_page=$.parseJSON(jinsom.mobile_page);//获取移动端开启的页面类型
if(mobile_page){
if(mobile_page.sns){view_sns=myApp.addView('#jinsom-view-sns',{dynamicNavbar:true,domCache:true});}
if(mobile_page.notice){view_notice=myApp.addView('#jinsom-view-notice',{dynamicNavbar:true,domCache:true});}
if(mobile_page.find){view_find=myApp.addView('#jinsom-view-find',{dynamicNavbar:true,domCache:true});}
if(mobile_page.mine){view_mine=myApp.addView('#jinsom-view-mine',{dynamicNavbar:true,domCache:true});}
if(mobile_page.bbs){view_bbs=myApp.addView('#jinsom-view-bbs',{dynamicNavbar:true,domCache:true});}
if(mobile_page.video){view_video=myApp.addView('#jinsom-view-video',{dynamicNavbar:true,domCache:true});}
if(mobile_page.single){view_single=myApp.addView('#jinsom-view-single',{dynamicNavbar:true,domCache:true});}
if(mobile_page.custom_1){view_custom_1=myApp.addView('#jinsom-view-custom-1',{dynamicNavbar:true,domCache:true});}
if(mobile_page.custom_2){view_custom_2=myApp.addView('#jinsom-view-custom-2',{dynamicNavbar:true,domCache:true});}
if(mobile_page.custom_3){view_custom_3=myApp.addView('#jinsom-view-custom-3',{dynamicNavbar:true,domCache:true});}
}



//判断页面属性
if(jinsom.is_single){
window.history.pushState(null,null,'/');
if(jinsom.is_bbs_post){
function a(){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/post-bbs.php?post_id='+jinsom.post_id+'&bbs_id='+jinsom.bbs_id+'&url='+jinsom.post_url+'&type=bbs'});
}setTimeout(a,500);   
}else if(jinsom.post_reprint){
function b(){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/post-words.php?post_id='+jinsom.post_id+'&url='+jinsom.post_url});
}setTimeout(b,500);
}else if(jinsom.post_type){
function c(){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/post-'+jinsom.post_type+'.php?post_id='+jinsom.post_id+'&url='+jinsom.post_url});
}setTimeout(c,500);
}else{
function d(){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/post-words.php?post_id='+jinsom.post_id+'&url='+jinsom.post_url});
}setTimeout(d,500);
}
}

if(jinsom.is_page){
window.history.pushState(null,null,'/');
function e(){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/post-page.php?post_id='+jinsom.post_id+'&page_template='+jinsom.page_template+'&url='+jinsom.post_url});	
}setTimeout(e,500);	
}

if(jinsom.is_author){
window.history.pushState(null,null,'/');
if(jinsom.user_id==jinsom.author_id){
function f(){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/member-mine.php?author_id='+jinsom.author_id+'&url='+jinsom.author_url});
}setTimeout(f,500);
}else{
function g(){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/member-other.php?author_id='+jinsom.author_id+'&url='+jinsom.author_url});
}setTimeout(g,500);    
} 
}

if(jinsom.is_category){
window.history.pushState(null,null,'/');
function h(){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/bbs.php?bbs_id='+jinsom.bbs_id+'&url='+jinsom.bbs_url});
}setTimeout(h,500);	
}

if(jinsom.is_tag){
window.history.pushState(null,null,'/');
function i(){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/topic.php?topic_id='+jinsom.topic_id+'&url='+jinsom.topic_url});
}setTimeout(i,500);	
}

if(jinsom.is_search){
window.history.pushState(null,null,'/');
function j(){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/search.php?search_keywords='+jinsom.search_keywords});
}setTimeout(j,500);	
}




//强制登录
if(jinsom.login_on_off&&!jinsom.is_login){
myApp.loginScreen();
}



//sns首页
if(mobile_page.sns){
jinsom_index_sns_js_load();
}


//消息页面
if(mobile_page.notice){
jinsom_index_notice_js_load();
}


//视频专题加载更多事情
if(mobile_page.video){//如果开启专题页面
var video_loading = false;
var video_page = 2;
var video_list=$('.jinsom-video-special-list');
number=video_list.attr('number');
$('.jinsom-video-page-content.infinite-scroll').on('infinite',function(){
if (video_loading) return;
video_loading = true;
video_list.after(jinsom.loading_post);
topic=$('.jinsom-video-special-menu li.on').attr('data');
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/video-special.php",
data: {topic:topic,page:video_page,number:number,type:'more'},
success: function(msg){
if(msg==0){ 
video_loading = true; 
}else{
video_list.append(msg);
video_page++;
video_loading = false;  
}
$('.jinsom-load-post').remove();
}
});

}); 

}





//音乐播放器
player = document.querySelector('#jinsom-music-player');
progressBar = document.querySelector('.jinsom-player-progress .progress-bar'); // 进度条外层div
progress = document.querySelector('.jinsom-player-progress .progress');  // 进度条长度
progressBtn = document.querySelector('.jinsom-player-progress .progress-btn'); // 进度条拖动按钮
recordPic = document.querySelector('.record-pic');


$('.jinsom-player-record .record-bg').click(function() {
$('.jinsom-player-record').fadeOut(100);
});
$('.jinsom-player-lyrics').click(function() {
$('.jinsom-player-record').fadeIn(100);
});



//播放音乐
$('.jinsom-player-footer-btn .play').click(function() {
post_id=$(this).attr('post_id');
if(player.paused){
$('.jinsom-player-footer-btn .play i').removeClass('jinsom-bofang-').addClass('jinsom-zanting1');
$('.jinsom-music-voice-'+post_id).html('<i class="jinsom-icon jinsom-yuyin1 tiping"> </i> 播放中...');
$('.jinsom-pop-music-player').show();
player.play();
}else{
$('.jinsom-player-footer-btn .play i').removeClass('jinsom-zanting1').addClass('jinsom-bofang-');
$('.jinsom-music-voice-'+post_id).html('<i class="jinsom-icon jinsom-yuyin1"> </i> 点击播放');
$('.jinsom-music-voice.custom').html('<i class="jinsom-icon jinsom-yuyin1"> </i> 点击播放');
$('.jinsom-pop-music-player').hide();
player.pause();
}
});

//打开评论页面
$('.jinsom-player-footer-btn .comment').click(function() {
play_post_id=$('.jinsom-player-footer-btn .play').attr('post_id');
if(play_post_id){
myApp.closeModal('.jinsom-music-player');
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/comment-music-page.php?post_id='+play_post_id});	
}
});


var isLoading = false;
var progressTimer = setInterval(activeProgressBar,300);

// 激活进度条
function activeProgressBar(){
var percentNum = Math.floor((player.currentTime / player.duration) * 10000) / 100 + '%';
progress.style.width = percentNum;
progressBtn.style.left = percentNum;
if (percentNum == '100%') {
// isLoading = true;
player.play();
// jinsom_play_music();
}
if (player.paused && recordPic.className != 'record-pic'){
recordPic.className = 'record-pic';
return;
}else if (recordPic.className != 'record-pic rotate' && !player.paused) {
recordPic.className = 'record-pic rotate';
}

}

// 进度条操作音乐播放进度，绑定事件
progressBtn.addEventListener('touchstart', function () {
clearInterval(progressTimer);
});
progressBtn.addEventListener('touchmove', function (e) {
var percentNum = (e.targetTouches[0].pageX - progressBar.offsetLeft) / progressBar.offsetWidth;
if (percentNum > 1) {
percentNum = 1;
} else if (percentNum < 0) {
percentNum = 0;
}
this.style.left = percentNum * 100 + '%';
progress.style.width = percentNum * 100 + '%';
});
progressBtn.addEventListener('touchend', function (e) {
var percentNum = (e.changedTouches[0].pageX - progressBar.offsetLeft) / progressBar.offsetWidth;
player.currentTime = player.duration * percentNum;
progressTimer = setInterval(activeProgressBar, 300);
});


function jinsom_play_music(post_id,obj){
$('.jinsom-player-footer-btn .like,.jinsom-player-footer-btn .comment').show();
myApp.popup('.jinsom-music-player');//打开播放器
play_post_id=$('.jinsom-player-footer-btn .play').attr('post_id');//播放中的文章id
if(play_post_id==post_id&&!player.paused){//需要点击播放的文章id和正在播放的文章id一致
first=0;	
}else{
first=1;//需要点击播放的文章id和正在播放的文章id不一致，可能第一次打开播放器，也可能是切换音乐
}

//所有情况都先把播放语音条设置为正在播放中
$('.jinsom-music-voice-'+post_id).html('<i class="jinsom-icon jinsom-yuyin1 tiping"> </i> 播放中...');

if(first){//第一次打开播放器或者切换音乐
$('.jinsom-player-record,.jinsom-pop-music-player').show();//播放器界面重置为显示唱碟、右侧栏显示播放旋转小图标
player.play();player.pause();//兼容苹果无法自动播放

if(play_post_id&&player.paused&&play_post_id!=post_id){//切换别的音乐的时候
$('.jinsom-music-voice-'+play_post_id).html('<i class="jinsom-icon jinsom-yuyin1"> </i> 点击播放');//如果切换别的音乐，先将之前的音乐对应的语音条重置
}

}


//每次打开播放器都要请求ajax  用于同步喜欢数量和评论数量
$.ajax({
type: "POST",
url:  jinsom.mobile_ajax_url+"/post/music.php",
data: {post_id:post_id},
success: function(msg){

if(msg.is_like){//更新喜欢
$('.jinsom-player-footer-btn .like i').removeClass('jinsom-xihuan2').addClass('jinsom-shiliangzhinengduixiang31');	
}else{
$('.jinsom-player-footer-btn .like i').removeClass('jinsom-shiliangzhinengduixiang31').addClass('jinsom-xihuan2');		
}
$('.jinsom-player-footer-btn .comment m').html(msg.comment_number);//更新评论

if(first){//第一次打开播放器或者切换音乐
player.onplaying = null;  //  清除audio标签绑定的事件
player.src = msg.music_url;//同步音乐
player.play();//播放音乐
$('.jinsom-player-footer-btn .play i').removeClass('jinsom-bofang-').addClass('jinsom-zanting1');//改变播放图标
$('.jinsom-player-footer-btn .play').attr('post_id',post_id);//记录当前播放的文章id
$('.jinsom-player-lyrics').html(msg.content);//载入当前音乐所对应的内容
if(msg.title){//存在标题则写入标题
$('.jinsom-player-lyrics').prepend('<div class="title">'+msg.title+'</div>');	
}



}

}
});


}

//播放音乐===附件插入音乐
function jinsom_play_music_custom(url,obj){
$('.jinsom-player-footer-btn .like,.jinsom-player-footer-btn .comment').hide();
post_id=Math.round(Math.random()*100);
if($(obj).children('i').hasClass('tiping')){
$(obj).html('<i class="jinsom-icon jinsom-yuyin1"> </i> 点击播放');	
$('.jinsom-player-record,.jinsom-pop-music-player').hide();
player.pause();
}else{
$('.jinsom-music-voice.custom').html('<i class="jinsom-icon jinsom-yuyin1"> </i> 点击播放');
$(obj).html('<i class="jinsom-icon jinsom-yuyin1 tiping"> </i> 播放中...');	
player.onplaying = null;  //  清除audio标签绑定的事件
player.src = url;//同步音乐
player.play();//播放音乐
$('.jinsom-player-footer-btn .play i').removeClass('jinsom-bofang-').addClass('jinsom-zanting1');//改变播放图标
$('.jinsom-player-footer-btn .play').attr('post_id',post_id);//记录当前播放的文章id
$('.jinsom-player-record,.jinsom-pop-music-player').show();//播放器界面重置为显示唱碟、右侧栏显示播放旋转小图标
}

}



//路由


//手机返回监听
//var i=0
window.addEventListener("popstate", function(e){
// i++;
// console.log(i);
// e.defaultPrevented;
// console.log(e);

// if($('.modal-in').length>0){
// console.log(1);
layer.closeAll()//关闭半弹窗
myApp.closeModal();//关闭弹窗 
// history.forward();	
// history.go(1);
// }else{
// console.log(2);
$.fancybox.close();//关闭灯箱 
if($(' .fancybox-bg').length<=0){//不存在灯箱才返回
myApp.getCurrentView().router.back();
}	
// }


// return false;

}, false);

if(navigator.userAgent.indexOf("Html5Plus")<0){//非app环境
$("body").on("click",".back", function(e){
history.back();
console.log(3);
});
}

//history.pushState(null, null, document.URL);


document.addEventListener('plusready',function(){//APP环境
var webview = plus.webview.currentWebview();
plus.key.addEventListener('backbutton', function() {
webview.canBack(function(e) {
if($('.modal-overlay-visible').length>0||$('.login-screen.modal-in').length>0){//如果有弹窗，先关闭弹窗
myApp.closeModal('.login-screen');
myApp.closeModal();//关闭弹窗 
$('.popup-overlay').removeClass('class name')
}else if($('.fancybox-is-open').length>0){
$.fancybox.close();
}else{
if (e.canBack) {
webview.back();
}else{
main =  plus.android.runtimeMainActivity();
main && main.moveTaskToBack(false);  //后台
}
}

})
});

});



//补签
var $$_ = function(id) {
return "string" == typeof id ? document.getElementById(id) : id;
};
var Class = {
create: function() {
return function() {
this.initialize.apply(this, arguments);
}
}
}
Object.extend = function(destination, source) {
for(var property in source) {
destination[property] = source[property];
}
return destination;
}
var Calendar = Class.create();
Calendar.prototype = {
initialize: function(container, options) {
this.Container = $$_(container); //容器(table结构)
this.Days = []; //日期对象列表
this.SetOptions(options);
this.Year = this.options.Year;
this.Month = this.options.Month;
this.qdDay = this.options.qdDay;
this.Draw();
},
//设置默认属性
SetOptions: function(options) {
this.options = { //默认值
Year: new Date().getFullYear(), //显示年
Month: new Date().getMonth() + 1, //显示月
qdDay: null,
};
Object.extend(this.options, options || {});
},
//画日历
Draw: function() {
//签到日期
var day = this.qdDay;
//日期列表
var arr = [];
//用当月第一天在一周中的日期值作为当月离第一天的天数
for(var i = 1, firstDay = new Date(this.Year, this.Month - 1, 1).getDay(); i <= firstDay; i++) {
arr.push("&nbsp;");
}
//用当月最后一天在一个月中的日期值作为当月的天数
for(var i = 1, monthDay = new Date(this.Year, this.Month, 0).getDate(); i <= monthDay; i++) {
arr.push(i);
}
var frag = document.createDocumentFragment();
this.Days = [];
while(arr.length > 0) {
//每个星期插入一个tr
var row = document.createElement("tr");
//每个星期有7天
for(var i = 1; i <= 7; i++) {
var cell = document.createElement("td");

cell.innerHTML = "<span>&nbsp;</span>";
if(arr.length > 0) {
var d = arr.shift();
cell.innerHTML = "<span>" + d + "</span>";
if(d > 0 && day.length) {
cell.className = "no-sign";	
$(cell).attr('onclick','jinsom_sign_add_form('+d+')');
$(cell).attr('id','jinsom-sign-day-'+d);
a=0;
for(var ii = 0; ii < day.length; ii++) {
this.Days[d] = cell;
had_sign=this.IsSame(new Date(this.Year, this.Month - 1, d), day[ii]);//是否签到
if(had_sign) {
cell.className = "had-sign";
$(cell).children('span').html(d+'<i class="jinsom-icon jinsom-dagou"></i>');
a=1;
}
// console.log(1);

}

if(d <new Date().getDate()&&!a){
$(cell).addClass('no').children('span').html(d+'<m>补</m>');
}

if(d ==new Date().getDate()){
$(cell).addClass('today');
}

if(d >new Date().getDate()){
$(cell).addClass('in');
}




}
}
row.appendChild(cell);
}
frag.appendChild(row);
}
//先清空内容再插入(ie的table不能用innerHTML)
while(this.Container.hasChildNodes()) {
this.Container.removeChild(this.Container.firstChild);
}
this.Container.appendChild(frag);
},
//是否签到
IsSame: function(d1, d2) {
d2 = new Date(d2 * 1000);
return(d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate());
},
};