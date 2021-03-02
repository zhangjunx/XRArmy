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
import java.io.InputStream;
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
@RequestMapping("PlatBoxSyn")
@Api(tags="PlatBoxSyn",description="接口标题：盒子对接接口") 
public class PlatBoxSyn {
	 
	
	 
	public static void main(String[] args)  {
		String boxip="192.168.1.236";
		String holderno="202103010946010001";
		String ip="192.168.1.222";
		String pass="69957550";
		String port="8090";
		String devicetype="面板";
		String devicevender="玺瑞";
		//setFace();
		//getFace();
		//delFace();
		//setTimeFace();
		//delTimeFace();
		
		String msg="V_12";
		System.out.println(msg.substring(1));
		
	}
	
	   /**
	    * 带时间段的删除
	    * DELETE:/yunapi/?action=faceIssue&del=time
	    */
		public static void  delTimeFace(){
			Map<String,Object> map=new HashMap<String,Object>();
			Map<String,Object> m=new HashMap<String,Object>();
			List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
			String boxip="192.168.1.236";
			m.put("ip", "192.168.1.222");//设备ip
		    m.put("pass", "69957550");//设备密码
		    m.put("sfzh", "202103010946010001");//唯一编号，用于设备人员编号（如身份证号，工号等）
		    m.put("device_port", "8090");
		    m.put("device_vender", "玺瑞"); 
		    m.put("device_type", "面板");//
		    m.put("face_log_id", "");//人脸下发记录表id 不必填，为空时可忽略
			String url="http://"+boxip+"/yunapi/?action=faceIssue&del=time";
		    String result=netPost(url, m, "DELETE");
		    System.out.println(result);
		}
	
	/**
	 * 带时间段的下发
	 * PUT:/yunapi/?action=faceIssue
	 */
	public static void  setTimeFace(){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		String photostr="1004.jpeg";
		String boxip="192.168.1.236";
		String imgUrl=ImagePathConfig.peoplepic+"/"+photostr;
		System.out.println("imgUrl=="+imgUrl);
		String base64=ImagePathConfig.readPicPath(imgUrl);
		String[] s=base64.split(",");
		m.put("ip", "192.168.1.222");//设备ip
	    m.put("pass", "69957550");//设备密码
	    m.put("sfzh", "202103010946010001");//唯一编号，用于设备人员编号（如身份证号，工号等）
	    m.put("device_port", "8090");
	    m.put("device_vender", "玺瑞"); 
	    m.put("device_type", "面板");//
	    m.put("st", "2021-03-01 11:42:00");//开始时间
	    m.put("et", "2021-03-01 11:45:00");//结束时间
	    m.put("face_log_id", "");//可有可无
		String url="http://"+boxip+"/yunapi/?action=faceIssue";
	    String result=netPost(url, m, "PUT");
	    System.out.println(result);
	}
	
	/**
	 * 查询人员权限
	 * GET:/yunapi/?action=faceIssue
	 */
	public static int  getFace(String boxip,String ip,String pass,String holderno,String devicetype,String devicevender,String port){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,String> m=new HashMap<String,String>();
		int t=0;
		/*String boxip="192.168.1.236";
		m.put("ip", "192.168.1.222");//设备ip
	    m.put("pass", "69957550");//设备密码
	    m.put("sfzh", "202103010946010001");//唯一编号，用于设备人员编号（如身份证号，工号等）
	    m.put("device_port", "8090");
	    m.put("device_vender", "玺瑞"); 
	    m.put("device_type", "面板");*/
		m.put("ip", ip);//设备ip
	    m.put("pass", pass);//设备密码
	    m.put("sfzh", holderno);//唯一编号，用于设备人员编号（如身份证号，工号等）
	    m.put("device_port", port);
	    m.put("device_vender", devicevender); 
	    m.put("device_type", devicetype);//
		//查询权限
	    try{
	    	String url="http://"+boxip+"/yunapi/?action=faceIssue";
		    String result= doGet(url,m,"GET");
		    System.out.println(result);
		    if(result!=null && !"".equals(result)){
		    	JSONObject obj=JSONObject.parseObject(result);
		    	if(obj!=null && !"".equals(obj)){
		    		String code=String.valueOf(obj.getString("result"));
		    		if(code!=null && !"".equals(code) && !"null".equals(code) && code.equals("1")){
		    			t=1;
		    		}
		    	}
		    }
	    }catch(Exception e){
	    	t=0;
	    }
		/**
		 * {"result": 0,"person_id": "202103010946010001","result_msg": "人员ID不存在，请先调用人员注册接口","result_data": []}
		 */
	    return t;
	}
	
	/**
	 * 下发人脸权限
	 * POST:/yunapi/?action=faceIssue&http=one
	 */
	public static int  setFace(String boxip,String ip,String user,String pass,String holderno,String holdername,String base64,String devicetype,String devicevender,String port){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		int t=0;
		/*String photostr="1004.jpeg";
		String boxip="192.168.1.236";
		String imgUrl=ImagePathConfig.peoplepic+"/"+photostr;
		System.out.println("imgUrl=="+imgUrl);
		String base64=ImagePathConfig.readPicPath(imgUrl);
		String[] s=base64.split(",");
		m.put("ip", "192.168.1.222");//设备ip
		m.put("user", "admin");//设备账号
	    m.put("pass", "69957550");//设备密码
	    m.put("sfzh", "202103010946010001");//唯一编号，用于设备人员编号（如身份证号，工号等）
	    m.put("sfzh_name", "黄云凤");//人员姓名
	    m.put("face_pic", s[1]);//base64,不带请求头
	    m.put("device_port", "8090");
	    m.put("device_vender", "玺瑞"); 
	    m.put("device_type", "面板");//*/	
		
		m.put("ip", ip);//设备ip
		m.put("user", user);//设备账号
	    m.put("pass", pass);//设备密码
	    m.put("sfzh", holderno);//唯一编号，用于设备人员编号（如身份证号，工号等）
	    m.put("sfzh_name", holdername);//人员姓名
	    m.put("face_pic", base64);//base64,不带请求头
	    m.put("device_port", port);
	    m.put("device_vender", devicevender); 
	    m.put("device_type", devicetype);//
	    try{
	    	String url="http://"+boxip+"/yunapi/?action=faceIssue&http=one";
		    String result=netPost(url, m, "POST");
		    System.out.println(result);
		    if(result!=null && !"".equals(result)){
		    	JSONObject obj=JSONObject.parseObject(result);
		    	if(obj!=null && !"".equals(obj)){
		    		String code=String.valueOf(obj.getString("result"));
		    		String person_id=String.valueOf(obj.getString("person_id"));
	    			String result_msg=String.valueOf(obj.getString("result_msg"));
		    		if(code!=null && !"".equals(code) && !"null".equals(code) && code.equals("1")){
		    			t=1;
		    		}else if(code!=null && !"".equals(code) && !"null".equals(code) && code.equals("3")){
		    			//信息已存在，照片不存在
		    			t=3;
		    		}else if(code!=null && !"".equals(code) && !"null".equals(code) && code.equals("0")){
		    			if((person_id!=null && !"".equals(person_id) && !"null".equals(person_id) && person_id.equals(holderno))
		    				&& (result_msg!=null && !"".equals(result_msg) && !"null".equals(result_msg) && result_msg.contains("人员ID已存在"))){
		    				t=3;
		    			}
		    		}
		    	}
		    }
	    }catch(Exception e){
	    	System.out.println(e);
	    	t=0;
	    }
		
	    /**
	     * {"result": 1,"person_id": "202103010946010001","result_msg": "OK"}
	    {"result": 0,"person_id": "202103010946010001","result_msg": "人员ID已存在，请调用人员删除或者更新接口"}
	     *
	     */
	    return t;
	}
	
	/**
	 * 删除人脸权限
	 * DELETE:/yunapi/?action=faceIssue&http=one
	 */
	public static int delFace(String boxip,String ip,String user,String pass,String holderno,String devicetype,String devicevender,String port){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,Object> m=new HashMap<String,Object>();
		List<Map<String,Object>> data=new ArrayList<Map<String,Object>>();
		int t=0;
		/*String boxip="192.168.1.236";
		m.put("ip", "192.168.1.222");//设备ip
		m.put("user", "admin");//设备密码
	    m.put("pass", "69957550");//设备密码
	    m.put("sfzh", "202103010946010001");//唯一编号，用于设备人员编号（如身份证号，工号等）
	    m.put("device_port", "8090");
	    m.put("device_vender", "玺瑞"); 
	    m.put("device_type", "面板");//*/ 
		m.put("ip", ip);//设备ip
		m.put("user", user);//设备密码
	    m.put("pass", pass);//设备密码
	    m.put("sfzh", holderno);//唯一编号，用于设备人员编号（如身份证号，工号等）
	    m.put("device_port", port);
	    m.put("device_vender", devicevender); 
	    m.put("device_type", devicetype);//
	    try{
	    	String url="http://"+boxip+"/yunapi/?action=faceIssue&http=one";
		    String result=netPost(url, m, "DELETE");
			System.out.println(result);
		    if(result!=null && !"".equals(result)){
		    	JSONObject obj=JSONObject.parseObject(result);
		    	if(obj!=null && !"".equals(obj)){
		    		String code=String.valueOf(obj.getString("result"));
		    		if(code!=null && !"".equals(code) && !"null".equals(code) && code.equals("1")){
		    			t=1;
		    		}
		    	}
		    }
	    }catch(Exception e){
	    	System.out.println(e);
	    	t=0;
	    }
		return t;
		
		/**
		 * {"result":1,"person_id":"202103010946010001","result_msg":"OK"}
		 * {"result": 0,"person_id": "202103010946010001","result_msg": "effective中的内容代表已删除有效的ID;invalid中的内容代表无效或者不存在的ID}
	    
		 */
	}
	
	
	

	 
	public static int addSyn(String holderno,String holdername,String boxip,String base64){
		Map<String,Object> map=new HashMap<String,Object>();
		System.out.println("同步新增：");
		Map<String,String> m=new HashMap<String,String>();
		if(holdername==null || "".equals(holdername)){
			holdername=holderno;
		}
		int t=0;
		//首先判断是否已存在
		t=getSyn(holderno, boxip);
		if(t==1){
			return t;
		}		
		String url="http://"+boxip+"/yunapi/?action=personnel";
		if(base64!=null && !"".equals(base64)){
			m.put("personnel_id_number",holderno);
			m.put("personnel_name", holdername);
			m.put("personnel_phone", "");
			m.put("personnel_pic1", base64);
			String result= doPost(url, m);
			System.out.println(result);
			if(result!=null && !"".equals(result)){
				Map<String,Object> m1=JSONObject.parseObject(result);
				if(m1!=null && !"".equals(m1) && String.valueOf(m1.get("code")).equals("200")){
					 t=1;
				}
			}
		}
		/**
		 * {"code":203,"data":"","message":"添加人员失败"}
		 */
		
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
	
	 
	public static int editSyn(String holderno,String holdername,String boxip,String base64){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String,String> header=new HashMap<String,String>();
		JSONObject m=new JSONObject();
		System.out.println("同步修改：");
		int t=0;
		//首先判断是否已存在
		t=getSyn(holderno, boxip);
		if(t==0){
			return 2;
		}		
		m.put("personnel_id_number", holderno);
		m.put("personnel_name", holdername);
		m.put("personnel_phone", "");
		m.put("personnel_pic1", base64);
		String url="http://"+boxip+"/yunapi/?action=personnel";
		String result= patch(url, m,header); 
		if(result!=null && !"".equals(result)){
			System.out.println(result);
			Map<String,Object> m1=JSONObject.parseObject(result);
			if(m1!=null && !"".equals(m1) && String.valueOf(m1.get("code")).equals("200")){
				 t=1;
			}
		}
		return t;
	}
	
	

	 
	public static int delSyn(String holderno,String boxip){
		Map<String,Object> map=new HashMap<String,Object>();
		System.out.println("同步删除：");
		int t=0;
		//首先判断是否已存在
		t=getSyn(holderno, boxip);
		if(t==0){
			return 1;
		}		
		Map<String,Object> m=new HashMap<String,Object>();
		String url="http://"+boxip+"/yunapi/?action=personnel&personnel_id_number="+holderno;
		String result= netPost(url,m,"DELETE");
		if(result!=null && !"".equals(result)){
			System.out.println(result);
			Map<String,Object> m1=JSONObject.parseObject(result);
			if(m1!=null && !"".equals(m1) && String.valueOf(m1.get("code")).equals("200")){
				 t=1;
			}
		}
		return t;
	}
	
	 
	public static int getSyn(String holderno,String boxip){
		Map<String,Object> map=new HashMap<String,Object>();
		Map<String, Object> m=new HashMap<String,Object>();
		System.out.println("同步查询：");
		int t=0;
		String url="http://"+boxip+"/yunapi/?action=personnel&personnel_id_number="+holderno;
		String result= netPost(url,m,"GET");
		if(result!=null && !"".equals(result)){
			System.out.println(result);
			Map<String,Object> m1=JSONObject.parseObject(result);
			if(m1!=null && !"".equals(m1) && String.valueOf(m1.get("code")).equals("200")){
				 t=1;
			}
		}
		return t;
	}
	
	/**
	 * 请求连接
	 * @throws Exception
	 */
	public static String netPost(String urlStr, Map<String, Object> map, String method){
		 JSONObject jsonObj=new JSONObject(map);
		 String params = jsonObj.toString();
		 String str="";
		 try{
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
			 }else if(method!=null && method.equals("GET")){
				 //connection.setDoOutput(true);
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
			 str=jsonObject.toString();
			 //Map<String, Object> resultMap = (Map) jsonObject;
		 }catch(Exception ex){
			 ex.printStackTrace();
		 }
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
	
	 /*
     * @param strUrl 请求地址
     * @param params 请求参数
     * @param method 请求方法
     * @return  网络请求字符串
     * @throws Exception
     */
    public static String doGet(String strUrl, Map<String,String> params,String method) {
        HttpURLConnection conn = null;
        BufferedReader reader = null;
        String rs = null;
        try {
            StringBuffer sb = new StringBuffer();
            if(method==null || method.equals("GET")){
                strUrl = strUrl+"?"+urlencode(params);
            }
            URL url = new URL(strUrl);
            conn = (HttpURLConnection) url.openConnection();
            if(method==null || method.equals("GET")){
                conn.setRequestMethod("GET");
            }else{
                conn.setRequestMethod("POST");
                conn.setDoOutput(true);
            }
           // conn.setRequestProperty("User-agent", userAgent);
            
            
		    conn.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
			//conn.setRequestProperty("token", token);
            conn.setUseCaches(false);
            conn.setConnectTimeout(30000);
            conn.setReadTimeout(30000);
            conn.setInstanceFollowRedirects(false);
            conn.connect();
            if (params!= null && method.equals("POST")) {
                try {
                    DataOutputStream out = new DataOutputStream(conn.getOutputStream());
                    out.writeBytes(urlencode(params));
                } catch (Exception e) {
                    // TODO: handle exception
                    e.printStackTrace();
                }
                 
            }
            InputStream is = conn.getInputStream();
            reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            String strRead = null;
            while ((strRead = reader.readLine()) != null) {
                sb.append(strRead);
            }
            rs = sb.toString();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
        	try {
        		if (reader != null) {
                	reader.close();
                }
                if (conn != null) {
                    conn.disconnect();
                }
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
            
        }
        return rs;
    }
	
	   
     
}


