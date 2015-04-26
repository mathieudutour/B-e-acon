Template.landing.helpers({
  shops: function() {
//    return Meteor.users.find({isShop: true,"profile.info.beacon":
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
  }
});

Template.shop_item.events({
  "click .shop": function(e, t) {
    Router.goToPage(Router.Page.SHOP_MENU, t.data._id);
  }
});
