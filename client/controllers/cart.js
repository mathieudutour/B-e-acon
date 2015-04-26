Template.cart.helpers({
  'cartItems': function () {
    var shopCart = [];
    var total = 0;

    CartItems.find({
        session: Meteor.default_connection._lastSessionId
      })
      .forEach(function (cartitem) {
        cartitem.price = (parseFloat(cartitem.product.price) * cartitem.quantity);
        total += cartitem.price;
        shopCart.push(cartitem);
      });

    shopCart.subtotal = total;
    shopCart.tax = shopCart.subtotal * 0.06;
    shopCart.total = shopCart.subtotal + shopCart.tax;
    return shopCart;
  },
  'checkoutActive':function(){
    return Session.get('checkoutActive');
  },
  'payNow':function(){
    return Session.get('payNow');
  }
});

Template.cart.events({
  'click .removeci': function () {
    CartItems.remove({
      _id: this._id
    });
  },
  'click .checkout__button': function (ev) {
    ev.preventDefault();
    Session.set('checkoutActive',true);

  },
  'click .checkout__cancel': function (ev) {
    ev.preventDefault();
    Session.set('checkoutActive',false);
    Session.set('payNow', false);
  },
  'click .pay-now-btn': function(ev) {
    ev.preventDefault();
    Session.set('payNow',true);
  }
});
