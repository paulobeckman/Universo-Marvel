const currentPage = location.pathname
const menuItems = document.querySelectorAll('.links__item')

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}