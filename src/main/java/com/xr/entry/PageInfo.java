package com.xr.entry;


public class PageInfo {
	private int pageIndex=1;//当前页
	private int pageSize=20;//每页显示数
	private int totalPage;//总页数
	private int maxCount;//最大条数
	private int minCount;//最小条数
	private int sumCount;
	
	public PageInfo() {
		super();
	}
	
	public PageInfo(int pageIndex, int pageSize) {
		super();
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
	}

	public PageInfo(int pageIndex, int pageSize, int totalPage, int maxCount, int minCount) {
		super();
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
		this.totalPage = totalPage;
		this.maxCount = maxCount;
		this.minCount = minCount;
	}
	public int getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public int getMaxCount() {//最大条目数
		maxCount=pageIndex*pageSize;
		return maxCount;
	}
	public void setMaxCount(int maxCount) {
		this.maxCount = maxCount;
	}
	public int getMinCount() {//最小条目数
		minCount=(pageIndex-1)*pageSize;
		return minCount;
	}
	public void setMinCount(int minCount) {
		this.minCount = minCount;
	}

	public int getSumCount() {
		return sumCount;
	}

	public void setSumCount(int sumCount) {
		this.sumCount = sumCount;
	}

	@Override
	public String toString() {
		return "PageInfo [pageIndex=" + pageIndex + ", pageSize=" + pageSize + ", totalPage=" + totalPage
				+ ", maxCount=" + maxCount + ", minCount=" + minCount + ", sumCount=" + sumCount + "]";
	}
	
	
	 
	

}
