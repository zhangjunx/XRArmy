initBuildingSelect();
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
			obj.house_id=getUrlParam("id");
			obj=JSON.stringify(obj);
			method="PATCH";
	     }
	     $.ajax({
	    	url:url+'?action=house',
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
	 form.verify({
		  phone: function(value){
		 	    var reg=/^1[3456789]\d{9}$/;
		         if(!reg.test(value)){
		           return '请正确输入手机号!';
		         }
		       },
		   idNumber:function(value){
			   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			   if(!reg.test(value)){
			     return '请正确输入身份证号!';
			   }
		   }
	 })
	 
	
})

//编辑时获取一条信息
function getOneInfo(){
	$.ajax({
		url:url+"?action=house",
		type:"GET",
		data:{"house_id":getUrlParam("id")},
		headers: {
				Accept: "application/json; charset=utf-8",
				Authorization:$.cookie("token")
		},
		async:false,
		success:function(data){
			console.log(data);
			if(data.code == 200){
				 $("#house_number").val(data.data.house_number);
				 $("#house_name").val(data.data.house_name);
				 $("#house_phone").val(data.data.house_phone);
				 $("#house_id_number").val(data.data.house_id_number);
				 $("#house_building_id").val(data.data.house_building_id);
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render('checkbox');
				})
			}
		}
	})
}
//获取楼栋数据，初始化下拉框
function initBuildingSelect(){
	$.ajax({
		url:url+"?action=building",
		type:"GET",
		headers: {
				Accept: "application/json; charset=utf-8",
				Authorization:$.cookie("token")
		},
		async:false,
		success:function(res){
			$("#house_building_id option").find("not:first").remove();
			if(res.code == 200){
				for(var item of res.data){
					var $opt=$("<option value="+item.building_id+">"+item.building_name+"</option>");
					$("#house_building_id").append($opt);
				}
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render('checkbox');
				})
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