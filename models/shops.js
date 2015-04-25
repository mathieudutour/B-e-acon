Menus = new Mongo.Collection("menus");

Menus.allow({
  insert: function (userId, doc) {
    check(doc.userId, String);
    return doc.shopId === userId && !Menus.findOne({
      shopId: doc.shopId
    });
  },
  update: function (userId, doc, fields, modifier) {
    return userId && doc.shopId === userId;
  },
  remove: function (userId, doc) {
    return false;
  }
});

/*

{
	_id,
	shopId,
	items,
	createdAt,
	connectionId

}

*/
