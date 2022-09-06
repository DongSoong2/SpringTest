(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Work");
            this.set_titletext("Form_Work");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_search", this);
            obj._setContents("<ColumnInfo><Column id=\"searchType\" type=\"STRING\" size=\"256\"/><Column id=\"keyword\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_list", this);
            obj._setContents("<ColumnInfo><Column id=\"id\" type=\"STRING\" size=\"256\"/><Column id=\"name\" type=\"STRING\" size=\"256\"/><Column id=\"description\" type=\"STRING\" size=\"256\"/><Column id=\"useYn\" type=\"STRING\" size=\"256\"/><Column id=\"regUser\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Edit("Edit00","320","161","160","40",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            this.addChild(obj.name, obj);

            obj = new Combo("Combo00","173","160","141","40",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            var Combo00_innerdataset = new nexacro.NormalDataset("Combo00_innerdataset", obj);
            Combo00_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">ID</Col><Col id=\"datacolumn\">id</Col></Row><Row><Col id=\"codecolumn\">NAME</Col><Col id=\"datacolumn\">name</Col></Row></Rows>");
            obj.set_innerdataset(Combo00_innerdataset);
            obj.set_text("id");
            obj.set_value("ID");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Button("Button00","552","141","74","60",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("조회");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","173","211","877","459",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_autofittype("col");
            obj.set_binddataset("ds_list");
            obj.set_autoenter("select");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"28\" band=\"head\"/><Row size=\"28\"/></Rows><Band id=\"head\"><Cell text=\"id\"/><Cell col=\"1\" text=\"name\"/><Cell col=\"2\" text=\"description\"/><Cell col=\"3\" text=\"useYn\"/><Cell col=\"4\" text=\"regUser\"/></Band><Band id=\"body\"><Cell text=\"bind:id\"/><Cell col=\"1\" text=\"bind:name\" displaytype=\"editcontrol\" edittype=\"normal\"/><Cell col=\"2\" text=\"bind:description\" displaytype=\"editcontrol\" edittype=\"normal\"/><Cell col=\"3\" text=\"bind:useYn\" displaytype=\"editcontrol\" edittype=\"normal\"/><Cell col=\"4\" text=\"bind:regUser\" displaytype=\"editcontrol\" edittype=\"normal\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Button("Button01","636","141","74","60",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("추가");
            this.addChild(obj.name, obj);

            obj = new Button("Button02","720","141","74","60",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("삭제");
            this.addChild(obj.name, obj);

            obj = new Button("Button03","804","141","74","60",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("저장");
            this.addChild(obj.name, obj);

            obj = new Button("Button04","888","141","74","60",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("Export");
            this.addChild(obj.name, obj);

            obj = new Button("Button05","972","141","74","60",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("Import");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Work.xfdl", function() {
        //조회버튼 클릭시
        this.Button00_onclick = function(obj,e)
        {
          this.fnSearch();
        };

        //처리콜백 함수
        this.fnCallback = function(svcID,errorCode,errorMsg)
        {
          // 에러 시 화면 처리 내역
          if(errorCode != 0)
          {
            this.alert(errorCode+"\n"+errorMsg);
            return;
          }

          switch(svcID)
          {
            case "search":
              if(this.ds_list.rowcount < 1){
                this.alert("조회된 결과가 없습니다.");
              }

              break;

            case "save":
              this.alert("저장 되었습니다.");

              this.fnSearch();

              break;
          }
        };

        //데이터 조회 트랜잭션
        this.fnSearch = function ()
        {
          // 조회조건 셋팅
          this.ds_search.setColumn(0, "searchType", this.Combo00.value);
          this.ds_search.setColumn(0, "keyword"  , this.Edit00.text);

          var strSvcId    = "search";
          var strSvcUrl   = "svc::selectSampleList.do";
          var inData      = "input1=ds_search";
          var outData     = "ds_list=output1";
          var strArg      = "";
          var callBackFnc = "fnCallback";
          var isAsync     = true;

          this.transaction(strSvcId ,   // transaction을 구분하기 위한 svc id값
              strSvcUrl ,       // trabsaction을 요청할 주소
              inData ,         // 입력값으로 보낼 dataset id , a=b형태로 실제이름과 입력이름을 매칭
              outData ,         // 처리결과값으로 받을 dataset id, a=b형태로 실제이름과 입력이름을 매칭
              strArg,         // 입력값으로 보낼 arguments, a=b
              callBackFnc,       // transaction의 결과를 받을 Function 이름
              isAsync);         // 비동기통신 여부 [생략가능]
        };

        //추가 버튼클릭
        this.Button01_onclick = function(obj,e)
        {
          var nRow = this.ds_list.addRow();
          this.ds_list.set_rowposition(nRow);
          this.Grid00.setCellPos(1);
          this.Grid00.showEditor(true);
        };

        //삭제 버튼클릭
        this.Button02_onclick = function(obj,e)
        {
          var nRow = this.ds_list.rowposition;
          this.ds_list.deleteRow(nRow);
        };

        //저장 버튼클릭
        this.Button03_onclick = function(obj,e)
        {
          this.fnSave();
        };

        //데이터 저장 트랜잭션
        this.fnSave = function()
        {
          var strSvcId    = "save";
          var strSvcUrl   = "svc::updateSampleList.do";
          // :U -- insert update delete의 속성을 가지고 있다
          // 하지 않을 경우 모든것의 속성을 가진다
          var inData      = "input1=ds_list:U";
          var outData     = "";
          var strArg      = "";
          var callBackFnc = "fnCallback";
          var isAsync     = true;

          this.transaction(strSvcId ,     // transaction을 구분하기 위한 svc id값
              strSvcUrl ,   // trabsaction을 요청할 주소
              inData ,     // 입력값으로 보낼 dataset id , a=b형태로 실제이름과 입력이름을 매칭
              outData ,     // 처리결과값으로 받을 dataset id, a=b형태로 실제이름과 입력이름을 매칭
              strArg,     // 입력값으로 보낼 arguments, a=b
              callBackFnc,   // transaction의 결과를 받을 Function 이름
              isAsync);     // 비동기통신 여부 [생략가능]
        };


        ////////////////////////////////////////////////////////////////////////////////////////////////


        //서버 Xeni Excel 관련 servlet mapping 주소
        this.url = "http://localhost:8080/sampleuiadapterN/XExportImport.do";
        //Export에 사용할 ExcelExportObject 변수생성
        this.objExcelExport = null;
        this.objExcelImport = null;

        this.Form_Work_onload = function(obj,e)
        {
          /*
            ExcelExportObject 생성
          */
          //폼로딩후 ExcelExportObject 생성
          this.objExcelExport = new nexacro.ExcelExportObject("ExcelExportObject00",this);

          //생성한 오브젝트에 이벤트추가
          this.objExcelExport.addEventHandler("onprogress", this.ExcelExportObject00_onprogress, this);
          this.objExcelExport.addEventHandler("onsuccess", this.ExcelExportObject00_onsuccess, this);
          this.objExcelExport.addEventHandler("onerror", this.ExcelExportObject00_onerror, this);

          //ExcelExportObject 의 대상 Grid 및 속성설정
          this.objExcelExport.addExportItem(nexacro.ExportItemTypes.GRID, this.Grid00, "Sheet1!A1","allband","allrecord", "merge", "allstyle", "none", "none", "width");
          this.objExcelExport.set_exportmessageprocess("%d [ %d / %d ]");
          this.objExcelExport.set_exportuitype("exportprogress");
          this.objExcelExport.set_exporteventtype("itemrecord");
          this.objExcelExport.set_exporttype(nexacro.ExportTypes.EXCEL2007);
          this.objExcelExport.set_exporturl(this.url);

          this.addChild("ExcelExportObject00", this.objExcelExport);


          /*
            ExcelImpotObject 생성
          */
          this.objExcelImport = new nexacro.ExcelImportObject("ExcelImportObject00",this);
          //생성한 오브젝트에 이벤트추가
          this.objExcelImport.addEventHandler("onsuccess" ,this.ExcelImportObject00_onsuccess ,this);
          this.objExcelImport.addEventHandler("onerror"   ,this.ExcelImportObject00_onerror   ,this);

          this.objExcelImport.set_importtype(nexacro.ImportTypes.EXCEL2007);
          this.objExcelImport.set_importurl(this.url);

          this.addChild("ExcelImportObject00", this.objExcelImport);
        };

        //Export 버튼클릭시
        this.Button04_onclick = function(obj,e)
        {
          //파일이름 셋팅 및 ExcelExport 실행
          this.objExcelExport.set_exportfilename("ExcelExport_Sample");
          this.objExcelExport.exportData();
        };

        this.ExcelExportObject00_onsuccess = function(obj, e)
        {
          var str = "";

          str += "\n=========== onsuccess event start=================";
          str += "\ne.eventid : " + e.eventid;
          str += "\ne.url: " +  e.url;
          str += "\ne.id :"+e.id;
          str += "\ne.fromobject :"+e.fromobject;
          str += "\ne.fromreferenceobject  :"+e.fromreferenceobject;

          trace(str);
        };

        this.ExcelExportObject00_onprogress = function(obj, e)
        {
          var str = "";

          str += "\n=========== onprogress event start================";
          str += "\ne.eventid  :"+e.eventid;
          str += "\ne.id :"+e.id;
          str += "\ne.fromobject :"+e.fromobject;
          str += "\ne.fromreferenceobject  :"+e.fromreferenceobject;
          str += "\ne.itemindex :"+e.itemindex;
          str += "\ne.itemtype :"+e.itemtype;
          str += "\ne.recordindex :"+e.recordindex;

          trace(str);
        };

        this.ExcelExportObject00_onerror = function(obj, e)
        {
          var str = "";

          str += "\n=========== onerror event start===================";
          str += "\ne.eventid :"+e.eventid;
          str += "\ne.id :"+e.id;
          str += "\ne.fromobject :"+e.fromobject;
          str += "\ne.fromreferenceobject :"+e.fromreferenceobject;
          str += "\ne.errorcode :"+e.errorcode;
          str += "\ne.errormsg :"+e.errormsg;

          trace(str);
        };

        this.Button05_onclick = function(obj,e)
        {
          var sParam = "[command=getsheetdata;output=outDs;head=sheet1!A1:E1;body=sheet1!A2]";
          var sParam2 = "[ds_list=outDs]";

          this.objExcelImport.importData("", sParam, sParam2);
        };





        ////////////////////////////////////////////////////////////////////////////////////////////////







        //Import 성공시
        this.ExcelImportObject00_onsuccess = function(obj, e)
        {
          trace(e.url);
          trace(this.ds_list.saveXML());
        };

        //Import 에러시
        this.ExcelImportObject00_onerror = function(obj, e)
        {
          alert("업로드 실패");
          trace("=========== onerror event start============");
          trace("e.eventid:    "          + e.eventid);
          trace("e.fromobject: "          + e.fromobject);
          trace("e.fromreferenceobject: " + e.fromreferenceobject);
          trace("e.errorcode: "           + e.errorcode);
          trace("e.errormsg: "            + e.errormsg);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Work_onload,this);
            this.Edit00.addEventHandler("onchanged",this.Edit00_onchanged,this);
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
            this.Button01.addEventHandler("onclick",this.Button01_onclick,this);
            this.Button02.addEventHandler("onclick",this.Button02_onclick,this);
            this.Button03.addEventHandler("onclick",this.Button03_onclick,this);
            this.Button04.addEventHandler("onclick",this.Button04_onclick,this);
            this.Button05.addEventHandler("onclick",this.Button05_onclick,this);
        };
        this.loadIncludeScript("Form_Work.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
