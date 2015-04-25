Template.shop_config.onRendered( function() {
  $('#colorpicker').farbtastic(function(color){
    if (Session.get("currentPicker")) {
      $(Session.get("currentPicker")).val(color);
      $(Session.get("currentPicker")).css("background-color", color);
    }
  });
});

Template.shop_config.events({
  "click #colorBackground": function(e, t) {
    Session.set('currentPicker', "#colorBackground");
  },
  "click #colorMain": function(e, t) {
    Session.set('currentPicker', "#colorMain");
  },
  "click #colorText": function(e, t) {
    Session.set('currentPicker', "#colorText");
  }
});
