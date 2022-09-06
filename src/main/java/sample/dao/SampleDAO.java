package sample.dao;

import java.util.List;

import sample.vo.SampleVO;
import sample.vo.SearchConditionVO;

public interface SampleDAO {

	// Controller에서 각 매개변수와 함께 호출된 메소드
	List<SampleVO> selectSampleList(SearchConditionVO searchVo) throws Exception;

	void insertSampleList(SampleVO sample) throws Exception;

	void updateSampleList(SampleVO sample) throws Exception;

	void deleteSampleList(SampleVO sample) throws Exception;

}
