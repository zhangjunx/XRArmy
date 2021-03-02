package com.xr.tools;

import org.apache.poi.hssf.converter.ExcelToHtmlConverter;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.converter.PicturesManager;
import org.apache.poi.hwpf.converter.WordToHtmlConverter;
import org.apache.poi.hwpf.usermodel.Picture;
import org.apache.poi.hwpf.usermodel.PictureType;
import org.apache.poi.xwpf.converter.core.FileImageExtractor;
import org.apache.poi.xwpf.converter.core.FileURIResolver;
import org.apache.poi.xwpf.converter.xhtml.XHTMLConverter;
import org.apache.poi.xwpf.converter.xhtml.XHTMLOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.w3c.dom.Document;

import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;
import java.net.URLEncoder;
import java.util.List;

/**
 * 文件操作工具
 */

public class FileHandleUtils {
	/**
	 * docx文件转换成html
		 * temppath:文件存放路径
		 * filename:文件名称，path+filename
		 * outputfile:预览文件html，path+filename
		 * 
		 */
	public static void docxToHtml(String tempPath,String filename,String outputfile) throws Exception{
		
		XWPFDocument document=new XWPFDocument(new FileInputStream(filename));
		XHTMLOptions options=XHTMLOptions.create().indent(4);
		File imageFolder=new File(tempPath);
		options.setExtractor(new FileImageExtractor(imageFolder));
		options.URIResolver(new FileURIResolver(imageFolder));
		File outfile=new File(outputfile);
		outfile.getParentFile().mkdirs();
		OutputStream out=new FileOutputStream(outfile);
		XHTMLConverter.getInstance().convert(document, out, options);
	}

	/**
	 * doc文件转换成html
	 * @throws IOException 
	 * @throws Exception 
	 */
	public static void docToHtml(String temppath,String filename,String outputfile) throws Exception{
		HWPFDocument wordDocument=new HWPFDocument(new FileInputStream(filename));
		WordToHtmlConverter wordToHtmlConverter=new WordToHtmlConverter(DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument());
		wordToHtmlConverter.setPicturesManager(new PicturesManager(){
			public String savePicture(byte[] content,PictureType pictureType,String suggestedName,float widthInches,float heightInches){
				return "img"+suggestedName;
			}
		});
		wordToHtmlConverter.processDocument(wordDocument);
		List<Picture> pics=wordDocument.getPicturesTable().getAllPictures();
		if(pics!=null){
			for(int i=0;i<pics.size();i++){
				Picture pic=pics.get(i);
				try{
					pic.writeImageContent(new FileOutputStream(temppath+pic.suggestFullFileName()));
				}catch(Exception e){
					e.printStackTrace();
				}
			}
		}
		Document htmlDocument=wordToHtmlConverter.getDocument();
		ByteArrayOutputStream out=new ByteArrayOutputStream();
		DOMSource domSource=new DOMSource(htmlDocument);
		StreamResult streamResult=new StreamResult(out);
		TransformerFactory tf=TransformerFactory.newInstance();
		Transformer serializer=tf.newTransformer();
		serializer.setOutputProperty(OutputKeys.ENCODING,"utf-8");
		serializer.setOutputProperty(OutputKeys.INDENT,"yes");
		serializer.setOutputProperty(OutputKeys.METHOD,"html");
		serializer.transform(domSource,streamResult);
		out.close();
		writeFile(new String(out.toByteArray()),outputfile);
	}

	/**
	 * excel .xls文件转换成html
	 */
	public static void HSSFToHtml(String tempPath, String fileName, String outPutFile)
			throws TransformerException, IOException, ParserConfigurationException {

		InputStream input = new FileInputStream(fileName);
		HSSFWorkbook excelBook = new HSSFWorkbook(input);
		ExcelToHtmlConverter excelToHtmlConverter = new ExcelToHtmlConverter(
				DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument());
		excelToHtmlConverter.processWorkbook(excelBook);
		List pics = excelBook.getAllPictures();
		if (pics != null) {
			for (int i = 0; i < pics.size(); i++) {
				Picture pic = (Picture) pics.get(i);
				try {
					pic.writeImageContent(new FileOutputStream(tempPath + pic.suggestFullFileName()));
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				}
			}
		}
		Document htmlDocument = excelToHtmlConverter.getDocument();
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		DOMSource domSource = new DOMSource(htmlDocument);
		StreamResult streamResult = new StreamResult(outStream);
		TransformerFactory tf = TransformerFactory.newInstance();
		Transformer serializer = tf.newTransformer();
		serializer.setOutputProperty(OutputKeys.ENCODING, "utf-8");
		serializer.setOutputProperty(OutputKeys.INDENT, "yes");
		serializer.setOutputProperty(OutputKeys.METHOD, "html");
		serializer.transform(domSource, streamResult);
		outStream.close();
		writeFile(new String(outStream.toByteArray()), outPutFile);
	}

	/**
	 * 将文件内容写入指定html文件中
	 * content:内容，
	 * outfilepath:输入文件路径path+filename
	 */
	public static void writeFile(String content,String outfilepath){
		FileOutputStream fos=null;
		BufferedWriter bw=null;
		try{
			File file=new File(outfilepath);
			fos=new FileOutputStream(file);
			bw=new BufferedWriter(new OutputStreamWriter(fos,"utf-8"));
			bw.write(content);
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			try{
				if(bw!=null){
					bw.close();
				}
				if(fos!=null){
					fos.close();
				}
			}catch(Exception e){
				e.printStackTrace();
			}
		}
	}
	 

	/**
	 * 文件下载
	 * @param filepath：文件路径
	 * @param filename:文件名称
	 * @param downloadname:
	 * @param contenttype
	 * @param response
	 * @return
	 */
	public static boolean downloadFile(String filepath,String filename,String downloadname,String contenttype,HttpServletResponse response){
		boolean flag=true;
		try{
			File file=new File(filepath+filename);
			if(!file.exists()){
				flag=false;
			}else{
				FileInputStream fis=new FileInputStream(file);
				response.setHeader("Content-Disposition", "attachment;Filename="+URLEncoder.encode(downloadname, "UTF-8"));
				response.setHeader("Content-Type", contenttype);//设置格式类型
				OutputStream os=response.getOutputStream();
				byte[] bytes=new byte[2048];
				int len=0;
				while((len=fis.read(bytes))>0){
					os.write(bytes,0,len);
				}
				fis.close();
				os.close();
			}
		}catch(Exception e){
			e.printStackTrace();
			flag=false;
		}
		return flag;
	}
	
	
}