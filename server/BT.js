var gateway;
Meteor.startup(function () {
  var braintree = Meteor.npmRequire('braintree');
  gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    publicKey: Meteor.settings.BT_PUBLIC_KEY,
    privateKey: Meteor.settings.BT_PRIVATE_KEY,
    merchantId: Meteor.settings.BT_MERCHANT_ID
  });
});

Meteor.methods({
  getClientToken: function (clientId) {
    var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);
    var options = {};

    if (clientId) {
      options.clientId = clientId;
    }

    var response = generateToken(options);

    return response.clientToken;
  },
  createTransaction: function (data, session) {
    var cartItems = CartItems.find({
      session: session
    }).fetch();
    var total = cartItems.reduce(function (a, b) {
      return a + parseFloat(b.product.price) * b.quantity;
    }, 0);
    if (total !== data.price) {
      throw new Meteor.Error("dont-try-to-screw-us",
        "Go fuck yourself");
    }
    var transaction = Meteor.wrapAsync(gateway.transaction.sale, gateway.transaction);
    // this is very naive, do not do this in production!


    var response = transaction({
      amount: data.price,
      paymentMethodNonce: data.nonce,
      customer: {
        firstName: data.firstName,
        lastName: data.lastName
      }
    });

    Meteor.users.update(data.shopId, {$push: {'profile.sales': {
      amount: data.price,
      _id: data.nonce,
      customer: {
        firstName: data.firstName,
        lastName: data.lastName
      },
      timestamp: new Date(),
      items: cartItems
    }}});

    return response;
  }
});
