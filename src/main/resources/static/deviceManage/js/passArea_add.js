initPass();
getOneInfo();
layui.use(["form","table","laydate","tree"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate = layui.laydate;
	 var tree = layui.tree;
	  
	 lay('.time').each(function() {
			laydate.render({
				elem : this,//元素
				type:"time",
				trigger : 'click',//怎么触发
			});
	 });
	//监听提交按钮    
	 form.on('submit(component-form-demo1)', function(data){
		 for(var i=0;i<$(".time").length;i++){
			if( i%2 != 0){//结束时间
				var time2=$(".time").eq(i).val();//结束时间
				var time1=$(".time").eq(i-1).val();//开始时间
				var shiduan=$(".time").eq(i).parent().prev().html();//时段
				var week=$(".time").eq(i).parent().parent().siblings().eq(0).find(".weekday").html();//星期
				if( time2 < time1){
					layer.msg(week+shiduan+"结束时间不能小于开始时间!",{time:2000});
					return;
				}
			}
		 }
		 var arr=[];
		 for(var i=0;i<$(".weekday").length;i++){
			 var index=i+1;
			 var weekday=$(".weekday").eq(i).html();
			 var list=[];
			 var timestr="";
			 for(var k=0;k<$(".time"+index+"").length;k++){
				 var time=$(".time"+index+"").eq(k).val();
				 if(k%2 == 0){
					 timestr+=time+"-";
				 }else{
					 if(k == $(".time"+index+"").length - 1){
						 timestr+=time;
					 }else{
						 timestr+=time+",";
					 }
				 }
			 }
			 timestr=timestr.split(",");
			 list.push(timestr);
			 arr.push({
				 "weekday":weekday,
				 "timearr":list
			 })
		 }
		 var checkData = tree.getChecked('demoId');
		 var arrList=getChildren(checkData,returnValue=[]);
		 var arrStr=[];
		 for(var item of arrList){
			 if(item.id.indexOf("cc") == 0){//通道
				 var id=item.id.replace("cc","");
				 arrStr.push(id);
			 }
		 }
		 if(arrStr.length == 0){
			 layer.msg("请选择通道!",{time:2000});
			 return;
		 }
		 var toggle="/AccessGroupChannel/add";
		 var obj={"groupid":getUrlParam("id"),"type":"aa","str":JSON.stringify(arrStr),"loginid":window.top.loginid};
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
	 //点击移除
	 $("#resetData").click(function(){
		//parent.layer.closeAll();
		 var checkData = tree.getChecked('demoId');
		 var arrList=getChildren(checkData,returnValue=[]);
		 var arrStr=[];
		 for(var item of arrList){
			 if(item.id.indexOf("cc") == 0){//通道
				 var id=item.id.replace("cc","");
				 arrStr.push(id);
			 }
		 }
		 if(arrStr.length == 0){
			 layer.msg("请选择通道!",{time:2000});
			 return;
		 }
		 var toggle="/AccessGroupChannel/add";
		 var obj={"groupid":getUrlParam("id"),"type":"dd","str":JSON.stringify(arrStr),"loginid":window.top.loginid};
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
	 })///end
})

//点击时间段外是否允许外出复选框
$(".timeGroup h2 span").click(function(){
	if($(this).hasClass("curr")){
		$(this).removeClass("curr");
	}else{
		$(this).addClass("curr");
	}
})

//编辑时获取一条信息
function getOneInfo(){
	$.ajax({
		url:url+"/AccessGroup/getList",
		type:"POST",
		data:{"id":getUrlParam("id")},
		async:false,
		success:function(data){
			console.log(data);
			if(!data.flag){
				return;
			}
			var res=data.result[0];
			var arr=[];
			if(res.channels != undefined && res.channels != null){
				for(var item of res.channels){
					var id="cc"+item.channelno;
					arr.push(id);
				}
				layui.use(['form','tree'], function(){
					 var form = layui.form; 
					 var tree=layui.tree;
					 tree.setChecked('demoId', arr); //批量勾选 id 为 2、3 的节点
				})
			}
		}
	})
}

//获取所有通道
function initPass(){
	$.ajax({
		url:url+"/ChannelData/getTree",
		type:"POST",
		async:false,
		success:function(data){
			console.log(data)
			$("#passList").empty();
			if(data.flag){
				layui.use('tree', function(){
				    var tree = layui.tree;
				    //渲染
				    var inst1 = tree.render({
				        elem: '#passList',
				        data: data.result,
				        onlyIconControl:true,
				        showCheckbox:true,
				        id: 'demoId', //定义索引
				        oncheck: function(obj){
//				            console.log(obj.data); //得到当前点击的节点数据
//				            console.log(obj.checked); //得到当前节点的展开状态：open、close、normal
//				            console.log(obj.elem); //得到当前节点元素
				        }
				    });
				});
			}
		}
	})
}


//递归函数
function  getChildren (list,returnValue=[]) {
    for(let i in list){
     //把元素都存入returnValue
     returnValue.push(list[i])
     if (list[i].children) {
         getChildren(list[i].children, returnValue)
     }
    }
    return returnValue
}
//url地址中解析参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}