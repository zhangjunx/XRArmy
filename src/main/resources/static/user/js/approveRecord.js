layui.use(["form","table"],function(){
	 var $ = layui.$;
	 var form = layui.form;
	 var table = layui.table;
	 getLeave();//请假申请
	 
	  //监听搜索  请假申请
	  form.on('submit(leaveSearch)', function(data){
	    var field = data.field;
	  //执行重载
	    table.reload('LAY-leave-manage', {
	      where: field
	    });
	  });
	//监听搜索  出差申请
	  form.on('submit(businessSearch)', function(data){
	    var field = data.field;
	  //执行重载
	    table.reload('LAY-business-manage', {
	      where: field
	    });
	  });
	//监听搜索  休假申请
	  form.on('submit(holidaySearch)', function(data){
	    var field = data.field;
	  //执行重载
	    table.reload('LAY-holiday-manage', {
	      where: field
	    });
	  });
		//监听搜索  加班申请
	  form.on('submit(overtimeSearch)', function(data){
	    var field = data.field;
	  //执行重载
	    table.reload('LAY-overtime-manage', {
	      where: field
	    });
	  });
		//监听搜索  其它申请
	  form.on('submit(otherSearch)', function(data){
	    var field = data.field;
	  //执行重载
	    table.reload('LAY-other-manage', {
	      where: field
	    });
	  });
		//监听搜索  派车申请
	  form.on('submit(dispatchSearch)', function(data){
	    var field = data.field;
	  //执行重载
	    table.reload('LAY-dispatch-manage', {
	      where: field
	    });
	  });
	//监听搜索  会议申请
	  form.on('submit(meetingSearch)', function(data){
	    var field = data.field;
	  //执行重载
	    table.reload('LAY-meeting-manage', {
	      where: field
	    });
	  });
	 
	//请假申请
	  function getLeave(){
	  	 table.render({
	  		    elem: '#LAY-leave-manage',
	  		    url:url+'?action=car',
	  		    cellMinWidth: 80,
	  		    method:"POST",
	  		    request:{
	  		    	pageName:"page",
	  		    	limitName:"pageSize",
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
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  			      {field:'car_cp_cllor', title:'姓名', width:120,sort:true},
	  			      {field:'car_cllor', title:'所属单位', width:120,sort:true},
	  			      {field:'car_type', title:'具体单位', width:120,sort:true},
	  				  {field:'car_category', title:'军人证号', width:150,sort:true},
	  				  {field:'car_personnel_name', title:'请假类型', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'请假事由', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'申请时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'开始时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'结束时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'备注', width:150,sort:true},
	  				  {fixed:'right',title:'状态', width:200}
	  			    ]]
	  		    ,page: true
	  		  });
	  }
	  //出差申请
	  function getBusiness(){
	  	 table.render({
	  		    elem: '#LAY-business-manage',
	  		    url:url+'?action=car',
	  		    cellMinWidth: 80,
	  		    method:"POST",
	  		    request:{
	  		    	pageName:"page",
	  		    	limitName:"pageSize",
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
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  			      {field:'car_cp_cllor', title:'姓名', width:120,sort:true},
	  			      {field:'car_cp_cllor', title:'所属单位', width:120,sort:true},
	  			      {field:'car_cllor', title:'具体单位', width:120,sort:true},
	  			      {field:'car_type', title:'军人证号', width:120,sort:true},
	  				  {field:'car_category', title:'出差地点', width:150,sort:true},
	  				  {field:'car_personnel_name', title:'详细地址', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'申请时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'开始时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'结束时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'备注', width:150,sort:true},
	  				  {fixed:'right',title:'状态', width:200}
	  			    ]]
	  		    ,page: true
	  		  });
	  }
	  //休假申请
	  function getHoliday(){
	  	 table.render({
	  		    elem: '#LAY-holiday-manage',
	  		    url:url+'?action=car',
	  		    cellMinWidth: 80,
	  		    method:"POST",
	  		    request:{
	  		    	pageName:"page",
	  		    	limitName:"pageSize",
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
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  			      {field:'car_cp_cllor', title:'姓名', width:120,sort:true},
	  			      {field:'car_cp_cllor', title:'所属单位', width:120,sort:true},
	  			      {field:'car_cllor', title:'具体单位', width:120,sort:true},
	  			      {field:'car_type', title:'军人证号', width:120,sort:true},
	  				  {field:'car_category', title:'休假类型', width:150,sort:true},
	  				  {field:'car_personnel_name', title:'申请时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'开始时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'结束时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'备注', width:150,sort:true},
	  				  {fixed:'right',title:'状态', width:200}
	  			    ]]
	  		    ,page: true
	  		  });
	  }
	  //加班申请
	  function getOvertime(){
	  	 table.render({
	  		    elem: '#LAY-overtime-manage',
	  		    url:url+'?action=car',
	  		    cellMinWidth: 80,
	  		    method:"POST",
	  		    request:{
	  		    	pageName:"page",
	  		    	limitName:"pageSize",
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
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  			      {field:'car_cp_cllor', title:'姓名', width:120,sort:true},
	  			      {field:'car_cp_cllor', title:'所属单位', width:120,sort:true},
	  			      {field:'car_cllor', title:'具体单位', width:120,sort:true},
	  			      {field:'car_type', title:'军人证号', width:120,sort:true},
	  				  {field:'car_category', title:'加班事由', width:150,sort:true},
	  				  {field:'car_personnel_name', title:'申请时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'开始时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'结束时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'备注', width:150,sort:true},
	  				  {fixed:'right',title:'状态', width:200}
	  			    ]]
	  		    ,page: true
	  		  });
	  }
	  //其他申请
	  function getOther(){
	  	 table.render({
	  		    elem: '#LAY-other-manage',
	  		    url:url+'?action=car',
	  		    cellMinWidth: 80,
	  		    method:"POST",
	  		    request:{
	  		    	pageName:"page",
	  		    	limitName:"pageSize",
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
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  			      {field:'car_cp_cllor', title:'姓名', width:120,sort:true},
	  			      {field:'car_cp_cllor', title:'所属单位', width:120,sort:true},
	  			      {field:'car_cllor', title:'具体单位', width:120,sort:true},
	  			      {field:'car_type', title:'军人证号', width:120,sort:true},
	  				  {field:'car_category', title:'申请内容', width:150,sort:true},
	  				  {field:'car_personnel_name', title:'申请时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'开始时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'结束时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'备注', width:150,sort:true},
	  				  {fixed:'right',title:'状态', width:200}
	  			    ]]
	  		    ,page: true
	  		  });
	  }

	  //派车申请
	  function getDispatch(){
	  	 table.render({
	  		    elem: '#LAY-dispatch-manage',
	  		    url:url+'?action=car',
	  		    cellMinWidth: 80,
	  		    method:"POST",
	  		    request:{
	  		    	pageName:"page",
	  		    	limitName:"pageSize",
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
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  			      {field:'car_cp_cllor', title:'派车单单号', width:120,sort:true},
	  			      {field:'car_cp_cllor', title:'驾驶员', width:120,sort:true},
	  			      {field:'car_cllor', title:'用车单位', width:120,sort:true},
	  			      {field:'car_type', title:'车辆类别', width:120,sort:true},
	  				  {field:'car_category', title:'车辆用途', width:150,sort:true},
	  				  {field:'car_personnel_name', title:'报到地点', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'申请时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'出车时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'返回时间', width:150,sort:true},
	  				  {fixed:'right',title:'状态', width:200}
	  			    ]]
	  		    ,page: true
	  		  });
	  }
	  //会议申请
	  function getMeetings(){
	  	 table.render({
	  		    elem: '#LAY-meeting-manage',
	  		    url:url+'?action=car',
	  		    cellMinWidth: 80,
	  		    method:"POST",
	  		    request:{
	  		    	pageName:"page",
	  		    	limitName:"pageSize",
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
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  			      {field:'car_cp_cllor', title:'会议类型', width:120,sort:true},
	  			      {field:'car_cp_cllor', title:'会议主题', width:120,sort:true},
	  			      {field:'car_cllor', title:'召集人', width:120,sort:true},
	  			      {field:'car_type', title:'主持人', width:120,sort:true},
	  				  {field:'car_category', title:'会议室名称', width:150,sort:true},
	  				  {field:'car_personnel_name', title:'会议室位置', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'申请时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'开始时间', width:150,sort:true},
	  				  {field:'car_personnel_phone', title:'结束时间', width:150,sort:true},
	  				  {fixed:'right',title:'状态', width:200}
	  			    ]]
	  		    ,page: true
	  		  });
	  }
	  
	//点击选项卡
	  $(".main-tab .label").click(function(){
		  	$(this).addClass("curr").siblings().removeClass("curr");
		  	var index=$(this).index();
		  	$(".layui-con").eq(index).show().siblings(".layui-con").hide();
		  	if(index == 0){//请假申请
		  		getLeave();
		  	}else if(index == 1){//出差申请
		  		getBusiness();
		  	}else if(index == 2){//休假申请
		  		getHoliday();
		  	}else if(index == 3){//加班申请
		  		getOvertime();
		  	}else if(index == 4){//其它申请
		  		getOther();
		  	}else if(index == 5){//派车申请
		  		getDispatch();
		  	}else if(index == 6){//会议申请
		  		getMeetings();
		  	}
	  })
	  
})

//点击打印
$("#print").click(function(){
	print("LAY-user-manage");
})
//点击导出
$("#export").click(function(){
	
})