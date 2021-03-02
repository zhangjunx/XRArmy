package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.HolderData;

public interface HolderDataMapper {
    int deleteByPrimaryKey(String holderno);

    int insert(HolderData record);

    int insertSelective(HolderData record);

    HolderData selectByPrimaryKey(String holderno);

    int updateByPrimaryKeySelective(HolderData record);

    int updateByPrimaryKeyWithBLOBs(HolderData record);

    int updateByPrimaryKey(HolderData record);

	List<Map<String, Object>> getList(Map m);

	int addExcel(List<Map<String, Object>> list);

	int getListCount(Map m);
}