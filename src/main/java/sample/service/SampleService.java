package sample.service;

import java.util.List;

import sample.vo.SampleVO;
import sample.vo.SearchConditionVO;

//interface는 개발 코드와 객체가 서로 통신하는 접점 역할을 한다. 개발 코드가 인터페이스의 메소드를 호출하면 인터페이스는 객체의 메소드를 호출시킨다.
public interface SampleService {
	// Controller에서 각 매개변수와 함께 호출된 메소드
	List<SampleVO> selectSampleList(SearchConditionVO searchVo) throws Exception;

	void updateSampleList(List<SampleVO> updateSampleList) throws Exception;
}
