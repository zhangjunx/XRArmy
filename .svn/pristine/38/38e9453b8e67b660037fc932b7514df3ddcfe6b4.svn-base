package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.DictData;

public interface DictDataMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(DictData record);

    int insertSelective(DictData record);

    DictData selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(DictData record);

    int updateByPrimaryKey(DictData record);

	List<Map<String, Object>> getList(Map m);
	int getListCount(Map m);

	int addExcel(List<Map<String, Object>> list);
	List<Map<String, Object>> getItemList(Map m);
	
}