//back end logic
String.prototype.capitalizeFirstLetter = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
}

var capitalizeFirstLetters = function(sentence){
  var words = sentence.split("-");
  var capWords = words.map(function(word){
      return word.capitalizeFirstLetter();
  });
  return capWords.join (" ");
}

// Order Constructor
function Order(){
  this.pizza = [];
  this.total = 0.00;
}

// Order Prototypes
Order.prototype.addPizza = function (pizza) {
  this.pizza.push(pizza);
  this.total = (parseFloat(this.total) + parseFloat(pizza.price)).toFixed(2) ;
};

Order.prototype.getPizzalist = function () {
  return this.pizza;
};

// Pizza Constructor
function Pizza(id,size,price){
  this.id=id;
  this.size = size;
  this.price = price;
  this.toppings = [];
}

// Pizza Prototypes
Pizza.prototype.removeTopping = function (topping) {
  this.toppings.forEach(function(top,index){
    if (top.id === topping.id){
      this.toppings.splice(index,1);
    }
  });
  this.price = (parseFloat(this.price)  - parseFloat(topping.price)).toFixed(2);
};

Pizza.prototype.addTopping = function (topping) {
  this.toppings.push(topping);
  this.price = (parseFloat(this.price) +parseFloat(topping.price)).toFixed(2);
};


Pizza.prototype.getPizzaToppings = function () {
  return this.toppings;
};

// Size Constructor
function size (id,description,price){
  this.id = id;
  this.description = description;
  this.price = price;
}

// Topping Constructor
function Topping(type,id,name,price) {
  this.id = id;
  this.name= name;
  this.price = price;
  this.type = type;
}

// Fill Dropdown Lists
var listToppings = function () {
  var toppings =[["pepperoni",1.99], ["anchovies",2.99],  ["chicken",1.99], ["ground-beef",1.99], ["steak strips",1.99], ["salami",2.99], ["chorizo-sausage",2.99], ["bacon",0.99], ["roma-tomatoes",0.75], ["onions",0.5], ["spinach",0.89], ["broccoli",0.5], ["pineapple",0.99], ["jalapenos",1.29],  ["kalamata-olives",0.99], ["green-pepper",0.8], ["fresh-mushroom",0.75], ["green-olives",0.5],["roasted-garlic",0.99], ["habana-pepers",0.99], ["Sun-dried-tomatoes",0.8], ["grilled-zucchini",0.75],  ["aspargus",0.99], ["artichokes",0.99], ["potato",0.5], ["caramelized-onion",0.75], ["roasted-red-pepper",0.99]];
  for(var i =0; i< toppings.length;i++){
    var toppingName = capitalizeFirstLetters(toppings[i][0]);
    $("select#toppings").append("<option value = '" + i +"' class ='"+toppings[i][1]+"'>"+ toppingName +"</option>");
  }
}

var listCheeses = function () {
  var cheeses = [["feta",1.99], ["parmesan",2.49],[ "provolone",1.49], ["four",2.49], ["goat",2.99], ["mozzarella",1.49]];
  for(var i =0; i< cheeses.length;i++){
    var cheeseName = capitalizeFirstLetters(cheeses[i][0]);
    $("select#cheeses").append("<option value = '" + i +"' class ='"+cheeses[i][1]+"'>"+ cheeseName +" cheese</option>");
  }
}

var listextras = function () {
  var extras = [["extra-cheese",0.99], ["tomato-sauce",0.49], ["crust-cheese",1.99], ["pesto-sauce",1.49], ["hot-sauce",0.99], ["whole-grain-dough",1.99], ["gluten-free-dough",1.99]];
  for(var i =0; i< extras.length;i++){
    var extraName = capitalizeFirstLetters(extras[i][0]);
    $("select#extras").append("<option value = '" + i +"' class ='"+extras[i][1]+"'>"+ extraName +"</option>");
  }
}

//Display Functions
var listPizzas = function (pizzas){
  var htmlText = "<h2>Pizza: </h2>";
  var orderTotal = 0;
  pizzas.forEach(function(pizza,index){
    orderTotal = (parseFloat(orderTotal) +parseFloat(pizza.price)).toFixed(2);
    htmlText = htmlText +
              '<div class="row pizza-list" id="' + index + '">' +
                '<div class="col-xs-6">' +
                  '<p id="pizza-desc">' +
                    '<b>Size: </b>' + pizza.size.description +
                  '</p>' +
                '</div>' +
                '<div class="col-xs-6">' +
                  '<p id="pizza-price">' +
                    '<b>price:</b> $' + pizza.price +
                    ' <span id="' + index + '" class="details">Details</span>' +
                  '</p>' +
                '</div>' +
              '</div>';
  });
  htmlText = htmlText +
            '<div class="row" id="total-display">'+
              '<div class="col-md-6" >' +
                '<b>Order Total:</b> $' +
              '</div>' +
              '<div class="col-md-6" >' +
                '<p>' +
                  orderTotal; +
                '</p>' +
              '</div>' +
            '</div>';
  return htmlText;
}

var listTops = function (toppings){
  var htmlText = "<h2>Toppings: </h2>";
  var toppingTotal = 0;
  var pizzaId = this.id;
  toppings.forEach(function(topping,index){
    toppingTotal = (parseFloat(toppingTotal) +parseFloat(topping.price)).toFixed(2);
    htmlText = htmlText +
               '<div class="row topping-list" id="' + index + '">' +
                '<div class="col-xs-6">' +
                  '<p id="topping-desc">' +
                    '<b>topping: </b>' + topping.name +
                  '</p>' +
                '</div>' +
                '<div class="col-xs-6">' +
                  '<p id="topping-price">' +
                    '<b>price:</b> $' + topping.price +
                  '</p>' +
                '</div>' +
              '</div>';
  });
htmlText = htmlText +
          '<div class="row" id="total-display">'+
              '<div class="col-md-6" >' +
                '<b>Toppings Total:</b> $' +
              '</div>' +
              '<div class="col-md-6" >' +
                '<p>' +
                  toppingTotal; +
                '</p>' +
              '</div>' +
            '</div>';
return htmlText;
}

var refreshToppings = function(toppings) {
  $("#topping-display").empty();
  $("#topping-display").append(listTops(toppings));
  $("#topping-display").show();
}

var refreshPizzaList = function(pizzas){
  $("#pizza-display").empty();
  $("#pizza-display").append(listPizzas(pizzas));
  $("#pizza-display").show();
}

//front end logic
$(function (){
  listToppings();
  listCheeses();
  listextras();
  var newOrder = new Order();
  var id = 0;

  $("#select-size").click(function(){
    var selectedSize = $("select#size :selected").val();
    var selectedSizeDesc = $("select#size :selected").text();
    var selectedSizePrice = parseFloat($("select#size :selected").attr('class')).toFixed(2);
    var newSize =  new size(selectedSize,selectedSizeDesc,selectedSizePrice);
    //console.log($("select#size :selected").attr('class'));
    var newPizza = new Pizza(id,newSize,selectedSizePrice);
    newOrder.addPizza(newPizza);
    id= newOrder.pizza.length - 1;
    var pizzas = newOrder.getPizzalist();
    refreshPizzaList(pizzas);
  });

  $("#pizza-display").on("click",".details",function(){
    id = this.id;
    if(newOrder.pizza[id].toppings){
      var toppings = newOrder.pizza[id].getPizzaToppings();
      refreshToppings(toppings);
    }
  });

  $("#topping-display").on("click",".remove",function(){
    var topId = this.id;
    console.log(this.class);
    id = this.class;
    // newOrder.pizza[id].removeTopping(  newOrder.pizza[id].topping[topId]);
    if(newOrder.pizza[id].toppings){
      var toppings = newOrder.pizza[id].getPizzaToppings();
      refreshToppings(toppings);
    }
  });

  $("#add-top").click(function(){
    var toppingId = $("select#toppings :selected").val();
    var toppingName = $("select#toppings :selected").text();
    var toppingPrice = $("select#toppings :selected").attr('class');
    var newTopping =  new Topping("veggies",toppingId,toppingName,toppingPrice);
    newOrder.pizza[id].addTopping(newTopping);
    var pizzas = newOrder.getPizzalist();
    var toppings = newOrder.pizza[id].getPizzaToppings();
    refreshToppings(toppings);
    refreshPizzaList(pizzas);
  });

  $("#add-cheese").click(function(){
    var toppingId = $("select#cheeses :selected").val();
    var toppingName = $("select#cheeses :selected").text();
    var toppingPrice = $("select#cheeses :selected").attr('class');
    var newTopping =  new Topping("cheese",toppingId,toppingName,toppingPrice);
    //console.log($("select#size :selected").attr('class'));
    newOrder.pizza[id].addTopping(newTopping);
    var pizzas = newOrder.getPizzalist();
    var toppings = newOrder.pizza[id].getPizzaToppings();
    refreshToppings(toppings);
    refreshPizzaList(pizzas);
  });

  $("#add-extras").click(function(){
    var toppingId = $("select#extras :selected").val();
    var toppingName = $("select#extras :selected").text();
    var toppingPrice = $("select#extras :selected").attr('class');
    var newTopping =  new Topping("extras",toppingId,toppingName,toppingPrice);
    //console.log($("select#size :selected").attr('class'));
    newOrder.pizza[id].addTopping(newTopping);
    var pizzas = newOrder.getPizzalist();
    var toppings = newOrder.pizza[id].getPizzaToppings();
    refreshToppings(toppings);
    refreshPizzaList(pizzas);
  });
});   // end front end
