const currentPage = location.pathname
const menuItems = document.querySelectorAll('.links__item')

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

const cards = document.querySelectorAll(".session__card")

for (let card of cards){
    card.addEventListener("click", function(){
        const id = card.getAttribute("id")
        location.href=`/characters/${id}`
    })
}