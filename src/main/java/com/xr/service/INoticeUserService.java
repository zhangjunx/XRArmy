package com.xr.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.xr.entry.NoticeUser;

@Service
public interface INoticeUserService {

	int insertSelectiveService(NoticeUser record);

	int deleteByPrimaryKeyService(Integer id);
	
	int updateByPrimaryKeySelectiveService(NoticeUser record);

	List<Map<String, Object>> getListService(Map m);

	int getListCountService(Map m);

	 

}
