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
		    url:url+'/DictData/getList',
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
		    	  {field:'ID', title:'序号', width:150,sort:true,templet:function(d){
					  return d.LAY_TABLE_INDEX+1
				  }},
				  {field:'name', title:'字典名称', width:250},
			      {field:'code', title:'字典值', width:200,sort:true},
			      {field:'itemname', title:'字典项名称', width:350,sort:true},
			      {field:'remark', title:'备注', width:350,sort:true},
			      {fixed: 'right', title:'操作',width:350,templet:function(){
					  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray' >编辑</a>";
					  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray' >删除</a>";
					  if(window.top.loginid!="administrator"){
						  for(var item of window.top.arr){
							  if(item=="编辑"){
								  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
							  }else if(item=="删除"){
								  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
							  }
						  }
					  }else{
						  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
						  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
					  }
					  return $a2+$a3;
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
					url:url+'/DictData/delete?id='+data.id,
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
			} else if(obj.event === 'edit'){
				 layer.open({
					 type:2,
					 title:"修改",
					 content:"dictManage_add.html?id="+data.id,
					 area:["90%","91%"],
				 })
			}
		  });
		  
})

//点击新增
 $('#add').click(function(){
	 layer.open({
		 type:2,
		 title:"添加字典",
		 content:"dictManage_add.html",
		 area:["90%","91%"],
	 })
});
//点击导入
$("#import").click(function(){
	layer.open({
		 type:2,
		 title:"批量导入",
		 content:"dictImport.html",
		 area:["90%","91%"],
	})
})

//点击打印
$("#print").click(function(){
	print("LAY-user-manage");
})
