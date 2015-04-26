Meteor.publish("shop", function (shopId) {

  if (shopId) {
    return Meteor.users.find({
      _id: shopId,
      'profile.isShop': true
    });

  } else {
    this.ready();
  }
});

Meteor.publish("shops", function (beaconIds) {
  if (beaconIds) {
    console.log(beaconIds)
    return Meteor.users.find({
      'profile.isShop': true,
      "profile.info.beacon": {$in: JSON.parse(beaconIds).map(function(id){
        return "" + id;
      })}
    });
  } else {
    this.ready();
  }
});
//
//Meteor.publish("shops", function () {
//    return Meteor.users.find({
//      isShop: true
//    });
//});

Meteor.publish("cartitems", function() {
   return CartItems.find();
});
