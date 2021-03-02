package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.DeviceUnit;

public interface DeviceUnitMapper {
    int deleteByPrimaryKey(Integer deviceno);

    int insert(DeviceUnit record);

    int insertSelective(DeviceUnit record);

    DeviceUnit selectByPrimaryKey(Integer deviceno);

    int updateByPrimaryKeySelective(DeviceUnit record);

    int updateByPrimaryKey(DeviceUnit record);

	List<Map<String, Object>> getList(Map m);

	int getListCount(Map m);

	Integer getNextid();
}