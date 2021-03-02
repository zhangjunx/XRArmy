package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.AccessGroupHolder;

public interface AccessGroupHolderMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(AccessGroupHolder record);

    int insertSelective(AccessGroupHolder record);

    AccessGroupHolder selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AccessGroupHolder record);

    int updateByPrimaryKey(AccessGroupHolder record);

	List<Map<String, Object>> getList(Map m);

	int getListCount(Map m);

	int add(List<Map<String, Object>> list);

	List<Map<String, Object>> getGroupList(Map m);
	int getGroupListCount(Map m);

	List<Map<String, Object>> getListByGroup(Map m);

	int getListByGroupCount(Map m);
}