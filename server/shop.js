Meteor.publish("categories", function() {
   return Categories.find(); 
});
Meteor.publish("subcategories", function() {
   return SubCategories.find(); 
});
Meteor.publish("products", function() {
   return Products.find(); 
});
Meteor.publish("cart", function() {
   return Cart.find(); 
});
Meteor.publish("cartitems", function() {
   return CartItems.find(); 
});
Meteor.methods(
  {
    "addToCart": function(qty, product, session) {
      qty=parseInt(qty, 10);
    if(qty>0){
        if(CartItems.find({product:product, sessid: session}).count() > 0)
        {
          
          CartItems.update({product: product, sessid: session},{$inc: {qty:parseInt(qty, 10)}});
        }
        else
        {
          CartItems.insert({qty:qty, product:product, sessid: session});
        }
    }
    else {
        console.log("qty <= 0");
    }
  },
    "removeCartItem": function(id) {
      CartItems.remove({_id:id});
//      console.log(id);
    }
});
Meteor.startup(function(){
    if(Products.find().count() === 0) {
        Products.insert({thumb:'ipa.png', name:'Brewdog', desc:'Decent one',
                         price: 7.5, catName:'EVEN BETTER ONES!!'});
        Products.insert({thumb:'storm.png', name:'STORM', desc:'FORCE',
                         price: 24, catName:'MORNING'});
        Products.insert({thumb:'lotr.png', name:'LOTR', desc:'MORDOR',
                         price: 16, catName:'MORNING'});
    }
    if(Categories.find().count() === 0) {
        
        var coid = Categories.insert({name:"COFFEE"});
        var beid = Categories.insert({name:"BEER"});
        SubCategories.insert({name:'MORNING',cat: coid});
        SubCategories.insert({name:'GOOD ONES', cat: beid});
        SubCategories.insert({name:'EVEN BETTER ONES!!', cat: beid});
//        console.log(SubCategories.findOne());
    }
});
