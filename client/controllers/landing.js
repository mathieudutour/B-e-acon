Template.landing.helpers({
  shops: function() {
//    return Meteor.users.find({'profile.isShop': true, "profile.info.beacon":
//                       {$in: JSON.parse(Session.get('beaconIds'))
//                        .map(function(id){
//        return "" + id;
//      })}});
    var beacons = Session.get('beaconIds');
    console.log(beacons);
    beacons = JSON.parse(beacons);
    beacons = beacons.map(function(id){return "" + id;});
    return Meteor.users.find({'profile.isShop': true,
      "profile.info.beacon": {$in: beacons}});
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
