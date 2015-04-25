Meteor.subscribe("shops");
Meteor.subscribe("categories");
Meteor.subscribe("cart");
Meteor.subscribe("cartitems");
//Meteor.subscribe("addToCard");



Tracker.autorun( function() {
	Meteor.subscribe("menus", Session.get("shopId"));
	Meteor.subscribe("shop", Session.get("shopId"));
});
