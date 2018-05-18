/***
 * AJAX请求，返回JSON数据
 * @param par :url,postData,onSuccessFunction
 * 
 * @return
 */
var loginLayerIndex=null;
function myAjaxRequest(par){
	if(par.imgPath == undefined){
		par.imgPath = "../images";
	}
	if(par.appPath == undefined){
		//par.appPath = "/exchange";
		par.appPath = "";
	}
	if(par.dataType == undefined){
		par.dataType = "json";      
	}
	var url = par.url;
	var postData = par.postData;
	var onSuccessFunction = par.onSuccessFunction;
	var async = par.async ;
	var mask = par.mask;
	var imgPath = par.imgPath;
	var appPath = par.appPath;
	var dataType = par.dataType;
	if (async==null){
		async = true;//默认不同步
	}
	if(mask){
		//$(document.body).mask("请求处理中...");
	}
	$.ajax({
			timeout : 300000, // 5分钟
			type : "POST",
			async : async,
			url : url,
			data : postData,
			dataType : dataType,
			scriptCharset : 'UTF-8',
			contentType:"application/x-www-form-urlencoded;charset=UTF-8",
			jsonp : 'callback',
			success:function(data, textStatus, jqXHR){
				if(dataType == "html") {
					if(data.indexOf("result") == 2){
						data = eval("(" + data + ")");
					}
				}
				if (data.result=='success'){
					if(mask){
						//$(document.body).mask("操作完成!"); 
					}
					if(onSuccessFunction){onSuccessFunction(data.data);}
				}else if (data.result=='error'||data.result=='fail'){
					alert(data.msg);
				}else if(data.result == "loginAjax"){
					showLogin(imgPath,appPath);
				}else if (!isEmpty(data.state) && data.state==data.login){
					if(null!=loginLayerIndex)return;	
					console.log(url);
					loginLayerIndex=layer.open({
						type: 2,
						title:'用户登录',
						area: ['370px', '300px'],
						content: ['appLogin!layerOutLogin.htm','no'],
					});
							
				}else if(data.reslutl == "noprivilege"){
					alert("您无此权限操作该功能模块!若要开通，请联系管理员。");
				}else if(data.result == "illegalPath"){
					alert("您访问的路径为非法路径，请检查！");
				}else {
					if(onSuccessFunction){onSuccessFunction(data);}
				}
				//setTimeout(function(){$(document.body).unmask();},300);//用户查看页面时间
				
			},
			error:function(jqXHR, textStatus, errorThrown){
				if (textStatus=='timeout'){
					alert("连接超时，请检查网络");
				}else if (textStatus=='error'){
					//alert("请求错误"+errorThrown);
				}else if (textStatus=='abort'){
					//alert("请求中止");
				}else{
					alert(textStatus+",HTTP error occurs"+errorThrown);
				}
			},
			statusCode:{404:function(){alert("404,页面不存在"+this.url);},
						500:function(){alert("500,服务器内部错误"+this.url);}}
		});
	
}

function closeLoginLayer(){
	if(null!=loginLayerIndex){
		//layer.close(loginLayerIndex);
		window.location.reload(); 
	}
}

/*日期控件*/
jQuery(document).ready(function() {
    $('.form_datetime').datetimepicker({
	    language:  'zh-CN',
	    format: 'yyyy-mm-dd',
	    weekStart: 1,
	    todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
		pickerPosition: ("bottom-left")
	});
 
	$(".form_datetime2").datetimepicker({
		language:  'zh-CN',
		format: "yyyy-mm-dd hh:ii",
		autoclose: true,
		todayBtn: true,
		startDate: new Date(),
		minuteStep: 10,
		pickerPosition: ("bottom-left")            
	});
	$(".form_datetime3").datetimepicker({
		language:  'zh-CN',
		format: "yyyy-mm-dd hh:ii",
		autoclose: true,
		todayBtn: true,
		minuteStep: 10,
		pickerPosition: ("bottom-left")            
	});
	 $(".form_datetime4").datetimepicker({
		language:  'zh-CN',
		 format: "yyyy-mm-dd hh:ii:ss",
		 autoclose: true,
		 todayBtn: true,
		 minuteStep: 10,
		 pickerPosition: ("bottom-left")            
	 });
});
/**加载等待loading提示及遮罩*/
function removeLoadding(){
	$(".allBody").css("display","none");
}
function loadding(){
	var js=document.scripts[0].src;
	var ind = js.indexOf("app");
	var s = js.substring(0,ind);
	var path = s + "app/image/loading-1.gif";

	 var loading = '<div style="position: fixed;top: 50%;left: 50%;z-index: 999999999999;"   id="form-submit-loading" class="form-submit-loading">';  
			loading += '<img src="' +path +'" /><span style="color:#002555;font-size:14px;font-weight: bold; z-index:999;">&nbsp;&nbsp;&nbsp;请稍后...</span>';  
			loading += '</div>';  
			$(".allBody").css("display","block");
			$('.allBody').append(loading);  
			$('.allBody').append('<div id="form-submit-overlay" class="form-submit-overlay" style="width: ' 
			+ $(document).width() + 'px; height: ' + $(document).height() + 'px;"></div>');
}



/**判断是否为空**/
function isEmpty(value, trim) {
    return value === undefined || value === null || value.length === 0 || (trim && $.trim(value) === '');
};
/**
 * 产生唯一数
 * @param len 长度
 * @param radix 计算
 * @returns
 */
function uuid(len,radix,containTime)
{
	var now=new Date();
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
    i;
    radix = radix || chars.length;
    
    if (len)
    {
        // Compact form
        for (i = 0; i < len; i++)
            uuid[i] = chars[0 | Math.random() * radix];
    }
    else
    {
        // rfc4122, version 4 form
        var r;
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        
        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++)
        {
            if (!uuid[i])
            {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    if(containTime==null && containTime==true)
    	return now.getTime()+""+uuid.join('');
    else
    	return uuid.join('');
}

/**
 * 校验数据
 * @param checkId formid
 * @param options 参数，可为空
 * @returns 校验结果
 */
function checkDate(checkId,options){
	if(options==null) options={};
	
	var retMsg="";
	var checkItems=$("#"+checkId+" [check]");
	if(null==checkItems || checkItems==0) return retMsg;
	
	for(var i=0;i<checkItems.length;i++){
		var checkItem=checkItems[i];
		var value=$(checkItem).val();
		var checkStr=$(checkItem).attr("check");
		var check=eval("("+checkStr+")");
		if(!isEmpty(check.require)){
			if(isEmpty(value)){
				retMsg+=check.require;
			}
		}
		if(!isEmpty(value)){
			if(!isEmpty(check.phone)){
				var re = /^1\d{10}$/;
				if(!re.test(value)){
					retMsg+=check.phone;
				}
			}
			if(!isEmpty(check.email)){
				var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
				if(!re.test(value)){
					retMsg+=check.email;
				}
			}
			if(!isEmpty(check.number)){
				if(isNaN(value)){
					retMsg+=check.number;
				}
			}
		}
	}
	return retMsg;
}

/**
 * 数转化为中文数
 * @param Num
 * @returns
 */
function ChangeRMBToCH(Num) {
	Num=Num+"";
	for (i = Num.length - 1; i >= 0; i--) {
		Num = Num.replace(",", "")//替换tomoney()中的"," 
		Num = Num.replace(" ", "")//替换tomoney()中的空格 
	}
	Num = Num.replace("￥", "")//替换掉可能出现的￥字符 
	if (isNaN(Num)) { //验证输入的字符是否为数字 
		alert("请检查小写金额是否正确");
		return "";
	}
	//---字符处理完毕，开始转换，转换采用前后两部分分别转换---// 
	part = String(Num).split(".");
	newchar = "";
	//小数点前进行转化 
	for (i = part[0].length - 1; i >= 0; i--) {
		if (part[0].length > 10) {
			alert("位数过大，无法计算");
			return "";
		}//若数量超过拾亿单位，提示 
		tmpnewchar = ""
		perchar = part[0].charAt(i);
		switch (perchar) {
		case "0":
			tmpnewchar = "零" + tmpnewchar;
			break;
		case "1":
			tmpnewchar = "壹" + tmpnewchar;
			break;
		case "2":
			tmpnewchar = "贰" + tmpnewchar;
			break;
		case "3":
			tmpnewchar = "叁" + tmpnewchar;
			break;
		case "4":
			tmpnewchar = "肆" + tmpnewchar;
			break;
		case "5":
			tmpnewchar = "伍" + tmpnewchar;
			break;
		case "6":
			tmpnewchar = "陆" + tmpnewchar;
			break;
		case "7":
			tmpnewchar = "柒" + tmpnewchar;
			break;
		case "8":
			tmpnewchar = "捌" + tmpnewchar;
			break;
		case "9":
			tmpnewchar = "玖" + tmpnewchar;
			break;
		}
		switch (part[0].length - i - 1) {
		case 0:
			tmpnewchar = tmpnewchar + "元";
			break;
		case 1:
			if (perchar != 0)
				tmpnewchar = tmpnewchar + "拾";
			break;
		case 2:
			if (perchar != 0)
				tmpnewchar = tmpnewchar + "佰";
			break;
		case 3:
			if (perchar != 0)
				tmpnewchar = tmpnewchar + "仟";
			break;
		case 4:
			tmpnewchar = tmpnewchar + "万";
			break;
		case 5:
			if (perchar != 0)
				tmpnewchar = tmpnewchar + "拾";
			break;
		case 6:
			if (perchar != 0)
				tmpnewchar = tmpnewchar + "佰";
			break;
		case 7:
			if (perchar != 0)
				tmpnewchar = tmpnewchar + "仟";
			break;
		case 8:
			tmpnewchar = tmpnewchar + "亿";
			break;
		case 9:
			tmpnewchar = tmpnewchar + "拾";
			break;
		}
		newchar = tmpnewchar + newchar;
	}
	//小数点之后进行转化 
	if (Num.indexOf(".") != -1) {
		if (part[1].length > 2) {
//			alert("小数点之后只能保留两位,系统将自动截段");
			part[1] = part[1].substr(0, 2)
		}
		for (i = 0; i < part[1].length; i++) {
			tmpnewchar = ""
			perchar = part[1].charAt(i)
			switch (perchar) {
			case "0":
				tmpnewchar = "零" + tmpnewchar;
				break;
			case "1":
				tmpnewchar = "壹" + tmpnewchar;
				break;
			case "2":
				tmpnewchar = "贰" + tmpnewchar;
				break;
			case "3":
				tmpnewchar = "叁" + tmpnewchar;
				break;
			case "4":
				tmpnewchar = "肆" + tmpnewchar;
				break;
			case "5":
				tmpnewchar = "伍" + tmpnewchar;
				break;
			case "6":
				tmpnewchar = "陆" + tmpnewchar;
				break;
			case "7":
				tmpnewchar = "柒" + tmpnewchar;
				break;
			case "8":
				tmpnewchar = "捌" + tmpnewchar;
				break;
			case "9":
				tmpnewchar = "玖" + tmpnewchar;
				break;
			}
			if (i == 0)
				tmpnewchar = tmpnewchar + "角";
			if (i == 1)
				tmpnewchar = tmpnewchar + "分";
			newchar = newchar + tmpnewchar;
		}
	}
	if (newchar.search("分") != -1) {
		newchar = newchar.replace("零角", "零");
	}
	//替换所有无用汉字 
	while (newchar.search("零零") != -1)
		newchar = newchar.replace("零零", "零");
	newchar = newchar.replace("零亿", "亿");
	newchar = newchar.replace("亿万", "亿");
	newchar = newchar.replace("零万", "万");
	newchar = newchar.replace("零元", "");
	newchar = newchar.replace("零角", "");
	newchar = newchar.replace("零分", "");
	if (newchar.charAt(newchar.length - 1) == "元"
		|| newchar.charAt(newchar.length - 1) == "角"){
				newchar = newchar + "整";
	}else if(newchar.charAt(newchar.length - 1) == "分"	){
				newchar = newchar + "";
	}else{
				newchar = newchar + "元整";
	}
	return newchar;
}

/*公共函数*/
function getRequest() {
    var url = location.search; //获取url中"?"符后的字串
	
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        if (str.indexOf("&") != -1) {
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }

        } else {
            var key = str.substring(0, str.indexOf("="));
            var value = str.substr(str.indexOf("=") + 1);
            theRequest[key] = decodeURI(value);
        }
    }
    return theRequest;
}

function postUrl(url){
	var fromStr="<form id='{id}' action='{action}' method='post'>{formBody}</form>";
	var inputModel="<input type='hidden' name='{name}' value='{value}'>";
	var formBodyStr="";
	var action=url;
	var paramStr="";
	var formId=uuid(8);
	
	var paramIdx=url.indexOf('?');
	if(paramIdx>-1){
		action=url.substring(0,paramIdx);
		paramStr=url.substring(paramIdx+1);
	}
	fromStr=fromStr.replace("{id}",formId);
	fromStr=fromStr.replace("{action}",action);
	if(""!=paramStr){
		var paramArr=paramStr.split("&");
		for(var i=0;i<paramArr.length;i++){
			var paramItem=paramArr[i].split("=");
			formBodyStr+=inputModel.replace("{name}",paramItem[0]).replace("{value}",paramItem[1]);
		}
	}
	fromStr=fromStr.replace("{formBody}",formBodyStr);
	$("body").append(fromStr);
	$("#"+formId).submit();
}

/** 使用doT引擎生成html文件 **/
function makeHtmlByDoT(data, tagId, tmplId){
	var arrText = doT.template($("#"+tmplId).text());
	$("#"+tagId).html(arrText(data));
}

/**jquery将表单序列化json对象**/
(function($){  
    $.fn.serializeJson=function(){  
        var serializeObj={};  
        var array=this.serializeArray();  
        var str=this.serialize();  
        $(array).each(function(){  
            if(serializeObj[this.name]){  
                if($.isArray(serializeObj[this.name])){  
                    serializeObj[this.name].push(this.value);  
                }else{  
                    serializeObj[this.name]=[serializeObj[this.name],this.value];  
                }  
            }else{  
                serializeObj[this.name]=this.value;   
            }  
        });  
        return serializeObj;  
    };  
})(jQuery);

/**
 * 获取float的数据
 * @param val
 * @returns
 */
function getFloat(val,scale){
	if(isEmpty(scale))scale=2;
	
	if(isEmpty(val)){
		val=0.00;
	}else{
		if(isNaN(val)){
			val=val.replace(/,/g, "");
		}
		val=parseFloat(val);
	} 
	val=val.toFixed(scale)*1;

	return val;
}
