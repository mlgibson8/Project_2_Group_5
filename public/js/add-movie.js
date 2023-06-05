console.log("hello")
const allButtons = document.getElementById("movie-save-btn")

allButtons.forEach(btn => {
    btn.addEventListener("click", function (event) {
        console.log(event.target)
        let title = event.target.getAttribute("data-title")
        let description = event.target.getAttribute("data-description")
        let photo = event.target.getAttribute("data-photo")
    })
})