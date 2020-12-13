
//=========================================删除事件=================================


//一键清空所有提醒的消息
function jinsom_delete_notice(){
layer.confirm('你确定要清空所有的消息吗？', {
btnAlign: 'c',
btn: ['确定','取消'] 
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/delete/notice.php",
success: function(msg){ 
layer.closeAll('loading');
layer.msg(msg.msg);  
if(msg.code==1){
$('.jinsom-notice-content .a').html('<div class="jinsom-notice-empty">有关动态、帖子、系统的消息会显示在这里</div>');
$('.jinsom-notice-content .b').html('<div class="jinsom-notice-empty">有人关注你时会显示在这里</div>');
$('.jinsom-notice-content .c').html('<div class="jinsom-notice-empty">有人喜欢你动态/帖子时会显示在这里</div>');
$('.jinsom-notice-title span').remove();
}
}
});
}); 
}

//删除动态内容
function jinsom_delete_post(post_id,obj){
layer.confirm('你要删除这个内容吗？', {
btnAlign: 'c',
btn: ['确定','取消']
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/delete/post.php",
data: {post_id:post_id,type:'post'},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
if($('.jinsom-main-content').hasClass('single')){//如果在内容页面删除，直接返回首页
function d(){window.location.href='/';}setTimeout(d,2000);	
}else{
$(obj).parents('.jinsom-posts-list').fadeTo("slow",0.06, function(){
$(this).slideUp(0.06, function() {
$(this).remove();
});
});
}
}
}
});
});
}

//删除帖子内容
function jinsom_delete_bbs_post(post_id,bbs_id,obj){
layer.confirm('你要删除这个内容吗？',{
btnAlign: 'c',
btn: ['确定','取消']
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/delete/post.php",
data: {post_id:post_id,bbs_id:bbs_id,type:'bbs'},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
if($('.jinsom-main-content').hasClass('single')){//如果在内容页面删除，直接返回首页
function d(){window.location.href=msg.url;}setTimeout(d,2000);
}else{
$(obj).parents('.jinsom-posts-list').fadeTo("slow",0.06, function(){
$(this).slideUp(0.06, function() {
$(this).remove();
});
});
}
}
}
});
});
}


//删除动态评论
function jinsom_delete_post_comments(comment_id,obj){//我的评论页面
layer.confirm('确定要删除评论？', {
btnAlign: 'c',
btn: ['确定','取消'] //按钮
}, function(){
layer.load(1);
$.ajax({
type: "POST",
dataType:'json',
url:  jinsom.jinsom_ajax_url+"/delete/comment.php",
data: {comment_id:comment_id,type:'post'},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){//成功
comment_dom=$(obj).parent('.jinsom-comment-footer');
comment_dom.siblings('.jinsom-comment-image-list').remove();
comment_dom.siblings('.jinsom-comment-content').html(msg.delete_content);
$(obj).remove();
}
}
});
}); 
}

//删除一级帖子评论
function jinsom_delete_bbs_comments(comment_id,bbs_id,obj){
if($(obj).parents('.right').children('.answer-icon').length>0){
layer.msg('被采纳的回帖不能删除！');	
return false;
}
layer.confirm('确定要删除评论？', {
btnAlign: 'c',
btn: ['确定','取消'] //按钮
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/delete/comment.php",
data: {comment_id:comment_id,type:'bbs-post',bbs_id:bbs_id},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){//成功
$(obj).parents('.jinsom-bbs-single-box').fadeTo("slow",0.06, function(){
$(this).slideUp(0.06, function() {
$(this).remove();
});
});
}

}
});
}); 
}

//删除二级帖子评论
function jinsom_delete_bbs_comments_er(comment_id,bbs_id,obj){
layer.confirm('确定要删除评论？', {
btnAlign: 'c',
btn: ['确定','取消']
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/delete/comment.php",
data: {comment_id:comment_id,type:'bbs-post-floor',bbs_id:bbs_id},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
$(obj).parents('li').fadeTo("slow",0.06, function(){
$(this).slideUp(0.06, function() {
$(this).remove();
});
});
}

}
});
}); 
}