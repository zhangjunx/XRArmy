if(getUrlParam("parentid") != undefined && getUrlParam("parentid") != null && getUrlParam("parentid") != "" && getUrlParam("parentid") != "0"){
	$("#parentid").attr("data-parentid",getUrlParam("parentid")).val(getUrlParam("parentname"));
}else if(getUrlParam("id") != undefined && getUrlParam("id") != null && getUrlParam("id") != ""){
	//编辑
	getOneInfo(getUrlParam("id"));
}
layui.use(["form","table","laydate","layer"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate = layui.laydate,
	 layer=layui.layer;
	  
	 
	 lay('.date').each(function() {
			laydate.render({
				elem : this,//元素
				trigger : 'click',//怎么触发
			});
	 });
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
	     var obj=data.field;
	     var pID=$("#parentid").attr("data-parentid");
	     obj.pID=pID;
	     obj.findex="";
	     obj.thisUserID=window.top.loginid;
	     if(getUrlParam("parentid") == 0){
	    	 obj.pID = 0;
	     }
	     console.log(obj);
	     var toggle="camera/area/addInfo";
	     if(getUrlParam("id") != undefined && getUrlParam("id") != null && getUrlParam("id") != ""){//编辑
	    	 toggle="camera/area/editInfo";
	    	 obj.code=getUrlParam("id");
	     }
	     $.ajax({
	    	 url:mapUrl+toggle,
	    	 type:"POST",
	    	 data:obj,
	    	 success:function(res){
	    		 console.log(res);
	    		 if(res.result){
					 layer.msg(res.msg,{time:1000},function(){
						 parent.layer.closeAll();
						 window.parent.location.reload();
					 })
	    		 }else{
						layer.msg(res.msg,{time:2000});
	    		 }
	    	 }
	     })
    });
	 //点击取消
	 $("#resetData").click(function(){
		parent.layer.closeAll();
	 })
})
//编辑时获取一条信息
function getOneInfo(id){
	$.ajax({
		url:mapUrl+"camera/area/getInfo",
		type:"POST",
		data:{"code":id},
		success:function(res){
			console.log(res)
			if(res.result){
				 $("#parentid").attr("data-parentid",res.data.pID);
				 $("#name").val(res.data.name);
				 $("#remark").val(res.data.remark);
			}
		}
	})
}
//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}