package com.xr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.configure.MethodLog;
import com.xr.entry.PageInfo;
import com.xr.entry.SystemLog;
import com.xr.service.ISystemLogService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("SystemLog")
@Api(tags="SystemLog",description="接口标题：操作日志层接口")
public class SystemLogController {
	@Autowired
	private ISystemLogService ics;
	 
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */@ApiOperation(httpMethod="POST",value="接口说明：查询列表接口",notes="接口的notes说明")
		@ApiImplicitParams({
			@ApiImplicitParam(name="id",value="用户id",required=false,dataType="String",paramType="path")})
		@MethodLog(methodName="删除",remark="删除日志")
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
			map.put("reason", "程序异常，请联系管理员！");
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
		@ApiImplicitParam(name="id",value="用户id",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="userid",value="用户名称",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="username",value="用户名称：模糊查询时的传参",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="type",value="操作类型",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="content",value="操作内容",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="netip",value="登录人ip",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="date",value="操作时间",required=false,dataType="String",paramType="path")})
	@RequestMapping(value="/getList",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getList(Integer curpage,Integer pagesize,SystemLog record,String date1,String date2){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("username", record.getUsername());
			m.put("type", record.getType());
			m.put("date1", date1);
			m.put("date2", date2);
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			List<Map<String,Object>> list=ics.getListService(m);
			int count=ics.getListCountService(m);
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
	
	 

}
