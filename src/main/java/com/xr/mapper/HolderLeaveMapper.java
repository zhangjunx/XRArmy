package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.HolderLeave;

public interface HolderLeaveMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(HolderLeave record);

    int insertSelective(HolderLeave record);

    HolderLeave selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(HolderLeave record);

    int updateByPrimaryKey(HolderLeave record);

	int getListCount(Map m);
	List<Map<String, Object>> getList(Map m);

	int getUnauditedCount(Map m);
	List<Map<String, Object>> getUnaudited(Map m);
}