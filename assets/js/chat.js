//===================================IM聊天相关的js==================

//长轮询
var jinsom_user_chat_ajax = null,jinsom_user_chat_group_ajax = null; 



//打开单人聊天模式
function jinsom_open_user_chat(user_id,obj){
if(!jinsom.is_login){
jinsom_pop_login_style();	
return false;
}

$('.jinsom-group-user-info').remove();//资料卡片打开IM聊天
if($('.jinsom-chat-windows-loading').length>0){
return false;
}
$(obj).children('.jinsom-chat-list-tips').remove();//移除提醒

$.ajax({
type: "POST",
url:jinsom.module_url+"/chat/chat-info.php",
data: {author_id:user_id,type:'one'},
success: function(msg){
if(msg.code==1){
count=msg.count;
status=msg.status;	
name=msg.nickname;
desc=msg.desc;
avatar=msg.avatar;


if($('.jinsom-chat-user-window').length==0){
layer.open({
type:1,
anim: 5,
skin: 'jinsom-chat-user-window',
area: ['600px', '540px'],
title: ' ',
shade: 0,
maxmin: true,
// zIndex: layer.zIndex,
resizing: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
$('.jinsom-chat-message-list').css('height',content_height);
},
full: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
$('.jinsom-chat-message-list').css('height',content_height);	
},
restore: function(layero){
$('.jinsom-chat-user-window').css({"top":"50px","bottom":"0","height":540});
$('.jinsom-chat-message-list').css('height',250);

},
end: function(layero){
jinsom_stop_user_Ajax();//关闭窗口时，终止前一个ajax；
},
content: 
'<div class="jinsom-chat-message-list" data-no-instant></div>'+
'<div class="jinsom-chat-windows-footer">'+
'<div class="jinsom-chat-windows-footer-bar one clear">'+
'<span onclick="jinsom_im_smile(this,5)" class="jinsom-icon smile jinsom-weixiao-"></span>'+
'<span class="image jinsom-icon jinsom-tupian1"></span>'+
'<span class="notice jinsom-icon jinsom-tongzhi1"></span>'+
'</div>'+
'<textarea class="jinsom-chat-textarea"></textarea>'+
'<div class="jinsom-chat-windows-footer-send clear">'+
'<div class="jinsom-chat-send-message-btn opacity" onclick="jinsom_send_msg()">发送</div></div></div>',

});  


}else{
jinsom_stop_user_Ajax();//打开另外一个聊天时，终止前一个ajax；
}


//==================渲染=========================
//上传图片
$('.jinsom-chat-windows-footer-bar.one .image').remove();//先移除原始模块
$('.jinsom-chat-windows-footer-bar.one .smile').after('<span class="image jinsom-icon jinsom-tupian1"></span>');//重新添加模块
jinsom_im_upload_one(user_id);

$('.jinsom-chat-user-window .jinsom-chat-windows-user-header').remove();
$('.jinsom-chat-user-window').append('<div class="jinsom-chat-windows-user-header" data="'+user_id+'" count="'+count+'"><div class="jinsom-chat-windows-user-avatar">'+avatar+'</div><div class="jinsom-chat-windows-user-info"><div class="jinsom-chat-windows-user-name">'+name+'</div><span class="jinsom-chat-online-status">'+status+'</span><div class="jinsom-chat-windows-user-desc">'+desc+'</div>	</div></div>');
$('.jinsom-chat-message-list').empty();
$('.jinsom-chat-message-list').append('<div class="jinsom-chat-windows-loading"></div>');

$.ajax({//获取聊天记录
type: "POST",
url:jinsom.module_url+"/chat/message-list.php",
data: {user_id:user_id},
success: function(msg){
$('.jinsom-chat-message-list').empty();
$('.jinsom-chat-message-list').append(msg); 
$('.jinsom-chat-message-list').scrollTop($('.jinsom-chat-message-list')[0].scrollHeight); 

//图片加载完毕执行
$(".jinsom-chat-message-list-content img").on('load',function(){
$('.jinsom-chat-message-list').scrollTop($('.jinsom-chat-message-list')[0].scrollHeight);
} );

jinsom_ajax_get_messages();//发起长轮询

}
});


}else{
layer.msg(msg.msg);
}
}
});//获取IM聊天信息


}


//单对单聊天长轮询
function jinsom_ajax_get_messages(){
count=$('.jinsom-chat-user-window .jinsom-chat-windows-user-header').attr('count');
user_id=$('.jinsom-chat-user-window .jinsom-chat-windows-user-header').attr('data');
jinsom_user_chat_ajax = $.ajax({
type: "POST",
url:jinsom.module_url+"/chat/message-list-ajax.php",
timeout:30000,
dataType: 'json',
data: {user_id:user_id,count:count},
success: function(msg){
if(msg.code==1){
// layer.msg('暂没有消息！');	
jinsom_ajax_get_messages();	
}else if(msg.code==2){
$('.jinsom-chat-message-list').append(msg.msg);	
audio = document.getElementById('jinsom-im-music');
audio.play();
$('.jinsom-chat-user-window .jinsom-chat-windows-user-header').attr('count',msg.count);
$('.jinsom-chat-content-recent-user').children('li[data-id="'+user_id+'"]').attr('data-count',msg.count);
$('.jinsom-chat-message-list').scrollTop($('.jinsom-chat-message-list')[0].scrollHeight);
jinsom_ajax_get_messages();
}else if(msg.code==3){//超时
}else if(msg.code==5){
$('.jinsom-chat-user-window .jinsom-chat-windows-user-header').attr('count',msg.count);
$('.jinsom-chat-content-recent-user').children('li[data-id="'+user_id+'"]').attr('data-count',msg.count);
jinsom_ajax_get_messages(); 
}else{
jinsom_ajax_get_messages();	
}
},
error:function(XMLHttpRequest,textStatus,errorThrown){ 
if(textStatus=="timeout"){ 
jinsom_ajax_get_messages();
} 
} 
});	
}

//终止单对单ajax长轮询
function jinsom_stop_user_Ajax(){   
if(jinsom_user_chat_ajax) {jinsom_user_chat_ajax.abort();}  
}  



//打开群组聊天模式
function jinsom_open_group_chat(bbs_id){
if(!jinsom.is_login){
jinsom_pop_login_style();	
return false;
}
	
if($('.jinsom-chat-windows-group-loading').length>0){
return false;
}


$.ajax({
type: "POST",
url:jinsom.module_url+"/chat/chat-info.php",
data: {bbs_id:bbs_id,type:'group'},
success: function(msg){
if(msg.code==1){
notice=msg.notice;
name=msg.name;
desc=msg.desc;
avatar=msg.avatar;
number=msg.number;


if($('.jinsom-chat-group-window').length==0){
layer.open({
type:1,
anim: 5,
skin: 'jinsom-chat-group-window',
area: ['750px', '540px'],
title: ' ',
shade: 0,
maxmin: true,
resizing: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
right_height=459+add_height;
$('.jinsom-chat-windows-right').css('height',right_height);
$('.jinsom-chat-message-group-list').css('height',content_height);
},
full: function(layero){
chat_window_height=layero.height();
add_height=chat_window_height-540;
content_height=250+add_height;
right_height=459+add_height;
$('.jinsom-chat-windows-right').css('height',right_height);
$('.jinsom-chat-message-group-list').css('height',content_height);	
},
restore: function(layero){
$('.jinsom-chat-group-window').css({"top":"50px","bottom":"0","height":540});
$('.jinsom-chat-message-group-list').css('height',250);
$('.jinsom-chat-windows-right').css('height',459);
},
end: function(layero){
jinsom_stop_group_Ajax();//关闭窗口时，终止前一个ajax；
},
//<span class="bag jinsom-icon jinsom-hongbao3" onclick="jinsom_test()"></span>\
//<span class="touzi jinsom-icon jinsom-dice" onclick="jinsom_test()"></span>\
content: '\
<div class="jinsom-chat-windows-left">\
<div class="jinsom-chat-message-group-list" data-no-instant></div>\
<div class="jinsom-chat-windows-footer">\
<div class="jinsom-chat-windows-footer-bar group clear">\
<span onclick="jinsom_im_smile(this,5)" class="jinsom-icon smile jinsom-weixiao-"></span>\
<span class="image jinsom-icon jinsom-tupian1"></span>\
<span class="jinsom-upload-group-img-loading"></span>\
</div>\
<textarea class="jinsom-chat-textarea-group"></textarea>\
<div class="jinsom-chat-windows-footer-send clear">\
<div class="jinsom-chat-send-message-btn-group opacity" onclick="jinsom_send_group_msg()">发送</div>\
</div></div></div>\
<div class="jinsom-chat-windows-right">\
<div class="jinsom-chat-group-notice">\
<div class="jinsom-chat-group-notice-title">群公告</div>\
<div class="jinsom-chat-group-notice-desc"></div>\
</div>\
<div class="jinsom-chat-group-user">\
<div class="jinsom-chat-group-user-number">群成员 <span></span></div>\
<div class="jinsom-chat-group-user-list"></div>\
</div></div>'
});  

}else{
jinsom_stop_group_Ajax();//打开另外一个群组时，终止前一个ajax；
}





//上传图片
$('.jinsom-chat-windows-footer-bar.group .image').remove();//先移除原始模块
$('.jinsom-chat-windows-footer-bar.group .smile').after('<span class="image jinsom-icon jinsom-tupian1"></span>');//重新添加模块
jinsom_im_upload_group(bbs_id);



$('.jinsom-chat-group-window .jinsom-chat-windows-user-header').remove();
$('.jinsom-chat-group-window').append('<div class="jinsom-chat-windows-user-header" bbs-id="'+bbs_id+'"><div class="jinsom-chat-windows-user-avatar">'+avatar+'</div><div class="jinsom-chat-windows-user-info"><div class="jinsom-chat-windows-user-name">'+name+'</div><div class="jinsom-chat-windows-user-desc">'+desc+'</div>	</div></div>');
$('.jinsom-chat-group-notice-desc').html(notice);
$('.jinsom-chat-group-user-number span').html('（'+number+'人）');
$('.jinsom-chat-message-group-list').empty();//群组记录
$('.jinsom-chat-group-user-list').empty();//群组成员
$('.jinsom-chat-message-group-list').append('<div class="jinsom-chat-windows-group-loading"></div>');
$('.jinsom-chat-group-user-list').append('<div class="jinsom-chat-group-user-list-loading"></div>');
$('#jinsom-upload-group-bbs-id').val(bbs_id);

//获取群组消息
$.ajax({
type: "POST",
url:jinsom.module_url+"/chat/message-group-list.php",
data: {bbs_id:bbs_id},
dataType: 'json',
success: function(msg){
$('.jinsom-chat-group-window .jinsom-chat-windows-user-header').attr('count',msg.count);
$('.jinsom-chat-message-group-list').empty();
$('.jinsom-chat-message-group-list').append(msg.msg); 
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);

//图片加载完毕执行
$(".jinsom-chat-message-list-content img").on('load',function(){
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);
} );

jinsom_ajax_get_messages_group();//发起长轮询


}
});

//获取群组侧栏成员
$.ajax({
type: "POST",
url:jinsom.module_url+"/chat/group-user-list.php",
data: {bbs_id:bbs_id},
success: function(msg){
$('.jinsom-chat-group-user-list').empty();
$('.jinsom-chat-group-user-list').append(msg); 
}
});


}else{
layer.msg(msg.msg);
}
}
});//获取群聊信息


}


//群组聊天长轮询
function jinsom_ajax_get_messages_group(){
count=$('.jinsom-chat-group-window .jinsom-chat-windows-user-header').attr('count');
bbs_id=$('.jinsom-chat-group-window .jinsom-chat-windows-user-header').attr('bbs-id');
jinsom_user_chat_group_ajax = $.ajax({
type: "POST",
url:jinsom.module_url+"/chat/message-group-list-ajax.php",
timeout:30000,
dataType: 'json',
data: {bbs_id:bbs_id,count:count},
success: function(msg){
if(msg.code==1){
// layer.msg('暂没有消息！');	
jinsom_ajax_get_messages_group();	
}else if(msg.code==2){
$('.jinsom-chat-message-group-list').append(msg.msg);	
// audio = document.getElementById('audio');
// audio.play();
$('.jinsom-chat-group-window .jinsom-chat-windows-user-header').attr('count',msg.count);
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);
function c(){
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);
}
setTimeout(c,300);
jinsom_ajax_get_messages_group();
}else if(msg.code==3){//不存在参数
}else{
jinsom_ajax_get_messages_group();	
}
},
error:function(XMLHttpRequest,textStatus,errorThrown){ 
if(textStatus=="timeout"){ 
jinsom_ajax_get_messages_group();
} 
} 
});	
}

//终止群组ajax长轮询
function jinsom_stop_group_Ajax(){   
if(jinsom_user_chat_group_ajax) {jinsom_user_chat_group_ajax.abort();}  
}  



//群聊显示用户资料卡片
function jinsom_chat_group_show_user_info(author_id,obj){
this_dom=obj;
if($('.jinsom-group-user-info').length==0){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.module_url+"/stencil/info-card.php",
data: {author_id:author_id},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:false,
type:1,
zIndex: 9999999999,
area: ['375px', '265px'],
shade: 0,
skin: 'jinsom-group-user-info',
move: '.jinsom-info-card-bg',
content: msg
}); 
}
});	
}else{
layer.closeAll('loading');
layer.msg('请关闭另外一个资料卡');
return false;	
}
}


//加入群聊
function jinsom_join_group_chat(bbs_id,obj){
if(jinsom.is_black){
layer.msg('你是黑名单用户，禁止互动操作！');	
return false;
}
this_dom=obj;
$(this_dom).html('<i class="fa fa-spinner fa-spin"></i> 进入中...');
$.ajax({
type: "POST",
url:jinsom.module_url+"/jinsom-join-group-chat.php",
data: {bbs_id:bbs_id},
success: function(msg){
$(this_dom).html('加入群聊');
if(msg==1){
jinsom_open_group_chat(bbs_id);
}else if(msg==2){
layer.msg('请先关注论坛才可以加入群聊！');	
}else if(msg==3){
jinsom_pop_login_style();
}
}
});	
}


//发送聊天消息
function jinsom_send_msg(){
author_id=$('.jinsom-chat-user-window .jinsom-chat-windows-user-header').attr('data');
content= $('.jinsom-chat-textarea').val();
if($.trim(content)==''){
layer.msg('请输入内容！');
return false;  
}
content_a=content.replace(/\[s\-(\d+)\]/g,'<img src="'+jinsom.smile_url+'$1.png" class="wp-smiley">');
$('.jinsom-chat-message-list').append('<li class="myself"><div class="jinsom-chat-message-list-user-info">'+jinsom.avatar+'</div><div class="jinsom-chat-message-list-content">'+content_a+'</div></li>');
$('.jinsom-chat-textarea').val('');
$('.jinsom-chat-message-list').scrollTop($('.jinsom-chat-message-list')[0].scrollHeight);
$.ajax({
type: "POST",
url:jinsom.module_url+"/chat/msg.php",
data: {author_id:author_id,content:content},
success: function(msg){
if(msg.code==0){
$('.jinsom-chat-message-list .myself').last().children('.jinsom-chat-message-list-content').prepend('<i class="jinsom-icon error jinsom-shibai" title="'+msg.msg+'"></i>');
$('.jinsom-chat-message-list').append('<p class="jinsom-chat-message-list-join error"><span>'+msg.msg+'</span></p>');
$('.jinsom-chat-message-list').scrollTop($('.jinsom-chat-message-list')[0].scrollHeight);
}
}
});
}


//发送群聊消息
function jinsom_send_group_msg(){
bbs_id=$('.jinsom-chat-group-window .jinsom-chat-windows-user-header').attr('bbs-id');
content= $('.jinsom-chat-textarea-group').val();
if($.trim(content)==''){
layer.msg('请输入内容！');
return false;  
}
content_a=content.replace(/\[s\-(\d+)\]/g,'<img src="'+jinsom.smile_url+'$1.png" class="wp-smiley">');
$('.jinsom-chat-message-group-list').append('<li class="myself"><div class="jinsom-chat-message-list-user-info">'+jinsom.avatar+'</div><div class="jinsom-chat-message-list-content">'+content_a+'</div></li>');
$('.jinsom-chat-textarea-group').val('');
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);
$.ajax({
type: "POST",
url:jinsom.module_url+"/chat/msg-group.php",
data: {bbs_id:bbs_id,content:content},
success: function(msg){
if(msg.code==0){
$('.jinsom-chat-message-group-list .myself').last().children('.jinsom-chat-message-list-content').prepend('<i class="jinsom-icon error jinsom-shibai" title="'+msg.msg+'"></i>');
$('.jinsom-chat-message-group-list').append('<p class="jinsom-chat-message-list-join error"><span>'+msg.msg+'</span></p>');
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);
}	
}
});	
}


// IM发送图片==单对单
function jinsom_im_upload_one(author_id){
layui.use(['upload'], function(){
var upload = layui.upload;
upload.render({
elem: '.jinsom-chat-windows-footer-bar.one .image',
url:jinsom.jinsom_ajax_url+'/upload/im-one.php',
data:{author_id:author_id},
multiple:true,
accept:'file',
before: function(obj){
layer.load(1);
},
done: function(res, index, upload){
layer.closeAll('loading');
if(res.code == 1){
$('.jinsom-chat-message-list').append('<li class="myself"><div class="jinsom-chat-message-list-user-info">'+jinsom.avatar+'</div><div class="jinsom-chat-message-list-content">'+res.img+'</div></li>');
$('.jinsom-chat-message-list').scrollTop($('.jinsom-chat-message-list')[0].scrollHeight);
//图片加载完毕执行
$(".jinsom-chat-message-list-content img").on('load',function(){
$('.jinsom-chat-message-list').scrollTop($('.jinsom-chat-message-list')[0].scrollHeight);
});
}else{
layer.msg(res.msg);	
}
},
error: function(index, upload){
layer.msg('上传失败！');
layer.closeAll('loading');
}
});
});
}

// IM发送图片==群组
function jinsom_im_upload_group(bbs_id){
layui.use(['upload'], function(){
var upload = layui.upload;
upload.render({
elem: '.jinsom-chat-windows-footer-bar.group .image',
url:jinsom.jinsom_ajax_url+'/upload/im-group.php',
data:{bbs_id:bbs_id},
multiple:true,
accept:'file',
before: function(obj){
layer.load(1);
},
done: function(res, index, upload){
layer.closeAll('loading');
if(res.code == 1){
$('.jinsom-chat-message-group-list').append('<li class="myself"><div class="jinsom-chat-message-list-user-info">'+jinsom.avatar+'</div><div class="jinsom-chat-message-list-content">'+res.img+'</div></li>');
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);
//图片加载完毕执行
$(".jinsom-chat-message-list-content img").on('load',function(){
$('.jinsom-chat-message-group-list').scrollTop($('.jinsom-chat-message-group-list')[0].scrollHeight);
});
}else{
layer.msg(res.msg);	
}
},
error: function(index, upload){
layer.msg('上传失败！');
layer.closeAll('loading');
}
});
});
}