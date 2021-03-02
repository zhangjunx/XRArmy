getTree();//获取单位下拉
getDictList();//获取家属类型列表(); 
if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
	getOneInfo();
}
if(getUrlParam("watch")==0){//编辑
	$(".layui-layout-admin").remove();
}
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate = layui.laydate;
	  
	 lay('.date').each(function() {
			laydate.render({
				elem : this,//元素
				type:"datetime",
				trigger : 'click',//怎么触发
			});
	 });
	 //监听单位
	 form.on('select(unitno)', function(data){
		var id=$("#unitno option:selected").attr("data-id");
		 getTree(id);
	 });
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
		 var index=layer.load(2);
		 var unitno=$("#unitno").val();
		 if(unitno == ""){
			 $("#selectTitle").css("border","1px solid red");
			 layer.msg("请选择所属单位!",{time:2000});
			 layer.close(index);
			 setTimeout(function(){
				 $("#selectTitle").css("border","none");
			 },2000);
			 return;
		 }
	     var obj=data.field;
	     obj.state=1;
	     obj.unitno=unitno;
	     var toggle="/HolderData/insert";
		 var src2=$("#scenePhoto").attr("src");
		 if(src2.indexOf("data:image") ==-1){
			 src2="";
		 }
	     if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
			toggle="/HolderData/update";
	     }
	     var obj1={"file":src2,"obj":JSON.stringify(obj),"loginid":window.top.loginid};
	     $.ajax({
	    	 url:url+toggle,
	    	 type:"POST",
	    	 data:obj1,
	    	 success:function(res){
				 layer.close(index);
	    		 console.log(res);
	    		 if(res.flag){
	    			 layer.msg(res.reason,{time:1000},function(){
	    				 parent.layer.closeAll();
	    				 parent.otherMan();
	    			 })
	    		 }else{
	    			 layer.msg(res.reason,{time:2000});
	    		 }
	    	 },
			 error:function(data){
				 layer.close(index);
			 }
	     })
    });
	 //点击取消
	 $("#resetData").click(function(){
		parent.layer.closeAll();
	 })
	 /* 自定义验证规则 */
	form.verify({
	})
})

//编辑时获取一条信息
function getOneInfo(){
	$.ajax({
		url:url+"/HolderData/getList",
		type:"POST",
		data:{"holderno":getUrlParam("id")},
		async:false,
		success:function(data){
			console.log(data);
			if(data.flag){
				var res=data.result[0];
				 $("#holderno").val(res.holderno).attr("readonly","readonly");
				 $("#holdername").val(res.holdername);
				 $("#emptype").val(res.emptype);
				 $("#idcode").val(res.idcode);
				 var photo=res.photo==undefined?"../img/add_img.png":res.photo;
				 $("#scenePhoto").attr("src",photo);
				$("#sexname input[value="+res.sexname+"]").attr("checked",true);
				$("#unitno").val(res.unitno);
				$("#unitname").html(res.unitname);
				//$("#classtree div[data-id="+res.unitno+"]").find("span.layui-tree-txt").click();
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render('checkbox');
				})
			}
		}
	})
}
 
//获取家属类型下拉
function getDictList(){
	$.ajax({
		url:url+"/DictData/getList",
		type:"POST",
		data:{"itemname":"人员类别"},//
		async:false,
		success:function(res){
			$("#emptype option").not("option:first").remove();
			if(res.flag){
				for(var item of res.result){
					var $opt=$("<option value="+item.name+">"+item.name+"</option>");
					$("#emptype").append($opt);
				}
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render('select');
				})
			}
		}
	})
}
 
//获取单位下拉
function getTree(){
	$.ajax({
		url:url+"/UnitList/getTree",
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
				        	$("#unitno").val(node.data.id);
				        	$("#unitname").html(node.data.title);
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

 

//点击现场照选择图片
$("#sceneFile").change(function(e){
	var imgUrl=this.files[0];
	var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // 读出 base64
    reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
         var dataURL = reader.result;//base64
         $("#scenePhoto").attr("src",dataURL);
    };
})

//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}
