Session.set('section', null);

Template.sections.helpers({
  'sections': function () {
    var shop = Meteor.users.findOne({_id: Session.get('shopId')});
    return shop && shop.profile.sections;

  }
});

Template.sections.events({
  'click .section': function (e) {
    e.preventDefault();
    Session.set('section', e.currentTarget.id);
  }
});

Template.products.helpers({
  'productlist': function () {
    var shop = Meteor.users.findOne({_id: Session.get('shopId')});
    var section = shop && shop.profile.sections.filter(function(_section) {
      return _section._id.toString() === Session.get('section');
    })[0];
    return section && section.items;
  },
  'catnotselected': function () {
    return Session.equals('section', null);
  },
  'category': function () {
    return Session.get('section');
  }
});

Template.product.events({
  'click .addcart': function (e, t) {
    e.preventDefault();

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
