getVender();//设备厂家
getType();//设备类型
getModel();//设备型号
getBox();//设备所属盒子
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
				type: 'datetime'
			});
	 });
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
	     var obj=data.field;
	    var toggle="/DeviceUnit/insert";
	    if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
			obj.deviceno=getUrlParam("id");
			toggle="/DeviceUnit/update";
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
		url:url+"/DeviceUnit/getList",
		type:"POST",
		data:{"deviceno":getUrlParam("id")},
		success:function(data){
			console.log(data)
			if(data.flag){
				var res=data.result[0];
				 $("#deviceno").val(res.deviceno);
				 $("#devicename").val(res.devicename);
				 $("#devicetype option[value="+res.devicetype+"]").attr("selected",true);
				  $("#devicevender option[value="+res.devicevender+"]").attr("selected",true);
				  $("#devicemodel option[value="+res.devicemodel+"]").attr("selected",true);
				  $("#devicesn").val(res.devicesn);
				  $("#ip").val(res.ip);
				  $("#port").val(res.port);
			      $("#username").val(res.username);
				  $("#userpass").val(res.userpass);
				  $("#doorname").val(res.doorname);
				  $("#iostatus option[value="+res.iostatus+"]").attr("selected",true);
				  $("#enabled input[value="+res.enabled+"]").attr("checked",true);
				  $("#boxid").val(res.boxid);
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render();
				})
			}
		}
	})
}


//设备类型
function getType(){
	$.ajax({
		url:url+"/DictData/getList",
		type:"POST",
		data:{"itemname":"设备类型"},
		async:false,
		success:function(data){
			console.log(data)
			$("#devicetype option:not(:first)").remove();
			if(!data.flag){
				return;
			}
			
			var html="";
			$.each(data.result,function(i,val){
				html+="<option value='"+val.name+"'>"+val.name+"</option>";
			})
			$("#devicetype").append(html);
			layui.use("form",function(){
				var form=layui.form;
				form.render();
			})
		}
	})
}

//设备厂家
function getVender(){
	$.ajax({
		url:url+"/DictData/getList",
		type:"POST",
		data:{"itemname":"设备厂家"},
		async:false,
		success:function(data){
			console.log(data)
			$("#devicevender option:not(:first)").remove();
			if(!data.flag){
				return;
			}
			var html="";
			$.each(data.result,function(i,val){
				html+="<option value='"+val.name+"'>"+val.name+"</option>";
			})
			$("#devicevender").append(html);
			layui.use("form",function(){
				var form=layui.form;
				form.render();
			})
		}
	})
}

//设备型号
function getModel(){
	$.ajax({
		url:url+"/DictData/getList",
		type:"POST",
		data:{"itemname":"设备型号"},
		async:false,
		success:function(data){
			console.log(data)
			$("#devicemodel option:not(:first)").remove();
			if(!data.flag){
				return;
			}
			
			var html="";
			$.each(data.result,function(i,val){
				html+="<option value='"+val.name+"'>"+val.name+"</option>";
			})
			$("#devicemodel").append(html);
			layui.use("form",function(){
				var form=layui.form;
				form.render();
			})
		}
	})
}

//所属盒子IP
function getBox(){
	$.ajax({
		url:url+"/BoxData/getList",
		type:"POST",
		dataType:"json",
		success:function(data){
			console.log(data)
			$("#boxid option:not(:first)").remove();
			if(!data.flag){
				return;
			}
			var html="";
			$.each(data.result,function(i,val){
				html+="<option value='"+val.boxip+"'>"+val.boxip+"</option>";
			})
			$("#boxid").append(html);
			layui.use("form",function(){
				var form=layui.form;
				form.render();
			})
		}
	})
}

//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}