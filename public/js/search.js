const searchBtnEl = document.getElementById('search-btn')
const searchInputEl = document.getElementById('search-bar')
searchBtnEl.addEventListener('click', (e) => {
    let validSearch = searchInputEl.value.replace(' ', '-')
    console.log(validSearch)
    window.location.href = `/search/${validSearch}`
    console.log(searchInputEl.value)
})
searchInputEl.addEventListener('change', (e) => {
    searchInputEl.value = e.target.value
    console.log(searchInputEl.value)
})