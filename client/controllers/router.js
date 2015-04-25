Template.router.helpers({
  landing_page: function() {
    return !Session.get('page') ||
      Session.get('page') === Router.Page.LANDING.index;
  },
  login_page: function() {
    return Session.get('page') === Router.Page.LOGIN.index;
  },
  shop_login_page: function() {
    return Session.get('page') === Router.Page.SHOP_LOGIN.index;
  },
  shop_config_page: function() {
    return Session.get('page') === Router.Page.SHOP_CONFIG.index;
  },
  shop_menu_page: function() {
    return Session.get('page') === Router.Page.SHOP_MENU.index;
  }
});
