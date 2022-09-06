package sample.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import sample.vo.SampleVO;
import sample.vo.SearchConditionVO;

//DAO를 인식시켜주기 위한 설정
@Repository("sampleDao")
public class SampleDAOImpl implements SampleDAO {

	// mybatis를 사용하기 위한 객체 선언
	@Autowired
	private SqlSessionTemplate mybatis;

	// mybatis.속성("[mapper namespace].[select id]",[정보를 주고 받을 vo])
	@Override
	public List<SampleVO> selectSampleList(SearchConditionVO searchVo) throws Exception {
		// select를 위한 mybatis의 selectList 속성을 사용하여 mapper의 sql문을 실행 시킨후 값을 되받아서
		// Controller에 주기 위해 return 작업을 한다
		return mybatis.selectList("sample.service.impl.SampleMapper.selectSampleList", searchVo);
	}

	@Override
	public void insertSampleList(SampleVO sample) throws Exception {
		// insert를 위한 mybatis의 insert 속성을 사용하여 mapper의 sql문을 실행 시킨다
		mybatis.insert("sample.service.impl.SampleMapper.insertSampleList", sample);
	}

	@Override
	public void updateSampleList(SampleVO sample) throws Exception {
		// update를 위한 mybatis의 update 속성을 사용하여 mapper의 sql문을 실행 시킨다
		mybatis.update("sample.service.impl.SampleMapper.updateSampleList", sample);
	}

	@Override
	public void deleteSampleList(SampleVO sample) throws Exception {
		// delete를 위한 mybatis의 delete 속성을 사용하여 mapper의 sql문을 실행 시킨다
		mybatis.delete("sample.service.impl.SampleMapper.deleteSampleList", sample);
	}

}
