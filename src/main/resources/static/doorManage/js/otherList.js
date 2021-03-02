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
			    url:url+'/SynBoxRecord/getHolder',
			    cellMinWidth: 80,
			    height: "full-232",
			    method:"POST",
//			    request:{
//			    	pageName:"page",
//			    	limitName:"pageSize",
//			    },
			    where:{
			    	"boxid":getUrlParam("id"),
			    	"holderno":"",
			    	"state":1
			    },
			    parseData: function(res){ //res 即为原始返回的数据
			    	console.log(res);
			        return {
			          "code": res.flag==true?"0":"", //解析接口状态
			          "msg": res.reason, //解析提示文本
			          "count": res.count, //解析数据长度
			          "data": res.result //解析数据列表
			        };
			      },
			    cols:  [[
			    	  {type:"checkbox"},
			    	  {field:'ID', title:'序号', width:100,sort:true,templet:function(d){
						  return d.LAY_TABLE_INDEX+1
					  }},
					  {field:'holderno', title:'人员编号', width:250},
				      {field:'holdername', title:'人员姓名', width:250,sort:true},
					  {field:'unitname', title:'所属单位', width:250,sort:true},
					  {field:'emptype', title:'人员类别', width:250,sort:true},
					  {field:'photo', title:'人员照片', width:200,sort:true,templet:function(d){
					      var photo=d.photo==undefined?"../img/add_img.png":d.photo;
					      return "<img src="+photo+" style='height:60px;object-fit:contain'>";
					  }},
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
					 var holderno=checkArr.data[i].holderno;
					 var holdername=checkArr.data[i].holdername;
					 var photostr=checkArr.data[i].photostr;
					 var boxid=getUrlParam("id");
					 var boxip=getUrlParam("ip");
					 saveInfo(boxid,boxip,holderno,holdername,photostr,i,num,index);
				 }
			 })
			 //点击取消
			 $("#resetData").click(function(){
				parent.layer.closeAll();
			 })
			 
	})
}

//提交数据
function saveInfo(boxid,boxip,holderno,holdername,photostr,i,num,index){
	var obj={"boxid":boxid,"boxip":boxip,"holderno":holderno,"holdername":holdername,
			"state":"1","photostr":photostr,"loginid":window.top.loginid};
	$.ajax({
		url:url+'/SynBoxRecord/insert',
		type:"POST",
		data:obj,
		success:function(res){
			console.log(res)
			if((i+1) == num){//最后一次循环
				layer.close(index);
				layer.msg(res.reason,{time:1000},function(){
					initTable();
					parent.$("#familyCar")[0].contentWindow.getSynCarList(getUrlParam("id"));
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