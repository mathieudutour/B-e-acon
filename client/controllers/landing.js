Template.landing.helpers({
  shops: function() {
//  return Meteor.users.find({isShop: true,"profile.info.beacon":
//                       {$in: JSON.parse(Session.get('beaconIds'))}});
    return Meteor.users.find({isShop: true});
  }
});

Template.landing.events({
  "click #login": function() {
    Router.goToPage(Router.Page.LOGIN);
  },
  "click #login-shop": function() {
    Router.goToPage(Router.Page.SHOP_LOGIN);
  },
  "click .shop": function(e) {
    Router.goToPage(Router.Page.SHOP_MENU, e.currentTarget.id);
  }
});
