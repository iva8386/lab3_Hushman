
CanvasJS.addColorSet("whiteColorSet", [
    
  "#e13cf0",
  "#5af202",
  "#02f2b6",
  "#A6A6A6",
  "#999999",
  "#8C8C8C",
 "#404040",
 "#363636",
 "#494949",
 "#5C5C5C",
 "#6F6F6F",
])


let blocks = document.querySelector(".blocks");

function addBlocks(data) {

  let blocks_container = document.querySelector(".blocks");
  let blocks = "";

  let i = blocks_container.childElementCount;
 
  while((i < blocks_container.childElementCount + 5) && (i < data.length)){
    blocks += `
      <div class="block" data-id = "${data.indexOf(data[i])}" data-type = "${data[i].type}">
        <div class="container-img">
          <img src="files/${data[i].imgName}">
          <p class="price">${data[i].price}грн</p>
        </div>
        <p class="name">${data[i].name}</p>
        <p class="describe">${data[i].describe}</p>
        <img class="btnDescribe" src = "describe.svg">
        <button class = "addCartBtn">Додати в кошик</button>
      </div>
    `;
    i++;
  };
  
  blocks_container.innerHTML += blocks;

  let len = blocks_container_len = document.querySelector(".blocks").childElementCount;
  let moreBtn = document.querySelector(".moreBtn");

  if(len === data.length)
    moreBtn.style.display = "none";
  else
    moreBtn.style.display = "block";
}


function renderCards(){
  fetch("infoJSON.json")
    .then(response => response.json())
    .then(dataConst => {

      let filterPanel = `
      <div class = "filterPanel">
        <div class = "search-container">
          <input class = "searchInput" type="text" placeholder="Що шукаємо ???">
          <button class = "searchBtn">Пошук</button>
        </div>

        <div class = "sort-container">
          <p class = "sortP">Ціна:</p>

          <select class = "priceSelection" size = "1">
              <option value = "0" >по замовчуванню</option>
              <option value= "growth">По зростанню</option>
              <option value = "decline">За спаданням</option>
          </select>

          <p class = "sortP">від</p>
          <input class = "fromPrice" type = "number" min = "0">
          <p class = "sortP">до</p>
          <input class = "toPrice" type = "number" min = "0">
        </div>
        
      </div>
      `;


      const buttons = document.querySelectorAll(".btnDescribe");
      const card = document.querySelector(".block");  

      let filter_container = document.getElementById("filterContainer");
      filter_container.innerHTML = filterPanel;


     
      console.log(dataConst)
      addBlocks(dataConst);

      

    let data = dataConst; 
    let searchBtn = document.querySelector(".searchBtn");
    searchBtn.addEventListener("click", ()=>{
       data = filterData(dataConst);
    })

    //кнопка відкриття корзини
    
    const btnMore = document.querySelector(".moreBtn");

      btnMore.addEventListener("click",() =>{
        addBlocks(data);  
      })

      

    //кнопка додавання до кошику
    blocks.addEventListener('click', (event) => {

      let thisBlock = event.target.parentNode;

      if (event.target.classList.contains('addCartBtn')) {

        let price = thisBlock.querySelector(".price").innerHTML.slice(0,-3);
        let name = thisBlock.querySelector(".name").innerHTML;
        let id = thisBlock.getAttribute("data-id");
              
        let dataToCart = {
          id: id,
          name: name,
          price: price,
        }
        console.log(dataToCart);
        addToCart(dataToCart);
            
        let emptyP = document.querySelector(".empty");
        emptyP.classList.remove("show");

      }

      if (event.target.classList.contains('btnDescribe')){
      
          const pDescribe = thisBlock.querySelector(".describe");
          const btnDescribe = thisBlock.querySelector(".btnDescribe");
          pDescribe.classList.toggle("show");
          btnDescribe.classList.toggle("show");
        };
    });

    
    renderGraphic(dataConst);

    
    })
  .catch(error => {
    console.error("Error loading infoJSON.json:", error);
});
}


    

function scrollFunction() {
  if (window.pageYOffset > (window.innerHeight / 2)) {
    document.getElementById("goUp").classList.add("show");
  } else {
    document.getElementById("goUp").classList.remove("show")
  }
}
  
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function renderSubscribePage(){
  //таймаут на виведення вікна про підписку
  setTimeout(()=>{
    if(!localStorage.getItem("subscribe")){
      let subscribeWindow = document.querySelector(".subscribe-window");
      subscribeWindow.classList.add("show");
    }




  },4000);
}

//реклама

function addAD() {

  setTimeout(() => { 
    let advertise = document.querySelector(".advertise");
    advertise.classList.add("show");

    const timer = document.querySelector(".timer");
    const close = document.querySelector(".close");

    let sec = 6;

    const count = () => {
      sec--;
      timer.innerHTML = sec;

      if (sec === 0) {
        timer.style.display = "none";
        close.style.display = "block";

        close.addEventListener("click",()=>{ 
          addAD();
          adRemove();
        });

      } else {
        setTimeout(count, 1000);
      }
    };

    count();
  }, 200000);
}


addAD()
function adRemove() { 
  let advertise = document.querySelector(".advertise");
  advertise.classList.remove("show");
  addAD()
}





function removeWindow(){
  let subscribeWindow = document.querySelector(".subscribe-window");
  subscribeWindow.classList.remove("show");
}

function addMember(){
  localStorage.setItem("subscribe", true);
  removeWindow()
}










































function filterData(dataConst){
  

  
  let searchText = document.querySelector(".searchInput");
  let byPrice = document.querySelector(".priceSelection");
  let fromPrice = document.querySelector(".fromPrice");
  let toPrice = document.querySelector(".toPrice");

  let content = searchText.value;
  let data = dataConst;
  let blocks = document.querySelector(".blocks");
  blocks.innerHTML = "";

  if(content !== ""){
          
    let data_filtered = [];

    let i = 0;
    while(i < dataConst.length){
      if(dataConst[i].name.toLowerCase().includes(content.toLowerCase())){ 
          data_filtered.push(dataConst[i]);
      }
      i++;
      }
    data = data_filtered;
    
            
  }

  if(byPrice.value === "growth")
    data = alasql('SELECT * FROM ? ORDER BY price ASC', [data]);
  

  if(byPrice.value === "decline")
    data = alasql('SELECT * FROM ? ORDER BY price DESC', [data]);

  if(fromPrice.value !== "")
    data = alasql('SELECT * FROM ? WHERE price > ?', [data, parseFloat(fromPrice.value)]);

  if(toPrice.value !== "")
    data = alasql('SELECT * FROM ? WHERE price < ?', [data, parseFloat(toPrice.value)])

  addBlocks(data);
  renderGraphic(data);
  
  return data;
}


function renderGraphic(array){


  console.log(array);
  let dataSet = alasql('SELECT type as label, COUNT(*) as y FROM ? GROUP BY type', [array]);

  chart = new CanvasJS.Chart("chartContainer", {
      
      backgroundColor: "transparent",

      colorSet:"whiteColorSet",
      
      axisX: {
          labelFontColor: "white"
      },
      axisY: {
          labelFontColor: "white"
      },
      title:{
          text: "Items",
          fontColor:"white",
          fontFamily:"Helvetica"
      },
      toolTip:{ 
          fontColor:"Black",
          content: "{label} : {y}",

      
      },
      data: [{
          type: "pie",
          indexLabelFontColor: "white",
          toolTipContent:"{label}:{y}",
          indexLabel: "{label} {y}",
           

          showInLegend: false,

          dataPoints: dataSet,
          
      }]
    });
  

  
    let column = document.querySelector(".Column");
    let pie = document.querySelector(".Pie");
    let linear = document.querySelector(".Linear");

    column.addEventListener("click", ()=>{
        chart.data[0].set("type", "column");
        chart.render();
    })
    pie.addEventListener("click", ()=>{
        chart.data[0].set("type", "pie");
        chart.render();
    })
    linear.addEventListener("click", ()=>{
        chart.data[0].set("type", "line");
        chart.render();
    })

  chart.render();

}









  
