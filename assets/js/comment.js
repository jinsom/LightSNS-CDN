//===================================动态评论 、帖子回复（一级、二级）==================

//评论动态
function jinsom_comment_posts(post_id,obj,ticket,randstr){
content=$.trim($(obj).siblings('.jinsom-post-comments').val());
layer.load(1);
$.ajax({
type:"POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/comment.php",
data: {content:content,post_id:post_id,ticket:ticket,randstr:randstr},
success: function(msg) {
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){//成功
$(obj).siblings('.jinsom-post-comments').val('');
$(obj).parent('.jinsom-comment-textarea').next('.jinsom-post-comment-list').prepend('\
<li>\
<div class="jinsom-comment-avatar">'+jinsom.avatar+jinsom.verify+'</div>\
<div class="jinsom-comment-header">\
<span class="jinsom-comment-up" onclick="jinsom_single_comment_up('+msg.id+',this)">\
<i class="fa fa-thumbs-o-up"></i><m>0</m>\
</span>\
<div class="jinsom-comment-info">'+jinsom.nickname_link+jinsom.lv+jinsom.vip+jinsom.honor+'</div>\
<span class="jinsom-comment-time">1秒前</span><span class="jinsom-comment-from">来自 电脑端</span>\
</div>\
<div class="jinsom-comment-content">'+msg.content+'</div>\
<div class="jinsom-comment-footer"></div>\
</li>');   
}else if(msg.code==2){//没有绑定手机号
function d(){jinsom_update_phone_form(msg.user_id);}setTimeout(d,2000);
}
},
});
}


//回复帖子 一级回复
//type:回帖类型 1为一级回帖 2：为二级回帖
function jinsom_bbs_comment(post_id,bbs_id,ticket,randstr){
content =ue.getContent();
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/comment-bbs.php",
data: {content:content,post_id:post_id,bbs_id:bbs_id,type:1,ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){//成功
if($('.jinsom-tips').hasClass('jinsom-comment-can-see')){//回复可见的自动刷新
function d(){window.location.reload();}setTimeout(d,2000);
}else{
content = msg.content.replace(/\\/g,'');
$(".jinsom-bbs-comment-list").append('\
<div class="jinsom-bbs-single-box clear">\
<div class="left">\
<?php echo $landlord;?>\
<div class="avatar">\
'+jinsom.vip_icon+'\
'+jinsom.avatar+'\
'+jinsom.verify+'\
</div>\
<div class="name">'+jinsom.nickname_link+'</div>\
<div class="info">\
<div class="lv">'+jinsom.lv+'</div>\
<div class="vip">'+jinsom.vip+'</div>\
<div class="honor">'+jinsom.honor+'</div>\
</div>\
</div>\
<div class="right">\
<div class="jinsom-bbs-single-content">'+content+'</div>\
<div class="jinsom-bbs-single-footer"><span class="delete" onclick="jinsom_delete_bbs_comments('+msg.id+','+bbs_id+',this);">删除</span><span>1秒前</span><span>电脑端</span></div>\
</div>\
</div>');
}
ue.execCommand('cleardoc');
}else if(msg.code==2){//没有绑定手机号
function d(){jinsom_update_phone_form(msg.user_id);}setTimeout(d,2000);
}

}

});
}


//回复帖子 二级回复
function jinsom_bbs_comment_floor(comment_id,post_id,bbs_id,obj,ticket,randstr){
content =$(obj).siblings('.jinsom-post-comments').val();
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/comment-bbs.php",
data: {content:content,comment_id:comment_id,post_id:post_id,bbs_id:bbs_id,type:2,ticket:ticket,randstr:randstr},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){//成功
$(obj).siblings('.jinsom-bbs-comment-floor-list').append('\
<li class="clear">\
<div class="floor-left">\
'+jinsom.avatar+'\
'+jinsom.verify+'\
</div>\
<div class="floor-right">\
<div class="name">'+jinsom.nickname_link+'：<span class="content">'+msg.content+'</span></div>\
</div>\
<div class="bottom">\
<span>刚刚</span>\
<span>来自 电脑端</span>\
</div>\
</li>');
$(obj).siblings('.jinsom-post-comments').val('');
}else if(msg.code==2){//没有绑定手机号
function d(){jinsom_update_phone_form(msg.user_id);}setTimeout(d,2000);
}

}
});
}



//评论表单toggle
function jinsom_comment_toggle(boj){
$(boj).parent().siblings('.jinsom-comment-form').toggle();
}




//ajax 加载更多评论
function jinsom_ajax_comment(post_id,number,page){
bbs_id=$('.jinsom-bbs-single-header').attr('data');
$('.jinsom-bbs-comment-list').append(jinsom.loading);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/more/comment.php",
data: {page:page,post_id:post_id,number:number,bbs_id:bbs_id},
success: function(msg){   
if(msg==0){
layer.msg('没有更多内容！');
}else{
$('html,body').animate({scrollTop:$('.jinsom-single-topic-list').offset().top}, 800);
$('.jinsom-bbs-comment-list').html(msg);
$('.jinsom-post-comments').focus(function(){
$(this).css('height','85px');
});
}

}
});
}



//评论点赞
function jinsom_single_comment_up(comment_id,obj){
if(!jinsom.is_login){
jinsom_pop_login_style();	
return false;
}
if($(obj).hasClass('on')){
layer.msg('你已经点赞！');
}else{
number=parseInt($(obj).children('m').html())+1;	
$(obj).html('<i class="fa fa-thumbs-up"></i><m>'+number+'</m>');
$(obj).addClass('on');	
layer.msg('点赞成功！');	
$.ajax({
type: "POST",
url:jinsom.module_url+"/action/comment-up.php",
data: {comment_id:comment_id,type:2},//点赞
});

}
}