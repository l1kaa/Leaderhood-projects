const addToCart = document.getElementsByTagName("button");
let items = document.getElementById("items-count");
let cartCount = 0;

for (let button of addToCart) {
    button.addEventListener("click", function () {
        cartCount++; 
        items.textContent = cartCount; 
    });
}