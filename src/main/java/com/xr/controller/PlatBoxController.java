package com.xr.controller;

import org.apache.commons.collections.MapUtils;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPatch;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.HttpMultipartMode;
//import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
//import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xr.configure.MethodLog;
import com.xr.entry.AccessRecord;
import com.xr.entry.BlackPeople;
import com.xr.entry.DeviceUnit;
import com.xr.entry.HolderData;
import com.xr.service.IAccessRecordService;
import com.xr.service.IBlackPeopleService;
import com.xr.service.IBoxDataService;
import com.xr.service.IDeviceUnitService;
import com.xr.service.IHolderDataService;
import com.xr.service.IPlatBoxService;
import com.xr.tools.ImagePathConfig;
import com.xr.tools.ImageSizeUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
@Controller
@RequestMapping("PlatBox")
@Api(tags="PlatBox",description="接口标题：盒子平台对接接口")
public class PlatBoxController {
	@Autowired
	private IDeviceUnitService idus;
	@Autowired
	private IHolderDataService ihds;
	@Autowired
	private IBlackPeopleService ibps;
	@Autowired
	private IPlatBoxService ipbs;
	@Autowired
	private IAccessRecordService iars;
	@Autowired
	private IBoxDataService ibds;
	
	//private static String BOXIP="192.168.1.147";
	//private static String YUNIP="192.168.1.236";
	public static void main(String[] args)  {
		
		Calendar c=Calendar.getInstance();
		long photosuff=c.getTimeInMillis();
		System.out.println(photosuff);//1611640931887
		 
	}
	
	
	/**
	 * 人事资料里：点击按钮 将要下发的人员数据写到记录表中
	 * 下发人脸权限 或删除人脸权限 ： POST
	 * @throws Exception 
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：新增接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：json字符串：",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	//@MethodLog(methodName="新增",remark="新增人脸权限")
	@RequestMapping(value="/addFace",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> add(String type,String str,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		try{
			Integer nextid=iars.getNextidService();
			JSONArray arr=JSONArray.parseArray(str);
			for(int i=0;i<arr.size();i++){
				Map<String,Object> m=new HashMap<String,Object>();
				String holderno=arr.getString(i);//权限组id
				m.put("holderno", holderno);
				List<Map<String,Object>> exist=iars.getHolderService(m);
				for(int j=0;j<exist.size();j++){
					Map<String,Object> m1=exist.get(j);
					String boxid=String.valueOf(m1.get("boxid"));
					if(boxid!=null && !"".equals(boxid) && !"null".equals(boxid)){
						m1.put("message", "待下发");
						m1.put("type", type);
						m1.put("boxip", boxid);
						data.add(m1);
					}
				}
			}
			
			List<Map<String,Object>> pici=new ArrayList<Map<String,Object>>();
			for(int i=0;i<data.size();i++){
				pici.add(data.get(i));
				if(pici.size()==100 || i==data.size()-1){
					int t=iars.addService(pici);
					pici.clear();
				}
			}
			if(data!=null && data.size()>0){
				Map<String,Object> m2=new HashMap<String,Object>();
				m2=addF(nextid);
				map.put("flag", true);
				map.put("reason", "操作成功");
				map.put("result", m2);
			}else{
				map.put("flag", false);
				map.put("reason", "操作失败");
			}
		}catch(Exception ex){
			System.out.println(ex);
			ex.printStackTrace();
		}
		
		return map;
	}
	
	/**
	 * 将批量操作的接口下发
	 * @param nextid
	 * @return
	 */
	public Map<String,Object> addF(Integer nextid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		try{
			m.put("maxid", nextid);
			List<Map<String,Object>> exist=iars.getListService(m);
			for(int i=0;i<exist.size();i++){
				Map<String,Object> m1=exist.get(i);
				String id=String.valueOf(m1.get("id"));
				String boxip=String.valueOf(m1.get("boxip"));
				String holderno=String.valueOf(m1.get("holderno"));
				String holdername=String.valueOf(m1.get("holdername"));
				String ip=String.valueOf(m1.get("ip"));
				String port=String.valueOf(m1.get("port"));
				String devicetype=String.valueOf(m1.get("devicetype"));
				String devicevender=String.valueOf(m1.get("devicevender"));
				String userpass=String.valueOf(m1.get("userpass"));
				String type=String.valueOf(m1.get("type"));
				String photostr=String.valueOf(m1.get("photostr"));
				if(boxip!=null && !"".equals(boxip) && !"null".equals(boxip)){
					if(photostr!=null && !"".equals(photostr)){
						String imgUrl=ImagePathConfig.peoplepic+"/"+photostr;
						String base64=ImagePathConfig.readPicPath(imgUrl);
						String url="http://"+boxip+"/yunapi/?action=faceIssue";
						if(base64!=null && !"".equals(base64)){
							if(type!=null && !"".equals(type) && "aa".equals(type)){
								base64=base64.split(",")[1];
								m.put("ip", ip);//设备ip
							    m.put("pass", userpass);//设备密码
							    m.put("sfzh", holderno);//唯一编号，用于设备人员编号（如身份证号，工号等）
							    m.put("sfzh_name", holdername);//人员姓名
							    m.put("face_pic", base64);//base64,不带请求头
							    m.put("device_port", port);
							    m.put("device_vender", devicevender); 
							    m.put("device_type", devicetype);//
							    m.put("face_log_id", id);//人脸下发记录表id
							    m.put("face_pic_twist", "");//base64,设备为睿卡时使用
							    try{
							    	String result=netPost(url, m, "POST");
							    	System.out.println(result);
								    Map<String,Object> m2=JSONObject.parseObject(result);
								    m2.put("holderno", holderno);
								    m2.put("id", id);
								    m2.put("boxip", boxip);
								    data.add(m2);
							    }catch(Exception ex){
							    	System.out.println(ex);
							    	ex.printStackTrace();
							    }
							}else if(type!=null && !"".equals(type) && "dd".equals(type)){
								m.put("ip", ip);//设备ip
							    m.put("pass", userpass);//设备密码
							    m.put("sfzh", holderno);//唯一编号，用于设备人员编号（如身份证号，工号等）
							    m.put("device_port", port);
							    m.put("device_vender", devicevender); 
							    m.put("device_type", devicetype);//
							    m.put("face_log_id", id);//人脸下发记录表id
							    try{
							    	String result=netPost(url, m, "DELETE");
							    	System.out.println(result);
								    Map<String,Object> m2=JSONObject.parseObject(result);
								    m2.put("holderno", holderno);
								    m2.put("id", id);
								    m2.put("boxip", boxip);
								    data.add(m2);
							    }catch(Exception ex){
							    	System.out.println(ex);
							    	ex.printStackTrace();
							    }
							}
						}
					}
				}
				
			}
		}catch(Exception ex){
			System.out.println(ex);
		}
		map.put("data", data);
		return map;
		
	}
	
	/**
	 * 下发人脸权限  ： POST
	 * @throws Exception 
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：新增接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：json字符串：",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	//@MethodLog(methodName="新增",remark="新增人脸权限")
	@RequestMapping(value="/faceAdd",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> faceAdd(Integer id,String type,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		try{
			System.out.println("新增权限下发记录...");
			AccessRecord record=iars.selectByPrimaryKeyService(id);
			String boxip=record.getBoxip();
			if(boxip!=null && !"".equals(boxip) && !"null".equals(boxip)){
				String url="http://"+boxip+"/yunapi/?action=faceIssue";
				String photostr=record.getPhotostr();
				if(photostr!=null && !"".equals(photostr)){
					String imgUrl=ImagePathConfig.peoplepic+"/"+photostr;
					System.out.println("imgUrl=="+imgUrl);
					String base64=ImagePathConfig.readPicPath(imgUrl);
					if(base64!=null && !"".equals(base64)){
						m.put("ip", record.getIp());//设备ip
					    m.put("pass", record.getUserpass());//设备密码
					    m.put("sfzh", record.getHolderno());//唯一编号，用于设备人员编号（如身份证号，工号等）
					    m.put("sfzh_name", record.getHoldername());//人员姓名
					    m.put("face_pic", base64);//base64,不带请求头
					    m.put("device_port", record.getPort());
					    m.put("device_vender", record.getDevicevender()); 
					    m.put("device_type", record.getDevicetype());//
					    m.put("face_log_id", id);//人脸下发记录表id
					    m.put("face_pic_twist", "");//base64,设备为睿卡时使用
					    String result=netPost(url, m, "POST");
					    System.out.println(result);
						map.put("data", data);
						map.put("flag", true);
						map.put("reason", "操作成功！");
					}else{
						map.put("flag", false);
						map.put("reason", "对不起，照片未找到！");
					}
				}else{
					map.put("flag", false);
					map.put("reason", "对不起，照片路径为空！");
				}
			}else{
				map.put("flag", false);
				map.put("reason", "对不起，盒子ip不能为空！");
			}
			
		}catch(Exception ex){
			System.out.println(ex);
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}
	
	/**
	 * 下发人脸权限  ： POST
	 * @throws Exception 
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：新增接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="id",value="参数：记录id：",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="type",value="参数：下发类型：下发aa，移除dd：",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	//@MethodLog(methodName="新增",remark="新增人脸权限")
	@RequestMapping(value="/setFace",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> setFace(Integer id,String type,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		try{
			System.out.println("下发或移除权限权限...");
			AccessRecord record=iars.selectByPrimaryKeyService(id);
			String boxip=record.getBoxip();
			if(boxip!=null && !"".equals(boxip) && !"null".equals(boxip)){
				if(type.equals("aa")){
					//下发权限
					String url="http://"+boxip+"/yunapi/?action=faceIssue";
					String photostr=record.getPhotostr();
					if(photostr!=null && !"".equals(photostr)){
						String imgUrl=ImagePathConfig.peoplepic+"/"+photostr;
						System.out.println("imgUrl=="+imgUrl);
						String base64=ImagePathConfig.readPicPath(imgUrl);
						if(base64!=null && !"".equals(base64)){
							m.put("ip", record.getIp());//设备ip
						    m.put("pass", record.getUserpass());//设备密码
						    m.put("sfzh", record.getHolderno());//唯一编号，用于设备人员编号（如身份证号，工号等）
						    m.put("sfzh_name", record.getHoldername());//人员姓名
						    m.put("face_pic", base64);//base64,不带请求头
						    m.put("device_port", record.getPort());
						    m.put("device_vender", record.getDevicevender()); 
						    m.put("device_type", record.getDevicetype());//
						    m.put("face_log_id", id);//人脸下发记录表id
						    m.put("face_pic_twist", "");//base64,设备为睿卡时使用
						    String result=netPost(url, m, "POST");
						    System.out.println(result);
							map.put("data", data);
							map.put("flag", true);
							map.put("reason", "操作成功！");
						}else{
							map.put("flag", false);
							map.put("reason", "对不起，照片未找到！");
						}
					}else{
						map.put("flag", false);
						map.put("reason", "对不起，照片路径为空！");
					}
				}else if(type.equals("dd")){
					//移除权限
					if(boxip!=null && !"".equals(boxip) && !"null".equals(boxip)){
				    	m.put("ip", record.getIp());//设备ip
					    m.put("pass", record.getUserpass());//设备密码
					    m.put("sfzh", record.getHolderno());//唯一编号，用于设备人员编号（如身份证号，工号等）
					    m.put("device_port", record.getPort());
					    m.put("device_vender", record.getDevicevender()); 
					    m.put("device_type", record.getDevicetype());//
					    m.put("face_log_id", id);//人脸下发记录表id
				    	String url="http://"+boxip+"/yunapi/?action=faceIssue";
					    try{
					    	String result=netPost(url, m, "DELETE");
						    System.out.println(result);
						    map.put("boxip", boxip);
						    map.put("logid", id);
						    map.put("result", result);
						    map.put("flag", true);
							map.put("reason", "操作成功！");
					    }catch(Exception ex){
					    	System.out.println(ex);
					    }
				    }else{
				    	map.put("flag", false);
						map.put("reason", "对不起，盒子ip不能为空！");
				    }
				}
				
			}else{
				map.put("flag", false);
				map.put("reason", "对不起，盒子ip不能为空！");
			}
			
		}catch(Exception ex){
			System.out.println(ex);
			map.put("flag", false);
			map.put("reason", "程序异常，请联系管理员！");
		}
		return map;
	}
	
	
	/**
	 * 删除人脸权限  ： POST
	 * @throws Exception 
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：新增接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：json字符串：",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	//@MethodLog(methodName="删除",remark="删除人脸权限")
	@RequestMapping(value="/faceDel",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> faceDel(Integer id,String type,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		try{
			AccessRecord record=iars.selectByPrimaryKeyService(id);
		    String boxip=record.getBoxip();
		    if(boxip!=null && !"".equals(boxip) && !"null".equals(boxip)){
		    	m.put("ip", record.getIp());//设备ip
			    m.put("pass", record.getUserpass());//设备密码
			    m.put("sfzh", record.getHolderno());//唯一编号，用于设备人员编号（如身份证号，工号等）
			    m.put("device_port", record.getPort());
			    m.put("device_vender", record.getDevicevender()); 
			    m.put("device_type", record.getDevicetype());//
			    m.put("face_log_id", id);//人脸下发记录表id
		    	String url="http://"+boxip+"/yunapi/?action=faceIssue";
			    try{
			    	String result=netPost(url, m, "DELETE");
				    System.out.println(result);
				    map.put("boxip", boxip);
				    map.put("logid", id);
				    map.put("result", result);
				    map.put("flag", true);
					map.put("reason", "操作成功！");
			    }catch(Exception ex){
			    	System.out.println(ex);
			    }
		    }else{
		    	map.put("flag", false);
				map.put("reason", "对不起，盒子ip不能为空！");
		    }
		    
		}catch(Exception ex){
			System.out.println(ex);
		}
		return map;
	}
	
	/**
	 * 下发人脸权限 下发回调 ： POST
	 * @throws Exception 
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：新增接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：json字符串：",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	//@MethodLog(methodName="修改",remark="人脸下发回调")
	@RequestMapping(value="/faceBack",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> add(@RequestBody String str){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		try{
			System.out.println("人脸下发回调：");
			System.out.println(str);
			/**
			 * {"id": "33", "status": 1, "msg": "\u6210\u529f"}
			 */
			JSONObject obj=JSONObject.parseObject(str);
			String msg=obj.getString("msg");
			String status=obj.getString("status");
			Integer id=obj.getInteger("id");
			AccessRecord record=new AccessRecord();
			record.setId(id);
			record.setMessage(msg);
			record.setState(status);
			int i=iars.updateByPrimaryKeySelectiveService(record);
			map.put("code", 200);
			map.put("message", "权限下发回调成功！");
			map.put("data", obj);
		}catch(Exception ex){
			System.out.println(ex);
		}
		return map;
	}
	
	
	
	 
	
	/**
	 * 通行记录接口
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：设备刷脸或进出识别回调接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：封装的字符串：人员id：",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	//@MethodLog(methodName="新增",remark="识别回调接口")
	@RequestMapping(value="/recogBack",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> addIORecord(@RequestBody String str) throws Exception{
		System.out.println("人脸抓拍记录：");
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		Map<String,Object> m1=new HashMap<String,Object>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		try{
			JSONObject obj=JSONObject.parseObject(str);
			String pic_face_str=obj.getString("pic_face_str");
			String pic_back_str=obj.getString("pic_back_str");
			String from_ip=obj.getString("from_ip");
			String from_sn=obj.getString("from_sn");
			String device_name=obj.getString("device_name");
			String device_direction=obj.getString("device_direction");
			String device_id=obj.getString("device_id");
			String sfz_str=obj.getString("sfz_str");
			String name_str=obj.getString("name_str");
			System.out.println("from_ip=="+from_ip);
			System.out.println("from_sn=="+from_sn);
			System.out.println("device_name=="+device_name);
			System.out.println("device_direction=="+device_direction);
			System.out.println("device_id=="+device_id);
			System.out.println("sfz_str=="+sfz_str);
			System.out.println("name_str=="+name_str);
			byte[] photo=null;
			byte[] back=null;
			String photostr=null;
			String backstr=null;
			String iostatus=null;
			String iophotostr=null;
			String alarmphotostr=null;
			String iobackstr=null;
			String alarmbackstr=null;
			Calendar c=Calendar.getInstance();
			long photosuff=c.getTimeInMillis();
			if(pic_face_str!=null && !"".equals(pic_face_str)){
				iophotostr=ImagePathConfig.base64ToPath(pic_face_str, ImagePathConfig.peopleiopic, String.valueOf(photosuff));
				alarmphotostr=ImagePathConfig.base64ToPath(pic_face_str, ImagePathConfig.alarmpeoplepic, String.valueOf(photosuff));
				
				//MultipartFile files=ImageSizeUtil.base64ToMultipart(pic_face_str);
				//photo=ImageSizeUtil.getFileBytes(files);
			}
			if(pic_back_str!=null && !"".equals(pic_back_str)){
				iobackstr=ImagePathConfig.base64ToPath(pic_back_str, ImagePathConfig.peopleiopic, String.valueOf(photosuff));
				alarmbackstr=ImagePathConfig.base64ToPath(pic_back_str, ImagePathConfig.alarmpeoplepic, String.valueOf(photosuff));
				
				//MultipartFile files=ImageSizeUtil.base64ToMultipart(pic_back_str);
				//back=ImageSizeUtil.getFileBytes(files);
			}
			if(pic_back_str!=null && !"".equals(pic_back_str) && "出".equals(device_direction)){
				iostatus="12";
			}else if(pic_back_str!=null && !"".equals(pic_back_str) && "入".equals(device_direction)){
				iostatus="11";
			}else{
				iostatus="";
			}
			m1.put("devicesn", from_sn);
			m1.put("locatname", from_ip+","+device_direction);
			m1.put("deviceno", device_id);
			m1.put("devicename", device_name);
			m1.put("iostatus", iostatus);
			m1.put("holderno", sfz_str);
			m1.put("holdername", name_str);
			m1.put("photo", photo);
			m1.put("iophotostr", iophotostr);
			m1.put("alarmphotostr", alarmphotostr);
			m.put("devicesn", from_sn);
			List<Map<String,Object>> exist=ipbs.getDevService(m);
			if(exist!=null && exist.size()==1){
				String boxid=String.valueOf(exist.get(0).get("boxid"));
				obj.put("boxip", boxid);
				m1.put("devicename", String.valueOf(exist.get(0).get("devicename")));
				m1.put("deviceno", String.valueOf(exist.get(0).get("deviceno")));
				m1.put("doorname", String.valueOf(exist.get(0).get("doorname")));
				//m1.put("iostatus", String.valueOf(exist.get(0).get("iostatus")));
				m1.put("ip", String.valueOf(exist.get(0).get("ip")));
				m1.put("port", String.valueOf(exist.get(0).get("port")));
				if(sfz_str!=null && !"".equals(sfz_str) && !"null".equals(sfz_str)){
					if(sfz_str.length()>2 && "B_".equals(sfz_str.substring(0, 2))){
						//黑名单人员
						m1.put("status", "black");
						obj.put("in_out_person_type", "5");
					}else if(sfz_str.length()>2 && "V_".equals(sfz_str.substring(0, 2))){
						//访客人员
						String t=sfz_str.substring(2);
						obj.put("in_out_person_type", "4");
					}else{
						//人员
						m.clear();
						m.put("holderno", sfz_str);
						List<Map<String,Object>> exist1=ihds.getListService(m);
						if(exist1!=null && exist1.size()>0){
							m1.put("holdername", String.valueOf(exist1.get(0).get("holdername")));
							m1.put("unitno", String.valueOf(exist1.get(0).get("unitno")));
							m1.put("unitname", String.valueOf(exist1.get(0).get("unitname")));
						}else{
							m1.put("holdername", "未知人员");
						}
						obj.put("in_out_person_type", "1");
					}
				}else{
					//陌生人
					m1.put("holderno", "");
					m1.put("holdername", "陌生人");
					m1.put("photo", photo);
					obj.put("in_out_person_type", "6");
				}
			}else{
				//陌生人
				m1.put("holderno", "");
				m1.put("holdername", "陌生人");
				m1.put("photo", photo);
				obj.put("in_out_person_type", "6");
			}
			try{
				int i=ipbs.addService(m1);
				Map<String,Object> m3=addIO(obj);
				map.put("data", m3);
				System.out.println(map);
			}catch(Exception ex){
				System.out.println(ex);
				ex.printStackTrace();
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return map;
	}
	
	
	//@MethodLog(methodName="新增",remark="新增通行记录")
	@RequestMapping(value="/addIO",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> addIO(JSONObject obj){
		System.out.println("新增通行记录：");
		Map<String,Object> map=new HashMap<String,Object>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> boxlist=ibds.getListService(map);
		try{
			Map<String,String> m=new HashMap<String,String>();
			m.put("callBack","yunapi");
			m.put("sfz_str", obj.getString("sfz_str"));
			m.put("from_sn", obj.getString("from_sn"));
			m.put("from_ip", obj.getString("from_ip"));
			m.put("in_out_person_type", obj.getString("in_out_person_type"));
			m.put("in_out_pic", obj.getString("pic_face_str"));
			m.put("sex_str", obj.getString("sex_str"));
			m.put("age_str", obj.getString("age_str"));
			m.put("race_str", obj.getString("race_str"));
			m.put("eye_str", obj.getString("eye_str"));
			m.put("mouth_str", obj.getString("mouth_str"));
			m.put("mask_str", obj.getString("mask_str"));
			m.put("pic_face_str", obj.getString("pic_face_str"));
			m.put("pic_back_str", obj.getString("pic_back_str"));
			m.put("device_name", obj.getString("device_name"));
			m.put("device_direction", obj.getString("device_direction"));
			m.put("name_str", obj.getString("name_str"));
			m.put("time_str", obj.getString("time_str"));
			m.put("add_time", obj.getString("add_time"));
			//m.put("bz", obj.getString("bz"));
			m.put("temperature", obj.getString("temperature"));
			m.put("standard", obj.getString("standard"));
			m.put("temperatureState", obj.getString("temperatureState"));
			m.put("tempUnit", obj.getString("tempUnit"));
			String boxip=obj.getString("boxip");
			String url="http://"+boxip+"/?action=personnelInOut";
			try{
				if(boxip!=null && !"".equals(boxip) && !"null".equals(boxip)){
					String result= doPost(url,m); 
					System.out.println("下发记录："+result);
					Map<String,Object> m1=JSONObject.parseObject(result);
					m1.put("boxip", boxip);
					data.add(m1);
				}
			}catch(Exception ex){
				System.out.println(ex);
				ex.printStackTrace();
			}
		}catch(Exception ex){
			System.out.println(ex);
		}
		
		/**
		 * 下发记录：{"code":500,"person_check":"NOTOK","person_name":"",
		 * "person_address":"","person_pic":null,"person_black":"0",
		 * "message":"\u4f20\u5165\u8eab\u4efd\u8bc1\u53f7\u7801\u4e3a\u7a7a"}

		 */
		map.put("data", data);
		System.out.println(map);
		return map;
	}
 

	 
	public static int sysAdd(String holderno,String holdername,String boxip,String base64){
		System.out.println("同步新增");
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,String> m=new HashMap<String,String>();
		m.put("personnel_id_number",holderno);
		m.put("personnel_name", holdername);
		m.put("personnel_phone", "");
		m.put("personnel_pic1", base64);
		int t=0;
		String url="http://"+boxip+"/yunapi/?action=personnel";
		if(boxip!=null && !"".equals(boxip) && !"null".equals(boxip)){
			if(base64!=null && !"".equals(base64) && !"null".equals(base64)){
				String result= doPost(url, m);
				System.out.println(result);
				if(result!=null && !"".equals(result)){
					Map<String,Object> m1=JSONObject.parseObject(result);
					if(m1!=null && !"".equals(m1)){
						String code=String.valueOf(m1.get("code"));
						if(code!=null && !"".equals(code) && !"".equals(code) && "200".equals(code)){
							t=1;
						}
					}
				}
			}
		}
		
		/**
		 * {"code":200,"message":"\u6dfb\u52a0\u4eba\u5458\u6210\u529f",
		 * "data":[{"personnel_id":19,"personnel_name":"B\u5c0f\u53ef",
		 * "personnel_framework_name":null,"personnel_sex":1,
		 * "personnel_phone":"","personnel_type":0,
		 * "personnel_id_number":"B_22","personnel_addr":null,
		 * "personnel_xl":null,"personnel_hyzk":null,"personnel_nation":null,
		 * "personnel_pic1":"common\/uploads\/personnel\/931611909331.jpeg",
		 * "personnel_pic2":null,"personnel_jg":null,"personnel_byyx":null,
		 * "personnel_csrq":null,"personnel_zzmm":null,"personnel_major":null,
		 * "personnel_addtime":"2021-01-29 16:35:31","personnel_modtime":null,
		 * "personnel_status":1,"fk_userid":0,"fk_opendoorqxid":0,"personnel_update_pic1":0}]}

		 */
		return t;
	}
	
	/**
	 * 同步新增黑名单人员接口  ： 
	 * @throws Exception 
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：同步新增黑名单人员接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：封装的字符串：人员id：",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="新增",remark="同步新增黑名单人员")
	@RequestMapping(value="/addBlack",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> addBlack(String str,String loginid) throws Exception{
		Map<String,Object> map=new HashMap<String,Object>();
		System.out.println("同步新增黑名单人员：");
		JSONArray arr=JSONArray.parseArray(str);
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> boxlist=ibds.getListService(map);
		try{
			for(int i=0;i<arr.size();i++){
				Integer id=arr.getInteger(i);
				BlackPeople record=ibps.selectByPrimaryKeyService(id);
				String photostr=record.getPhotostr();
				if(photostr!=null && !"".equals(photostr)){
					String phone="";
					String imgUrl=ImagePathConfig.blackpeoplepic+"/"+photostr;
					String base64=ImagePathConfig.readPicPath(imgUrl);
					if(base64!=null && !"".equals(base64)){
						Map<String,String> m=new HashMap<String,String>();
						String holderno="B_"+record.getId();
						String holdername=record.getHoldername();
						if(holdername==null || "".equals(holdername)){
							holdername=holderno;
						}
						m.put("personnel_id_number",holderno);
						m.put("personnel_name", holdername);
						m.put("personnel_phone", phone);
						m.put("personnel_pic1", base64);
						for(int k=0;k<boxlist.size();k++){
							String boxip=String.valueOf(boxlist.get(k).get("boxip"));
							String url="http://"+boxip+"/yunapi/?action=personnel";
							try{
								String result= doPost(url, m);
								System.out.println(result);
								Map<String,Object> m1=JSONObject.parseObject(result);
								m1.put("id", id);
								m1.put("boxip", boxip);
								m1.put("data", result);
								data.add(m1);
							}catch(Exception ex){
								System.out.println(ex);
								ex.printStackTrace();
							}
						}
					}
				}
			}
		}catch(Exception ex){
			System.out.println(ex);
		}
		/**
		 * {"code":200,"message":"\u6dfb\u52a0\u4eba\u5458\u6210\u529f",
		 * "data":[{"personnel_id":19,"personnel_name":"B\u5c0f\u53ef",
		 * "personnel_framework_name":null,"personnel_sex":1,
		 * "personnel_phone":"","personnel_type":0,
		 * "personnel_id_number":"B_22","personnel_addr":null,
		 * "personnel_xl":null,"personnel_hyzk":null,"personnel_nation":null,
		 * "personnel_pic1":"common\/uploads\/personnel\/931611909331.jpeg",
		 * "personnel_pic2":null,"personnel_jg":null,"personnel_byyx":null,
		 * "personnel_csrq":null,"personnel_zzmm":null,"personnel_major":null,
		 * "personnel_addtime":"2021-01-29 16:35:31","personnel_modtime":null,
		 * "personnel_status":1,"fk_userid":0,"fk_opendoorqxid":0,"personnel_update_pic1":0}]}

		 */
		map.put("data", data);
		map.put("reason", "操作成功！");
		System.out.println(map);
		return map;
	}
	
	/**
	 * 同步修改黑名单人员接口
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：同步修改黑名单人员接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：json字符串：",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="修改",remark="同步修改黑名单人员")
	@RequestMapping(value="/editBlack",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> editBlack(String str,String loginid) throws Exception{
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,String> header=new HashMap<String,String>();
		System.out.println("同步修改黑名单人员：");
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		try{
			JSONArray arr=JSONArray.parseArray(str);
			List<Map<String,Object>> boxlist=ibds.getListService(map);
			for(int i=0;i<arr.size();i++){
				Integer id=arr.getInteger(i);
				BlackPeople record=ibps.selectByPrimaryKeyService(id);
				String photostr=record.getPhotostr();
				if(photostr!=null && !"".equals(photostr)){
					String imgUrl=ImagePathConfig.blackpeoplepic+"/"+photostr;
					String base64=ImagePathConfig.readPicPath(imgUrl);
					if(base64!=null && !"".equals(base64)){
						JSONObject m=new JSONObject();
						m.put("personnel_id_number", "B_"+record.getId());
						m.put("personnel_name", record.getHoldername());
						m.put("personnel_phone", "");
						m.put("personnel_pic1", base64);
						for(int k=0;k<boxlist.size();k++){
							String boxip=String.valueOf(boxlist.get(k).get("boxip"));
							String url="http://"+boxip+"/yunapi/?action=personnel";
							try{
								String result= patch(url, m,header); 
								System.out.println(result);
								Map<String,Object> m1=JSONObject.parseObject(result);
								m1.put("id", id);
								m1.put("boxip", boxip);
								data.add(m1);
							}catch(Exception ex){
								System.out.println(ex);
								ex.printStackTrace();
							}
						}
					}
				}
			}
		}catch(Exception ex){
			System.out.println(ex);
		}
		map.put("data", data);
		map.put("reason", "操作成功！");
		System.out.println(map);
		return map;
	}
	
	

	/**
	 * 同步删除黑名单人员接口
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：同步删除黑名单人员接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：json字符串：",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="删除",remark="同步删除黑名单人员")
	@RequestMapping(value="/delBlack",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> delBlack(String str,String loginid) throws Exception{
		Map<String,Object> map=new HashMap<String,Object>();
		System.out.println("同步删除黑名单人员：");
		Map<String,Object> m=new HashMap<String,Object>();
		JSONArray arr=JSONArray.parseArray(str);
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> boxlist=ibds.getListService(map);
		try{
			for(int i=0;i<arr.size();i++){
				Integer id=arr.getInteger(i);
				String idd="B_"+id;
				for(int k=0;k<boxlist.size();k++){
					String boxip=String.valueOf(boxlist.get(k).get("boxip"));
					String url="http://"+boxip+"/yunapi/?action=personnel&personnel_id_number="+idd;
					try{
						String result= netPost(url,m,"DELETE");
						System.out.println(result);
						Map<String,Object> m1=JSONObject.parseObject(result);
						m1.put("id", id);
						m1.put("boxip", boxip);
						data.add(m1);
					}catch(Exception ex){
						System.out.println(ex);
						ex.printStackTrace();
					}
				}
			}
		}catch(Exception ex){
			System.out.println(ex);
		}
		map.put("data", data);
		map.put("reason", "操作成功！");
		System.out.println(map);
		return map;
	}
	
	/**
	 * 同步查询黑名单人员接口
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：同步查询黑名单人员接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：json字符串：[1,2],里面存的人员id",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="查询",remark="同步查询黑名单人员接口")
	@RequestMapping(value="/getBlack",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getBlack(String str,String loginid) throws Exception{
		Map<String,Object> map=new HashMap<String,Object>();
		System.out.println("同步查询黑名单人员：");
		Map<String, Object> m=new HashMap<String,Object>();
		JSONArray arr=JSONArray.parseArray(str);
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> boxlist=ibds.getListService(map);
		try{
			if(arr==null || arr.size()==0){
				for(int k=0;k<boxlist.size();k++){
					String boxip=String.valueOf(boxlist.get(k).get("boxip"));
					String url="http://"+boxip+"/yunapi/?action=personnel";
					try{
						String result= netPost(url,m,"GET");
						System.out.println(result);
						Map<String, Object> m1=JSONObject.parseObject(result);
						m1.put("boxip", boxip);
						data.add(m1);
					}catch(Exception ex){
						System.out.println(ex);
						ex.printStackTrace();
					}
				}
			}else{
				for(int i=0;i<arr.size();i++){
					Integer id=arr.getInteger(i);
					String idd="B_"+id;
					for(int k=0;k<boxlist.size();k++){
						String boxip=String.valueOf(boxlist.get(k).get("boxip"));
						String url="http://"+boxip+"/yunapi/?action=personnel&personnel_id_number="+idd;
						try{
							String result= netPost(url,m,"GET");
							System.out.println(result);
							Map<String, Object> m1=JSONObject.parseObject(result);
							m1.put("id", id);
							m1.put("boxip", boxip);
							data.add(m1);
						}catch(Exception ex){
							System.out.println(ex);
							ex.printStackTrace();
						}
					}
				}
			}
		}catch(Exception ex){
			System.out.println(ex);
		}
		map.put("data", data);
		map.put("reason", "操作成功！");
		System.out.println(map);
		return map;
	}
	 
	
	
	

	/**
	 * 同步新增人员接口  ： 
	 * @throws Exception 
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：同步新增人员接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：封装的字符串：人员id：",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="新增",remark="同步新增人员")
	@RequestMapping(value="/addPeople",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> addPeople(String str,String loginid) {
		Map<String,Object> map=new HashMap<String,Object>();
		System.out.println("同步新增人员：");
		JSONArray arr=JSONArray.parseArray(str);
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		try{
			List<Map<String,Object>> boxlist=ibds.getListService(map);
			for(int i=0;i<arr.size();i++){
				String holderno=arr.getString(i);
				HolderData record=ihds.selectByPrimaryKeyService(holderno);
				String photostr=record.getPhotostr();
				if(photostr!=null && !"".equals(photostr)){
					String phone="";
					String imgUrl=ImagePathConfig.peoplepic+"/"+photostr;
					String base64=ImagePathConfig.readPicPath(imgUrl);
					if(base64!=null && !"".equals(base64)){
						Map<String,String> m=new HashMap<String,String>();
						m.put("personnel_id_number",record.getHolderno());
						m.put("personnel_name", record.getHoldername());
						m.put("personnel_phone", phone);
						m.put("personnel_pic1", base64);
						for(int k=0;k<boxlist.size();k++){
							String boxip=String.valueOf(boxlist.get(k).get("boxip"));
							String url="http://"+boxip+"/yunapi/?action=personnel";
							try{
								String result= doPost(url,m); 
								System.out.println(result);
								Map<String,Object> m1=JSONObject.parseObject(result);
								m1.put("holderno", holderno);
								m1.put("boxip", boxip);
								data.add(m1);
							}catch(Exception ex){
								System.out.println(ex);
								ex.printStackTrace();
							}
						}
					}
				}
			}
		}catch(Exception ex){
			System.out.println(ex);
		}
		map.put("data", data);
		map.put("reason", "操作成功！");
		System.out.println(map);
		return map;
	}
	
	/**
	 * 同步修改人员接口
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：同步修改人员接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：json字符串：",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="修改",remark="同步修改人员")
	@RequestMapping(value="/editPeople",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> editPeople(String str,String loginid){
		Map<String,Object> map=new HashMap<String,Object>();
		System.out.println("同步修改人员：");
		Map<String,String> header=new HashMap<String,String>();
		JSONArray arr=JSONArray.parseArray(str);
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> boxlist=ibds.getListService(map);
		try{
			for(int i=0;i<arr.size();i++){
				String holderno=arr.getString(i);
				HolderData record=ihds.selectByPrimaryKeyService(holderno);
				String photostr=record.getPhotostr();
				if(photostr!=null && !"".equals(photostr)){
					String imgUrl=ImagePathConfig.peoplepic+"/"+photostr;
					String base64=ImagePathConfig.readPicPath(imgUrl);
					if(base64!=null && !"".equals(base64)){
						JSONObject m=new JSONObject();
						m.put("personnel_id_number", record.getHolderno());
						m.put("personnel_name", record.getHoldername());
						m.put("personnel_phone", "");
						m.put("personnel_pic1", base64);
						for(int k=0;k<boxlist.size();k++){
							String boxip=String.valueOf(boxlist.get(k).get("boxip"));
							String url="http://"+boxip+"/yunapi/?action=personnel";
							try{
								String result= patch(url, m,header); 
								System.out.println(result);
								Map<String,Object> m1=JSONObject.parseObject(result);
								m1.put("holderno", holderno);
								m1.put("boxip", boxip);
								data.add(m1);
							}catch(Exception ex){
								System.out.println(ex);
								ex.printStackTrace();
							}
						}
					}
				}
			}
		}catch(Exception ex){
			System.out.println(ex);
		}
		map.put("data", data);
		map.put("reason", "操作成功！");
		System.out.println(map);
		return map;
	}
	
	

	/**
	 * 同步删除人员接口
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：同步删除人员接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：json字符串：",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	@MethodLog(methodName="删除",remark="同步删除人员")
	@RequestMapping(value="/delPeople",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> delPeople(String str,String loginid) throws Exception{
		Map<String,Object> map=new HashMap<String,Object>();
		System.out.println("同步删除人员：");
		Map<String,Object> m=new HashMap<String,Object>();
		JSONArray arr=JSONArray.parseArray(str);
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> boxlist=ibds.getListService(map);
		try{
			for(int i=0;i<arr.size();i++){
				String holderno=arr.getString(i);
				for(int k=0;k<boxlist.size();k++){
					String boxip=String.valueOf(boxlist.get(k).get("boxip"));
					String url="http://"+boxip+"/yunapi/?action=personnel&personnel_id_number="+holderno;
					try{
						String result= netPost(url,m,"DELETE");
						System.out.println(result);
						Map<String,Object> m1=JSONObject.parseObject(result);
						m1.put("holderno", holderno);
						m1.put("boxip", boxip);
						data.add(m1);
					}catch(Exception ex){
						System.out.println(ex);
						ex.printStackTrace();
					}
				}
			}
		}catch(Exception ex){
			System.out.println(ex);
		}
		map.put("data", data);
		map.put("reason", "操作成功！");
		System.out.println(map);
		return map;
	}
	
	/**
	 * 同步查询人员接口
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：同步查询人员接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：json字符串：[1001,1002],里面存的人员id",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	//@MethodLog(methodName="查询",remark="同步查询人员接口")
	@RequestMapping(value="/getPeople",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getPeople(String str,String loginid) throws Exception{
		Map<String,Object> map=new HashMap<String,Object>();
		System.out.println("同步查询人员：");
		Map<String, Object> m=new HashMap<String,Object>();
		JSONArray arr=JSONArray.parseArray(str);
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		try{
			List<Map<String,Object>> boxlist=ibds.getListService(map);
			if(arr==null || arr.size()==0){
				for(int k=0;k<boxlist.size();k++){
					String boxip=String.valueOf(boxlist.get(k).get("boxip"));
					String url="http://"+boxip+"/yunapi/?action=personnel";
					try{
						String result= netPost(url,m,"GET");
						System.out.println(result);
						Map<String, Object> m1=JSONObject.parseObject(result);
						m1.put("boxip", boxip);
						data.add(m1);
					}catch(Exception ex){
						System.out.println(ex);
						ex.printStackTrace();
					}
				}
			}else{
				for(int i=0;i<arr.size();i++){
					String holderno=arr.getString(0);
					for(int k=0;k<boxlist.size();k++){
						String boxip=String.valueOf(boxlist.get(k).get("boxip"));
						String url="http://"+boxip+"/yunapi/?action=personnel&personnel_id_number="+holderno;
						try{
							String result= netPost(url,m,"GET");
							System.out.println(result);
							Map<String, Object> m1=JSONObject.parseObject(result);
							m1.put("holderno", holderno);
							m1.put("boxip", boxip);
							data.add(m1);
						}catch(Exception ex){
							System.out.println(ex);
							ex.printStackTrace();
						}
					}
				}
			}
		}catch(Exception ex){
			System.out.println(ex);
			ex.printStackTrace();
		}
		map.put("result", data);
		map.put("reason", "操作成功！");
		System.out.println(map);
		return map;
	}
	
	 
	
	/**
	 * 同步盒子设备新增接口  ： 
	 * @throws Exception 
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：同步盒子设备新增接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：json字符串：",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	//@MethodLog(methodName="新增",remark="同步盒子设备新增")
	@RequestMapping(value="/addDev",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> addDev(String str,String loginid){
		System.out.println("同步盒子设备新增:");
		Map<String,Object> map=new HashMap<String,Object>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		try{
			JSONArray arr=JSONArray.parseArray(str);
			for(int i=0;i<arr.size();i++){
				Map<String,Object> m1=new HashMap<String,Object>();
				Integer deviceno=arr.getInteger(i);
				DeviceUnit record=idus.selectByPrimaryKeyService(deviceno);
				String boxip=record.getBoxid();
				if(boxip!=null && !"".equals(boxip) && !"null".equals(boxip)){
					String url="http://"+boxip+"/yunapi/?action=device";
					Map<String,String> m=new HashMap<String,String>();
					m.put("device_id",String.valueOf(record.getDeviceno()));
					m.put("device_name", record.getDevicename());
					m.put("device_type", record.getDevicetype());
					m.put("device_vender", record.getDevicevender());
					m.put("device_no",record.getDevicesn());
					m.put("device_mac","mac");
					m.put("device_ip", record.getIp());
					m.put("device_port", record.getPort());
					m.put("device_username", record.getUsername());
					m.put("device_password", record.getUserpass());
					m.put("device_status", "1");//1启用，0停用
					m.put("device_location", record.getDoorname());//门区位置
					String iostatus=record.getIostatus();
					if(iostatus.equals("11")){
						iostatus="1";
					}if(iostatus.equals("12")){
						iostatus="2";
					}else{
						iostatus="0";
					}
					m.put("device_direction", iostatus);
					try{
						String result= doPost(url, m);;
						System.out.println(result);
						m1=JSONObject.parseObject(result);
						data.add(m1);
					}catch(Exception ex){
						System.out.println(ex);
						ex.printStackTrace();
					}
				}
			}
		}catch(Exception ex){
			System.out.println(ex);
			ex.printStackTrace();
		}
		map.put("result", data);
		map.put("reason", "操作成功！");
		System.out.println(map);
		return map;
	}
	
	
	/**
	 * 同步盒子设备修改接口
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：修改人脸权限接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：json字符串：",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	//@MethodLog(methodName="修改",remark="修改人脸权限")
	@RequestMapping(value="/editDev",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> editDev(String str,String loginid){
		System.out.println("同步盒子设备修改:");
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,String> header=new HashMap<String,String>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		JSONArray arr=JSONArray.parseArray(str);
		for(int i=0;i<arr.size();i++){
			Map<String,Object> m1=new HashMap<String,Object>();
			Integer deviceno=arr.getInteger(i);
			DeviceUnit record=idus.selectByPrimaryKeyService(deviceno);
			String boxip=record.getBoxid();
			if(boxip!=null && !"".equals(boxip) && !"null".equals(boxip)){
				String url="http://"+boxip+"/yunapi/?action=device";
				JSONObject m=new JSONObject();
				m.put("device_id", record.getDeviceno());
				m.put("device_name", record.getDevicename());
				m.put("device_type", record.getDevicetype());
				m.put("device_vender", record.getDevicevender());
				m.put("device_no", record.getDevicesn());
				m.put("device_mac", record.getDevicemodel());
				m.put("device_ip", record.getIp());
				m.put("device_port", record.getPort());
				m.put("device_username", record.getUsername());
				m.put("device_password", record.getUserpass());
				m.put("device_status", "1");//1启用，0停用
				m.put("device_location", record.getDoorname());//门区位置
				String iostatus=record.getIostatus();
				if(iostatus.equals("11")){
					iostatus="1";
				}if(iostatus.equals("12")){
					iostatus="2";
				}else{
					iostatus="0";
				}
				m.put("device_direction", iostatus);//1入，2出，0未知  
				try{
					String result= patch(url, m,header); 
					System.out.println(result);
					m1=JSONObject.parseObject(result);
					m1.put("deviceno", deviceno);
					m1.put("boxip", boxip);
					data.add(m1);
				}catch(Exception ex){
					System.out.println(ex);
					ex.printStackTrace();
				}
			}
			
		}
		map.put("result", data);
		map.put("reason", "操作成功！");
		System.out.println(map);
		return map;
	}
	
	
	/**
	 * 同步盒子设备删除接口
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：同步盒子设备删除接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：json字符串：",dataType="Integer",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	//@MethodLog(methodName="删除",remark="同步盒子设备删除")
	@RequestMapping(value="/delDev",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> delDev(String str,String loginid){
		System.out.println("同步盒子设备删除:");
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		JSONArray arr=JSONArray.parseArray(str);
		for(int i=0;i<arr.size();i++){
			Map<String,Object> m1=new HashMap<String,Object>();
			Integer id=arr.getInteger(i);
			DeviceUnit record=idus.selectByPrimaryKeyService(id);
			String boxip=record.getBoxid();
			String url="http://"+boxip+"/yunapi/?action=device&device_id="+id;
			try{
				if(boxip!=null && !"".equals(boxip) && !"null".equals(boxip)){
					String result= netPost(url,m,"DELETE");
					System.out.println(result);
					m1=JSONObject.parseObject(result);
					m1.put("deviceno", id);
					m1.put("boxip", boxip);
					data.add(m1);
				}
			}catch(Exception ex){
				System.out.println(ex);
				ex.printStackTrace();
			}
		}
		map.put("result", data);
		map.put("reason", "操作成功！");
		System.out.println(map);
		return map;
	}
	
	/**
	 * 同步盒子设备查询接口
	 */
	@ApiOperation(httpMethod="POST",value="接口说明：同步盒子设备查询接口接口",notes="接口的notes说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="str",value="参数：json字符串：[1,2],里面存的设备id",dataType="String",paramType="path"),
		@ApiImplicitParam(name="loginid",value="参数：登录人id",dataType="String",paramType="path")
	})
	//@MethodLog(methodName="查询",remark="同步盒子设备查询接口")
	@RequestMapping(value="/getDev",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> getDev(String str,String loginid){
		System.out.println("同步盒子设备查询:");
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String, Object> m=new HashMap<String,Object>();
		JSONArray arr=JSONArray.parseArray(str);
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		for(int i=0;i<arr.size();i++){
			Integer id=arr.getInteger(i);
			DeviceUnit record=idus.selectByPrimaryKeyService(id);
			String boxip=record.getBoxid();
			String url="http://"+boxip+"/yunapi/?action=device&device_id="+id;
			try{
				if(boxip!=null && !"".equals(boxip) && !"null".equals(boxip)){
					String result= netPost(url,m,"GET");
					System.out.println(result);
					if(result!=null && !"".equals(result)){
						Map<String, Object> m1=JSONObject.parseObject(result);
						if(m1!=null && !"".equals(m1)){
							m1.put("deviceno", id);
							m1.put("boxip", boxip);
							data.add(m1);
						}
					}
				}
			}catch(Exception ex){
				System.out.println(ex);
				ex.printStackTrace();
			}
		}
		map.put("reason", "操作成功！");
		map.put("result", data);
		System.out.println(map);
		return map;
	}
	
	/**
	 * 请求连接
	 * @throws Exception
	 */
	public static String netPost(String urlStr, Map<String, Object> map, String method) throws Exception {
		 JSONObject jsonObj=new JSONObject(map);
		 String params = jsonObj.toString();
	     URL url = new URL(urlStr);
		 // 打开和URL之间的连接
		 HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		 connection.setConnectTimeout(8000);
		 // 设置通用的请求属性
		 connection.setRequestMethod(method);
		 connection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
		 connection.setRequestProperty("Connection", "Keep-Alive");
		 connection.setUseCaches(false);
		 connection.setDoInput(true);
		 // 得到请求的输出流对象
		 if(method!=null && !method.equals("GET")){
			 connection.setDoOutput(true);
			 DataOutputStream out = new DataOutputStream(connection.getOutputStream());
			 out.write(params.getBytes("UTF-8"));
			 out.flush();
			 out.close();
		 }
		 // 建立实际的连接
		 connection.connect();
		 // 获取所有响应头字段
		 Map<String, List<String>> headers = connection.getHeaderFields();
		 // 遍历所有的响应头字段
		 for (String key : headers.keySet()) {
			 //System.out.println(key + "--->" + headers.get(key));
		 }
		 // 定义 BufferedReader输入流来读取URL的响应
		 BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
		 String result = "";
		 String getLine;
		 while ((getLine = in.readLine()) != null) {
			 result += getLine;
		 }
		 in.close();
		 JSONObject jsonObject = JSONObject.parseObject(result);
		 String str=jsonObject.toString();
		 //Map<String, Object> resultMap = (Map) jsonObject;
		 return str;
	}
	
	/**
	 * 调第三方接口 formdata提交 post提交
	 * @param url
	 * @param param
	 * @return
	 */
	public static String doPost(String url, Map<String, String> param) {
        // 创建Httpclient对象
        CloseableHttpClient httpClient = HttpClients.createDefault();
        CloseableHttpResponse response = null;
        String resultString = "";
        try {
            // 创建Http Post请求
            HttpPost httpPost = new HttpPost(url);
            // 创建参数列表
            if (param != null) {
                List<NameValuePair> paramList = new ArrayList<>();
                for (String key : param.keySet()) {
                    paramList.add(new BasicNameValuePair(key, param.get(key)));
                }
                // 模拟表单
                UrlEncodedFormEntity entity = new UrlEncodedFormEntity(paramList,"utf-8");
                httpPost.setEntity(entity);
            }
            // 执行http请求
            response = httpClient.execute(httpPost);
            resultString = EntityUtils.toString(response.getEntity(), "utf-8");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                response.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        System.out.println(resultString);
        return resultString;
    }
	
	/**
	 * postman 中form-data提交封装方法
	 * @param url
	 * @param reqEntity
	 * @return
	 */
	/*public static String fordata(String url,MultipartEntity reqEntity){
		MultipartEntity reqEntity=new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE);
		reqEntity.addPart("personnew StringBody("1"));
		reqEntity.addPart("personnel_name", new StringBody("nihao"));
		reqEntity.addPart("personnel_phone", new StringBody(""));
		reqEntity.addPart("personnel_pic1", new StringBody(base64));
		
		HttpClient httpClient=new DefaultHttpClient();
		HttpPost httpPost=new HttpPost(url);
		//MultipartEntity reqEntity=new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE);
		//reqEntity=new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE);
		httpPost.setEntity(reqEntity);
		HttpResponse response;
		String sResponse;
		try {
			response=httpClient.execute(httpPost);
			BufferedReader reader=new BufferedReader(new InputStreamReader(response.getEntity().getContent(),"UTF-8"));
			StringBuilder s=new StringBuilder();
			while((sResponse=reader.readLine())!=null){
				s=s.append(sResponse);
			}
			String result= s.toString();
			System.out.println(result);
			return result;
		}catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}*/
	
	/**
	 * patch 设备修改请求
	 * @param url
	 * @param jsonParam
	 * @param header
	 * @return
	 */
	public static String patch(String url,JSONObject jsonParam, Map<String, String> header){
        int statusCode = 0;
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPatch httpPatch = new HttpPatch(url);
        //请求头
        if (MapUtils.isNotEmpty(header)) {
            for (Map.Entry<String, String> entry : header.entrySet()) {
                httpPatch.addHeader(entry.getKey(), entry.getValue());
            }
        }
        httpPatch.setHeader("Content-type", "application/json");
        try {
            if (jsonParam != null){
                StringEntity entity = new StringEntity(jsonParam.toString(),StandardCharsets.UTF_8);
                httpPatch.setEntity(entity);
            }
            HttpResponse response = httpClient.execute(httpPatch);
            statusCode = response.getStatusLine().getStatusCode();
            BufferedReader reader=new BufferedReader(new InputStreamReader(response.getEntity().getContent(),"UTF-8"));
            StringBuilder sb=new StringBuilder();
            String s;
            while((s=reader.readLine())!=null){
            	sb=sb.append(s);
            }
            return sb.toString();
        } catch (IOException e) {
            //log.error(e.getMessage());
        	System.out.println(e);
        }finally {
            try {
                httpClient.close();
            } catch (IOException e) {
            	System.out.println(e);
            }
        }
        return null;
    }
 
    /**
     * 将map型转为请求参数型
     * @param data
     * @return
     */
    public static String urlencode(Map<String,String> data) {
        StringBuilder sb = new StringBuilder();
        for (Map.Entry i : data.entrySet()) {
            try {
                sb.append(i.getKey()).append("=").append(URLEncoder.encode(i.getValue()+"","UTF-8")).append("&");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
      //name=aaa&id=1&
        return sb.toString();
    }
    /**
	 * map转实体类
	 * @param map
	 * @param clazz
	 * @return
	 */
	public static <T> T map2Object(Map<String, Object> map, Class<T> clazz) {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		if (map == null) {
			return null;
		}
		T obj = null;
		try {
			// 使用newInstance来创建对象
			obj = clazz.newInstance();
			// 获取类中的所有字段
			Field[] fields = obj.getClass().getDeclaredFields();
			for (Field field : fields) {
				int mod = field.getModifiers();
				// 判断是拥有某个修饰符
				if (Modifier.isStatic(mod) || Modifier.isFinal(mod)) {
					continue;
				}
				// 当字段使用private修饰时，需要加上
				field.setAccessible(true);
				// 获取参数类型名字
				String filedTypeName = field.getType().getName();
				// 判断是否为时间类型，使用equalsIgnoreCase比较字符串，不区分大小写
				// 给obj的属性赋值
				if (filedTypeName.equalsIgnoreCase("java.util.date")) {
					String datetimestamp = (String) map.get(field.getName());
					if (datetimestamp.equalsIgnoreCase("null")) {
						field.set(obj, null);
					} else {
						field.set(obj, sdf.parse(datetimestamp));
					}
				} else {
					field.set(obj, map.get(field.getName()));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
	
     
}


