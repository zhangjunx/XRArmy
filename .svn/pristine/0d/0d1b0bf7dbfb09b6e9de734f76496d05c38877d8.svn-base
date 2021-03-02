var table;
layui.use(["form","table"],function(){
	var $ = layui.$,
		form = layui.form;
	table = layui.table;
	initTable(table);
	//监听搜索
	form.on('submit(LAY-user-front-search)', function(data){
	    var field = data.field;
	    //执行重载
	    table.reload('LAY-user-manage', {
	    	where: field
	    });
	});
	
	//会议室状态按钮监听
	form.on('switch(roomStatus)',function(data){
		var fid=data.value;
		var status = "";
		if(this.checked){
			status = 1;
		}else{
			status = 0;
		}
		$.ajax({
  			url:meetUrl+'meet/room/updateRoomStatus',
  			type:"POST",
  			data:{"fid":fid,"thisUserID":window.top.loginid,"status":status},
  			success:function(res){
	  			layer.msg(res.msg,{time:2000});
	  			initTable();
  			}
  		})
	})
	
	//监听工具条
	table.on('tool(LAY-user-manage)', function(obj){
		var data = obj.data;
		if(obj.event === 'del'){
			layer.confirm('确定删除?', function(index){
		  		$.ajax({
		  			url:meetUrl+'meet/room/delRoom',
		  			type:"POST",
		  			data:{"fid":data.fid,"thisUserID":window.top.loginid},
		  			success:function(res){
			  			layer.close(index);
			  			layer.msg(res.msg,{time:2000});
			  			initTable();
		  			}
		  		})
			});
		}else if(obj.event === 'edit'){
			layer.open({
				type:2,
				title:"编辑会议室",
				content:"meetRoom_add.html?id="+data.fid,
				area:["90%","91%"],
			})
		}
	});
})

//初始化表格
function initTable(){
	table.render({
		elem: '#LAY-user-manage',
		url:meetUrl+'meet/room/getRoomList',
		cellMinWidth: 80,
		method:"POST",
		request:{
		    pageName:"curpage",
			limitName:"pageSize",
		},
		where:{
			"thisUserID":window.top.loginid,
			"roomName":"",
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
		cols:[[
		    {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
				return d.LAY_TABLE_INDEX+1
			}},
			{field:'roomName', title:'会议室', width:200},
			{field:'roomPlace', title:'名称', width:120,sort:true},
			{field:'roomSize', title:'容量', width:100,sort:true},
			{field:'useableGoodsName', title:'可用物品',width:200,sort:true},
			{field:'signinPlaceName', title:'签到设备', width:120,sort:true},
			{field:'signBackPlaceName', title:'签退设备', width:120,sort:true},
			{field:'status', title:'是否启用', width:150,sort:true,templet:function(d){
				if (d.status == '1') {
                    return '<input type="checkbox" checked="true" value="'+d.fid+'" name="switch" lay-skin="switch" lay-filter="roomStatus" lay-text="是|否">';
                }else{
                	return '<input type="checkbox" value="'+d.fid+'" name="switch" lay-skin="switch" lay-filter="roomStatus" lay-text="是|否">';
                }
			}},
			{field:'remark', title:'备注', width:150,sort:true},
			{fixed: 'right', title:'操作',width:220, templet:function(d){
				if(d.status == 1){
					var $a1="<a class='layui-btn layui-btn-normal layui-btn-xs' lay-event='edit'>编辑</a>";
					var $a2="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
					return $a1+$a2;
				}else{
					var $a1="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>编辑</a>";
					var $a2="<a class='layui-btn layui-btn-danger layui-btn-xs' lay-event='del'>删除</a>";
					return $a1+$a2;
				}
				
			}},
		]],
		page: true
	});
}

//点击新增
$('#add').click(function(){
	layer.open({
		type:2,
		title:"新建会议室",
		content:"meetRoom_add.html",
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
		 content:"carImport.html",
		 area:["90%","91%"],
	})
})
//获取复选框的值
function getChecked(){
	var obj = document.getElementsByName("carStatus");
	var check_val = "";
	for (k in obj) {
		if (obj[k].checked){
			if(check_val == ""){
				check_val = obj[k].value;
			}else{
				check_val = check_val+","+obj[k].value;
			}
		}
	}
	return check_val;
}

//切换开关按钮
$("input[name='codeSwitch']").click(function(){
	console.log(this);
});