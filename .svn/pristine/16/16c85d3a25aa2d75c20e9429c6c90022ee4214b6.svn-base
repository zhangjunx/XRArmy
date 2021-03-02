package com.xr.configure;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.LocalVariableTableParameterNameDiscoverer;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.alibaba.fastjson.JSON;
import com.xr.service.ISystemLogService;
import com.xr.tools.IpUtils;
import com.xr.tools.JsonUtils;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
 
/**
 * Title: SystemControllerLog
 * @date 2018年8月31日
 * @version V1.0
 * Description: 切点类
 */
//@Aspect
//@Component
//@SuppressWarnings("all")
public class SystemLogAspect {
    //注入Service用于把日志保存数据库，实际项目入库采用队列做异步
    @Resource
    private ISystemLogService service;
    
    //本地异常日志记录对象
    private static final Logger logger = LoggerFactory.getLogger(SystemLogAspect.class);
    
    //Controller层切点
    @Pointcut("@annotation(com.xr.configure.SysOptLog)")
    public void controllerAspect(){
    }
 
    /**
     * @Description  前置通知  用于拦截Controller层记录用户的操作
     * @date 2018年9月3日 10:38
     */
    @After("controllerAspect()&amp;&amp;@annotation(SysOptLog)")
    public void doBefore(JoinPoint joinPoint){
    	// 请求的方法参数值
    	MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        Object[] args = joinPoint.getArgs();
        
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        HttpSession session = request.getSession();
 
        String ip = IpUtils.getIpAddr(request);
 
        try {
            //*========控制台输出=========*//
           /* System.out.println("==============前置通知开始==============");
            System.out.println("请求方法：" + (joinPoint.getTarget().getClass().getName() + "." + joinPoint.getSignature().getName()));
            System.out.println("方法描述：" + getControllerMethodDescription(joinPoint));
            System.out.println("请求人："+session.getAttribute("thisUserName"));
            System.out.println("请求ip："+ip);*/
 
            //*========数据库日志=========*//
            Map<String,Object> action = new HashMap<String, Object>();
            action.put("operateFunc", (joinPoint.getTarget().getClass().getName() + "." + joinPoint.getSignature().getName()));
            action.put("description", getControllerMethodDescription(joinPoint));
            action.put("IP", ip);
            action.put("operator", session.getAttribute("thisUserID"));
            action.put("CURD", getMethodCURD(joinPoint));
            action.put("userType", "teacher");
            action.put("operateDevice", "pc");
            LocalVariableTableParameterNameDiscoverer u = new LocalVariableTableParameterNameDiscoverer();
            String[] paramNames = u.getParameterNames(method);
            if (args != null && paramNames != null) {
                String params = "";
                for (int i = 0; i < args.length; i++) {
                    params += "  " + paramNames[i] + ": " + args[i];
                }
                action.put("parm", params);
            }
            //service.addOperateLog(action);
        }catch (Exception e){
            //记录本地异常日志
            logger.error("==前置通知异常==");
            logger.error("异常信息：{}",e.getMessage());
        }
    }
 
    /**
     * @Description  获取注解中对方法的描述信息 用于Controller层注解
     * @date 2018年9月3日 上午12:01
     */
    public static String getControllerMethodDescription(JoinPoint joinPoint) throws Exception {
        String targetName = joinPoint.getTarget().getClass().getName();
        String methodName = joinPoint.getSignature().getName();//目标方法名
        Object[] arguments = joinPoint.getArgs();
        Class targetClass = Class.forName(targetName);
        Method[] methods = targetClass.getMethods();
        String description = "";
        for (Method method:methods) {
            if (method.getName().equals(methodName)){
                Class[] clazzs = method.getParameterTypes();
                if (clazzs.length==arguments.length){
                    description = method.getAnnotation(SysOptLog.class).description();
                    break;
                }
            }
        }
        return description;
    }
    
    public static String getMethodCURD(JoinPoint joinPoint) throws Exception {
        String targetName = joinPoint.getTarget().getClass().getName();
        String methodName = joinPoint.getSignature().getName();//目标方法名
        Object[] arguments = joinPoint.getArgs();
        Class targetClass = Class.forName(targetName);
        Method[] methods = targetClass.getMethods();
        String curd = "";
        for (Method method:methods) {
            if (method.getName().equals(methodName)){
                Class[] clazzs = method.getParameterTypes();
                if (clazzs.length==arguments.length){
                	curd = method.getAnnotation(SysOptLog.class).optCURD();
                    break;
                }
            }
        }
        return curd;
    }
}
