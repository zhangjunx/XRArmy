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
	 //监听开关
	 form.on('switch(sexDemo)', function(data){
	      var status=this.checked?"1":"0";
	      var fid=data.value;
	      var obj={"fid":fid,"status":status,"thisUserID":window.top.loginid};
	      updateParkingStatus(obj);
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
		    url:carUrl+'car/parking/getParkingList',
		    cellMinWidth: 80,
		    height: "full-232",
		    method:"POST",
		    request:{
		    	 pageName:"curpage",
  			     limitName:"pagesize",
		    },
		    where:{
		    	"thisUserID":window.top.loginid,
		    	"code":"",
		    	"parkName":"",
		    	"location":"",
		    	"status":""
		    },
		    parseData: function(res){ //res 即为原始返回的数据
		    	console.log(res);
		        return {
		          "code": res.result==true?"0":"", //解析接口状态
		          "msg": res.msg, //解析提示文本
		          "count": res.count, //解析数据长度
		          "data": res.data //解析数据列表
		        };
		      },
		    cols:  [[
		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
					  return d.LAY_TABLE_INDEX+1
				  }},
				  {field:'code', title:'停车场编号', width:150},
			      {field:'parkName', title:'停车场名称', width:250,sort:true},
			      {field:'location', title:'停车场位置', width:300,sort:true},
			      {field:'type', title:'车场类型', width:200,sort:true},
				  {field:'maxNum', title:'容纳车辆数', width:150,sort:true},
				  {field:'status', title:'状态', templet: '#switchTpl',sort:true},
			      {fixed: 'right', title:'操作', width:200,templet:function(d){
					  var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>编辑</a>";
					  var $a3="<a class='layui-bg-gray layui-btn layui-btn-danger layui-btn-xs'>删除</a>";
					  if(d.status == 0){
						  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray' lay-event='del'>删除</a>";
					  }
					  if(window.top.loginid!="administrator"){
						  for(var item of window.top.arr){
							  if(item=="编辑"){
								  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
							  }else if(item=="删除"){
								  if(d.status == 0){
									  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
								  }
							  }
						  }
					  }else{
						  $a2="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
						  if(d.status == 0){
							  $a3="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
						  }
					  }
					  return $a2+$a3;
				  }},
			    ]],
			    page: true,
			    limit:15,
				limits:[15,20,30,40,50,60,70,80,90],
		  });
		  //监听工具条
		  table.on('tool(LAY-user-manage)', function(obj){
		  			var data = obj.data;
		   if(obj.event === 'del'){
		  			  layer.confirm('确定删除?', function(index){
		  				$.ajax({
		  					url:carUrl+'car/parking/delOneParking',
		  					type:"POST",
		  					data:{"fid":data.fid,"thisUserID":window.top.loginid},
		  					success:function(res){
		  						console.log(res);
		  						layer.close(index);
		  						if(res.result){
		  							layer.msg(res.msg,{time:1000},function(){
		  								 obj.del();
		  							})
		  						}else{
		  							layer.msg(res.msg,{time:2000});
		  						}
		  					}
		  				})
		  			  });
		  			} else if(obj.event === 'edit'){
		  				 layer.open({
		  					 type:2,
		  					 title:"修改",
		  					 content:"parkingManage_add.html?id="+data.fid,
		  					 area:["90%","91%"],
		  				 })
		  			}
		  });
		  
})
function updateParkingStatus(obj){
	$.ajax({
		url:carUrl+"car/parking/updateStat",
		type:"post",
		data:obj,
		success:function(data){
			layer.msg(data.msg);
			if(data.result){
				layui.use("table",function(){
					var table = layui.table;
					table.reload('LAY-user-manage');
				})
				 
			}
		}
	})
}
//点击新增
 $('#add').click(function(){
	 layer.open({
		 type:2,
		 title:"添加车辆",
		 content:"parkingManage_add.html",
		 area:["90%","91%"],
	 })
});
