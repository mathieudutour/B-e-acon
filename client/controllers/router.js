var routeHandler = {};

for(var route in Router.Page) {
  if (Router.Page.hasOwnProperty(route)) {
    var routeObj = Router.Page[route];
    routeHandler[route.toLowerCase() + "_page"] = function() {
      if (this.default && !Session.get('page')) { return true; }
      if (this.protected && !Meteor.userId()) { return false; }
      return Session.get('page') === this.index;
    }.bind(routeObj);
  }
}

Template.router.helpers(routeHandler);
