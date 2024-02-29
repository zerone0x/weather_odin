// TODO 
// - today's weather
//     - how to show the details
// - recent one week weather
const loadingimg = document.createElement('img')
loadingimg.src = 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'
async function getWeather(city){
    try{
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=b57d9529fc894a72a2d153800242302&q=${city}`,{mode: 'cors'})
    const weatherData = await response.json()
    console.log(weatherData)
    return weatherData
    }catch(error){
        console.log(error)
    }
    
}
async function getWeatherForMore(city){
    try{
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b57d9529fc894a72a2d153800242302&q=${city}&days=7`,{mode: 'cors'})
    const weatherDataMore = await response.json()
    console.log(weatherDataMore)
    return weatherDataMore
    }catch(error){
        console.log(error)
    }

}

function getWeatherToday(city){
    const todayweather = document.getElementsByClassName('todayWeather')[0]
    todayweather.innerHTML = ''
    todayweather.appendChild(loadingimg)
    getWeather(city).then(data => {
    todayweather.innerHTML = ''
    const {location:{name}, 
    current:{condition:{icon},
    temp_c,
    feelslike_c,
    last_updated
    },
    } = data
    const html = `
    <header> ${name} </header>
    <img src="${icon}" alt="weather icon">
    <p>${temp_c}°C </p>
    <p> It feels like ${feelslike_c}°C </p>
    <p> Last updated at ${last_updated}</p>
    

    `
    todayweather.insertAdjacentHTML('beforeend', html)
    })
}
// showWeekWeather = document.createElement('button')
// showWeekWeather.textContent = 'Show more'
// todayweather.appendChild(showWeekWeather)

function getWeekWeatherForMore(city){
    const showmore = document.getElementsByClassName('showmore')[0]
    showmore.innerHTML = ''
    showmore.appendChild(loadingimg)
    getWeatherForMore(city).then(data => {
        showmore.innerHTML = ''
        const showWeekWeather = document.getElementById('showWeekWeather')
        const forcastData = data.forecast.forecastday
        forcastData.forEach(EveryForcast => {
            
            const {date,
                day:{condition: {icon},
                maxtemp_c,
                mintemp_c,avgtemp_c}} =  EveryForcast
            console.log(EveryForcast)
            const html = `
            <div class="forcast">
            <header> ${date} </header>
            <img src="${icon}" alt="weather icon">
            <p> Max temperature: ${maxtemp_c}°C </p>
            <p> Min temperature: ${mintemp_c}°C </p>
            <p> Average temperature: ${avgtemp_c}°C </p>
            </div>
            `
            showmore.insertAdjacentHTML('beforeend', html)
        
            showWeekWeather.addEventListener('click', function(){
                console.log('loading')
                if(showmore.style.display === 'flex'){
                    showmore.style.display = 'none'
                }else{
                    showmore.style.display = 'flex'
                }
                
            })
        })
        console.log(data.forecast.forecastday)
    })
}


getWeatherToday('Guangzhou')
getWeekWeatherForMore('Guangzhou')
    

const city = document.getElementById('city')
city.addEventListener('change', function(){
    console.log('start to load' + city.value)
    const city_N = city.value.trim() 
    getWeatherToday(city_N)
    getWeekWeatherForMore(city_N)

    
    console.log(city_N)
})