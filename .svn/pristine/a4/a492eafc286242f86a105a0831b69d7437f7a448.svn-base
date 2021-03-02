package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.DevicePlat;

public interface DevicePlatMapper {
    int deleteByPrimaryKey(Integer deviceno);

    int insert(DevicePlat record);

    int insertSelective(DevicePlat record);

    DevicePlat selectByPrimaryKey(Integer deviceno);

    int updateByPrimaryKeySelective(DevicePlat record);

    int updateByPrimaryKey(DevicePlat record);

	List<Map<String, Object>> getList(Map m);

	int getListCount(Map m);

	Integer getNextid();

	int add(List<Map<String, Object>> list);
}