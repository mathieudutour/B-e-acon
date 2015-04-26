Meteor.subscribe("cartitems");
Meteor.subscribe("shops");

Tracker.autorun( function() {
	Meteor.subscribe("menus", Session.get("shopId"));
	Meteor.subscribe("shop", Session.get("shopId"));
});
