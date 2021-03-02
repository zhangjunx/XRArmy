package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.ACL_Role_Menu;

public interface ACL_Role_MenuMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ACL_Role_Menu record);

    int insertSelective(ACL_Role_Menu record);

    ACL_Role_Menu selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ACL_Role_Menu record);

    int updateByPrimaryKey(ACL_Role_Menu record);

	List<Map<String, Object>> getList(Map m);

	int addBatch(List<Map<String, Object>> list);

	List<Map<String, Object>> getTree(Map m);

	List<Map<String, Object>> getMyPerm(Map m);

}