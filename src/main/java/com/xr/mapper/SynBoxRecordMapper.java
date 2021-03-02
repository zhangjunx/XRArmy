package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.SynBoxRecord;

public interface SynBoxRecordMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SynBoxRecord record);

    int insertSelective(SynBoxRecord record);

    SynBoxRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SynBoxRecord record);

    int updateByPrimaryKey(SynBoxRecord record);

	List<Map<String, Object>> getList(Map m);
	int getListCount(Map m);
	
	List<Map<String, Object>> getHolder(Map m);

	List<Map<String, Object>> getSynHolder(Map m);
	int getSynHolderCount(Map m);

	List<Map<String, Object>> getSynBlack(Map m);
	int getSynBlackCount(Map m);

	List<Map<String, Object>> getBlack(Map m);
}