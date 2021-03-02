$(function(){
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
                pidName: 'pID',
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
            	/*{type:"radio"},*/
                {field: 'title', title: '区域名称'},
                {field: 'remark', title: '备注',width:"400"},
                 {field: 'type', title: '操作',width:"300",templet:function(d){
                	 var $a1="<a class='layui-btn layui-btn-xs layui-btn-warm' lay-event='add'>添加区域</a>";
					 var $a2="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='edit'>编辑</a>";
					 var $a3="<a class='layui-btn layui-btn-danger layui-btn-xs ' lay-event='del'>删除</a>";
					 var $a4="<a class='layui-btn layui-btn-normal layui-btn-xs ' lay-event='upload'>上传图片</a>";
					 return $a1+$a2+$a3+$a4;
                 }},
            ],
            
        });
        treeTable.on('tool(permissionTab)', function(obj){
    	    var data = obj.data;  // 获得当前行数据
    	    console.log(data)
    	    //获取选中的数据
    	    //console.log(insTb.checkStatus())  
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
		  					url:mapUrl+'camera/area/delInfo',
		  					type:"POST",
		  					data:{"thisUserID":window.top.loginid,"code":data.id},
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
    		 }else if(obj.event == 'upload'){
    			 getImg(data.id);
    			 layer.open({
    				 type:1,
    				 content:$("#uploadBox"),
    				 area:["50%","50%"],
    				 btn:["确定","取消"],
    				 btnAlign:"c",
    				 yes:function(index){
    					 layer.close(index);
    					 var image=$("#imgMap").attr("src");
    				     var imageName=$("#imgMap").attr("data-imgname");
    				     if(image.indexOf("data:image") != -1){//base64
    				    	 if(image.indexOf("data:image/jpeg;base64,") == 0){
        			    		 image=image.replace("data:image/jpeg;base64,","");
        			    	 }else if(image.indexOf("data:image/png;base64,") == 0){
        			    		 image=image.replace("data:image/png;base64,","");
        			    	 }
    				    	 var arr={"image":image,"imageName":imageName,"thisUserID":window.top.loginid};
    				    	 $.ajax({
    					    	 url:mapUrl+"public/uploadFile",
    					    	 type:"POST",
    					    	 data:arr,
    					    	 success:function(res){
    					    		 console.log(res);
    					    		 if(res.result){
    					    			 saveInfo(res.data,data.id);
    					    		 }else{
    					    			 layer.msg(res.msg,{time:2000});
    					    			 return;
    					    		 }
    					    	 }
    					     })
    				     }
    				 }
    			 })
    		 }
    	});
	});
}
//上传图片路径
function saveInfo(imgPath,id){
	var obj={"imgPath":imgPath,"code":id,"thisUserID":window.top.loginid};
	$.ajax({
   	 	 url:mapUrl+"camera/area/setImg",
		 type:"POST",
		 data:obj,
		 success:function(res){
	   		 console.log(res);
			 layer.msg(res.msg,{time:2000});
		 }
    })
}
//点击上传图片时，先渲染上一次的图片
function getImg(id){
	$.ajax({
		url:mapUrl+"camera/area/getInfo",
		type:"POST",
		data:{"code":id},
		success:function(res){
			console.log(res)
			if(res.result){
				$("#imgMap").attr("src",mapUrl+res.data.imgList[0].imgPath);
			}else{
				 $("#imgMap").attr("src","../img/add_img.png");
			}
		}
	})
}


//获取功能权限
function getTree(){
	$.ajax({
		url:mapUrl+'camera/area/getList',
		type:"POST",
		//data:{"loginid":window.top.loginid},
		success:function(res){
			console.log(res);
			if(res.result){
				$("#addBtn").css({"display":"none"});//如果已有数据 ，让按钮不显示
				var arr=res.data;
				initTreeTable(arr);
			}else{
				layer.msg(res.msg,{time:2000});
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
//点击选择图片
$("#imgFile").change(function(e){
	var imgUrl=this.files[0];
	var imgName=imgUrl.name;
	var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // 读出 base64
    reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
         var dataURL = reader.result;//base64
         $("#imgMap").attr("src",dataURL).attr("data-imgname",imgName);;
    };
})

//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}