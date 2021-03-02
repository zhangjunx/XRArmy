package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.IssueRecord;

@Service
public interface IIssueRecordService {

	int insertSelectiveService(IssueRecord record);

	int updateByPrimaryKeySelectiveService(IssueRecord record);

	IssueRecord selectByPrimaryKeyService(Integer id);

	int deleteByPrimaryKeyService(Integer id);

	List<Map<String, Object>> getListService(Map m);
	int getListCountService(Map m);

	List<Map<String, Object>> getHolderService(Map m);
	List<Map<String, Object>> getLeaveService(Map m);
	List<Map<String, Object>> getVisitService(Map m);

	List<Map<String, Object>> getSynHolderService(Map m);
	int getSynHolderCountService(Map m);
	
	List<Map<String, Object>> getSynLeaveService(Map m);
	int getSynLeaveCountService(Map m);

	List<Map<String, Object>> getSynVisitService(Map m);
	int getSynVisitCountService(Map m);

	List<Map<String, Object>> getGroupDevService(Map m);

	int addService(List<Map<String, Object>> list);

	 

}
