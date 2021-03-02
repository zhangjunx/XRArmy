package com.xr.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.configure.MethodLog;
import com.xr.entry.HolderLeave;
import com.xr.service.IHolderLeaveService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("HolderLeave")
@Api(tags="HolderLeave",description="接口标题：请假类的接口")
public class HolderLeaveController {
    private static Logger logger = LoggerFactory.getLogger(HolderLeaveController.class);
	
	@Autowired
	private IHolderLeaveService ics;
	
	private SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	

	/**
	 * 查询列表
	 * @param record
	 * @param pageinfo
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="curpage",value="参数：当前页数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="pagesize",value="参数：每页显示数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="id",value="参数：请假id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="holderno",value="参数：请假人id",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="holdername",value="参数：请假人姓名",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="unitno",value="参数：所属单位id",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="state",value="参数：申请类型",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="type",value="参数：请假类别",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="date",value="参数：申请时间",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="date1",value="参数：开始时间",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="date2",value="参数：结束时间",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="applystatus",value="参数：申请状态",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@RequestMapping("/getList")
	@ResponseBody
	public Map<String,Object> getList(Integer curpage,Integer pagesize,String name,HolderLeave record,String date,String date1,String date2,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			if(loginid!=null && !"".equals(loginid) && "administrator".equals(loginid)){
				loginid="";
			}
			m.put("id", record.getId());
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			m.put("state", record.getState());
			m.put("date", date);
			m.put("date1", date1);
			m.put("date2", date2);
			m.put("name", name);
			m.put("applystatus", record.getApplystatus());
			m.put("createperson", record.getCreateperson());
			List<Map<String,Object>> list=ics.getListService(m);
			int count = ics.getListCountService(m);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
				map.put("count", count);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	

	/**
	 * 查询列表
	 * @param record
	 * @param pageinfo
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="curpage",value="参数：当前页数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="pagesize",value="参数：每页显示数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="name",value="参数：请假人姓名",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="date",value="参数：请假时间",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="state",value="参数：申请类型",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@RequestMapping("/getUnaudited")
	@ResponseBody
	public Map<String,Object> getUnaudited(Integer curpage,Integer pagesize,String date,String name,String state,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			if(loginid!=null && !"".equals(loginid) && "administrator".equals(loginid)){
				loginid="";
			}
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			m.put("state", state);
			m.put("date", date);
			m.put("name", name);
			m.put("loginid", loginid);
			List<Map<String,Object>> list=ics.getUnauditedService(m);
			int count = ics.getUnauditedCountService(m);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", list);
				map.put("count", count);
			}else{
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/**
	 * 审批同意
	 * @param id
	 * @param loginid
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：审批同意接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：主键id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@MethodLog(methodName="修改",remark="审批同意")
	@RequestMapping("/agree")
	@ResponseBody
	public Map<String,Object> agree(Integer id,String level,String applystatus,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			HolderLeave record=ics.selectByPrimaryKeyService(id);
			String flowtracing=record.getFlowtracing();
			if(level.equals("1") && applystatus.equals("10")){
				//一级审批
				record.setApplystatus("50");
				record.setApproverdate1(new Date());
				record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"审批同意！");
			}else if(level.equals("2")){
				//二级级审批
				if(applystatus.equals("10")){
					record.setApplystatus("20");
					record.setApproverdate1(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"一级审批同意！");
				}else if(applystatus.equals("20")){
					record.setApplystatus("50");
					record.setApproverdate2(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"二级审批同意！");
				}
			}else if(level.equals("3")){
				//三级级审批
				if(applystatus.equals("10")){
					record.setApplystatus("20");
					record.setApproverdate1(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"一级审批同意！");
				}else if(applystatus.equals("20")){
					record.setApplystatus("30");
					record.setApproverdate2(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"二级审批同意！");
				}else if(applystatus.equals("30")){
					record.setApplystatus("50");
					record.setApproverdate3(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"三级审批同意！");
				}
			}else if(level.equals("4")){
				//四级级审批
				if(applystatus.equals("10")){
					record.setApplystatus("20");
					record.setApproverdate1(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"一级审批同意！");
				}else if(applystatus.equals("20")){
					record.setApplystatus("30");
					record.setApproverdate2(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"二级审批同意！");
				}else if(applystatus.equals("30")){
					record.setApplystatus("40");
					record.setApproverdate3(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"三级审批同意！");
				}else if(applystatus.equals("40")){
					record.setApplystatus("50");
					record.setApproverdate4(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"四级审批同意！");
				}
			}
			int i=ics.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "审批同意成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "审批同意失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	
	/**
	 * 审批驳回
	 * @param id
	 * @param loginid
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：审批驳回接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：主键id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@MethodLog(methodName="修改",remark="请假审批驳回")
	@RequestMapping("/refuse")
	@ResponseBody
	public Map<String,Object> refuse(Integer id,String level,String applystatus,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			HolderLeave record=ics.selectByPrimaryKeyService(id);
			String flowtracing=record.getFlowtracing();
			if(level.equals("1")){
				//一级审批
				if(applystatus.equals("10")){
					record.setApplystatus("51");
					record.setApproverdate1(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"审批驳回！");
				}
			}else if(level.equals("2")){
				//二级级审批
				if(applystatus.equals("10")){
					record.setApplystatus("21");
					record.setApproverdate1(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"一级审批驳回！");
				}else if(applystatus.equals("20")){
					record.setApplystatus("31");
					record.setApproverdate2(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"二级审批驳回！");
				}
			}else if(level.equals("3")){
				//三级级审批
				if(applystatus.equals("10")){
					record.setApplystatus("21");
					record.setApproverdate1(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"一级审批驳回！");
				}else if(applystatus.equals("20")){
					record.setApplystatus("31");
					record.setApproverdate2(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"二级审批驳回！");
				}else if(applystatus.equals("30")){
					record.setApplystatus("41");
					record.setApproverdate3(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"三级审批驳回！");
				}
			}else if(level.equals("4")){
				//四级级审批
				if(applystatus.equals("10")){
					record.setApplystatus("21");
					record.setApproverdate1(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"一级审批驳回！");
				}else if(applystatus.equals("20")){
					record.setApplystatus("31");
					record.setApproverdate2(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"二级审批驳回！");
				}else if(applystatus.equals("30")){
					record.setApplystatus("41");
					record.setApproverdate3(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"三级审批驳回！");
				}else if(applystatus.equals("40")){
					record.setApplystatus("51");
					record.setApproverdate4(new Date());
					record.setFlowtracing(flowtracing+loginid+"于"+sdf.format(new Date())+"四级审批驳回！");
				}
			}
			int i=ics.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "审批驳回成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "审批驳回失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	 
	/**
	 * 新增
	 * @param record
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：新增接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="holderno",value="参数：请假人id",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="holdername",value="参数：请假人姓名",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="unitno",value="参数：所属单位id",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="unitname",value="参数：所属单位名称",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="state",value="参数：申请类型",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="type",value="参数：请假类别",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="reason",value="参数：事由或地址",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="statedate",value="参数：开始时间",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="enddate",value="参数：结束时间",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="applystatus",value="参数：申请状态",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="approverone",value="参数：第一审批人",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="approvertwo",value="参数：第二审批人",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="remark",value="参数：备注",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="flowtracing",value="参数：流程追踪",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=false,dataType="String",paramType="path")
		})
	@MethodLog(methodName="新增",remark="新增请假")
	@RequestMapping(value="/insert",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> insert(HolderLeave record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			String startdate=sdf.format(record.getStartdate());
			String enddate=sdf.format(record.getEnddate());
			//开始时间 小于原申请的结束时间
			m.put("holderno", record.getHolderno());
			m.put("date1", startdate);
			List<Map<String,Object>> exist=ics.getListService(m);//
			m.put("date1", "");
			m.put("date2", enddate);
			List<Map<String,Object>> exist2=ics.getListService(m);
			if((exist!=null && exist.size()>0) || (exist2!=null && exist2.size()>0)){
				map.put("flag", false);
				map.put("reason", "对不起， 该时间段您已有其他申请了！");
				return map;
			}
			record.setApplystatus("10");
			
			String state=record.getState();
			if(state==null || state.equals("")){
				state="";
			}else if(state.equals("QJ")){
				state="请假";
			}else if(state.equals("CC")){
				state="出差";
			}else if(state.equals("XJ")){
				state="休假";
			}else if(state.equals("JB")){
				state="加班";
			}else if(state.equals("QT")){
				state="其他";
			}
			String flowtracing=loginid+"于"+sdf.format(new Date())+"填写"+state+"申请！";
			record.setFlowtracing(flowtracing);
			record.setCreateperson(loginid);
			int i=ics.insertSelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "添加成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "添加失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：删除接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：请假id",required=false,dataType="Integer",paramType="path")})
	@MethodLog(methodName="删除",remark="删除请假")
	@RequestMapping(value="/delete",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> delete(Integer id,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ics.deleteByPrimaryKeyService(id); 
			if(i>0){
				map.put("flag", true);
				map.put("reason", "删除成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "删除失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	 
	
	
	

}
