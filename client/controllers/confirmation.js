Template.confirmation.helpers({
  confNumber: function () {
    var conf = CartItems.findOne({
      "session": Meteor.default_connection._lastSessionId
    });
//    console.log(conf);
//    console.log(Meteor.default_connection._lastSessionId);
    return conf._id;
//    return "nananana BATMAN";
  }
});
