package sample.vo;

import com.nexacro.uiadapter.spring.core.data.DataSetRowTypeAccessor;

public class RowTypeVO implements DataSetRowTypeAccessor {

	private int rowType;

	public int getRowType() {
		return rowType;
	}

	public void setRowType(int rowType) {
		this.rowType = rowType;
	}

}