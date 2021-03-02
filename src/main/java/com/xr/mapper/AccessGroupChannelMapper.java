package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.AccessGroupChannel;

public interface AccessGroupChannelMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(AccessGroupChannel record);

    int insertSelective(AccessGroupChannel record);

    AccessGroupChannel selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AccessGroupChannel record);

    int updateByPrimaryKey(AccessGroupChannel record);

	int getListCount(Map m);
	List<Map<String, Object>> getList(Map m);

	int add(List<Map<String, Object>> list);
}