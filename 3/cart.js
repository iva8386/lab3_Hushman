
let chart;





function renderCart(){

    let cart = document.querySelector(".cart");  
    let itemsInCart = getItemsFormLocaleStorage();  
    
    console.log(itemsInCart);

    let i = 0;
    let newCarts = '';

    
    console.log("+++");

    while(itemsInCart.length > i){
        newCarts += `
        <div class = "cart-item" data-id = ${itemsInCart[i].id}>
            <div class = "leftSide">
                <p class = "cart-item-name">${itemsInCart[i].name}</p>
                <p class = "item-price">${itemsInCart[i].price}грн</p>
            </div>

            <div class = "rightSide">
                <button class = "item-minus">-</button>
                <p class = "item-count">${itemsInCart[i].count}</p>
                <button class = "item-plus">+</button>
                
            </div>
            
        </div>
        `
        i++;
    }
    cart.innerHTML = newCarts;
    
    countTotal();
    
    
    
  
}


  function addToCart(dataToCart) {
    // Отримуємо поточний список товарів у корзині
    let itemsInCart = getItemsFormLocaleStorage();
    console.log(itemsInCart);
    // Шукаємо чи є товар з такою ж назвою в корзині
    let existingItem = itemsInCart.find(function(item) {
      return item.id === dataToCart.id;
    });
  
    if (existingItem) {
      existingItem.count += 1;
    } else {
      let item = {id:dataToCart.id, price: dataToCart.price, name: dataToCart.name, count: 1 };
      itemsInCart.push(item);
    }
  

    localStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
  }

function clearCart(){

    localStorage.removeItem('itemsInCart');
    let cart_cont = document.querySelector(".cart-container");
    let emptyP = document.querySelector(".empty");

    cart_cont.classList.remove("show");
    emptyP.classList.add("show");
    
}


function addButtonsListeners(){

    let cart = document.querySelector(".cart");
    
    cart.addEventListener("click", (event)=>{
        
        
        if(event.target.classList.contains("item-plus") || event.target.classList.contains("item-minus")){
            let itemsInCart = getItemsFormLocaleStorage();

            
            let item = event.target.closest('.cart-item');

            let countP = item.querySelector('.item-count');
            let id = item.getAttribute("data-id"); 

            let indexId = itemsInCart.findIndex(obj => obj.id === id); 

            if(event.target.classList.contains("item-plus")){
                itemsInCart[indexId].count++;                
                countP.innerHTML = itemsInCart[indexId].count;

            }

            if(event.target.classList.contains("item-minus")){

                itemsInCart[indexId].count--;
                countP.innerHTML = itemsInCart[indexId].count;

                //перевірка чи кілкість товару не 0 після зменшення кількості
                if(itemsInCart[indexId].count === 0){
                    event.target.closest(".cart-item").remove();
                    itemsInCart.splice(indexId, 1);

                } 
                //перевірка чи залишились товари в корзині
                if(itemsInCart.length === 0){
                    let cart = document.querySelector(".cart-container");
                    let emptyP = document.querySelector(".empty");
                    cart.classList.remove("show");
                    emptyP.classList.toggle("show");
                        
                }  
                
            } 
            localStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
            countTotal();
        }
    })

    
}
function countTotal(){

    let itemsInCart = getItemsFormLocaleStorage();

    let totalP = document.querySelector(".totalMoney");
    let total = 0;
    itemsInCart.forEach((obj)=>{
        total += parseFloat(obj.price) * parseFloat(obj.count);
        console.log(obj.count)
    })

    totalP.innerHTML = "Загальна сума: " + total + "грн";
}

function open_cart(){

    let itemsInCart = getItemsFormLocaleStorage();

    let cart_cont = document.querySelector(".cart-container");
      let emptyP = document.querySelector(".empty");
    
     
      if(!cart_cont.classList.contains("show") && itemsInCart.length !== 0){
        renderCart();
      }

      if (itemsInCart.length === 0) {
        emptyP.classList.toggle("show");
        cart_cont.classList.remove("show");
      } 
      else {
        emptyP.classList.remove("show");
        cart_cont.classList.toggle("show");
      }
}

function getItemsFormLocaleStorage(){

    let itemsInCart = localStorage.getItem('itemsInCart');

    if(itemsInCart !== null)
        return JSON.parse(itemsInCart);
    else return [];
}
  