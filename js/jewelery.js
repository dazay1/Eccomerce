let items = document.getElementById("items");
let header = document.getElementById("gallery");
let btns = header.getElementsByClassName("gallery__btn");
let img = document.getElementById("img");
let about = document.getElementById("about");

fetch("https://fakestoreapi.com/products/category/jewelery")
  .then(res => {
    return res.json()
  })
  .then(data => {
    data.forEach(element => {
      console.log(element);
      items.innerHTML += `
          <div class="item">
          <img class="img" id="img" src="${element.image}" alt="">
          <h2 class="title">${element.title}</h2>
          <p class="description">${element.description}</p>
          <div class="price">
            <button class="information">
              <a href="#">
                ${element.price}
              </a>
            </button>
          </div>
        </div>
        `
    });
  })