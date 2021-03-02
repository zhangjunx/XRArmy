package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.DeviceUnit;

@Service
public interface IDeviceUnitService {

	int insertSelectiveService(DeviceUnit record);

	int updateByPrimaryKeySelectiveService(DeviceUnit record);

	DeviceUnit selectByPrimaryKeyService(Integer deviceno);

	int deleteByPrimaryKeyService(Integer deviceno);

	List<Map<String, Object>> getListService(Map m);

	int getListCountService(Map m);

	Integer getNextidService();

}
