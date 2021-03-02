package com.xr.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.xr.mapper.UnitListMapper;
import com.xr.mapper.UserDataMapper;
import com.xr.entry.PageInfo;
import com.xr.entry.UserData;
import com.xr.entry.UnitList;
import com.xr.service.IUnitListService;
import com.xr.tools.TreeToolUtils;
@Service
public class UnitListServiceImpl implements IUnitListService {

	@Autowired
	private UnitListMapper am;
	@Autowired
	private UserDataMapper udm;

	@Override
	public int insertSelectiveService(UnitList record) {
		// 新增
		return am.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveService(UnitList record) {
		//更新
		return am.updateByPrimaryKeySelective(record);
	}

	@Override
	public UnitList selectByPrimaryKeyService(String unitno) {
		// 查询
		return am.selectByPrimaryKey(unitno);
	}

	@Override
	public int deleteByPrimaryKeyService(String unitno) {
		// 删除
		return am.deleteByPrimaryKey(unitno);
	}
	
	@Override
	public List<Map<String, Object>> getTreeService(Map m) {
	    //  查询区域楼层树
		List<Map<String, Object>> list=am.getTree(m);
		List<Map<String, Object>> treeList=new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> result=new ArrayList<Map<String, Object>>();
		TreeToolUtils tree=new TreeToolUtils();
		String loginid=String.valueOf(m.get("loginid"));
		if(loginid==null || "".equals(loginid) ||"null".equals(loginid) ){
			treeList=tree.menuList(list, true);
		}else{
			UserData ud=udm.selectByPrimaryKey(loginid);
			for(int i=0;i<list.size();i++){
				Map<String,Object> m1=list.get(i);
				String id=String.valueOf(m1.get("id"));
				if(id.equals(ud.getUnitno())){
					m1.put("parent", "");
				}
				result.add(m1);
			}
			treeList=tree.menuList(result, true);
		}
		return treeList;	
	}

	@Override
	public List<Map<String, Object>> getListService(Map m) {
		//查询列表
		return am.getList(m);
	}

	@Override
	public String getNextUnitnoService(Map m) {
		// 获取下一个机构编号
		return am.getNextUnitno(m);
	}

	@Override
	public int insertExcel(List<Map<String, Object>> list) {
		// 批量添加
		return am.insertExcel(list);
		
	}

	@Override
	public List<Map<String, Object>> getExistService(Map m) {
		//删除机构时 判断是否有绑定小区存在
		return am.getExist(m);
	}
	
	
	
}
