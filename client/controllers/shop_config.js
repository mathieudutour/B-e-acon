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
    e.preventDefault();
    Meteor.users.update(Meteor.userId(), {$push: {"profile.sections":{name: "", description: "", items: [], _id: new Mongo.ObjectID()}}})
  },
});

Template.shop_config.helpers({
  companyName: function () {
    return Meteor.user().profile.name;
  },
  sections: function () {
    return Meteor.user().profile.sections;
  },
});

Template.menuList.events({
  "click #nextItem": function (e, t) {
    e.preventDefault();
    console.log(t.data._id);
    var newSections = Meteor.user().profile.sections.map(function(section){
      if(EJSON.equals(section._id, t.data._id)) {
       section.items.push({name: "", price: "", _id: new Mongo.ObjectID(), description: ""}); 
      }
      return section;
    });
    Meteor.users.update(Meteor.userId(), {$set: {"profile.sections": newSections}})
  },
  "click #removeSection": function(e, t) {
    e.preventDefault();
    var newSections = Meteor.user().profile.sections.filter(function(section){
      return !EJSON.equals(section._id, t.data._id)
    });
    Meteor.users.update(Meteor.userId(), {$set: {"profile.sections": newSections}})
  },
  "click .removeItem": function(e, t) {
    e.preventDefault();
    var newSections = Meteor.user().profile.sections.map(function(section){
      if(EJSON.equals(section._id, t.data._id)) {
        section.items = section.items.filter(function(item){
         return item._id.toString() == e.currentTarget.i;
        });
      }
      return section;
    });
  },
});
