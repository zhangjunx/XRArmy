package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.BlackCar;

public interface BlackCarMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(BlackCar record);

    int insertSelective(BlackCar record);

    BlackCar selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BlackCar record);

    int updateByPrimaryKeyWithBLOBs(BlackCar record);

    int updateByPrimaryKey(BlackCar record);
    
    List<Map<String, Object>> getList(Map m);
	int getListCount(Map m);
	int addExcel(List<Map<String, Object>> list);

	Integer getNextid();

	
}