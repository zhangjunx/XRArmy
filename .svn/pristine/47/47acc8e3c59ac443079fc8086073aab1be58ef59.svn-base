package com.xr.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xr.configure.MethodLog;
import com.xr.entry.AlarmCar;
import com.xr.service.IAlarmCarService;
import com.xr.tools.ImagePathConfig;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("AlarmCar")
@Api(tags="AlarmCar",description="接口标题：车辆报警记录层接口")
public class AlarmCarController {
	@Autowired
	private IAlarmCarService ics;
	
	/**
	 * 新增
	 * @param record
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：新增接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="carplateno",value="参数：车牌号码",dataType="String",paramType="path"),
		@ApiImplicitParam(name="carplatecolor",value="参数：车牌颜色",dataType="String",paramType="path"),
		@ApiImplicitParam(name="carbodycolor",value="参数：车身颜色",dataType="String",paramType="path"),
		@ApiImplicitParam(name="cartype",value="参数：车辆类型",dataType="String",paramType="path"),
		@ApiImplicitParam(name="file",value="参数：图标文件：base64",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="新增",remark="新增车辆报警记录")
	@RequestMapping(value="/insert",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> insert(AlarmCar record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
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
	 * 新增
	 * @param record
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：新增接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：姓名:模糊查询时传参",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="state",value="参数：状态：0未处理，1已处理",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="修改",remark="处理车辆报警记录")
	@RequestMapping(value="/update",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> update(AlarmCar record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			int i=ics.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "处理成功！");
			}else{
				map.put("flag", false);
				map.put("reason", "处理失败！");
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
		@ApiImplicitParam(name="id",value="参数：主键id",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="删除",remark="删除车辆报警记录")
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
		@ApiImplicitParam(name="carplateno",value="参数：车牌号码",dataType="String",paramType="path"),
		@ApiImplicitParam(name="channelno",value="参数：报警通道",dataType="String",paramType="path"),
		@ApiImplicitParam(name="sourcename",value="参数：报警来源:模糊查询时传参",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@RequestMapping(value="/getList",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getList(AlarmCar record,String loginid,Integer curpage,Integer pagesize){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("carplateno", record.getCarplateno());
			m.put("channelno", record.getChannelno());
			m.put("sourcename", record.getSourcename());
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			List<Map<String,Object>> list=ics.getListService(m);
			List<Map<String,Object>> result=new ArrayList<Map<String,Object>>();
			for(int i=0;i<list.size();i++){
				Map<String,Object> m1=list.get(i);
				String photostr=String.valueOf(m1.get("photostr"));
				if(photostr!=null && !"".equals(photostr) && !"null".equals(photostr)){
					String imgUrl=ImagePathConfig.alarmcarpic+"/"+photostr;
					String base64=ImagePathConfig.readPicPath(imgUrl);
					m1.put("photo", base64);
				}
				result.add(m1);
			}
			int count=ics.getListCountService(m);
			if(list!=null && list.size()>0){
				map.put("flag", true);
				map.put("reason", "查询成功！");
				map.put("result", result);
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
