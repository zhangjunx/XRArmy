package com.xr.tools;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics2D;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.List;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.commons.io.FileUtils;
import org.apache.poi.hslf.record.Slide;
import org.apache.poi.hssf.converter.ExcelToHtmlConverter;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.converter.PicturesManager;
import org.apache.poi.hwpf.converter.WordToHtmlConverter;
import org.apache.poi.hwpf.usermodel.Picture;
import org.apache.poi.hwpf.usermodel.PictureType;
import org.apache.poi.sl.usermodel.TextRun;
import org.w3c.dom.Document;
public class PoiToHtml {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	//检查文件是否是ppt
	public static boolean checkFile(File file){
		boolean isppt=false;
		String filename=file.getName();
		String suffixname=null;
		if(filename!=null && filename.indexOf(".")!=-1){
			suffixname=filename.substring(filename.indexOf("."));
			if(suffixname.equals(".ppt")){
				isppt=true;
			}
			return isppt;
		}else{
			return isppt;
		}
	}
	/*public static boolean pptToHtml(){
		File file=new File("");//D:/poi-test/pptToImg/test.ppt
		boolean isppt=checkFile(file);
		if(!isppt){
			return false;
		}
		try{
			FileInputStream fis=new FileInputStream(file);
			SlideShow ppt=new SlideShow(fis);
			fis.close();
			Dimension pgsize=ppt.getPageSize();
			org.apache.poi.hslf.model.Slide[] slide=ppt.getSlides();
			for(int i=0;i<slide.length;i++){
				System.out.println("第"+i+"页");
				TextRun[] truns=slide[i].getTextRuns();
				for(int k=0;k<truns.length;k++){
					RichTextRun[] rtruns=truns[k].getRichTextRuns();
					for(int l=0;l<rtruns.lenth;l++){
						int index=rtruns[l].getFontIndex();
						String name=rtruns[l].getFontName();
						rtruns[l].setFontIndex(l);
						rtruns[l].setFontName("宋体");
						System.out.println(rtruns[l].getText());
					}
				}
				BufferedImage img=new BufferedImage(pgsize.width,pgsize.height,BufferedImage.TYPE_INT_RGB);
				Graphics2D graphics=img.createGraphics();
				graphics.setPaint(Color.blue);
				graphics.fill(new Rectangle2D.Float(0,0,pgsize.width,pgsize.height));
				slide[i].draw(graphics);
				//这里设置图片的存放路径和图片的格式（jpeg,png,bmp等），注意生成文件路径
				FileOutputStream fos=new FileOutputStream("d:/pic_"+(i+1)+".jpeg");
				javax.imageio.ImageIO.write(img,"jpeg",fos);
				fos.close();
			}
			System.out.println("success!");
			return true;
		}catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		return false;
	}
	*/
	public static void wordToHtml() throws Exception{
		String file="";
		String path="";
		InputStream is=new FileInputStream(path+file);
		HWPFDocument wordDocument=new HWPFDocument(is);
		WordToHtmlConverter wordToHtmlConverter=new WordToHtmlConverter(
				DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument());
		wordToHtmlConverter.setPicturesManager(new PicturesManager(){
			public String savePicture(byte[] content,PictureType picturetype,String suggestedname,float widthInches,float heightInches){
				return suggestedname;
			}
		});
		wordToHtmlConverter.processDocument(wordDocument);
		List pics=wordDocument.getPicturesTable().getAllPictures();
		if(pics!=null){
			for(int i=0;i<pics.size();i++){
				Picture pic=(Picture) pics.get(i);
				try{
					pic.writeImageContent(new FileOutputStream(path+pic.suggestFullFileName()));
				}catch(Exception e){
					e.printStackTrace();
				}
			}
		}
		Document htmlDocument=wordToHtmlConverter.getDocument();
		ByteArrayOutputStream baos=new ByteArrayOutputStream();
		DOMSource domSource=new DOMSource(htmlDocument);
		StreamResult streamResult=new StreamResult(baos);
		TransformerFactory tf=TransformerFactory.newInstance();
		Transformer serializer=tf.newTransformer();
		serializer.setOutputProperty(OutputKeys.ENCODING, "utf-8");
		serializer.setOutputProperty(OutputKeys.INDENT, "yes");
		serializer.setOutputProperty(OutputKeys.METHOD, "html");
		serializer.transform(domSource, streamResult);
		baos.close();
		String content=new String(baos.toByteArray());
		FileUtils.writeStringToFile(new File(path,"人员选择系分.html"), content, "utf-8");
	}

	public static void ExcelToHtml() throws Exception{
		String path="";
		String file="";
		InputStream is=new FileInputStream(path+file);
		HSSFWorkbook excelBook=new HSSFWorkbook(is);
		ExcelToHtmlConverter excelToHtmlConverter=new ExcelToHtmlConverter(DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument());
		excelToHtmlConverter.processWorkbook(excelBook);
		List pics=excelBook.getAllPictures();
		if(pics!=null){
			for(int i=0;i<pics.size();i++){
				Picture pic=(Picture) pics.get(i);
				try{
					pic.writeImageContent(new FileOutputStream(path+pic.suggestFileExtension()));
				}catch(Exception e){
					e.printStackTrace();
				}
			}
		}
		Document htmlDocument=excelToHtmlConverter.getDocument();
		ByteArrayOutputStream baos=new ByteArrayOutputStream();
		DOMSource domSource=new DOMSource(htmlDocument);
		StreamResult streaResult=new StreamResult(baos);
		TransformerFactory tf=TransformerFactory.newInstance();
		Transformer serializer=tf.newTransformer();
		serializer.setOutputProperty(OutputKeys.ENCODING,"UTF-8");
		serializer.setOutputProperty(OutputKeys.INDENT, "yes");
		serializer.setOutputProperty(OutputKeys.METHOD, "html");
		serializer.transform(domSource, streaResult);
		baos.close();
		String content=new String(baos.toByteArray());
		FileUtils.writeStringToFile(new File(path), "exportExcel.html", "utf-8");
	}
}
