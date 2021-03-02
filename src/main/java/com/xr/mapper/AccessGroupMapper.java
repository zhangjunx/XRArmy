package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.AccessGroup;

public interface AccessGroupMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(AccessGroup record);

    int insertSelective(AccessGroup record);

    AccessGroup selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AccessGroup record);

    int updateByPrimaryKey(AccessGroup record);

	List<Map<String, Object>> getList(Map m);

	int getListCount(Map m);
}