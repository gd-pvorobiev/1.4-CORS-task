define(function() {
    
    function LayoutManager() {
        this.layouts = {};
        this.lastRenderedContent = "";
        this.lastRenderedLayout = "";
        this.lastRenderedData = [];
        this.lastRenderTarget = "";
    }

    LayoutManager.prototype.showSpinner = function() {
        $(".spinner").show();
    };


    LayoutManager.prototype.hideSpinner = function() {
        $(".spinner").hide();
    };


    LayoutManager.prototype.addLayout = function(name, templateId) {
        this.layouts[name] = $("#" + templateId).html();
    };

    LayoutManager.prototype.reRender = function() {
        this.renderLayout(this.lastRenderedLayout, this.lastRenderedData);
    }

    LayoutManager.prototype.renderLayout = function(name, data) {
        this.lastRenderedLayout = name || this.lastRenderedLayout;
        this.lastRenderedData = data;
        var tpl = Handlebars.compile(this.layouts[this.lastRenderedLayout]);
        this.lastRenderedContent = "";

        var i = 0;
        for (i; i<data.length; i++) {
            this.lastRenderedContent += tpl(data[i]);
        }

        return this.lastRenderedContent;
    };

    LayoutManager.prototype.applyLayout = function(targetSelector) {
        this.lastRenderTarget = targetSelector || this.lastRenderTarget;

        var container = $(this.lastRenderTarget);

        container.empty();
        container.html(this.lastRenderedContent);
    };
    
    return LayoutManager;
});

