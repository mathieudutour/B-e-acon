Template.landing.helpers({
  shops: function() {
    Meteor.users.find({isShop: true,"profile.info.beacon":
                       {$in: JSON.parse(Session.get('beaconIds'))}});
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
