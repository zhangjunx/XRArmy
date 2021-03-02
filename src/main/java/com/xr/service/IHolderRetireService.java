package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.HolderRetire;

@Service
public interface IHolderRetireService {
	int deleteByPrimaryKeyService(Integer id);

    int insertSelectiveService(HolderRetire record);

    HolderRetire selectByPrimaryKeyService(Integer id);

    int updateByPrimaryKeySelectiveService(HolderRetire record);


	List<Map<String, Object>> getListService(Map m);
	int getListCountService(Map m);

	int addService(Map m);//人事退伍接口


}
