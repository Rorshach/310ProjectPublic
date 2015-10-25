///<reference path='../../types/DefinitelyTyped/node/node.d.ts'/>
/// <reference path='../../types/DefinitelyTyped/express/express.d.ts'/>
var User = (function () {
    function User(userName, userEmail) {
        this.userName = userName;
        this.userEmail = userEmail;
    }
    User.prototype.getName = function () {
        return this.userName;
    };
    User.prototype.getEmail = function () {
        return this.userEmail;
    };
    return User;
})();
exports.User = User;
