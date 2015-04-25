Template.landing.helpers({
  shops: function() {
    Meteor.users.find({isShop: true});
  }
});

Template.landing.events({
  "click #login": function(e, t) {
    Router.goToPage(Router.Page.LOGIN);
  },
  "click #login-shop": function(e, t) {
    Router.goToPage(Router.Page.SHOP_LOGIN);
  }
});
