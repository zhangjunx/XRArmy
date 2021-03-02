$(function(){
	getMenu();//获取左侧模块
})
var list = [];
var parentName="";
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
                {field: 'title', title: '名称',width:150,templet:function(d){
                	return d.title+"("+d.id+")";
                }},
				{field: 'iconsrc', title: '图标',width:"100"},
                {field: 'menuurl', title: '路径',width:"150"},
                {field: 'level', title: '类型',width:"80",templet:function(d){
                 	if(d.level==1){
                 		return "菜单";
                 	}else if(d.level==2){
                 		return "页面";
                 	}else if(d.level==3){
                 		return "按钮";
                 	}
                 }},
                {field: 'type', title: '操作',width:"80",templet:function(d){
               	     var $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='add'>新增</a>";
					 var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='edit'>修改</a>";
					 var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='del'>删除</a>";
					 if(d.parent == ""){//根菜单
						 $a2="<a class='layui-bg-gray layui-btn layui-btn-normal layui-btn-xs '>修改</a>";
						 $a3="<a class='layui-bg-gray layui-btn layui-btn-danger layui-btn-xs '>删除</a>";
					 }
					 if(d.level == 3){//按钮
						 $a1="<a class='layui-bg-gray layui-btn layui-btn-xs'>新增</a>";
					 }
					 return $a1+$a2+$a3;
                }},
                
            ],
            
        });
        
        treeTable.on('tool(permissionTab)', function(obj){
            var event=obj.event;
            var data=obj.data;
            if(event=="del"){
            	var id=data.id;
            	var obj3={"id":id,"loginid":window.top.loginid};
            	console.log(obj3);
            	layer.confirm("确定删除?",{title:'提示'},function(index){
            		layer.close(index);
            		$.ajax({
            			url:url+"/ACL_Menu/delete",
            			type:"POST",
            			data:obj3,
            			success:function(data){
            				console.log(data);
            				if(data.flag){
            					layer.msg(data.reason,{time:1000},function(){
            						obj.del();
            					})
            				}else{
            					layer.msg(data.reason,{time:2000});
            				}
            			}
            		})
            	})
            }else if(event=="edit"){
            	//清空弹出层表单
            	$("#parentid").val("");
	           	 $("#title1").val("");
	           	 $(".ifPage").val(0);
	           	 $(".ifScreenFull").val(0);
	           	 $("#parentName1").val("");
	           	 $("#modelPath").val("");
	           	 $("#fid").val("");
	           	 $("#title3").val("");
				$("#code3").val("");
				$("#iconsrc").val("");
				if(data.level==1){//编辑菜单
            		$("#add_button").hide();
            		$("#add_menu").show();
            		var parentname=$(".layui-table tr[data-indent="+data.parent+"] .ew-tree-pack span").html();
            		$("#parentName1").val(parentname);
            		$("#title1").val(data.title);
            		$(".ifPage").val(data.level);
            		$(".ifScreenFull").val(data.ifscreen);
            		$("#iconsrc").val(data.iconsrc);
            	}else if(data.level==3){//编辑按钮
            		$("#add_button").show();
            		$("#add_menu").hide();
            		var parentname=$(".layui-table tr[data-indent="+data.parent+"] .ew-tree-pack span").html();
            		$("#parentName3").val(parentname);
            		$("#title3").val(data.title);
            		$("#code3").val(data.code);
            	}else if(data.level == 2){//编辑页面
            		$("#add_button").hide();
            		$("#add_menu").show();
            		var parentname=$(".layui-table tr[data-indent="+data.parent+"] .ew-tree-pack span").html();
            		$("#parentName1").val(parentname);
            		$("#title1").val(data.title);
            		$(".ifPage").val(data.level);
            		$(".ifScreenFull").val(data.ifscreen);
            		$("#modelPath").val(data.menuurl);
            	}
				form.render();
            	layer.open({
            		type:1,
            		title:"修改",
            		content:$("#menu_add_update"),
            		area:["90%","91%"],
            		btn:["确定","取消"],
            		btnAlign: 'c',
            		yes:function(index){
            			var fid=$("#fid").val();
            			if(data.level==1){//新增菜单或者页面
            				var menuName=$("#title1").val();
            				var level=$(".ifPage").val();
            				var ifScreen=$(".ifScreenFull").val();
            				var parentid=data.parent;
                			var pagePath=$("#modelPath").val();
                			var icon=$("#iconsrc").val();
                			var id=data.id;
            				var obj={"id":id,"name":menuName,"parentid":parentid,"iconsrc":icon,"level":level,"ifscreen":ifScreen};
            			}else if(data.level==2){//编辑页面
            				var menuName=$("#title1").val();
            				var level=$(".ifPage").val();
            				var ifScreen=$(".ifScreenFull").val();
            				var parentid=data.parent;
                			var pagePath=$("#modelPath").val();
                			var icon=$("#iconsrc").val();
                			var id=data.id;
            				var obj={"id":id,"name":menuName,"parentid":parentid,"menuurl":pagePath,"level":level,"ifscreen":ifScreen};
            			}else if(data.level==3){//编辑按钮
            				var operateName=$("#title3").val();
            				var operateCode=$("#code3").val();
            				var menuID=data.parent;
            				var id=data.id;
            				var obj={"id":id,"name":operateName,"parentid":menuID,"code":operateCode,"level":3};
            			}
            			console.log(obj);
            			$.ajax({
            				url:url+"/ACL_Menu/update",
            				type:"post",
            				data:obj,
            				success:function(data){
            					if(data.flag){
            						layer.msg(data.reason,{time:1000},function(){
            							layer.close(index);
            							getMenu();
            						});
            					}else{
            						layer.msg(data.reason,{time:2000});
            					}
            				}
            			})
            		}
            	})
            }else if(event=="add"){
            	if(data.id == 0){
            		getNextId("");
            	}else{
            		getNextId(data.id);
            	}
            	//清空弹出层表单
            	$("#parentid").val("");
            	 $("#title1").val("");
            	 $(".ifPage").val(0);
            	 $(".ifScreenFull").val(0);
            	 $("#parentName1").val("");
            	 $("#iconsrc").val("");
            	 $("#modelPath").val("");
            	 $("#fid").val("");
            	 $("#title3").val("");
 				$("#code3").val("");
 				form.render();
            	if(obj.data.level== 1 ){//新增菜单 
            		$("#add_button").hide();
            		$("#add_menu").show();
            		parentName=obj.data.title;
            		$("#parentName1").val(obj.data.title);
            	}else if(obj.data.level == 2){//新增按钮
            		$("#add_button").show();
            		$("#add_menu").hide();
            		parentName=obj.data.title;
            		$("#parentName3").val(obj.data.title);
            	}
            	layer.open({
            		type:1,
            		title:"新增",
            		content:$("#menu_add_update"),
            		area:["90%","91%"],
            		btn:["确定","取消"],
            		btnAlign: 'c',
            		yes:function(index){
            			var fid=$("#fid").val();
            			if(data.level==1){//新增菜单
            				var menuName=$("#title1").val();
            				var level=$(".ifPage").val();
            				var ifScreen=$(".ifScreenFull").val();
            				var parentid=data.id;
                			var pagePath=$("#modelPath").val();
                			var icon=$("#iconsrc").val();
                			var id=$("#parentid").val();
                			if(level == 1 ){//菜单
                				var obj={"id":id,"name":menuName,"parentid":parentid,"iconsrc":icon,"level":level,"ifscreen":ifScreen};
                			}else if(level == 2){//页面
                				var obj={"id":id,"name":menuName,"parentid":parentid,"menuurl":pagePath,"level":level,"ifscreen":ifScreen};
                			}
            			}else if(data.level==2){//新增按钮
            				var operateName=$("#title3").val();
            				var operateCode=$("#code3").val();
            				var menuID=data.id;
            				var id=$("#parentid").val();
            				var obj={"id":id,"name":operateName,"parentid":menuID,"code":operateCode,"level":3};
            			}
            			console.log(obj);
            			$.ajax({
            				url:url+"/ACL_Menu/insert",
            				type:"post",
            				data:obj,
            				success:function(data){
            					console.log(data);
            					if(data.flag){
            						layer.msg(data.reason,{time:1000},function(){
            							layer.close(index);
            							getMenu();
            						});
            					}else{
            						layer.msg(data.reason,{time:2000});
            					}
            				}
            			})
            		},
            	})
            }
        });
	
	});
}
//获取菜单
function getMenu(){
	$.ajax({
		url:url+'/ACL_Menu/getTree',
		type:"POST",
		success:function(res){
			console.log(res);
			if(res.flag){
				var arr=res.result;
				initTreeTable(arr);
			}else{
				layer.msg(res.reason,{time:2000});
			}
		}
	})
}
//获取新增的菜单或页面id
function getNextId(parentid){
	$.ajax({
		url:url+"/ACL_Menu/getNextid",
		type:"POST",
		data:{"loginid":window.top.loginid,"parentid":parentid},
		success:function(data){
			console.log(data);
			if(data.flag){
				$("#parentid").val(data.result);
			}
		}
	})
}

//点击图标选择图片
$("#logoIpt").change(function(e){
	var imgUrl=this.files[0];
	var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // 读出 base64
    reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
         var dataURL = reader.result;//base64
         $("#img").attr("src",dataURL);
    };
})
//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}