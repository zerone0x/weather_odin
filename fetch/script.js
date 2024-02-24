const img = document.querySelector('img');
let searchvalue = 'cat';
getGiphy(searchvalue);
async function getGiphy(item) {
    const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=9UlZ2waaRImI4fmUG97zEKDfGoEx5oCZ&s='+item, {mode: 'cors'})
    const photoData = await response.json()
    img.src = photoData.data.images.original.url;
}



const searchbar = document.createElement('input');
searchbar.type = 'text';
searchbar.placeholder = 'Search for gif';
document.body.appendChild(searchbar);
searchbar.addEventListener('change', function() {
    searchvalue = searchbar.value.trim();
    getGiphy(searchbar.value);
})


const button = document.createElement('button');
button.textContent = 'Refresh gif';


button.addEventListener('click', function(){
    getGiphy(searchvalue);
    console.log(searchvalue);
});
document.body.appendChild(button);