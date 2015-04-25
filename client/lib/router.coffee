@Router = {}
@Router.Page =
  LANDING:
    index: 0
    url: '/'
    default: true
  LOGIN:
    index: 1
    url: '/login'
  SHOP_LOGIN:
    index: 2
    url: '/shop/login'
  SHOP_CONFIG:
    index: 3
    protected: true
    url: '/shop/admin'
  SHOP_MENU:
    index: 4
    protected: true
    url: '/shop/'

Meteor.startup () ->
  paths = window.location.pathname
  page = _.where Router.Page, {url: paths}
  if page? and page.length > 0
    if page.length is 1
      Router._moveToPage page[0].index
    else # paths is '/'
      Router._moveToPage Router.Page.LANDING.index
  else
    paths = paths.split('/')
    paths.shift()
    if paths.length > 0
      if "/#{paths[0]}/" is Router.Page.SHOP_MENU.url
        Session.set('shopId', paths[1])
        Router._moveToPage Router.Page.SHOP_MENU.index
    else
      Router._moveToPage Router.Page.LANDING.index

window.addEventListener('popstate', (e) ->
  page = e.state
  if !page?
    Router._moveToPage Router.Page.CARDS
  else
    Session.set('shopId', page.shopId)
    Router._moveToPage page.pageIndex
)

@Router._moveToPage = (index) ->
  #GAnalytics.pageview()
  Session.set('previous_page', Session.get('page'))
  Session.set('page', index)
  if index < Session.get('previous_page')
    if Session.get('direction') is 'to-right'
      Session.set('direction', 'to-right-bis')
    else
      Session.set('direction', 'to-right')
  else if index > Session.get('previous_page')
    if Session.get('direction') is 'to-left'
      Session.set('direction', 'to-left-bis')
    else
      Session.set('direction', 'to-left')
  else
    Session.set('direction', null)

@Router.goToPage = (page, shopId) ->
  Session.set('shopId', shopId)
  url = page.url + if shopId? then shopId else ""
  history.pushState({pageIndex: page.index, shopId: shopId}, null, url)
  Router._moveToPage page.index

@Router.goToPreviousPage = () ->
  page = _.findWhere Page, {index: Session.get('previous_page')}
  Router.goToPage page, null


@Router.goToLeft = () ->
  page = _.findWhere Page, {index: Math.min(Math.max(Session.get('page') - 1, 0), 4)}
  Router.goToPage page, null
@Router.goToRight = () ->
  page = _.findWhere Page, {index: Math.min(Math.max(Session.get('page') + 1, 0), 4)}
  Router.goToPage page, null

@Router.isCurrentPage = (page) ->
  Session.get('page') is page.index
