package com.xr.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class ParamFilter implements HandlerInterceptor{
	
	public void afterCompletion(HttpServletRequest httpRequest,
            HttpServletResponse httpResponse, Object arg2, Exception arg3)
            throws Exception {
    }

    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
            Object arg2, ModelAndView arg3) throws Exception {

    }

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,Object object) {
    	try{
    		//获取请求的RUi:去除http:localhost:8080这部分剩下的
            String uri = request.getRequestURI();
            //UTL:除了login.jsp是可以公开访问的，其他的URL都进行拦截控制
            if (uri.indexOf("/login/login") >= 0
            		||uri.indexOf("/ureport/designer")>0
            		|| uri.indexOf("/appHttp") >= 0) {
                return true;
            }
            
            if(uri.indexOf(".") >= 0 && !uri.endsWith(".html")) {
            	return true;
            }
            //获取session
            HttpSession session = request.getSession();
            if(session.getAttribute("thisUserID") != null 
            		&& !session.getAttribute("thisUserID").toString().equals("")) {
            	return true;
            }
            //不符合条件的给出提示信息，并转发到登录页面
            request.setAttribute("msg","无权限请先登录");
            // 获取request返回页面到登录页
            response.sendRedirect("/EducationManager/index.html");
            return false;
    	}catch(Exception e){
    		return false;
    	}
    	
    }
}
