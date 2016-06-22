# Pizza Place

#### A website that allows users to select a pizza size and add different toppings, cheeses and extras. it also allows them to switch between many pizzas and see the total price for each pizza and for the whole order.

#### By Rony Nasr

## Description

This project allows users to select pizzas and add as many ingredients as they like.

## Project Specification (BDD)

        Behavior              |       Input           |        Output         
  Display sizes and toppings  | Page loads            | List sizes and toppings
  User chooses a size         | small                 | pizza{size: small}
  Pizza object created        | pizza{size: small}    | Display pizza and size
  Add topping                 | tomatoes              | pizza {size: small, toppings: [tomato]}
  topping added to pizza      | toppings: [tomatoes]  | Display topping
  Calculate new price         | pizza{..,price: $12)  | pizza:{..,price: $14}
  Add another pizza           | medium                | order {pizza:small,pizza:medium}
  Calculate new total         | pizza {medium, $15}   | order Total $29
  view pizza contents         | click "details"       | tomatoes, cheese, etc.



## Setup/Installation Requirements

* Clone or download the project onto your desktop
* open _index.html_



### License

Licensed under the MIT License

Copyright (c) 2016 **Epicodus Pair Projects**
