package com.xr.controller;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import com.alibaba.fastjson.JSONObject;
import com.xr.service.IDevicePlatService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
@Controller
@RequestMapping("PlatHK")
@Api(tags="PlatHK",description="接口标题：海康ISC平台对接接口")
public class PlatHKController {
	@Value("${hkplat.ip}")
	private  String ip;
	
	@Value("${hkplat.appKey}")
	private  String appKey;
	
	@Value("${hkplat.appSecret}")
	private String appSecret;
	
	@Autowired
	private IDevicePlatService idps;

	@ApiOperation(httpMethod="POST",value="接口说明：获取平台区域接口",notes="接口的note说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=true,dataType="String",paramType="path")
	})
	@RequestMapping(value="/getArea",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object>  getArea(){
		Map<String,Object> map=new HashMap<String,Object>();
		String url="/api/irds/v2/region/nodesByParams";
		url="/artemis"+url;
		JSONObject obj=new JSONObject();
		obj.put("resourceType", "camera");
		obj.put("pageNo", 1);
		obj.put("pageSize", 100);
		String result=getPost(ip,url,obj,appKey);
		System.out.println(result);
		map=JSONObject.parseObject(result);
		return map;
	}
	
	@ApiOperation(httpMethod="POST",value="接口说明：获取平台设备列表接口",notes="接口的note说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=true,dataType="String",paramType="path")
		})
	@RequestMapping(value="/getDev",method=RequestMethod.GET)
	@ResponseBody
	public  Map<String,Object>  getDev(){
		Map<String,Object> map=new HashMap<String,Object>();
		String url="/api/resource/v1/encodeDevice/get";
		url="/artemis"+url;
		JSONObject obj=new JSONObject();
		obj.put("pageNo", 1);
		obj.put("pageSize", 100);
		String result=getPost(ip,url,obj,appKey);
		System.out.println(result);
		map=JSONObject.parseObject(result);
		return map;
	}
	

	@ApiOperation(httpMethod="POST",value="接口说明：获取平台监控点接口",notes="接口的note说明")
	@ApiImplicitParams({
		@ApiImplicitParam(name="loginid",value="参数：登录人id",required=true,dataType="String",paramType="path")
		})
	@RequestMapping(value="/getDot",method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object>  getDot(){
		Map<String,Object> map=new HashMap<String,Object>();
		String url="/api/resource/v1/camera/advance/cameraList";
		url="/artemis"+url;
		JSONObject obj=new JSONObject();
		//obj.put("cameraIndexCodes", "");//监控点唯一标识，多个值用逗号分隔
		obj.put("pageNo", 1);
		obj.put("pageSize", 100);
		String result=getPost(ip,url,obj,appKey);
		System.out.println(result);
		map=JSONObject.parseObject(result);
		return map;
	}
	
	
	 
	

	 public  String getPost(String ip,String url,JSONObject obj,String appkey){
		   // String url="/artemis/api/resource/v1/regions/root";
		   // String url="/artemis/api/resource/v1/camera/advance/cameraList";
	    	String method="POST";
	    	String accept="*/*";
	    	String contentType="application/json";
	    	String xcakey=appkey;
	    	String signstr=method+"\n"+accept+"\n"+contentType+"\n"+"x-ca-key:"+xcakey+"\n"+url;
	    	System.out.println(signstr);
	    	String sign=getSign(signstr);
	    	System.out.println(sign);
	    	String header="x-ca-key";
	    	String json=obj.toJSONString();
	    	try{
	    		url="https://"+ip+url;
	    		URL uri=new URL(url);
	    		HttpURLConnection conn=(HttpURLConnection) uri.openConnection();
	    		conn.setConnectTimeout(8000);
	    	    conn.setDoOutput(true);
	    	    conn.setDoInput(true);
	    	    conn.setRequestMethod("POST");
	    	    conn.setUseCaches(false);
	    	    conn.setRequestProperty("Accept", accept);
	    	    conn.setRequestProperty("Content-Type", contentType);
	    	    conn.setRequestProperty("Connection", "Keep-Alive");
	    	    conn.setRequestProperty("x-ca-key", appKey);
	    	    conn.setRequestProperty("x-ca-signature", sign);
	    	    conn.setRequestProperty("x-ca-signature-headers", header);
	    	   
	    	    // 得到请求的输出流对象
	   		 DataOutputStream out = new DataOutputStream(conn.getOutputStream());
	   		 out.write(json.getBytes("UTF-8"));
	   		 out.flush();
	   		 out.close();
	   	
	   		 // 建立实际的连接
	   		 conn.connect();
	   		 // 获取所有响应头字段
	   		 Map<String, List<String>> headers = conn.getHeaderFields();
	   		 // 遍历所有的响应头字段
	   		 for (String key : headers.keySet()) {
	   			 //System.out.println(key + "--->" + headers.get(key));
	   		 }
	   		 // 定义 BufferedReader输入流来读取URL的响应
	   		 BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
	   		 String res = "";
	   		 String getLine;
	   		 while ((getLine = br.readLine()) != null) {
	   			 res += getLine;
	   		 }
	   		 br.close();
	   		 JSONObject jsonObject = JSONObject.parseObject(res);
	   		 //System.out.println(jsonObject);
	   		 String str=jsonObject.toString();
	   		 return str;
	    	}catch(Exception e){
	    		e.printStackTrace();
	    	}
			return null;
	    }
	
  
	 
	 public String getSign(String signstr){
		 //String signstr=getSignstr();
		   Mac sha256_HMAC;
			try {
				sha256_HMAC = Mac.getInstance("HmacSHA256");
				SecretKeySpec secret_key=new SecretKeySpec(appSecret.getBytes(),"HmacSHA256");
			     sha256_HMAC.init(secret_key);
			     String hash=Base64.encodeBase64String(sha256_HMAC.doFinal(signstr.getBytes()));
			     System.out.println(hash);
			     return hash;
			} catch (Exception e) {
				e.printStackTrace();
			}
			return null;
	}
	 
	 
	 
	
	 @ApiOperation(httpMethod="POST",value="接口说明：新增平台设备列表接口",notes="接口的note说明")
		@ApiImplicitParams({
			@ApiImplicitParam(name="loginid",value="参数：登录人id",required=true,dataType="String",paramType="path")
			})
		@RequestMapping(value="/addDev",method=RequestMethod.GET)
		@ResponseBody
		public  Map<String,Object>  addDev(){
			Map<String,Object> map=new HashMap<String,Object>();
			String url="/api/resource/v1/encodeDevice/get";
			url="/artemis"+url;
			JSONObject obj=new JSONObject();
			obj.put("pageNo", 1);
			obj.put("pageSize", 100);
			String result=getPost(ip,url,obj,appKey);
			System.out.println(result);
			map=JSONObject.parseObject(result);
			List<Map<String,Object>> exist=new ArrayList<Map<String,Object>>();
			if(map!=null && !"".equals(map)){
				Map<String,Object> data=(Map<String, Object>) map.get("data");
				if(data!=null && data.get("list")!=null){
					List<Map<String,Object>> list=(List<Map<String, Object>>) data.get("list");
					for(int i=0;i<list.size();i++){
						Map<String,Object> m=new HashMap<String,Object>();
						Map<String,Object> m1=list.get(i);
						String devSerialNum=String.valueOf(m1.get("devSerialNum"));
						String deviceKey=String.valueOf(m1.get("deviceKey"));
						String deviceType=String.valueOf(m1.get("deviceType"));
						String indexCode=String.valueOf(m1.get("indexCode"));
						String ip=String.valueOf(m1.get("ip"));
						String port=String.valueOf(m1.get("port"));
						String manufacturer=String.valueOf(m1.get("manufacturer"));
						String name=String.valueOf(m1.get("name"));
						m.put("devicesn", devSerialNum);
						m.put("deviceno", (i+1));
						m.put("devicename", name);
						m.put("devicetype", deviceType);
						m.put("devicevender", manufacturer);
						m.put("ip", ip);
						m.put("port", port);
						m.put("maccode", deviceKey);
						m.put("deviceuse", indexCode);
						m.put("doorname", name);
						m.put("type", "aa");
						exist.add(m);
					}
				}
			}
			//分批次添加
			List<Map<String,Object>> pici=new ArrayList<Map<String,Object>>();
			for(int i=0;i<exist.size();i++){
				pici.add(exist.get(i));
				if(pici.size()==100 || i==exist.size()-1){
					int t=idps.addService(pici);
					pici.clear();
				}
			}
			if(exist!=null && exist.size()>0){
				map.put("flag", true);
				map.put("reason", "同步成功！");
				
			}else{
				map.put("flag", false);
				map.put("reason", "同步失败！");
			}
			return map;
		}
	
	
}


