package com.xr.mapper;

import java.util.List;
import java.util.Map;

import com.xr.entry.VisitorsReasonType;

public interface VisitorsReasonTypeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(VisitorsReasonType record);

    int insertSelective(VisitorsReasonType record);

    VisitorsReasonType selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(VisitorsReasonType record);

    int updateByPrimaryKey(VisitorsReasonType record);

	List<Map<String, Object>> getList(Map<String, Object> m);

	int getListCount(Map m);
}