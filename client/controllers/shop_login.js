Template.shop_login.events({
  "submit #login-form": function(e, t) {
    e.preventDefault();
    var button = new ProgressButton("button-login");
    utils.initFormErrors(t);

    var email = t.find('#login-email').value.trim();
    var password = t.find('#login-password').value;

    Meteor.loginWithPassword(email, password, function(err) {
      if (err) {
        button.error();
        console.log(err);
        if (err.reason === "User not found" || err.reason === "Match failed") {
          Meteor.setTimeout( function() {
            utils.showErrorForm(document.getElementById('user-not-found'));
          }, 200);
        } else if (err.reason === "Incorrect password") {
          Meteor.setTimeout( function() {
            utils.showErrorForm(document.getElementById('password-incorrect'));
          }, 200);
        } else {
          Meteor.setTimeout( function() {
            utils.showErrorForm(document.getElementById('error-serveur'));
          }, 200);
        }
      } else {
        button.success(true, function() {
          Router.goToPage(Router.Page.SHOP_CONFIG);
        });
      }
    });
    return false;
  },
  "submit #signup-form": function(e, t) {
    e.preventDefault();
    var button = new ProgressButton("button-signup");
    utils.initFormErrors(t);

    var email = t.find('#account-email').value.trim();
    var password = t.find('#account-password').value;
    var name = t.find('#account-name').value;

    if (!isValidPassword(password)) {
      utils.showErrorForm(t.find('#password-too-short'));
      button.error();
    } else if (isTooShortName(name)) {
      utils.showErrorForm(t.find('#name-too-short'));
      button.error();
    } else if (isTooLongName(name)) {
      utils.showErrorForm(t.find('#name-too-long'));
      button.error();
    } else {
      Accounts.createUser({email: email,
                           password : password,
                           profile : {name: name, sections: []}}, function(err){
        if (err) {
          button.error();
          console.log(err);
          if (err.reason === "Email already exists.") {
            Meteor.setTimeout( function() {
              utils.showErrorForm(document.getElementById('already-a-account'));
            }, 200);
          } else if (err.reason === "Need to set a username or email") {
            Meteor.setTimeout( function() {
              utils.showErrorForm(document.getElementById('not-an-email'));
            }, 200);
          } else {
            Meteor.setTimeout( function() {
              utils.showErrorForm(
                document.getElementById('error-serveur-register')
              );
            }, 200);
          }
        } else {
          button.success(true, function () {
            Router.goToPage(Router.Page.SHOP_CONFIG);
          });
        }
      });
    }
    return false;
  }
});

function isValidPassword(val) {
  return val.length >= 6;
}
function isTooShortName(val) {
  return val.length < 2;
}
function isTooLongName(val) {
  return val.length > 25;
}
