package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.HolderData;

@Service
public interface IHolderDataService {
	 int deleteByPrimaryKeyService(String holderno);

	 int insertSelectiveService(HolderData record);

	 HolderData selectByPrimaryKeyService(String holderno);

	 int updateByPrimaryKeySelectiveService(HolderData record);



	List<Map<String, Object>> getListService(Map m);

	int addExcel(List<Map<String, Object>> list);

	int getListCountService(Map m);

}
