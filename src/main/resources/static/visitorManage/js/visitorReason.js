if(window.top.loginid!="administrator"){
	$(".add").hide();
	for(var item of window.top.arr){
		$("a[data-id="+item+"]").show();
	}
}
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
		    url:url+'/VisitorsReasonType/getList',
		    cellMinWidth: 80,
		    height: "full-232",
			title:"来访事由",
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
		    	  {field:'ID', title:'序号', width:150,sort:true,templet:function(d){
					  return d.LAY_TABLE_INDEX+1
				  }},
				  {field:'name', title:'来访事由', width:250},
			      {field:'note', title:'备注', sort:true},
			      {fixed: 'right', title:'操作',width:200,templet:function(){
					  var $a1="<a class='layui-btn layui-btn-xs layui-btn-normal layui-bg-gray' >编辑</a>";
					  var $a2="<a class='layui-btn layui-btn-xs layui-btn-danger layui-bg-gray' >删除</a>";
					  if(window.top.loginid!="administrator"){
						  for(var item of window.top.arr){
							  if(item=="编辑"){
								  $a1="<a class='layui-btn layui-btn-xs layui-btn-normal' lay-event='edit'>编辑</a>";
							  }else if(item=="删除"){
								  $a2="<a class='layui-btn layui-btn-xs layui-btn-danger' lay-event='del'>删除</a>";
							  }
						  }
					  }else{
						  $a1="<a class='layui-btn layui-btn-xs layui-btn-normal' lay-event='edit'>编辑</a>";
						  $a2="<a class='layui-btn layui-btn-xs layui-btn-danger' lay-event='del'>删除</a>";
					  }
					  return $a1+$a2;
				  }},
			    ]],
			    page: true,
				  limit:15,
			      limits:[15,20,30,40,50,60,70,80,90]
		  });
		  //监听工具条
		  table.on('tool(LAY-user-manage)', function(obj){
			var data = obj.data;
		   if(obj.event === 'edit'){
				 layer.open({
					 type:2,
					 title:"编辑",
					 content:"visitorReason_add.html?id="+data.id,
					 area:["90%","91%"],
				 })
			}else if(obj.event === 'del'){
				layer.confirm('确定删除?', function(index){
					$.ajax({
						url:url+'/VisitorsReasonType/delete?id='+data.id,
						type:"POST",
						success:function(res){
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
			}
		  });
		  
})
//点击新增
 $('#add').click(function(){
	 layer.open({
		 type:2,
		 title:"添加事由",
		 content:"visitorReason_add.html",
		 area:["90%","91%"],
	 })
});