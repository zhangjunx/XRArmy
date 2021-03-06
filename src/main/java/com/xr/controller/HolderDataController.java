package com.xr.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.xr.configure.MethodLog;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xr.entry.HolderData;
import com.xr.service.IHolderDataService;
import com.xr.service.IUnitListService;
import com.xr.tools.ExcelUtil;
import com.xr.tools.ImagePathConfig;
import com.xr.tools.ImageSizeUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Controller
@RequestMapping("HolderData")
@Api(tags="HolderData",description="接口标题：用户层接口")
public class HolderDataController {
    private static Logger logger = LoggerFactory.getLogger(HolderDataController.class);
	
	private HttpServletRequest request;
    
	@Autowired
	private IHolderDataService ihds;
	@Autowired
	private IUnitListService iuls;
	
	 
	
	@ApiOperation(httpMethod="POST",value="接口说明：新增接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="holderno",value="参数：人员编号或军人证号",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="holdername",value="参数：人员姓名名",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="name",value="参数：人员姓名名，模糊查询时的传参",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="unitno",value="参数:所属单位id",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="idcode",value="参数:身份证号",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="titleno",value="参数:职务",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="rank",value="参数:军衔",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="emptype",value="参数:人员类型：军人，家属等",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="startdate",value="参数:入伍日期",required=false,dataType="datetime",paramType="path"),
		@ApiImplicitParam(name="enddate",value="参数:退伍日期",required=false,dataType="datetime",paramType="path"),
		@ApiImplicitParam(name="loginid",value="用户id：登录人的账号",required=false,dataType="String",paramType="path")})
	@MethodLog(methodName="新增",remark="新增用户")
	@RequestMapping(value="/insert",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> insert(String file,String obj,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			HolderData record=JSON.parseObject(obj, HolderData.class);
			HolderData user=ihds.selectByPrimaryKeyService(record.getHolderno());
			if(user!=null && !"".equals(user)){
				map.put("flag", false);
				map.put("reason", "对不起，该军人证号或编号已存在了！");
				return map;
			}
			if(file!=null && !file.isEmpty()){
				MultipartFile mfile=ImageSizeUtil.base64ToMultipart(file);
				byte[] bytes=ImageSizeUtil.getFileBytes(mfile);
				file=DatatypeConverter.printBase64Binary(bytes);
				String path=ImagePathConfig.base64ToPath(file, ImagePathConfig.peoplepic, record.getHolderno());
				System.out.println(path);
				record.setPhotostr(path);
			}
			int i=ihds.insertSelectiveService(record);
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
			map.put("reason", "程序错误，请联系管理员！");
		}
		return map;
	}//end
	
	@ApiOperation(httpMethod="POST",value="接口说明：修改接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="holderno",value="参数：人员编号或军人证号",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="holdername",value="参数：人员姓名名",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="name",value="参数：人员姓名名，模糊查询时的传参",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="unitno",value="参数:所属单位id",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="idcode",value="参数:身份证号",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="titleno",value="参数:职务",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="rank",value="参数:军衔",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="emptype",value="参数:人员类型：军人，家属等",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="startdate",value="参数:入伍日期",required=false,dataType="Date",paramType="path"),
		@ApiImplicitParam(name="enddate",value="参数:退伍日期",required=false,dataType="Date",paramType="path"),
		@ApiImplicitParam(name="loginid",value="用户id：登录人的账号",required=false,dataType="String",paramType="path")})
	@MethodLog(methodName="更新",remark="更新人员信息")
	@RequestMapping(value="/update",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> update(String file,String obj,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			HolderData record=JSON.parseObject(obj, HolderData.class);
			if(file!=null && !file.isEmpty()){
				MultipartFile mfile=ImageSizeUtil.base64ToMultipart(file);
				byte[] bytes=ImageSizeUtil.getFileBytes(mfile);
				file=DatatypeConverter.printBase64Binary(bytes);
				String path=ImagePathConfig.base64ToPath(file, ImagePathConfig.peoplepic, record.getHolderno());
				record.setPhotostr(path);
			}
			int i=ihds.updateByPrimaryKeySelectiveService(record);
			if(i>0){
				map.put("flag", true);
				map.put("reason", "更新成功！");
				map.put("result", record);
			}else{
				map.put("flag", false);
				map.put("reason", "更新失败！");
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
		@ApiImplicitParam(name="holderno",value="参数：人员id",required=true,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="登录用户id",required=false,dataType="String",paramType="path")})
	@MethodLog(methodName="删除",remark="人事删除")
	@RequestMapping(value="/delete",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> delete(String holderno,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		try{
			int i=ihds.deleteByPrimaryKeyService(holderno);
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
		@ApiImplicitParam(name="holderno",value="参数：人员编号或军人证号",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="holdername",value="参数：人员姓名名",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="name",value="参数：人员姓名名，模糊查询时的传参",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="unitno",value="参数:所属单位id",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="idcode",value="参数:身份证号",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="titleno",value="参数:职务",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="rank",value="参数:军衔",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="emptype",value="参数:人员类型：军人，家属等",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="date",value="参数:入伍日期",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="用户id：登录人的账号",required=false,dataType="String",paramType="path")})
	@RequestMapping(value="/getList",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getList(HolderData record,String name,String unitname,String date,String date1,String date2,String loginid,Integer curpage,Integer pagesize){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			System.out.println("登录人id：");
			if(loginid!=null && !"".equals(loginid) && "administrator".equals(loginid)){
				loginid="";
			}
			m.put("loginid", loginid);
			m.put("holderno", record.getHolderno());
			m.put("holdername", record.getHoldername());
			m.put("name", name);
			m.put("unitno", record.getUnitno());
			m.put("unitname", unitname);
			m.put("titleno", record.getTitleno());
			m.put("rank", record.getRank());
			m.put("emptype", record.getEmptype());
			m.put("state", record.getState());
			m.put("date", date);
			m.put("date1", date1);
			m.put("date2", date2);
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			int count=ihds.getListCountService(m);
			List<Map<String,Object>> list=ihds.getListService(m);
			List<Map<String,Object>> result=new ArrayList<Map<String,Object>>();
			for(int i=0;i<list.size();i++){
				Map<String,Object> m1=list.get(i);
				String str=String.valueOf(m1.get("photostr"));
				if(str!=null && !"".equals(str) && !"null".equals(str)){
					String imgUrl=ImagePathConfig.peoplepic+"/"+str;
					String base64=ImagePathConfig.readPicPath(imgUrl);
					m1.put("photo", base64);
				}
				result.add(m1);
			}
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
			map.put("reason", "程序错误，请联系管理员！");
		}
		return map;
	}//end
	
	
	
	/**
	 * 退休提醒
	 * @param record
	 * @return
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：退休预警接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="curpage",value="当前页数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="pagesize",value="每页显示数",required=false,dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="holderno",value="参数：人员编号或军人证号",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="holdername",value="参数：人员姓名名",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="name",value="参数：人员姓名名，模糊查询时的传参",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="unitno",value="参数:所属单位id",required=false,dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="用户id：登录人的账号",required=false,dataType="String",paramType="path")})
	@RequestMapping(value="/getRetire",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getRetire(String holderno,String name,Integer n,String loginid,Integer curpage,Integer pagesize){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			System.out.println("登录人id：");
			if(loginid!=null && !"".equals(loginid) && "administrator".equals(loginid)){
				loginid="";
			}
			if(n==null || "".equals(n)){
				map.put("flag", false);
				map.put("reason", "暂无数据可查！");
				return map;
		    }
			
			m.put("loginid", loginid);
			m.put("curpage", curpage);
			m.put("pagesize", pagesize);
			m.put("holderno", holderno);
			m.put("name", name);
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date=new Date();
			System.out.println("当前时间：");
			System.out.println(sdf.format(date));
			Calendar c=Calendar.getInstance();
			c.setTime(date);
			
			c.add(Calendar.MONTH,n);
			date=c.getTime();
			String date2=sdf.format(date);
			System.out.println("设置后的时间：");
			System.out.println(date2);
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
	
	 
	 
		/**
		 * 查询列表
		 * @param record
		 * @return
		 */
		@ApiOperation(httpMethod="POST",value="接口说明：读取excel文件接口",notes="接口的notes说明")
		@ApiImplicitParams({
			@ApiImplicitParam(name="file",value="参数:excel文件",required=true,dataType="String",paramType="path"),
			@ApiImplicitParam(name="loginid",value="用户id：登录人的账号",required=false,dataType="String",paramType="path")})
		@RequestMapping(value="/getExcel",method=RequestMethod.POST)
		@ResponseBody
		public Map<String,Object> getExcel(@RequestParam MultipartFile file,String loginid){
			Map<String,Object> map=new HashMap<String,Object>();
			Map<String,Object> m=new HashMap<String,Object>();
			try{
				List<String[]> list=ExcelUtil.queryExcel(file);
				List<String[]> result=new ArrayList<String[]>();
				Iterator<String[]> it=list.iterator();
				while(it.hasNext()){
					String[] data=it.next();
					int i=data.length;
					if(i<=2){
						it.remove();
					}else{
						result.add(data);
					}
				}
				if(result!=null && result.size()>0){
					map.put("flag", true);
					map.put("reason", "查询成功！");
					map.put("result", result);
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
		
		
		
		 
		/**
		 * 查询列表
		 * @param record
		 * @return
		 */
		@ApiOperation(httpMethod="POST",value="接口说明：导入接口",notes="接口的notes说明")
		@ApiImplicitParams({
			@ApiImplicitParam(name="str",value="参数：json字符串：{[{'holderno':'1001','holdername':'alone','sexname':'女',"
					+ "'unitno':'001001','titleno':'1','rank':'军衔','idcode':'412829199910107301','startdate':'2020-12-15','enddate':'2021-01-12'},{},...]}",required=false,dataType="String",paramType="path"),
			@ApiImplicitParam(name="loginid",value="用户id：登录人的账号",required=false,dataType="String",paramType="path")})
		@RequestMapping(value="/addExcel",method=RequestMethod.POST)
		@ResponseBody
		public Map<String,Object> addExcel(String str,String state,String loginid){
			Map<String,Object> map=new HashMap<String,Object>();
			
			try{
				JSONArray arr=JSONArray.parseArray(str);
				List<Map<String,Object>> result=new ArrayList<Map<String,Object>>();
				List<String> haveholder=new ArrayList<String>();
				List<String> nohaveunit=new ArrayList<String>();
				for(int i=0;i<arr.size();i++){
					Map<String,Object> m=new HashMap<String,Object>();
					Map<String,Object> m1=new HashMap<String,Object>();
					JSONObject obj=arr.getJSONObject(i);
					String holderno=String.valueOf(obj.get("holderno"));
					String holdername=String.valueOf(obj.get("holdername"));
					String sexname=String.valueOf(obj.get("sexname"));
					String unitno=String.valueOf(obj.get("unitname"));
					String idcode=String.valueOf(obj.get("idcode"));
					String photostr=String.valueOf(obj.get("file"));
					m.put("holderno", holderno);
					List<Map<String,Object>> exist=ihds.getListService(m);
					if(exist!=null && exist.size()>0){
						haveholder.add(holderno);
						continue;
					}
					m.clear();
					m.put("unitname", unitno);
					List<Map<String,Object>> exist2=iuls.getListService(m);
					if(exist2==null || exist2.size()==0){
						nohaveunit.add(unitno);
						continue;
					}else{
						unitno=String.valueOf(exist2.get(0).get("unitno"));
					}
					m1.put("holderno", holderno);
					m1.put("holdername", holdername);
					m1.put("sexname", sexname);
					m1.put("unitno", unitno);
					m1.put("idcode", idcode);
					m1.put("state", state);
					if(state.equals("0")){
						//现役军人
						String titleno=String.valueOf(obj.get("titleno"));
						String rank=String.valueOf(obj.get("rank"));
						String startdate=String.valueOf(obj.get("startdate"));
						String enddate=String.valueOf(obj.get("enddate"));
						m1.put("titleno", titleno);
						m1.put("rank", rank);
						m1.put("startdate", startdate);
						m1.put("enddate", enddate);
					}else if(state.equals("1")){
						//其他人员
						String emptype=String.valueOf(obj.get("emptype"));
						m1.put("emptype", emptype);
					}
					//处理图片路径
					if(photostr!=null && !"".equals(photostr) && !"null".equals(photostr)){
						//String imgUrl=ImagePathConfig.peoplepic+"/"+photostr;
						File f=new File(photostr);
						if(!f.exists() || !f.isFile()){
							m1.put("photostr", "");
						}else{
							String base64=ImagePathConfig.readPicPath(photostr);
							photostr=ImagePathConfig.base64ToPath(base64, ImagePathConfig.peoplepic, holderno);
							m1.put("photostr", photostr);
						}
					}
					
					result.add(m1);
				}
				List<Map<String,Object>> pici=new ArrayList<Map<String,Object>>();
				for(int i=0;i<result.size();i++){
					int point=100;
					pici.add(result.get(i));
					if(pici.size()==point || i==result.size()-1){
						ihds.addExcel(pici);
						pici.clear();
					}
				}
				if(result.size()==arr.size()){
					map.put("flag", true);
					map.put("reason", "全部导入成功！");
				}else if(result.size()==0){
					map.put("flag", false);
					map.put("reason", "对不起，全部导入失败！");
					map.put("haveholder", haveholder);
					map.put("nohaveunit", nohaveunit);
				}else{
					map.put("flag", false);
					map.put("reason", "有的导入成功，有的导入失败！");
					map.put("haveholder", haveholder);
					map.put("nohaveunit", nohaveunit);
				}
			}catch(Exception ex){
				map.put("flag", false);
				System.out.println(ex);
				map.put("reason", "程序错误，请联系管理员！");
			}
			return map;
		}//end
		
		
	
	 
}
