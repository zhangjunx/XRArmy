package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.DeviceChannel;

public interface DeviceChannelMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(DeviceChannel record);

    int insertSelective(DeviceChannel record);

    DeviceChannel selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DeviceChannel record);

    int updateByPrimaryKey(DeviceChannel record);

	int getChannelListCount(Map m);

	List<Map<String, Object>> getChannelList(Map m);

	int getListCount(Map m);

	List<Map<String, Object>> getList(Map m);

	List<Map<String, Object>> getDevList(Map m);

	int getDevListCount(Map m);

	int add(List<Map<String, Object>> list);
}