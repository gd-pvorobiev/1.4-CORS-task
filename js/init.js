function User() {
    this.address = {}
    this.company = {};
    this.email = ""
    this.id = -1
    this.name = ""
    this.phone = ""
    this.username = ""
    this.website = ""
}

User.prototype.filter = function(str) {
    return ~this.name.toLowerCase().indexOf(str.toLowerCase()) || ~this.email.toLowerCase().indexOf(str.toLowerCase());
}

function UserFactory(userClass) {
    this.userClass = userClass;
}

UserFactory.prototype.build = function(data) {
    var obj = new this.userClass();
    
    obj["address"] = data["address"];
    obj["company"] = data["company"];
    obj["email"] = data["email"];
    obj["id"] = data["id"];
    obj["name"] = data["name"];
    obj["phone"] = data["phone"];
    obj["username"] = data["username"];
    obj["website"] = data["website"];
    
    return obj;
};

UserFactory.prototype.buildFromDataSet = function(dataSet) {
    var i = 0;
    var modelsList = [];
    
    for (i; i<dataSet.length; i++) {
        modelsList.push(this.build(dataSet[i]));
    }
    
    return modelsList;
}

setCardsLayout = function() {
}

setRowsLayout = function() {
}

setSearchCriteria = function() {
}

setHandlers = function(dataManager) {
    var userFactory = new UserFactory(User);
    
    $('.contentWrapper').off("click");
    $('.contentWrapper').on("click", "button", function() {
       var item = $(this).parentsUntil("div[id^='item-']").parent();
       var id = item.attr("id").split("-")[1];
       var user = userFactory.build(dataManager.getById(id));
       var tpl = Handlebars.compile($('#userInfoModalTemplate').html())
       $(tpl(user)).modal();
    });
};

function init() {
    var layoutManager = new LayoutManager();
    var dataManager = new DataManager();
    var userFactory = new UserFactory(User);
    var data = [];
    
    dataManager.load().then(function(d) {
        data = userFactory.buildFromDataSet(d);
        
        layoutManager.renderLayout("row", data);
        layoutManager.applyLayout("#rowsLayout");
        setHandlers(dataManager);
    });
    
    layoutManager.addLayout("card", "userCardCardsLayout");
    layoutManager.addLayout("row", "userCardRowsLayout");
    
    setCardsLayout = function() {
        var container = $("#cardsLayout");
        $(".contentWrapper").empty();
        layoutManager.renderLayout("card", data);
        
        container.hide();
        layoutManager.applyLayout("#cardsLayout .contentWrapper");
        container.fadeIn("slow");
        setHandlers(dataManager);
    }
    
    setRowsLayout = function() {
        var container = $("#rowsLayout");
        $(".contentWrapper").empty();
        layoutManager.renderLayout("row", data);
        container.hide();
        layoutManager.applyLayout("#rowsLayout");
        container.fadeIn("slow");
        setHandlers(dataManager);
    }
    
    var searchTimeout = null;
    var searchDelay = 300;
    
    setSearchCriteria = function(str) {
        clearTimeout(searchTimeout);
        $(".contentWrapper").fadeOut(searchDelay);
        
        searchTimeout = setTimeout(function() {
            layoutManager.setFilterString(str);
            $(".contentWrapper").fadeIn(searchDelay);
            setHandlers(dataManager);
        }, searchDelay);
     }
}

document.addEventListener("DOMContentLoaded", init);