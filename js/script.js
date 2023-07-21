
let items = document.getElementById("items");
let header = document.getElementById("gallery");
let btns = header.getElementsByClassName("gallery__btn");
let img = document.getElementById("img");
let about = document.getElementById("about");
let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector('body');
let total = document.querySelector(".total")
let quantity = document.querySelector(".quantity");
let card = document.querySelector(".card")

let listCards = [];
let products = fetch('https://fakestoreapi.com/products/')
  .then(res => {
    return res.json()
  })
  .then(data => {
    data.forEach((element, key) => {
      items.innerHTML += `
          <div class="item">
          <img class="img" id="img" src="${element.image}" alt="">
          <h2 class="title">${element.title}</h2>
          <p class="description">${element.description}</p>
          <div class="price">
            <button class="information">
              <a href="#">
                ${element.price.toLocaleString()}
              </a>
            </button>
            <button class="add" onclick="addToCard(${key})">Add To Card</button>
          </div>
        </div>
        `
    });
  })
openShopping.addEventListener("click", () => {
  card.classList.add('move')
})
closeShopping.addEventListener("click", () => {
  card.classList.remove("move")
})

function reloadCard() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((element, key) => {
    totalPrice = totalPrice + element.price;
    count = count + element.quantity;
    if(element !=null){
      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
      <div><img src="${element.image}"/></div>
      <h2>${element.title}</div>
      <div>${element.price.toLocaleString()}</div>
      <div>
        <button onclick="changeQuantity(${key}, ${element.quantity - 1})">-</button>
        <div class="count">${element.quantity}
        <button onclick="changeQuantity(${key}, ${element.quantity + 1})">+</button>
        </div>`
      listCard.appendChild(newDiv);
    }
  })
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}
function addToCard(key){
  if(listCards[key] == null) {
    listCards[key] = products[key];
    listCards[key].quantity = 1;
  }
  reloadCard();
}
function changeQuantity(key, quantity){
  if(quantity == 0) {
    delete listCards[key];
  } else{
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard()
}