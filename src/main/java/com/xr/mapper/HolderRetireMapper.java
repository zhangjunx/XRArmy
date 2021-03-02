package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.HolderRetire;

public interface HolderRetireMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(HolderRetire record);

    int insertSelective(HolderRetire record);

    HolderRetire selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(HolderRetire record);

    int updateByPrimaryKey(HolderRetire record);

	List<Map<String, Object>> getList(Map m);

	int getListCount(Map m);

	int add(Map m);
}