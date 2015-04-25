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

Meteor.publish("shops", function () {
  return Meteor.users.find({
    isShop: true
  });
});

Meteor.publish("categories", function() {
   return Categories.find();
});
Meteor.publish("cart", function() {
   return Cart.find();
});
Meteor.publish("cartitems", function() {
   return CartItems.find();
});
