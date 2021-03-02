package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.IssueRecord;

public interface IssueRecordMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(IssueRecord record);

    int insertSelective(IssueRecord record);

    IssueRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(IssueRecord record);

    int updateByPrimaryKey(IssueRecord record);

	List<Map<String, Object>> getList(Map m);
	int getListCount(Map m);
 
	
	List<Map<String, Object>> getHolder(Map m);
	List<Map<String, Object>> getLeave(Map m);
	List<Map<String, Object>> getVisit(Map m);

	List<Map<String, Object>> getSynHolder(Map m);
	int getSynHolderCount(Map m);
	
	List<Map<String, Object>> getSynLeave(Map m);
	int getSynLeaveCount(Map m);

	List<Map<String, Object>> getSynVisit(Map m);
	int getSynVisitCount(Map m);
	
	List<Map<String, Object>> getGroupDev(Map m);

	int add(List<Map<String, Object>> list);
}