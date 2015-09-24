setCardsLayout = function() {
}

setRowsLayout = function() {
}

setSearchCriteria = function() {
}

setHandlers = function(userManager) {
    $('.contentWrapper').off("click");
    $('.contentWrapper').on("click", "button", function() {
       var item = $(this).parentsUntil("div[id^='item-']").parent();
       var id = item.attr("id").split("-")[1];
       var user = userManager.getById(id);
       var tpl = Handlebars.compile($('#userInfoModalTemplate').html())
       $(tpl(user)).modal();
    });
};

function init() {
    var layoutManager = new LayoutManager();
    var userManager = new UserManager();
    var data = [];
    
    layoutManager.showSpinner();
    userManager.load().then(function(d) {
        data = d;
        layoutManager.renderLayout("row", data);
        layoutManager.applyLayout("#rowsLayout");
        setHandlers(userManager);
        layoutManager.hideSpinner();
    });
    
    layoutManager.addLayout("card", "userCardCardsLayout");
    layoutManager.addLayout("row", "userCardRowsLayout");
    
    setCardsLayout = function() {
        $(".contentWrapper").empty();
        
        var container = $("#cardsLayout");
        container.hide();
        
        layoutManager.renderLayout("card", data);
        layoutManager.applyLayout("#cardsLayout .contentWrapper");
        
        container.fadeIn("slow");
        setHandlers(userManager);
    };
    
    setRowsLayout = function() {
        $(".contentWrapper").empty();
        
        var container = $("#rowsLayout");
        container.hide();
        
        layoutManager.renderLayout("row", data);
        layoutManager.applyLayout("#rowsLayout");
        
        container.fadeIn("slow");
        setHandlers(userManager);
    };
    
    var searchTimeout = null;
    var searchDelay = 300;
    
    setSearchCriteria = function(str) {
        clearTimeout(searchTimeout);
        $(".contentWrapper").fadeOut(searchDelay);
        
        searchTimeout = setTimeout(function() {
            data = userManager.search(str);
            layoutManager.renderLayout(null, data);
            layoutManager.applyLayout();
            setHandlers(userManager);
            $(".contentWrapper").fadeIn(searchDelay);
            
        }, searchDelay);
     }
}

document.addEventListener("DOMContentLoaded", init);