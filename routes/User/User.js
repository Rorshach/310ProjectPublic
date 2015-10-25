module.exports = {
  User: function () {
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
    }
};
