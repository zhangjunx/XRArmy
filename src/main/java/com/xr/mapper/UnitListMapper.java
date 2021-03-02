package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.UnitList;

public interface UnitListMapper {
    int deleteByPrimaryKey(String unitno);

    int insert(UnitList record);

    int insertSelective(UnitList record);

    UnitList selectByPrimaryKey(String unitno);

    int updateByPrimaryKeySelective(UnitList record);

    int updateByPrimaryKey(UnitList record);

	List<Map<String, Object>> getTree(Map m);

	String getNextUnitno(Map m);

	List<Map<String, Object>> getList(Map m);

	List<Map<String, Object>> getExist(Map m);

	int insertExcel(List<Map<String, Object>> list);
}