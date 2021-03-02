getTree();//获取机构下拉
if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
	getOneInfo();
}
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate = layui.laydate;
	  
	 lay('.date').each(function() {
			laydate.render({
				elem : this,//元素
				trigger : 'click',//怎么触发
				
			});
	 });
	 
	 //监听机构
	 form.on('select(areaid)', function(data){
		var id=$("#areaid option:selected").attr("data-id");
		 getTree(id);
	 });
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
		 if($("#areaid").val() == ""){
			 layer.msg("请选择所属区域!",{time:2000});
			 return;
		 }
	     var obj=data.field;
	     obj.areaid=$("#areaid").val();
	     obj.type="P";
		 var toggle="/MonitorDot/insert";
		 if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
				obj.id=getUrlParam("id");
				toggle="/MonitorDot/update";
		 }
	     $.ajax({
	    	 url:url+toggle,
	    	 type:"POST",
	    	 data:obj,
	    	 success:function(res){
	    		 console.log(res);
	    		if(res.flag){
					 layer.msg(res.reason,{time:1000},function(){
						 parent.layer.closeAll();
						 window.parent.location.reload();
					 })
	    		}else{
					 layer.msg(res.reason,{time:2000});
	    		}
	    	 }
	     })
    });
	 //点击取消
	 $("#resetData").click(function(){
		parent.layer.closeAll();
	 })
})


//编辑时获取一条信息
function getOneInfo(){
	$.ajax({
		url:url+"/MonitorDot/getList",
		type:"POST",
		data:{"id":getUrlParam("id")},
		success:function(res){
			console.log(res)
			if(res.flag){
				var data=res.result[0]; 
				 $("#name").val(data.name);
				 $("#locatname").val(data.locatname);
				 $("#ip").val(data.ip);
				 $("#remark").val(data.remark);
				 $("#areaid").val(data.areaid);
				 $("#areaname").html(data.areaname);
			}
		}
	})
}

//获取机构下拉
function getTree(){
	$.ajax({
		url:url+"/AreaList/getTree",
		type:"POST",
		async:false,
		data:{"loginid":window.top.loginid}, 
		success:function(res){
			console.log(res)
			if(res.flag){
				layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
				    var $ = layui.jquery, tree = layui.tree;
				    tree.render({
				        elem: "#classtree",
				        data: res.result,
				        onlyIconControl:true,
				        click: function (node) {
				        	console.log(node)
				        	$("#areaid").val(node.data.id);
				        	$("#areaname").html(node.data.title);
				            var $select = $($(this)[0].elem).parents(".layui-form-select");
				            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
				        }
				    });
				    
				    $(".downpanel").on("click", ".layui-select-title", function (e) {
				        $(".layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
				        $(this).parents(".downpanel").toggleClass("layui-form-selected");
				        layui.stope(e);
				    }).on("click", "dl i", function (e) {
				        layui.stope(e);
				    });
				    
				});
			}
		}
	})
}
//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}