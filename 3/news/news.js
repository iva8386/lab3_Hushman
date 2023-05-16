



fetch("newsJSON.json")
.then(response => response.json())
.then(newsJSON => {

    let newsBlock = document.querySelector(".news-container");

    newsBlock.innerHTML = "";
    let news = "";
    let nowDate = moment();

    newsJSON = newsJSON.sort(function(a, b){
        let dateA = moment(a.date),
        dateB= moment(b.date);
        return dateA-dateB 
    })
       

    for(let i = newsBlock.childElementCount;i < newsJSON.length;i++){

        newsJSON[i].date = moment(newsJSON[i].date,"YYYY.MM.DD HH:mm");

        if(newsJSON[i].date.isBefore(nowDate)){
            news += `
            <div class = "news-item">
                <p class = "news-item-title">${newsJSON[i].title}</p>
                <p class = "news-item-text">${newsJSON[i].text}</p>
                <div class = "news-item-date-container">
                    <p class = "date-year">${newsJSON[i].date.format("HH:mm")}</p>
                    <p class="date-time">${newsJSON[i].date.format("YYYY.MM.DD")}</p>
                </div>
            </div>
            `
        }

    }

    newsBlock.innerHTML += news;

    let newsContainer = document.querySelector(".news-container");

    newsContainer.addEventListener("click", (event)=>{
        
        if(event.target.classList.contains("news-item-title")){
            event.target.closest(".news-item").querySelector(".news-item-text").classList.toggle("show");
            console.log(event.target.classList)
        }
})
})
.catch(error => {
    console.error("Error loading newsJSON.json:", error);
});


let cart_open = document.querySelector(".cart-open");
cart_open.addEventListener("click", () => {
    open_cart();
  })

addButtonsListeners();

