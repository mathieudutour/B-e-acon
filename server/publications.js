Meteor.publish("shop", function (shopId) {

  if (shopId) {
    return Meteor.users.find({
      _id: shopId,
      isShop: true
    });

  } else {
    this.ready();
  }
});

Meteor.publish("shops", function (beaconIds) {
  console.log(JSON.parse(beaconIds));
  if (beaconIds) {
    return Meteor.users.find({
      isShop: true,
      "profile.info.beacon": {$in: JSON.parse(beaconIds)}
    });
  } else {
    this.ready();
  }
});

Meteor.publish("categories", function() {
   return Categories.find();
});
Meteor.publish("cartitems", function() {
   return CartItems.find();
});
