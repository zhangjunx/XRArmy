package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.ACL_Menu;

public interface ACL_MenuMapper {
    int deleteByPrimaryKey(String id);

    int insert(ACL_Menu record);

    int insertSelective(ACL_Menu record);

    ACL_Menu selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(ACL_Menu record);

    int updateByPrimaryKeyWithBLOBs(ACL_Menu record);

    int updateByPrimaryKey(ACL_Menu record);

	List<Map<String, Object>> getList(Map m);

	List<Map<String, Object>> getTree(Map m);

	String getNextid(Map m);//获取下一个菜单id

}