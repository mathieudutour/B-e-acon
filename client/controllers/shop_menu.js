Session.set('section', null);

Template.shop_menu.helpers({
  shop: function () {
    return Meteor.users.findOne({_id: Session.get('shopId')});
  },
  section: function () {
    var shop = Meteor.users.findOne({_id: Session.get('shopId')});
    var section = shop && shop.profile.sections.filter(function(_section) {
      return _section._id.toString() === Session.get('section');
    })[0];
    return section && section.name;
  }
});

Template.shop_menu.events({
  'click .back': function () {
    if(Session.get('section')) {
      Session.set('section', null);
    } else {
      Router.goToPage(Router.Page.LANDING);
    }
  }
});

Template.sections.helpers({
  sections: function () {
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
  }
});

Template.product.events({
  'submit': function (e, t) {
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
