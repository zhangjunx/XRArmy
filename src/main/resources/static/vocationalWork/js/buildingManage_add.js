if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
	getOneInfo();
}
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate = layui.laydate;
	 
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
	     var obj=data.field;
		 var method="POST";
		 if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
			obj.building_id=getUrlParam("id");
			obj=JSON.stringify(obj);
			method="PATCH";
		 }
	     $.ajax({
	    	 url:url+'?action=building',
	    	type:method,
	    	data:obj,
	    	headers:{
				Accept: "application/json; charset=utf-8",
	    		Authorization:$.cookie("token")
	    	},
	    	 success:function(res){
	    		 console.log(res);
	    		 if(res.code == 200){
	    			 layer.msg(res.message,{time:1000},function(){
	    				 parent.layer.closeAll();
	    				 window.parent.location.reload();
	    			 })
	    		 }else{
	    			 layer.msg(res.message,{time:2000});
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
function getOneInfo(){
	$.ajax({
		url:url+"?action=building",
		type:"GET",
		data:{"building_id":getUrlParam("id")},
		headers: {
				Accept: "application/json; charset=utf-8",
				Authorization:$.cookie("token")
		},
		success:function(data){
			if(data.code == 200){
				 $("#building_name").val(data.data.building_name);
				 $("#building_household").val(data.data.building_household);
				 $("#building_person_number").val(data.data.building_person_number);
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