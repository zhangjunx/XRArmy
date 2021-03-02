initTable();
function initTable(){
	layui.use(["form","table","laydate"],function(){
		 var $ = layui.$,
		  form = layui.form,
		  table = layui.table,
		  laydate=layui.laydate;
		
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
			    url:carUrl+'car/carManager/getDisSynCarList',
			    cellMinWidth: 80,
			    height: "full-232",
			    method:"POST",
//			    request:{
//			    	pageName:"page",
//			    	limitName:"pageSize",
//			    },
			    where:{
			    	"boxID":getUrlParam("id"),
			    	"carNum":""
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
					  {field:'carNum', title:'车牌号', width:250},
				      {field:'parkName', title:'停车场', width:250,sort:true},
					  {field:'purpose', title:'车辆用途', sort:true},
				    ]],
//				    page: true,
//				    limit:15,
//					limits:[15,20,30,40,50,60,70,80,90],
				
			  });
		 
		  	 //监听提交按钮    
			 form.on('submit(component-form-demo1)', function(data){
				 var checkArr= layui.table.checkStatus('LAY-user-manage');
				 var num=checkArr.data.length;
				 if(num == 0){
					 return;
				 }
				 var index=layer.load(2);
				 for(var i=0;i<checkArr.data.length;i++){
					 saveInfo(getUrlParam("id"),getUrlParam("ip"),checkArr.data[i].carNum,checkArr.data[i].carType,checkArr.data[i].fid,i,num,index);
				 }
			 })
			 //点击取消
			 $("#resetData").click(function(){
				parent.layer.closeAll();
			 })
			 
	})
}

//提交数据
function saveInfo(boxID,boxIp,carNum,carType,fid,i,num,index){
	$.ajax({
		url:carUrl+'car/carManager/synCarInfo',
		type:"POST",
		data:{"boxID":boxID,"boxIp":boxIp,"carNum":carNum,"carType":carType,"carClass":"","thisUserID":window.top.loginid,"fid":fid},
		success:function(res){
			console.log(res)
			if((i+1) == num){//最后一次循环
				layer.close(index);
				layer.msg(res.msg,{time:1000},function(){
					initTable();
					parent.getSynCarList(getUrlParam("id"));
				})
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