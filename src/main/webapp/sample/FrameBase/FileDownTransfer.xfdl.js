(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("FileDownTransfer");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsFileList", this);
            obj._setContents("<ColumnInfo><Column id=\"chk\" type=\"STRING\" size=\"256\"/><Column id=\"realFileName\" type=\"STRING\" size=\"256\"/><Column id=\"displayFileName\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"chk\">0</Col><Col id=\"realFileName\">1.xlsx</Col><Col id=\"displayFileName\">파일1.xlsx</Col></Row><Row><Col id=\"chk\">0</Col><Col id=\"realFileName\">111.xlsx</Col><Col id=\"displayFileName\">파일111.xlsx</Col></Row><Row><Col id=\"chk\">0</Col><Col id=\"realFileName\">Hydrangeas.jpg</Col><Col id=\"displayFileName\">파일Hydrangeas.jpg</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsDownFileList", this);
            obj._setContents("<ColumnInfo><Column id=\"realFileName\" type=\"STRING\" size=\"256\"/><Column id=\"displayFileName\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new FileDownTransfer("FileDownTransfer00", this);
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("Button00","590","95","120","50",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("파일 다운로드");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","75","90","495","303",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_binddataset("dsFileList");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"30\"/><Column size=\"372\"/></Columns><Rows><Row band=\"head\" size=\"24\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell/><Cell col=\"1\" text=\"DownLoad FileName\"/></Band><Band id=\"body\"><Cell displaytype=\"checkboxcontrol\" edittype=\"checkbox\" text=\"bind:chk\"/><Cell col=\"1\" text=\"bind:displayFileName\" textAlign=\"center\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("FileDownTransfer.xfdl", function() {
        this.sFileUrl = "http://localhost:8080/sampleuiadapterN/downloadFile.do"; //파일다운로드 URL

        //폼 로딩 후 이벤트
        this.FileDownTransfer_onload = function(obj,e)
        {
          //파일다운로드시 파일다운 폴더경로 PostData 셋팅
          this.FileDownTransfer00.setPostData("filepath","sample");
          //파일업로드 전송 URL 셋팅
          this.FileDownTransfer00.set_url(this.sFileUrl);
        };

        //파일다운로드 버튼클릭
        this.Button00_onclick = function(obj,e)
        {
          var objDs = this.dsFileList;
          var nCnt = objDs.getRowCount();

          this.dsDownFileList.clearData();

          for(var i=0;i<nCnt;i++){
            var nChk = objDs.getColumn(i,"chk");

            if(nChk==1) {
              var nRow = this.dsDownFileList.addRow();

              this.dsDownFileList.setColumn(nRow, "realFileName", objDs.getColumn(i,"realFileName"));
              this.dsDownFileList.setColumn(nRow, "displayFileName", objDs.getColumn(i,"displayFileName"));
            }
          }

          if(this.dsDownFileList.getRowCount() == 0) {
            alert("다운로드 할 파일을 선택하세요.");
            return;
          }

          /*
            서버로 전송할 파일정보를 셋팅

            [추천] String 에 여러파일명 정보 넘겨 서버에서 잘라서 처리
            setPostData("file_realFilenames","1.xlsx,111.xlsx,Hydrangeas.jpg")
            setPostData("file_displayFilenames","파일1.xlsx,파일111.xlsx,파일Hydrangeas.jpg")

            [비추천] 데이터셋을 넘기지 못해 XML 스트링으로 넘겨 서버에서 Dataset으로 변경
            몇가지 문자만 변환해서 해보니 동작하여 작성해 봅니다 (공식방법 아닙니다)
          */
          this.FileDownTransfer00.setPostData("fileInfo",this.dsDownFileList.saveXML());

          //NRE 를 위한 다운로드 Default 파일명
          if(this.dsDownFileList.getRowCount() > 1) {
            //파일여러개 선택시 zip 파일로 압축하여 다운로드
            this.FileDownTransfer00.set_downloadfilename("첨부파일.zip");
          }else{
            //파일이 1개일 경우 해당 파일명으로 다운로드
            this.FileDownTransfer00.set_downloadfilename(this.dsDownFileList.getColumn(0, "displayFileName"));
          }

          //파일다운로드 실행
          this.FileDownTransfer00.download();
        };

        //파일다운로드 성공시 (NRE 에서만 지원)
        this.FileDownTransfer00_onsuccess = function(obj,e)
        {
          var sMsg = e.targetfullpath +"\n"+  e.url;

          alert(sMsg);
        };

        //파일다운로드 실패시 (NRE 에서만 지원)
        this.FileDownTransfer00_onerror = function(obj,e)
        {
          var sMsg = ">>>>>>>>>>>>>>>>>>>>>>>>>>  ERROR >>>>>>>>>>>>>>>>>>>>>>>>>>\n";
          sMsg += "statuscode: "+e.statuscode+"\n";
          sMsg += "requesturi: "+e.requesturi+"\n";
          sMsg += "locationuri: "+e.locationuri+"\n" ;
          sMsg += "errormsg: "+e.errormsg+"\n";

          alert(sMsg);
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.FileDownTransfer_onload,this);
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
            this.FileDownTransfer00.addEventHandler("onerror",this.FileDownTransfer00_onerror,this);
            this.FileDownTransfer00.addEventHandler("onsuccess",this.FileDownTransfer00_onsuccess,this);
        };
        this.loadIncludeScript("FileDownTransfer.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
