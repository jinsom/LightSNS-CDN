
//评论内容
function jinsom_comment(post_id,ticket,randstr){
content=$('#jinsom-comment-content-'+post_id).val();
img='';
img_html='';
if($('#jinsom-publish-images-list li').length>0){
$('#jinsom-publish-images-list li').each(function(){
img+=$(this).children('a').attr('href')+',';
img_html+='<a data-fancybox="gallery-new" href="'+$(this).children('a').attr('href')+'">'+$(this).children('a').html()+'</a>';
});
img=img.substr(0,img.length-1);
img_html='<div class="jinsom-comment-image-list clear">'+img_html+'</div>';
}

myApp.showIndicator();
$.ajax({
type:"POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/comment.php",
data: {content:content,post_id:post_id,ticket:ticket,randstr:randstr,img:img},
success: function(msg){
myApp.hideIndicator();
comment_list=$('.jinsom-single-comment-list-'+post_id);


if(msg.code==1){//成功
$('#jinsom-comment-content-'+post_id).val('');//清空内容
history.back(-1);
function c(){layer.open({content:msg.msg,skin:'msg',time:2});}setTimeout(c,300);

if(comment_list.children('.jinsom-empty-page').length>0){
comment_list.html('');    
}

comment_num=$('.jinsom-post-'+post_id+' .footer .comment_number');
comment_num.html(parseInt(comment_num.html())+1); 
$('.jinsom-post-'+post_id).next('.jinsom-single-comment').children('.header').find('span').html(parseInt(comment_num.html()));
$('.jinsom-post-'+post_id).parent().prev().find('.number').html(parseInt(comment_num.html())+'条评论');

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
<div class="content">'+msg.content+'</div>\
'+img_html+'\
<div class="footer">\
<span class="time">刚刚</span>\
<span class="comment">\
<a href="'+jinsom.theme_url+'/mobile/templates/page/comment.php?post_id='+post_id+'&name='+jinsom.nickname_base+'" class="link"></a>\
</span>\
<span class="delete" onclick="jinsom_delete_post_comments('+msg.id+',this)"></span>\
</div>\
</div>\
');
jinsom_lightbox();

}else if(msg.code==2){//没有绑定手机号
layer.open({content:msg.msg,skin:'msg',time:2});
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/setting/setting-phone.php'});
}else{
layer.open({content:msg.msg,skin:'msg',time:2});
}
}
}); 
}


//回复帖子 一级
function jinsom_bbs_comment(post_id,bbs_id,ticket,randstr){
content=$('#jinsom-comment-content-'+post_id).val();
img='';
img_html='';
if($('#jinsom-publish-images-list li').length>0){
$('#jinsom-publish-images-list li').each(function(){
img+=$(this).children('a').attr('href')+',';
img_html+='<a data-fancybox="gallery-new" href="'+$(this).children('a').attr('href')+'">'+$(this).children('a').html()+'</a>';
});
img=img.substr(0,img.length-1);
img_html='<div class="jinsom-comment-image-list clear">'+img_html+'</div>';
}


myApp.showIndicator();
$.ajax({
type:"POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/comment-bbs.php",
data: {content:content,post_id:post_id,bbs_id:bbs_id,type:1,ticket:ticket,randstr:randstr,img:img},
success: function(msg){
myApp.hideIndicator();
comment_list=$('.jinsom-single-comment-list-'+post_id);



if(msg.code==1){//成功

$('#jinsom-comment-content-'+post_id).val('');
history.back(-1);
function c(){layer.open({content:msg.msg,skin:'msg',time:2});}setTimeout(c,300);
if(comment_list.children('.jinsom-empty-page').length>0){
comment_list.html('');    
}

comment_num=$('.jinsom-post-'+post_id+' .footer .comment_number');
comment_num.html(parseInt(comment_num.html())+1); 
$('.jinsom-post-'+post_id).next('.jinsom-single-comment').children('.header').find('span').html(parseInt(comment_num.html()));
$('.jinsom-post-'+post_id).parent().prev().find('.number').html(parseInt(comment_num.html())+'条回帖');

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
<div class="content">'+msg.content+'</div>\
'+img_html+'\
<div class="footer">\
<span class="time">刚刚</span>\
<span class="comment">\
<a href="'+jinsom.theme_url+'/mobile/templates/page/comment-child-page.php?post_id='+post_id+'&comment_id='+msg.id+'&bbs_id='+bbs_id+'" class="link"><m></m></a>\
</span>\
</div>\
</div>\
');
jinsom_lightbox()

if($('.jinsom-tips-'+post_id).hasClass('jinsom-comment-can-see')){//回复可见

//将列表也同步状态
$.ajax({
type: "POST",
url:jinsom.mobile_ajax_url+"/post/hide-content.php",
data: {post_id:post_id,type:'comment'},
success: function(msg){
$('.jinsom-tips-'+post_id).removeClass('jinsom-tips').addClass('jinsom-hide-content').html(msg.content);
}
});


}

}else if(msg.code==2){//没有绑定手机号
layer.open({content:msg.msg,skin:'msg',time:2});
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/setting/setting-phone.php'});
}else{
layer.open({content:msg.msg,skin:'msg',time:2});
}
}
}); 
}


//回复帖子 二级
function jinsom_bbs_comment_floor(comment_id,post_id,bbs_id,ticket,randstr){
content=$('#jinsom-comment-content-'+post_id).val();
myApp.showIndicator();
$.ajax({
type:"POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/comment-bbs.php",
data: {content:content,comment_id:comment_id,post_id:post_id,bbs_id:bbs_id,type:2,ticket:ticket,randstr:randstr},
success: function(msg){
myApp.hideIndicator();
comment_list=$('.jinsom-single-comment-list-'+post_id+'-'+comment_id);


if(msg.code==1){//成功

$('#jinsom-comment-content-'+post_id).val('');
history.back(-1);
function c(){layer.open({content:msg.msg,skin:'msg',time:2});}setTimeout(c,300);

if(comment_list.children('.jinsom-empty-page').length>0){
comment_list.html('');    
}


//后渲染
comment_num=$('.jinsom-comment-'+comment_id+' .footer .comment m');
old_comment_num=comment_num.text();
if(old_comment_num==''){comment_number=1;}else{comment_number=parseInt(old_comment_num)+1;}
comment_num.html(comment_number); 
$('.jinsom-comment-'+comment_id+' .footer .comment').addClass('on');
$('.jinsom-comment-'+comment_id).parents('#jinsom-comment-child-page').prev().find('.number').html(comment_number+'条回复');



comment_list.append('\
<div class="jinsom-comment-'+msg.id+'">\
<div class="up" onclick="jinsom_comment_up('+msg.id+',this)"><i class="fa fa-thumbs-o-up"></i><m>0</m></div>\
<div class="header clear">\
<div class="avatarimg">'+jinsom.avatar+jinsom.verify+'</div>\
<div class="info">\
<div class="name">'+jinsom.nickname+jinsom.lv+jinsom.vip+'</div>\
<div class="from"><span>手机端</span></div>\
</div>\
</div>\
<div class="content">'+msg.content+'</div>\
<div class="footer">\
<span class="time">刚刚</span>\
<span class="comment">\
<a href="'+jinsom.theme_url+'/mobile/templates/page/comment-bbs-floor.php?post_id='+post_id+'&comment_id='+comment_id+'&bbs_id='+bbs_id+'&name='+jinsom.nickname_base+'" class="link"></a>\
</span>\
</div>\
</div>\
');
// $('.page-on-left .page-content').animate({scrollTop:comment_list.offset().top},800);

}else if(msg.code==2){//没有绑定手机号
layer.open({content:msg.msg,skin:'msg',time:2});
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/setting/setting-phone.php'});
}else{
layer.open({content:msg.msg,skin:'msg',time:2});
}
}
}); 
}



//评论点赞
function jinsom_comment_up(comment_id,obj){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
comment_dom=$('.jinsom-comment-'+comment_id+' .up');
if($(obj).hasClass('on')){
layer.open({content:'你已经赞过了！',skin:'msg',time:2});
}else{
number=parseInt(comment_dom.children('m').html())+1; 
comment_dom.html('<i class="fa fa-thumbs-up"></i><m>'+number+'</m>').addClass('on');

$.ajax({
type: "POST",
url:jinsom.module_url+"/action/comment-up.php",
data: {comment_id:comment_id,type:2},//点赞
});
}

}