	$(".add").hide();
	if(window.top.loginid!="administrator"){
	for(var item of window.top.arr){
		$("a[data-id="+item+"]").show();
	}
}
var exportData;
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$;
	 var form = layui.form;
	 var table = layui.table;
	 var laydate = layui.laydate;
	 getCombox();
	 lay('.date').each(function() {
		laydate.render({
			elem : this,//元素
			type:'datetime',
			trigger : 'click',//怎么触发
		});
	 });
	 carStatistics();
	 
	//导出
	  $("#export").click(function(){
		  var index=$(".main-tab").find(".label.curr").index();
		  for(var item of exportData){//解决导出时身份证号变成e+17
			  item.idcode+="\t";
		  }
		  if(index == 0){//车辆派遣登记簿
			  table.exportFile("LAY-statistics-manage",exportData, "xls");
		  }else if(index == 1){//各部门用车统计
			  table.exportFile("LAY-carReal-manage",exportData, "xls");
		  }else if(index == 2){//首长用车周统计
			  table.exportFile("LAY-car-manage",exportData, "xls");
		  }
	  })
	 
	 
	  //监听搜索  车辆派遣登记簿
	  form.on('submit(carStatistics)', function(data){
		  data.field.useDept = $("#unitno").val();
		  var field = data.field;
	      //执行重载
	      table.reload('LAY-statistics-manage', {
	    	  where: field
	      });
	  });
	  
	  //监听搜索 各部门用车统计
	  form.on('submit(query)', function(data){
		  data.field.today = "";
		  data.field.thisWeek = "";
		  data.field.useDept = $("#unitno2").val();
		  data.field.startDate = $("#startDate2").val();
		  data.field.endDate = $("#endDate2").val();
		  var field = data.field;
		  //执行重载
	      table.reload('LAY-carReal-manage', {
	    	  where: field
		  });
	  });
	  
	  //监听查询当天   各部门用车统计
	  form.on('submit(queryDay)', function(){
		  var today = getNowDate();
		  var field={"today":today,"useDept":$("#unitno2").val(),"thisWeek":"","startDate":"","endDate":"","billNo":""};
		  //执行重载
		  table.reload('LAY-carReal-manage', {
			  where: field
		  });
	  });
	  //监听查询当周   各部门用车统计
	  form.on('submit(queryWeek)', function(){
		  var thisWeek = getWeekDates();
		  var field={"today":"","useDept":$("#unitno2").val(),"thisWeek":thisWeek,"startDate":"","endDate":"","billNo":""};
	      //执行重载
	      table.reload('LAY-carReal-manage', {
	    	  where: field
	      });
	  });
	  
	  //监听搜索   首长用车周统计
	  form.on('submit(query-lead)', function(data){
		  data.field.today = "";
		  data.field.thisWeek = "";
		  data.field.startDate = $("#startDate3").val();
		  data.field.endDate = $("#endDate3").val();
		  var field = data.field;
		  //执行重载
		  table.reload('LAY-car-manage', {
			  where: field
		  });
	  });
	  //监听查询当天   首长用车周统计
	  form.on('submit(queryDay-lead)', function(){
		  var today = getNowDate();
		  var field={"today":today,"thisWeek":thisWeek,"startDate":"","endDate":"","billNo":""};
		  //执行重载
		  table.reload('LAY-car-manage', {
		  	where: field
		  });
	  });
	//监听查询当周   首长用车周统计
	  form.on('submit(queryWeek-lead)', function(){
		  var thisWeek = getWeekDates();
		  var field={"today":"","thisWeek":thisWeek,"startDate":"","endDate":"","billNo":""};
		  //执行重载
		  table.reload('LAY-car-manage', {
			  where: field
		  });
	  });
	  
	  
	//车辆派遣登记簿
	  function carStatistics(){
	  	 table.render({
	  		    elem: '#LAY-statistics-manage',
	  		    url:carUrl+'car/report/getBillList',
	  		    cellMinWidth: 80,
	  		    height: "full-232",
	  		    method:"POST",
	  		    title:"车辆派遣登记簿",
	  		    request:{
	  		    	 pageName:"curpage",
	  			     limitName:"pagesize",
	  		    },
	  		    where:{
	  		    	"thisUserID":window.top.loginid,
	  		    	"useDept":"",
	  		    	"startDate":"",
	  		    	"endDate":"",
	  		    	"billNo":""
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
	  		    cols:[[
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  			      {field:'useDeptName', title:'用车单位', width:120,sort:true},
	  			      {field:'basis', title:'派遣依据', width:250,sort:true},
	  			      {field:'carNum', title:'车牌号码', width:120,sort:true},
	  				  {field:'route', title:'行驶路线', width:250,sort:true},
	  				  {field:'task', title:'载运任务', width:150,sort:true},
	  				  {field:'driver', title:'驾驶员', width:120,sort:true},
	  				  {field:'approverList', title:'报批领导', width:200,sort:true,templet:function(d){
	  					  var approverList = d.approverList;
	  					  if(approverList != null && approverList.length > 0){
	  						  var approverName = "";
	  						  for(var i=0;i<approverList.length;i++){
	  							  if(approverName == ""){
	  								  approverName = approverList[i].approverName;
	  							  }else{
	  								  approverName = approverName+","+approverList[i].approverName;
	  							  }
	  						  }
	  						  return approverName;
	  					  }else{
	  						  return "";
	  					  }
	  				  }},
	  				 {field:'operateDate', title:'申请时间', width:180,sort:true},
	  				  {field:'remark', title:'备注', sort:true},
	  			    ]],
	  			    page: true,
	  			    limit:15,
				    limits:[15,20,30,40,50,60,70,80,90],
		  		    done: function (res, curr, count) {
						exportData=res.data;
					}
	  		  });
	  }
	  //各部门用车周统计
	  function carRealStatus(){
	  	 table.render({
	  		    elem: '#LAY-carReal-manage',
	  		    url:carUrl+'car/report/getUseCarWithDept',
	  		    cellMinWidth: 80,
	  		    height: "full-232",
	  		    method:"POST",
	  		    title:"各部门用车统计",
	  		    request:{
	  		    	 pageName:"curpage",
	  			     limitName:"pagesize",
	  		    },
	  		    where:{
	  		    	"thisUserID":window.top.loginid,
	  		    	"useDept":"",
	  		    	"startDate":"",
	  		    	"endDate":"",
	  		    	"billNo":"",
	  		    	"today":"",
	  		    	"thisWeek":"",
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
	  		    cols:[[
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  			      {field:'useDeptName', title:'用车单位', width:120,sort:true},
	  			      {field:'basis', title:'派遣依据', width:200,sort:true},
	  			      {field:'carNum', title:'车牌号码', width:120,sort:true},
	  				  {field:'route', title:'行驶路线', width:250,sort:true},
	  				  {field:'task', title:'载运任务', width:150,sort:true},
	  				  {field:'driver', title:'驾驶员', width:120,sort:true},
	  				  {field:'approverList', title:'报批领导', width:250,sort:true,templet:function(d){
	  					  var approverList = d.approverList;
	  					  if(approverList != null && approverList.length > 0){
	  						  var approverName = "";
	  						  for(var i=0;i<approverList.length;i++){
	  							  if(approverName == ""){
	  								  approverName = approverList[i].approverName;
	  							  }else{
	  								  approverName = approverName+","+approverList[i].approverName;
	  							  }
	  						  }
	  						  return approverName;
	  					  }else{
	  						  return "";
	  					  }
	  				  }},
	  				{field:'operateDate', title:'申请时间', width:180,sort:true},
	  				  {field:'remark', title:'备注',sort:true},
	  			    ]],
	  			    page: true,
	  			    limit:15,
				    limits:[15,20,30,40,50,60,70,80,90],
		  		    done: function (res, curr, count) {
						exportData=res.data;
					}
	  		  });
	  }
	  //首长用车周统计
	  function carOutLier(){
	  	 table.render({
	  		    elem: '#LAY-car-manage',
	  		    url:carUrl+'car/report/getUseCarWithLeader',
	  		    cellMinWidth: 80,
	  		    height: "full-232",
	  		    method:"POST",
	  		    title:"首长用车周统计",
	  		    request:{
	  		    	 pageName:"curpage",
	  			     limitName:"pagesize",
	  		    },
	  		    where:{
	  		    	"thisUserID":window.top.loginid,
	  		    	"startDate":"",
	  		    	"endDate":"",
	  		    	"billNo":"",
	  		    	"today":"",
	  		    	"thisWeek":"",
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
	  		    cols:[[
	  		    	  {field:'ID', title:'序号', width:80,sort:true,templet:function(d){
	  					  return d.LAY_TABLE_INDEX+1
	  				  }},
	  			      {field:'leaderName', title:'领导姓名', width:180,sort:true},
	  			      {field:'carNum', title:'车辆号码', width:200,sort:true},
	  			      {field:'carType', title:'车型', width:180,sort:true},
	  				  {field:'driver', title:'驾驶员', width:200,sort:true},
	  				  {field:'remark', title:'备注',sort:true},
	  			]],
	  		    page: true,
	  		    limit:15,
			    limits:[15,20,30,40,50,60,70,80,90],
	  		    done: function (res, curr, count) {
					exportData=res.data;
				}
  		  });
	  }

	  //点击选项卡
	  $(".main-tab .label").click(function(){
		  	$(this).addClass("curr").siblings().removeClass("curr");
		  	var index=$(this).index();
		  	$(".layui-con").eq(index).show().siblings(".layui-con").hide();
		  	if(index == 0){//车辆派遣登记簿
		  		carStatistics();
		  		getCombox();
		  	}else if(index == 1){//各部门用车统计
		  		carRealStatus();
		  		getCombox2();
		  	}else if(index == 2){//首长用车周统计
		  		carOutLier();
		  	}
	  })
})
//点击车辆实时状态下的筛选条件
$(document).on("click","#carBox li",function(){
	$(this).addClass("curr").siblings().removeClass("curr");
})
//点击打印
$("#print").click(function(){
	var index=$(".main-tab").find(".label.curr").index();
	if(index == 0){//车辆派遣登记簿
		print("LAY-statistics-manage");
	}else if(index == 1){//各部门用车统计
		print("LAY-carReal-manage");
	}else if(index == 2){//首长用车周统计
		print("LAY-car-manage");
	}
})

//获取用车单位下拉框
function getCombox(){
	$.ajax({
		url:url+"/UnitList/getTree",
		type:"POST",
		data:{"loginid":window.top.loginid}, 
		success:function(res){
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
				    //unbind('click');解绑点击事件，解决点击一次，然后执行两次方法的问题
			    	$(".downpanel").unbind('click').on("click", ".layui-select-title", function (e) {
				        $(".downpanel.layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
				        $(this).parents(".downpanel").toggleClass("layui-form-selected");
				        layui.stope(e);
				    }).on("click", "dl i", function (e) {
				        layui.stope(e);
				    });
			    	$("body").click(function(){
			    		$(".downpanel").removeClass("layui-form-selected");
			    	})
				});
			}
		}
	})
}

//获取用车单位下拉框
function getCombox2(){
	$.ajax({
		url:url+"/UnitList/getTree",
		type:"POST",
		data:{"loginid":window.top.loginid}, 
		success:function(res){
			if(res.flag){
				layui.use(['element', 'tree', 'layer', 'form', 'upload'], function () {
				    var $ = layui.jquery, tree = layui.tree;
				    tree.render({
				        elem: "#classtree2",
				        data: res.result,
				        onlyIconControl:true,
				        click: function (node) {
				        	$("#unitno2").val(node.data.id);
				        	$("#unitname2").html(node.data.title);
				            var $select = $($(this)[0].elem).parents(".layui-form-select");
				            $select.removeClass("layui-form-selected").find(".layui-select-title span").html(node.name).end().find("input:hidden[name='departmentno']").val(node.id);
				        }
				    });
				    	//unbind('click');解绑点击事件，解决点击一次，然后执行两次方法的问题
				    	$(".downpanel2").unbind('click').on("click", ".layui-select-title", function (e) {
					        $(".downpanel2.layui-form-select").not($(this).parents(".layui-form-select")).removeClass("layui-form-selected");
					        $(this).parents(".downpanel2").toggleClass("layui-form-selected");
					        layui.stope(e);
					    }).on("click", "dl i", function (e) {
					        layui.stope(e);
					    });
				    	$("body").click(function(){
				    		$(".downpanel2").removeClass("layui-form-selected");
				    	})
				});
			}
		}
	})
}

//获取当天日期
function getNowDate(){
	var result="";
	var today = new Date();
	var y = today.getFullYear();
	var m = today.getMonth()+1;
	var d = today.getDate();
	if(m.length == 1){
		y = "0"+y;
	}
	if(d.length == 1){
		y = "0"+d;
	}
	result = y+"-"+m+"-"+d;
	return result;
}
//获取本周日期
function getWeekDates(){
	var res="";
	var now = new Date();
    var nowTime = now.getTime();
    var day = now.getDay();
    var oneDayLong = 24 * 60 * 60 * 1000;
    //计算这一周

    for (var i = 1; i < 8; i++) {
        var SundayTime = nowTime + (i - day) * oneDayLong;
        var SundayTime = new Date(SundayTime);
        var y = SundayTime.getFullYear();//年
        var m = SundayTime.getMonth() + 1;//月
        var d = SundayTime.getDate();//日
        var h = SundayTime.getHours();//时
        var mm = SundayTime.getMinutes();//分
        var s = SundayTime.getSeconds();//秒
        if(m < 10){
        	m = '0'+m;
        }
        if(d < 10){
        	d = '0'+d;
        }
        var val = y+"-"+m+"-"+d;
        if(res == ""){
        	res = val;
        }else{
        	res = res+","+val;
        }
    }
    return res;
}
