$(function(){
	getTree();//获取列表
	if(window.top.loginid != "administrator"){
		$(".add").hide();
		for(var item of window.top.arr){
			$("a[data-id="+item+"]").show();
		}
	}
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
                iconIndex: 1,  // 折叠图标显示在第几列
                arrowType: 'arrow2', 
                idName: 'id',
                pidName: 'parent',
                isPidData: true,
                openName: 'spread',
                getIcon: function(d) {  // 自定义图标
                    // d是当前行的数据
                   if (d.children.length != 0) {  // 判断是否有子集
                	   return '<i class="ew-tree-icon ew-tree-icon-folder"></i>';
                    } else {
                    	 return '<i class="ew-tree-icon ew-tree-icon-file"></i>';
                    }
                }
            },
            cols: [
				{field: 'id', title: '编号',width:"300",sort:true},
                {field: 'title', title: '单位名称',width:"300"},
                {field: 'remark', title: '备注',width:"300"},
                 {field: 'type', title: '操作',width:"300",templet:function(d){
                	 var $a1="<a class='layui-btn layui-btn-xs layui-btn-warm layui-bg-gray'>添加下一级</a>";
					 var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs layui-bg-gray'>编辑</a>";
					 var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs layui-bg-gray'>删除</a>";
					 
					 if(window.top.loginid != "administrator"){
						 for(var item of window.top.arr){
							 if(item == "添加下一级"){//添加下一级
								 $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='add'>添加下一级</a>";
							 }else if( item == "编辑"){//编辑
								 $a2="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='edit'>编辑</a>";
							 }else if(item == "删除"){//删除
								 $a3="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='del'>删除</a>";
							 }
						 }
					 }else{
						 $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='add'>添加下一级</a>";
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
    					title:"添加单位",
    					content:"unit_add.html?no="+data.id+"&title="+data.title+"",
    					area:["90%","92%"]
    				})
    		 }else if(obj.event == 'edit'){
    			 layer.open({
 					type:2,
 					title:"修改单位",
 					content:"unit_add.html?parentno="+data.id,
 					area:["90%","92%"]
 				})
    		 }else if(obj.event == 'del'){
    			 layer.confirm('确定删除?', function(index){
		  				$.ajax({
		  					url:url+'/UnitList/delete',
		  					type:"POST",
		  					data:{"unitno":data.id},
		  					success:function(res){
		  						console.log(res);
		  						layer.close(index);
		  						if(res.flag){
		  							layer.msg(res.reason,{time:1000},function(){
		  								getTree();
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
		url:url+'/UnitList/getTree',
		type:"POST",
		data:{"loginid":window.top.loginid},
		success:function(res){
			console.log(res)
			if(res.flag){
				$("#addBtn").css({"display":"none"});//如果已有数据 ，让按钮不显示
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
		title:"添加单位",
		content:"unit_add.html?id=0",
		area:["90%","92%"]
	})
})
//点击导出
$("#export").click(function(){
	exportTable();
})
//导出
function exportTable(){
	$.ajax({
		url:url+'/UnitList/getTree',
		type:"POST",
		data:{"loginid":window.top.loginid},
		success:function(res){
			console.log(res)
			if(res.flag){
				arrList=[];
				var list=treeToList(res.result);
				var $table = $("<table id='tableData' style='display:none'><tr><td>编号</td><td>单位名称</td><td>备注</td></tr></table>");
				for(var item of list){
					var id=item.id==undefined?"":item.id;
					var title=item.title==undefined?"":item.title;
					var remark=item.remark==undefined?"":item.remark;
					var $tr=$("<tr></tr>");
					var $td1=$("<td>"+id+"</td>");
					var $td2=$("<td>"+title+"</td>");
					var $td3=$("<td>"+remark+"</td>");
					$tr.append($td1)
					$tr.append($td2);
					$tr.append($td3);
					$table.append($tr);
				}
				  $("body").append($table);
			      var table = document.querySelector("#tableData");
			      var sheet = XLSX.utils.table_to_sheet(table,{raw:true});//将一个table对象转换成一个sheet对象
			      openDownloadDialog(sheet2blob(sheet),'单位管理.xlsx');
			      $("#tableData").remove();
			}else{
				layer.msg(res.reason,{time:2000});
			}
		}
	})
}
//树形数据扁平化
var arrList=[];
function treeToList(source) {
	 source.forEach(el=>{
		  arrList.push(el);
		  el.children && el.children.length>0 ? treeToList(el.children) : ""  // 子级递归
	 })
	 return arrList;
}

//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}