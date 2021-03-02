if(window.top.loginid != "administrator"){
		$(".add").hide();
		for(var item of window.top.arr){
			$("a[data-id="+item+"]").show();
		}
}
var getOther;
var getLeave;
var getVisit;
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate=layui.laydate;
	  
	  /*lay('.date').each(function() {
	  	laydate.render({
	  		elem : this,//元素
			type:"datetime",
	  		trigger : 'click',//怎么触发
	  	});
	  });*/
	 
	 
	 getSoldier();//现役军人
	 
	  //监听搜索
	  form.on('submit(LAY-user-front-search)', function(data){
	    var field = data.field;
	    var index=$(".main-tab .label.curr").index();
	    if(index==0){//现役人员
	    	field.state="0";
	    	//执行重载
		    table.reload('LAY-user-manage', {
		      where: field
		    });
	    }else if(index==0){//其他人员
	    	field.state="1";
	    	//执行重载
		    table.reload('LAY-other-manage', {
		      where: field
		    });
	    }else if(index==0){//请假人员
	    	field.state="L";
	    	//执行重载
		    table.reload('LAY-leave-manage', {
		      where: field
		    });
	    }else if(index==0){//外来访客
	    	field.state="V";
	    	//执行重载
		    table.reload('LAY-visit-manage', {
		      where: field
		    });
	    }
	  });
	  
	  //现役军人
	  function getSoldier(){
		  table.render({
			    elem: '#LAY-user-manage',
			   url:url+'/IssueRecord/getSynHolder',
			   cellMinWidth: 80,
			   height: "full-232",
			   method:"POST",
			   request:{
			   	pageName:"curpage",
			   	limitName:"pagesize",
			   },
			   where:{
				   "state":"0"
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
			    cols: [[
			    	  {field:'ID', title:'序号', width:100,sort:true,templet:function(d){
						  return d.LAY_TABLE_INDEX+1
					  }},
					  {field:'holderno', title:'人员编号', width:200},
					  {field:'id', title:'记录ID', width:100},
					  {field:'holdername', title:'人员姓名', width:200},
					  {field:'photostr', title:'照片名称', width:200},
					  /*{field:'photo', title:'人员照片', width:200,sort:true,templet:function(d){
						  var photo=d.photo==undefined?"../img/add_img.png":d.photo;
						  if(photo!="../img/add_img.png" && photo.indexOf("data:image/")==-1){
							  photo="data:image/png;base64,"+d.photo;
						  } 
						  return "<img src="+photo+" style='width:100%;height:100%;object-fit:contain'>";
					  }},*/
				      {field:'createdate', title:'下发时间', width:200,sort:true},
					  {field:'message', title:'下发状态', width:200,sort:true,templet:function(d){
							  return "下发成功";
					  }},
					  {field:'boxip', title:'盒子名称', width:200,sort:true},
					  {field:'devicename', title:'设备名称', width:250,sort:true},
					  {field:'devicesn', title:'设备序列号', width:350,sort:true},
					  {fixed: 'right', title:'操作',width:250, templet:function(d){
						  var $a1="<a class='layui-btn layui-btn-warm layui-btn-xs layui-bg-gray'>移除权限</a>";
						  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>更新</a>";
						  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
						  if(d.synstatus == "更新"){
							  //先移除 在下发
							  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>更新</a>";
						  }else if(d.synstatus == "删除"){
							  //移除权限 并删除记录
							  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
						  } 
						  if(window.top.loginid != "administrator"){
							  for(var item of window.top.arr){
								  if(item == "下发"){//下发
									  $a1="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='del'>移除权限</a>";
									  if(d.synstatus == "更新"){
										  //先移除 在下发
										  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='update'>更新</a>";
									  }else if(d.synstatus == "删除"){
										  //移除权限 并删除记录
										  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='delete'>删除</a>";
									  }
								  }
							  }
						  }else{
							  $a1="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='del'>移除权限</a>";
							  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>更新</a>";
							  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
							  if(d.synstatus == "更新"){
								  //先移除 在下发
								  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='update'>更新</a>";
							  }else if(d.synstatus == "删除"){
								  //移除权限 并删除记录
								  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='delete'>删除</a>";
							  } 
						  }
						  return $a1+$a2+$a3;
					  }},
				    ]],
			     page: true,
			     limit:15,
				 limits:[15,20,30,40,50,60,70,80,90]
			  });
	  }
	  
	  
	   //其他人员
	  getOther=function(){
		  table.render({
			    elem: '#LAY-other-manage',
			   url:url+'/IssueRecord/getSynHolder',
			   cellMinWidth: 80,
			   height: "full-232",
			   method:"POST",
			   request:{
			   	pageName:"curpage",
			   	limitName:"pagesize",
			   },
			   where:{
				   "state":"1"
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
			    cols: [[
			    	  {field:'ID', title:'序号', width:100,sort:true,templet:function(d){
						  return d.LAY_TABLE_INDEX+1
					  }},
					  {field:'holderno', title:'人员编号', width:200},
					  {field:'id', title:'记录ID', width:100},
					  {field:'holdername', title:'人员姓名', width:200},
					  {field:'photostr', title:'照片名称', width:200},
					  /*{field:'photo', title:'人员照片', width:200,sort:true,templet:function(d){
						  var photo=d.photo==undefined?"../img/add_img.png":d.photo;
						  if(photo!="../img/add_img.png" && photo.indexOf("data:image/")==-1){
							  photo="data:image/png;base64,"+d.photo;
						  } 
						  return "<img src="+photo+" style='width:100%;height:100%;object-fit:contain'>";
					  }},*/
				      {field:'createdate', title:'下发时间', width:200,sort:true},
					  {field:'message', title:'下发状态', width:200,sort:true,templet:function(d){
							  return "下发成功";
					  }},
					  {field:'boxip', title:'盒子名称', width:200,sort:true},
					  {field:'devicename', title:'设备名称', width:250,sort:true},
					  {field:'devicesn', title:'设备序列号', width:350,sort:true},
					  {fixed: 'right', title:'操作',width:250, templet:function(d){
						  var $a1="<a class='layui-btn layui-btn-warm layui-btn-xs layui-bg-gray'>移除权限</a>";
						  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>更新</a>";
						  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
						  if(d.synstatus == "更新"){
							  //先移除 在下发
							  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>更新</a>";
						  }else if(d.synstatus == "删除"){
							  //移除权限 并删除记录
							  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
						  } 
						  if(window.top.loginid != "administrator"){
							  for(var item of window.top.arr){
								  if(item == "下发"){//下发
									  $a1="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='del'>移除权限</a>";
									  if(d.synstatus == "更新"){
										  //先移除 在下发
										  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='update'>更新</a>";
									  }else if(d.synstatus == "删除"){
										  //移除权限 并删除记录
										  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='delete'>删除</a>";
									  }
								  }
							  }
						  }else{
							  $a1="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='del'>移除权限</a>";
							  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>更新</a>";
							  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
							  if(d.synstatus == "更新"){
								  //先移除 在下发
								  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='update'>更新</a>";
							  }else if(d.synstatus == "删除"){
								  //移除权限 并删除记录
								  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='delete'>删除</a>";
							  } 
						  }
						  return $a1+$a2+$a3;
					  }},
				    ]],
			     page: true,
			     limit:15,
				 limits:[15,20,30,40,50,60,70,80,90]
			  });
	  }
	  
	  //请假人员
	  getLeave=function(){
		  table.render({
			    elem: '#LAY-leave-manage',
			   url:url+'/IssueRecord/getSynLeave',
			   cellMinWidth: 80,
			   height: "full-232",
			   method:"POST",
			   request:{
			   	pageName:"curpage",
			   	limitName:"pagesize",
			   },
			   where:{
				   "state":"L"
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
			    cols: [[
			    	{field:'ID', title:'序号', width:100,sort:true,templet:function(d){
						  return d.LAY_TABLE_INDEX+1
					  }},
					  {field:'holderno', title:'人员编号', width:200},
					  {field:'id', title:'记录ID', width:100},
					  {field:'holdername', title:'人员姓名', width:200},
					  {field:'photostr', title:'照片名称', width:200},
					  /*{field:'photo', title:'人员照片', width:200,sort:true,templet:function(d){
						  var photo=d.photo==undefined?"../img/add_img.png":d.photo;
						  if(photo!="../img/add_img.png" && photo.indexOf("data:image/")==-1){
							  photo="data:image/png;base64,"+d.photo;
						  } 
						  return "<img src="+photo+" style='width:100%;height:100%;object-fit:contain'>";
					  }},*/
				      {field:'createdate', title:'下发时间', width:200,sort:true},
					  {field:'message', title:'下发状态', width:200,sort:true,templet:function(d){
							  return "下发成功";
					  }},
					  {field:'boxip', title:'盒子名称', width:200,sort:true},
					  {field:'devicename', title:'设备名称', width:250,sort:true},
					  {field:'devicesn', title:'设备序列号', width:350,sort:true},
					  {fixed: 'right', title:'操作',width:250, templet:function(d){
						  var $a1="<a class='layui-btn layui-btn-warm layui-btn-xs layui-bg-gray'>移除权限</a>";
						  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
						  if(d.synstatus == "已同步"){
							  //移除权限
							  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>移除权限</a>";
						  }else if(d.synstatus == "删除"){
							  //移除权限 并删除记录
							  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
						  } 
						  if(window.top.loginid != "administrator"){
							  for(var item of window.top.arr){
								  if(item == "下发"){//下发
									  $a1="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='del'>移除权限</a>";
									  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
									  if(d.synstatus == "已同步"){
										  //先移除 在下发
										  $a1="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>移除权限</a>";
									  }else if(d.synstatus == "删除"){
										  //移除权限 并删除记录
										  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='delete'>删除</a>";
									  }
								  }
							  }
						  }else{
							  $a1="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='del'>移除权限</a>";
							  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
							  if(d.synstatus == "已同步"){
								  //先移除
								  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>移除权限</a>";
							  }else if(d.synstatus == "删除"){
								  //移除权限 并删除记录
								  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='delete'>删除</a>";
							  } 
						  }
						  return $a1+$a3;
					  }},
				    ]],
			     page: true,
			     limit:15,
				 limits:[15,20,30,40,50,60,70,80,90]
			  });
	  }
	  
	  
	  //外来访客
	  getVisit=function(){
		  table.render({
			    elem: '#LAY-visit-manage',
			   url:url+'/IssueRecord/getSynVisit',
			   cellMinWidth: 80,
			   height: "full-232",
			   method:"POST",
			   request:{
			   	pageName:"curpage",
			   	limitName:"pagesize",
			   },
			   where:{
				   "state":"V"
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
			    cols: [[
			    	{field:'ID', title:'序号', width:100,sort:true,templet:function(d){
						  return d.LAY_TABLE_INDEX+1
					  }},
					  {field:'holderno', title:'人员编号', width:200},
					  {field:'id', title:'记录ID', width:100},
					  {field:'holdername', title:'人员姓名', width:200},
					  {field:'photostr', title:'照片名称', width:200},
					  /*{field:'photo', title:'人员照片', width:200,sort:true,templet:function(d){
						  var photo=d.photo==undefined?"../img/add_img.png":d.photo;
						  if(photo!="../img/add_img.png" && photo.indexOf("data:image/")==-1){
							  photo="data:image/png;base64,"+d.photo;
						  } 
						  return "<img src="+photo+" style='width:100%;height:100%;object-fit:contain'>";
					  }},*/
				      {field:'createdate', title:'下发时间', width:200,sort:true},
					  {field:'message', title:'下发状态', width:200,sort:true,templet:function(d){
							  return "下发成功";
					  }},
					  {field:'boxip', title:'盒子名称', width:200,sort:true},
					  {field:'devicename', title:'设备名称', width:250,sort:true},
					  {field:'devicesn', title:'设备序列号', width:350,sort:true},
					  {fixed: 'right', title:'操作',width:250, templet:function(d){
						  var $a1="<a class='layui-btn layui-btn-warm layui-btn-xs layui-bg-gray'>移除权限</a>";
						  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
						  if(d.synstatus == "已同步"){
							  //先移除 在下发
							  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>移除权限</a>";
						  }else if(d.synstatus == "删除"){
							  //移除权限 并删除记录
							  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
						  } 
						  if(window.top.loginid != "administrator"){
							  for(var item of window.top.arr){
								  if(item == "下发"){//下发
									  $a1="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='del'>移除权限</a>";
									  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
									  if(d.synstatus == "已同步"){
										  //先移除 在下发
										  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>移除权限</a>";
									  }else if(d.synstatus == "删除"){
										  //移除权限 并删除记录
										  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='delete'>删除</a>";
									  }
								  }
							  }
						  }else{
							  $a1="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='del'>移除权限</a>";
							  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
							  if(d.synstatus == "已同步"){
								  //先移除 在下发
								  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>移除权限</a>";
							  }else if(d.synstatus == "删除"){
								  //移除权限 并删除记录
								  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='delete'>删除</a>";
							  } 
						  }
						  return $a1+$a2+$a3;
					  }},
				    ]],
			     page: true,
			     limit:15,
				 limits:[15,20,30,40,50,60,70,80,90]
			  });
	  }
	  
	  
	  //监听工具条 现役军人
	  table.on('tool(LAY-user-manage)', function(obj){
	  			var data = obj.data;
	      if(obj.event === 'delete'){
			  layer.confirm('确定删除?', function(index){
				  var type="";
  				  if(data.synstatus == "更新"){
  					type="uu";
  				  }else if(data.synstatus == "删除"){
  					type="dd";
  				  }
				  var obj1={"id":data.id,"state":"0","type":type,"holderno":data.holderno,
						  "holdername":data.holdername,"photostr":data.photostr,
						  "deviceno":data.deviceno,"loginid":window.top.loginid};
				$.ajax({
					url:url+'/IssueRecord/delete',
					type:"POST",
					data:obj1,
					success:function(res){
						console.log(res)
						layer.close(index);
						layer.msg(res.reason,{time:2000},function(){
							getSoldier();
						});
					}
				})
			  });
			}else if(obj.event === 'del'){
				layer.confirm('确定移除权限?', function(index){
					 var obj1={"id":data.id,"state":"0","type":"dd","holderno":data.holderno,
							  "holdername":data.holdername,"photostr":data.photostr,
							  "deviceno":data.deviceno,"loginid":window.top.loginid};
					$.ajax({
						url:url+'/IssueRecord/delete',
						type:"POST",
						data:obj1,
						success:function(res){
							console.log(res)
							layer.close(index);
							layer.msg(res.reason,{time:2000},function(){
								getSoldier();
							});
						}
					})
				  });
			}else if(obj.event === 'update'){
				layer.confirm('确定更新?', function(index){
					 var obj1={"id":data.id,"state":"0","type":"uu","holderno":data.holderno,
							  "holdername":data.holdername,"photostr":data.photostr,
							  "deviceno":data.deviceno,"loginid":window.top.loginid};
					$.ajax({
						url:url+'/IssueRecord/delete',
						type:"POST",
						data:obj1,
						success:function(res){
							console.log(res)
							layer.close(index);
							layer.msg(res.reason,{time:2000},function(){
								getSoldier();
							});
						}
					})
				  });
			}
	  });
	  
	  //监听工具条 其他人员
	  table.on('tool(LAY-other-manage)', function(obj){
	  			var data = obj.data;
	      if(obj.event === 'delete'){
			  layer.confirm('确定删除?', function(index){
				  var type="";
  				  if(data.synstatus == "更新"){
  					type="uu";
  				  }else if(data.synstatus == "删除"){
  					type="dd";
  				  }
				  var obj1={"id":data.id,"state":"0","type":type,"holderno":data.holderno,
						  "holdername":data.holdername,"photostr":data.photostr,
						  "deviceno":data.deviceno,"loginid":window.top.loginid};
				$.ajax({
					url:url+'/IssueRecord/delete',
					type:"POST",
					data:obj1,
					success:function(res){
						console.log(res)
						layer.close(index);
						layer.msg(res.reason,{time:2000},function(){
							getSoldier();
						});
					}
				})
			  });
			}else if(obj.event === 'del'){
				layer.confirm('确定移除权限?', function(index){
					  var obj1={"id":data.id,"state":"0","type":"dd","holderno":data.holderno,
							  "holdername":data.holdername,"photostr":data.photostr,
							  "deviceno":data.deviceno,"loginid":window.top.loginid};
					$.ajax({
						url:url+'/IssueRecord/delete',
						type:"POST",
						data:obj1,
						success:function(res){
							console.log(res)
							layer.close(index);
							layer.msg(res.reason,{time:2000},function(){
								getOther();
							});
						}
					})
				  });
			}else if(obj.event === 'update'){
				layer.confirm('确定更新?', function(index){
					  var obj1={"id":data.id,"state":"0","type":"uu","holderno":data.holderno,
							  "holdername":data.holdername,"photostr":data.photostr,
							  "deviceno":data.deviceno,"loginid":window.top.loginid};
					$.ajax({
						url:url+'/IssueRecord/delete',
						type:"POST",
						data:obj1,
						success:function(res){
							console.log(res)
							layer.close(index);
							layer.msg(res.reason,{time:2000},function(){
								getOther();
							});
						}
					})
				  });
			}
	  });
	  
	  //监听工具条 请假人员
	  table.on('tool(LAY-leave-manage)', function(obj){
	  			var data = obj.data;
	      if(obj.event === 'delete'){
			  layer.confirm('确定删除?', function(index){
				  var obj1={"id":data.id,"state":"0","type":"dd","holderno":data.holderno,
						  "holdername":data.holdername,"photostr":data.photostr,
						  "deviceno":data.deviceno,"loginid":window.top.loginid};
				$.ajax({
					url:url+'/IssueRecord/delete',
					type:"POST",
					data:obj1,
					success:function(res){
						console.log(res)
						layer.close(index);
						layer.msg(res.reason,{time:2000},function(){
							getLeave();
						});
					}
				})
			  });
			}else if(obj.event === 'del'){
				layer.confirm('确定移除权限?', function(index){
					var type="";
	  				  if(data.synstatus == "更新"){
	  					type="uu";
	  				  }else if(data.synstatus == "删除"){
	  					type="dd";
	  				  }
					var obj1={"id":data.id,"state":"0","type":type,"holderno":data.holderno,
							  "holdername":data.holdername,"photostr":data.photostr,
							  "deviceno":data.deviceno,"loginid":window.top.loginid};
					$.ajax({
						url:url+'/IssueRecord/setFace',
						type:"POST",
						data:obj1,
						success:function(res){
							console.log(res)
							layer.close(index);
							layer.msg(res.reason,{time:2000},function(){
								getLeave();
							});
						}
					})
				  });
			}else if(obj.event === 'update'){
				layer.confirm('确定更新?', function(index){
					var obj1={"id":data.id,"state":"0","type":"uu","holderno":data.holderno,
							  "holdername":data.holdername,"photostr":data.photostr,
							  "deviceno":data.deviceno,"loginid":window.top.loginid};
					$.ajax({
						url:url+'/IssueRecord/setFace',
						type:"POST",
						data:obj1,
						success:function(res){
							console.log(res)
							layer.close(index);
							layer.msg(res.reason,{time:2000},function(){
								getLeave();
							});
						}
					})
				  });
			}
	  });
	  
	  
	  //监听工具条 外来访客
	  table.on('tool(LAY-visit-manage)', function(obj){
	  			var data = obj.data;
	      if(obj.event === 'delete'){
			  layer.confirm('确定删除?', function(index){
				var obj1={"id":data.id,"state":"0","type":"dd","holderno":data.holderno,
						  "holdername":data.holdername,"photostr":data.photostr,
						  "deviceno":data.deviceno,"loginid":window.top.loginid};
				$.ajax({
					url:url+'/IssueRecord/delete',
					type:"POST",
					data:obj1,
					success:function(res){
						console.log(res)
						layer.close(index);
						layer.msg(res.reason,{time:2000},function(){
							getVisit();
						});
					}
				})
			  });
			}else if(obj.event === 'del'){
				layer.confirm('确定移除权限?', function(index){
					 var type="";
	  				  if(data.synstatus == "更新"){
	  					type="uu";
	  				  }else if(data.synstatus == "删除"){
	  					type="dd";
	  				  }
					var obj1={"id":data.id,"state":"0","type":"dd","holderno":data.holderno,
							  "holdername":data.holdername,"photostr":data.photostr,
							  "deviceno":data.deviceno,"loginid":window.top.loginid};
					$.ajax({
						url:url+'/IssueRecord/delete',
						type:"POST",
						data:obj1,
						success:function(res){
							console.log(res)
							layer.close(index);
							layer.msg(res.reason,{time:2000},function(){
								getVisit();
							});
						}
					})
				  });
			}
	  });
	  
	  
	//点击选项卡
	  $(".main-tab .label").click(function(){
		  	$(this).addClass("curr").siblings().removeClass("curr");
		  	var index=$(this).index();
		  	$(".layui-card-body").eq(index).show().siblings(".layui-card-body").hide();
		  	if(index==0){
		  		getSoldier();
		  	}else if(index==1){
		  		getOther();
		  	}else if(index==2){
		  		getLeave();
		  	}else if(index==3){
		  		getVisit();
		  	} 
	  })
	  
})


//点击新增
 $('#add').click(function(){
	 var index=$(".main-tab .label.curr").index();
	 if(index==0){
		 layer.open({
			 type:2,
			 title:"现役军人",
			 content:"soldier.html?state=0",
			 area:["90%","91%"],
		 })
	 }else if(index==1){
		 layer.open({
			 type:2,
			 title:"其他人员",
			 content:"soldier.html?state=1",
			 area:["90%","91%"],
		 })
	 }else if(index==2){
		 layer.open({
			 type:2,
			 title:"请假人员",
			 content:"leave.html",
			 area:["90%","91%"],
		 })
	 } else if(index==3){
		 layer.open({
			 type:2,
			 title:"外来访客",
			 content:"visit.html",
			 area:["90%","91%"],
		 })
	 }  
}); 
