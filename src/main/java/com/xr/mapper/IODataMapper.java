package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.IOData;

public interface IODataMapper {
    int deleteByPrimaryKey(Integer datano);

    int insert(IOData record);

    int insertSelective(IOData record);

    IOData selectByPrimaryKey(Integer datano);

    int updateByPrimaryKeySelective(IOData record);

    int updateByPrimaryKeyWithBLOBs(IOData record);

    int updateByPrimaryKey(IOData record);

	List<Map<String, Object>> getList(Map m);

	int getListCount(Map m);
}