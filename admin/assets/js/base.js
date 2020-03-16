// 后台面板
jQuery(document).ready(function($) {


var patterns={validate:/^(?!_nonce)[a-zA-Z0-9_-]*(?:\[(?:\d*|(?!_nonce)[a-zA-Z0-9_-]+)\])*$/i,key:/[a-zA-Z0-9_-]+|(?=\[\])/g,named:/^[a-zA-Z0-9_-]+$/,push:/^$/,fixed:/^\d+$/};function FormSerializer(helper,$form){var data={},pushes={};function build(base,key,value){base[key]=value;return base;}
function makeObject(root,value){var keys=root.match(patterns.key),k;while((k=keys.pop())!==undefined){if(patterns.push.test(k)){var idx=incrementPush(root.replace(/\[\]$/,''));value=build([],idx,value);}
else if(patterns.fixed.test(k)){value=build([],k,value);}
else if(patterns.named.test(k)){value=build({},k,value);}}
return value;}
function incrementPush(key){if(pushes[key]===undefined){pushes[key]=0;}
return pushes[key]++;}
function addPair(pair){if(!patterns.validate.test(pair.name))return this;var obj=makeObject(pair.name,pair.value);data=helper.extend(true,data,obj);return this;}
function addPairs(pairs){if(!helper.isArray(pairs)){throw new Error("formSerializer.addPairs expects an Array");}
for(var i=0,len=pairs.length;i<len;i++){this.addPair(pairs[i]);}
return this;}
function serialize(){return data;}
function serializeJSON(){return JSON.stringify(serialize());}
this.addPair=addPair;this.addPairs=addPairs;this.serialize=serialize;this.serializeJSON=serializeJSON;}
FormSerializer.patterns=patterns;FormSerializer.serializeObject=function serializeObject(){return new FormSerializer($,this).addPairs(this.serializeArray()).serialize();};FormSerializer.serializeJSON=function serializeJSON(){return new FormSerializer($,this).addPairs(this.serializeArray()).serializeJSON();};if(typeof $.fn!=="undefined"){$.fn.serializeObjectLightSNS=FormSerializer.serializeObject;$.fn.serializeJSONLightSNS=FormSerializer.serializeJSON;}



//切换WordPress面板
$(".jinsom-panel-header-left").click(function() {
if ($("#adminmenumain").css('display')=='block') {
$("#wpcontent").css("margin-left", "0px");
$("#adminmenumain").hide(0);
$(".jinsom-admin-logo").removeClass('had_show')
} else {
$("#adminmenumain").show(0);
$("#wpcontent").css("margin-left", "160px");
$(".jinsom-admin-logo").addClass('had_show')
}
});


//折叠菜单
$(".jinsom-show-menu").click(function() {
if ($(".jinsom-panel-nav").css('width')=='180px') {
$(this).children('i').addClass('fa-expand').removeClass('fa-compress');
$(".jinsom-panel-nav").css("width", "48px").addClass('on');
$(".jinsom-panel-content").css("margin-left", "48px");
$(".jinsom-panel-nav ul li a span").hide();
$('.jinsom-panel-nav ul li .jinsom-panel-arrow:after').css('right','2px');

$('.jinsom-panel-nav.on ul li').hover(function() {
if($('.jinsom-panel-nav').hasClass('on')){
layer.tips($(this).find('span').html(), $(this));
}
}, function() {
layer.closeAll('tips');
});

} else {
$(this).children('i').addClass('fa-compress').removeClass('fa-expand');
$(".jinsom-panel-nav ul li a span").show();
$(".jinsom-panel-content").css("margin-left", "180px");
$('.jinsom-panel-nav ul li .jinsom-panel-arrow:after').css('right','10px');
$(".jinsom-panel-nav").css("width", "180px").removeClass('on');

$('.jinsom-panel-nav.on ul li').hover(function() {
}, function() {
});

}
});

//切换肤色
$('[name="jinsom_options[jinsom_panel_skin]"]').click(function(){
skin=$(this).val();
if(skin=='dark'){
$('.jinsom-panel').addClass('jinsom-panel-theme-dark').removeClass('jinsom-panel-theme-light');
}else{
$('.jinsom-panel').addClass('jinsom-panel-theme-light').removeClass('jinsom-panel-theme-dark');
}
});

//监听面板
$("input[name='jinsom_options[jinsom_panel_name]']").bind("input propertychange",function(event){
$('.jinsom-panel-header-inner h1').html($(this).val());
});

layui.use(['layer'], function() {
$("#jinsom-get-update-info").click(function() {
layer.load(1);
var my_domain = document.domain;
var url = jinsom.author_update + "/update.php?callback=?&url=123";
jQuery.getJSON(url, function(data) {
layer.closeAll('loading');
layer.alert(data.version)
})
});
});



// 回车搜索
$(".jinsom-panel-search input").keypress(function(e) {  
if(e.which == 13) {  
return false;
}  
}); 


layui.use('element', function() {
var element = layui.element
})
});

//退出登录
function jinsom_login_out(){
layer.confirm('你确定要退出本帐号吗？',{
title:'退出登录',
btnAlign: 'c',
btn: ['确定','按错了'] 
}, function(){
layer.msg('已退出，欢迎再次回来！');
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/update/profile.php",
data: {login_out:1},
success: function(msg){}
});
function d(){window.location.href='/';}setTimeout(d,2500);
});
}


//导入备份
function jinsom_admin_backup_export(){
backup=$('#jinsom-admin-backup-export-val').val();
if(backup=='delete'){
title='你要确定要清空所有的设置选项吗？清空之后将恢复默认设置！';
}else{
title='你确定要导入备份设置吗？你之前的设置选项会被覆盖！';
}
layer.confirm(title,{
btnAlign: 'c',
}, function(){
layer.load(1);
$.ajax({
type:"POST",
url: jinsom.jinsom_ajax_url+"/admin/action/admin-setting.php",
data:{backup:backup},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
function c(){window.location.reload();}setTimeout(c,2000);
}
}
});
});
}

//metabox导出备份
function jinsom_amdin_backup_metabox(){
post_id=jinsom_getUrlParam('post');
window.open(jinsom.theme_url+"/module/admin/action/admin-setting-metabox-back.php?download&post_id="+post_id);
}


//metabox导入备份
function jinsom_amdin_backup_metabox_import(){
backup=$('#jinsom-admin-backup-metabox-val').val();
if(backup=='delete'){
title='你要确定要清空所有的设置选项吗？清空之后将恢复默认设置！';
}else{
title='你确定要导入备份设置吗？你之前的设置选项会被覆盖！';
}
post_id=jinsom_getUrlParam('post');
layer.confirm(title,{
btnAlign: 'c',
}, function(){
layer.load(1);
$.ajax({
type:"POST",
url: jinsom.jinsom_ajax_url+"/admin/action/admin-setting-metabox-back.php",
data:{backup:backup,post_id:post_id},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
function c(){window.location.reload();}setTimeout(c,2000);
}
}
});
});
}


//保存设置
function jinsom_admin_save_setting(){
data=$('#jinsom-panel-form').serializeJSONLightSNS();
layer.load(1);
$.ajax({
type:"POST",
url: jinsom.jinsom_ajax_url+"/admin/action/admin-save.php",
data:{data:data},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){

}
}
});
}


//弹出卡密表单
function jinsom_admin_key_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/key.php",
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'卡密管理',
type: 1,
area: ['700px', '520px'], 
content: msg
});
}
});	
}

//弹出卡密生成的表单
function jinsom_admin_key_add_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/key-add.php",
success: function(msg){
layer.closeAll('loading');
window.admin_key_add_form=layer.open({
title:'卡密生成',
type: 1,
area: ['540px', '340px'], 
content: msg
});
layui.use(['form','laydate'], function () {
var form = layui.form;
var laydate = layui.laydate;
form.render('radio');
form.on('radio(add-key)', function(data){
$('#jinsom-add-key-form li.number i').html($(data.elem).attr('data'));
}); 
laydate.render({elem:'#jinsom-key-expiry',type:'date'});
});
}
});		
}

//生成卡密
function jinsom_admin_key_add(){
data=$('#jinsom-add-key-form').serialize();
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/key-add.php",
data:data,
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
layer.close(admin_key_add_form);
}
}
});		
}


//弹出卡密查询表单
function jinsom_admin_key_search_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/key-search.php",
success: function(msg){
layer.closeAll('loading');
window.admin_key_search_form=layer.open({
title:'卡密查询',
btn: false,
type: 1,
resize:false,
area: '350px',
skin: 'jinsom-login-form',
content: msg
});
}
});
}

//卡密查询
function jinsom_admin_key_search(){
key=$('#jinsom-pop-key-search').val();
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/key-search.php",
data:{key:key},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){
layer.close(admin_key_search_form);
layer.open({
title:'查询结果',
type: 1,
content:msg.msg
});
}else{
layer.msg(msg.msg);	
}
}
});		
}


//弹出导出卡密的表单
function jinsom_admin_key_export_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/key-export.php",
success: function(msg){
layer.closeAll('loading');
window.admin_key_add_form=layer.open({
title:'卡密导出',
type: 1,
area: ['640px', '305px'], 
content: msg
});
layui.use(['form'], function () {
var form = layui.form;
form.render('radio');

form.on('radio(jinsom-custom-key-number)', function(data){
if(data.value=='custom'){
$('#jinsom-custom-key-number').show();
}else{
$('#jinsom-custom-key-number').hide();	
}
}); 

});
}
});		
}

//提交导出表单
function jinsom_admin_key_export(){
$('#jinsom-export-key-form').submit();	
}


//弹出删除卡密的表单
function jinsom_admin_key_delete_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/key-delete.php",
success: function(msg){
layer.closeAll('loading');
window.admin_key_add_form=layer.open({
title:'卡密删除',
type: 1,
area: ['630px', '215px'], 
content: msg
});
layui.use(['form'], function () {
var form = layui.form;
form.render('radio');
});
}
});		
}

//删除卡密
function jinsom_admin_key_delete(){
data=$('#jinsom-delete-key-form').serialize();
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/key-delete.php",
data:data,
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
}
});		
}


//弹出批量注册表单
function jinsom_multiple_reg_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/multiple-reg.php",
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'批量注册',
type: 1,
area: ['700px', 'auto'], 
content: msg
});
layui.use(['form'], function () {
var form = layui.form;
form.render('checkbox');
});
}
});	
}


//提交批量注册
function jinsom_multiple_reg(){
username=$('.jinsom-multiple-reg-username').val();	
password=$('.jinsom-multiple-reg-password').val();
city=$('.jinsom-multiple-city:checkbox:checked').val();	
sex=$('.jinsom-multiple-sex:checkbox:checked').val();	
if(username==''){
layer.msg('请输入用户名！');
return false;	
}
$('.jinsom-multiple-reg-form .btn').html('<i class="fa fa-superpowers fa-spin"></i> 批量注册中...');
layer.load(1);
$.ajax({
type: "POST",
data:{username:username,password:password,city:city,sex:sex},
url:jinsom.jinsom_ajax_url+"/admin/action/multiple-reg.php",
success: function(msg){
layer.closeAll('loading');
$('.jinsom-multiple-reg-form .btn').html('<i class="fa fa-superpowers"></i> 开始注册');
if(msg.code==1){
$('.jinsom-multiple-reg-form .username .show').html(msg.content);	
$('.jinsom-multiple-userdata').val(msg.user_data);
$('.jinsom-multiple-reg-form .lable p span').show();
}else{
layer.msg(msg.msg);	
}
}
});	
}

//显示已经注册成功的用户id
function jinsom_multiple_userdata_form(){
userdata=$('.jinsom-multiple-userdata').val();
layer.prompt({title: '已经注册成功的用户id集合',formType: 2,btnAlign: 'c',value:userdata}); 	
}


//弹出邀请码表单
function jinsom_admin_invite_code_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/invite-code.php",
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'邀请码管理',
type: 1,
area: ['700px', '520px'], 
content: msg
});
}
});	
}


//弹出生成邀请码表单
function jinsom_admin_invite_code_add_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/invite-code-add.php",
success: function(msg){
layer.closeAll('loading');
window.admin_invite_code_add_form=layer.open({
title:'生成邀请码',
btn: false,
type: 1,
resize:false,
area: '350px',
skin: 'jinsom-login-form',
content: msg
});
}
});
}

//生成邀请码
function jinsom_admin_invite_code_add(){
number=$('#jinsom-pop-invite-code-number').val();
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/invite-code-add.php",
data:{number:number},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
layer.close(admin_invite_code_add_form);
}
}
});		
}



//弹出邀请码查询表单
function jinsom_admin_invite_code_search_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/invite-code-search.php",
success: function(msg){
layer.closeAll('loading');
window.admin_invite_code_search_form=layer.open({
title:'邀请码查询',
btn: false,
type: 1,
resize:false,
area: '350px',
skin: 'jinsom-login-form',
content: msg
});
}
});
}

//邀请码查询
function jinsom_admin_invite_code_search(){
code=$('#jinsom-pop-invite-code').val();
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/invite-code-search.php",
data:{code:code},
success: function(msg){
layer.closeAll('loading');
if(msg.code==1){
layer.close(admin_invite_code_search_form);
layer.open({
type: 1,
title:'查询结果',
content:msg.msg
});
}else{
layer.msg(msg.msg);	
}
}
});		
}


//弹出导出邀请码的表单
function jinsom_admin_invite_code_export_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/invite-code-export.php",
success: function(msg){
layer.closeAll('loading');
window.admin_key_add_form=layer.open({
title:'邀请码导出',
type: 1,
area: ['440px', '212px'], 
content: msg
});
layui.use(['form'], function () {
var form = layui.form;
form.render('radio');
});
}
});		
}


//提交导出邀请码表单
function jinsom_admin_invite_code_export(){
$('#jinsom-export-invite-code-form').submit();	
}


//弹出删除邀请码的表单
function jinsom_admin_invite_code_delete_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/invite-code-delete.php",
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'邀请码删除',
type: 1,
area: ['440px', '176px'], 
content: msg
});
layui.use(['form'], function () {
var form = layui.form;
form.render('radio');
});
}
});		
}

//删除邀请码
function jinsom_admin_invite_code_delete(){
data=$('#jinsom-delete-invite-code-form').serialize();
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/invite-code-delete.php",
data:data,
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
}
});		
}




//弹出批量导入视频表单
function jinsom_multiple_import_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/multiple-import.php",
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'批量导入视频',
type: 1,
area: ['700px', 'auto'], 
content: msg
});
layui.use(['form'], function () {
var form = layui.form;
form.render('checkbox');
});
}
});	
}


//提交批量注册
function jinsom_multiple_import(){
ids=$('.jinsom-multiple-import-ids').val();	
content=$('.jinsom-multiple-import-content').val();
if(ids==''||content==''){
layer.msg('请输入信息！');
return false;	
}
$('.jinsom-multiple-import-form .btn').html('<i class="fa fa-superpowers fa-spin"></i> 导入中...');
layer.load(1);
$.ajax({
type: "POST",
data:{ids:ids,content:content},
url:jinsom.jinsom_ajax_url+"/admin/action/multiple-import.php",
success: function(msg){
layer.closeAll('loading');
$('.jinsom-multiple-import-form .btn').html('<i class="fa fa-superpowers"></i> 开始导入<span></span>');
layer.msg(msg.msg);	
if(msg.code==1){
$('.jinsom-multiple-import-content').val('');
}
}
});	
}


//弹出充值记录表单
function jinsom_admin_recharge_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/recharge.php",
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'全站充值记录',
type: 1,
area: ['700px', '520px'], 
content: msg
});
}
});	
}


//弹出查看聊天记录表单
function jinsom_admin_chat_note_form(){
layer.confirm('选择你要查看的聊天记录类型',{
btn: ['单聊记录','群聊记录'],
btnAlign: 'c',
},
function(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/chat-note-one.php",
success: function(msg){
layer.closeAll();
layer.open({
title:'单聊记录',
type: 1,
area: ['850px', '520px'], 
content: msg
});
}
});	
},
function(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/chat-note-group.php",
success: function(msg){
layer.closeAll();
layer.open({
title:'群聊记录',
type: 1,
area: ['800px', '520px'], 
content: msg
});
}
});
}
);
}

//删除聊天记录
function jinsom_admin_del_chat_note(type,id,obj){
layer.confirm('删除之后将不可恢复，你确定？',{
btn: ['确定','取消'],
btnAlign: 'c',
},
function(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/chat-note-delete.php",
data:{type:type,id:id},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
$(obj).parents('li').remove();	
}
}
});
});
}

//查看聊天记录详情
function jinsom_admin_read_chat_note(type,id){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/chat-note-all.php",
data:{type:type,id:id},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'聊天记录详情',
type: 1,
area: ['600px', '500px'], 
content: msg.msg
});
}
});
}

//自助授权
function jinsom_custom_verify_domain(){
layer.load(1);
$.ajax({
type: "POST",
url:"https://admin.jinsom.cn/verify.php",
data:{domain:jinsom.domain,theme:jinsom.theme_name},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
}
});	
}

//弹出提现记录表单
function jinsom_admin_cash_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/cash.php",
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'全站提现记录',
type: 1,
area: ['900px', '530px'], 
content: msg
});
}
});	
}
//查看提现详情
function jinsom_cash_more(ID){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/stencil/cash-more.php",
data:{ID:ID},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:false,
skin:'jinsom-cash-form',
type: 1,
area: ['380px', 'auto'], 
content: msg
});
}
});
}

//通过提现
function  jinsom_cash_agree(ID,obj){
layer.confirm('你要通过该提现记录吗',{
btnAlign: 'c',
}, function(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/cash-do.php",
data:{ID:ID,type:'agree'},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
$(obj).siblings('.refuse').remove();
$(obj).parent().prev().text('成功');
$(obj).remove();
}
}
});
});
}

//拒绝提现
function  jinsom_cash_refuse(ID,obj){
layer.prompt({title: '请输入拒绝通过的原因', formType: 2},function(reason,index){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/cash-do.php",
data:{ID:ID,type:'refuse',reason:reason},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
$(obj).siblings('.agree').remove();
$(obj).parent().prev().text('失败');
$(obj).remove();
layer.close(index);
}
}
});
});
}


//弹出全站通知表单
function jinsom_admin_notice_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/notice.php",
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'全站通知',
type: 1,
fixed: false,
area: ['700px', '485px'], 
content: msg
});
}
});	
}

//弹出发表全站通知表单
function jinsom_admin_notice_add_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/notice-add.php",
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'全站通知',
type: 1,
fixed: false,
area: ['500px'], 
skin: 'jinsom-admin-notice-add-form',
content: msg
});
}
});	
}


//发表全站通知
function jinsom_admin_notice_add(){
content=$('#jinsom-admin-notice-add-val').val();
if(content==''){
layer.msg("通知内容不能为空！");
return false;
}
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/notice-do.php",
data:{content:content,type:'add'},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
function c(){layer.closeAll();}setTimeout(c,2000);
}
}
});
}


//弹出编辑全站通知表单
function jinsom_admin_notice_edit_form(id){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/notice-edit.php",
data:{id:id},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'全站通知',
type: 1,
fixed: false,
area: ['500px'], 
skin: 'jinsom-admin-notice-add-form',
content: msg
});
}
});	
}

//编辑全站通知
function jinsom_admin_notice_edit(id){
content=$('#jinsom-admin-notice-add-val').val();
if(content==''){
layer.msg("通知内容不能为空！");
return false;
}
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/notice-do.php",
data:{content:content,type:'edit',id:id},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
function c(){layer.closeAll();}setTimeout(c,2000);
}
}
});
}

//查看全站通知
function jinsom_admin_notice_read_form(id){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/notice-read.php",
data:{id:id},
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'通知详情',
type: 1,
fixed: false,
area: ['500px','350px'], 
skin: 'jinsom-admin-notice-read-form',
content: msg
});
}
});	
}

//删除聊天记录
function jinsom_admin_notice_del(id,obj){
layer.confirm('你确定要删除这条通知？',{
btn: ['确定','取消'],
btnAlign: 'c',
},
function(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/notice-do.php",
data:{type:'delete',id:id},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
$(obj).parents('li').remove();	
}
}
});
});
}


//版主申请表单
function jinsom_admin_apply_bbs_admin_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/apply-bbs-admin.php",
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'版主申请',
type: 1,
fixed: false,
area: ['700px','410px'], 
content: msg
});
}
});	
}

//查看版主申请
function jinsom_admin_apply_bbs_admin_read_form(id){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/apply-bbs-admin-do.php",
data:{id:id},
success: function(msg){
layer.closeAll('loading');
window.admin_apply_bbs_admin_read_form=layer.open({
title:'申请详情',
type: 1,
fixed: false,
area: ['500px','350px'], 
content: msg
});
}
});	
}

//版主申请操作
function jinsom_admin_apply_bbs_admin_do(type,id,obj){
if(type=='agree'){
title="通过";
}else if(type=='refuse'){
title="拒绝";
}else{
title="删除";	
}

layer.confirm('你确定要'+title+'吗？',{
btn: ['确定','取消'],
btnAlign: 'c',
},
function(){

layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/apply-bbs-admin-do.php",
data:{ID:id,type:type},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
if(type=='del'){
$('#jinsom-admin-apply-bbs-admin-'+id).remove();
}else if(type=='agree'){
$('#jinsom-admin-apply-bbs-admin-'+id+' span m').html('已经通过').attr('style','');
}else if(type=='refuse'){
$('#jinsom-admin-apply-bbs-admin-'+id+' span m').html('已经拒绝').attr('style','');
}
layer.close(admin_apply_bbs_admin_read_form);
}
}
});	
});	
}


//论坛开通申请表单
function jinsom_admin_apply_bbs_form(){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/apply-bbs.php",
success: function(msg){
layer.closeAll('loading');
layer.open({
title:'论坛开通申请',
type: 1,
fixed: false,
area: ['700px','410px'], 
content: msg
});
}
});	
}

//查看论坛申请表单
function jinsom_admin_apply_bbs_read_form(id){
layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/stencil/apply-bbs-do.php",
data:{id:id},
success: function(msg){
layer.closeAll('loading');
window.admin_apply_bbs_read_form=layer.open({
title:'申请详情',
type: 1,
fixed: false,
area: ['500px','350px'], 
content: msg
});
}
});	
}

//论坛申请操作
function jinsom_admin_apply_bbs_do(type,id,obj){
if(type=='agree'){
title="通过";
}else if(type=='refuse'){
title="拒绝";
}else{
title="删除";	
}

layer.confirm('你确定要'+title+'吗？',{
btn: ['确定','取消'],
btnAlign: 'c',
},
function(){

layer.load(1);
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/admin/action/apply-bbs-do.php",
data:{ID:id,type:type},
success: function(msg){
layer.closeAll('loading');
layer.msg(msg.msg);
if(msg.code==1){
if(type=='del'){
$('#jinsom-admin-apply-bbs-admin-'+id).remove();
}else if(type=='agree'){
$('#jinsom-admin-apply-bbs-admin-'+id+' span m').html('已经通过').attr('style','');
}else if(type=='refuse'){
$('#jinsom-admin-apply-bbs-admin-'+id+' span m').html('已经拒绝').attr('style','');
}
layer.close(admin_apply_bbs_read_form);
}
}
});	
});	
}


function jinsom_no(){
layer.msg("还没有写好啦！预留接口");	
}



function jinsom_getUrlParam(name){
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
if(r!=null)return  unescape(r[2]); return null;
}