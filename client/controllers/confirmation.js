Template.confirmation.helpers({
  confNumber: function () {
    var conf = CartItems.find({
      session: Meteor.default_connection._lastSessionId
    }).fetch();
//    return conf._id;
    return "nananana BATMAN";
  }
});