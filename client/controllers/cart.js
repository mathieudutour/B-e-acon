Template.cart.helpers({
  'cartitems': function () {
    var shopCart = [];
    var cartItems = CartItems.find({session:
                                    Meteor.default_connection._lastSessionId});
    var total = 0;

    cartItems.forEach(function (cartitem) {
      cartitem.price = (parseFloat(cartitem.product.price) * cartitem.quantity);
      total += cartitem.price;
      shopCart.push(cartitem);
    });
    shopCart.subtotal = total;
    shopCart.tax = shopCart.subtotal * .06;
    shopCart.total = shopCart.subtotal + shopCart.tax;
    return shopCart;
  }
});

Template.cart.events({
  'click .removeci': function () {
    CartItems.remove({_id: this._id});
  }
});
