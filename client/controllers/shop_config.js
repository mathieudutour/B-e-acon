Template.shop_config.onRendered(function () {
  $('#colorpicker').farbtastic(function (color) {
    if (Session.get("currentPicker")) {
      $('#'+Session.get("currentPicker")).val(color);
      $("#show"+Session.get("currentPicker")).css("background-color", color);
    }
  });

});

Template.shop_config.events({
  "click #settings": function (e, t) {
    Session.set('currentTab', "settings");
  },
  "click #colors": function (e, t) {
    Session.set('currentTab', "colors");
  },
  "click #menu": function (e, t) {
    Session.set('currentTab', "menu");
  },
  "click #sales": function (e, t) {
    Session.set('currentTab', "sales");
  },
  "click #colorBackground": function (e, t) {
    Session.set('currentPicker', "colorBackground");
  },
  "change #colorBackground": function (e, t) {
    $('#colorBackground').css("background-color", e.currentTarget.value);
  },
  "click #colorMain": function (e, t) {
    Session.set('currentPicker', "colorMain");
  },
  "click #colorText": function (e, t) {
    Session.set('currentPicker', "colorText");
  },
  "click #nextSection": function (e, t) {
    e.preventDefault();
    Meteor.users.update(Meteor.userId(), {$push: {"profile.sections":
          {name: "", description: "", items: [], _id: new Mongo.ObjectID()}}});
  },
  "submit form": function (e, t) {
    event.preventDefault();
    
    Meteor.users.update(Meteor.userId(), {$set: {"profile.name": t.find("#companyName").value}});
    
    Meteor.users.update(Meteor.userId(), {$set: {"profile.info": 
          {motto: t.find('#companyMotto').value, backgroundColor: t.find('#colorBackground').value, mainColor: t.find('#colorMain').value,              textColor: t.find('#colorText').value, beacon: t.find('#beaconID').value}}});
    
    var sections = Meteor.user().profile.sections;
    sections.map(function(section){
      var idSection = section._id._str;
      
      section.name = t.find('#name_'+idSection).value;
      section.description = t.find('#description_'+idSection).value;
      section.items = section.items.map(function(item){
        var idItem = item._id._str;
        item.name = t.find('#name_'+idItem).value;
        item.description = t.find('#description_'+idItem).value;
        item.price = t.find('#price_'+idItem).value;
        item.url = t.find('#url_'+idItem).value;
        return item;
      })
      return section;
    });
    Meteor.users.update(Meteor.userId(), {$set: {"profile.sections": sections}});
  },
});

Template.shop_config.helpers({
  companyName: function () {
    return Meteor.user().profile.name;
  },
  sections: function () {
    return Meteor.user().profile.sections;
  },
  companyMotto: function() {
    return Meteor.user().profile.info.motto;
  },
  beacon: function() {
    return Meteor.user().profile.info.beacon;
  },
  colorBackground: function() {
    return Meteor.user().profile.info.backgroundColor;
  },
  colorMain: function() {
    return Meteor.user().profile.info.mainColor;
  },
  colorText: function() {
    return Meteor.user().profile.info.textColor;
  },
  settings: function() {
    return Session.get('currentTab') !== 'colors' && Session.get('currentTab') !== 'menu' && Session.get('currentTab') !== 'sales';
  },
  colors: function() {
    return Session.get('currentTab') === 'colors';
  },
  menu: function() {
    return Session.get('currentTab') === 'menu';
  },
  sales: function() {
    return Session.get('currentTab') === 'sales';
  },
  
});

Template.menuList.events({
  "click .nextItem": function (e, t) {
    e.preventDefault();
    var newSections = Meteor.user().profile.sections.map(function(section){
      if(EJSON.equals(section._id, t.data._id)) {
       section.items.push({name: "", price: "", _id: new Mongo.ObjectID(), description: "", url: ""});
      }
      return section;
    });
    Meteor.users.update(Meteor.userId(), {$set: {"profile.sections": newSections}});
  },
  "click .removeSection": function(e, t) {
    e.preventDefault();
    var newSections = Meteor.user().profile.sections.filter(function(section){
      return !EJSON.equals(section._id, t.data._id);
    });
    Meteor.users.update(Meteor.userId(), {$set: {"profile.sections": newSections}});
  },
  "click .removeItem": function(e, t) {
    e.preventDefault();
    var newSections = Meteor.user().profile.sections.map(function(section){
      if(EJSON.equals(section._id, t.data._id)) {
        section.items = section.items.filter(function(item){
          return item._id.toString() !== e.currentTarget.id;
        });
      }
      return section;
    });
    Meteor.users.update(Meteor.userId(), {$set: {"profile.sections": newSections}});
  },
  "click .toggleSection": function(e, t) {
    e.preventDefault();
    Session.set('hideSectionItems'+t.data._id._str, "true");
  }
});

Template.menuList.helpers({
  hideItems: function() {
    console.log(this);
    //if(Session.get('hideSectionItems'+this.data._id._str){
       //console.log("kdfv,jkdfvbdklgkfgbdzgkjdngzdjk");
    //}
  },
});
