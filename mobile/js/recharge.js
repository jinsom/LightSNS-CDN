

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
if(type=='wechatpay_mobile'||type=='wechatpay_mp'||type=='xunhupay_wechat_mobile'){
pay_type='wechatpay';
}else if(type=='alipay_code'){
pay_type='qrcode';
}else if(type=='epay_wechatpay'||type=='epay_alipay'||type=='mapay_alipay'||type=='mapay_wechatpay'){
pay_type=type;
}else{
pay_type='alipay';
}



if(type=='creditpay'){//金币支付
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
function d(){window.location.reload();}setTimeout(d,1500);//刷新页面
// history.back(-1);
}

}
});
}


if(type=='alipay_code'){//当面付
data=$('#jinsom-credit-recharge-form').serialize();
data=data+'&type=qrcode';
myApp.showIndicator();
$.ajax({   
url:jinsom.home_url+'/Extend/pay/alipay/qrcode.php',
type:'GET',   
data:data,
success:function(msg){   
myApp.hideIndicator();
if(myApp.device.os=='ios'){
window.location.href=msg;	
}else{
window.open(msg);	
}
}   
});

}


//创建订单
if(type!='creditpay'){
data=$('#jinsom-credit-recharge-form').serialize();
data=data+'&type='+pay_type;
$.ajax({
type: "POST",
url:jinsom.jinsom_ajax_url+"/action/create-trade-no.php",
data:data,
success:function(aa){

if(type=='alipay_mobile'||type=='wechatpay_mp'||type=='epay_wechatpay'||type=='epay_alipay'){//提交表单
$('#jinsom-credit-recharge-form').submit();
$('#jinsom-credit-recharge-form input[name="WIDout_trade_no"]').val(new Date().getTime());
}else if(type=='wechatpay_mp'){//微信H5支付
$.ajax({   
url:jinsom.home_url+"/Extend/pay/wechatpay/wechat-h5.php",
type:'POST',   
data:{number:number,type:'credit',WIDout_trade_no:WIDout_trade_no,WIDsubject:WIDsubject,openid:openid},    
success:function(msg){
if(myApp.device.os=='ios'){
window.location.href=msg.url;
}else{
window.open(msg.url);	
}
}   
}); 	
}else if(type=='xunhupay_wechat_mobile'){//迅虎微信支付
data=$('#jinsom-credit-recharge-form').serialize();
$.ajax({   
url:jinsom.home_url+"/Extend/pay/xunhupay/wechatpay-xunhu-code.php",
type:'POST',   
data:data,    
success:function(msg){
if(myApp.device.os=='ios'){
window.location.href=msg;
}else{
window.open(msg);		
}
}   
}); 	
}else{
layer.open({content:'暂未开启！',skin:'msg',time:2});
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
