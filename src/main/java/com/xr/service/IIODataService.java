package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface IIODataService {

	List<Map<String, Object>> getListService(Map m);

	int getListCountService(Map m);


}
