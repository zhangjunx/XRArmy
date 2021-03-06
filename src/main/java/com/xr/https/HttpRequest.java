package com.xr.https;

import org.apache.commons.codec.binary.Base64;

import java.util.HashMap;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.hikvision.artemis.sdk.ArtemisHttpUtil;
import com.hikvision.artemis.sdk.config.ArtemisConfig;
import com.xr.entry.AreaList;

 
public class HttpRequest {
	 final static String ARTEMIS_PATH="/artemis";
	 
    public static void main(String[] args) {
		root();
	}
	static{
		ArtemisConfig.host="192.168.1.250";
		ArtemisConfig.appKey="24949434";
		ArtemisConfig.appSecret="85q63mc5ZX51IzU390Rj";
	}
	
	/**
	 * 视频业务 API服务 视频资源接口  
	 * 5.查询监控点列表
	 * /api/resource/v1/camera/advance/cameraList
	 */
	public static void cameraList(){
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
		/**
		 * {"code":"0","msg":"SUCCESS","data":{"total":4,"pageNo":1,"pageSize":10,
		 * "list":[{"altitude":null,"cameraIndexCode":"3cb038747cab4991b15e5ab8b3bc1a61",
				 * "cameraName":"公司大门","cameraType":0,"cameraTypeName":"枪机",
				 * "capabilitySet":"io,event_gis,gis,event_veh,event_veh_recognition,event_ias,event_vss,
				 * record,vss,event_io,net,maintenance,event_device,status",
				 * "capabilitySetName":null,"intelligentSet":null,"intelligentSetName":null,
				 * "channelNo":"1","channelType":"analog","channelTypeName":"模拟通道",
				 * "createTime":"2021-01-04T15:07:53.661+08:00","encodeDevIndexCode":"c6f29a06b2d6404f961614f27f3bd52a",
				 * "encodeDevResourceType":null,"encodeDevResourceTypeName":null,"gbIndexCode":null,
				 * "installLocation":null,"keyBoardCode":null,"latitude":null,"longitude":null,"pixel":null,
				 * "ptz":null,
				 * "ptzName":null,"ptzController":null,"ptzControllerName":null,"recordLocation":null,"recordLocationName":null,
				 * "regionIndexCode":"244631b3-ccac-4842-bde3-e3e183cc6977","status":null,"statusName":null,"transType":1,
				 * "transTypeName":"TCP","treatyType":null,"treatyTypeName":null,
		         * "viewshed":null,"updateTime":"2021-01-04T15:07:53.669+08:00"},
		 * {"altitude":null,"cameraIndexCode":"78451bcc62ce4e46b2ae33b1a387dab0",
				 * "cameraName":"财务室","cameraType":0,"cameraTypeName":"枪机",
				 * "capabilitySet":"gis,event_ias,io,vss,event_io,event_gis,net,maintenance,event_device,status",
				 * "capabilitySetName":null,"intelligentSet":null,"intelligentSetName":null,
				 * "channelNo":"1","channelType":"analog","channelTypeName":"模拟通道","createTime":"2021-01-04T15:08:04.852+08:00",
				 * "encodeDevIndexCode":"62f8f1509a5147a480a3ce60a7584eaf","encodeDevResourceType":null,
				 * "encodeDevResourceTypeName":null,"gbIndexCode":null,"installLocation":null,
				 * "keyBoardCode":null,"latitude":null,"longitude":null,"pixel":null,"ptz":null,
				 * "ptzName":null,"ptzController":null,"ptzControllerName":null,"recordLocation":null,
				 * "recordLocationName":null,"regionIndexCode":"bff64c2b-cf86-46e9-8413-fcb3d4b0befd",
				 * "status":null,"statusName":null,"transType":1,"transTypeName":"TCP","treatyType":null,
				 * "treatyTypeName":null,"viewshed":null,"updateTime":"2021-01-04T15:08:04.859+08:00"},
		 * {"altitude":null,"cameraIndexCode":"ffb2784067914b6b89113062f75596fa",
			 * "cameraName":"软件部","cameraType":0,"cameraTypeName":"枪机",
			 * "capabilitySet":"gis,event_ias,io,vss,event_io,event_gis,net,maintenance,event_device,status",
			 * "capabilitySetName":null,"intelligentSet":null,"intelligentSetName":null,
			 * "channelNo":"1","channelType":"analog","channelTypeName":"模拟通道","createTime":"2021-01-04T15:08:26.112+08:00",
			 * "encodeDevIndexCode":"9c1887fceec24998adc91762f102ef9f","encodeDevResourceType":null,
			 * "encodeDevResourceTypeName":null,"gbIndexCode":null,"installLocation":null,
			 * "keyBoardCode":null,"latitude":null,"longitude":null,"pixel":null,"ptz":null,
			 * "ptzName":null,"ptzController":null,"ptzControllerName":null,
			 * "recordLocation":null,"recordLocationName":null,
			 * "regionIndexCode":"3327b5fa-9cb0-4be2-b528-b848605586d3",
			 * "status":null,"statusName":null,"transType":1,"transTypeName":"TCP","treatyType":null,
			 * "treatyTypeName":null,"viewshed":null,"updateTime":"2021-01-04T15:08:26.120+08:00"},
		 * {"altitude":null,"cameraIndexCode":"58ebfb4fb5b24a9d81e86f77d85f8fa1",
			 * "cameraName":"高速球","cameraType":0,"cameraTypeName":"枪机",
			 * "capabilitySet":"io,event_face,event_gis,gis,event_veh,event_veh_recognition,face,event_vss,record,vss,ptz,event_io,net,maintenance,event_device,status",
			 * "capabilitySetName":null,"intelligentSet":null,"intelligentSetName":null,"channelNo":"1",
			 * "channelType":"analog","channelTypeName":"模拟通道","createTime":"2021-01-04T15:08:44.859+08:00",
			 * "encodeDevIndexCode":"b877d43e4f364397bdc26bb877a3026f","encodeDevResourceType":null,
			 * "encodeDevResourceTypeName":null,"gbIndexCode":null,"installLocation":null,
			 * "keyBoardCode":null,"latitude":null,"longitude":null,"pixel":null,"ptz":null,
			 * "ptzName":null,"ptzController":null,"ptzControllerName":null,"recordLocation":null,"recordLocationName":null,
			 * "regionIndexCode":"9b6c09a3-67ff-444e-967b-a5770860212a","status":null,"statusName":null,"transType":1,
			 * "transTypeName":"TCP","treatyType":null,"treatyTypeName":null,"viewshed":null,"updateTime":"2021-01-04T15:20:21.371+08:00"}]}}
		 */
	}
	
	
	/**
	 * 视频业务 API服务 视频资源接口  
	 * 4.根据区域获取下级编码设备列表
	 * /api/resource/v1/encodeDevice/subResources
	 */
	public static void subResources(){
		String url="/api/resource/v1/encodeDevice/subResources";
		Map<String,String> path=new HashMap<String,String>(2){
			{put("https://",ARTEMIS_PATH+url);}
		};
		 
		JSONObject obj=new JSONObject();
		obj.put("regionIndexCode", "root000000");
		obj.put("pageNo", 1);
		obj.put("pageSize", 10);
		String body=obj.toJSONString();
		String result=ArtemisHttpUtil.doPostStringArtemis(path, body, null,null, "application/json");
		System.out.println(result); 
		/**
		 * 
		 */
		 
		 
	}
	
	
	/**
	 * 视频业务 API服务 视频资源接口  
	 * 3.获取单个编码设备信息
	 * /api/resource/v1/encodeDevice/single/get
	 */
	public static void getSingle(){
		String url="/api/resource/v1/encodeDevice/single/get";
		Map<String,String> path=new HashMap<String,String>(2){
			{put("https://",ARTEMIS_PATH+url);}
		};
		 
		JSONObject obj=new JSONObject();
		obj.put("resourceIndexCode", "b877d43e4f364397bdc26bb877a3026f");
		String body=obj.toJSONString();
		String result=ArtemisHttpUtil.doPostStringArtemis(path, body, null,null, "application/json");
		System.out.println(result); 
		/**
		 * {"code":"0","msg":"SUCCESS",
		 * "data":{"belongIndexCode":"--",
		 * "capability":"io@event_face@event_gis@gis@event_veh@event_veh_recognition@face@event_vss@record@vss@ptz@event_io@net@maintenance@event_device@status",
		 * "deviceKey":"drv_vss_hiksdk_general_1.9.0","deviceKeyVersion":"1.9.0",
		 * "deviceType":"iDS-2DF8225IH-A","devSerialNum":"iDS-2DF8225IH-A20201212CCCHF23476803X",
		 * "indexCode":"b877d43e4f364397bdc26bb877a3026f","ip":"192.168.1.212","manufacturer":"hikvision",
		 * "name":"高速球","netZoneId":"0","port":"8000",
		 * "regionIndexCode":"9b6c09a3-67ff-444e-967b-a5770860212a",
		 * "resourceType":"encodeDevice","treatyType":"hiksdk_net",
		 * "createTime":"2021-01-04T15:05:19.955+08:00","updateTime":"2021-01-04T15:05:42.927+08:00",
		 * "userName":null,"password":null,"appKey":null,"secret":null}}

		 */
		 
		 
	}
	
	/**
	 * 视频业务 API服务 视频资源接口  
	 * 2.获取编码设备列表
	 * /api/resource/v1/encodeDevice/search
	 */
	public static void search(){
		String url="/api/resource/v1/encodeDevice/search";
		Map<String,String> path=new HashMap<String,String>(2){
			{put("https://",ARTEMIS_PATH+url);}
		};
		String[] s=new String[1];
		s[0]="root000000";
		JSONObject obj=new JSONObject();
		obj.put("pageNo", 1);
		obj.put("pageSize", 10);
		
		obj.put("regionIndexCodes", s);
		String body=obj.toJSONString();
		String result=ArtemisHttpUtil.doPostStringArtemis(path, body, null,null, "application/json");
		System.out.println(result); 
		/**
		 * {"code":"0","msg":"SUCCESS",
		 * "data":{"total":2,"pageNo":1,"pageSize":10,
		 * "list":[{"belongIndexCode":"--","capability":null,
		 * "deviceKey":"drv_vss_hiksdk_general_1.9.0",
		 * "deviceKeyVersion":"1.9.0","deviceType":"DS-TCG227-A",
		 * "devSerialNum":"DS-TCG227-A 20181105AIC65944249",
		 * "indexCode":"50388bdb3f624f0a984765505cf14e5c",
		 * "ip":"192.168.1.111","manufacturer":"hikvision",
		 * "name":"IP CAPTURE CAMERA","netZoneId":"0",
		 * "port":"8000","regionIndexCode":"root000000",
		 * "resourceType":"encodeDevice","treatyType":"hiksdk_net",
		 * "createTime":"2021-01-13T17:07:18.149+08:00",
		 * "updateTime":"2021-01-13T17:07:18.812+08:00",
		 * "userName":null,"password":null,
		 * "appKey":null, "secret":null},
		 * {"belongIndexCode":"--",
		 * "capability":"event_veh@event_veh_violation@event_veh_recognition@vss@net@maintenance@event_device@status",
		 * "deviceKey":"drv_vss_hiksdk_general_1.9.0",
		 * "deviceKeyVersion":"1.9.0",
		 * "deviceType":"DS-TCG205-B",
		 * "devSerialNum":"DS-TCG205-B 20201025AIF00314909",
		 * "indexCode":"4dd6f044dd3d4c7883face646b9f0ff1",
		 * "ip":"192.168.1.73","manufacturer":"hikvision",
		 * "name":"IP CAPTURE CAMERA","netZoneId":"0","port":"8000",
		 * "regionIndexCode":"root000000","resourceType":"encodeDevice",
		 * "treatyType":"hiksdk_net","createTime":"2021-01-13T17:13:49.703+08:00",
		 * "updateTime":"2021-01-13T17:13:50.367+08:00",
		 * "userName":null,"password":null,"appKey":null,"secret":null}]}}

		 */
	}
	
	/**
	 * 视频业务 API服务 视频资源接口  
	 * 2.查询编码设备列表
	 * /api/resource/v1/encodeDevice/get
	 */
	public static void getDev(){
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
		/**
		 * {"code":"0","msg":"SUCCESS",
		 * "data":{"total":6,"pageNo":1,"pageSize":10,
		 * "list":[{"belongIndexCode":"--",
			 * "capability":"io@event_gis@gis@event_veh@event_veh_recognition@event_ias@event_vss@record@vss@event_io@net@maintenance@event_device@status",
			 * "deviceKey":"drv_vss_hiksdk_general_1.9.0",
			 * "deviceKeyVersion":"1.9.0", "deviceType":"DS-2CD3346DWD-I",
			 * "devSerialNum":"DS-2CD3346DWD-I20180816AACHC41305357",
			 * "indexCode":"c6f29a06b2d6404f961614f27f3bd52a",
			 * "ip":"192.168.1.68","manufacturer":"hikvision",
			 * "name":"前台","netZoneId":"0", "port":"8000",
			 * "regionIndexCode":"244631b3-ccac-4842-bde3-e3e183cc6977",
			 * "resourceType":"encodeDevice","treatyType":"hiksdk_net",
			 * "createTime":"2021-01-04T15:01:09.296+08:00",
			 * "updateTime":"2021-01-04T15:01:21.473+08:00",
			 * "userName":null,"password":null,
			 * "appKey":null,"secret":null},
		 * {"belongIndexCode":"--", "capability":"gis@event_ias@io@vss@event_io@event_gis@net@maintenance@event_device@status",
			 * "deviceKey":"drv_vss_hiksdk_general_1.9.0",
			 * "deviceKeyVersion":"1.9.0",
			 * "deviceType":"DS-2CD3120FD-IS",
			 * "devSerialNum":"DS-2CD3120FD-IS20150627AACH527258786",
			 * "indexCode":"62f8f1509a5147a480a3ce60a7584eaf",
			 * "ip":"192.168.1.65", "manufacturer":"hikvision",
			 * "name":"财务部","netZoneId":"0",
			 * "port":"8000","regionIndexCode":"bff64c2b-cf86-46e9-8413-fcb3d4b0befd",
			 * "resourceType":"encodeDevice","treatyType":"hiksdk_net",
			 * "createTime":"2021-01-04T15:01:53.835+08:00","updateTime":"2021-01-04T15:02:15.686+08:00",
			 * "userName":null,"password":null,"appKey":null,"secret":null},
		 * {"belongIndexCode":"--","capability":"gis@event_ias@io@vss@event_io@event_gis@net@maintenance@event_device@status",
			 * "deviceKey":"drv_vss_hiksdk_general_1.9.0","deviceKeyVersion":"1.9.0",
			 * "deviceType":"DS-2CD3120FD-IS",
			 * "devSerialNum":"DS-2CD3120FD-IS20150525AACH519741053",
			 * "indexCode":"9c1887fceec24998adc91762f102ef9f",
			 * "ip":"192.168.1.66","manufacturer":"hikvision",
			 * "name":"市场部","netZoneId":"0","port":"8000",
			 * "regionIndexCode":"3327b5fa-9cb0-4be2-b528-b848605586d3",
			 * "resourceType":"encodeDevice","treatyType":"hiksdk_net",
			 * "createTime":"2021-01-04T15:02:44.411+08:00","updateTime":"2021-01-04T15:03:21.026+08:00",
			 * "userName":null,"password":null,"appKey":null,"secret":null},
		 * {"belongIndexCode":"--","capability":"io@event_face@event_gis@gis@event_veh@event_veh_recognition@face@event_vss@record@vss@ptz@event_io@net@maintenance@event_device@status",
			 * "deviceKey":"drv_vss_hiksdk_general_1.9.0","deviceKeyVersion":"1.9.0",
			 * "deviceType":"iDS-2DF8225IH-A","devSerialNum":"iDS-2DF8225IH-A20201212CCCHF23476803X",
			 * "indexCode":"b877d43e4f364397bdc26bb877a3026f",
			 * "ip":"192.168.1.212","manufacturer":"hikvision",
			 * "name":"高速球","netZoneId":"0","port":"8000",
			 * "regionIndexCode":"9b6c09a3-67ff-444e-967b-a5770860212a",
			 * "resourceType":"encodeDevice","treatyType":"hiksdk_net",
			 * "createTime":"2021-01-04T15:05:19.955+08:00","updateTime":"2021-01-04T15:05:42.927+08:00",
			 * "userName":null,"password":null,"appKey":null,"secret":null},
		 * {"belongIndexCode":"--","capability":null,"deviceKey":"drv_vss_hiksdk_general_1.9.0",
			 * "deviceKeyVersion":"1.9.0","deviceType":"DS-TCG227-A",
			 * "devSerialNum":"DS-TCG227-A 20181105AIC65944249",
			 * "indexCode":"50388bdb3f624f0a984765505cf14e5c","ip":"192.168.1.111","manufacturer":"hikvision",
			 * "name":"IP CAPTURE CAMERA","netZoneId":"0","port":"8000",
			 * "regionIndexCode":"root000000","resourceType":"encodeDevice","treatyType":"hiksdk_net",
			 * "createTime":"2021-01-13T17:07:18.149+08:00","updateTime":"2021-01-13T17:07:18.812+08:00",
			 * "userName":null,"password":null,"appKey":null,"secret":null},
		 * {"belongIndexCode":"--","capability":"event_veh@event_veh_violation@event_veh_recognition@vss@net@maintenance@event_device@status",
		 * "deviceKey":"drv_vss_hiksdk_general_1.9.0","deviceKeyVersion":"1.9.0","deviceType":"DS-TCG205-B",
		 * "devSerialNum":"DS-TCG205-B 20201025AIF00314909","indexCode":"4dd6f044dd3d4c7883face646b9f0ff1",
		 * "ip":"192.168.1.73","manufacturer":"hikvision",
		 * "name":"IP CAPTURE CAMERA","netZoneId":"0","port":"8000",
		 * "regionIndexCode":"root000000","resourceType":"encodeDevice","treatyType":"hiksdk_net",
		 * "createTime":"2021-01-13T17:13:49.703+08:00","updateTime":"2021-01-13T17:13:50.367+08:00",
		 * "userName":null,"password":null,"appKey":null,"secret":null}]}}

		 */
	}
	
	/**查询资源列表
	 * /api/irds/v1/resource/resourcesByParams
	 */
	public static void resourcesByParams(){
		String url="/api/irds/v1/resource/resourcesByParams";
		Map<String,String> path=new HashMap<String,String>(2){
			{put("https://",ARTEMIS_PATH+url);}
		};
		JSONObject obj=new JSONObject();
		obj.put("resourceType", "floor");
		obj.put("pageNo", 1);
		obj.put("pageSize", 10);
		String body=obj.toJSONString();
		String result=ArtemisHttpUtil.doPostStringArtemis(path, body, null,null, "application/json");
		System.out.println(result); 
		
	}
	/**
	 * 批量添加区域
	 * /api/resource/v1/region/batch/add
	 */
	public static String add(){
		String url="/api/resource/v1/region/batch/add";
		Map<String,String> path=new HashMap<String,String>(2){
			{put("https://",ARTEMIS_PATH+url);}
		};
		JSONArray arr=new JSONArray();
		JSONObject o=new JSONObject();
		o.put("clientId", 1);
		o.put("regionIndexCode", "001");
		o.put("parentIndexCode", "-1");
		o.put("regionName", "区域XR1");
		o.put("regionCode", "001");
		o.put("regionType", 10);
		o.put("description", "描述信息");
		arr.add(o);
		String body=arr.toString();
		String result=ArtemisHttpUtil.doPostStringArtemis(path, body, null,null, "application/json");//
		System.out.println(result); 
		return result;
	}
	
	/**
	 * 修改区域
	 * /api/resource/v1/region/single/update
	 * @return
	 */
	public static String update(){
		String url="/api/resource/v1/region/single/update";
		Map<String,String> path=new HashMap<String,String>(2){
			{put("https://",ARTEMIS_PATH+url);}
		};
		JSONObject obj=new JSONObject();
		obj.put("clientId", 1);
		obj.put("regionIndexCode", "001");
		obj.put("parentIndexCode", "-1");
		obj.put("regionName", "区域XR1");
		obj.put("regionCode", "001");
		obj.put("regionType", 10);
		obj.put("description", "描述信息");
		String body=obj.toString();
		String result=ArtemisHttpUtil.doPostStringArtemis(path, body, null,null, "application/json");//
		System.out.println(result);
		return result;
	}
	
	/**4.批量删除区域
	 * /api/resource/v1/region/batch/delete
	 */
	public static void delete(){
		String url="/api/resource/v1/region/batch/delete";
		Map<String,String> path=new HashMap<String,String>(2){
			{put("https://",ARTEMIS_PATH+url);}
		};
		String[] arr=new String[1];
		arr[0]="001";
		JSONObject o=new JSONObject();
		o.put("indexCodes", arr);
		String body=o.toJSONString();
		String result=ArtemisHttpUtil.doPostStringArtemis(path, body, null,null, "application/json");
		System.out.println(result);
		 
		 
	}
	
	
	/**
	 * 获取根区域信息  ：/api/resource/v1/regions/root
	 */
	public static String root(){
		String url="/api/resource/v1/regions/root";
		Map<String,String> path=new HashMap<String,String>(2){
			{put("https://",ARTEMIS_PATH+url);}
		};
		JSONObject obj=new JSONObject();
		String body=obj.toJSONString();
		String result=ArtemisHttpUtil.doPostStringArtemis(path, body, null,null, "application/json");
		System.out.println(result);
		/**
		 * {"code":"0","msg":"SUCCESS",
		 * "data":{"indexCode":"root000000",
		 * "name":"根节点",
		 * "parentIndexCode":"-1",
		 * "treeCode":"0"}}

		 */
		JSONObject o=JSONObject.parseObject(result);
		JSONObject data=o.getJSONObject("data");
		String rootcode="";
		if(data!=null && !"".equals(data)){
			rootcode=data.getString("indexCode");
		}
		return rootcode;
	}
	
	/**获取资源接口属性
	 * /api/resource/v1/resource/properties
	 */
	public static void properties(){
		String url="/api/resource/v1/resource/properties";
		Map<String,String> path=new HashMap<String,String>(2){
			{put("https://",ARTEMIS_PATH+url);}
		};
		JSONObject obj=new JSONObject();
		obj.put("resourceType", "region");
		String body=obj.toJSONString();
		String result=ArtemisHttpUtil.doPostStringArtemis(path, body, null,null, "application/json");
		System.out.println(result); 
	}
	
	
	
	/**
	 * 查询区域列表  ：/api/irds/v1/region/nodesByParams
	 * Object:必填，
	 * resourceType:必填，资源类型，详见数据字典，资源类型/资源权限码；查询资源的类型，
	 * 传region时查询的为用户有配置权限的区域树，传资源类型如：camera,encodeDevice查询用户对该类资源有权限的区域树；
	 * 注：资源iasDevice\reader\floor不进行权限校验，即不传authCodes.
	 * 
	 */
	public static void nodesByParams(){
		ArtemisConfig.host="192.168.1.250";
		ArtemisConfig.appKey="24949434";
		ArtemisConfig.appSecret="85q63mc5ZX51IzU390Rj";
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,String> m=new HashMap<String,String>();
		String url="/api/irds/v2/region/nodesByParams";//"/api/irds/v1/region/nodesByParams";
		Map<String,String> path=new HashMap<String,String>(2){
			{put("https://",ARTEMIS_PATH+url);}
		};
		JSONObject obj=new JSONObject();
		AreaList al=new AreaList();
		obj.put("Object", al);
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
		
	}
	
	public static void getToken(){
		ArtemisConfig.host="192.168.1.250";
		ArtemisConfig.appKey="24949434";
		ArtemisConfig.appSecret="85q63mc5ZX51IzU390Rj";
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


