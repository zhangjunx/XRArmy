package com.xr.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xr.mapper.ChannelDataMapper;
import com.xr.entry.ChannelData;
import com.xr.service.IChannelDataService;
import com.xr.tools.TreeToolUtils;
@Service
public class ChannelDataServiceImpl implements IChannelDataService {

	@Autowired
	private ChannelDataMapper dm;

	@Override
	public int insertSelectiveService(ChannelData record) {
		// 新增
		return dm.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(ChannelData record) {
		// 修改
		return dm.updateByPrimaryKeySelective(record);
	}

	@Override
	public ChannelData selectByPrimaryKeyService(Integer channelno) {
		// 查询
		return dm.selectByPrimaryKey(channelno);
	}

	@Override
	public int deleteByPrimaryKeyService(Integer channelno) {
		// 删除
		return dm.deleteByPrimaryKey(channelno);
	}

	@Override
	public List<Map<String, Object>> getListService(Map m) {
		//查询列表
		return dm.getList(m);
	}
	 
	@Override
	public int getListCountService(Map m) {
		return dm.getListCount(m);
	}

	@Override
	public Integer getNextidService() {
		// 
		return dm.getNextid();
	}

	@Override
	public List<Map<String, Object>> getTreeService(Map m) {
		List<Map<String, Object>> list=dm.getTree(m);
		/*if(list!=null && list.size()>0){
			int t=String.valueOf(list.get(0).get("parent")).length();
			for(int k=0;k<list.size();k++){
				String parent=String.valueOf(list.get(k).get("parent"));
				if(parent==null || "".equals(parent) || "null".equals(parent)){
					t=0;
					continue;
				}else{
					int len=parent.length();
					if(t>len){
						len=t;
					}
				}
			}
			
			if(t>0){
				for(int i=0;i<list.size();i++){
					Map<String, Object> m1=list.get(i);
					String id=String.valueOf(m1.get("id"));
				}
			}
			
		}*/
		
		
		List<Map<String, Object>> treelist=new ArrayList<Map<String, Object>>();
		TreeToolUtils tree=new TreeToolUtils();
		treelist=tree.menuList(list, true);
		return treelist;
	}
	
	
}
