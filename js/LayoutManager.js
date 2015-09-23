function LayoutManager() {
    this.layouts = {};
    this.lastRenderedContent = "";
    this.lastRenderedLayout = "";
    this.lastRenderedData = [];
    this.lastRenderTarget = "";
    this.filterString = "";
}

LayoutManager.prototype.setFilterString = function(str) {
    this.filterString = str;
    this.reRender();
    this.applyLayout(this.lastRenderTarget);
}

LayoutManager.prototype.addLayout = function(name, templateId) {
    this.layouts[name] = $("#" + templateId).html();
};

LayoutManager.prototype.reRender = function() {
    this.renderLayout(this.lastRenderedLayout, this.lastRenderedData);
}

LayoutManager.prototype.renderLayout = function(name, data) {
    this.lastRenderedLayout = name;
    this.lastRenderedData = data;
    var tpl = Handlebars.compile(this.layouts[name]);
    this.lastRenderedContent = "";
    
    var i = 0;
    for (i; i<data.length; i++) {
        if ((this.filterString && data[i].filter(this.filterString)) || !this.filterString) {
            this.lastRenderedContent += tpl(data[i]);
        }
    }
    
    return this.lastRenderedContent;
};

LayoutManager.prototype.applyLayout = function(targetSelector) {
    this.lastRenderTarget = targetSelector;
    
    var container = $(targetSelector);
    
    container.empty();
    container.html(this.lastRenderedContent);
};