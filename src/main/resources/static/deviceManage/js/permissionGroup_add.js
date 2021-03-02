if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
	getOneInfo();
}
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate = layui.laydate;
	  
	 lay('.time').each(function() {
			laydate.render({
				elem : this,//元素
				type:"time",
				trigger : 'click',//怎么触发
			});
	 });
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
		 var obj=data.field
		 var toggle="/AccessGroup/insert";
		 if(getUrlParam("id")!=undefined&&getUrlParam("id")!=null&&getUrlParam("id")!=""){//编辑
			obj.id=getUrlParam("id");
			toggle="/AccessGroup/update";
		 }
	     $.ajax({
		    url:url+toggle,
		    type:"POST",
	    	dataType:"json",
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
		url:url+"/AccessGroup/getList",
		type:"POST",
		data:{"id":getUrlParam("id")},
		success:function(data){
			console.log(data);
			if(!data.flag){
				return;
			}
			var res=data.result[0];
			$("#name").val(res.name);
			$("#remark").val(res.remark);
			var arr=res.data==undefined?"":res.data;
			if(arr.length>0){
				var list2=JSON.parse(arr);
				if(res.data.opendoor_modtime != null){////做过编辑
					list2=JSON.parse(list2);
				}
				console.log(list2);
				for(var j=0;j<list2.length;j++){
					$("#passList li[data-id="+list2[j].pass_id+"]").addClass("curr");
					if(j==0){
						var timeArr=list2[j].timeArr;
						for(var i=0;i<timeArr.length;i++){
							var index=i+1;
							var list=[];
							var arr=timeArr[i].timearr[0];
							for(var k=0;k<arr.length;k++){
								var arrstr=arr[k].split("-");
								list.push(arrstr[0]);
								list.push(arrstr[1]);
							}
							for(var m=0;m<list.length;m++){
								$(".time"+index+"").eq(m).val(list[m]);
							}
						}
					}
				}
			}
			layui.use('form', function(){
				 var form = layui.form; 
				 form.render();
			})
		}
	})
}
//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}