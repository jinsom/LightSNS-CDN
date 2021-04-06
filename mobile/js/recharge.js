

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
}else if(type=='qrcode'){
pay_type='qrcode';
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


if(type=='keypay'){//卡密支付
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/mywallet/key.php'});
}


if(type=='qrcode'){//当面付
data=$('#jinsom-credit-recharge-form').serialize();
data=data+'&type=qrcode';
myApp.showIndicator();
$.ajax({   
url:jinsom.theme_url+'/extend/alipay/qrcode.php',
type:'GET',   
data:data,
success:function(msg){   
myApp.hideIndicator();
if(myApp.device.os=='ios'){
window.open(msg);	
}else{
window.location.href=msg;	
}
}   
});

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

if(type=='alipay'){//支付宝手机支付
$('#jinsom-credit-recharge-form').submit();
}else if(type=='wechat-jsapi'){//微信公众号支付
$('#jinsom-credit-recharge-form').submit();
}else if(type=='wechat-h5'){//微信H5支付
$.ajax({   
url:jinsom.mobile_ajax_url+"/pay/wechat-h5.php",
type:'POST',   
data:{number:number,type:'credit',WIDout_trade_no:WIDout_trade_no,WIDsubject:WIDsubject,openid:openid},    
success:function(msg){
if(myApp.device.os=='ios'){
window.open(msg.url);	
}else{
window.location.href=msg.url;	
}
}   
}); 	
}else if(type=='xunhu-wechat'){//迅虎微信支付
data=$('#jinsom-credit-recharge-form').serialize();
$.ajax({   
url:jinsom.jinsom_ajax_url+"/stencil/wechatpay-xunhu-code.php",
type:'POST',   
data:data,    
success:function(msg){
if(myApp.device.os=='ios'){
window.open(msg);	
}else{
window.location.href=msg;	
}
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


// function jinsom_check_order_wechatpay(data){
// //长轮询付款
// jinsom_check_order_wechatpay_ajax=$.ajax({
// type: "POST",
// url:jinsom.jinsom_ajax_url+"/action/check-trade.php",
// data:data,
// success: function(msg){
// if(msg.code==0){
// jinsom_check_order_wechatpay(data);
// }else if(msg.code==1){
// $('.jinsom-alipay-qrcode-pay').html(msg.msg);
// // if(msg.type=='credit'){
// // credit=parseInt($('.jinsom-mycredit-credit-info .credit i').html());
// // recharge_number=parseInt(msg.recharge_number);
// // count=credit+recharge_number;
// // $('.jinsom-mycredit-credit-info .credit i').html(count);
// // }else{//开通会员
// // $('.jinsom-mycredit-user-info .vip m').html(msg.content);
// // }
// }else{
// jinsom_check_order_wechatpay(data);	
// }
// }
// });	
// }

// //取消支付 取消长轮询
// function jinsom_cancel_alipay_qrcode(){
// jinsom_check_order_wechatpay_ajax.abort();
// }