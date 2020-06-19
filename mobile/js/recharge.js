

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
function d(){window.location.reload();}setTimeout(d,1500);//刷新页面
// history.back(-1);
}

}
});
}

//卡密支付
if(type=='keypay'){
myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/mywallet/key.php'});
}

//当面付
if(type=='qrcode'){
data=$('#jinsom-credit-recharge-form').serialize();
data=data+'&type=qrcode';
myApp.showIndicator();
$.ajax({   
url:jinsom.theme_url+'/extend/alipay/qrcode.php',
type:'GET',   
data:data,
success:function(msg){   
myApp.hideIndicator();
window.location.href=msg;

// html='<div class="popup jinsom-publish-type-form profile-qrcode"><div class="page-content"><div class="jinsom-alipay-qrcode-pay"><div id="jinsom-qrcode"></div><p class="tips">请用支付宝扫码支付</p></div><div class="close"><a href="#" class="link icon-only close-popup" onclick="jinsom_cancel_alipay_qrcode()"><i class="jinsom-icon jinsom-xiangxia2"></i></a></div>';
// myApp.popup(html);
// jinsom_qrcode('jinsom-qrcode',200,200,msg);

// myApp.getCurrentView().router.load({url:jinsom.theme_url+'/mobile/templates/page/mywallet/alipay-qrcode.php?url='+msg});
// jinsom_check_order_wechatpay(data);
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