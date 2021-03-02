package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.BoxData;

@Service
public interface IBoxDataService {

	int insertSelectiveService(BoxData record);

	int updateByPrimaryKeySelectiveService(BoxData record);

	BoxData selectByPrimaryKeyService(Integer id);

	int deleteByPrimaryKeyService(Integer id);

	List<Map<String, Object>> getListService(Map m);

	int getListCountService(Map m);

	 

}
