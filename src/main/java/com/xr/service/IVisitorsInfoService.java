package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.VisitorsInfo;

@Service
public interface IVisitorsInfoService {

	int insertSelectiveService(VisitorsInfo record);

	int updateByPrimaryKeySelectiveService(VisitorsInfo record);

	VisitorsInfo selectByPrimaryKeyService(Integer id);

	int deleteByPrimaryKeyService(Integer id);

	List<Map<String, Object>> getListService(Map m);

	int getListCountService(Map m);

}
