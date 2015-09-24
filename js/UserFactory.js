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
};