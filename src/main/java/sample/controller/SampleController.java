package sample.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.uiadapter.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter.spring.core.data.NexacroResult;

import sample.service.SampleService;
import sample.vo.SampleVO;
import sample.vo.SearchConditionVO;

//@Contoller 어노테이션을 붙이면 핸들러가 스캔할 수 있는 빈(Bean) 객체가 되어 서블릿용 컨테이너
@Controller
public class SampleController {
	// SampleService 로 연결을 하기 위한 선언
	@Autowired
	private SampleService sampleService;

	// log 사용
	private Logger logger = LoggerFactory.getLogger(SampleController.class);

	// URL로 selectSampleList.do 가 호출되면 해당 메소드 실행
	@RequestMapping(value = "/selectSampleList.do")
	// 넥사크로에서 inData인 input1 DataSet의 정보(ds_search)들을 가져와서 SearchConditionVO에 대입
	public NexacroResult selectSampleList(@ParamDataSet(name = "input1") SearchConditionVO searchVo) throws Exception {
		logger.debug("da_search >>> " + searchVo);

		// SampleService에 selectSampleList 메소드를 호출하면서 매개변수 serachVo를 던진다 return으로 가져온 결과
		// 값을 userList에 저장
		List<SampleVO> userList = sampleService.selectSampleList(searchVo);

		// NexacroResult 객체를 생성
		NexacroResult result = new NexacroResult();

		// return으로 얻는 userList를 outData인 output1(ds_list)에 DataSet 저장
		result.addDataSet("output1", userList);

		// 호출했던 곳에서 result를 return
		return result;
	}

	// URL로 updateSampleList.do 가 호출되면 해당 메소드 실행
	@RequestMapping(value = "/updateSampleList.do")
	// 넥사크로에서 inData인 input1 DataSet의 정보(ds_list)들을 가져와서 SampleVO에 대입
	public NexacroResult updateSampleList(@ParamDataSet(name = "input1") List<SampleVO> updateSampleList) throws Exception {
		// SampleService에 updateSampleList 메소드를 호출하면서 매개변수 updateSampleList를 던진다
		sampleService.updateSampleList(updateSampleList);

		// NexacroResult 객체를 생성
		NexacroResult result = new NexacroResult();

		// 호출했던 곳에서 result를 return
		return result;
	}
}
