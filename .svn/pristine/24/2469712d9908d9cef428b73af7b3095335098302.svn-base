package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.AccessRecord;

@Service
public interface IAccessRecordService {
	int deleteByPrimaryKeyService(Integer id);
	AccessRecord selectByPrimaryKeyService(Integer id);
	int insertSelectiveService(AccessRecord record);
	int updateByPrimaryKeySelectiveService(AccessRecord record);
	 
	List<Map<String, Object>> getListService(Map m);
	int getListCountService(Map m);
	int addService(List<Map<String, Object>> list);
	Integer getNextidService();
	List<Map<String, Object>> getHolderService(Map m);
 
}
