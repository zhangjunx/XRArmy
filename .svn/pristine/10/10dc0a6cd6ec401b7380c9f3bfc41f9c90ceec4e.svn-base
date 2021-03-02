package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.ChannelData;

public interface ChannelDataMapper {
    int deleteByPrimaryKey(Integer channelno);

    int insert(ChannelData record);

    int insertSelective(ChannelData record);

    ChannelData selectByPrimaryKey(Integer channelno);

    int updateByPrimaryKeySelective(ChannelData record);

    int updateByPrimaryKey(ChannelData record);

	List<Map<String, Object>> getList(Map m);

	int getListCount(Map m);

	Integer getNextid();

	List<Map<String, Object>> getTree(Map m);
}