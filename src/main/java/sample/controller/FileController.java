package sample.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.util.Enumeration;
import java.util.Map;
import java.util.Random;
import java.util.Set;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.nexacro.java.xapi.data.DataSet;
import com.nexacro.java.xapi.data.datatype.PlatformDataType;
import com.nexacro.java.xapi.tx.PlatformType;
import com.nexacro.uiadapter.spring.core.NexacroException;
import com.nexacro.uiadapter.spring.core.data.NexacroFileResult;
import com.nexacro.uiadapter.spring.core.data.NexacroResult;
import com.nexacro.uiadapter.spring.core.util.CharsetUtil;

@Controller
public class FileController {
	private Logger logger = LoggerFactory.getLogger(FileController.class);
	// 프로그램이 실행되는 OS에 맞게 경로('/' or '\') 설정
	private static final String SP = File.separator;
	// 서버 첨부파일 경로
	private static final String PATH = "WEB-INF" + SP + "attachFile";
	// 사용자 폴더경로
	private static String sUserPath = "";

	@Autowired
	private WebApplicationContext appContext;
	
	/*
	 * WAS가 웹 브라우저로부터 Servlet 요청을 받으면 요청을 받을 때 전달 받은 정보를 HttpServletRequest객체를 생성하여
	 * 저장 웹 브라우저에게 응답을 돌려줄 HttpServletResponse객체를 생성(빈 객체) 생성된
	 * HttpServletRequest(정보가 저장된)와 HttpServletResponse(비어 있는)를 Servlet에게 전달
	 */
	// 파일 저장 후 저장파일 정보 반환 (화면에서 호출)
//	@RequestMapping(value = "/uploadFiles.do")
//	public NexacroResult uploadFiles(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		// MultipartHttpServletRequest 체크
//		if (!(request instanceof MultipartHttpServletRequest)) {
//			if (logger.isDebugEnabled()) {
//				logger.debug("Request is not a MultipartHttpServletRequest");
//			}
//			return new NexacroResult();
//		}
//
//		logger.debug("-------------------- nexacro platform uploadFiles ---------------------------");
//
//		// 반환될 파일저장 정보 Dataset 생성
//		DataSet resultDs = createDataSet4UploadResult();
//
//		// 다중 파일 업로드를 위한 객체 생성
//		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
//
//		// 파라미터 처리
//		uploadParameters(multipartRequest);
//		// 파일저장 및 파일정보 반환 Dataset 셋팅처리
//		uploadMultipartFiles(multipartRequest, resultDs);
//
//		// NexacroResult 선언 및 각 정보를 셋팅
//		NexacroResult nexacroResult = new NexacroResult();
//		nexacroResult.addDataSet(resultDs);
//		nexacroResult.setErrorCode(0);
//		nexacroResult.setErrorMsg("File Save Success!");
//
//		return nexacroResult;
//	}
	
	
	
	@RequestMapping(value = "/uploadFiles.do")
	public NexacroResult uploadFiles(MultipartFile image, String dirName) throws Exception {

		logger.debug("-----aaa-----fff------------ nexacro platform uploadFiles ---------------------------");

		// 반환될 파일저장 정보 Dataset 생성
		DataSet resultDs = createDataSet4UploadResult();

		
		
		
		
		
		
		
		
		

		// NexacroResult 선언 및 각 정보를 셋팅
		NexacroResult nexacroResult = new NexacroResult();
		nexacroResult.addDataSet(resultDs);
		nexacroResult.setErrorCode(0);
		nexacroResult.setErrorMsg("File Save Success!");

		return nexacroResult;
	}

	// 반환용 파일정보 데이터셋 생성
	private DataSet createDataSet4UploadResult() {

		DataSet ds = new DataSet("ds_output");
		ds.addColumn("fileid", PlatformDataType.STRING);
		ds.addColumn("filename", PlatformDataType.STRING);
		ds.addColumn("filesize", PlatformDataType.INT);

		System.out.println("데이터셋 확인하세요 : " + ds);
		
		return ds;
	}

	
	
	
	
	// 파라미터 셋팅
	private void uploadParameters(MultipartHttpServletRequest multipartRequest) throws NexacroException {
		// Enumeration : 반복문을 통해 데이터를 한번에 출력할 수 있도록 도와준다
		Enumeration<String> parameterNames = multipartRequest.getParameterNames();

		// hasMoreElements: 읽어올 요소가 남아있는지 확인한다 있으면 true / 없으면 false
		while (parameterNames.hasMoreElements()) {

			// nextElement : 다음 요소를 읽어 옴
			String parameterName = parameterNames.nextElement();

			// 해당 요소가 없을 경우
			if (parameterName == null || parameterName.length() == 0) {
				//
				continue;
			}

			String value = multipartRequest.getParameter(parameterName);

			// 화면 FileUpTransfer 의 setPostData 로 셋팅한 저장될 파일경로 String을 셋팅한다. ("file")
			if ("filepath".equals(parameterName)) {
				if (value != null && !value.equals("")) {
					// "WEB-INF/attachFile/" + "sample"
					sUserPath = SP + value;
				}
				continue;
			}
		}
	}

	
	
	/*
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * */
	
	
	
	// 실제파일 저장 및 저장파일정보 셋팅
	private void uploadMultipartFiles(MultipartHttpServletRequest multipartRequest, DataSet resultDs) throws IOException {

		Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();

		String filePath = getFilePath();

		Set<String> keySet = fileMap.keySet();

		for (String name : keySet) {

			MultipartFile multipartFile = fileMap.get(name);

			String originalFilename = multipartFile.getOriginalFilename();

			// IE에서 파일업로드 시 DataSet 파라매터의 Content-Type이 설정되지 않아 여기로 옴. 무시.
			if (originalFilename == null || originalFilename.length() == 0) {
				continue;
			}

			File destination = new File(filePath);

			// 파일또는 폴더가 존재하는지 여부 판단
			if (destination.exists() == false) {
				// 해당 경로를 형성하는 모든 디렉터리를 만든다
				boolean mkdirs = destination.mkdirs();
				// 파일 쓰기가능으로 설정
				destination.setWritable(true);

				logger.debug("-------------- create directory ----------------------" + mkdirs);
			}

			File targetFile = new File(filePath + SP + originalFilename);

			// 프로젝트 내부에 파일을 업로드할 경우, 프로젝트가 업데이트되어 소스를 교체하면 파일이 유지되지 않을 위험이 있다
			// 따라서 빌드된 프로젝트의 리소스와 사용자가 업로드한 리소스는 따로 관리
			InputStream inputStream = multipartFile.getInputStream();
			FileCopyUtils.copy(inputStream, new FileOutputStream(targetFile));

			int row = resultDs.newRow();
			resultDs.set(row, "fileid", originalFilename);
			resultDs.set(row, "filename", originalFilename);
			resultDs.set(row, "filesize", targetFile.length());

			logger.debug("uploaded file write success. file=" + originalFilename);
		}
	}

	// 파일을 저장할 절대 경로 반환
	private String getFilePath() {
		ServletContext sc = appContext.getServletContext();
		String realPath = sc.getRealPath("/");
		String uploadPath = realPath + PATH + sUserPath;
		return uploadPath;
	}

	// 파일 다운로드 - 해당경로의 파일을 NexacroFileResult 에 담아 반환 (화면에서 호출)
	@RequestMapping(value = "/downloadFile.do")
	public NexacroFileResult downloadFile(HttpServletRequest request) throws Exception {

		logger.debug("-------------------- nexacro platform downloadFile ---------------------------");
		// 인코딩
		String characterEncoding = request.getCharacterEncoding();

		if (characterEncoding == null) {
			// UTF-8 인코딩
			characterEncoding = PlatformType.DEFAULT_CHAR_SET;
		}

		// 문자셋 타입
		String charsetOfRequest = CharsetUtil.getCharsetOfRequest(request, characterEncoding);

		// filepath 파라미터 (폴더명)
		String fileDir = request.getParameter("filepath");

		// 다운로드 Client 파일명
		String displayFileName = "";

		// 파일정보를 담고있는 XML문자열(Dataset 의 saveXML())
		String fileInfoXml = request.getParameter("fileInfo");

		DataSet dsFileInfo = null;

		// 파일정보 Dataset saveXML 문자열
		if (fileInfoXml != null) {
			dsFileInfo = new DataSet("fileInfo");
			// 문자열 치환
			fileInfoXml = fileInfoXml.replaceAll("&lt;", "<").replaceAll("&quot;", "\"").replaceAll("&gt;", ">");

			dsFileInfo.loadXml(fileInfoXml);
		}

		// 사용자 지정 폴더가 넘어왔을때
		if (fileDir != null) {
			fileDir = fileDir + SP;
		} else {
			fileDir = "";
		}

		String filePath = getFilePath() + SP + fileDir;
		String fileName = "";
		File file = null;

		if (dsFileInfo.getRowCount() > 1) {

			// 현재날짜 및 yyyy/mm/dd 형식에 맞게 포맷팅
			LocalDate now = LocalDate.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
			// 2개이상의 파일을 download할 때 name 지정
			displayFileName = now.format(formatter) + ".zip";

			Random rnd = new Random();

			// 2중 랜덤
			String randomStr = String.valueOf(rnd.nextInt(999999999)) + String.valueOf(rnd.nextInt(999999999));

			// getCompressZipFile메소드에 매개변수를 지정하고 return 받은 값을 file에 저장
			file = getCompressZipFile(dsFileInfo, filePath, "compressZip-" + randomStr, charsetOfRequest);
		} else {
			displayFileName = dsFileInfo.getString(0, "displayFileName");
			fileName = dsFileInfo.getString(0, "realFileName");

			// was의 uri encoding을 사용안함. (서버의 설정을 변경하여야 함. URIEncoding="UTF-8")
			// already decode..
			// tomcat의 기본 uriencoding 형식 + web.xml의 charsetfilter utf8 (runtime version 은
			// uriencoding 되지 않고 있음)
			fileName = URLDecoder.decode(fileName, charsetOfRequest);
			// 파일명에 불필요 문자 제거
			fileName = removedPathTraversal(fileName);

			String realFileName = filePath + fileName;

			logger.debug("     charsetOfRequest :{}", charsetOfRequest);
			logger.debug("     FILE PATH :{}", filePath);
			logger.debug("     FILE NAME :{}", fileName);
			logger.debug("     realFileName :{}", realFileName);

			file = new File(realFileName);
		}

		NexacroFileResult result = new NexacroFileResult(file);
		result.setOriginalName(displayFileName);

		return result;
	}

	// 파일 압축 (압축파일도 서버에 저장을 하기 때문에 Job Scheduler 등으로 이후 삭제하여야 합니다)
	private File getCompressZipFile(DataSet fileInfo, String realPath, String compressName, String charsetOfRequest) throws IOException {

		String dumpDir = "dummy" + SP;
		String path = realPath;
		String files[] = new String[fileInfo.getRowCount()];

		for (int i = 0; i < files.length; i++) {
			files[i] = URLDecoder.decode(fileInfo.getString(i, "realFileName"), charsetOfRequest);
			files[i] = removedPathTraversal(files[i]);
		}

		File destination = new File(path + dumpDir);

		// 파일 또는 폴더가 존재하는지 체크
		if (destination.exists() == false) {
			// 해당 경로를 형성하는 모든 디렉터리 생성
			boolean mkdirs = destination.mkdirs();
			// 파일 쓰기가능으로 설정
			destination.setWritable(true);

			logger.debug("-------------- create directory ----------------------{}", mkdirs);
		}

		// buffer size
		int size = 1024;
		byte[] buf = new byte[size];
		// 해당경로에 파일 압축할 name 설정
		String outZipNm = path + dumpDir + compressName + ".zip";

		File file = new File(outZipNm);

		FileInputStream fis = null;
		ZipArchiveOutputStream zos = null;
		BufferedInputStream bis = null;

		try {
			// Zip 파일생성
			zos = new ZipArchiveOutputStream(new BufferedOutputStream(new FileOutputStream(outZipNm)));
			for (int i = 0; i < files.length; i++) {
				// encoding 설정
				zos.setEncoding("UTF-8");

				// buffer에 해당파일의 stream을 입력한다.
				fis = new FileInputStream(path + files[i]);
				bis = new BufferedInputStream(fis, size);

				// zip에 넣을 다음 entry 를 가져온다.
				zos.putArchiveEntry(new ZipArchiveEntry(files[i]));

				// 준비된 버퍼에서 집출력스트림으로 write 한다.
				int len;
				while ((len = bis.read(buf, 0, size)) != -1) {
					zos.write(buf, 0, len);
				}

				bis.close();
				fis.close();
				zos.closeArchiveEntry();

			}
			zos.close();

			logger.debug("     charsetOfRequest :{}", charsetOfRequest);
			logger.debug("     FILE PATH :{}", (path + dumpDir));
			logger.debug("     FILE NAME :{}.zip", compressName);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (zos != null) {
				zos.close();
			}
			if (fis != null) {
				fis.close();
			}
			if (bis != null) {
				bis.close();
			}
		}

		return file;
	}

	// 파일명에 불필요한 문자제거
	private String removedPathTraversal(String fileName) {
		if (fileName == null) {
			return null;
		}

		fileName = fileName.replace("/", "");
		fileName = fileName.replace("\\", "");
		fileName = fileName.replace("&", "");

		return fileName;
	}

}