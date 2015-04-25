Session.setDefault('category', null);
Router.configure({
    layoutTemplate:'shoplayout',
    yieldTemplates:{
        'products':{to:'products'},
        'cart':{to:'cart'},
        'categories':{to:'categories'}
    }
});
Router.map(function(){
    this.route('/','shoplayout');
    this.route('products', {
        layoutTemplate:'shoplayout',
        path:'/:name',
        data: function() {
            console.log(this.params.name);
            Session.set('category',this.params.name);
        },
        template:'shoplayout'
    });
});
Template.registerHelper('currency', function(num){
  return '$' + Number(num).toFixed(2);
});