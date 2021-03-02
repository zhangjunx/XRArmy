getVender();
getType();
getDevice({"channelno":getUrlParam("id"),"loginid":window.top.loginid});
function initTable(arr){
	layui.use(["form","table"],function(){
		 var $ = layui.$,
		  form = layui.form,
		  table = layui.table;
		
		  //监听搜索
		  form.on('submit(LAY-user-front-search)', function(data){
		    var field = data.field;
		    field.dotid=getUrlParam("id");
		    getDevice(field);
		  });
		  table.render({
			    elem: '#LAY-user-manage',
			    cellMinWidth: 80,
			    cols:  [[
			    	  {type:"checkbox"},
			    	  {field:'ID', title:'序号', width:80, sort:true,templet:function(d){
						  return d.LAY_TABLE_INDEX+1
					  }},
					  {field:'devicename', title:'设备名称', width:150},
					  {field:'deviceno', title:'设备编号', width:120},
				      {field:'devicetype', title:'设备类型', width:120,sort:true},
					  {field:'devicevender', title:'设备厂家', width:120,sort:true},
					  {field:'devicemodel', title:'设备型号', width:120,sort:true},
					  {field:'devicesn', title:'设备SN', width:120,sort:true},
					  {field:'ip', title:'设备IP', width:120,sort:true},
					  {field:'port', title:'端口号', width:120,sort:true},
					  {field:'doorname', title:'安装位置', sort:true},
				    ]],
				    data:arr,
				    page: true
			  });
	})
}
//点击取消
$("#resetData").click(function(){
	//parent.layer.closeAll();
	var checkArr= layui.table.checkStatus('LAY-user-manage');
	var arr=[];//勾选的设备id  deviceno的值
	for(var item of checkArr.data){
		arr.push(item.deviceno);
	}
	var channelno=getUrlParam("id");//监控点的id  
	var obj={"channelno":channelno,"type":"dd","str":JSON.stringify(arr),"loginid":window.top.loginid};
	$.ajax({
		url:url+"/DeviceChannel/addBatch",
		type:"POST",
		data:obj,
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					if(getUrlParam("pannel") == 0){
						parent.location.reload();
					}else if(getUrlParam("pannel") == 1){
						parent.getCar();
					}
					
					parent.layer.closeAll();
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
})
//点击确定
$("#sure").click(function(){
	saveInfo();
})
//绑定设备 点确定时  提交的方法 
function saveInfo(){
	var checkArr= layui.table.checkStatus('LAY-user-manage');
	var arr=[];//勾选的设备id  deviceno的值
	for(var item of checkArr.data){
		arr.push(item.deviceno);
	}
	var channelno=getUrlParam("id");//监控点的id  
	var obj={"channelno":channelno,"type":"aa","str":JSON.stringify(arr),"loginid":window.top.loginid};
	$.ajax({
		url:url+"/DeviceChannel/addBatch",
		type:"POST",
		data:obj,
		success:function(data){
			console.log(data);
			if(data.flag){
				layer.msg(data.reason,{time:1000},function(){
					if(getUrlParam("pannel") == 0){
						parent.location.reload();
					}else if(getUrlParam("pannel") == 1){
						parent.getCar();
					}
					parent.layer.closeAll();
				})
			}else{
				layer.msg(data.reason,{time:2000});
			}
		}
	})
}
//获取设备列表
function getDevice(obj){
	$.ajax({
		url:url+"/DeviceChannel/getDevList",
		type:"POST",
		data:obj,
		success:function(data){
			console.log(data);
			var arr=[];
			if(data.flag){
				for(var item of data.result){
					if(item.id != ""&&item.id !=undefined && item.id !=null && item.id ==item.deviceno){
						item.LAY_CHECKED=true;
					}
					arr.push(item);
				}
			}
			initTable(arr);
		}
	})
}

//设备类型
function getType(){
	$.ajax({
		url:url+"/DictData/getList",
		type:"POST",
		data:{"itemname":"设备类型"},
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

//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}