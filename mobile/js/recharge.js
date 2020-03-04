

//充值金币
function jinsom_recharge_credit(){
number=$('#jinsom-credit-recharge-number').val();	
WIDout_trade_no=$('input[name="WIDout_trade_no"]').val();
WIDsubject=$('input[name="WIDsubject"]').val();
openid=$('input[name="openid"]').val();
type=$('#jinsom-recharge-type').val();	
if(type==''){
layer.open({content:'请选择支付方式！',skin:'msg',time:2});
return false;	
}
if(number==''&&type!='keypay'){
layer.open({content:'请选择充值金额！',skin:'msg',time:2});
return false;		
}
if(type=='wechat-h5'||type=='wechat-jsapi'||type=='xunhu-wechat'){
pay_type='wechatpay';
}else{
pay_type='alipay';
}


//金币支付
if(type=='creditpay'){
data=$('#jinsom-credit-recharge-form').serialize();
data=data+'&type=creditpay';
myApp.showIndicator();
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/recharge-vip-credit.php",
data:data,
success: function(msg){
myApp.hideIndicator();
layer.open({content:msg.msg,skin:'msg',time:2});
if(msg.code==1){
history.back(-1);
}

}
});
}

//卡密支付
if(type=='keypay'){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/mywallet/key.php'});
}


//创建订单
if(type!='keypay'&&type!='creditpay'){
data=$('#jinsom-credit-recharge-form').serialize();
data=data+'&type='+pay_type;
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/create-trade-no.php",
data:data,
success:function(aa){

if(type=='alipay'){
$('#jinsom-credit-recharge-form').submit();
}else if(type=='wechat-jsapi'){
$('#jinsom-credit-recharge-form').submit();
}else if(type=='wechat-h5'){
$.ajax({   
url:jinsom.mobile_ajax_url+"/pay/wechat-h5.php",
type:'POST',   
data:{number:number,type:'credit',WIDout_trade_no:WIDout_trade_no,WIDsubject:WIDsubject,openid:openid},    
success:function(msg){
window.location.href=msg.url; 
// console.log(msg.url);
}   
}); 	
}else if(type=='xunhu-wechat'){
data=$('#jinsom-credit-recharge-form').serialize();
$.ajax({   
url:jinsom.jinsom_ajax_url+"/stencil/wechatpay-xunhu-code.php",
type:'POST',   
data:data,    
success:function(msg){
window.location.href=msg; 
// console.log(msg.url);
}   
}); 	
}


}  
});
}

}

//打开充值界面
function jinsom_recharge_vip_type_form(){
if(!jinsom.is_login){
myApp.loginScreen();  
return false;
}
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/mywallet/recharge-vip.php'});	
}


