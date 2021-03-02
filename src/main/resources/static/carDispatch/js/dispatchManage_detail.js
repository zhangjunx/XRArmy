getOneInfo();
layui.use(["form","table","laydate"],function(){
	 var $ = layui.$,
	  form = layui.form,
	  table = layui.table,
	  laydate = layui.laydate;
	 //点击取消
	 $("#resetData").click(function(){
		parent.layer.closeAll();
	 })
	 /* 自定义验证规则 */
    form.verify({
    });
})
//编辑时获取一条信息
function getOneInfo(){
	$.ajax({
		url:carUrl+"car/carBill/getBillList",
		type:"POST",
		data:{"billNo":getUrlParam("billNo")},
		async:false,
		success:function(res){
			console.log(res);
			if(res.result){
				var data=res.data[0];
				$("#carNum").val(data.carNum);
				$("#driverName").val(data.driverName);
				$("#useDeptName").val(data.useDeptName);
				$("#contacts").val(data.contacts);
				$("#phoneNum").val(data.phoneNum);
				$("#route").val(data.route);
				$("#outCarTime").val(data.outCarTime);
				$("#returnCarTime").val(data.returnCarTime);
				$("#billRemark").val(data.billRemark);
				$("#useTask").val(data.useTask);
				$("#reportLocal").val(data.reportLocal);
				$("#basis").val(data.basis);
				$("#task").val(data.task);
				$("#sentry").val(data.sentry);
				$("#outTime").val(data.outTime);
				$("#returnTime").val(data.returnTime);
				$("#sentryRemark").val(data.sentryRemark);
				$("input[value="+data.taskType+"]").attr("checked",true);
				for(var item of data.approverList){
					var $li=$("<li class='approver-item' style='margin-top:0'>"+item.approverName+"</li>");
					if(item.approveLevel == 1){
						$("#approver1").append($li);
					}else if(item.approveLevel == 2){
						$("#approver2").append($li);
					}else if(item.approveLevel == 3){
						$("#approver3").append($li);
					}else if(item.approveLevel == 4){
						$("#approver4").append($li);
					}
				}
				layui.use('form', function(){
					 var form = layui.form; 
					 form.render('checkbox');
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