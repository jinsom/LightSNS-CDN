var jinsom_user_chat_ajax = null,jinsom_user_chat_group_ajax = null; 

//点击发送消息-单对单
function jinsom_send_msg(author_id){
content= $('#jinsom-msg-content').val();
if($.trim(content)==''){
$('#jinsom-msg-content').val('');
return false;  
}
$('.jinsom-chat-list').append('<li class="myself"><div class="jinsom-chat-message-list-user-info">'+jinsom.avatar+'</div><div class="jinsom-chat-message-list-content">'+content+'</div></li>');
$('#jinsom-msg-content').val('');
$('.jinsom-chat-list-content').scrollTop($('.jinsom-chat-list-content')[0].scrollHeight);

$('.messagebar.messagebar-init').css('height','12vw');
$('#jinsom-msg-content').css('height','11vw');
$('.jinsom-msg-tips').hide();

$.ajax({
type: "POST",
url:jinsom.module_url+"/chat/msg.php",
data: {author_id:author_id,content:content},
success: function(msg){
if(msg.code==0){
$('.jinsom-chat-list .myself').last().children('.jinsom-chat-message-list-content').prepend('<i class="jinsom-icon jinsom-shibai error"></i>');
$('.jinsom-chat-list').append('<p class="jinsom-chat-message-tips error"><span>'+msg.msg+'</span></p>');
$('.jinsom-chat-list-content').scrollTop($('.jinsom-chat-list-content')[0].scrollHeight);

}
}
});

}


//单对单 长轮询
function jinsom_ajax_get_messages(author_id){
count=$('.jinsom-chat-list').attr('count');
jinsom_user_chat_ajax = $.ajax({
type: "POST",
url:jinsom.module_url+"/chat/message-list-ajax.php",
timeout:30000,
dataType: 'json',
data: {user_id:author_id,count:count},
success: function(msg){
if(msg.code==1){
jinsom_ajax_get_messages(author_id);	
}else if(msg.code==2){
$('.jinsom-chat-list').append(msg.msg);	
$('.jinsom-chat-list').attr('count',msg.count);

if(msg.msg!=''){
$('.jinsom-msg-tips').show().html('消息');
}

jinsom_ajax_get_messages(author_id);
}else if(msg.code==3){
}else if(msg.code==5){
$('.jinsom-chat-list').attr('count',msg.count);
jinsom_ajax_get_messages(author_id); 
}else{
jinsom_ajax_get_messages(author_id);	
}
},
error:function(XMLHttpRequest,textStatus,errorThrown){ 
if(textStatus=="timeout"){ 
jinsom_ajax_get_messages(author_id);
} 
} 
});
}

//终止单对单ajax长轮询
function jinsom_stop_user_Ajax(){   
if(jinsom_user_chat_ajax) {jinsom_user_chat_ajax.abort();}  
}  


//打开单对单聊天
function jinsom_open_user_chat(author_id,obj){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
if($(obj).find('.badge').length>0){
all_notice=parseInt($('.jinsom-footer-toolbar .tips').html());
current_notice=parseInt($(obj).find('.badge').html());
number=all_notice-current_notice;
if(number){//如果还有未读消息
$('.jinsom-xiaoxizhongxin .badge').html(number);	
}else{
$('.jinsom-xiaoxizhongxin .badge').remove();
}
}
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/chat-one.php?author_id='+author_id});
}

//打开群聊
function jinsom_open_group_chat(bbs_id){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/chat-group.php?bbs_id='+bbs_id});
}





//点击发送消息-群聊
function jinsom_send_msg_group(bbs_id){
content= $('#jinsom-msg-group-content').val();
if($.trim(content)==''){
$('#jinsom-msg-group-content').val('');
return false;  
}
$('.jinsom-chat-group-list').append('<li class="myself"><div class="jinsom-chat-message-list-user-info">'+jinsom.avatar+'</div><div class="jinsom-chat-message-list-content">'+content+'</div></li>');
$('#jinsom-msg-group-content').val('');
$('.jinsom-chat-group-list-content').scrollTop($('.jinsom-chat-group-list-content')[0].scrollHeight);

$('.messagebar.messagebar-init').css('height','12vw');
$('#jinsom-msg-group-content').css('height','11vw');
$('.jinsom-msg-tips').hide();

$.ajax({
type: "POST",
url:jinsom.module_url+"/chat/msg-group.php",
data: {bbs_id:bbs_id,content:content},
success: function(msg){
if(msg.code==0){
$('.jinsom-chat-group-list .myself').last().children('.jinsom-chat-message-list-content').prepend('<i class="jinsom-icon jinsom-shibai error"></i>');
$('.jinsom-chat-group-list').append('<p class="jinsom-chat-message-tips error"><span>'+msg.msg+'</span></p>');
$('.jinsom-chat-group-list-content').scrollTop($('.jinsom-chat-group-list-content')[0].scrollHeight);
}

}
});

}



//群组聊天长轮询
function jinsom_ajax_get_messages_group(bbs_id){
count=$('.jinsom-chat-group-list').attr('count');
jinsom_user_chat_group_ajax = $.ajax({
type: "POST",
url:jinsom.theme_url+"/mobile/module/chat/message-group-list-ajax.php",
timeout:30000,
dataType: 'json',
data: {bbs_id:bbs_id,count:count},
success: function(msg){
if(msg.code==2){//有新消息
$('.jinsom-chat-group-list').append(msg.msg);	
$('.jinsom-chat-group-list').attr('count',msg.count);
jinsom_ajax_get_messages_group(bbs_id);

if(msg.msg!=''){
$('.jinsom-msg-tips').show().html('消息');
}


}else if(msg.code==9){//超时
jinsom_ajax_get_messages_group(bbs_id);	
}
},
error:function(XMLHttpRequest,textStatus,errorThrown){ 
if(textStatus=="timeout"){ 
jinsom_ajax_get_messages_group(bbs_id);
} 
} 
});	
}


//终止群组ajax长轮询
function jinsom_stop_group_Ajax(){   
if(jinsom_user_chat_group_ajax) {jinsom_user_chat_group_ajax.abort();}  
}  
