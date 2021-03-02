package com.xr.configure;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.InetAddress;
import java.net.URLDecoder;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
//import org.codehaus.plexus.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.xr.entry.SystemLog;
import com.xr.entry.UserData;
import com.xr.service.ISystemLogService;
import com.xr.service.IUserDataService;

@Component
@Aspect
public class MyAspect {
	 @Autowired
	 private ISystemLogService logService;
	 @Autowired
	 private IUserDataService userService;
	 
	 public MyAspect() {
		System.out.println("初始化接口日志切面类...");
	}
	
	// 定义切入点  @Pointcut("execution(public * com.xr.service.*.*(..))")  -- 表示对com.xr 包下的所有方法都可添加切入点
    //@Pointcut("execution(public * com.xr.controller.*.*(..))")
    @Pointcut("@annotation(com.xr.configure.MethodLog)")
    public void  methodCachePointcut() {
    	System.out.println("定义切入点");
    }
    
     
    
    // 方法执行的前后调用
 	// @Around("execution(* com.wssys.controller.*(..))||execution(* com.bpm.*.web.account.*.*(..))")
 	// @Around("execution(* com.wssys.controller.*(..))")
 	// @Around("execution(* org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter.handle(..))")
 	@Around("methodCachePointcut()")
 	public Object around2(ProceedingJoinPoint point) throws Throwable {
 		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
 				.getRequestAttributes()).getRequest();
 		String ip = getIpAddr(request);
 		String loginid =request.getParameter("loginid");
 		String username="";
 		String userid="";
 		SystemLog SystemLog = new SystemLog();
 		SystemLog.setNetip(ip);
 		if(loginid==null || "".equals(loginid)){
 			userid="xxxx"; 
 			username = "xxxx";
 		}else if(loginid!=null && !"".equals(loginid) && "administrator".equals(loginid)){
 			userid="administrator"; 
 			username = "超级管理员";
 		}else{
 			userid=loginid;
 			UserData data=userService.selectByPrimaryKeyService(userid);
 			username=data.getUsername();
 		}
 		SystemLog.setUsername(username);
 		SystemLog.setUserid(userid);
 		String targetName = point.getTarget().getClass().getName();//com.xr.controller.UserDataController  
        String monthPath = point.getSignature().getName();  //query {result=com.xr.entity.UserData@788d3fca, reason=查询成功！, flag=true}
        // 调用" +methodName+"方法-开始
        Object[] arguments = point.getArgs();   //获得参数列表{result=com.xr.entity.UserData@788d3fca, reason=查询成功！, flag=true}
        //打印出方法调用时传入的参数，可以在这里通过添加参数的类型，进行一些简易逻辑处理和判断
        if(arguments.length<=0){
            System.out.println("=== "+monthPath+" 方法没有参数");
        }else{
 	       for(int i=0;i<arguments.length;i++){
 	           //System.out.println("==== 参数   "+(i+1)+" : "+arguments[i]);//参数1：admin,参数2：
 	          System.out.println("==== 参数   "+(i+1)+" : ");//参数1：admin,参数2：
 	       }
        }
        Class targetClass = Class.forName(targetName); //class com.xr.controller.UserDataController 
        Method[] method = targetClass.getMethods();  
         
        String name = ""; 
        String remark = ""; 
        for (Method m : method) {  
            if (m.getName().equals(monthPath)) {  
                Class[] tmpCs = m.getParameterTypes();  
                if (tmpCs.length == arguments.length) {  
                    MethodLog methodCache = m.getAnnotation(MethodLog.class);  
                    name = methodCache.methodName(); 
                    remark=methodCache.remark();
                    break;  
                }  
            }  
        }  
 		Object[] method_param = null;

 		Object object;
 		try {
 			method_param = point.getArgs();	//获取方法参数 [admin]
 			//userid=(String) method_param[0];
 			//String param=(String) point.proceed(point.getArgs());
 			object = point.proceed();//{result=com.xr.entity.UserData@788d3fca, reason=查询成功！, flag=true}
 		} catch (Exception e) {
 			// 异常处理记录日志..log.error(e);
 			throw e;
 		}
 		
 		
 		//这里有点纠结 就是不好判断第一个object元素的类型 只好通过  方法描述来 做一一  转型感觉 这里 有点麻烦 可能是我对 aop不太了解  希望懂的高手在回复评论里给予我指点
 		//有没有更好的办法来记录操作参数  因为参数会有 实体类 或者javabean这种参数怎么把它里面的数据都解析出来?
 		SystemLog.setContent(remark+"("+userid+")");
 		SystemLog.setType(name);
 		logService.insertSelectiveService(SystemLog);
 		return object;
 	}
          
    //@Around("controllerInteceptor()")
    //@AfterThrowing(value="controllerAspect()",throwing="e")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        Date start = new Date();
        try {
            //数据库对应的实体
            SystemLog SystemLog = new SystemLog();
            MethodLog SystemLog1 = method.getAnnotation(MethodLog.class);
            if (SystemLog1 != null) {
                //注解上的描述
                SystemLog.setContent(SystemLog1.remark()+SystemLog1.methodName());
                SystemLog.setType(SystemLog1.methodName());
            }
            //请求的方法名
            String clazzName = joinPoint.getTarget().getClass().getName();
            Class<?> clazz = Class.forName(clazzName);
            String clazzSimpleName = clazz.getSimpleName();
            String methodName = signature.getName();
            SystemLog.setContent(clazzSimpleName + "." + methodName);

            //请求的参数
            String[] parameterNames = ((MethodSignature) joinPoint.getSignature()).getParameterNames();
            StringBuilder sb = null;
            if (Objects.nonNull(parameterNames)) {
                sb = new StringBuilder();
                for (int i = 0; i < parameterNames.length; i++) {
                    Object param = joinPoint.getArgs()[i] != null ? joinPoint.getArgs()[i] : "";
                    //if (StringUtils.isNotEmpty(param.toString()) && !"request".equals(parameterNames[i]) && !"response".equals(parameterNames[i])
                           // && !"modelMap".equals(parameterNames[i])) {
                        if (param instanceof Integer) {
                            sb.append(parameterNames[i] + ":" + param + "; ");
                        } else if (param instanceof String) {
                            sb.append(parameterNames[i] + ":" + param + "; ");
                        } else if (param instanceof Double) {
                            sb.append(parameterNames[i] + ":" + param + "; ");
                        } else if (param instanceof Float) {
                            sb.append(parameterNames[i] + ":" + param + "; ");
                        } else if (param instanceof Long) {
                            sb.append(parameterNames[i] + ":" + param + "; ");
                        } else if (param instanceof Boolean) {
                            sb.append(parameterNames[i] + ":" + param + "; ");
                        } else if (param instanceof Date) {
                            sb.append(parameterNames[i] + ":" + param + "; ");
                        } else if (param instanceof Timestamp) {
                            sb.append(parameterNames[i] + ":" + param + "; ");
                        } else {
                            sb.append(parameterNames[i] + ":" + getString(param) + "; ");
                        }
                    //}
                }
            }
            sb = sb == null ? new StringBuilder() : sb;
            SystemLog.setContent(SystemLog.getContent()+sb.toString());
            //设置IP地址
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            SystemLog.setNetip(getIpAddr(request));
           SystemLog.setUsername(this.getDecodeUserName(request));
            SystemLog.setCreatedate(new Date());
            //log.debug("interface request startTime " + start.getTime());
            System.out.println("interface request startTime " + start.getTime());
            Object o = joinPoint.proceed();
           // String response = objmapper.writeValueAsString(o);

            //SystemLog.setTimeMin(System.currentTimeMillis() - start.getTime());
           // log.debug(getString(SystemLog));
            System.out.println(getString(SystemLog));
            //保存系统日志
            //logService.insertSelectiveService(SystemLog);
            return o;
        } catch (Exception ex) {
           // log.error("保存系统日志失败"+ex.getMessage());
            System.out.println("保存系统日志失败"+ex.getMessage());
        }
       return null;
    }
    public static String getDecodeUserName(HttpServletRequest request) {
        String userName = request.getHeader("currentUserName");
        if(org.apache.commons.lang3.StringUtils.isNotEmpty(userName)) {
            try {
                userName = URLDecoder.decode(userName, "utf-8");
            } catch (Exception var3) {
                //UnsupportedEncoding log.error(var3.getMessage(), var3);
                System.out.println(var3.getMessage()+ var3);

            }
        }

        return userName;
    }
    public static String getString(Object o) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        StringBuffer sb = new StringBuffer();
        sb.append("entity[");
        Field[] farr = o.getClass().getDeclaredFields();
        for (Field field : farr) {
            try {
                field.setAccessible(true);
                /*if (!ValidatorUtils.empty(field.get(o))) {
                    sb.append(field.getName());
                    sb.append("=");
                    if (field.get(o) instanceof Date) {
                        // 日期的处理
                        sb.append(sdf.format(field.get(o)));
                    } else {
                        sb.append(field.get(o));
                    }
                    sb.append("|");
                }*/

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        sb.append("]");
        return sb.toString();
    }

    
    /**
     * 环绕通知 用于拦截指定内容，记录用户的操作
     */
    //@Before(value = "aApplogic() && @annotation(annotation) &&args(object,..) ", argNames = "annotation,object")
    public Object interceptorApplogic(ProceedingJoinPoint pj,
            MethodLog annotation, Object object) throws Throwable {
        System.out.println("methodName:" + annotation.methodName());
        System.out.println("remark:" + annotation.remark());
        pj.proceed();
        System.out.println(pj.getSignature().getName());
        for(Object obj : pj.getArgs()){
            System.out.println(obj.toString());
        }
        return object;
    }
	
	
	 /**
     * 环绕通知   拦截指定的切点，这里拦截joinPointForAddOne切入点所指定的addOne()方法
     * 
     */
    //@Before("joinPointForAddOne()")
    public Object interceptorAddOne(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("Aop start");
        String methodRemark = getMthodRemark(joinPoint);
        Object result = null;
        try {  
            // 记录操作日志...谁..在什么时间..做了什么事情..  
            result = joinPoint.proceed();  
        } catch (Exception e) {  
            // 异常处理记录日志..log.error(e);  
            throw e;  
        }  
        System.out.println(methodRemark);
        System.out.println("Aop end");
        return result;
    }
	

    // 获取方法的中文备注____用于记录用户的操作日志描述  
   public static String getMthodRemark(ProceedingJoinPoint joinPoint)  
           throws Exception {  
       String targetName = joinPoint.getTarget().getClass().getName();  
       String methodName = joinPoint.getSignature().getName();  
       System. out.println("====调用" +methodName+"方法-开始！");
       Object[] arguments = joinPoint.getArgs();   //获得参数列表
       System.out.println("打印出方法调用时传入的参数，可以在这里通过添加参数的类型，进行一些简易逻辑处理和判断");
       if(arguments.length<=0){
           System.out.println("=== "+methodName+" 方法没有参数");
       }else{
	       for(int i=0;i<arguments.length;i++){
	           System.out.println("==== 参数   "+(i+1)+" : "+arguments[i]);
	       }
       }
       Class targetClass = Class.forName(targetName);  
       Method[] method = targetClass.getMethods();  
       String methode = "";  
       for (Method m : method) {  
           if (m.getName().equals(methodName)) {  
               Class[] tmpCs = m.getParameterTypes();  
               if (tmpCs.length == arguments.length) {  
                   MethodLog methodCache = m.getAnnotation(MethodLog.class);  
                   methode = methodCache.methodName();  
                   break;  
               }  
           }  
       }  
       return methode;  
   }  

   
  /*
	public Object doSystemLog(ProceedingJoinPoint point) throws Throwable{
		//切入方法的名称
		String methodName=point.getSignature().getName();
		//目标方法不为空
		if(StringUtils.isNotEmpty(methodName)){
			String targetName=point.getTarget().getClass().getName();
			Class targetClass=Class.forName(targetName);
			Method[] methods=targetClass.getMethods();
			for(Method m:methods){
				if(m.getName().equals(methodName)){
					boolean hasAnnotation=m.isAnnotationPresent(MethodLog.class);
					if(hasAnnotation){
						HttpServletRequest request=((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
						//请求参数
						String parame=null;
						StringBuilder builder=new StringBuilder();
						//用户openid
						String userOpenId=request.getParameter("userOpenId")==null?null:request.getParameter("userOpenId").trim();
						String accessToken=request.getParameter("accessToken")==null?null:request.getParameter("accessToken").trim();//用户访问令牌
						String generalAccount=request.getParameter("generalAccount")==null ?null:request.getParameter("generalAccount").trim();//未来社区总账号
						String sellerOpenId=request.getParameter("sellerOpenId")==null?null:request.getParameter("sellerOpenId").trim();//商户唯一编号
						String consumState=request.getParameter("consumState")==null?null:request.getParameter("consumState").trim();//消费状态 0：未消费，1：支付，2：支付超时，订单取消，3：已支付，超时需要退款
						String consumType=request.getParameter("consumType")==null?null:request.getParameter("consumType").trim();//消费类型 0：普通商品，1：服务商品，2：预售商品，3：余额充值
						String money=request.getParameter("money")==null?null:request.getParameter("money").trim();//消费金额
						String orderDetail=request.getParameter("orderDetail")==null?null:request.getParameter("orderDetail").trim();//订单详情
						String orderNum=request.getParameter("orderNum")==null?null:request.getParameter("orderNum").trim();//订单编号
						String playType=request.getParameter("playType")==null?null:request.getParameter("playType").trim();//支付平台类型 0：余额支付，1：微信支付，2：支付宝支付
						String plateType=request.getParameter("plateType")==null?null:request.getParameter("plateType").trim();//平台类型 0：未来社区
						String sign=request.getParameter("sign")==null?null:request.getParameter("sign").trim();//数字签名证书
						//设置支付密码
						String password=request.getParameter("password")==null?null:request.getParameter("password").trim();//支付密码
						String optionType=request.getParameter("optionType")==null?null:request.getParameter("optionType").trim();//支付密码动作
						if(userOpenId!=null){
							builder.append(";参数userOpenId:"+userOpenId);
						}
						if(accessToken!=null){
							builder.append(";参数accessToken:"+accessToken);
						}
						if(generalAccount!=null){
							builder.append(";参数generalAccount:"+generalAccount);
						}
						if(sellerOpenId!=null){
							builder.append(";参数sellerOpenId:"+sellerOpenId);
						}
						if(consumState!=null){
							builder.append(";参数consumState:"+consumState);
						}
						if(consumType!=null){
							builder.append(";参数consumType:"+consumType);
						}
						if(money!=null){
							builder.append(";参数money:"+money);
						}
						if(orderDetail!=null){
							builder.append(";参数orderDetail:"+orderDetail);
						}
						if(orderNum!=null){
							builder.append(";参数orderNum:"+orderNum);
						}
						if(playType!=null){
							builder.append(";参数playType:"+playType);
						}
						if(sign!=null){
							builder.append(";参数sign:"+sign);
						}
						if(password!=null){
							builder.append(";参数password:"+password);
						}
						if(optionType!=null){
							builder.append(";参数optionType:"+optionType);
						}
						 
						parame=builder.toString();
						MethodLog annotation=m.getAnnotation(MethodLog.class);
						//方法描述
						String methodDescp=annotation.remark();
						//用户名称
						String name=annotation.methodName();
						//用户IP地址
						String ip="192.168.1.120";//getIpAddr(request)==null ?null :getIpAddr(request).trim();
						SystemLog log=new SystemLog();
						//log.setOperatorname(userOpenId);
						log.setUsername("adminddd");
						log.setType(methodDescp);
						log.setNetip(ip);
						log.setContent(name+","+methodDescp);
						//SystemLogServiceImpl accountSystemLogService =(SystemLogServiceImpl) SpringContextUtil.getBean("SystemLogServiceImpl") ;
						//accountSystemLogService.insertSelectiveService(log);
						logService.insertSelectiveService(log);
					}
				}
			}
		}
		return point.proceed();
	}
	
	*/
	//返回IP地址
		public String getIpAddr(HttpServletRequest request) {
			String ip=request.getHeader("x-forwarded-for ");
			if(ip==null || ip.length()==0 || " unknown ".equalsIgnoreCase(ip)){
				ip=request.getHeader(" Proxy-Client-IP ");
			}
			if(ip==null || ip.length()==0 || " unknown ".equalsIgnoreCase(ip)){
				ip=request.getHeader("WL-Proxy-Client-IP");
			}
			
			if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	            ip = request.getRemoteAddr();  
	            if(ip.equals("127.0.0.1") || ip.equals("0:0:0:0:0:0:0:1")){  
	                //根据网卡取本机配置的IP  
	                InetAddress inet=null;  
	                try {  
	                    inet = InetAddress.getLocalHost();  
	                } catch (Exception e) {  
	                    e.printStackTrace();  
	                }  
	                ip= inet.getHostAddress();  
	            }  
	        }  
			
			 //对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割  
	        if(ip!=null && ip.length()>15){ //"***.***.***.***".length() = 15  
	            if(ip.indexOf(",")>0){  
	                ip = ip.substring(0,ip.indexOf(","));  
	            }  
	        } 
			return ip;
		}
	
}
