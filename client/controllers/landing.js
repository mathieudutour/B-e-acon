Template.landing.helpers({
  shops: function() {
    var beacons = Session.get('beaconIds');
    if (beacons) {
      console.log(beacons);
      beacons = JSON.parse(beacons);
      beacons = beacons.map(function(id){return "" + id;});
      return Meteor.users.find({'profile.isShop': true,
        "profile.info.beacon": {$in: beacons}}).fetch();
    } else {
      return null;
    }
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
