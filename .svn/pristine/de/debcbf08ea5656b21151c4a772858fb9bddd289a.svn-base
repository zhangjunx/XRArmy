package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.configure.MethodLog;
import com.xr.entry.HolderRetire;
import com.xr.service.IHolderRetireService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("HolderRetire")
@Api(tags="HolderRetire",description="接口标题：退伍记录层接口")
public class HolderRetireController {
    private static Logger logger = LoggerFactory.getLogger(HolderRetireController.class);
	
	@Autowired
	private HttpServletRequest request;
	 
	@Autowired
	private HttpServletResponse response;
	
	@Autowired
	private HttpSession session;
    
	@Autowired
	private IHolderRetireService ihds;
	 
	
	@ApiOperation(httpMethod="POST",value="接口说明：人事退伍接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="holderno",value="参数：退伍人员编号或军人证号",required=true,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="用户id：登录人的账号",required=false,dataType="String",paramType="path")})
	@MethodLog(methodName="退伍",remark="人员退伍")
	@RequestMapping(value="/insert",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> insert(String holderno,String reason,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("holderno", holderno);
			m.put("reason", reason);
			m.put("loginid", loginid);
			int i=ihds.addService(m);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "退伍成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "退伍失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序错误，请联系管理员！");
		}
		return map;
	}//end
	
	 
	@ApiOperation(httpMethod="POST",value="接口说明：删除接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：主键id",required=true,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="登录用户id",required=false,dataType="String",paramType="path")})
	@MethodLog(methodName="删除",remark="删除")
	@RequestMapping(value="/delete",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> delete(Integer id,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ihds.deleteByPrimaryKeyService(id);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "删除成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "删除失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
			map.put("reason", "程序错误，请联系管理员！");
		}
		return map;
	}//end
	
	 
	 
	/**
	 * 查询列表
	 * @param record
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="curpage",value="当前页数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="pagesize",value="每页显示数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="id",value="参数：主键id",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="holderno",value="参数：人员编号或军人证号",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="name",value="参数：人员姓名名，模糊查询时的传参",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="date1",value="参数:入伍开始日期",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="date2",value="参数:入伍结束日期",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="用户id：登录人的账号",required=false,dataType="String",paramType="path")})
	@RequestMapping(value="/getList",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getList(HolderRetire record,String name,String date1,String date2,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			System.out.println(request.getSession().getAttribute("loginid"));
			if(loginid!=null && !"".equals(loginid) && "administrator".equals(loginid)){
				loginid="";
			}
			m.put("loginid", loginid);
			m.put("holderno", record.getHolderno());
			m.put("name", name);
			m.put("id", record.getId());
			m.put("date1", date1);
			m.put("date2", date2);
			List<Map<String,Object>> list=ihds.getListService(m);
			int count=ihds.getListCountService(m);
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
			map.put("reason", "程序错误，请联系管理员！");
		}
		return map;
	}//end
	
	
	 
	 
	 
		
	
	 
}
