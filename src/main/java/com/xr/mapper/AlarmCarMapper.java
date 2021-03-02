package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.AlarmCar;

public interface AlarmCarMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(AlarmCar record);

    int insertSelective(AlarmCar record);

    AlarmCar selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(AlarmCar record);

    int updateByPrimaryKeyWithBLOBs(AlarmCar record);

    int updateByPrimaryKey(AlarmCar record);

	List<Map<String, Object>> getList(Map m);

	int getListCount(Map m);

}