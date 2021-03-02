package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.BlackPeople;

public interface BlackPeopleMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(BlackPeople record);

    int insertSelective(BlackPeople record);

    BlackPeople selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BlackPeople record);

    int updateByPrimaryKeyWithBLOBs(BlackPeople record);

    int updateByPrimaryKey(BlackPeople record);

	List<Map<String, Object>> getList(Map m);

	int getListCount(Map m);

	int addExcel(List<Map<String, Object>> list);

	Integer getNextid();
}