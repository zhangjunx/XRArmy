package com.xr.tools;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class TreeToolUtils {
	public static Map<String,Object> mapArray = new LinkedHashMap<String, Object>(); 
	public List<Map<String,Object>> menuCommon; 
	public List<Map<String, Object>> list = new ArrayList<Map<String, Object>>(); 
	
	/**
	 * menu中包含parent，id，title字段
	 * b：是否默认展开
	 * @param menu
	 * @param b
	 * @return
	 */
	public List<Map<String, Object>> menuList(List<Map<String,Object>> menu,boolean b){   
	    this.menuCommon = menu; 
	    for (Map<String,Object> x : menu) {   
	      Map<String,Object> mapArr = new LinkedHashMap<String, Object>(); 
	      if(x.get("parent").toString().equals("0") || x.get("parent") == null || x.get("parent").equals("")){ 
	        mapArr.put("id", x.get("id")); 
	        mapArr.put("title", x.get("title"));  
	        mapArr.put("parent", x.get("parent"));  
	        for (String key : x.keySet()) {
	        	if(!x.get(key).equals("id") && !x.get(key).equals("title") 
	        			&& !x.get(key).equals("parent") && !x.get(key).equals("children")){
	        		mapArr.put(key, x.get(key));
	        	}
	        }
	        mapArr.put("children", menuChild(x.get("id").toString().trim(),true));  
	        if(b){
	        	mapArr.put("spread", true);
	        }
	        list.add(mapArr); 
	      } 
	    }   
	    return list; 
	} 
	   
	public List<Map<String, Object>> menuChild(String id,boolean b){ 
	    List<Map<String, Object>> lists = new ArrayList<Map<String, Object>>(); 
	    for(Map<String,Object> a:menuCommon){ 
	      Map<String,Object> childArray = new LinkedHashMap<String, Object>(); 
	      String thisId = a.get("parent").toString();
	      if(thisId.equals(id)){ 
	        childArray.put("id", a.get("id")); 
	        childArray.put("title", a.get("title")); 
	        childArray.put("parent", a.get("parent")); 
	        for (String key : a.keySet()) {
	        	if(!a.get(key).equals("id") && !a.get(key).equals("title") 
	        			&& !a.get(key).equals("parent") && !a.get(key).equals("children")){
	        		childArray.put(key, a.get(key));
	        	}
	        }
	        childArray.put("children", menuChild(a.get("id").toString().trim(),true));
	        if(b){
	        	childArray.put("spread", true);
	        }
	        lists.add(childArray); 
	      } 
	    } 
	    return lists; 
	} 
}
