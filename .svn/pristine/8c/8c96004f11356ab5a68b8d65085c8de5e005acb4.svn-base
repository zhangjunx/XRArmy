if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
	getOneInfo();
}
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate = layui.laydate;
	  
	 lay('.date').each(function() {
			laydate.render({
				elem : this,//元素
				trigger : 'click',//怎么触发
			});
	 });
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
	     var obj=data.field;
		 var toggle="/ACL_Role/insert";
		 if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
				obj.id=getUrlParam("id");
				toggle="/ACL_Role/update";
		 }
	     $.ajax({
	    	 url:url+toggle,
	    	 type:"POST",
	    	 data:obj,
	    	 success:function(res){
	    		 console.log(res);
	    		 if(res.flag){
	    			 layer.msg(res.reason,{time:1000},function(){
	    				 parent.layer.closeAll();
	    				 window.parent.location.reload();
	    			 })
	    		 }else{
	    			 layer.msg(res.reason,{time:2000});
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
		url:url+"/ACL_Role/getList",
		type:"POST",
		data:{"id":getUrlParam("id")},
		success:function(data){
			console.log(data)
			if(data.flag){
				var res=data.result[0];
				 $("#name").val(res.name);
				 $("#remark").val(res.remark);
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