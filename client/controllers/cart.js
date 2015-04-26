Template.cart.helpers({
  'cartItems': function () {
    var shopCart = [];
    var total = 0;

    CartItems.find({
        session: Meteor.default_connection._lastSessionId
      })
      .forEach(function (cartitem) {
        cartitem.price = parseFloat(cartitem.product.price) * cartitem.quantity;
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
  },
  'notPayNow':function(){
    return !Session.get('payNow');
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

Session.set('paymentFormStatus', null);

function getPrice(sessid){
  var cartItems = CartItems.find({session: sessid}).fetch();
  var total = cartItems.reduce(function (a, b) {
    return a + parseFloat(b.product.price) * b.quantity;
  }, 0);
  return total;
}

function serializeForm ($form) {
  var $inputs = $form.find('input, select, textarea');

  return _.reduce($inputs, function (data, input) {
    var name = input.name;

    if (name) {
      data[name] = input.value;
    }

    data.price = getPrice(Meteor.default_connection._lastSessionId);
    return data;
  }, {});
}

function initializeBraintree (clientToken) {
  braintree.setup(clientToken, 'dropin', {
    container: 'dropin',
    paymentMethodNonceReceived: function (event, nonce) {
      Session.set('paymentFormStatus', true);

      // we've received a payment nonce from braintree
      // we need to send it to the server, along with any relevant form data
      // to make a transaction
      var data = serializeForm($('#checkout'));
      data.nonce = nonce;
      Meteor.call('createTransaction', data,
                  Meteor.default_connection._lastSessionId,
                  function (err, result) {
        console.log(err, result);
        Session.set('paymentFormStatus', null);
        if (result.success) {
          Router.goToPage(Router.Page.CONFIRMATION, Session.get('shopId'));
        }
      });
    }
  });
}


Template.BT.helpers({
  paymentFormStatusClass: function () {
    return Session.get('paymentFormStatus') ? 'payment-form__is-submitting' : '';
  }
});

Template.BT.rendered = function () {
  Meteor.call('getClientToken', function (err, clientToken) {
    if (err) {
      console.log('There was an error', err);
      return;
    }

    initializeBraintree(clientToken);
  });
};

