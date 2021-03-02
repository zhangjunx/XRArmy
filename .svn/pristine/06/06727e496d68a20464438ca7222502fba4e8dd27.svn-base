package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.ChannelData;

@Service
public interface IChannelDataService {

	int insertSelectiveService(ChannelData record);

	int updateByPrimaryKeySelectiveService(ChannelData record);

	ChannelData selectByPrimaryKeyService(Integer channelno);

	int deleteByPrimaryKeyService(Integer channelno);

	List<Map<String, Object>> getListService(Map<String, Object> m);

	int getListCountService(Map m);

	Integer getNextidService();

	List<Map<String, Object>> getTreeService(Map m);

}
