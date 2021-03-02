package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.AccessRecord;

public interface AccessRecordMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(AccessRecord record);

    int insertSelective(AccessRecord record);

    AccessRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AccessRecord record);

    int updateByPrimaryKey(AccessRecord record);

	List<Map<String, Object>> getList(Map m);

	int getListCount(Map m);

	int add(List<Map<String, Object>> list);

	Integer getNextid();

	List<Map<String, Object>> getHolder(Map m);
}