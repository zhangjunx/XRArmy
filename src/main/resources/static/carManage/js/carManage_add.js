getTree();//获取使用单位
getParking();//获取停车场
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
				type:'datetime',
				trigger : 'click',//怎么触发
			});
	 });
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
		 if($("#unitno").val() == ""){
			 $("#selectTitle").css("border","1px solid red");
			 layer.msg("必填项不能为空!",{time:2000});
			 setTimeout(function(){
				 $("#selectTitle").css("border","none");
			 },2000);
			 return;
		 }
	     var obj=data.field;
	     var image=$("#scenePhoto").attr("src");
	     var imageName=$("#scenePhoto").attr("data-imgname");
	     if(image.indexOf("data:image") != -1){//base64
	    	 if(image.indexOf("data:image/jpeg;base64,") == 0){
	    		 image=image.replace("data:image/jpeg;base64,","");
	    	 }else if(image.indexOf("data:image/png;base64,") == 0){
	    		 image=image.replace("data:image/png;base64,","");
	    	 }
	    	 var arr={"image":image,"imageName":imageName,"thisUserID":window.top.loginid};
	    	 $.ajax({
		    	 url:carUrl+"public/uploadFile",
		    	 type:"POST",
		    	 data:arr,
		    	 success:function(res){
		    		 console.log(res);
		    		 if(res.result){
		    			 saveInfo(obj,res.data);
		    		 }else{
		    			 layer.msg(res.msg,{time:2000});
		    			 return;
		    		 }
		    	 }
		     })
	     }else if(image == "../img/add_img.png"){//没有上传图片
	    	 saveInfo(obj,"");
	     }else if(image != "../img/add_img.png"){//图片路径
	    	 image=image.replace(carUrl,"");
	    	 saveInfo(obj,image);
	     }
    });
	 //点击取消
	 $("#resetData").click(function(){
		parent.layer.closeAll();
	 })
	 /* 自定义验证规则 */
	    form.verify({
	    	carnumber:function(value){
				  var reg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}[A-Z0-9挂学警港澳]?$/;
				  if(!reg.test(value)){
					  return '请正确输入车牌号!';
				  }
			  }
	    });
})

function saveInfo(obj,imgPath){
	 var fid=$("#fid").val();
     obj.fid=fid;
     obj.imgPath=imgPath;
     obj.useDeptList=$("#unitno").val();
     var  toggle="car/carManager/addCarInfo";//非免派车
     $.ajax({
    	 url:carUrl+toggle,
		 type:"POST",
		 data:obj,
    	 success:function(res){
    		 console.log(res);
    		 if(res.result){
				 layer.msg(res.msg,{time:1000},function(){
					 parent.layer.closeAll();
					 window.parent.location.reload();
				 })
    		 }else{
				 layer.msg(res.msg,{time:2000});
    		 }
    	 }
     })
}

//编辑时获取一条信息
function getOneInfo(){
	$.ajax({
		url:carUrl+"car/carManager/getOneInfo",
		type:"POST",
		data:{"fid":getUrlParam("id"),"thisUserID":window.top.loginid},
		async:false,
		success:function(res){
			console.log(res);
			if(res.result){
				$("#fid").val(res.data.fid);
				 $("#carNum").val(res.data.carNum);
				 $("#parkID").val(res.data.parkID);
				 $("#purpose").val(res.data.purpose);
				 $("#unitno").val(res.data.useDeptList);
				 $("#unitname").html(res.data.useDeptName);
				 $("#kilometers").val(res.data.kilometers);
				 $("#repairRecord").val(res.data.repairRecord);
				 $("#carType").val(res.data.carType);
				 $("#startDate").val(res.data.startDate);
				 $("#endDate").val(res.data.endDate);
				 $("#remark").val(res.data.remark);
				 if(res.data.imgPath != "" && res.data.imgPath !=undefined && res.data.imgPath != null){
					 $("#scenePhoto").attr("src",carUrl+res.data.imgPath);
				 }
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render('checkbox');
				})
			}
		}
	})
}
//获取停车场列表
function getParking(){
	$.ajax({
		url:carUrl+"car/parking/getParkingList",
		type:"POST",
		data:{
			"thisUserID":window.top.loginid,
	    	"code":"",
	    	"parkName":"",
	    	"location":"",
	    	"status":1
		},
		async:false,
		success:function(res){
			console.log(res);
			$("#parkID option").not("option:first").remove();
			if(res.result){
				for(var item of res.data){
					var $opt=$("<option value="+item.fid+">"+item.parkName+"</option>");
					$("#parkID").append($opt);
				}
				layui.use("form",function(){
					var form=layui.form;
					form.render();
				})
			}
		}
	})
}
//选择图片
$("#sceneFile").change(function(e){
	var imgUrl=this.files[0];
	var imgName=imgUrl.name;
	var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]); // 读出 base64
    reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
         var dataURL = reader.result;//base64
         $("#scenePhoto").attr("src",dataURL).attr("data-imgname",imgName);
    };
})
//获取单位下拉
function getTree(){
	$.ajax({
		url:url+"/UnitList/getTree",
		type:"POST",
		data:{"loginid":window.top.loginid}, 
		async:false,
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

//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}