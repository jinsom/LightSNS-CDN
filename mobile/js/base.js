$(function(){

//论坛大厅 tab点击	
$('.jinsom-bbs-tab-post-header>li').click(function(event){
$(this).addClass('on').siblings().removeClass('on');
$(this).parent().next().children().eq($(this).index()).show().siblings().hide();
});


//首页sns点击切换
$('.jinsom-home-menu li').click(function(event){
if($(this).index()==0){
$('.jinsom-mobile-home-sns-top').show();
}else{
$('.jinsom-mobile-home-sns-top').hide();	
}
});















});