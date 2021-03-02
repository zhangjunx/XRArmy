package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.SynBoxRecord;

@Service
public interface ISynBoxRecordService {

	int insertSelectiveService(SynBoxRecord record);

	int updateByPrimaryKeySelectiveService(SynBoxRecord record);

	SynBoxRecord selectByPrimaryKeyService(Integer id);

	int deleteByPrimaryKeyService(Integer id);

	List<Map<String, Object>> getListService(Map m);

	int getListCountService(Map m);

	List<Map<String, Object>> getHolderService(Map m);

	List<Map<String, Object>> getSynHolderService(Map m);

	int getSynHolderCountService(Map m);

	List<Map<String, Object>> getSynBlackService(Map m);
	int getSynBlackCountService(Map m);

	List<Map<String, Object>> getBlackService(Map m);

	 

}
