Session.set('paymentFormStatus', null);
var isBraintreeInitialized = false;

// note: it is highly recommended to _not_
// do things this way and instead use one of the many
// meteor libraries
// TODO: do this better
function getPrice(sessid){
  var prods = CartItems.find(sessid);
  alert(JSON.stringify(prods));
  prods.forEach(function(entry) {
    alert(entry.qty);
  });

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
      Meteor.call('createTransaction', data, function (err, result) {
        Session.set('paymentFormStatus', null);
        Router.go('confirmation');
      });
    }
  });

  isBraintreeInitialized = true;
}
Template.BT.events({
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
});
//Template.product.events({
//    'click .addcart':function(evt,tmpl){
//        var qty = tmpl.find('.prodqty').value;
//        var product = this._id;
//        var sessid = Meteor.default_connection._lastSessionId;
//        Meteor.call('addToCart',qty,product,sessid);
//       // console.log(qty + " " + product + " " + sessid);
//    }


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
