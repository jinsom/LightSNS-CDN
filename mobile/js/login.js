//登录
function jinsom_login(ticket,randstr){
username=$('#jinsom-pop-username').val();
password=$('#jinsom-pop-password').val();
myApp.showIndicator();
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/action/login.php",
data: {username:username,password:password,ticket:ticket,randstr:randstr},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function d(){window.location.reload();}setTimeout(d,2000);
}
}
});
}

//手机号登录
function jinsom_login_phone(ticket,randstr){
phone=$('.jinsom-login-phone .phone input').val();
code=$('.jinsom-login-phone .code input').val();
myApp.showIndicator();
$.ajax({
type: "POST",
url:  jinsom.jinsom_ajax_url+"/action/login.php",
data: {phone:phone,code:code,ticket:ticket,randstr:randstr},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function d(){window.location.reload();}setTimeout(d,2000);
}
}
});
}

//退出登录
function jinsom_login_out(){
layer.open({
content: '你确定要退出本帐号吗？'
,btn: ['确定', '取消']
,yes: function(index){
layer.open({content:'已退出，欢迎下次回来！',skin:'msg',time:2});
function d(){window.location.reload();}setTimeout(d,2000);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/update/profile.php",
data: {login_out:1},
});
}
});
}




//获取验证码（手机注册、邮箱注册、修改手机号、修改邮箱）
function jinsom_get_code(t,type,ticket,randstr){
if(type=='phone'){
phone=$('.jinsom-reg-phone .phone input').val();
if(phone==''){layer.open({content:'手机号不能为空！',skin:'msg',time:2});return false;}
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/get-code.php",
data: {phone:phone,type:'reg-phone',ticket:ticket,randstr:randstr},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){//成功
$('.jinsom-get-code-'+type).attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_reg_update_time('"+type+"',"+i+","+t+")",i*1000);
}    
}
}
}); 
}else if(type=='email'){
mail=$('.jinsom-reg-mail .mail input').val();
if(mail==''){layer.open({content:'邮箱不能为空！',skin:'msg',time:2});return false;}
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/get-code.php",
data: {mail:mail,type:'reg-email',ticket:ticket,randstr:randstr},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){//成功
$('.jinsom-get-code-'+type).attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_reg_update_time('"+type+"',"+i+","+t+")",i*1000);
}    
}
}
}); 	
}else if(type=='pass-email'){
user_id=$('.jinsom-forget-password-email').attr('user_id');
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/get-code.php",
data: {user_id:user_id,type:'pass-email',ticket:ticket,randstr:randstr},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){//成功
$('.jinsom-get-code').attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_reg_update_time('"+type+"',"+i+","+t+")",i*1000);
}    
}
}
}); 	
}else if(type=='pass-phone'){//忘记密码-手机号
user_id=$('.jinsom-forget-password-phone').attr('user_id');
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/get-code.php",
data:{user_id:user_id,type:'pass-phone',ticket:ticket,randstr:randstr},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){//成功
$('.jinsom-get-code').attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_reg_update_time('"+type+"',"+i+","+t+")",i*1000);
}    
}
}
}); 	
}else if(type=='phone-login'){//手机号登录
phone=$('.jinsom-login-phone .phone input').val();
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/get-code.php",
data: {phone:phone,type:'phone-login',ticket:ticket,randstr:randstr},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){//成功
$('.jinsom-get-code').attr("disabled",true); 
for(i=1;i<=t;i++) {
window.setTimeout("jinsom_reg_update_time('"+type+"',"+i+","+t+")",i*1000);
}    
}
}
}); 	
}
}

//更新获取验证码的倒计时
function jinsom_reg_update_time(type,num,t){
if(num == t) {
$('.jinsom-get-code-'+type).val('获取验证码');
$('.jinsom-get-code-'+type).attr("disabled",false); 
$('.jinsom-get-code-'+type).removeClass('no');
}else {
printnr = t-num;
$('.jinsom-get-code-'+type).val('('+ printnr +')重新获取');
$('.jinsom-get-code-'+type).addClass('no');
}
}


//提交简单注册
function jinsom_pop_reg_simple(ticket,randstr){
username=$('.jinsom-reg-simple .name input').val();
password=$('.jinsom-reg-simple .pass input').val();
if(!$('.jinsom-reg-doc input').is(':checked')){layer.open({content:'请仔细阅读并勾选用户注册条款！',skin:'msg',time:2});return false;}
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/reg.php",
data: {username:username,password:password,type:'simple',ticket:ticket,randstr:randstr},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function a(){window.location.reload();}setTimeout(a,2000);  
}
}
}); 
}

//提交手机号注册
function jinsom_pop_reg_phone(ticket,randstr){
username=$('.jinsom-reg-phone .name input').val();
phone=$('.jinsom-reg-phone .phone input').val();
password=$('.jinsom-reg-phone .pass input').val();
code=$('.jinsom-reg-phone .code input').val();
if(!$('.jinsom-reg-doc input').is(':checked')){layer.open({content:'请仔细阅读并勾选用户注册条款！',skin:'msg',time:2});return false;}
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/reg.php",
data: {username:username,phone:phone,password:password,code:code,type:'phone',ticket:ticket,randstr:randstr},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function a(){window.location.reload();}setTimeout(a,2000);  
}
}
}); 
}

//提交邮箱注册
function jinsom_pop_reg_mail(ticket,randstr){
username=$('.jinsom-reg-mail .name input').val();
mail=$('.jinsom-reg-mail .mail input').val();
password=$('.jinsom-reg-mail .pass input').val();
code=$('.jinsom-reg-mail .code input').val();
if(!$('.jinsom-reg-doc input').is(':checked')){layer.open({content:'请仔细阅读并勾选用户注册条款！',skin:'msg',time:2});return false;}
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/reg.php",
data: {username:username,mail:mail,password:password,code:code,type:'email',ticket:ticket,randstr:randstr},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function a(){window.location.reload();}setTimeout(a,2000); 
}
}
}); 
}

//提交邀请码注册
function jinsom_pop_reg_invite(ticket,randstr){
username=$('.jinsom-reg-invite .name input').val();
password=$('.jinsom-reg-invite .pass input').val();
code=$('.jinsom-reg-invite .code input').val();
if(!$('.jinsom-reg-doc input').is(':checked')){layer.open({content:'请仔细阅读并勾选用户注册条款！',skin:'msg',time:2});return false;}
myApp.showIndicator();
$.ajax({
type: "POST",
dataType: 'json',
url:jinsom.jinsom_ajax_url+"/action/reg.php",
data: {username:username,code:code,password:password,type:'reg-invite',ticket:ticket,randstr:randstr},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){//注册成功
function a(){window.location.reload();}setTimeout(a,2000); 
}
}
});

}


//解绑QQ登录
function jinsom_social_login_off(type,author_id,obj){
title='你确定要解除绑定'+$(obj).children('.title').text()+'吗？';	
layer.open({
content: title
,btn: ['确定', '取消']
,yes: function(index){
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/social-login-off.php",
data: {type:type,author_id:author_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
$(obj).removeAttr('onclick').find('n').text('未绑定').parent().removeClass('b').addClass('a');
}
}
});  
}  
});
}


//修改手机号
function jinsom_update_phone(user_id){
phone=$('#jinsom-mobile-update-phone').val();
code=$('#jinsom-mobile-update-code').val();
if(phone==''){layer.open({content:'请输入手机号！',skin:'msg',time:2});return false;}
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/update/phone.php",
data: {user_id:user_id,phone:phone,code:code},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function c(){history.back(-1);}setTimeout(c,2000);
$('.jinsom-setting-box .phone .value').html(phone);
}
}
});
}

//修改邮箱号
function jinsom_update_email(user_id){
email=$('#jinsom-mobile-update-email').val();
code=$('#jinsom-mobile-update-code').val();
if(email==''){layer.open({content:'请输入邮箱号！',skin:'msg',time:2});return false;}
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/update/mail.php",
data: {user_id:user_id,mail:email,code:code},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function c(){history.back(-1);}setTimeout(c,2000);
$('.jinsom-setting-box .email .value').html(email);
}
}
});
}

//修改密码
function jinsom_update_password(user_id){
var password_1= $.trim($('#jinsom-mobile-update-password-a').val());
var password_2= $.trim($('#jinsom-mobile-update-password-b').val());
if(password_1==''||password_2==''){layer.open({content:'请输入要修改的密码！',skin:'msg',time:2});return false;}
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/update/password.php",
data: {pass1:password_1,pass2:password_2,user_id:user_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function c(){history.back(-1);}setTimeout(c,2000); 
}
}

});     
}

//修改安全问题
function jinsom_update_question(user_id){
question= $.trim($('#jinsom-mobile-update-question').val());
answer= $.trim($('#jinsom-mobile-update-answer').val());
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/update/question.php",
data: {question:question,answer:answer,user_id:user_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function c(){history.back(-1);}setTimeout(c,2000); 
}
}

});     
}



//忘记密码-找回类型
function jinsom_forget_password_type_form(){
username=$('.jinsom-forget-password .name input').val();
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.mobile_ajax_url+"/stencil/forget-password.php",
data: {type:'get-type',username:username},
success: function(msg){
myApp.hideIndicator();
if(msg.code==1){
$('.jinsom-forget-password').html(msg.html);
}else{
layer.open({content:msg.msg,skin:'msg',time:2});
}
}
}); 
}

// 忘记密码-最后一步表单
function jinsom_forget_password_last_form(user_id,username){
type=$('.jinsom-forget-password-type input[name=style]:radio:checked').val();
if(type==''||type==undefined){
layer.open({content:'请选择找回类型！',skin:'msg',time:2});	
return false;
}
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/login/forget-password-'+type+'.php?user_id='+user_id+'&username='+username});

}

//忘记密码-提交
function jinsom_forget_password_last(type,user_id){
code=$('.jinsom-forget-password-'+type+' .code input').val();
password=$('.jinsom-forget-password-'+type+' .pass input').val();
myApp.showIndicator();
$.ajax({
type: "POST",
dataType:'json',
url:jinsom.jinsom_ajax_url+"/action/password.php",
data: {style:type,code:code,password:password,user_id:user_id},
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
function d(){window.location.reload();}setTimeout(d,2000);
}
}
}); 
}