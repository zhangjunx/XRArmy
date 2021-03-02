package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.MonitorDotDevice;

public interface MonitorDotDeviceMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(MonitorDotDevice record);

    int insertSelective(MonitorDotDevice record);

    MonitorDotDevice selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MonitorDotDevice record);

    int updateByPrimaryKey(MonitorDotDevice record);

	List<Map<String, Object>> getList(Map m);

	int getListCount(Map m);

	int add(List<Map<String, Object>> list);

	List<Map<String, Object>> getDevList(Map m);

	int getDevListCount(Map m);
}