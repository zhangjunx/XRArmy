if(window.top.loginid != "administrator"){
		$(".add").hide();
		for(var item of window.top.arr){
			$("a[data-id="+item+"]").show();
		}
	}
getType();//设备类型
layui.use(["form","table"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table;
	
	  //监听搜索
	  form.on('submit(LAY-user-front-search)', function(data){
	    var field = data.field;
	    //执行重载
	    table.reload('LAY-user-manage', {
	      where: field
	    });
	  });
	  table.render({
		    elem: '#LAY-user-manage',
		    url:url+'/DeviceUnit/getList',
		    cellMinWidth: 80,
		    height: "full-232",
		    method:"POST",
		    request:{
		    	pageName:"curpage",
		    	limitName:"pagesize",
		    },
		    parseData: function(res){ //res 即为原始返回的数据
		    	console.log(res);
		        return {
		          "code": res.flag==true?"0":"", //解析接口状态
		          "msg": res.reason, //解析提示文本
		          "count": res.count, //解析数据长度
		          "data": res.result //解析数据列表
		        };
		      },
		    cols:  [[
		    	  {type:"checkbox"},
		    	  {field:'ID', title:'序号', width:150, sort:true,templet:function(d){
					  return d.LAY_TABLE_INDEX+1
				  }},
				  {field:'devicename', title:'设备名称', width:300},
				  {field:'deviceno', title:'设备编号', width:200},
			      {field:'devicetype', title:'设备类型', width:200,sort:true},
				  {field:'devicevender', title:'设备厂家', width:200,sort:true},
				  //{field:'devicemodel', title:'设备型号', width:200,sort:true},
				  {field:'devicesn', title:'设备SN', width:450,sort:true},
				  {field:'ip', title:'设备IP', width:200,sort:true},
				  {field:'port', title:'端口号', width:200,sort:true},
				  {field:'username', title:'设备账号', width:200,sort:true},
				  /*{field:'userpass', title:'设备密码', width:200,sort:true,templet:function(d){
					  return "******";
				  }},*/
				  {field:'doorname', title:'安装位置', width:350,sort:true},
				  {field:'iostatus', title:'进出状态', width:200,sort:true,templet:function(d){
					  if(d.iostatus ==11){
						  return "进入";
					  }else if(d.iostatus ==12){
						  return "外出";
					  }else{
						  return "";
					  } 
				  }},
				 /* {field:'netstate', title:'网络状态', width:150,sort:true,templet:function(d){
					  if(d.netstate ==0){
						  return "正常";
					  }else{
						  return "异常";
					  } 
				  }},
				  {field:'online', title:'在线状态', width:120,sort:true,templet:function(d){
					  if(d.online ==0){
						  return "在线";
					  }else{
						  return "离线";
					  }
				  }},*/
				  {field:'enabled', title:'是否启用', width:150,sort:true,templet:function(d){
					  if(d.enabled ==0){
						  return "启用";
					  }else{
						  return "禁用";
					  }
				  }},
				  {field:'boxid', title:'所属盒子IP', width:200,sort:true},
				  {field:'channelno', title:'所属通道', width:200,sort:true,templet:function(d){
			    	  var arr=[];
			    	  if(d.arr==undefined || d.arr==""){
			    		  return "";
			    	  }else{
			    		  for(var item of d.arr){
			    			  if(item.id!=undefined && item.id!=null && item.id!='' && item.id==item.channelno){
			    				  arr.push(item.channelname);
			    			  }
			    		  }
			    		  return arr.join(",");
			    	  }
			      }},
			      {fixed: 'right', title:'操作',width:350, templet:function(){
					  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>编辑</a>";
					  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
					  var $a4="<a class='layui-btn layui-btn-warm layui-btn-xs layui-bg-gray'>选择通道</a>";
					  
					  if(window.top.loginid != "administrator"){
						  for(var item of window.top.arr){
							  if(item == "编辑"){//编辑
								  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
							  }else if(item == "删除"){//删除
								  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
							  }else if(item == "选择通道"){//选择通道
								  $a4="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='setChannel'>选择通道</a>";
							  }
						  }
					  }else{
						  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
						  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
						  $a4="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='setChannel'>选择通道</a>";
					  }
					  
					  return $a2+$a4+$a3;
				  }},
			    ]],
		      page: true,
			  limit:15,
		      limits:[15,20,30,40,50,60,70,80,90]
		  });
		  
		  //监听工具条
		  table.on('tool(LAY-user-manage)', function(obj){
		  			var data = obj.data;
		   if(obj.event === 'del'){
		  			  layer.confirm('确定删除?', function(index){
		  				$.ajax({
		  					url:url+'/DeviceUnit/delete?deviceno='+data.deviceno,
		  					type:"POST",
		  					success:function(res){
		  						console.log(res)
		  						layer.close(index);
		  						if(res.flag){
		  							layer.msg(res.reason,{time:1000},function(){
		  								 obj.del();
		  							})
		  						}else{
		  							layer.msg(res.reason,{time:2000});
		  						}
		  					}
		  				})
		  			  });
		  			}else if(obj.event === 'edit'){
		  				 layer.open({
		  					 type:2,
		  					 title:"修改",
		  					 content:"deviceManage_add.html?id="+data.deviceno,
		  					 area:["90%","91%"],
		  				 })
		  			}else if(obj.event === 'setChannel'){
		  				layer.open({
		  					 type:2,
		  					 title:"选择通道",
		  					 content:"pass-layer.html?id="+data.deviceno,
		  					 area:["90%","91%"],
		  				 })
		  			}
		  });
		  
})
//点击新增
 $('#add').click(function(){
	 layer.open({
		 type:2,
		 title:"添加设备",
		 content:"deviceManage_add.html",
		 area:["90%","91%"],
	 })
});


//点击同步新增设备到盒子
$('#addSys').click(function(){
	var checkArr= layui.table.checkStatus('LAY-user-manage');
	var arr=[];
	for(var item of checkArr.data){
		arr.push(item.deviceno);
	}
	if(arr.length==0){
		layer.msg("请选择要同步的设备",{time:2000});
		return;
	}
	var obj={"str":JSON.stringify(arr),"loginid":window.top.loginid};
	$.ajax({
		url:url+"/PlatBox/addDev",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(res){
			console.log(res);
			layer.msg(res.reason,{time:2000});
		}
	})
});



//点击同步删除设备到盒子
$('#delSys').click(function(){
	var checkArr= layui.table.checkStatus('LAY-user-manage');
	var arr=[];
	for(var item of checkArr.data){
		arr.push(item.deviceno);
	}
	if(arr.length==0){
		layer.msg("请选择要同步的设备",{time:2000});
		return;
	}
	var obj={"str":JSON.stringify(arr),"loginid":window.top.loginid};
	$.ajax({
		url:url+"/PlatBox/delDev",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(res){
			console.log(res);
			layer.msg(res.reason,{time:2000});
		}
	})
});

//点击同步更新设备到盒子
$('#editSys').click(function(){
	var checkArr= layui.table.checkStatus('LAY-user-manage');
	var arr=[];
	for(var item of checkArr.data){
		arr.push(item.deviceno);
	}
	if(arr.length==0){
		layer.msg("请选择要同步的设备",{time:2000});
		return;
	}
	var obj={"str":JSON.stringify(arr),"loginid":window.top.loginid};
	$.ajax({
		url:url+"/PlatBox/editDev",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(res){
			console.log(res);
			layer.msg(res.reason,{time:2000});
		}
	})
});

//点击同步查询设备到盒子
$('#getSys').click(function(){
	var checkArr= layui.table.checkStatus('LAY-user-manage');
	var arr=[];
	for(var item of checkArr.data){
		arr.push(item.deviceno);
	}
	var obj={"str":JSON.stringify(arr),"loginid":window.top.loginid};
	$.ajax({
		url:url+"/PlatBox/getDev",
		type:"POST",
		data:obj,
		dataType:"json",
		success:function(res){
			console.log(res);
			layer.msg(res.reason,{time:2000});
		}
	})
});

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

 