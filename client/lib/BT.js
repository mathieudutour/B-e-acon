Session.set('paymentFormStatus', null);
var isBraintreeInitialized = false;

// note: it is highly recommended to _not_
// do things this way and instead use one of the many
// meteor libraries
// TODO: do this better
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
  if (isBraintreeInitialized) return;

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
        Router.goToPage(Router.Page.CONFIRMATION, Session.get('shopId'));
      });
    }
  });

  isBraintreeInitialized = true;
}
/*Template.BT.events({
  'submit .paymentBtn' : function(e){
    e.preventDefault();
    Session.set('paymentFormStatus', true);

    // we've received a payment nonce from braintree
    // we need to send it to the server, along with any relevant form data
    // to make a transaction
    var data = serializeForm($('#checkout'));
    data.nonce = nonce;
    Meteor.call('createTransaction', data, function (err, result) {

      console.log(data);
      Session.set('paymentFormStatus', null);
    });
  alert('bbb');
  }
});*/


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
