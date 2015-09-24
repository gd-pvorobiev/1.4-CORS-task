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
