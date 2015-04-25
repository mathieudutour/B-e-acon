Session.set('category', null);

Template.sections.helpers({
  'sections': function () {
    return Categories.find();

  }
});

Template.sections.events({
  'click .section': function (e) {
    e.preventDefault();
    Session.set('category', e.currentTarget.id);
  }
});

Template.products.helpers({
  'productlist': function () {
    var cat = Categories.findOne({
      _id: Session.get('category')
    });
    return cat && cat.items;
  },
  'catnotselected': function () {
    return Session.equals('category', null);
  },
  'category': function () {
    return Session.get('category');
  }
});

Template.product.events({
  'click .addcart': function (e, t) {
    var quantity = parseInt(t.find('.prodqty').value);
    if (isNaN(quantity) || quantity <= 0) {
      return false;
    }

    var product = t.data;
    var session = Meteor.default_connection._lastSessionId;
    var item = CartItems.findOne({product: product, session: session});
    if (item) {
      CartItems.update(item._id, {
        $inc: {
          quantity: quantity
        }
      });
    } else {
      CartItems.insert({
        quantity: quantity,
        product: product,
        session: session
      });
    }
  }
});
