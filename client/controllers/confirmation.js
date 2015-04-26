Template.confirmation.helpers({
  confNumber: function () {
    var conf = CartItems.findOne({
      "session": Meteor.default_connection._lastSessionId
    });
    return conf._id;
  }
});

Template.confirmation.events({
  "click button": function () {
    Router.goToPage(Router.Page.LANDING);
  }
});
