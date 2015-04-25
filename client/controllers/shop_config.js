Template.shop_config.onRendered(function () {
  $('#colorpicker').farbtastic(function (color) {
    if (Session.get("currentPicker")) {
      $(Session.get("currentPicker")).val(color);
      $(Session.get("currentPicker")).css("background-color", color);
    }
  });
});

Template.shop_config.events({
  "click #colorBackground": function (e, t) {
    Session.set('currentPicker', "#colorBackground");
  },
  "click #colorMain": function (e, t) {
    Session.set('currentPicker', "#colorMain");
  },
  "click #colorText": function (e, t) {
    Session.set('currentPicker', "#colorText");
  },
  "click #nextSection": function (e, t) {
    Meteor.users.update({_id: Meteor.userId()}, {"profile.sections": {$push: {name: "", description: ""}}})
  },
});

Template.shop_config.helpers({
  companyName: function () {
    //return Meteor.user().profile.name;
    return "nananana batman"
  },
  sections: function () {
    return Meteor.user().profile.sections;
  },
});
