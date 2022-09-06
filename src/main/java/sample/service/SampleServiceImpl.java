package sample.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.nexacro.java.xapi.data.DataSet;
import com.nexacro.uiadapter.spring.core.NexacroException;
import com.nexacro.uiadapter.spring.core.data.DataSetRowTypeAccessor;

import sample.dao.SampleDAO;
import sample.vo.SampleVO;
import sample.vo.SearchConditionVO;

// Service를 인식시켜주기 위한 설정
@Service("sampleService")
// 부모 객체는 선언만 하며 정의는 자식에서 오버라이딩(재정의) 해서 사용해야함
public class SampleServiceImpl implements SampleService {

	// SampleDAO 로 연결을 하기 위한 선언
	@Autowired
	private SampleDAO sampleDao;

	// DB 트랜잭션을 위한 객체 선언
	@Autowired
	private DataSourceTransactionManager transactionManager;

	// 오버로딩(Overloading) : 같은 이름의 메서드 여러개를 가지면서 매개변수의 유형과 개수가 다르도록 하는 기술
	// 오버라이딩(Overriding) : 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의해서 사용

	// Controller에서 받아온 selectSampleList의 메소드를 SampleDAO의 selectSampleList 메소드 전달 하고
	// return 값을 다시 Controller로 전달
	@Override
	public List<SampleVO> selectSampleList(SearchConditionVO searchVo) throws Exception {
		return sampleDao.selectSampleList(searchVo);
	}

	// Controller에서 받아온 updateSampleList의 메소드를 조건에 따라 각 SampleDAO의 메소드 실행
	@Override
	public void updateSampleList(List<SampleVO> updateSampleList) throws Exception {

		// 기존 DB에서 수정된 데이터를 size로 정의
		int size = updateSampleList.size();

		// https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=kbh3983&logNo=220862241194
		// 트랜잭션 commit과 rollback을 하기 위한 객체 선언
		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus status = this.transactionManager.getTransaction(def);

		try {
			for (int i = 0; i < size; i++) {
				// 수정이 된 vo정보를 sample에 저장
				SampleVO sample = updateSampleList.get(i);
				// System.out.println("try안에 있는 for문 sample이 뭘 가져오는걸까" + sample.getId());

				// DataSetRowTypeAccessor를 통해 각 타입의 row 정보를 가져온다
				if (sample instanceof DataSetRowTypeAccessor) {
					DataSetRowTypeAccessor accessor = (DataSetRowTypeAccessor) sample;

					// type insert 발생 시
					if (accessor.getRowType() == DataSet.ROW_TYPE_INSERTED) {
						String id = null;

						// 아이디 랜덤 값을 통해 부여
						id = Integer.toString((int) (Math.random() * 99999));

						// sample의 id를 셋팅
						sample.setId(id);

						// insertSampleList 메소드에 SampleVO 정보를 매개변수로 지정
						sampleDao.insertSampleList(sample);

					}
					// type update 발생 시
					else if (accessor.getRowType() == DataSet.ROW_TYPE_UPDATED) {
						// updateSampleList 메소드에 SampleVO 정보를 매개변수로 지정
						sampleDao.updateSampleList(sample);

					}
					// type delete 발생 시
					else if (accessor.getRowType() == DataSet.ROW_TYPE_DELETED) {
						// deleteSampleList 메소드에 SampleVO 정보를 매개변수로 지정
						sampleDao.deleteSampleList(sample);
					}
				}
			}

			// try를 통해 모든 메소드를 return하고 오류가 없을경우 DB를 commit한다
			this.transactionManager.commit(status);

		}
		// Exception 발생
		catch (Exception e) {
			// 메시지 설정을 위한 선언 및 초기화
			String msg = "";
			String exceptionName = "";
			String causeMsg = "";

			// Exception 종류
			exceptionName = e.getCause().getClass().getName();
			// Exception 오류 메시지
			causeMsg = e.getCause().getLocalizedMessage();

			// Exception 발생으로 인하여 DB rollback이 실행된다
			this.transactionManager.rollback(status);
			// NexacroException에 Exception 정보 전달과 message의 정보 중 nx.error.save=저장 중 에러가
			// 발생했습니다.. 를 출력
			throw new NexacroException("[ " + exceptionName + " ] " + causeMsg, e, -1, "nx.error.save");
		}

	}

}
