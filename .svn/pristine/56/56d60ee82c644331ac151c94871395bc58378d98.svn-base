package com.xr.tools;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.ParseException;
import java.util.*;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;



/**
 * @ClassName ExcelUtil
 * @Description 
 * @Author csc
 * @Date 2019年7月26日 上午11:46:17
 */
public class ExcelUtil {
	
	// 工具类最好将构造器私有化
	private ExcelUtil() {}
	
	
	/**
	 *  获取不为空的字段列数共有多少个
	 * 获取所有的sheet页中的数据
	 * @throws ParseException 
	 */
	public static List<String[]> readExcel(MultipartFile file) throws ParseException {
		Workbook workbook = getWorkBook(file);
		Sheet sheet = null;
		List<String[]> list = new ArrayList<String[]>();
		for (int i = 0; i < workbook.getNumberOfSheets(); i++) {// 获取每个Sheet表
			sheet = workbook.getSheetAt(i);
			for (int j = 1; j < sheet.getPhysicalNumberOfRows(); j++) 
			{// 获取每行
				Row row = sheet.getRow(j);
				if (row == null) {
					continue;
				} else {
					    String[] cells = new String[row.getPhysicalNumberOfCells()];
						for (int k = 0; k < row.getPhysicalNumberOfCells(); k++) 
							{// 获取每个单元格
									if (row.getCell(k) != null){
										cells[k] = getCellValue(row.getCell(k));
									} else {
										continue;
									}
							} // end for
						       list.add(cells);
				        }
			  }
		}
		return list;
	}// end
	
	

	/**
	 * 按照最后一列是第几个来读取的excel
	 * 获取所有的sheet页中的数据
	 * @throws ParseException 
	 */
	public static List<String[]> queryExcel(MultipartFile file) throws ParseException {
		Workbook workbook = getWorkBook(file);
		Sheet sheet = null;
		List<String[]> list = new ArrayList<String[]>();
		for (int i = 0; i < workbook.getNumberOfSheets(); i++) {// 获取每个Sheet表
			sheet = workbook.getSheetAt(i);
			for (int j = 1; j < sheet.getPhysicalNumberOfRows(); j++) {// 获取每行
				Row row = sheet.getRow(j);
				if (row == null) {
					continue;
				} else {
					String[] cells = new String[row.getLastCellNum()];
					System.out.println("="+row.getLastCellNum());
					for (int k = 0; k < row.getLastCellNum();k++) {// 获取每个单元格
						if (row.getCell(k) != null && !"".equals(row.getCell(k)) && !"null".equals(row.getCell(k))) {
							System.out.println("=="+row.getCell(k));
							cells[k] = getCellValue(row.getCell(k));
						} else {
							continue;
						}
					} // end for
					list.add(cells);
				}
			}
		}
		return list;
	}// end

    /**
     * 单元格内容解析
     * @param cell
     * @return
     * @throws ParseException 
     */
    private static String getCellValue(Cell cell) throws ParseException {
        String cellValue = null;
        switch (cell.getCellTypeEnum()) {
            // 数字
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    cellValue = ThreadLocalDateTwo.formatDate(DateUtil.getJavaDate(cell.getNumericCellValue()));
                } else {
                    DataFormatter dataFormatter = new DataFormatter();
                    cellValue = dataFormatter.formatCellValue(cell);
                }
                break;
            // 字符串
            case STRING:
                cellValue = cell.getStringCellValue();
                break;
            // Boolean
            case BOOLEAN:
                cellValue = String.valueOf(cell.getBooleanCellValue());
                break;
            // 公式
            case FORMULA:
                cellValue = cell.getCellFormula();
                break;
            // 空值
            case BLANK:
                cellValue = null;
                break;
            // 错误
            case ERROR:
                cellValue = "非法字符";
                break;
            default:
                cellValue = "未知类型";
                break;
        }
        return cellValue;
    }//end
    
	/**
	 * 这是通过文件名的后缀不同选择不同的操作类
	 * @param file
	 * @return
	 */
	public static Workbook getWorkBook(MultipartFile file) {
		// 获得文件名
		String fileName = file.getOriginalFilename();
		// 创建Workbook工作薄对象，表示整个excel
		Workbook workbook = null;
		try {
			// 获取excel文件的io流
			InputStream is = file.getInputStream();
			// 根据文件后缀名不同(xls和xlsx)获得不同的Workbook实现类对象
			if (fileName.endsWith(".xls")) {
				// 2003
				workbook = new HSSFWorkbook(is);
			} else if (fileName.endsWith(".xlsx")) {
				// 2007
				workbook = new XSSFWorkbook(is);
			}
		} catch (IOException e) {
			e.getMessage();
		}
		return workbook;
	}// end

	/**
	 * MultipartFile 转 File
	 * 
	 * @param file
	 * @throws Exception
	 */
	public static File multipartFileToFile(@RequestParam MultipartFile file) throws Exception {

		File toFile = null;
		if (file.equals("") || file.getSize() <= 0) {
			file = null;
		} else {
			InputStream ins = null;
			ins = file.getInputStream();
			toFile = new File(file.getOriginalFilename());
			inputStreamToFile(ins, toFile);
			ins.close();
		}
		return toFile;
	}// end

	/**
	 * MultipartFile 转File的工具类
	 * 
	 * @param ins
	 * @param file
	 */
	public static void inputStreamToFile(InputStream ins, File file) {
		File toFile = null;
		try {
			OutputStream os = new FileOutputStream(toFile);
			int bytesRead = 0;
			byte[] buffer = new byte[8192];
			while ((bytesRead = ins.read(buffer, 0, 8192)) != -1) {
				os.write(buffer, 0, bytesRead);
			}
			os.close();
			ins.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}// end

	
}
