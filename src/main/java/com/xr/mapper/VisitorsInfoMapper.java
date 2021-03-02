package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.VisitorsInfo;

public interface VisitorsInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(VisitorsInfo record);

    int insertSelective(VisitorsInfo record);

    VisitorsInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(VisitorsInfo record);

    int updateByPrimaryKeyWithBLOBs(VisitorsInfo record);

    int updateByPrimaryKey(VisitorsInfo record);

	List<Map<String, Object>> getList(Map m);

	int getListCount(Map m);
}