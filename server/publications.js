Meteor.publish("shop", function (shopId) {

  if (shopId) {
    return Meteor.users.find({
      _id: shopId,
      'profile.isShop': true
    }, {fields: {'profile.sales': 0}});

  } else {
    this.ready();
  }
});

Meteor.publish("myshops", function () {
  if (this.userId) {
    return Meteor.users.find(this.userId, {fields: {'profile.sales': 1}});
  } else {
    this.ready();
  }
});

Meteor.publish("shops", function () {
    return Meteor.users.find({
      'profile.isShop': true
    }, {fields: {'profile.sales': 0}});
});

Meteor.publish("cartitems", function() {
   return CartItems.find();
});
