Router.route('/', function () {
  this.render('BT');
},{
  name: 'BT'
});

Router.route('/confirmation', function () {
  this.render('confirmation');
},{
  name: 'confirmation'
});