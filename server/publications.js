Meteor.publish("menus", function (shopId) {
  if (shopId) {
    return Menus.find({shopId: shopId});
  } else {
    this.ready();
  }
});

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
