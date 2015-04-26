Meteor.subscribe("cartitems");
//Meteor.subscribe("shops");
Tracker.autorun( function() {
  console.log(Session.get("beaconsIDs"));
  Meteor.subscribe("shops", Session.get("beaconsIDs"));
});

Tracker.autorun( function() {
	Meteor.subscribe("menus", Session.get("shopId"));
	Meteor.subscribe("shop", Session.get("shopId"));
});
