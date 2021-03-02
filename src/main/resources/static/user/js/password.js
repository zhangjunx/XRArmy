//密码的显示与隐藏
$("#eyesHide").click(function(){
	if($("#oldPassword").attr("type")=="password"){
        $("#oldPassword")[0].type="text";
        $("#eyesShow").show();
        $("#eyesHide").hide();
    }
})

$("#eyesShow").click(function(){
    if($("#oldPassword").attr("type")=="text"){
        $("#oldPassword")[0].type="password";
        $("#eyesShow").hide();
        $("#eyesHide").show();
    }
});

$("#eyesHide2").click(function(){
	if($("#newPassword").attr("type")=="password"){
        $("#newPassword")[0].type="text";
        $("#eyesShow2").show();
        $("#eyesHide2").hide();
    }
})

$("#eyesShow2").click(function(){
    if($("#newPassword").attr("type")=="text"){
        $("#newPassword")[0].type="password";
        $("#eyesShow2").hide();
        $("#eyesHide2").show();
    }
});

$("#eyesHide3").click(function(){
	if($("#reNewPassword").attr("type")=="password"){
        $("#reNewPassword")[0].type="text";
        $("#eyesShow3").show();
        $("#eyesHide3").hide();
    }
})

$("#eyesShow3").click(function(){
    if($("#reNewPassword").attr("type")=="text"){
        $("#reNewPassword")[0].type="password";
        $("#eyesShow3").hide();
        $("#eyesHide3").show();
    }
});




layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate = layui.laydate;
	 
	//监听提交按钮    
	 form.on('submit(setmypass)', function(data){
	     var obj=data.field;
		 obj.userid=window.top.loginid;
		 if($("#newPassword").val()!=$("#reNewPassword").val()){
			 layer.msg("新密码不一致!",{time:2000});
			 return;
		 }
	     $.ajax({
	    	//url:url+'?action=user&method=UpdatePassword',
	    	url:url+'/UserData/updatePass',
	    	type:"POST",
	    	data:obj,
	    	success:function(res){
	    		 console.log(res);
	    		 if(res.flag){
	    			 layer.msg(res.reason,{time:1000},function(){
	    				 window.location.reload();
	    			 })
	    		 }else{
	    			 layer.msg(res.reason,{time:2000});
	    		 }
	    	 }
	     })
    });
	/* 自定义验证规则 */
	form.verify({
	  pass: function(value){
			var reg=/^[\w]{6,12}$/;
			 if(!reg.test(value)){
			   return '请输入6到12位的字母或数字!';
			 }
		   }
	})
	
})

//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}
