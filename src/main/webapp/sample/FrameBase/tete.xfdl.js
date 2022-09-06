(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("tete");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("Dataset00", this);
            obj._setContents("<ColumnInfo><Column id=\"string\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"string\">안녕하세요</Col></Row><Row><Col id=\"string\">안녕하세요안녕하세요</Col></Row><Row><Col id=\"string\">안녕하세요안녕하세요안녕하세요</Col></Row><Row><Col id=\"string\">Hello</Col></Row><Row><Col id=\"string\">Hello Hello</Col></Row><Row><Col id=\"string\">Hello Hello Hello</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("Dataset01", this);
            obj._setContents("<ColumnInfo><Column id=\"string\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Edit("Edit00","180","115","180","39",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            this.addChild(obj.name, obj);

            obj = new Button("Button00","394","109","120","50",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("판별");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","110","174","235","246",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_binddataset("Dataset00");
            obj.set_scrollbartype("none");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"238\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"string\"/></Band><Band id=\"body\"><Cell text=\"bind:string\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid01","370","174","254","245",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_binddataset("Dataset01");
            obj.set_scrollbartype("none");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"254\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"string\"/></Band><Band id=\"body\"><Cell text=\"bind:string\"/></Band></Format></Formats>");
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
        this.registerScript("tete.xfdl", function() {

        this.Button00_onclick = function(obj,e)
        {

        	var menu00 = this.Dataset00;
        	var menu01 = this.Dataset01;

        	var varCol;

        	//menu01.copyData(menu00);

        	for(var i=0; i<menu00.rowcount; i++)
        	{
        		varCol = menu00.getColumn(i, "string");

        		trace(varCol);

        		var length = getByte(varCol);

        		trace(length);

        		var addrow = menu01.addRow();

        		if (length > 12)
        		{
        			// 한글 인 경우
        			menu01.setColumn(addrow, "string", varCol.substr(0,7) + "...");
        		}
        		else
        		{
        			menu01.setColumn(addrow, "string", varCol);

        		}
        	}


         	if(length>40)
         	{
         		trace(this.Edit00.value.substr(0,5) + "...");
         	}
        	function getByte( data )

        		{
        			var str = data;

        			var l = 0;

        		if(str == "" || str == undefined){
        			return l;
        		}

        		for(var i=0; i<str.length; i++)
        		{
        			// 아스키코드 128이 넘어가면 한글이므로 2byte / 그 외 1byte
        			l += (str.charCodeAt(i) > 128) ? 2 : 1;
        		}
        		return l;
            return length;
        	}
        };



        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
        };
        this.loadIncludeScript("tete.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
