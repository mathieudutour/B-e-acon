Meteor.startup(function () {
  if (Categories.find().count() === 0) {
    Categories.insert({
      name: "COFFEE",
      items: [
        {
          _id: new Mongo.ObjectID(),
          thumb: 'storm.png',
          name: 'STORM',
          desc: 'FORCE',
          price: 24
        },
        {
          thumb: 'lotr.png',
          name: 'LOTR',
          desc: 'MORDOR',
          price: 16
        }
        ]
    });
    Categories.insert({
      name: "BEER",
      items: [
        {
          _id: new Mongo.ObjectID(),
          thumb: 'ipa.png',
          name: 'Brewdog',
          desc: 'Decent one',
          price: 7.5
        }
        ]
    });
  }
});
