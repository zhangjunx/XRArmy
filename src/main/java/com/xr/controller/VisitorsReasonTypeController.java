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
import com.xr.entry.VisitorsReasonType;
import com.xr.service.IVisitorsReasonTypeService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("VisitorsReasonType")
@Api(tags="VisitorsReasonType",description="接口标题：事由层接口")
public class VisitorsReasonTypeController {
	@Autowired
	private IVisitorsReasonTypeService ics;
	
	/**
	 * 新增
	 * @param record
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：新增接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="name",value="参数：事由名称",dataType="String",paramType="path"),
		@ApiImplicitParam(name="code",value="参数：事由值",dataType="String",paramType="path"),
		@ApiImplicitParam(name="note",value="参数：备注",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="新增",remark="新增事由")
	@RequestMapping(value="/insert",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> insert(VisitorsReasonType record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("name", record.getName());
			List<Map<String,Object>> exist=ics.getListService(m);
			if(exist!=null && exist.size()>0){
				map.put("flag", false);
				map.put("reason", "对不起，该事由已存在了！");
				return map;
			}
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
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}//end
	
	/**
	 * 修改
	 * @param record
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：修改接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：主键id",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="name",value="参数：事由名称",dataType="String",paramType="path"),
		@ApiImplicitParam(name="code",value="参数：事由值",dataType="String",paramType="path"),
		@ApiImplicitParam(name="note",value="参数：备注",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="修改",remark="修改事由")
	@RequestMapping(value="/update",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> update(VisitorsReasonType record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("name", record.getName());
			List<Map<String,Object>> exist=ics.getListService(m);
			if(exist!=null && exist.size()>0){
				Integer id=Integer.valueOf(String.valueOf(exist.get(0).get("id")));
				if(!id.equals(record.getId())){
					map.put("flag", false);
					map.put("reason", "对不起，该事由已存在了！");
					return map;
				}
			}
			int i=ics.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "更新成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "更新失败！");
			}
		}catch(Exception ex){
			map.put("flag", false);
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
		@ApiImplicitParam(name="id",value="参数：主键id",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="删除",remark="删除事由")
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
		@ApiImplicitParam(name="curpage",value="参数：当前页数",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="pagesize",value="参数：每页显示数",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="id",value="参数：主键id",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="name",value="参数：事由名称",dataType="String",paramType="path"),
		@ApiImplicitParam(name="reasonname",value="参数：事由名称:模糊查询时传参",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@RequestMapping(value="/getList",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getList(VisitorsReasonType record,String reasonname,Integer curpage,Integer pagesize){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("name", record.getName());
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			m.put("reasonname", reasonname);
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
