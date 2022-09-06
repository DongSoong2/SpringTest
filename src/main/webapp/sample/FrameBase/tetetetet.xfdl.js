(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("tetetetet");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("Dataset00", this);
            obj._setContents("<ColumnInfo><Column id=\"제목\" type=\"STRING\" size=\"256\"/><Column id=\"값\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"제목\">대제목</Col><Col id=\"값\">0</Col></Row><Row><Col id=\"제목\">소제목</Col><Col id=\"값\">1</Col></Row><Row><Col id=\"제목\">소제목</Col><Col id=\"값\">1</Col></Row><Row><Col id=\"제목\">소제목</Col><Col id=\"값\">1</Col></Row><Row><Col id=\"제목\">소제목</Col><Col id=\"값\">1</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("Grid00","90","52","190","277",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_binddataset("Dataset00");
            obj.set_treeinitstatus("expand,all");
            obj.set_autofittype("col");
            obj.set_treeusecheckbox("false");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"195\"/></Columns><Rows><Row size=\"33\"/></Rows><Band id=\"body\"><Cell text=\"bind:제목\" displaytype=\"treeitemcontrol\" edittype=\"tree\" border=\"0px none\" treelevel=\"bind:값\" treestartlevel=\"1\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("tetetetet.xfdl", function() {
        this.tetetetet_onload = function(obj,e)
        {
        	//this.Dataset00
        	var test = this.Grid00.body;
        	trace("object key : " + Object.keys(test));
        	trace("object values : " + Object.values(test));

        	trace(this.Grid00.formats.getAttribute("size"));
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.tetetetet_onload,this);
        };
        this.loadIncludeScript("tetetetet.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
