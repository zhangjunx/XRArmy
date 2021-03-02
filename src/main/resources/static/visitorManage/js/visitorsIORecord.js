var exportData;
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
      laydate = layui.laydate;
	   
		lay('.date').each(function() {
			laydate.render({
				elem : this,//元素
				type:"datetime",
				trigger : 'click',//怎么触发
			});
		});
	
	
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
		    url:url+'/VisitorsInfo/getIOList',
		    cellMinWidth: 80,
			title:"车辆进出记录",
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
		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
					  return d.LAY_TABLE_INDEX+1
				  }},
				  {field:'holderno', title:'访客编号', width:200,sort:true},
				  {field:'holdername', title:'访客姓名', width:120},
				  {field:'iodate', title:'进出时间', width:250,sort:true},
				  {field:'channelname', title:'进出通道', width:150,sort:true,},
				  {field:'devicename', title:'设备名称', width:150,sort:true},
				  {field:'iostatus', title:'进出状态', width:200,sort:true,templet:function(d){
					  if(d.iostatus=="11"){
						  return "进入";
					  }else if(d.iostatus=="12"){
						  return "外出";
					  }else {
						  return "";
					  }
				  }},
				  {field:'photostr', title:'现场照', sort:true},
			    ]],
			page: true,
			done: function (res, curr, count) {
				exportData=res.result;
			}
		  });
		  $("#export").click(function(){
			table.exportFile("LAY-user-manage",exportData, "xls");
		  })
		  
})
//点击打印
$("#print").click(function(){
	print("LAY-user-manage");
})