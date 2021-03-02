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
	  //监听搜索    当月
	  form.on('submit(month)', function(data){
	    var field=data.field;
	    field.n=1;
	    //执行重载
	    table.reload('LAY-user-manage', {
	      where: field
	    });
	  });
	  //监听搜索   半年
	  form.on('submit(halfYear)', function(data){
	    var field = data.field;
	    field.n=6;
	    //执行重载
	    table.reload('LAY-user-manage', {
	      where: field
	    });
	  });
	  //监听搜索   一年
	  form.on('submit(year)', function(data){
	    var field = data.field;
	    field.n=12;
	    //执行重载
	    table.reload('LAY-user-manage', {
	      where: field
	    });
	  });
		  table.render({
			    elem: '#LAY-user-manage',
			    url:url+'/HolderData/getRetire',
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
			    	  {field:'ID', title:'序号', sort:true,templet:function(d){
						  return d.LAY_TABLE_INDEX+1
					  }},
					  {field:'holderno', title:'军人证号', width:200,sort:true},
					  {field:'holdername', title:'姓名', width:150},
				      {field:'sexname', title:'性别', width:150,sort:true},
				      {field:'unitname', title:'所属单位', width:200,sort:true},
				      {field:'rank', title:'军衔', width:150,sort:true},
					  {field:'idcode', title:'身份证号', width:200,sort:true},
					  {field:'startdate', title:'入伍日期', width:200,sort:true},
					  {field:'enddate', title:'退伍日期',width:200,sort:true}
				    ]],
				    page: true,
				    limit:15,
					limits:[15,20,30,40,50,60,70,80,90]
			  });
		  
})

//点击打印
$("#print").click(function(){
	print("LAY-user-manage");
})
