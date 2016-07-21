/*******************/
/***** Model *******/
/*******************/
var data = {
  cats : [
    {name : 'Peggy', img: 'img/cat1.jpg'},
    {name : 'Sarasvati', img: 'img/cat2.jpg'},
    {name : 'Pierrot', img: 'img/cat3.jpg'},
    {name : 'Brahma', img: 'img/cat4.jpg'},
    {name : 'Shakti', img: 'img/cat5.jpg'}
  ],
  levels : [
    {'clicks': 0, 'name': 'Newborn'},
    {'clicks': 10, 'name': 'Infant'},
    {'clicks': 50, 'name': 'Teen'}
  ]
}

var Cat = function(cat_data){
  this.clickCount = ko.observable(0);
  this.name = ko.observable(cat_data.name);
  this.imgSrc = ko.observable(cat_data.img);

  this.level = ko.computed(function(){

    for(l=data.levels.length;l>0;l--){
      level = data.levels[l-1];
      if(level['clicks']<=this.clickCount()){
        return level['name'];
      }
    }
    // if found nothing, return first level
    return data.levels[0]['name'];
  }, this);
}

var ViewModel = function() {
  var self = this;

  this.form_admin_open = ko.observable(false);
  this.cats = ko.observableArray([]);

  data.cats.forEach(function(catItem){
    self.cats.push(new Cat(catItem));
  });
  this.currentCat = ko.observable(self.cats()[0]);
  this.formCat = null;

  this.incrementCounter = function(){
    // Calling this from inside a currentCat binding context
    // this --> currentCat()
    //this.clickCount(this.clickCount() + 1);

    // Or: Calling self.currentCat()
    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  };

  this.setCurrentCat = function(){
    self.currentCat(this);
  };

  this.open_form_admin = function(){
    self.form_admin_open(true);
  };

  this.close_form_admin = function(){
    self.form_admin_open(false);
  };

  this.save_form = function(data,event){
    self.currentCat().name(self.formCat.name());
    self.currentCat().clickCount(parseInt(self.formCat.clickCount()));
  };
}

ko.applyBindings(new ViewModel());
