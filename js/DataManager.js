function DataManager() {
    this.lastDataReceived = {};
}

DataManager.prototype.getById = function(id) {
    return this.lastDataReceived[id];
};

DataManager.prototype.load = function(url) {
    return $.ajax({
        url: "http://jsonplaceholder.typicode.com/users",
        dataType: "jsonp",
        jsonp: "callback",
        success: function(data) {
            console.log(data, 1);
            
            this.lastDataReceived = {};
            
            var i = 0;
            for (i; i<data.length; i++) {
                this.lastDataReceived[data[i].id] = data[i];
            }
        }.bind(this)
    });
};