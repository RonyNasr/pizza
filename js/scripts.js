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

function Order(){
  this.pizza = [];
  this.total = 0.00;
}

Order.prototype.addPizza = function (pizza) {
  this.pizza.push(pizza);
  this.total = (parseFloat(this.total) + parseFloat(pizza.price)).toPrecision(3) ;
};

function Pizza(id,size,price){
  this.id=id;
  this.size = size;
  this.price = price;
  this.toppings = [];
}

// Pizza.prototype.addSize = function (size) {
//   this.size = size;
//   this.price += size.price;
// };

Pizza.prototype.addTopping = function (topping) {
  //console.log(topping);
  this.toppings.push(topping);
  this.price = (parseFloat(this.price) +parseFloat(topping.price)).toPrecision(3);
};

function size (id,description,price){
  this.id = id;
  this.description = description;
  this.price = price;
}


function Topping(type,id,name,price) {
  this.id = id;
  this.name= name;
  this.price = price;
  this.type = type;
}

var listToppings = function () {
  var toppings =[["pepperoni",1.99], ["anchovies",2.99],  ["chicken",1.99], ["ground-beef",1.99], ["steak strips",1.99], ["salami",2.99], ["chorizo-sausage",2.99], ["bacon",0.99], ["roma-tomatoes",0.75], ["onions",0.5], ["spinach",0.89], ["broccoli",0.5], ["pineapple",0.99], ["jalapenos",1.29],  ["kalamata-olives",0.99], ["green-pepper",0.8], ["fresh-mushroom",0.75], ["green-olives",0.5],["roasted-garlic",0.99], ["habana-pepers",0.99], ["Sun-dried-tomatoes",0.8], ["grilled-zucchini",0.75],  ["aspargus",0.99], ["artichokes",0.99], ["potato",0.5], ["caramelized-onion",0.75], ["roasted-red-pepper",0.99]];
  for(var i =0; i< toppings.length;i++){
    var toppingName = capitalizeFirstLetters(toppings[i][0]);
    // toppingName.replace(/-/g," ");
    $("select#toppings").append("<option value = '" + i +"' class ='"+toppings[i][1]+"'>"+ toppingName +"</option>");
    }
}

//add listMeats


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

Order.prototype.list = function () {
  var htmlText = "<h2>Pizza: </h2>";
  var orderTotal = 0;
  this.pizza.forEach(function(pizza,index){
    orderTotal = (parseFloat(orderTotal) +parseFloat(pizza.price)).toPrecision(3);
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
              '</div>'
  });
  htmlText = htmlText + '<div class="row" id="total-display">'+
                          '<div class="col-md-6" >' +
                            '<b>Order Total:</b> $' +
                          '</div>' +
                          '<div class="col-md-6" >' +
                            '<p>' +
                              orderTotal; +
                            '</p>' +
                          '</div>' +
                        '</div>'
return htmlText;
};

Pizza.prototype.listTops = function () {
  var htmlText = "<h2>Toppings: </h2>";
  var toppingTotal = 0;
  this.toppings.forEach(function(topping,index){
    toppingTotal = (parseFloat(toppingTotal) +parseFloat(topping.price)).toPrecision(3);
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
              '</div>'
  });
htmlText = htmlText + '<div class="row" id="total-display">'+
                        '<div class="col-md-6" >' +
                          '<b>Toppings Total:</b> $' +
                        '</div>' +
                        '<div class="col-md-6" >' +
                          '<p>' +
                            toppingTotal; +
                          '</p>' +
                        '</div>' +
                      '</div>'
return htmlText;
};

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
    var selectedSizePrice = parseFloat($("select#size :selected").attr('class')).toPrecision(3);
    var newSize =  new size(selectedSize,selectedSizeDesc,selectedSizePrice);
    //console.log($("select#size :selected").attr('class'));
    var newPizza = new Pizza(id,newSize,selectedSizePrice);
    newOrder.addPizza(newPizza);
    id= newOrder.pizza.length - 1;
    $("#pizza-display").empty();
    $("#pizza-display").append(newOrder.list());
    $("#pizza-display").show();

    $(".details").on("click",function(){
      alert (this.id);
      console.log(this.id);
      id = this.id;
      console.log(newOrder.pizza[id]);
      if(newOrder.pizza[id].toppings){
        $("#topping-display").empty();
        $("#topping-display").append(newOrder.pizza[id].listTops());
        $("#topping-display").show();
      }
    });
  });

  $("#add-top").click(function(){
    var toppingId = $("select#toppings :selected").val();
    var toppingName = $("select#toppings :selected").text();
    var toppingPrice = $("select#toppings :selected").attr('class');
    var newTopping =  new Topping("veggies",toppingId,toppingName,toppingPrice);
    // debugger;
    // console.log($("select#size :selected").attr('class'));
    newOrder.pizza[newOrder.pizza.length-1].addTopping(newTopping);
    $("#topping-display").empty();
    $("#topping-display").append(newOrder.pizza[newOrder.pizza.length-1].listTops());
    $("#topping-display").show();
    $("#pizza-display").empty();
    $("#pizza-display").append(newOrder.list());
    $("#pizza-display").show();
  });

  $("#add-cheese").click(function(){
    var toppingId = $("select#cheeses :selected").val();
    var toppingName = $("select#cheeses :selected").text();
    var toppingPrice = $("select#cheeses :selected").attr('class');
    var newTopping =  new Topping("cheese",toppingId,toppingName,toppingPrice);
    //console.log($("select#size :selected").attr('class'));
    newOrder.pizza[newOrder.pizza.length-1].addTopping(newTopping);
    $("#topping-display").empty();
    $("#topping-display").append(newOrder.pizza[newOrder.pizza.length-1].listTops());
    $("#topping-display").show();
    $("#pizza-display").empty();
    $("#pizza-display").append(newOrder.list());
    $("#pizza-display").show();
  });

  $("#add-extras").click(function(){
    var toppingId = $("select#extras :selected").val();
    var toppingName = $("select#extras :selected").text();
    var toppingPrice = $("select#extras :selected").attr('class');
    var newTopping =  new Topping("extras",toppingId,toppingName,toppingPrice);
    //console.log($("select#size :selected").attr('class'));
    newOrder.pizza[newOrder.pizza.length-1].addTopping(newTopping);
    $("#topping-display").empty();
    $("#topping-display").append(newOrder.pizza[newOrder.pizza.length-1].listTops());
    $("#topping-display").show();
    $("#pizza-display").empty();
    $("#pizza-display").append(newOrder.list());
    $("#pizza-display").show();
  });




});   // end front end 
