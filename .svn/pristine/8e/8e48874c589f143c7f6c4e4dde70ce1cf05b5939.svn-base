package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.AreaList;

public interface AreaListMapper {
    int deleteByPrimaryKey(String areaid);

    int insert(AreaList record);

    int insertSelective(AreaList record);

    AreaList selectByPrimaryKey(String areaid);

    int updateByPrimaryKeySelective(AreaList record);

    int updateByPrimaryKey(AreaList record);

	List<Map<String, Object>> getTree(Map m);

	List<Map<String, Object>> getList(Map m);
	
	int addExcel(List<Map<String, Object>> list);
	String getNextid(Map m);

}