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
		    url:url+'?action=building',
		    cellMinWidth: 80,
			method:"GET",
			headers:{
				Authorization:$.cookie("token")
			},
		    request:{
		    	pageName:"page",
		    	limitName:"pageSize",
		    },
		    parseData: function(res){ //res 即为原始返回的数据
		    	console.log(res);
		        return {
		          "code": res.code==200?"0":"", //解析接口状态
		          "msg": res.message, //解析提示文本
		          "count": res.count, //解析数据长度
		          "data": res.data //解析数据列表
		        };
		      },
		    cols:  [[
				  {type:'checkbox'},
		    	  {field:'ID', title:'序号', width:150,sort:true,templet:function(d){
					  return d.LAY_TABLE_INDEX+1
				  }},
			      {field:'building_name', title:'楼栋名称', width:350,sort:true},
			      {field:'building_household', title:'楼栋户数', width:350,sort:true},
			      {field:'building_person_number', title:'楼栋人数', width:350,sort:true},
			      {title:'操作', width:350,templet:function(){
					  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
					  var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
					  return $a2+$a3;
				  }},
			    ]]
		    ,page: true
		  });
		  
		  //监听工具条
		  table.on('tool(LAY-user-manage)', function(obj){
		  			var data = obj.data;
		   if(obj.event === 'del'){
		  			  layer.confirm('确定删除?', function(index){
		  				$.ajax({
		  					url:url+'?action=building&building_id='+data.building_id,
		  					type:"DELETE",
		  					headers: {
		  						Accept: "application/json; charset=utf-8",
		  						Authorization:$.cookie("token")
		  					},
		  					success:function(res){
		  						layer.close(index);
		  						if(res.code==200){
		  							layer.msg(res.message,{time:1000},function(){
		  								 obj.del();
		  							})
		  						}else{
		  							layer.msg(res.message,{time:2000});
		  						}
		  					}
		  				})
		  			  });
		  			} else if(obj.event === 'edit'){
		  				 layer.open({
		  					 type:2,
		  					 title:"修改",
		  					 content:"buildingManage_add.html?id="+data.building_id,
		  					 area:["90%","91%"],
		  				 })
		  			}
		  });
		  
})

//点击新增
 $('#add').click(function(){
	 layer.open({
		 type:2,
		 title:"添加楼栋",
		 content:"buildingManage_add.html",
		 area:["90%","91%"],
	 })
});
//点击打印
$("#print").click(function(){
	print("LAY-user-manage");
})
//点击导入
$("#import").click(function(){
	layer.open({
		 type:2,
		 title:"批量导入",
		 content:"buildingImport.html",
		 area:["90%","91%"],
	})
})
