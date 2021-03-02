package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.PageInfo;
import com.xr.entry.SystemLog;

@Service
public interface ISystemLogService {

	int insertSelectiveService(SystemLog record);

	int deleteByPrimaryKeyService(Integer id);

	List<Map<String, Object>> getListService(Map<String, Object> m);

	int getListCountService(Map<String, Object> m);

}
