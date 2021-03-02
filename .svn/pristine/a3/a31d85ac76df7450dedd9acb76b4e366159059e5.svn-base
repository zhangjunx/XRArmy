package com.xr.https;

import org.apache.commons.codec.binary.Base64;

import java.util.HashMap;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import com.alibaba.fastjson.JSONObject;
import com.hikvision.artemis.sdk.ArtemisHttpUtil;
import com.hikvision.artemis.sdk.config.ArtemisConfig;

 
public class HKPlat {
	 final static String ARTEMIS_PATH="/artemis";
	 
	public static void main(String[] args) {
		nodesByParams();
	}
	static{
		ArtemisConfig.host="192.168.1.250";
		ArtemisConfig.appKey="24949434";
		ArtemisConfig.appSecret="85q63mc5ZX51IzU390Rj";
	}
	
	
	/**
	 * 查询区域列表  ：/api/irds/v1/region/nodesByParams
	 * Object:必填，
	 * resourceType:必填，资源类型，详见数据字典，资源类型/资源权限码；查询资源的类型，
	 * 传region时查询的为用户有配置权限的区域树，传资源类型如：camera,encodeDevice查询用户对该类资源有权限的区域树；
	 * 注：资源iasDevice\reader\floor不进行权限校验，即不传authCodes.
	 * @return 
	 * 
	 */
	public static String nodesByParams(){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,String> m=new HashMap<String,String>();
		String url="/api/irds/v2/region/nodesByParams";//"/api/irds/v1/region/nodesByParams";
		Map<String,String> path=new HashMap<String,String>(2){
			{put("https://",ARTEMIS_PATH+url);}
		};
		JSONObject obj=new JSONObject();
		/**
		 * region 区域，org 组织，
		 * acsDevice 门禁控制器，
		 * door 门禁点，encodeDevice
		 * camera:监控点 
		 * ioIn:报警输入
		 * ioOut:报警输出
		 * iasDevice:入侵报警-报警主机
		 * subSys:入侵报警-子系统通道
		 * defence:入侵报警-防区通道
		 * visDeviceInDoor:可视对讲机-室内机
		 * 
		 */
		 
		obj.put("resourceType", "camera");
		obj.put("pageNo", 1);
		obj.put("pageSize", 30);
		String body=obj.toJSONString();
		String result=ArtemisHttpUtil.doPostStringArtemis(path, body, null,null, "application/json");
		System.out.println(result);//sPTT0as56broDKJh3piSTNFZYKbIHQ4PCkqmNgfOZmU=
		return result;
		
	}
	
	
	/**
	 * 视频业务 API服务 视频资源接口  
	 * 5.查询监控点列表
	 * /api/resource/v1/camera/advance/cameraList
	 * @return 
	 */
	public static String cameraList(){
		String url="/api/resource/v1/camera/advance/cameraList";
		Map<String,String> path=new HashMap<String,String>(2){
			{put("https://",ARTEMIS_PATH+url);}
		};
		 
		JSONObject obj=new JSONObject();
		//obj.put("cameraIndexCodes", "");//监控点唯一标识，多个值用逗号分隔
		obj.put("pageNo", 1);
		obj.put("pageSize", 10);
		String body=obj.toJSONString();
		String result=ArtemisHttpUtil.doPostStringArtemis(path, body, null,null, "application/json");
		System.out.println(result);
		return result; 
	}
	
	
	/**
	 * 视频业务 API服务 视频资源接口  
	 * 2.查询编码设备列表
	 * /api/resource/v1/encodeDevice/get
	 * @return 
	 */
	public static String getDev(){
		String url="/api/resource/v1/encodeDevice/get";
		Map<String,String> path=new HashMap<String,String>(2){
			{put("https://",ARTEMIS_PATH+url);}
		};
		JSONObject obj=new JSONObject();
		obj.put("pageNo", 1);
		obj.put("pageSize", 10);
		String body=obj.toJSONString();
		String result=ArtemisHttpUtil.doPostStringArtemis(path, body, null,null, "application/json");
		System.out.println(result);
		return result; 
	}
	
	
	public static void getToken(){
		String appKey="24949434";
		String appSecret="85q63mc5ZX51IzU390Rj";
	     Mac sha256_HMAC;
		try {
			sha256_HMAC = Mac.getInstance("HmacSHA256");
			SecretKeySpec secret_key=new SecretKeySpec(appSecret.getBytes(),"HmacSHA256");
		     sha256_HMAC.init(secret_key);
		     String hash=Base64.encodeBase64String(sha256_HMAC.doFinal(appKey.getBytes()));
		     System.out.println(hash);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	 
	 
  
	
}


