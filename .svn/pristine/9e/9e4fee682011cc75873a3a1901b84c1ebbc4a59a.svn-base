package com.xr.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xr.configure.MethodLog;
import com.xr.entry.BlackCar;
import com.xr.service.IBlackCarService;
import com.xr.tools.ExcelUtil;
import com.xr.tools.ImagePathConfig;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("BlackCar")
@Api(tags="BlackCar",description="接口标题：黑名单车辆层接口")
public class BlackCarController {
	@Autowired
	private IBlackCarService ics;
	
	/**
	 * 新增
	 * @param record
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：新增接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="obj",value="参数：json字符串:{'carplateno':'豫A1234','carplatecolor':'蓝色','carbodycolor':'黑色','cartype':'大众'}",dataType="String",paramType="path"),
		@ApiImplicitParam(name="file",value="参数：图标文件：base64",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="新增",remark="新增黑名单车辆")
	@RequestMapping(value="/insert",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> insert(String file,String obj,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			BlackCar record=JSONObject.parseObject(obj, BlackCar.class);
			String carplateno=record.getCarplateno();
			m.put("carplateno", carplateno);
			List<Map<String,Object>> exist=ics.getListService(m);
			if(exist!=null && exist.size()>0){
				map.put("flag", false);
				map.put("reason", "对不起，该车牌号码已存在了！");
				return map;
			}
			Integer nextid=ics.getNextidService();
			if(file!=null && !"".equals(file)){
				String id="blackc_"+nextid;
				String path=ImagePathConfig.base64ToPath(file, ImagePathConfig.blackcarpic, id);
				record.setPhotostr(path);
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
			System.out.println(ex);
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
		@ApiImplicitParam(name="carplateno",value="参数：车牌号码",dataType="String",paramType="path"),
		@ApiImplicitParam(name="carplatecolor",value="参数：车牌颜色",dataType="String",paramType="path"),
		@ApiImplicitParam(name="carbodycolor",value="参数：车身颜色",dataType="String",paramType="path"),
		@ApiImplicitParam(name="cartype",value="参数：车辆类型",dataType="String",paramType="path"),
		@ApiImplicitParam(name="file",value="参数：图标文件：base64",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="修改",remark="修改黑名单车辆")
	@RequestMapping(value="/update",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> update(BlackCar record,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			String carplateno=record.getCarplateno();
			m.put("carplateno", carplateno);
			List<Map<String,Object>> exist=ics.getListService(m);
			if(exist!=null && exist.size()>0){
				Integer id=Integer.valueOf(String.valueOf(exist.get(0).get("id")));
				if(!id.equals(record.getId())){
					map.put("flag", false);
					map.put("reason", "对不起，该车牌号码已存在了！");
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
	@MethodLog(methodName="删除",remark="删除黑名单车辆")
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
		@ApiImplicitParam(name="name",value="参数：车牌号码:模糊查询时传参",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@RequestMapping(value="/getList",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getList(BlackCar record,String name,Integer curpage,Integer pagesize){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			m.put("id", record.getId());
			m.put("name", name);
			m.put("carplateno", record.getCarplateno());
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			List<Map<String,Object>> list=ics.getListService(m);
			List<Map<String,Object>> result=new ArrayList<Map<String,Object>>();
			for(int i=0;i<list.size();i++){
				Map<String,Object> m1=list.get(i);
				String photostr=String.valueOf(m1.get("photostr"));
				if(photostr!=null && !"".equals(photostr) && !"null".equals(photostr)){
					String imgUrl=ImagePathConfig.blackcarpic+"/"+photostr;
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
	
	
	/**
	 * 读取Excel中的数据
	 * @param file
	 * @throws Exception 
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：读取选择的Excel文件接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="file",value="参数：读取的Excel文件，MultipartFile文件",dataType="MultipartFile",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@ResponseBody
	@RequestMapping(value="/getExcel",method=RequestMethod.POST)
	public Map<String, Object> getExcel(@RequestParam MultipartFile file,String loginid){
		Map<String,Object> map=new HashMap<>();//定义一个map向前端返回数据
		try{
			List<String[]> list =  ExcelUtil.queryExcel(file);//获取表格中的所有数据
		    List<String[]> excel = new  ArrayList<String[]>();//让如数据
	           Iterator<String[]> it = list.iterator();//使用迭代器来循环list
	          while(it.hasNext()){//循环读取
	        	  String[] data =  it.next();//接手每一行excel中的数据
	            int i =  data.length;
	        	  if(data[0]==null || "".equals(data[0]) || "null".equals(data[0])){//判断是否有一整行空值
	        		  it.remove();
	        	  }else{
	        		  excel.add(data);
	        	  }
	          }// end while
		     if(excel.size()==0){
		    	 map.put("flag", false);
		    	 map.put("reason", "暂无数据可查");
		     }else{
		    	 map.put("flag", true);
			     map.put("reason", "查询成功");
			     map.put("result", excel);
		     }
		}catch(Exception ex){
			 map.put("flag", false);
			 System.out.println(ex);
	    	 map.put("reason", "程序错误，请联系管理员");
		}
	    
	  return map;
 }//end
	
	/**
	 *  Excel确定导入
	 *  csc
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：导入接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="data",value="参数：封装的json字符串：{[{'code':'0','name':'男','itemcode':'sex','itemname':'性别'},"
				+ "{'code':'1','name':'女','itemcode':'sex','itemname':'性别'}]}",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="导入",remark="导入黑名单车辆")
	@ResponseBody
	@RequestMapping(value="/addExcel",method=RequestMethod.POST)
	public Map<String, Object> addExcel(String str, String loginid) {
		Map<String, Object> map = new HashMap<>();// 定义一个Map返回给前段
		try {
			JSONArray list = JSONArray.parseArray(str);
			// 用于放入已经存在的item
			List<String> havecarplateno = new ArrayList<>();
			List<String> havename = new ArrayList<>();
			// 用于放入不存在的item
			List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();

			// 检测原材料的物品编码
			for (int i = 0; i < list.size(); i++) {// for循环读取数据中的原材料编码
				Map<String, Object> m = new HashMap<>();
				JSONObject obj = list.getJSONObject(i);
				Map<String, Object> m1=obj;
				String carplateno = String.valueOf(m1.get("carplateno"));
				String photostr = String.valueOf(m1.get("photostr"));
				// 查询carplateno是否重复
				m.put("carplateno", carplateno);
				if(carplateno!=null && !"".equals(carplateno)){
					List<Map<String, Object>> exist = ics.getListService(m);
					if (exist != null && exist.size()>0) {// 如果等于空证明没有被添加过
						havecarplateno.add(carplateno);
						continue;
					}
				}
				
				if(photostr!=null && !"".equals(photostr) && !"null".equals(photostr)){
					String filename=null;
					File file=new File(photostr);
					Calendar c=Calendar.getInstance();
					long l=c.getTimeInMillis();
					if(file.exists() && file.isFile()){
						String base64=ImagePathConfig.readPicPath(photostr);
						filename=ImagePathConfig.base64ToPath(base64, ImagePathConfig.blackcarpic, String.valueOf(l));
						m1.put("photostr", filename);
					}else{
						m1.put("photostr", "");
					}
				}
				result.add(m1);
			} // end for循环

			// 分段插入
			List<Map<String, Object>> zuihou = new ArrayList<Map<String, Object>>();
			for (int i = 0; i < result.size(); i++) {
				int point = 100;// 定义一次添加多少个
				zuihou.add(result.get(i));
				if (point == zuihou.size() || i == result.size() - 1) {
					int t=ics.addExcel(zuihou);
					zuihou.clear();
				}
			} // end for循环

			if (result.size() ==list.size()) {// 如果编码没有重复的,就进行添加
				map.put("flag", true);
				map.put("reason", "全部导入成功！");
			} else if (result.size() ==0){
				map.put("flag", false);
				map.put("reason", "对不起，全部导入失败！");
				map.put("havecarplateno", havecarplateno);
			}else{
				map.put("flag", false);
				map.put("reason", "有的导入成功，有的导入失败！");
				map.put("havecarplateno", havecarplateno);
			}
		} catch (Exception ex) {
			map.put("flag", false);
			System.out.println(ex);
			map.put("reason", "程序错误，请联系管理员");
		}

		return map;
	}// end

}
