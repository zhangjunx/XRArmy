if(window.top.loginid!="administrator"){
	$(".add").hide();
	for(var item of window.top.arr){
		$("a[data-id="+item+"]").show();
	}
}
var exportData;
layui.use(["form","table"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table;
	 
	 // 导出
	  $("#export").click(function(){
		  table.exportFile("LAY-user-manage",exportData, "xls");
     })
	
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
		    url:url+'/ACL_Role/getList',
		    height: "full-232",
			method:"POST",
			title:"角色管理",
			request:{
				pageName:"curpage",
				limitName:"pagesize"
			},
		    cellMinWidth: 80,
		    parseData: function(res){ //res 即为原始返回的数据
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
				  {field:'name', title:'角色名称', width:250},
			      // {field:'PHONENUM', title:'排序', width:200,sort:true},
			      // {field:'STUDENTS', title:'上移', width:250,sort:true},
			      // {field:'CREATEDATE', title:'下移', width:200,sort:true},
				  {field:'remark', title:'备注', sort:true},
			      {fixed: 'right', title:'操作', width:250,templet:function(d){
					  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray' >编辑</a>";
					  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray' >删除</a>";
					  var $a4="<a class='layui-btn layui-btn-warm layui-btn-xs layui-bg-gray' >设置菜单权限</a>";
					  if(window.top.loginid!="administrator"){
						  for(var item of window.top.arr){
							  if(item=="编辑"){
								  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
							  }else if(item=="删除"){
								  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
							  }else if(item=="设置菜单权限"){
								  $a4="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='permission'>设置菜单权限</a>";
							  }
						  }
					  }else{
						  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
						  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
						  $a4="<a class='layui-btn layui-btn-warm layui-btn-xs' lay-event='permission'>设置菜单权限</a>";
					  }
					  return $a2+$a3+$a4;
				  }},
			    ]],
			    page: true,
				limit:15,
			    limits:[15,20,30,40,50,60,70,80,90],
			    done:function(res,curr,count){
			    	exportData=res.data;
			    }
		  });
		  //监听工具条
		  table.on('tool(LAY-user-manage)', function(obj){
			var data = obj.data;
		   if(obj.event === 'del'){
				  layer.confirm('确定删除?', function(index){
					$.ajax({
						url:url+'/ACL_Role/delete',
						type:"POST",
						data:{"id":data.id},
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
				} else if(obj.event === 'edit'){
					 layer.open({
						 type:2,
						 title:"修改",
						 content:"roleManage_add.html?id="+data.id,
						 area:["90%","91%"],
					 })
				}else if(obj.event === "permission"){
					layer.open({
						 type:2,
						 title:"设置菜单权限",
						 content:"roleMenu.html?id="+data.id,
						 area:["95%","99%"],
					})
				}
		  });
		  
		  
})
//点击新增
 $('#add').click(function(){
	 layer.open({
		 type:2,
		 title:"添加角色",
		 content:"roleManage_add.html",
		 area:["90%","91%"],
	 })
});
//点击打印
$("#print").click(function(){
	print("LAY-user-manage");
})
