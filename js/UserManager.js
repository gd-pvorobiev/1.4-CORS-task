function UserManager() {
    this.lastDataReceivedHash = {};
    this.lastDataReceived = [];
    this.userFactory = new UserFactory(User);
}

UserManager.prototype.getById = function(id) {
    return this.lastDataReceivedHash[id];
};

UserManager.prototype.search = function(str) {
    return this.lastDataReceived.filter(function(item) {
        return item.filter(str);
    }, this);
}

UserManager.prototype.load = function(url) {
    return $.ajax({
        url: "http://jsonplaceholder.typicode.com/users",
        dataType: "jsonp",
        jsonp: "callback",
        success: function(data) {
            this.lastDataReceived = this.userFactory.buildFromDataSet(data);
            this.lastDataReceivedHash = {};
            
            var i = 0;
            for (i; i<data.length; i++) {
                this.lastDataReceivedHash[data[i].id] = data[i];
            }
        }.bind(this)
    });
};