if(window.top.loginid != "administrator"){
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
		    url:url+'/BlackCar/getList',
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
		          "msg": res.message, //解析提示文本
		          "count": res.count, //解析数据长度
		          "data": res.result //解析数据列表
		        };
		      },
		    cols:  [[
		    	  {field:'ID', title:'序号', sort:true,templet:function(d){
					  return d.LAY_TABLE_INDEX+1
				  }},
				  {field:'carplateno', title:'车牌号码', width:200,sort:true},
				  {field:'photo', title:'照片', width:200,sort:true,templet:function(d){
					  var photo=d.photo==undefined?"../img/add_img.png":d.photo;
					  return "<img src="+photo+" class='door_img' style='width:100%;height:100%;object-fit:contain'>";
				  }},
			      {field:'carplatecolor', title:'车牌颜色', width:200,sort:true},
			      {field:'carbodycolor', title:'车身颜色', width:200,sort:true},
				  {field:'cartype', title:'车辆类型', width:200,sort:true},
				  {field:'createdate', title:'创建时间', width:200,sort:true},
			      {fixed: 'right', title:'操作', width:200,templet:function(){
					  var $a1="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
					  if(window.top.loginid != "administrator"){
						  for(var item of window.top.arr){
							  if(item == "删除"){
								  $a1="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
							  }
						  }
					  }else{
						  $a1="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
					  }
					  return $a1;
				  }},
			    ]],
		      page: true,
			  limit:15,
		      limits:[15,20,30,40,50,60,70,80,90],
		      done: function (res, curr, count) {
					//动态监听表体高度变化，冻结行跟着改变高度
			        $("div[lay-id='LAY-user-manage'] .layui-table-body  tr").resize(function () {
			            $("div[lay-id='LAY-user-manage'] .layui-table-body  tr").each(function (index, val) {
			                $($(".layui-table-fixed .layui-table-body table tr")[index]).height($(val).height());
			            });
			        });
			        //初始化高度，使得冻结行表体高度一致
			        $("div[lay-id='LAY-user-manage'] .layui-table-body  tr").each(function (index, val) {
			            $($(".layui-table-fixed .layui-table-body table tr")[index]).height($(val).height());
			        });
				}
		  });
		  
		  //监听工具条
		  table.on('tool(LAY-user-manage)', function(obj){
		  		var data = obj.data;
		        if(obj.event === 'del'){
		  			  layer.confirm('确定删除?', function(index){
		  				$.ajax({
		  					url:url+'/BlackCar/delete',
		  					type:"POST",
		  					data:{"id":data.id,"loginid":window.top.loginid},
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
		  			}
		  });
})
//点击新增
 $('#add').click(function(){
	 layer.open({
		 type:2,
		 title:"添加车辆",
		 content:"blackList_car_add.html",
		 area:["90%","91%"],
	 })
});
//点击导入
$("#import").click(function(){
	layer.open({
		 type:2,
		 title:"批量导入",
		 content:"blackCarImport.html",
		 area:["90%","91%"],
	})
})