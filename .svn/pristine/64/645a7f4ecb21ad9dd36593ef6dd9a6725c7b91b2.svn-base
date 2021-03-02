initTable();
function initTable(){
	layui.use(["form","table","laydate"],function(){
		 var $ = layui.$,
		  form = layui.form,
		  table = layui.table,
		  laydate=layui.laydate;
		
		 //执行一个laydate实例
		  laydate.render({
		    elem: '#startDate' //指定元素
		  });
		  laydate.render({
		    elem: '#endDate' //指定元素
		  });
		  //监听一键同步
		  form.on('submit(LAY-async-search)', function(){
			  oneAsync();
		  });
		  //监听搜索
		  form.on('submit(LAY-user-front-search)', function(data){
		    var field = data.field;
		    //执行重载
		    table.reload('LAY-user-manage', {
		      where: field
		    });
		  });
		  table.render({
			    elem: '#LAY-user-manage',
			    url:carUrl+'car/carManagerFamily/getSynFailList',
			    cellMinWidth: 80,
			    height: "full-232",
			    method:"POST",
			    request:{
			    	pageName:"page",
			    	limitName:"pageSize",
			    },
			    where:{
			    	"thisUserID":window.top.loginid,
			    	"carNum":"",
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
			    cols:  [[
			    	  {type:"checkbox"},
			    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
						  return d.LAY_TABLE_INDEX+1
					  }},
					  {field:'carNum', title:'车牌号', width:150},
				      {field:'parkName', title:'停车场', width:110,sort:true},
					  {field:'purpose', title:'车辆用途', width:250,sort:true},
					  {field:'optType', title:'操作类型',templet:function(d){
				    	 if(d.optType == "update"){
				    		 return "修改";
				    	 }else if(d.optType == "delete"){
				    		 return "删除";
				    	 }else if(d.optType == "add"){
				    		 return "添加";
				    	 }
					  }},
				    ]],
//				    page: true,
//				    limit:15,
//					limits:[15,20,30,40,50,60,70,80,90],
				
			  });
	})
}

//一键同步
function oneAsync(){
	var checkArr= layui.table.checkStatus('LAY-user-manage');
	var synFids="";
	for(var item of checkArr.data){
		if(synFids==""){
			synFids=item.synID;
		}else{
			synFids=item.synID+","+synFids;
		}
	}
	$.ajax({
		url:carUrl+'car/carManagerFamily/synFailRecord',
		type:"POST",
		data:{"thisUserID":window.top.loginid,"synFids":synFids},
		success:function(res){
			layer.msg(res.msg,{time:2000});
			if(res.result){
				initTable();
			}
		}
	})
}