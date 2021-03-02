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
			    url:url+'/HolderTransfer/getList',
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
			    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
						  return d.LAY_TABLE_INDEX+1
					  }},
					  {field:'holderno', title:'军人证号', width:200,sort:true},
					  {field:'holdername', title:'姓名', width:150},
				      {field:'sexname', title:'性别', width:150,sort:true},
				      {field:'rank', title:'军衔', width:150,sort:true},
					  {field:'idcode', title:'身份证号', width:200,sort:true},
					  {field:'unitname', title:'调入单位', width:150,sort:true},
					  {field:'oldunitname', title:'原单位', width:150,sort:true},
					  {field:'transferdate', title:'调入日期', width:200,sort:true},
					  {field:'reason', title:'调动原因', width:200,sort:true},
					  {field:'photo', title:'人事调动资料',width:200,sort:true,templet:function(d){
						  var photo=d.photo==undefined?"../img/add_img.png":d.photo;
					      return "<img src="+photo+" style='height:60px;object-fit:contain'>";
					  }},
					  /*{fixed: 'right', title:'操作', width:320,templet:function(){
						  var $a="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='see'>查看</a>";
						  return $a;
					  }},*/
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
