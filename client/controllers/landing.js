Template.landing.helpers({
  shops: function() {
    Meteor.users.find({isShop: true});
  }
});

Template.landing.events({
  "click #login": function() {
    Router.goToPage(Router.Page.LOGIN);
  },
  "click #login-shop": function() {
    Router.goToPage(Router.Page.SHOP_LOGIN);
  }
});
