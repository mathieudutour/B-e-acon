Template.cart.helpers({
  'cartItems': function () {
    var shopCart = [];
    var total = 0;

    CartItems.find({session:Meteor.default_connection._lastSessionId})
      .forEach(function (cartitem) {
      cartitem.price = (parseFloat(cartitem.product.price) * cartitem.quantity);
      total += cartitem.price;
      shopCart.push(cartitem);
    });

    shopCart.subtotal = total;
    shopCart.tax = shopCart.subtotal * 0.06;
    shopCart.total = shopCart.subtotal + shopCart.tax;
    return shopCart;
  }
});

Template.cart.events({
  'click .removeci': function () {
    CartItems.remove({_id: this._id});
  }
});
