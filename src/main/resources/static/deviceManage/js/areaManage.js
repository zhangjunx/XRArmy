$(function(){
	if(window.top.loginid != "administrator"){
		$(".add").hide();
		for(var item of window.top.arr){
			$("a[data-id="+item+"]").show();
		}
    }
	getTree();//获取列表
})
var list = [];
layui.config({
    base: '../'
}).extend({
    treeTable: 'treeTable/treeTable'
}).use(['treeTable'], function () {
    var treeTable = layui.treeTable;
});
layui.use('layer',function(){
	var layer=layui.layer;
})

//初始化权限列表
function initTreeTable(res){
	layui.use(['layer','util','treeTable','table'], function () {
		var $=layui.jquery;
		var util=layui.util;
	    var treeTable = layui.treeTable;
	    var form=layui.form;
		var table=layui.table;
	    // 渲染表格
        var insTb = treeTable.render({
            elem: '#permissionTab',
            data: res,  // 数据
            tree: {
                iconIndex: 0,  // 折叠图标显示在第几列
                arrowType: 'arrow2', 
                idName: 'id',
                pidName: 'parent',
                isPidData: true,
                openName: 'spread',
                getIcon: function(d) {  // 自定义图标
                    // d是当前行的数据
                   if (d.children.length > 0) {  // 判断是否有子集
                	   return '<i class="ew-tree-icon ew-tree-icon-folder"></i>';
                    } else {
                    	 return '<i class="ew-tree-icon ew-tree-icon-file"></i>';
                    }
                }
            },
            cols: [
                {field: 'title', title: '区域名称',width:"250",templet:function(d){
                	return d.title+"("+d.id+")";
                }},
                {field: 'remark', title: '备注',width:"300"},
                 {field: 'type', title: '操作',width:"300",templet:function(d){
                	 var $a1="<a class='layui-btn layui-btn-xs layui-btn-warm layui-bg-gray' >添加子区域</a>";
					 var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray' >编辑</a>";
					 var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray ' >删除</a>";
					 if(window.top.loginid!="administrator"){
						 for(var item of window.top.arr){
							 if(item=="添加子区域"){
								 $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='add'>添加子区域</a>";
							 }else if(item=="编辑"){
								 $a2="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='edit'>编辑</a>";
							 }else if(item=="删除"){
								 $a3="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='del'>删除</a>";
							 }
						 }
					 }else{
						 $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='add'>添加子区域</a>";
						 $a2="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='edit'>编辑</a>";
						 $a3="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='del'>删除</a>";
					 }
					 return $a1+$a2+$a3;
                 }},
            ],
            
        });
        treeTable.on('tool(permissionTab)', function(obj){
    	    var data = obj.data;  // 获得当前行数据
    		 if(obj.event == 'add'){
    			 layer.open({
    					type:2,
    					title:"添加区域",
    					content:"areaManage_add.html?parentid="+data.id+"&parentname="+data.title,
    					area:["90%","92%"]
    				})
    		 }else if(obj.event == 'edit'){
    			 layer.open({
 					type:2,
 					title:"修改区域",
 					content:"areaManage_add.html?id="+data.id,
 					area:["90%","92%"]
 				})
    		 }else if(obj.event == 'del'){
    			 layer.confirm('确定删除?', function(index){
		  				$.ajax({
		  					url:url+'/AreaList/delete',
		  					type:"POST",
		  					data:{"areaid":data.id},
		  					success:function(res){
		  						console.log(res);
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
	});
}
//递归修改表格数据status
function getList12(children){
	if(children != undefined && children.length>0){
		for(var i =0;i<children.length;i++){
			if(children[i].LAY_CHECKED == true && children[i].LAY_INDETERMINATE == false){//复选框被选中
				children[i].status=1;
			}else{
				children[i].status=0;
			}
			if(children[i].children == undefined){
				continue;
			}
			getList12(children[i].children);
		}
	}
	//return;
}

//获取功能权限
function getTree(){
	$.ajax({
		url:url+'/AreaList/getTree',
		type:"POST",
		data:{"loginid":window.top.loginid},
		success:function(res){
			console.log(res)
			if(res.flag){
				//$("#addBtn").css({"display":"none"});//如果已有数据 ，让按钮不显示
				var arr=res.result;
				initTreeTable(arr);
			}else{
				layer.msg(res.reason,{time:2000});
			}
		}
	})
}

//点击新增
$("#addBtn").click(function(){
	layer.open({
		type:2,
		title:"添加区域",
		content:"areaManage_add.html?parentid=0",
		area:["90%","92%"]
	})
})

//点击新增
$("#sysadd").click(function(){
	layer.confirm('确定同步?', function(index){
		$.ajax({
			url:url+"/HKPlatt/getList",
			type:"POST",
			dataType:"json",
			data:{"loginid":window.top.loginid},
			success:function(data){
				console.log(data)
				layer.msg(res.reason,{time:2000});
			}
			
		})
	});
	
})

//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}